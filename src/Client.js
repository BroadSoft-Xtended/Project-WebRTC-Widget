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

  Client = function() {
    this.main = $("#main");
    this.client = $("#client");
    this.muteAudio = $('#muteAudio');
    this.unmuteAudio = $('#unmuteAudio');
    this.hangup = $("#hangup");
    this.destination = $("#callControl input#destination");
    this.callButton = $('#call');
    this.reInvitePopup = $('#reInvitePopup');
    this.acceptReInviteCall = $("#acceptReInviteCall");
    this.rejectReInviteCall = $("#rejectReInviteCall");
    this.messages = $("#messages");
    this.callPopup = $("#callPopup");
    this.incomingCallName = $("#callPopup .incomingCallName");
    this.incomingCallUser = $("#callPopup .incomingCallUser");
    this.acceptIncomingCall = $("#acceptIncomingCall");
    this.rejectIncomingCall = $("#rejectIncomingCall");
    this.holdAndAnswerButton = $("#holdAndAnswerButton");
    this.dropAndAnswerButton = $("#dropAndAnswerButton");
    this.errorPopup = $( "#errorPopup" );

    this.configuration = new WebRTC.Configuration();
    this.eventBus = new WebRTC.EventBus(this.configuration);
    this.sipStack = new WebRTC.SIPStack(this, this.configuration, this.eventBus);
    this.sound = new WebRTC.Sound(this.sipStack);
    this.video = new WebRTC.Video(this, this.sipStack, this.eventBus);
    this.settings = new WebRTC.Settings(this, this.configuration, this.sound, this.eventBus, this.sipStack);
    this.stats = new WebRTC.Stats(this.sipStack);
    this.timer = new WebRTC.Timer(this, this.stats, this.configuration);
    this.history = new WebRTC.History(this, this.sound, this.stats, this.sipStack);
    this.transfer = new WebRTC.Transfer(this, this.sound, this.sipStack);
    this.authentication = new WebRTC.Authentication(this, this.configuration, this.eventBus);
    this.hold = new WebRTC.Icon($( "#hold" ), this.sound);
    this.resume = new WebRTC.Icon($( "#resume" ), this.sound);
    this.fullScreen = false;
    this.muted = false;

    this.configuration.setSettings(this.settings);

    this.registerListeners();

    this.init();
  };

  Client.prototype = {
    init: function() {
      var self = this;
      var unsupported = WebRTC.Utils.compatibilityCheck();
      if(unsupported)
      {
        $('#unsupported').html(unsupported).show();
      }

      // Allow some windows to be draggable, required jQuery.UI
      if (ClientConfig.enableWindowDrag)
      {
        $(function()
        {
          self.video.local.draggable({
            snap: "#remoteVideo,#videoBar",
            stop: function( event, ui ) {self.settings.updateViewPositions();}
          });
          $("#callStats").draggable({
            snap: "#remoteVideo,#videoBar",
            stop: function( event, ui ) {self.settings.updateViewPositions();}
          });
          $("#callHistory").draggable({
            snap: "#remoteVideo,#videoBar",
            stop: function( event, ui ) {self.settings.updateViewPositions();}
          });
        });
      }

      if (this.configuration.destination)
      {
        this.configuration.hideCallControl = true;
      }

      this.updateClientClass();

      $.cookie.raw = true;

      window.onbeforeunload = function(e) {
        self.sipStack.terminateSessions();
        self.endCall();
        return null;
      };

      if (!this.configuration.userid)
      {
        this.configuration.userid = WebRTC.Utils.randomUserid();
      }
      this.onLoad(this.configuration.userid, this.configuration.getPassword());
    },

    showErrorPopup: function(error) {
      window.alert(error);
    },

    // Setup the GUI
    guiStart: function() {
      // Set size for Chrome and Firefox
      $("#main").css("zoom", this.configuration.size);
      $("#main").css("-moz-transform", "scale(" + this.configuration.size +")");
      if (($.cookie("settingWindowPosition")))
      {
        var windowPositions = $.cookie("settingWindowPosition").split('|');
        for (var i = 0; i < windowPositions.length; ++i)
        {
          var elementPosition = windowPositions[i].split('-');
          $(elementPosition[0]).css("top", elementPosition[1]);
          $(elementPosition[0]).css("left", elementPosition[2]);
        }
      }
      // Fade in UI elements
      $("#remoteVideo, #videoBar").fadeIn(1000);
      if (ClientConfig.enableCallControl && !this.configuration.hideCallControl)
      {
        $("#callControl, #ok").fadeIn(1000);
      }
      if (ClientConfig.enableDialpad)
      {
        $("#dialpadIconShow").fadeIn(1000);
      }
      if (ClientConfig.enableSelfView)
      {
        if ($.cookie('settingSelfViewDisable') === "true")
        {
          $("#localVideo, #selfViewDisable").fadeOut(100);
          $("#selfViewEnable").fadeIn(1000);
        }
        else
        {
          $("#selfViewEnable").fadeOut(1000);
          $("#localVideo, #selfViewDisable").fadeIn(1000);
        }
      }
      if (ClientConfig.enableSettings)
      {
        $("#settings").fadeIn(1000);
      }
      if (ClientConfig.enableFullScreen)
      {
        $("#fullScreenExpand").fadeIn(1000);
      }
    },

    // Display status messages
    message: function(text, level)
    {
      if(!ClientConfig.enableMessages)
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
      if (!ClientConfig.allowOutside && !new RegExp("[.||@]"+ClientConfig.domainTo).test(destination) )
      {
        this.message(ClientConfig.messageOutsideDomain, "alert");
        return(false);
      }
      if ((destination.indexOf("@") === -1))
      {
        destination = (destination + "@" + ClientConfig.domainTo);
      }
      var domain = destination.substring(destination.indexOf("@"));
      if(domain.indexOf(".") === -1) {
        destination = destination + "." + ClientConfig.domainTo;
      }

      // WEBRTC-35 : filter out dtmf tones from destination
      return destination.replace(/,[0-9A-D#*,]+/, '');
    },

    // URL call
    uriCall: function(destinationToValidate)
    {
      var destination = this.validateDestination(destinationToValidate);
      if (destination === false)
      {
        logger.log("destination is not valid : "+destinationToValidate, this.configuration);
        return;
      }

      logger.log("calling destination : "+destination, this.configuration);

      this.message(ClientConfig.messageCall, "success");

      // Start the Call
      this.sipStack.call(destination);
    },

    endCall: function() {
      this.setEvent(null);
      this.video.updateSessionStreams();
      // Bring up the main elements
      if (ClientConfig.enableCallControl === true)
      {
        this.configuration.hideCallControl = false;
        this.updateClientClass();
      }

      this.guiStart();

      if (this.configuration.timerRunning === true)
      {
        this.timer.stop();
      }
      if (ClientConfig.endCallURL !== false)
      {
        window.location = ClientConfig.endCallURL;
      }
    },

    // Initial startup
    onLoad: function(userid, password) {
      var self = this;
      logger.log("onLoad", this.configuration);

      this.sipStack.init(userid, password);

      if(!ClientConfig.enableConnectLocalMedia) {
        if (self.configuration.destination !== false) {
          // Wait 300 ms for websockets connection then call destination in URL
          setTimeout(function(){self.uriCall(self.configuration.destination);},300);
        }
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
      if (this.configuration.timerRunning === true)
      {
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
        this.sound.playDtmfTone(file);
        this.destination.val(this.destination.val() + digit);
        if (this.configuration.timerRunning === true)
        {
          this.sipStack.sendDTMF(digit);
        }
      }
    },

    registerListeners: function() {
      var self = this;

      this.eventBus.on("ended", function(e){
        self.sipStack.terminateSession(e.sender);
        self.message(ClientConfig.messageEnded.replace('{0}', e.sender.remote_identity.uri.user), "normal");
        self.history.persistCall(e.sender);
        self.endCall();
      });
      this.eventBus.on("unholded", function(e){
        self.onSessionStarted(e.sender);
        self.message(ClientConfig.messageResume.replace('{0}', e.sender.remote_identity.uri.user), "success");
      });
      this.eventBus.on("started", function(e){
        self.onSessionStarted(e.sender);
        var dtmfTones = WebRTC.Utils.parseDTMFTones(self.configuration.destination);
        if(dtmfTones && e.data && !e.data.isReconnect) {
          logger.log("DTMF tones found in destination - sending DTMF tones : "+dtmfTones);
          self.sipStack.sendDTMF(dtmfTones);
        }
        if(e.data && !e.data.isReconnect) {
          self.message(ClientConfig.messageStarted.replace('{0}', e.sender.remote_identity.uri.user), "success");
        }
      });
      this.eventBus.on("holded", function(e){
        self.message(ClientConfig.messageHold.replace('{0}', e.sender.remote_identity.uri.user), "success");
      });
      this.eventBus.on("disconnected", function(e){
        if (ClientConfig.enableConnectionIcon)
        {
          $("#connected").removeClass("success");
          $("#connected").addClass("alert").fadeIn(100);
        }
        self.message(ClientConfig.messageConnectionFailed, "alert");
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
        self.sipStack.terminateSession(e.sender);
      });
      this.eventBus.on("progress", function(e){
        self.message(ClientConfig.messageProgress, "normal");
        self.sound.playDtmfRingback();
      });
      this.eventBus.on("message", function(e){
        self.message(e.data.text, e.data.level);
      });
      this.eventBus.on("registrationFailed", function(e){
        if (ClientConfig.enableRegistrationIcon)
        {
          //$("#registered").removeClass("success");
          $("#registered").addClass("alert").fadeIn(100);
        }
        var statusCode = e.data.response.status_code;
        var msg = statusCode;
        if(statusCode === 403) {
          msg = "403 Authentication Failure";
        }
        self.message(ClientConfig.messageRegistrationFailed.replace('{0}', msg), "alert");
      });
      this.eventBus.on("registered", function(e){
        if (ClientConfig.enableRegistrationIcon)
        {
          $("#registered").removeClass("alert");
          $("#registered").addClass("success").fadeIn(10).fadeOut(3000);
        }
        self.message(ClientConfig.messageRegistered, "success");
      });
      this.eventBus.on("connected", function(e){
        if (ClientConfig.enableConnectionIcon)
        {
          $("#connected").removeClass("alert");
          $("#connected").addClass("success").fadeIn(10).fadeOut(3000);
        }
        self.message(ClientConfig.messageConnected, "success");

        self.sipStack.updateUserMedia(function(){
          // Start a call
          if (self.configuration.destination !== false)
          {
            self.uriCall(self.configuration.destination);
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
        $("#reInvitePopup").fadeIn(100);
        $("#reInvitePopup .incomingCallName").text(incomingCallName);
        $("#reInvitePopup .incomingCallUser").text(incomingCallUser);
        $("#reInvitePopup .title").text(title);
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

      // Buttons
      this.callButton.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.call();
      });

      this.hangup.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.sipStack.terminateSession();
        self.endCall();
        if (self.fullScreen === true)
        {
          $('#fullScreenContract').click();
        }
      });

      $('#fullScreenExpand').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        $('#video')[0].webkitRequestFullScreen();
        self.fullScreen = true;
      });

      $('#fullScreenContract').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        document.webkitCancelFullScreen();
        self.fullScreen = false;
        $("#fullScreenContract").fadeOut(100);
        $("#fullScreenExpand").fadeIn(1000);
      });

      $('#selfViewDisable').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        $("#localVideo, #selfViewDisable").fadeOut(100);
        $("#selfViewEnable").fadeIn(1000);
      });

      $('#selfViewEnable').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        $("#selfViewEnable").fadeOut(1000);
        $("#localVideo, #selfViewDisable").fadeIn(1000);
      });

      this.hold.onClick(function(e)
      {
        self.hold.disable();
        var enable = function(){
          self.hold.enable();
        };
        self.sipStack.hold(enable, enable);
      });

      this.resume.onClick(function(e)
      {
        self.resume.disable();
        var enable = function(){
          self.resume.enable();
        };
        self.sipStack.unhold(enable, enable);
      });

      this.muteAudio.bind('click', function(e)
      {
        self.setMuted(true);
        e.preventDefault();
        self.sound.playClick();
        self.sound.enableLocalAudio(false);
      });

      this.unmuteAudio.bind('click', function(e)
      {
        self.setMuted(false);
        e.preventDefault();
        self.sound.playClick();
        self.sound.enableLocalAudio(true);
      });

      $('#dialpadIconShow').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        $("#dialIconpadShow").fadeOut(1000);
        $("#dialpad, #dialpadIconHide").fadeIn(1000);
      });

      $('#dialpadIconHide').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        $("#dialpad, #dialpadIconHide").fadeOut(1000);
        $("#dialpadIconShow").fadeIn(1000);
      });

      $("#historyClose").bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.history.toggle();
      });

      // Dialpad digits
      $("#dialpad").bind('click', function(e)
      {
        self.pressDTMF(e.target.textContent);
      });

      this.destination.keypress(function (e) {
        if (e.keyCode === 13 && self.sipStack.getCallState() === WebRTC.SIPStack.C.STATE_CONNECTED) {
          e.preventDefault();
          self.call();
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
      $('.stats-container').attr('id', this.sipStack.getSessionId()+'-1');
      this.sound.pause();
      this.timer.start();
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

    call: function(){
      var destination = this.destination.val();
      if (destination === "")
      {
        this.message(ClientConfig.messageEmptyDestination, "alert");
      }
      else
      {
        this.uriCall(destination);
      }
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

    updateClientClass: function(){
      var classes = [];
      classes.push("r"+this.configuration.getResolutionDisplay());
      var callState = this.sipStack.getCallState();
      if(callState) {
        classes.push(callState);
      }
      if(this.event) {
        classes.push(this.event);
      }
      if (ClientConfig.enableMute)
      {
        classes.push("enable-mute");
      }
      if (ClientConfig.enableCallControl && !this.configuration.hideCallControl)
      {
        classes.push("enable-call-control");
      }
      if (ClientConfig.enableTransfer)
      {
        classes.push("enable-transfer");
      }
      if (ClientConfig.enableHold)
      {
        classes.push("enable-hold");
      }
      if(this.muted) { classes.push("muted"); } else { classes.push("unmuted"); }
      if(this.transfer.visible) { classes.push("transfer-visible"); } else { classes.push("transfer-hidden"); }
      if(this.authentication.visible) { classes.push("auth-visible"); } else { classes.push("auth-hidden"); }
      this.client.attr("class", classes.join(" "));
    }
  };

  WebRTC.Client = Client;
}(WebRTC));
