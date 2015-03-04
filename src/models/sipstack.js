module.exports = SIPStack;

var ExSIP = require('exsip');
var C = require('webrtc-core/Constants');
var Utils = require('webrtc-core/Utils');

function SIPStack(eventbus, configuration, settings, debug) {
  var self = {};

  self.ua = null;
  self.activeSession = null;
  self.sessions = [];

  var setActiveSession = function(session) {
    debug("setting active session to " + session.id);
    self.activeSession = session;
  };

  self.listeners = function() {
    eventbus.on("signOut", function(e) {
      self.unregister();
    });
    eventbus.on("signIn", function(e) {
      self.init();
    });
    eventbus.on("connected", function(e) {
      self.updateUserMedia();
    });
    eventbus.on("resumed", function(e) {
      setActiveSession(e.sender);
    });
    eventbus.on("started", function(e) {
      setActiveSession(e.sender);
    });
    eventbus.on("resolutionChanged", function(e) {
      self.updateRtcMediaHandlerOptions();
      self.updateUserMedia();
    });
    eventbus.on("bandwidthChanged", function(e) {
      self.updateRtcMediaHandlerOptions();
    });
    eventbus.once("started", function(e) {
      var dtmfTones = Utils.parseDTMFTones(configuration.destination);
      if (dtmfTones) {
        debug("DTMF tones found in destination - sending DTMF tones : " + dtmfTones);
        self.sendDTMF(dtmfTones);
      }
    });
    eventbus.on('authenticate', function(e) {
      self.init(e);
    });
  };
  self.getLocalStreams = function() {
    return self.activeSession ? self.activeSession.getLocalStreams() : null;
  };
  self.getRemoteStreams = function() {
    return self.activeSession ? self.activeSession.getRemoteStreams() : null;
  };
  self.getSessionId = function() {
    return self.activeSession.id.replace(/\./g, '');
  };
  self.terminateSession = function(session) {
    session = session || self.activeSession;
    if (!session) {
      return;
    }
    var index = self.sessions.indexOf(session);
    if (index !== -1) {
      self.sessions.splice(index, index + 1);
    }
    if (session.status !== ExSIP.RTCSession.C.STATUS_TERMINATED) {
      session.terminate();
    }
    if (session === self.activeSession) {
      debug("clearing active session");
      self.activeSession = null;
    }
    eventbus.viewChanged(self);
  };
  self.terminateSessions = function() {
    var allSessions = [];
    allSessions = allSessions.concat(self.sessions);
    for (var i = 0; i < allSessions.length; i++) {
      self.terminateSession(allSessions[i]);
    }
  };
  self.holdAndAnswer = function(session) {
    var firstSession = self.activeSession;
    session.on('ended', function() {
      eventbus.emit('message', {text: 'Resuming with ' + firstSession.remote_identity.uri.user, level: 'normal'});
      debug("incoming call ended - unholding first call");
      firstSession.unhold(function() {
        debug("unhold first call successful");
      });
    });
    self.activeSession.hold(function() {
      debug("hold successful - answering incoming call");
      self.answer(session);
    });
  };
  self.answer = function(session) {
    session.answer(configuration.getExSIPOptions());
  };
  self.hold = function(successCallback, failureCallback) {
    if (self.activeSession) {
      self.activeSession.hold(successCallback, failureCallback);
    }
  };
  self.unhold = function(successCallback, failureCallback) {
    if (self.activeSession) {
      self.activeSession.unhold(successCallback, failureCallback);
    }
  };
  self.reconnectUserMedia = function(successCallback, failureCallback) {
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
    self.updateUserMedia(onUserMediaUpdateSuccess, failureCallback);
  };
  self.call = function(destination) {
    var session = self.ua.call(destination, configuration.getExSIPOptions());
    session.on('failed', function(e) {
      eventbus.emit('failed', e.data);
    });
    eventbus.calling(destination, session);
  };
  self.sendDTMF = function(digit) {
    self.activeSession.sendDTMF(digit, configuration.getDTMFOptions());
  };
  self.isStarted = function() {
    return self.getCallState() === C.STATE_STARTED;
  };
  self.unregister = function() {
    return self.ua && self.ua.unregister();
  };
  self.register = function() {
    return self.ua && self.ua.register();
  };
  self.isRegistered = function() {
    return self.ua && self.ua.isRegistered();
  };
  self.sendData = function(data) {
    if (self.activeSession) {
      self.activeSession.sendData(data);
    }
  };
  self.transfer = function(transferTarget, isAttended) {
    if (isAttended) {
      self.ua.attendedTransfer(transferTarget, self.activeSession);
    } else {
      self.ua.transfer(transferTarget, self.activeSession);
    }
  };
  self.updateRtcMediaHandlerOptions = function() {
    if (typeof(self.ua) === 'undefined') {
      return;
    }

    self.ua.setRtcMediaHandlerOptions(configuration.getRtcMediaHandlerOptions());
  };
  self.getCallState = function() {
    if (self.sessions.length > 0) {
      if (self.sessions.length === 1 && !self.sessions[0].isStarted()) {
        return C.STATE_CALLING;
      } else {
        if (self.activeSession && self.activeSession.isHeld()) {
          return C.STATE_STARTED + " " + C.STATE_HELD;
        } else {
          return C.STATE_STARTED;
        }
      }
    } else {
      if (self.ua && self.ua.isConnected && self.ua.isConnected()) {
        return C.STATE_CONNECTED;
      } else {
        return C.STATE_DISCONNECTED;
      }
    }
  };
  self.updateUserMedia = function(userMediaCallback, failureCallback) {
    if (!configuration.disabled && (configuration.enableConnectLocalMedia || self.activeSession)) {
      // Connect to local stream
      var options = configuration.getExSIPOptions();
      self.ua.getUserMedia(options, function(localStream) {
        eventbus.emit('userMediaUpdated', localStream);
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
        eventbus.emit('message', {text: configuration.messageGetUserMedia || "Get User Media Failed", level: "alert"});
        if (failureCallback) {
          failureCallback(e);
        }
      }, true);
    }
  };

  // Incoming reinvite function
  self.incomingReInvite = function(e) {
    if (configuration.enableAutoAcceptReInvite) {
      debug("auto accepting reInvite");
      e.data.session.acceptReInvite();
    } else {
      eventbus.emit('reInvite', e.data);
    }
  };

  self.incomingCall = function(evt) {
    var session = evt.data.session;
    if (!self.activeSession && settings.autoAnswer) {
      session.answer(configuration.getExSIPOptions());
    } else {
      eventbus.emit('incomingCall', evt);
    }
  };

  self.init = function(data) {
    try {
      if (self.ua) {
        debug('stopping existing UA');
        self.ua.stop();
      }

      if (configuration.disabled) {
        debug('sipstack disabled');
        return;
      }
      self.ua = new ExSIP.UA(configuration.getExSIPConfig(data));

      self.updateRtcMediaHandlerOptions();

      // Start SIP Stack
      self.ua.start();

      // sipStack callbacks
      self.ua.on('connected', function(e) {
        eventbus.viewChanged(self);
        var hasListeners = require('event-emitter/has-listeners');
        eventbus.emit('connected', e);
      });
      self.ua.on('disconnected', function(e) {
        eventbus.viewChanged(self);
        eventbus.emit('disconnected', e);
      });
      self.ua.on('onReInvite', function(e) {
        debug("incoming onReInvite event");
        self.incomingReInvite(e);
      });
      self.ua.on('newRTCSession', function(e) {
        var session = e.data.session;
        self.sessions.push(session);
        eventbus.viewChanged(self);

        // call event handlers
        session.on('progress', function(e) {
          eventbus.emit('progress', e);
        });
        session.on('failed', function(e) {
          var data = e.data;
          data.sender = e.sender;
          eventbus.emit('failed', data);
        });
        session.on('started', function(e) {
          eventbus.viewChanged(self);
          eventbus.emit('started', e);
        });
        session.on('resumed', function(e) {
          eventbus.viewChanged(self);
          eventbus.emit('resumed', e);
        });
        session.on('held', function(e) {
          eventbus.viewChanged(self);
          eventbus.emit('held', e);
        });
        session.on('ended', function(e) {
          eventbus.emit('ended', e);
        });
        session.on('newDTMF', function(e) {
          eventbus.emit('newDTMF', e);
        });
        session.on('dataSent', function(e) {
          eventbus.emit('dataSent', e);
        });
        session.on('dataReceived', function(e) {
          eventbus.emit('dataReceived', e);
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

      self.ua.on('registered', function() {
        eventbus.emit('registered');
      });
      self.ua.on('unregistered', function() {
        eventbus.emit('unregistered');
      });
      self.ua.on('registrationFailed', function(e) {
        eventbus.emit('registrationFailed', e);
      });
    } catch (e) {
      debug(e.stack);
      debug('could not init sip stack');
    }
  };

  return self;
}