/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var SIPStack,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'SIPStack'),
    C = {
      // RTCSession states
      STATE_CONNECTED:    "connected",
      STATE_DISCONNECTED: "disconnected",
      STATE_CALLING:      "calling",
      STATE_STARTED:      "started",
      STATE_HELD:         "held"
    };

  SIPStack = function(configuration, eventBus) {
    this.configuration = configuration;
    this.eventBus = eventBus;
    this.ua = null;
    this.activeSession = null;
    this.sessions = [];
  };

  SIPStack.prototype = {
    getLocalStreams: function(){
      return this.activeSession ? this.activeSession.getLocalStreams() : null;
    },

    getRemoteStreams: function(){
      return this.activeSession ? this.activeSession.getRemoteStreams() : null;
    },

    getSessionId: function(){
      return this.activeSession.id.replace(/\./g,'');
    },

    terminateSession: function(session){
      session = session || this.activeSession;
      if(!session) {
        return;
      }
      var index = this.sessions.indexOf(session);
      if(index !== -1) {
        this.sessions.splice(index, index+1);
      }
      if(session.status !== ExSIP.RTCSession.C.STATUS_TERMINATED) {
        session.terminate();
      }
      if(session === this.activeSession) {
        logger.log("clearing active session", this.configuration);
        this.activeSession = null;
      }
      this.eventBus.viewChanged(this);
    },

    terminateSessions: function(){
      var allSessions = [];
      allSessions = allSessions.concat(this.sessions);
      for(var i=0; i<allSessions.length; i++){
        this.terminateSession(allSessions[i]);
      }
    },

    holdAndAnswer: function(session){
      var self = this;
      var firstSession = this.activeSession;
      session.on('ended', function(e) {
        self.eventBus.message("Resuming with " + firstSession.remote_identity.uri.user, "normal");
        logger.log("incoming call ended - unholding first call", self.configuration);
        firstSession.unhold(function() {
          logger.log("unhold first call successful", self.configuration);
        });
      });
      this.activeSession.hold(function(){
        logger.log("hold successful - answering incoming call", self.configuration);
        self.answer(session);
      });
    },

    hasVideo: function(session){
      return session && session.rtcMediaHandler && session.rtcMediaHandler.peerConnection && session.rtcMediaHandler.peerConnection.remoteDescription &&
      session.rtcMediaHandler.peerConnection.remoteDescription.hasVideo();
    },

    hasRemoteDescription: function(session){
      return session && session.rtcMediaHandler && session.rtcMediaHandler.peerConnection && session.rtcMediaHandler.peerConnection.remoteDescription;
    },

    answer: function(session){
      session.answer(this.configuration.getExSIPOptions(this.hasRemoteDescription() && !this.hasVideo(session)));

    },

    hold: function(successCallback, failureCallback){
      if(this.activeSession) {
        this.updateUserMedia(successCallback, this.activeSession, {hold: true});
      }
    },

    unhold: function(successCallback, failureCallback){
      if(this.activeSession) {
        this.updateUserMedia(successCallback, this.activeSession, {resume: true});
      }
    },

    call: function(destination){
      var self = this;
      var session = this.ua.call(destination, this.configuration.getExSIPOptions());
      session.on('failed', function(e)
      {
        self.eventBus.failed(e.sender, e.data);
      });
      this.eventBus.calling(session);
    },

    sendDTMF: function(digit) {
      this.activeSession.sendDTMF(digit, this.configuration.getDTMFOptions());
    },

    isStarted: function() {
      return this.getCallState() === C.STATE_STARTED;
    },

    transfer: function(transferTarget, isAttended) {
      if(isAttended) {
        this.ua.attendedTransfer(transferTarget, this.activeSession);
      } else {
        this.ua.transfer(transferTarget, this.activeSession);
      }
    },

    updateRtcMediaHandlerOptions: function(){
      if(typeof(this.ua) === 'undefined') {
        return;
      }

      this.ua.setRtcMediaHandlerOptions(this.configuration.getRtcMediaHandlerOptions());
    },

    getCallState: function(){
      if(this.sessions.length > 0) {
        if(this.sessions.length === 1 && !this.sessions[0].isStarted()) {
          return C.STATE_CALLING;
        } else {
          if(this.activeSession && this.activeSession.isHeld()) {
            return C.STATE_STARTED + " " + C.STATE_HELD;
          } else {
            return C.STATE_STARTED;
          }
        }
      } else {
        if(this.ua && this.ua.isConnected()) {
          return C.STATE_CONNECTED;
        } else {
          return C.STATE_DISCONNECTED;
        }
      }
    },

    updateUserMedia: function(userMediaCallback, session, opts){
      var self = this;
      if(this.configuration.enableConnectLocalMedia || this.activeSession || session) {
        // Connect to local stream
        var options = this.configuration.getExSIPOptions();
        logger.log("updating user media ...", self.configuration);
        this.ua.getUserMedia(options, function(localStream){
          self.eventBus.userMediaUpdated(localStream);
          if(self.activeSession || session) {
            opts = opts || {};
            opts.localMedia = localStream;
            opts.createOfferConstraints = options.createOfferConstraints;
            logger.log("changing active session ...", self.configuration);
            (self.activeSession || session).changeSession(opts, function(){
              logger.log('change session succeeded', self.configuration);
            }, function(){
              logger.log('change session failed', self.configuration);
            }, true);
          }

          if(userMediaCallback) {
            userMediaCallback(localStream);
          }
        }, function(){
          self.eventBus.message(this.configuration.messageGetUserMedia || "Get User Media Failed", "alert");
        }, true);
      }
    },

    // Incoming reinvite function
    incomingReInvite: function(e) {
      if (this.configuration.enableAutoAcceptReInvite) {
        logger.log("auto accepting reInvite", this.configuration);
        e.data.session.acceptReInvite();
      } else {
        this.eventBus.reInvite(e.data);
      }
    },

    incomingCall: function(evt)
    {
      var session = evt.data.session;
      if (!this.activeSession && this.configuration.isAutoAnswer())
      {
        session.answer(this.configuration.getExSIPOptions());
      }
      else
      {
        this.eventBus.incomingCall(evt.data);
      }
    },

    init: function(userid, password){
      var self = this;

      if(this.ua) {
        logger.log('stopping existing UA', this.configuration);
        this.ua.stop();
      }

      this.ua = new ExSIP.UA(this.configuration.getExSIPConfig(userid, password));

      this.updateRtcMediaHandlerOptions();

      // Start SIP Stack
      this.ua.start();

      // sipStack callbacks
      this.ua.on('connected', function(e)
      {
        self.eventBus.viewChanged(self);
        self.eventBus.connected(e.data);
      });
      this.ua.on('disconnected', function(e)
      {
        self.eventBus.viewChanged(self);
        self.eventBus.disconnected(e.data);
      });
      this.ua.on('onReInvite', function(e) {
        logger.log("incoming onReInvite event", self.configuration);
        self.incomingReInvite(e);
      });
      this.ua.on('newRTCSession', function(e)
      {
        var session = e.data.session;
        self.sessions.push(session);
        self.eventBus.viewChanged(self);

        session.on('progress', function(e)
        {
          self.eventBus.progress(e.sender, e.data);
        });
        session.on('failed', function(e)
        {
          self.eventBus.failed(e.sender, e.data);
        });
        session.on('started', function(e) {
          self.eventBus.viewChanged(self);
          self.eventBus.started(e.sender, e.data);
        });
        session.on('resumed', function(e) {
          self.eventBus.viewChanged(self);
          self.eventBus.resumed(e.sender, e.data);
        });
        session.on('held', function(e) {
          self.eventBus.viewChanged(self);
          self.eventBus.held(e.sender, e.data);
        });
        session.on('ended', function(e)
        {
          self.eventBus.ended(e.sender, e.data);
        });
        session.on('newDTMF', function(e)
        {
          self.eventBus.newDTMF(e.sender, e.data);
        });
        // handle incoming call
        if (e.data.session.direction === "incoming")
        {
          self.incomingCall(e);
        } else {
          if(!self.activeSession) {
            logger.log('new active session : '+session.id, self.configuration);
            self.activeSession = session;
          }
        }
      });

      this.ua.on('registered', function(e)
      {
        self.eventBus.registered();
      });
      this.ua.on('registrationFailed', function(e)
      {
        self.eventBus.registrationFailed(e.data);
      });
    }
  };
  WebRTC.SIPStack = SIPStack;
  WebRTC.SIPStack.C = C;
}(WebRTC));
