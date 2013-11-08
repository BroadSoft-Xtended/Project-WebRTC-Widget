/***************************************************
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton <nathan@robotics.net>
 *
 * Copyright 2013 Exario Networks
 * http://www.exarionetworks.com
 ***************************************************/
(function(WebRTC) {
  var Client,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Client');

  Client = function() {
    this.main = $("#main");
    this.muteAudio = $('#muteAudio');
    this.unmuteAudio = $('#unmuteAudio');
    this.hangup = $("#hangup");
    this.destination = $("#callControl input#destination");
    this.transfer = $("#transfer");
    this.transferPopup = $("#transferPopup");
    this.acceptTransfer = $("#acceptTransfer");
    this.rejectTransfer = $("#rejectTransfer");
    this.transferTarget = $("#transferTarget");
    this.transferTypeAttended = $("#transferTypeAttended");
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
    this.initUi();

    this.configuration = new WebRTC.Configuration();
    this.eventBus = new WebRTC.EventBus(this.configuration);
    this.sipStack = new WebRTC.SIPStack(this, this.configuration, this.eventBus);
    this.sound = new WebRTC.Sound(this.sipStack);
    this.video = new WebRTC.Video(this, this.sipStack, this.eventBus);
    this.settings = new WebRTC.Settings(this, this.configuration, this.sound);
    this.stats = new WebRTC.Stats(this.sipStack);
    this.timer = new WebRTC.Timer(this, this.stats, this.configuration);
    this.history = new WebRTC.History(this, this.sound, this.stats);
    this.fullScreen = false;
    this.state = null;
    this.muted = false;
    this.transferVisible = false;

    this.configuration.setSettings(this.settings);

    this.registerListeners();

    this.init();
  };

  Client.prototype = {
    initUi: function() {
      WebRTC.Utils.addSelectOptions(WebRTC.C.RESOLUTION_TYPES, "#resolutionTypeSelect");
      WebRTC.Utils.addSelectOptions(WebRTC.C.STANDARD_RESOLUTIONS, "#resolutionDisplayStandardSelect");
      WebRTC.Utils.addSelectOptions(WebRTC.C.WIDESCREEN_RESOLUTIONS, "#resolutionDisplayWidescreenSelect");
      WebRTC.Utils.addSelectOptions(WebRTC.C.STANDARD_RESOLUTIONS, "#resolutionEncodingStandardSelect");
      WebRTC.Utils.addSelectOptions(WebRTC.C.WIDESCREEN_RESOLUTIONS, "#resolutionEncodingWidescreenSelect");
    },

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

      // Initial function selection
      this.updateMainClass();

      if (this.configuration.register === true && !this.configuration.password)
      {
        this.authPopUp(this.configuration.userid, this.configuration.password);
      }
      else
      {
        if (!this.configuration.userid)
        {
          this.configuration.userid = WebRTC.Utils.randomUserid();
        }
      }

      if (this.configuration.destination)
      {
        this.configuration.hideCallControl = true;
      }

      $.cookie.raw = true;

      window.onbeforeunload = function(e) {
        if (self.configuration.timerRunning)
        {
          self.sipStack.terminateSessions();
        }
        self.endCall();
        return null;
      };

      this.onLoad(this.configuration.userid, this.configuration.password);
    },

    authPopUp: function() {
      var self = this;
      if (this.configuration.userid !== false)
      {
        $("#authPopup input#username").val(this.configuration.userid);
      }

      $("#authPopup").keypress(function(e)
      {
        if (e.which === 13)
        {
          $('#authPopupButton').click();
        }
      });

      $("#authPopup").fadeIn(300);
      $('#authPopupButton').click(function()
      {
        var userid = $("#authPopup input#username").val();
        var password = $("#authPopup input#password").val();
        if ($("#authPopup input#displayName").val())
        {
          self.configuration.displayName = $("#authPopup input#displayName").val();
        }
        self.configuration.register=true;
        if (userid === "")
        {
          $("#alert").text("Invalid Username").fadeIn(10).fadeOut(4000);
          return;
        }
        if (password === "")
        {
          $("#alert").text("Invalid Password").fadeIn(10).fadeOut(4000);
          return;
        }
        $("#authPopup").fadeOut(300);
        self.onLoad(userid, password);
      });
    },

    errorPopup: function(error) {
      $( "#errorPopup" ).text(error).dialog(
        {
          draggable: true,
          dialogClass: "no-close",
          buttons:
            [
              {
                text: "OK",
                click: function()
                {
                  $( this ).dialog( "close" );
                }
              }
            ]
        }
      );
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
        this.callButton.fadeIn(1000);
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
      return(destination);
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

      this.setCallState("calling");
      this.callButton.fadeOut(1000);

      logger.log("calling destination : "+destination, this.configuration);

      this.message(ClientConfig.messageCall, "success");

      // Start the Call
      this.sipStack.call(destination);
    },

    endCall: function() {
      this.setCallState("ended");
      this.setEvent(null);
      this.video.updateSessionStreams();
      // Bring up the main elements
      if (ClientConfig.enableCallControl === true)
      {
        this.configuration.hideCallControl = false;
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
      this.eventBus.on("started", function(e){
        logger.log("setting active session to "+ e.sender.id, self.configuration);
        self.sipStack.activeSession = e.sender;
        self.setCallState("started");
        self.video.updateSessionStreams(e.sender);
        $('.stats-container').attr('id', self.sipStack.getSessionId()+'-1');
        self.sound.pause();
        self.timer.start();
        self.message(ClientConfig.messageStarted.replace('{0}', e.sender.remote_identity.uri.user), "success");
      });
      this.eventBus.on("disconnected", function(e){
        if (ClientConfig.enableConnectionIcon)
        {
          $("#connected").removeClass("success");
          $("#connected").addClass("alert").fadeIn(100);
        }
        self.message(ClientConfig.messageConnectionFailed, "alert");
        self.endCall();
        self.callButton.hide();
      });
      this.eventBus.on("failed", function(e){
        var error = e.data.cause;
        self.message(error, "alert");
        if (error === "User Denied Media Access")
        {
          self.errorPopup("WebRTC was not able to access your camera!");
        }
        self.sound.pause();
        self.endCall();
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
        self.message(ClientConfig.messageRegistrationFailed, "alert");
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
        self.setCallState("connected");
        if (ClientConfig.enableConnectionIcon)
        {
          $("#connected").removeClass("alert");
          $("#connected").addClass("success").fadeIn(10).fadeOut(3000);
        }
        if (ClientConfig.enableCallControl && !self.configuration.hideCallControl)
        {
          self.callButton.fadeIn(1000);
        }
        self.message(ClientConfig.messageConnected, "success");

        self.sipStack.updateUserMedia(function(){
          // Start a call
          if (self.configuration.destination !== false)
          {
            self.client.uriCall(self.configuration.destination);
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

      this.transfer.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.setTransferVisible(!self.transferVisible);
        if(self.transferVisible) {
          self.transferTarget.focus();
        }
      });

      this.acceptTransfer.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        var transferTarget = self.transferTarget.val();
        if($.isBlank(transferTarget)) {
          self.message(ClientConfig.messageOutsideDomain, "alert");
          return;
        }
        transferTarget = self.validateDestination(transferTarget);
        self.setTransferVisible(false);
        self.sipStack.transfer(transferTarget, self.transferTypeAttended.is(':checked'));
      });

      this.rejectTransfer.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.setTransferVisible(false);
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

      this.eventBus.on('message', function(e)
      {
        self.message();
      });

      this.destination.keypress(function (e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          self.call();
        }
      });

  // Digits from keyboard
      document.onkeypress=function(e)
      {
        e = e || window.event;
        if(self.transferTarget.is(e.srcElement)) {
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

    incomingCallHandler: function(source, session){
      this.setEvent("incomingCall-done");
      this.sound.pause();
      if (source.is(this.acceptIncomingCall)) {
        this.callButton.fadeOut(1000);
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
      this.updateMainClass();
    },
    setCallState: function(state){
      this.state = state;
      this.updateMainClass();
    },
    setMuted: function(muted){
      this.muted = muted;
      this.updateMainClass();
    },
    setTransferVisible: function(visible){
      this.transferVisible = visible;
      this.updateMainClass();
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

    updateMainClass: function(){
      var mainClass = [];
      mainClass.push("r"+this.configuration.getResolutionDisplay());
      if(this.state) {
        mainClass.push(this.state);
      }
      if(this.event) {
        mainClass.push(this.event);
      }
      if (ClientConfig.enableMute)
      {
        mainClass.push("enable-mute");
      }
      if (ClientConfig.enableTransfer)
      {
        mainClass.push("enable-transfer");
      }
      if(this.muted) { mainClass.push("muted"); } else { mainClass.push("unmuted"); }
      if(this.transferVisible) { mainClass.push("transfer-visible"); } else { mainClass.push("transfer-hidden"); }
      this.main.attr("class", mainClass.join(" "));
    }
  };

  WebRTC.Client = Client;
}(WebRTC));
