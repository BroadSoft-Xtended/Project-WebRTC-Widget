/***************************************************
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton
 *
 * Copyright 2013 Broadsoft
 * http://www.broadsoft.com
 ***************************************************/
(function(WebRTC) {
  var Client,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Client');

  Client = function(selector, config) {
    this.client = $(selector || "#client");
    this.main = this.client.find(".main");
    this.muteAudioIcon = this.client.find('.muteAudioIcon');
    this.unmuteAudioIcon = this.client.find('.unmuteAudioIcon');
    this.hangup = this.client.find(".hangup");
    this.callControl = this.client.find(".callControl");
    this.destination = this.callControl.find("input.destination");
    this.callButton = this.client.find('.call');
    this.reInvitePopup = this.client.find('.reInvitePopup');
    this.acceptReInviteCall = this.client.find(".acceptReInviteCall");
    this.rejectReInviteCall = this.client.find(".rejectReInviteCall");
    this.messages = this.client.find(".messages");
    this.callPopup = this.client.find(".callPopup");
    this.incomingCallName = this.callPopup.find(".incomingCallName");
    this.incomingCallUser = this.callPopup.find(".incomingCallUser");
    this.acceptIncomingCall = this.callPopup.find(".acceptIncomingCall");
    this.rejectIncomingCall = this.callPopup.find(".rejectIncomingCall");
    this.holdAndAnswerButton = this.callPopup.find(".holdAndAnswerButton");
    this.dropAndAnswerButton = this.callPopup.find(".dropAndAnswerButton");
    this.errorPopup = this.client.find( ".errorPopup" );
    this.fullScreenExpandIcon = this.client.find(".fullScreenExpand");
    this.fullScreenContractIcon = this.client.find(".fullScreenContract");
    this.dialpadShowIcon = this.client.find(".dialpadIconShow");
    this.dialpadHideIcon = this.client.find(".dialpadIconHide");
    this.dialpad = this.client.find(".dialpad");
    this.selfViewEnableIcon = this.client.find(".selfViewEnable");
    this.selfViewDisableIcon = this.client.find(".selfViewDisable");
    this.connected = this.client.find(".connected-icon");
    this.registered = this.client.find(".registered-icon");
    this.historyClose = this.client.find(".historyClose");
    this.callHistory = this.client.find(".callHistory");
    this.callStats = this.client.find(".callStats");

    if(!config && typeof(ClientConfig) === 'undefined') {
      $('#unsupported').text("Could not read ClientConfig - make sure it is included and properly formatted");
      $('#unsupported').show();
      return;
    }

    this.configuration = new WebRTC.Configuration(this);
    this.configuration = new WebRTC.Configuration(this, (config || ClientConfig));
    this.eventBus = new WebRTC.EventBus(this.configuration);
    this.sipStack = new WebRTC.SIPStack(this, this.configuration, this.eventBus);
    this.sound = new WebRTC.Sound(this.sipStack, this.configuration);
    this.video = new WebRTC.Video(this, this.sipStack, this.eventBus);
    this.settings = new WebRTC.Settings(this, this.configuration, this.sound, this.eventBus, this.sipStack);
    this.stats = new WebRTC.Stats(this, this.sipStack, this.configuration);
    this.timer = new WebRTC.Timer(this, this.stats, this.configuration);
    this.history = new WebRTC.History(this, this.sound, this.stats, this.sipStack, this.configuration);
    this.transfer = new WebRTC.Transfer(this, this.sound, this.sipStack, this.configuration);
    this.authentication = new WebRTC.Authentication(this, this.configuration, this.eventBus);
    this.hold = new WebRTC.Icon(this.client.find( ".hold" ), this.sound);
    this.resume = new WebRTC.Icon(this.client.find( ".resume" ), this.sound);
    this.fullScreen = false;
    this.selfViewEnabled = true;
    this.dialpadShown = false;
    this.muted = false;

    this.configuration.setSettings(this.settings);

    this.registerListeners();

    this.init();
  };

  Client.prototype = {
    init: function() {
      var self = this;
      var unsupported = WebRTC.Utils.compatibilityCheck(this);
      if(unsupported)
      {
        $('#unsupported').html(unsupported).show();
      }

      // Allow some windows to be draggable, required jQuery.UI
      if (this.configuration.enableWindowDrag)
      {
        $(function()
        {
          self.video.local.draggable({
            snap: ".remoteVideo,.videoBar",
            containment: "parent",
            snapTolerance: 200,
            stop: function( event, ui ) {self.settings.updateViewPositions();}
          });
          // self.callStats.draggable({
          //   snap: ".remoteVideo,.videoBar",
          //   containment: "parent",
          //   stop: function( event, ui ) {self.settings.updateViewPositions();}
          // });
          // self.callHistory.draggable({
          //   snap: ".remoteVideo,.videoBar",
          //   containment: "parent",
          //   stop: function( event, ui ) {self.settings.updateViewPositions();}
          // });
        });
      }

      if (this.configuration.destination)
      {
        this.configuration.hideCallControl = true;
      }

      this.updateClientClass();

      $.cookie.raw = true;

      window.onbeforeunload = function(e) {
        self.endCall({rtcSession: 'all'});
        return null;
      };

      if (!this.configuration.userid)
      {
        this.configuration.userid = WebRTC.Utils.randomUserid();
      }
      this.onLoad();
    },

    showErrorPopup: function(error) {
      window.alert(error);
    },

    // Setup the GUI
    guiStart: function() {
      // Set size for Chrome and Firefox
      this.main.css("zoom", this.configuration.size);
      this.main.css("-moz-transform", "scale(" + this.configuration.size +")");
      if (($.cookie("settingWindowPosition")))
      {
        var windowPositions = $.cookie("settingWindowPosition").split('|');
        for (var i = 0; i < windowPositions.length; ++i)
        {
          var elementPosition = windowPositions[i].split('-');
          this.client.find(elementPosition[0]).css("top", elementPosition[1]);
          this.client.find(elementPosition[0]).css("left", elementPosition[2]);
        }
      }
      // Fade in UI elements
      this.client.find(".remoteVideo, .videoBar").fadeIn(1000);
      if (this.configuration.enableCallControl && !this.configuration.hideCallControl)
      {
        this.callControl.fadeIn(1000);
      }
      else {
        this.callControl.fadeOut(1000);
      }
    },

    find: function(selector) {
      return this.client.find(selector);
    },

    // Display status messages
    message: function(text, level)
    {
      if(!this.configuration.enableMessages)
      {
        return;
      }
      this.messages.stop(true, true).fadeOut();
      this.messages.removeClass("normal success warning alert");
      this.messages.addClass(level).text(text).fadeIn(10).fadeOut(10000);
    },

    // Make sure destination allowed and in proper format
    validateDestination: function(destination)
    {
      if (destination.indexOf("sip:") === -1)
      {
        destination = ("sip:" + destination);
      }
      if (!this.configuration.allowOutside && !new RegExp("[.||@]"+this.configuration.domainTo).test(destination) )
      {
        this.message(this.configuration.messageOutsideDomain, "alert");
        return(false);
      }
      if ((destination.indexOf("@") === -1))
      {
        destination = (destination + "@" + this.configuration.domainTo);
      }
      var domain = destination.substring(destination.indexOf("@"));
      if(domain.indexOf(".") === -1) {
        destination = destination + "." + this.configuration.domainTo;
      }

      // WEBRTC-35 : filter out dtmf tones from destination
      return destination.replace(/,[0-9A-D#*,]+/, '');
    },

    // URL call
    callUri: function(destinationToValidate)
    {
      if(this.sipStack.getCallState() !== WebRTC.SIPStack.C.STATE_CONNECTED) {
        logger.log('Already in call with state : '+this.sipStack.getCallState());
        return;
      }
      if (destinationToValidate === "")
      {
        this.message(this.configuration.messageEmptyDestination, "alert");
        return;
      }

      var destination = this.validateDestination(destinationToValidate);
      if (destination === false)
      {
        logger.log("destination is not valid : "+destinationToValidate, this.configuration);
        return;
      }

      logger.log("calling destination : "+destination, this.configuration);

      this.message(this.configuration.messageCall, "success");

      // Start the Call
      this.sipStack.call(destination);
    },

    setClientConfig: function(clientConfig) {
      var connectionChanged = this.configuration.websocketsServers[0].ws_uri !== clientConfig.websocketsServers[0].ws_uri;
      jQuery.extend(this.configuration, clientConfig);
      this.guiStart();
      this.updateClientClass();
      if(connectionChanged) {
        this.sipStack.init();
      }
    },

    endCall: function(options) {
      options = options || {};
      var rtcSession = options['rtcSession'];
      if(rtcSession === 'all') {
        this.sipStack.terminateSessions();
      } else if(rtcSession) {
        this.sipStack.terminateSession(rtcSession);
      } else {
        this.sipStack.terminateSession();
      }
      this.setEvent(null);
      this.sound.pause();
      this.video.updateSessionStreams();
      // Bring up the main elements
      if (this.configuration.enableCallControl === true)
      {
        this.configuration.hideCallControl = false;
        this.updateClientClass();
      }

      this.guiStart();

      this.timer.stop();
      this.checkEndCallURL();
    },

    // Initial startup
    checkEndCallURL: function() {
      if (this.configuration.endCallURL)
      {
        window.location = this.configuration.endCallURL;
      }
    },

    onLoad: function() {
      var self = this;
      logger.log("onLoad", this.configuration);

      this.sipStack.init();

      if(!this.configuration.enableConnectLocalMedia && this.configuration.destination) {
        this.eventBus.once("connected", function(e){
          self.callUri(self.configuration.destination);
        });
      }

      // Start the GUI
      this.guiStart();
    },

    // What we do when we get a digit during a call
    pressDTMF: function(digit)
    {
      if (digit.length !== 1)
      {
        return;
      }
      if (this.sipStack.isStarted())
      {
        this.destination.val(this.destination.val() + digit);
        this.sound.playClick();
        this.sipStack.sendDTMF(digit);
      }
    },

    resumeCall: function() {
      var self = this;
      this.resume.disable();
      var enable = function(){
        self.resume.enable();
      };
      this.sipStack.unhold(enable, enable);
    },

    hideSelfView: function() {
      this.selfViewEnabled = false;
      this.updateClientClass();
    },

    stopFullScreen: function() {
      if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      this.fullScreen = false;
      this.updateClientClass();
    },

    showSelfView: function() {
      this.selfViewEnabled = true;
      this.updateClientClass();
    },

    showFullScreen: function() {
      if(this.client[0].webkitRequestFullScreen) {
        this.client[0].webkitRequestFullScreen();
      }
      this.fullScreen = true;
      this.updateClientClass();
    },

    muteAudio: function() {
      this.setMuted(true);
      this.sound.enableLocalAudio(false);
    },

    unmuteAudio: function() {
      this.setMuted(false);
      this.sound.enableLocalAudio(true);
    },

    showDialpad: function() {
      this.dialpadShown = true;
      this.updateClientClass();
    },

    hideDialpad: function() {
      this.dialpadShown = false;
      this.updateClientClass();
    },

    updateFullScreen: function() {
      this.fullScreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
      this.updateClientClass();
    },

    holdCall: function() {
      var self = this;
      this.hold.disable();
      var enable = function(){
        self.hold.enable();
      };
      this.sipStack.hold(enable, enable);
    },

    getRemoteUser: function(rtcSession) {
      return rtcSession.remote_identity.uri.user || rtcSession.remote_identity.uri.host;
    },

    registerListeners: function() {
      var self = this;

      this.eventBus.on("ended", function(e){
        self.message(self.configuration.messageEnded.replace('{0}', self.getRemoteUser(e.sender)), "normal");
        self.history.persistCall(e.sender);
        self.endCall({rtcSession: e.sender});
      });
      this.eventBus.on("resumed", function(e){
        self.onSessionStarted(e.sender);
        self.message(self.configuration.messageResume.replace('{0}', self.getRemoteUser(e.sender)), "success");
      });
      this.eventBus.on("started", function(e){
        self.onSessionStarted(e.sender);
        var dtmfTones = WebRTC.Utils.parseDTMFTones(self.configuration.destination);
        if(dtmfTones && e.data && !e.data.isReconnect) {
          logger.log("DTMF tones found in destination - sending DTMF tones : "+dtmfTones);
          self.sipStack.sendDTMF(dtmfTones);
        }
        //remove configuration.destination to avoid multiple calls
        delete self.configuration.destination;
        if(e.data && !e.data.isReconnect) {
          self.message(self.configuration.messageStarted.replace('{0}', self.getRemoteUser(e.sender)), "success");
          self.timer.start();
        }
      });
      this.eventBus.on("held", function(e){
        self.message(self.configuration.messageHold.replace('{0}', self.getRemoteUser(e.sender)), "success");
      });
      this.eventBus.on("disconnected", function(e){
        if (self.configuration.enableConnectionIcon)
        {
          self.connected.removeClass("success");
          self.connected.addClass("alert").fadeIn(100);
        }
        var msg = self.configuration.messageConnectionFailed;
        if(e.data && e.data.reason) {
          msg = e.data.reason;
        }
        if(e.data && e.data.retryAfter) {
          msg += " - Retrying in "+e.data.retryAfter+" seconds";
        }
        self.message(msg, "alert");
        self.endCall();
      });
      this.eventBus.on("failed", function(e){
        var error = e.data.cause;
        self.message(error, "alert");
        if (error === "User Denied Media Access")
        {
          self.showErrorPopup("WebRTC was not able to access your microphone/camera!");
        }
        else if (error === ExSIP.C.causes.CANCELED)
        {
          self.setEvent("incomingCall-done");
        }
        self.sound.pause();
        self.endCall({rtcSession: e.sender});
      });
      this.eventBus.on("progress", function(e){
        self.message(self.configuration.messageProgress, "normal");
        self.sound.playDtmfRingback();
      });
      this.eventBus.on("message", function(e){
        self.message(e.data.text, e.data.level);
      });
      this.eventBus.on("registrationFailed", function(e){
        if (self.configuration.enableRegistrationIcon)
        {
          //$("#registered").removeClass("success");
          self.registered.addClass("alert").fadeIn(100);
        }
        var statusCode = e.data.response.status_code;
        var msg = statusCode;
        if(statusCode === 403) {
          msg = "403 Authentication Failure";
        }
        self.message(self.configuration.messageRegistrationFailed.replace('{0}', msg), "alert");
      });
      this.eventBus.on("registered", function(e){
        if (self.configuration.enableRegistrationIcon)
        {
          self.registered.removeClass("alert");
          self.registered.addClass("success").fadeIn(10).fadeOut(3000);
        }
        self.message(self.configuration.messageRegistered, "success");
      });
      this.eventBus.on("connected", function(e){
        if (self.configuration.enableConnectionIcon)
        {
          self.connected.removeClass("alert");
          self.connected.addClass("success").fadeIn(10).fadeOut(3000);
        }
        self.message(self.configuration.messageConnected, "success");

        self.sipStack.updateUserMedia(function(){
          if (self.configuration.destination)
          {
            self.callUri(self.configuration.destination);
          }
        });
      });
      this.eventBus.on("incomingCall", function(evt){
        var incomingCallName = evt.data.request.from.display_name;
        var incomingCallUser = evt.data.request.from.uri.user;
        self.message("Incoming Call", "success");
        self.setEvent("incomingCall");
        self.incomingCallName.text(incomingCallName);
        self.incomingCallUser.text(incomingCallUser);
        WebRTC.Utils.rebindListeners("click",
          [self.rejectIncomingCall, self.acceptIncomingCall, self.holdAndAnswerButton, self.dropAndAnswerButton],
          function(e) {
            e.preventDefault();
            self.incomingCallHandler($(this), evt.data.session);
          }
        );
        self.sound.playRingtone();
      });
      this.eventBus.on("reInvite", function(e){
        self.setEvent("reInvite");
        var incomingCallName = e.data.request.from.display_name;
        var incomingCallUser = e.data.request.from.uri.user;
        var title = e.data.audioAdd ? "Adding Audio" : "Adding Video";
        self.message(title, "success");
        self.reInvitePopup.find(".incomingCallName").text(incomingCallName);
        self.reInvitePopup.find(".incomingCallUser").text(incomingCallUser);
        self.reInvitePopup.find(".title").text(title);
        self.acceptReInviteCall.off("click");
        self.acceptReInviteCall.on("click", function(){
          self.setEvent("reInvite-done");
          e.data.session.acceptReInvite();
        });
        self.rejectReInviteCall.off("click");
        self.rejectReInviteCall.on("click", function(){
          self.setEvent("reInvite-done");
          e.data.session.rejectReInvite();
        });
      });
      this.eventBus.on('message', function(e)
      {
        self.message();
      });
      this.eventBus.on('newDTMF', function(e)
      {
        var digit = e.data.tone;
        logger.log('DTMF sent : '+ digit, self.configuration);
        var file = null;
        if (digit === "*")
        {
          file = "star";
        }
        else if (digit === "#")
        {
          file = "pound";
        }
        else
        {
          file = digit;
        }
        self.sound.playDtmfTone(file);
      });

      // Buttons
      this.callButton.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.callUri(self.destination.val());
      });

      this.hangup.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.endCall();
        if (self.fullScreen)
        {
          self.fullScreenContractIcon.click();
        }
      });

      this.fullScreenExpandIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.showFullScreen();
      });

      this.fullScreenContractIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.stopFullScreen();
      });
      $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e)
      {
        self.updateFullScreen();
      });

      this.selfViewDisableIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.hideSelfView();
      });

      this.selfViewEnableIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.showSelfView();
      });
      $(".history-button").bind('click', function(e)
      {
        e.preventDefault();
        self.history.toggle();
      });
      $(".button-row button").bind('click', function(e)
      {
        e.preventDefault();
        var destinationStr = $("#destination").val();
        $("#destination").val(destinationStr + this.firstChild.nodeValue);
      });

      this.hold.onClick(function(e)
      {
        self.holdCall();
      });

      this.resume.onClick(function(e)
      {
        self.resumeCall();
      });

      this.muteAudioIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.muteAudio();
      });

      this.unmuteAudioIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.unmuteAudio();
      });

      this.dialpadShowIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.showDialpad();
      });

      this.dialpadHideIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.hideDialpad();
      });

      this.historyClose.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.history.toggle();
      });

      // Dialpad digits
      this.dialpad.bind('click', function(e)
      {
        self.pressDTMF(e.target.textContent);
      });

      this.destination.keypress(function (e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          self.callUri(self.destination.val());
        }
      });
      $(".video").bind("click",function(e){
        var $target = $(e.target);
        var dialpad = $target.closest(".dialpad").length;
        var history = $target.closest(".callHistory").length;
        var details = $target.closest(".callHistoryDetails").length;
        if(dialpad === 0 || history === 0 || details === 0)
        {
            //$(".callHistory").fadeOut(100);
            self.history.historyToggled = true;
            self.history.toggle();
        }
      });

  // Digits from keyboard
      document.onkeypress=function(e)
      {
        e = e || window.event;
        if(self.transfer.targetInput.is(e.srcElement)) {
          return;
        }

        if ((e.charCode >= 48 && e.charCode <= 57) || e.charCode === 35 || e.charCode === 42)
        {
          var digit = String.fromCharCode(e.charCode);
          self.pressDTMF(digit);
        }
        else if (e.charCode === 83)
        {
          self.stats.toggle();
        }
        else if (e.charCode === 72)
        {
          self.history.toggle();
        }
      };
    },

    onSessionStarted: function(sender){
      logger.log("setting active session to "+ sender.id, this.configuration);
      this.sipStack.activeSession = sender;
      this.video.updateSessionStreams(sender);
      this.client.find('.stats-container').attr('id', this.sipStack.getSessionId()+'-1');
      this.sound.pause();
    },

    incomingCallHandler: function(source, session){
      this.setEvent("incomingCall-done");
      this.sound.pause();
      if (source.is(this.acceptIncomingCall)) {
        this.sipStack.answer(session);
      } else if (source.is(this.dropAndAnswerButton)) {
        this.sipStack.terminateSession();
        this.sipStack.answer(session);
      } else if (source.is(this.holdAndAnswerButton)) {
        this.sipStack.holdAndAnswer(session);
      } else if (source.is(this.rejectIncomingCall)) {
        this.sipStack.terminateSession(session);
      }
    },

    setEvent: function(event){
      this.event = event;
      this.updateClientClass();
    },
    setMuted: function(muted){
      this.muted = muted;
      this.updateClientClass();
    },

    validateUserMediaResolution: function(){
      var encodingWidth = this.settings.getResolutionEncodingWidth();
      var encodingHeight = this.settings.getResolutionEncodingHeight();
      var videoWidth = this.video.localWidth();
      var videoHeight = this.video.localHeight();
      logger.log("validating video resolution "+videoWidth+","+videoHeight+" to match selected encoding "+encodingWidth+","+encodingHeight, this.configuration);
      if(!videoWidth && !videoHeight) {
        return;
      }

      if(encodingWidth !== videoWidth || encodingHeight !== videoHeight) {
        var msg = "Video resolution "+videoWidth+","+videoHeight+" does not match selected encoding "+encodingWidth+","+encodingHeight;
        this.message(msg, "alert");
        logger.warn(msg, this.configuration);
      }
    },

    setAudioOnlyOfferAndRec: function(audioOnly){
      this.configuration.audioOnly = audioOnly;
      this.configuration.offerToReceiveVideo = !audioOnly;
      this.sipStack.updateUserMedia();
    },

    setAudioOnly: function(audioOnly){
      this.configuration.audioOnly = audioOnly;
      this.configuration.offerToReceiveVideo = true;
      this.sipStack.updateUserMedia();
    },

    updateClientClass: function(){
      var classes = ["client"];
      classes.push("r"+this.configuration.getResolutionDisplay());
      classes.push(this.configuration.isWidescreen() ? "widescreen" : "standard");
      var callState = this.sipStack.getCallState();
      if(callState) {
        classes.push(callState);
      }
      if(this.event) {
        classes.push(this.event);
      }
      if (this.configuration.enableMute)
      {
        classes.push("enable-mute");
      }
      if (this.configuration.enableCallControl && !this.configuration.hideCallControl)
      {
        classes.push("enable-call-control");
      }
      if (this.configuration.enableTransfer)
      {
        classes.push("enable-transfer");
      }
      if (this.configuration.enableHold)
      {
        classes.push("enable-hold");
      }
      if (this.configuration.enableCallTimer)
      {
        classes.push("enable-timer");
      }
      if (this.configuration.enableSettings)
      {
        classes.push("enable-settings");
      }
      if (this.configuration.enableFullScreen)
      {
        classes.push("enable-full-screen");
      }
      if (this.configuration.enableSelfView)
      {
        classes.push("enable-self-view");
      }
      if (this.configuration.enableDialpad)
      {
        classes.push("enable-dialpad");
      }
      if (this.configuration.getView())
      {
        classes.push("view-"+this.configuration.getView());
      }
      if(this.muted) { classes.push("muted"); } else { classes.push("unmuted"); }
      if(this.settings.toggled) { classes.push("settings-shown"); } else { classes.push("settings-hidden"); }
      if(this.selfViewEnabled) { classes.push("self-view-enabled"); } else { classes.push("self-view-disabled"); }
      if(this.dialpadShown) { classes.push("dialpad-shown"); } else { classes.push("dialpad-hidden"); }
      if(this.fullScreen) { classes.push("full-screen-expanded"); } else { classes.push("full-screen-contracted"); }
      if(this.transfer.visible) { classes.push("transfer-visible"); } else { classes.push("transfer-hidden"); }
      if(this.authentication.visible) { classes.push("auth-visible"); } else { classes.push("auth-hidden"); }
      this.client.attr("class", classes.join(" "));
    }
  };

  WebRTC.Client = Client;
}(WebRTC));
