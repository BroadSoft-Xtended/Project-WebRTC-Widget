module.exports = require('../factory')(SIPStack);

var C = {
  // RTCSession states
  STATE_CONNECTED: "connected",
  STATE_DISCONNECTED: "disconnected",
  STATE_CALLING: "calling",
  STATE_STARTED: "started",
  STATE_HELD: "held"
};

SIPStack.C = C;

var ExSIP = require('exsip');

function SIPStack(options) {
  var self = {};

  var ua = null;
  var activeSession = null;
  var sessions = [];

  self.models = ['eventbus', 'debug'];
  self.listeners = function() {
    self.eventbus.on('authenticate', function(e) {
      self.init(e);
    });
  };
  self.getLocalStreams = function() {
    return activeSession ? activeSession.getLocalStreams() : null;
  };
  self.getRemoteStreams = function() {
    return activeSession ? activeSession.getRemoteStreams() : null;
  };
  self.getSessionId = function() {
    return activeSession.id.replace(/\./g, '');
  };
  self.terminateSession = function(session) {
    session = session || activeSession;
    if (!session) {
      return;
    }
    var index = sessions.indexOf(session);
    if (index !== -1) {
      sessions.splice(index, index + 1);
    }
    if (session.status !== ExSIP.RTCSession.C.STATUS_TERMINATED) {
      session.terminate();
    }
    if (session === activeSession) {
      self.debug("clearing active session");
      activeSession = null;
    }
    self.eventbus.emit('viewChanged', this);
  };
  self.terminateSessions = function() {
    var allSessions = [];
    allSessions = allSessions.concat(sessions);
    for (var i = 0; i < allSessions.length; i++) {
      this.terminateSession(allSessions[i]);
    }
  };
  self.holdAndAnswer = function(session) {
    var firstSession = activeSession;
    session.on('ended', function() {
      self.eventbus.emit('message', {text: 'Resuming with ' + firstSession.remote_identity.uri.user, level: 'normal'});
      self.debug("incoming call ended - unholding first call");
      firstSession.unhold(function() {
        self.debug("unhold first call successful");
      });
    });
    activeSession.hold(function() {
      self.debug("hold successful - answering incoming call");
      self.answer(session);
    });
  };
  self.answer = function(session) {
    session.answer(this.configuration.getExSIPOptions());
  };
  self.hold = function(successCallback, failureCallback) {
    if (activeSession) {
      activeSession.hold(successCallback, failureCallback);
    }
  };
  self.unhold = function(successCallback, failureCallback) {
    if (activeSession) {
      activeSession.unhold(successCallback, failureCallback);
    }
  };
  self.reconnectUserMedia = function(successCallback, failureCallback) {
    var onUserMediaUpdateSuccess = function(localMedia) {
      self.debug("reconnect user media successful");
      if (activeSession) {
        activeSession.changeSession({
          localMedia: localMedia
        }, function() {
          self.debug("session changed successfully");
          if (successCallback) {
            successCallback(localMedia);
          }
        }, failureCallback);
      } else if (successCallback) {
        successCallback(localMedia);
      }
    };
    this.updateUserMedia(onUserMediaUpdateSuccess, failureCallback);
  };
  self.call = function(destination) {
    var session = ua.call(destination, this.configuration.getExSIPOptions());
    session.on('failed', function(e) {
      self.eventbus.emit('failed', e.data);
    });
    self.eventbus.emit('calling', session);
  };
  self.sendDTMF = function(digit) {
    activeSession.sendDTMF(digit, this.configuration.getDTMFOptions());
  };
  self.isStarted = function() {
    return this.getCallState() === C.STATE_STARTED;
  };
  self.unregister = function() {
    return ua && ua.unregister();
  };
  self.register = function() {
    return ua && ua.register();
  };
  self.isRegistered = function() {
    return ua && ua.isRegistered();
  };
  self.sendData = function(data) {
    if (activeSession) {
      activeSession.sendData(data);
    }
  };
  self.transfer = function(transferTarget, isAttended) {
    if (isAttended) {
      ua.attendedTransfer(transferTarget, activeSession);
    } else {
      ua.transfer(transferTarget, activeSession);
    }
  };
  self.updateRtcMediaHandlerOptions = function() {
    if (typeof(ua) === 'undefined') {
      return;
    }

    ua.setRtcMediaHandlerOptions(this.configuration.getRtcMediaHandlerOptions());
  };
  self.getCallState = function() {
    if (sessions.length > 0) {
      if (sessions.length === 1 && !sessions[0].isStarted()) {
        return C.STATE_CALLING;
      } else {
        if (activeSession && activeSession.isHeld()) {
          return C.STATE_STARTED + " " + C.STATE_HELD;
        } else {
          return C.STATE_STARTED;
        }
      }
    } else {
      if (ua && ua.isConnected && ua.isConnected()) {
        return C.STATE_CONNECTED;
      } else {
        return C.STATE_DISCONNECTED;
      }
    }
  };
  self.updateUserMedia = function(userMediaCallback, failureCallback) {
    if (!this.configuration.disabled && (this.configuration.enableConnectLocalMedia || activeSession)) {
      // Connect to local stream
      var options = this.configuration.getExSIPOptions();
      self.debug("updating user media ...");
      ua.getUserMedia(options, function(localStream) {
        self.eventbus.emit('userMediaUpdated', localStream);
        if (activeSession) {
          self.debug("changing active session ...");
          activeSession.changeSession({
            localMedia: localStream,
            createOfferConstraints: options.createOfferConstraints
          }, function() {
            self.debug('change session succeeded');
          }, function() {
            self.debug('change session failed');
          });
        }

        if (userMediaCallback) {
          userMediaCallback(localStream);
        }
      }, function(e) {
        self.eventbus.emit('message', {text: self.configuration.messageGetUserMedia || "Get User Media Failed", level: "alert"});
        if (failureCallback) {
          failureCallback(e);
        }
      }, true);
    }
  };

  // Incoming reinvite function
  self.incomingReInvite = function(e) {
    if (this.configuration.enableAutoAcceptReInvite) {
      self.debug("auto accepting reInvite");
      e.data.session.acceptReInvite();
    } else {
      self.eventbus.emit('reInvite', e.data);
    }
  };

  self.incomingCall = function(evt) {
    var session = evt.data.session;
    if (!activeSession && this.configuration.isAutoAnswer()) {
      session.answer(this.configuration.getExSIPOptions());
    } else {
      self.eventbus.emit('incomingCall', evt);
    }
  };

  self.init = function(data) {
    try {
      if (ua) {
        self.debug('stopping existing UA');
        ua.stop();
      }

      if (this.configuration.disabled) {
        return;
      }
      ua = new ExSIP.UA(this.configuration.getExSIPConfig(data));

      this.updateRtcMediaHandlerOptions();

      // Start SIP Stack
      ua.start();

      // sipStack callbacks
      ua.on('connected', function(e) {
        self.eventbus.emit('viewChanged');
        self.eventbus.emit('connected', e);
      });
      ua.on('disconnected', function(e) {
        self.eventbus.emit('viewChanged');
        self.eventbus.emit('disconnected', e);
      });
      ua.on('onReInvite', function(e) {
        self.debug("incoming onReInvite event");
        self.incomingReInvite(e);
      });
      ua.on('newRTCSession', function(e) {
        var session = e.data.session;
        sessions.push(session);
        self.eventbus.emit('viewChanged');

        // call event handlers
        session.on('progress', function(e) {
          self.eventbus.emit('progress', e);
        });
        session.on('failed', function(e) {
          self.eventbus.emit('failed', e);
        });
        session.on('started', function(e) {
          self.eventbus.emit('viewChanged', self);
          self.eventbus.emit('started', e);
        });
        session.on('resumed', function(e) {
          self.eventbus.emit('viewChanged', self);
          self.eventbus.emit('resumed', e);
        });
        session.on('held', function(e) {
          self.eventbus.emit('viewChanged', self);
          self.eventbus.emit('held', e);
        });
        session.on('ended', function(e) {
          self.eventbus.emit('ended', e);
        });
        session.on('newDTMF', function(e) {
          self.eventbus.emit('newDTMF', e);
        });
        session.on('dataSent', function(e) {
          self.eventbus.emit('dataSent', e);
        });
        session.on('dataReceived', function(e) {
          self.eventbus.emit('dataReceived', e);
        });
        // handle incoming call
        if (e.data.session.direction === "incoming") {
          self.incomingCall(e);
        } else {
          if (!activeSession) {
            self.debug('new active session : ' + session.id);
            activeSession = session;
          }
        }
      });

      ua.on('registered', function() {
        self.eventbus.emit('registered');
      });
      ua.on('unregistered', function() {
        self.eventbus.emit('unregistered');
      });
      ua.on('registrationFailed', function(e) {
        self.eventbus.emit('registrationFailed', e);
      });
    } catch (e) {
      self.debug('could not init sip stack', e);
    }
  };

  return self;
}