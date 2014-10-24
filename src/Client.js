/*jshint unused: false */
/***************************************************
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton
 *
 * Copyright 2013 Broadsoft
 * http://www.broadsoft.com
 ***************************************************/
(function(WebRTC) {
  var Client,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Client'),
    ejs = require('ejs');

  Client = function(config, element) {
    this.config = config;    
    if(element) {
      this.appendTo($(element));
    }
  };

  Client.prototype = {
    setup: function(){
      var self = this;
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
      this.dialpadButtons = this.client.find(".dialpad button");
      this.selfViewEnableIcon = this.client.find(".selfViewEnable");
      this.selfViewDisableIcon = this.client.find(".selfViewDisable");
      this.connected = this.client.find(".connected-icon");
      this.registered = this.client.find(".registered-icon");
      this.historyClose = this.client.find(".historyClose");
      this.callHistory = this.client.find(".callHistory");
      this.callStats = this.client.find(".callStats");
      this.shareScreen = this.client.find( ".shareScreen" );
      this.stopShareScreen = this.client.find( ".stopShareScreen" );
      this.screenSharingUnsupported = this.client.find( ".screen_sharing_unsupported" );


      if(!this.config && typeof(ClientConfig) === 'undefined') {
        $('#unsupported').text("Could not read ClientConfig - make sure it is included and properly formatted");
        $('#unsupported').show();
        return;
      }

      this.config = this.config || WebRTC.Utils.clone(window.ClientConfig);
      this.eventBus = new WebRTC.EventBus({
        isDebug: function(){
          return self.config.debug === true;
        }
      });
      this.configuration = new WebRTC.Configuration(this.eventBus, this.config);
      this.sipStack = new WebRTC.SIPStack(this.configuration, this.eventBus);
      this.sound = new WebRTC.Sound(this.sipStack, this.configuration, this.eventBus);
      this.video = new WebRTC.Video(this.client.find('.video'), this.sipStack, this.eventBus, {
        onPlaying: function(){
          self.validateUserMediaResolution();
        }
      });
      this.xmpp = new WebRTC.XMPP(this, this.eventBus);
      this.sms = new WebRTC.SMS(this, this.client.find(".sms"), this.eventBus, this.sound);
      this.settings = new WebRTC.Settings(this, this.configuration, this.sound, this.eventBus, this.sipStack);
      this.stats = new WebRTC.Stats(this, this.sipStack, this.configuration);
      this.timer = new WebRTC.Timer(this, this.stats, this.configuration);
      this.history = new WebRTC.History(this, this.sound, this.stats, this.sipStack, this.configuration);
      this.transfer = new WebRTC.Transfer(this, this.sound, this.sipStack, this.configuration);
      this.whiteboard = new WebRTC.Whiteboard(this, this.client.find(".whiteboard"), this.eventBus, this.sipStack);
      this.fileShare = new WebRTC.FileShare(this, this.client.find(".file_share"), this.eventBus, this.sipStack);
      this.authentication = new WebRTC.Authentication(this.client.find(".authPopup"), this.eventBus, {
        onAuthenticate: function(data) {
          self.sipStack.init(data);
        },
        configurationRegister: self.configuration.register,
        settingsUserId: self.settings.userId,
        settingsAuthenticationUserId: self.settings.authenticationUserId,
        settingsPassword: self.settings.password
      });
      this.hold = new WebRTC.Icon(this.client.find( ".hold" ), this.sound);
      this.resume = new WebRTC.Icon(this.client.find( ".resume" ), this.sound);
      this.fullScreen = false;
      this.selfViewEnabled = true;
      this.dialpadShown = false;
      this.isScreenSharing = false;

      this.configuration.setSettings(this.settings);

      this.registerListeners();

      this.init();
    },
    appendTo: function(parent){
      this.updateCss();

      this.wrapper = $('<div/>', {class: 'webrtc-wrapper'});
      parent.append(this.wrapper);

      var renderData = {};
      var html = ejs.render(WebRTC.C.TEMPLATES.webrtc, renderData);
      this.wrapper.html(html);

      this.client = this.wrapper.find('.client');
      this.setup();
    },
    updateCss: function(styleData) {
      this.styleData = styleData || {};
      var cssData = $.extend({}, WebRTC.C.STYLES, WebRTC.C.FONTS, this.styleData);
      var cssStr = ejs.render(WebRTC.C.CSS.stylesheet, cssData);
      if ($("#webrtc_css").length === 0) {
        $("<style type='text/css' id='webrtc_css'>"+cssStr+"</style>").appendTo("head");
      } else {
        $("#webrtc_css").text(cssStr);
      }
    },
    init: function() {
      var self = this;
      var unsupported = WebRTC.Utils.compatibilityCheck(this);
      if(unsupported)
      {
        $('#unsupported').html(unsupported).show();
      }

      var whiteboardUnsupported = WebRTC.Utils.whiteboardCompabilityCheck();
      if(whiteboardUnsupported)
      {
        $('#whiteboard_unsupported').html(whiteboardUnsupported).show();
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

      this.updateClientClass();

      $.cookie.raw = true;

      window.onbeforeunload = function(e) {
        self.endCall({rtcSession: 'all'});
        return null;
      };

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
      if (this.configuration.enableCallControl)
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
      var messageEl = this.messages.find("."+level);
      messageEl.stop(true, true).fadeOut();
      messageEl.text(text).fadeIn(10).fadeOut(10000);
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
      jQuery.extend(this.config, clientConfig);
      jQuery.extend(this.configuration, this.config);
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

      this.guiStart();

      this.timer.stop();
      this.checkEndCallURL();
    },

    // Initial startup
    checkEndCallURL: function() {
      if (this.configuration.endCallURL && !this.configuration.disabled)
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
      this.sound.setMuted(true);
    },

    unmuteAudio: function() {
      this.sound.setMuted(false);
    },

    showDialpad: function() {
      this.dialpadShown = true;
      this.updateClientClass();
    },

    hideDialpad: function() {
      this.dialpadShown = false;
      this.updateClientClass();
    },

    toggleDialpad: function(flag) {
      this.dialpadShown = flag;
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

    enableScreenSharing: function(enabled) {
      var self = this;
      this.isScreenSharing = enabled;
      this.updateClientClass();
      if(enabled) {
        var onShareScreenSuccess = function(localMedia){
          localMedia.onended = function(){
            self.enableScreenSharing(false);
          };
        };
        var onShareScreenFailure = function(e){
          // no way to distinguish between flag not enabled or simply rejected enabling screen sharing
          if(e) {
            self.screenSharingUnsupported.show();
          }
          self.enableScreenSharing(false);
        };
        self.sipStack.reconnectUserMedia(onShareScreenSuccess, onShareScreenFailure);
      } else {
        self.sipStack.reconnectUserMedia();
      }
    },

    registerListeners: function() {
      var self = this;

      this.eventBus.on("viewChanged", function(e){
        self.updateClientClass();
      });
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
        self.updateClientClass();
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
        self.updateClientClass();
        if (self.configuration.enableRegistrationIcon)
        {
          self.registered.removeClass("alert");
          self.registered.addClass("success").fadeIn(10).fadeOut(3000);
        }
        self.message(self.configuration.messageRegistered, "success");
      });
      this.eventBus.on("unregistered", function(e){
        self.updateClientClass();
        self.message(self.configuration.messageUnregistered || 'Unregistered', "success");
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
        if(!digit) {
          return;
        }
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
      this.shareScreen.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.enableScreenSharing(true);
      });
      this.stopShareScreen.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.enableScreenSharing(false);
      });

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
        self.destination.focus();
        self.settings.toggleSettings(false);
      });

      this.dialpadHideIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.hideDialpad();
        self.history.historyToggled = true;
        self.history.toggle();
      });

      this.historyClose.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.history.toggle();
      });

      // Dialpad digits
      this.dialpadButtons.bind('click', function(e)
      {
        self.processDigitInput(e.target.textContent);
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
      $(document).unbind('keypress').bind('keypress', function(e)
      {
      });

      // Prevent the backspace key from navigating back if dialpad is shown
      $(document).unbind('keydown').bind('keydown', function (event) {
        var isModifier = event.altKey;
        if(isModifier) {
          if(self.transfer.targetInput.is(event.target)) {
            return;
          }

          console.dir(event);
          if (event.which === 83)
          {
            self.stats.toggle();
          }
          else if (event.which === 84)
          {
            self.sms.toggle();
          }
          // toggle whiteboard
          else if (event.which === 87)
          {
            self.whiteboard.toggle();
          }
          else if (event.which === 72)
          {
            self.history.toggle();
          }
          return;
        }

        if(self.dialpadShown) {
          var doPrevent = false;
          if (event.keyCode === 8) {
            var d = event.srcElement || event.target;
            if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' ||
              d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' ||
              d.type.toUpperCase() === 'EMAIL' )) || d.tagName.toUpperCase() === 'TEXTAREA') {
              doPrevent = d.readOnly || d.disabled;
            }
            else {
              doPrevent = true;
              self.destination.trigger('keydown', event);
              self.destination.putCursorAtEnd();
            }
          }

          if (doPrevent) {
            event.preventDefault();
            return;
          }
        }

        var digit = String.fromCharCode(event.which);
        self.processDigitInput(digit, event);

      });
    },

    processDigitInput: function(digit, event){
      if(!this.sipStack.isStarted() && this.dialpadShown) {
        // ignore if event happened on destination input itself
        if(event && this.destination.is(event.target)) {
          return;
        }
        this.destination.val(this.destination.val() + digit);
        this.destination.putCursorAtEnd();
      }
      else if (digit.match(/^[0-9A-D#*,]+$/i))
      {
        this.pressDTMF(digit);
      }
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
//        this.message(msg, "alert");
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

    asScript: function(){
      var self = this;
      var script = '<script src="'+self.src+'" ';
      var dataStrs = Object.keys(self.styleData).filter(function(key){
        var value = self.styleData[key];
        var defaultValue = WebRTC.C.STYLES[key];
        return !!value && value !== defaultValue;
      }).map(function(key){
        var value = self.styleData[key];
        return "data-"+key+"='"+value+"'";
      });
      script += dataStrs.join(' ');
      
      var config = $.extend({}, this.config);
      Object.keys(config).forEach(function(key){
        var value = config[key];
        var defaultValue = ClientConfig[key];
        if(!value && !defaultValue) {
          delete config[key];
          return;          
        }
        if(Array.isArray(value)) {
          value = JSON.stringify(value);
          defaultValue = JSON.stringify(defaultValue);
        } else {
          value = value+"";
          defaultValue = defaultValue+"";
        }
        if(value === defaultValue) {
          delete config[key];
        }
      });
      script += '>\n' + JSON.stringify(config, undefined, 2) + '\n</script>';
      return script;
    },

    updateClientClass: function(){
      var classes = ["client"];
      classes.push("r"+this.configuration.getResolutionDisplay());
      classes.push(this.configuration.isWidescreen() ? "widescreen" : "standard");
      var callState = this.sipStack.getCallState();
      if(callState) {
        classes.push(callState);
      }
      if(this.sipStack.isRegistered()) {
        classes.push('registered');
      }
      if(this.event) {
        classes.push(this.event);
      }
      if (this.configuration.enableMute)
      {
        classes.push("enable-mute");
      }
      if (this.configuration.enableShareScreen)
      {
        classes.push("enable-shareScreen");
      }
      if (this.configuration.enableCallControl)
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
      var views = this.configuration.getViews();
      if (views && views.length > 0)
      {
        views.map(function(view){
          classes.push("view-"+view);
        });
      }
      if (this.configuration.enableScreenSharing)
      {
        classes.push("enable-screen-sharing");
      }
      if (this.configuration.enableFileShare)
      {
        classes.push("enable-file-share");
      }
      if (this.configuration.selfViewSize)
      {
        classes.push("selfView-"+this.configuration.selfViewSize);
      }
      if (this.configuration.selfViewLocation)
      {
        classes.push("selfView-"+this.configuration.selfViewLocation);
      }
      if(this.sound.muted) { classes.push("muted"); } else { classes.push("unmuted"); }
      if(this.settings.toggled) { classes.push("settings-shown"); } else { classes.push("settings-hidden"); }
      if(this.selfViewEnabled) { classes.push("self-view-enabled"); } else { classes.push("self-view-disabled"); }
      if(this.dialpadShown) { classes.push("dialpad-shown"); } else { classes.push("dialpad-hidden"); }
      if(this.fullScreen) { classes.push("full-screen-expanded"); } else { classes.push("full-screen-contracted"); }
      if(this.isScreenSharing) { classes.push("screen-sharing"); } else { classes.push("screen-sharing-off"); }
      if(this.transfer.visible) { classes.push("transfer-visible"); } else { classes.push("transfer-hidden"); }
      if(this.authentication.visible) { classes.push("auth-visible"); } else { classes.push("auth-hidden"); }
      this.client.attr("class", classes.join(" "));
    }
  };

  WebRTC.Client = Client;
}(WebRTC));
