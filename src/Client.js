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
    this.initUi();

    this.video = new WebRTC.Video(this);
    this.configuration = new WebRTC.Configuration();
    this.sound = new WebRTC.Sound();
    this.settings = new WebRTC.Settings(this, this.configuration, this.sound);
    this.stats = new WebRTC.Stats(this);
    this.timer = new WebRTC.Timer(this, this.stats, this.configuration);
    this.history = new WebRTC.History(this.sound);
    this.sipStack = null;
    this.rtcSession = null;
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
          self.rtcSession.terminate();
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
    uriCall: function(destination)
    {
      destination = this.validateDestination(destination);
      if (destination === false)
      {
        return;
      }

      this.setCallState("calling");
      this.callButton.fadeOut(1000);

      logger.log("calling destination : "+destination, this.configuration);

      this.message(ClientConfig.messageCall, "success");

      // Start the Call
      this.sipStack.call(destination, this.configuration.getExSIPOptions());
    },

    // Incoming reinvite function
    incomingReInvite: function(e) {
      var self = this;
      if (ClientConfig.enableAutoAcceptReInvite) {
        logger.log("auto accepting reInvite");
        e.data.session.acceptReInvite();
      } else {
        this.setEvent("reInvite");
        var incomingCallName = e.data.request.from.display_name;
        var incomingCallUser = e.data.request.from.uri.user;
        var title = e.data.audioAdd ? "Adding Audio" : "Adding Video";
        this.message(title, "success");
        $("#reInvitePopup").fadeIn(100);
        $("#reInvitePopup .incomingCallName").text(incomingCallName);
        $("#reInvitePopup .incomingCallUser").text(incomingCallUser);
        $("#reInvitePopup .title").text(title);
        this.acceptReInviteCall.off("click");
        this.acceptReInviteCall.on("click", function(){
          self.setEvent("reInvite-done");
          e.data.session.acceptReInvite();
        });
        this.rejectReInviteCall.off("click");
        this.rejectReInviteCall.on("click", function(){
          self.setEvent("reInvite-done");
          e.data.session.rejectReInvite();
        });
      }
    },

    // Incoming call function
    incomingCall: function(e)
    {
      var incomingCallName = e.data.request.from.display_name;
      var incomingCallUser = e.data.request.from.uri.user;
      this.message("Incoming Call", "success");
      if (ClientConfig.enableAutoAnswer)
      {
        this.rtcSession.answer(this.configuration.getExSIPOptions());
      }
      else
      {
        $("#callPopup").fadeIn(100);
        $("#callPopup .incomingCallName").text(incomingCallName);
        $("#callPopup .incomingCallUser").text(incomingCallUser);
        this.sound.playRingtone();
      }
    },

    endCall: function() {
      this.setCallState("ended");
      this.video.updateSessionStreams(this.rtcSession);
  //  rtcSession = null;
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

    getSessionId: function(){
      return this.rtcSession.id.replace(/\./g,'');
    },

    setCookie: function()
    {
      if (!ClientConfig.enableCallHistory)
      {
        return;
      }
      // Get latest cookie
      var allCookies = document.cookie;
      var callsArray = allCookies.match(/call_(.*?)\:\d{2}\:\d{2}/g);
      var callNumber = null;
      if (callsArray)
      {
        callNumber = callsArray.length + 1;
      }
      else
      {
        callNumber = 0;
      }
      callNumber++;

      // cookie vars
      var start = this.rtcSession.start_time;
      var epochStart = new Date(start).getTime();
      var length = this.timer.format(Math.round(Math.abs((this.rtcSession.end_time - start) / 1000)));
      var remote = this.rtcSession.remote_identity.uri;
      var direction = null;
      if (this.rtcSession.direction === "outgoing")
      {
        direction = "------>";
      }
      else
      {
        direction = "<------";
      }
      var cookieKey = ("call_" + callNumber);
      var cookieValue = (epochStart + "|" + remote + "|" + direction + "|" + length);
      $.cookie(cookieKey, cookieValue, { expires: ClientConfig.expires});
    },

    // Initial startup
    onLoad: function(userid, password) {
      var self = this;
      logger.log("onLoad", this.configuration);

      // SIP stack
      this.sipStack = new ExSIP.UA(this.configuration.getExSIPConfig(userid, password));

      this.updateRtcMediaHandlerOptions();

      // Start SIP Stack
      this.sipStack.start();

      // Start the GUI
      this.guiStart();

      // sipStack callbacks
      this.sipStack.on('connected', function(e)
      {
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

        self.updateUserMedia(function(){
          // Start a call
          if (self.configuration.destination !== false)
          {
            self.uriCall(self.configuration.destination);
          }
        });
      });
      this.sipStack.on('disconnected', function(e)
      {
        if (ClientConfig.enableConnectionIcon)
        {
          $("#connected").removeClass("success");
          $("#connected").addClass("alert").fadeIn(100);
        }
        self.message(ClientConfig.messageConnectionFailed, "alert");
        self.endCall();
        self.callButton.hide();
      });
      this.sipStack.on('onReInvite', function(e) {
        logger.log("incoming onReInvite event");
        self.incomingReInvite(e);
      });
      this.sipStack.on('newRTCSession', function(e)
      {
        self.rtcSession = e.data.session;

        // call event handlers
        self.rtcSession.on('progress', function(e)
        {
          self.message(ClientConfig.messageProgress, "normal");
          self.sound.playDtmfRingback();
        });
        self.rtcSession.on('failed', function(e)
        {
          var error = e.data.cause;
          self.message(error, "alert");
          if (error === "User Denied Media Access")
          {
            self.errorPopup("WebRTC was not able to access your camera!");
          }
          self.sound.pause();
          self.endCall();
        });
        self.rtcSession.on('started', function(e)
        {
          self.setCallState("started");
          self.video.updateSessionStreams(self.rtcSession);
          $('.stats-container').attr('id', self.getSessionId()+'-1');
          self.sound.pause();
          self.timer.start();
          self.message(ClientConfig.messageStarted, "success");
        });
        self.rtcSession.on('ended', function(e)
        {
          self.message(ClientConfig.messageEnded, "normal");
          self.setCookie();
          self.endCall();
        });
        // handle incoming call
        if (e.data.session.direction === "incoming")
        {
          self.incomingCall(e);
        }
      });
      if(!ClientConfig.enableConnectLocalMedia) {
        if (self.configuration.destination !== false) {
          // Wait 300 ms for websockets connection then call destination in URL
          setTimeout(function(){self.uriCall(self.configuration.destination);},300);
        }
      }

      // Registration callbacks only if registering
      if (password !== false)
      {
        this.sipStack.on('registered', function(e)
        {
          if (ClientConfig.enableRegistrationIcon)
          {
            $("#registered").removeClass("alert");
            $("#registered").addClass("success").fadeIn(10).fadeOut(3000);
          }
          self.message(ClientConfig.messageRegistered, "success");
        });
        this.sipStack.on('registrationFailed', function(e)
        {
          if (ClientConfig.enableRegistrationIcon)
          {
            //$("#registered").removeClass("success");
            $("#registered").addClass("alert").fadeIn(100);
          }
          self.message(ClientConfig.messageRegistrationFailed, "alert");
        });
      }
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
          this.rtcSession.sendDTMF(digit, this.configuration.getDTMFOptions());
        }
      }
    },

    enableLocalAudio: function(enabled) {
      var localMedia = this.rtcSession.getLocalStreams()[0];
      var localAudio = localMedia.getAudioTracks()[0];
      localAudio.enabled = enabled;
    },

    registerListeners: function() {
      var self = this;

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
        self.rtcSession.terminate();
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
        self.enableLocalAudio(false);
      });

      this.unmuteAudio.bind('click', function(e)
      {
        self.setMuted(false);
        e.preventDefault();
        self.sound.playClick();
        self.enableLocalAudio(true);
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
        if(self.transferTypeAttended.is(':checked')) {
          self.sipStack.attendedTransfer(transferTarget, self.rtcSession);
        } else {
          self.sipStack.transfer(transferTarget, self.rtcSession);
        }
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

      $('#acceptIncomingCall, #rejectIncomingCall').bind('click', function(e)
      {
        e.preventDefault();
        $("#callPopup").fadeOut(500);
        self.sound.pause();
        if (this.id === "acceptIncomingCall")
        {
          self.callButton.fadeOut(1000);
          self.rtcSession.answer(self.configuration.getExSIPOptions());
        }
        else if (this.id === "rejectIncomingCall")
        {
          self.rtcSession.terminate();
        }
      });

      // Dialpad digits
      $("#dialpad").bind('click', function(e)
      {
        self.pressDTMF(e.target.textContent);
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

    updateRtcMediaHandlerOptions: function(){
      if(typeof(this.sipStack) === 'undefined') {
        return;
      }

      this.sipStack.setRtcMediaHandlerOptions(this.configuration.getRtcMediaHandlerOptions());
    },

    updateUserMedia: function(userMediaCallback){
      var self = this;
      if(ClientConfig.enableConnectLocalMedia) {
        // Connect to local stream
        var options = this.configuration.getExSIPOptions();
        this.sipStack.getUserMedia(options, function(localStream){
          self.video.updateStreams([localStream], []);
          if(userMediaCallback) {
            userMediaCallback();
          }
        }, function(){
          this.message(ClientConfig.messageGetUserMedia || "Get User Media Failed", "alert");
        }, true);
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
