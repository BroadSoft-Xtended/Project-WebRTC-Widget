module.exports = SIPStack;

var C = {
  // RTCSession states
  STATE_CONNECTED: "connected",
  STATE_DISCONNECTED: "disconnected",
  STATE_CALLING: "calling",
  STATE_STARTED: "started",
  STATE_HELD: "held"
};

SIPStack.C = C;

var events = require('events');
var debug = require('debug')('sipstack');
var debugerror = require('debug')('sipstack:ERROR');
debugerror.log = console.warn.bind(console);

function SIPStack(configuration) {
  this.configuration = configuration;
  this.ua = null;
  this.activeSession = null;
  this.sessions = [];
}

SIPStack.prototype = {
  getLocalStreams: function() {
    return this.activeSession ? this.activeSession.getLocalStreams() : null;
  },

  getRemoteStreams: function() {
    return this.activeSession ? this.activeSession.getRemoteStreams() : null;
  },

  getSessionId: function() {
    return this.activeSession.id.replace(/\./g, '');
  },

  terminateSession: function(session) {
    session = session || this.activeSession;
    if (!session) {
      return;
    }
    var index = this.sessions.indexOf(session);
    if (index !== -1) {
      this.sessions.splice(index, index + 1);
    }
    if (session.status !== ExSIP.RTCSession.C.STATUS_TERMINATED) {
      session.terminate();
    }
    if (session === this.activeSession) {
      debug("clearing active session");
      this.activeSession = null;
    }
    events.emit('viewChanged', this);
  },

  terminateSessions: function() {
    var allSessions = [];
    allSessions = allSessions.concat(this.sessions);
    for (var i = 0; i < allSessions.length; i++) {
      this.terminateSession(allSessions[i]);
    }
  },

  holdAndAnswer: function(session) {
    var self = this;
    var firstSession = this.activeSession;
    session.on('ended', function() {
      events.emit('message', 'Resuming with ' + firstSession.remote_identity.uri.user, 'normal');
      debug("incoming call ended - unholding first call");
      firstSession.unhold(function() {
        debug("unhold first call successful");
      });
    });
    this.activeSession.hold(function() {
      debug("hold successful - answering incoming call");
      self.answer(session);
    });
  },

  answer: function(session) {
    session.answer(this.configuration.getExSIPOptions());
  },

  hold: function(successCallback, failureCallback) {
    if (this.activeSession) {
      this.activeSession.hold(successCallback, failureCallback);
    }
  },

  unhold: function(successCallback, failureCallback) {
    if (this.activeSession) {
      this.activeSession.unhold(successCallback, failureCallback);
    }
  },

  reconnectUserMedia: function(successCallback, failureCallback) {
    var self = this;
    var onUserMediaUpdateSuccess = function(localMedia) {
      debug("reconnect user media successful");
      if (self.activeSession) {
        self.activeSession.changeSession({
          localMedia: localMedia
        }, function() {
          debug("session changed successfully");
          if (successCallback) {
            successCallback(localMedia);
          }
        }, failureCallback);
      } else if (successCallback) {
        successCallback(localMedia);
      }
    };
    this.updateUserMedia(onUserMediaUpdateSuccess, failureCallback);
  },

  call: function(destination) {
    var session = this.ua.call(destination, this.configuration.getExSIPOptions());
    session.on('failed', function(e) {
      events.emit('failed', e.sender, e.data);
    });
    events.emit('calling', session);
  },

  sendDTMF: function(digit) {
    this.activeSession.sendDTMF(digit, this.configuration.getDTMFOptions());
  },

  isStarted: function() {
    return this.getCallState() === C.STATE_STARTED;
  },

  unregister: function() {
    return this.ua && this.ua.unregister();
  },

  register: function() {
    return this.ua && this.ua.register();
  },

  isRegistered: function() {
    return this.ua && this.ua.isRegistered();
  },

  sendData: function(data) {
    if (this.activeSession) {
      this.activeSession.sendData(data);
    }
  },

  transfer: function(transferTarget, isAttended) {
    if (isAttended) {
      this.ua.attendedTransfer(transferTarget, this.activeSession);
    } else {
      this.ua.transfer(transferTarget, this.activeSession);
    }
  },

  updateRtcMediaHandlerOptions: function() {
    if (typeof(this.ua) === 'undefined') {
      return;
    }

    this.ua.setRtcMediaHandlerOptions(this.configuration.getRtcMediaHandlerOptions());
  },

  getCallState: function() {
    if (this.sessions.length > 0) {
      if (this.sessions.length === 1 && !this.sessions[0].isStarted()) {
        return C.STATE_CALLING;
      } else {
        if (this.activeSession && this.activeSession.isHeld()) {
          return C.STATE_STARTED + " " + C.STATE_HELD;
        } else {
          return C.STATE_STARTED;
        }
      }
    } else {
      if (this.ua && this.ua.isConnected && this.ua.isConnected()) {
        return C.STATE_CONNECTED;
      } else {
        return C.STATE_DISCONNECTED;
      }
    }
  },

  updateUserMedia: function(userMediaCallback, failureCallback) {
    var self = this;
    if (!this.configuration.disabled && (this.configuration.enableConnectLocalMedia || this.activeSession)) {
      // Connect to local stream
      var options = this.configuration.getExSIPOptions();
      debug("updating user media ...");
      this.ua.getUserMedia(options, function(localStream) {
        events.emit('userMediaUpdated', localStream);
        if (self.activeSession) {
          debug("changing active session ...");
          self.activeSession.changeSession({
            localMedia: localStream,
            createOfferConstraints: options.createOfferConstraints
          }, function() {
            debug('change session succeeded');
          }, function() {
            debug('change session failed');
          });
        }

        if (userMediaCallback) {
          userMediaCallback(localStream);
        }
      }, function(e) {
        events.emit('message', self.configuration.messageGetUserMedia || "Get User Media Failed", "alert");
        if (failureCallback) {
          failureCallback(e);
        }
      }, true);
    }
  },

  // Incoming reinvite function
  incomingReInvite: function(e) {
    if (this.configuration.enableAutoAcceptReInvite) {
      debug("auto accepting reInvite");
      e.data.session.acceptReInvite();
    } else {
      events.emit('reInvite', e.data);
    }
  },

  incomingCall: function(evt) {
    var session = evt.data.session;
    if (!this.activeSession && this.configuration.isAutoAnswer()) {
      session.answer(this.configuration.getExSIPOptions());
    } else {
      events.emit('incomingCall', evt.data);
    }
  },

  init: function(data) {
    try {
      var self = this;

      if (this.ua) {
        debug('stopping existing UA');
        this.ua.stop();
      }

      if (this.configuration.disabled) {
        return;
      }
      this.ua = new ExSIP.UA(this.configuration.getExSIPConfig(data));

      this.updateRtcMediaHandlerOptions();

      // Start SIP Stack
      this.ua.start();

      // sipStack callbacks
      this.ua.on('connected', function(e) {
        events.emit('viewChanged', self);
        events.emit('connected', e.data);
      });
      this.ua.on('disconnected', function(e) {
        events.emit('viewChanged', self);
        events.emit('disconnected', e.data);
      });
      this.ua.on('onReInvite', function(e) {
        debug("incoming onReInvite event");
        self.incomingReInvite(e);
      });
      this.ua.on('newRTCSession', function(e) {
        var session = e.data.session;
        self.sessions.push(session);
        events.emit('viewChanged', self);

        // call event handlers
        session.on('progress', function(e) {
          events.emit('progress', e.sender, e.data);
        });
        session.on('failed', function(e) {
          events.emit('failed', e.sender, e.data);
        });
        session.on('started', function(e) {
          events.emit('viewChanged', self);
          events.emit('started', e.sender, e.data);
        });
        session.on('resumed', function(e) {
          events.emit('viewChanged', self);
          events.emit('resumed', e.sender, e.data);
        });
        session.on('held', function(e) {
          events.emit('viewChanged', self);
          events.emit('held', e.sender, e.data);
        });
        session.on('ended', function(e) {
          events.emit('ended', e.sender, e.data);
        });
        session.on('newDTMF', function(e) {
          events.emit('newDTMF', e.sender, e.data);
        });
        session.on('dataSent', function(e) {
          events.emit('dataSent', e.sender, e.data);
        });
        session.on('dataReceived', function(e) {
          events.emit('dataReceived', e.sender, e.data);
        });
        // handle incoming call
        if (e.data.session.direction === "incoming") {
          self.incomingCall(e);
        } else {
          if (!self.activeSession) {
            debug('new active session : ' + session.id);
            self.activeSession = session;
          }
        }
      });

      this.ua.on('registered', function() {
        events.emit('registered');
      });
      this.ua.on('unregistered', function() {
        events.emit('unregistered');
      });
      this.ua.on('registrationFailed', function(e) {
        events.emit('registrationFailed', e.data);
      });
    } catch (e) {
      debugerror('could not init sip stack', e);
    }
  }
};