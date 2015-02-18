module.exports = SIPStack;

var ExSIP = require('exsip');

function SIPStack(options, eventbus, debug, configuration, settings) {
  var self = {};

  self.ua = null;
  var activeSession = null;
  var sessions = [];

  var C = self.C = {
    // RTCSession states
    STATE_CONNECTED: "connected",
    STATE_DISCONNECTED: "disconnected",
    STATE_CALLING: "calling",
    STATE_STARTED: "started",
    STATE_HELD: "held"
  };

  var setActiveSession = function(session) {
    debug("setting active session to " + session.id);
    activeSession = session;
    self.updateUserMedia();
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
      var dtmfTones = Utils.parseDTMFTones(configuration.destination);
      if (dtmfTones && e.data && !e.data.isReconnect) {
        debug("DTMF tones found in destination - sending DTMF tones : " + dtmfTones);
        self.sendDTMF(dtmfTones);
      }
    });
    eventbus.on('authenticate', function(e) {
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
      debug("clearing active session");
      activeSession = null;
    }
    eventbus.viewChanged(self);
  };
  self.terminateSessions = function() {
    var allSessions = [];
    allSessions = allSessions.concat(sessions);
    for (var i = 0; i < allSessions.length; i++) {
      self.terminateSession(allSessions[i]);
    }
  };
  self.holdAndAnswer = function(session) {
    var firstSession = activeSession;
    session.on('ended', function() {
      eventbus.emit('message', {text: 'Resuming with ' + firstSession.remote_identity.uri.user, level: 'normal'});
      debug("incoming call ended - unholding first call");
      firstSession.unhold(function() {
        debug("unhold first call successful");
      });
    });
    activeSession.hold(function() {
      debug("hold successful - answering incoming call");
      self.answer(session);
    });
  };
  self.answer = function(session) {
    session.answer(configuration.getExSIPOptions());
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
      debug("reconnect user media successful");
      if (activeSession) {
        activeSession.changeSession({
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
    eventbus.emit('calling', session);
  };
  self.sendDTMF = function(digit) {
    activeSession.sendDTMF(digit, configuration.getDTMFOptions());
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
    if (activeSession) {
      activeSession.sendData(data);
    }
  };
  self.transfer = function(transferTarget, isAttended) {
    if (isAttended) {
      self.ua.attendedTransfer(transferTarget, activeSession);
    } else {
      self.ua.transfer(transferTarget, activeSession);
    }
  };
  self.updateRtcMediaHandlerOptions = function() {
    if (typeof(self.ua) === 'undefined') {
      return;
    }

    self.ua.setRtcMediaHandlerOptions(configuration.getRtcMediaHandlerOptions());
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
      if (self.ua && self.ua.isConnected && self.ua.isConnected()) {
        return C.STATE_CONNECTED;
      } else {
        return C.STATE_DISCONNECTED;
      }
    }
  };
  self.updateUserMedia = function(userMediaCallback, failureCallback) {
    debug('updateUserMedia : '+configuration.disabled+', '+configuration.enableConnectLocalMedia+', '+activeSession);
    if (!configuration.disabled && (configuration.enableConnectLocalMedia || activeSession)) {
      // Connect to local stream
      var options = configuration.getExSIPOptions();
      debug("updating user media ...");
      self.ua.getUserMedia(options, function(localStream) {
        eventbus.emit('userMediaUpdated', localStream);
        if (activeSession) {
          debug("changing active session ...");
          activeSession.changeSession({
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
    if (!activeSession && configuration.isAutoAnswer()) {
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
        eventbus.emit('connected', e);
      });
      self.ua.on('disconnected', function(e) {
        eventbus.emit('viewChanged');
        eventbus.emit('disconnected', e);
      });
      self.ua.on('onReInvite', function(e) {
        debug("incoming onReInvite event");
        self.incomingReInvite(e);
      });
      self.ua.on('newRTCSession', function(e) {
        var session = e.data.session;
        sessions.push(session);
        eventbus.viewChanged(self);

        // call event handlers
        session.on('progress', function(e) {
          eventbus.emit('progress', e);
        });
        session.on('failed', function(e) {
          eventbus.emit('failed', e);
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
          if (!activeSession) {
            debug('new active session : ' + session.id);
            activeSession = session;
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