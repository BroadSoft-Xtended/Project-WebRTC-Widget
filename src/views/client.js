module.exports = require('../factory')(ClientView);

var fs = require('fs');
var styles = fs.readFileSync(__dirname + '/../styles/bundle.min.css', 'utf-8');
var ejs = require('ejs');
var $ = jQuery = require('jquery');
var Icon = require('../Icon');
var WebRTC_C = require('../Constants');
var Utils = require('../Utils');
var ExSIP = require('exsip');
var ClientConfig = require('../../js/client-config.js.default');

function ClientView(options, eventbus, debug, configuration, videoView, videobarView) {
  var self = {};

  self.elements = ['main', 'errorPopup'];

  self.setup = function() { 
    self.main = self.client.find(options.mainEl || '.main');
    self.callControl = self.client.find(options.callControlEl || '.callControl');
    self.destination = self.callControl.find(options.destinationEl || 'input.destination');
    self.callButton = self.client.find(options.callEl || '.call');
    self.dialpad = self.client.find(".dialpad");
    self.dialpadButtons = self.client.find(".dialpad button");
    self.historyClose = self.client.find(".historyClose");
    self.callHistory = self.client.find(".callHistory");
    self.callStats = self.client.find(".callStats");
    self.screenSharingUnsupported = self.client.find(".screen_sharing_unsupported");


    options = options || Utils.clone(ClientConfig);
    sound = new Sound(sipstack, configuration);
    self.video = new Video(self.client.find('.video'), sipstack, {
      self.onPlaying = function() { 
        self.validateUserMediaResolution();
      }
    });
    self.xmpp = new XMPP(this);
    self.sms = new SMS(this, self.client.find(".sms"), sound);
    self.settings = new Settings(this, configuration, sound, sipstack);
    self.stats = new Stats(this, sipstack, configuration);
    self.timer = new Timer(this, self.stats, configuration);
    self.history = new History(this, sound, self.stats, sipstack, configuration);
    self.transfer = new Transfer(this, sound, sipstack, configuration);
    self.whiteboard = new Whiteboard(this, self.client.find(".whiteboard"), sipstack);
    self.fileShare = new FileShare(this, self.client.find(".file_share"), sipstack);
    self.authentication = new Authentication(self.client.find(".authPopup"), {
      configurationRegister: configuration.register,
      settingsUserId: self.settings.userId,
      settingsAuthenticationUserId: self.settings.authenticationUserId,
      settingsPassword: self.settings.password
    });
    self.hold = new Icon(self.client.find(".hold"), sound);
    self.resume = new Icon(self.client.find(".resume"), sound);
    self.fullScreen = false;
    self.selfViewEnabled = true;
    self.dialpadShown = false;
    self.smsShown = false;
    self.isScreenSharing = false;
    self.visibilities = {};

    configuration.setSettings(self.settings);

    self.registerListeners();

    self.init();
  },
  self.appendTo = function(parent) { 
    parent.append(self.wrapper);
  },
  self.updateCss = function(styleData) { 
    self.styleData = styleData || {};
    var cssData = $.extend({}, WebRTC_C.STYLES, WebRTC_C.FONTS, self.styleData);
    var cssStr = ejs.render(styles, cssData);
    if ($("#webrtc_css").length === 0) {
      $("<style type='text/css' id='webrtc_css'>" + cssStr + "</style>").appendTo("head");
    } else {
      $("#webrtc_css").text(cssStr);
    }
  },
  self.init = function() { 
    var unsupported = Utils.compatibilityCheck(this);
    if (unsupported) {
      $('#unsupported').html(unsupported).show();
    }

    var whiteboardUnsupported = Utils.whiteboardCompabilityCheck();
    if (whiteboardUnsupported) {
      $('#whiteboard_unsupported').html(whiteboardUnsupported).show();
    }

    // Allow some windows to be draggable, required jQuery.UI
    if (configuration.enableWindowDrag) {
      $(function() {
        self.video.localHolder.draggable({
          snap: ".remoteVideo,.videoBar",
          containment: ".main",
          snapTolerance: 200,
          self.stop = function(event, ui) { 
            self.settings.updateViewPositions();
          }
        });
        // self.callStats.draggable({
        //   snap: ".remoteVideo,.videoBar",
        //   containment: "parent",
        //   self.stop = function( event, ui ) {self.settings.updateViewPositions();} 
        // });
        // self.callHistory.draggable({
        //   snap: ".remoteVideo,.videoBar",
        //   containment: "parent",
        //   self.stop = function( event, ui ) {self.settings.updateViewPositions();} 
        // });
      });
    }

    self.updateClientClass();

    $.cookie.raw = true;

    window.onbeforeunload = function(e) {
      self.endCall({
        rtcSession: 'all'
      });
      return null;
    };

    self.onLoad();
  },

  self.showErrorPopup = function(error) { 
    window.alert(error);
  },

  // Setup the GUI
  self.guiStart = function() { 
    // Set size for Chrome and Firefox
    self.main.css("zoom", configuration.size);
    self.main.css("-moz-transform", "scale(" + configuration.size + ")");
    if (($.cookie("settingWindowPosition"))) {
      var windowPositions = $.cookie("settingWindowPosition").split('|');
      for (var i = 0; i < windowPositions.length; ++i) {
        var elementPosition = windowPositions[i].split('-');
        self.client.find(elementPosition[0]).css("top", elementPosition[1]);
        self.client.find(elementPosition[0]).css("left", elementPosition[2]);
      }
    }
    // Fade in UI elements
    self.client.find(".videoBar").fadeIn(1000);
    if (configuration.enableCallControl) {
      self.callControl.fadeIn(1000);
    } else {
      self.callControl.fadeOut(1000);
    }
  },

  self.setClientConfig = function(clientConfig) { 
    var connectionChanged = configuration.websocketsServers[0].ws_uri !== clientConfig.websocketsServers[0].ws_uri;
    jQuery.extend(options, clientConfig);
    jQuery.extend(configuration, options);
    self.guiStart();
    self.updateClientClass();
    if (connectionChanged) {
      sipstack.init();
    }
  },

  self.endCall = function(options) { 
    options = options || {};
    var rtcSession = options.rtcSession;
    if (rtcSession === 'all') {
      sipstack.terminateSessions();
    } else if (rtcSession) {
      sipstack.terminateSession(rtcSession);
    } else {
      sipstack.terminateSession();
    }
    self.setEvent(null);
    sound.pause();
    self.video.updateSessionStreams();

    self.guiStart();

    self.timer.stop();
    self.checkEndCallURL();
  },

  // Initial startup
  self.checkEndCallURL = function() { 
    if (configuration.endCallURL && !configuration.disabled) {
      window.location = configuration.endCallURL;
    }
  },

  self.onLoad = function() { 
    self.debug("onLoad");

    sipstack.init();

    if (!configuration.enableConnectLocalMedia && configuration.destination) {
      eventbus.once("connected", function(e) {
        self.callUri(configuration.destination);
      });
    }

    // Start the GUI
    self.guiStart();
  },

  // What we do when we get a digit during a call
  self.pressDTMF = function(digit) { 
    if (digit.length !== 1) {
      return;
    }
    if (sipstack.isStarted()) {
      self.destination.val(self.destination.val() + digit);
      sound.playClick();
      sipstack.sendDTMF(digit);
    }
  },

  self.resumeCall = function() { 
    self.resume.disable();
    var enable = function() {
      self.resume.enable();
    };
    sipstack.unhold(enable, enable);
  },

  self.hideSelfView = function() { 
    self.selfViewEnabled = false;
    self.updateClientClass();
  },

  self.stopFullScreen = function() { 
    if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    self.fullScreen = false;
    self.updateClientClass();
  },

  self.showSelfView = function() { 
    self.selfViewEnabled = true;
    self.updateClientClass();
  },

  self.showFullScreen = function() { 
    if (self.client[0].webkitRequestFullScreen) {
      self.client[0].webkitRequestFullScreen();
    }
    self.fullScreen = true;
    self.updateClientClass();
  },

  self.muteAudio = function() { 
    sound.setMuted(true);
  },

  self.unmuteAudio = function() { 
    sound.setMuted(false);
  },

  self.showDialpad = function() { 
    self.dialpadShown = true;
    self.updateClientClass();
  },

  self.hideDialpad = function() { 
    self.dialpadShown = false;
    self.updateClientClass();
  },

  self.toggleDialpad = function(flag) { 
    self.dialpadShown = flag;
    self.updateClientClass();
  },

  self.updateFullScreen = function() { 
    self.fullScreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
    self.updateClientClass();
  },

  self.holdCall = function() { 
    self.hold.disable();
    var enable = function() {
      self.hold.enable();
    };
    sipstack.hold(enable, enable);
  },

  self.getRemoteUser = function(rtcSession) { 
    return rtcSession.remote_identity.uri.user || rtcSession.remote_identity.uri.host;
  },

  self.enableScreenSharing = function(enabled) { 
    self.isScreenSharing = enabled;
    self.updateClientClass();
    if (enabled) {
      var onShareScreenSuccess = function(localMedia) {
        localMedia.onended = function() {
          self.enableScreenSharing(false);
        };
      };
      var onShareScreenFailure = function(e) {
        // no way to distinguish between flag not enabled or simply rejected enabling screen sharing
        if (e) {
          self.screenSharingUnsupported.show();
        }
        self.enableScreenSharing(false);
      };
      sipstack.reconnectUserMedia(onShareScreenSuccess, onShareScreenFailure);
    } else {
      sipstack.reconnectUserMedia();
    }
  },

  self.listeners = function() { 
    eventbus.on("viewChanged", function(e) {
      self.visibilities[e.view] = e.visible;
      self.updateClientClass();
    });
    eventbus.on("ended", function(e) {
      self.history.persistCall(e.sender);
      self.endCall({
        rtcSession: e.sender
      });
    });
    eventbus.on("resumed", function(e) {
      self.onSessionStarted(e.sender);
    });
    eventbus.on("started", function(e) {
      self.onSessionStarted(e.sender);
      var dtmfTones = Utils.parseDTMFTones(configuration.destination);
      if (dtmfTones && e.data && !e.data.isReconnect) {
        self.debug("DTMF tones found in destination - sending DTMF tones : " + dtmfTones);
        sipstack.sendDTMF(dtmfTones);
      }
      //remove configuration.destination to avoid multiple calls
      delete configuration.destination;
      if (e.data && !e.data.isReconnect) {
        self.timer.start();
      }
    });
    eventbus.on("disconnected", function(e) {
      if (configuration.enableConnectionIcon) {
        self.connectedIcon.removeClass("success");
        self.connectedIcon.addClass("alert").fadeIn(100);
      }
      self.endCall();
    });
    eventbus.on("failed", function(e) {
      var error = e.data.cause;
      if (error === "User Denied Media Access") {
        self.showErrorPopup("WebRTC was not able to access your microphone/camera!");
      } 
      sound.pause();
      self.endCall({
        rtcSession: e.sender
      });
    });
    eventbus.on("progress", function(e) {
      sound.playDtmfRingback();
    });
    eventbus.on("registrationFailed", function(e) {
      self.updateClientClass();
      if (configuration.enableRegistrationIcon) {
        //$("#registered").removeClass("success");
        self.registeredIcon.addClass("alert").fadeIn(100);
      }
      var statusCode = e.data.response.status_code;
    });
    eventbus.on("registered", function(e) {
      self.updateClientClass();
      if (configuration.enableRegistrationIcon) {
        self.registeredIcon.removeClass("alert");
        self.registeredIcon.addClass("success").fadeIn(10).fadeOut(3000);
      }
    });
    eventbus.on("unregistered", function(e) {
      self.updateClientClass();
    });
    eventbus.on("connected", function(e) {
      if (configuration.enableConnectionIcon) {
        self.connectedIcon.removeClass("alert");
        self.connectedIcon.addClass("success").fadeIn(10).fadeOut(3000);
      }

      sipstack.updateUserMedia(function() {
        if (configuration.destination) {
          self.callUri(configuration.destination);
        }
      });
    });
    eventbus.on('newDTMF', function(e) {
      var digit = e.data.tone;
      self.debug('DTMF sent : ' + digit);
      if (!digit) {
        return;
      }
      var file = null;
      if (digit === "*") {
        file = "star";
      } else if (digit === "#") {
        file = "pound";
      } else {
        file = digit;
      }
      sound.playDtmfTone(file);
    });

    // Buttons
    self.shareScreen.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.enableScreenSharing(true);
    });
    self.stopShareScreen.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.enableScreenSharing(false);
    });

    self.callButton.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.callUri(self.destination.val());
    });

    self.hangup.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.endCall();
      if (self.fullScreen) {
        self.fullScreenContractIcon.click();
      }
    });

    self.fullScreenExpandIcon.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.showFullScreen();
    });

    self.fullScreenContractIcon.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.stopFullScreen();
    });
    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
      self.updateFullScreen();
    });

    self.selfViewDisableIcon.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.hideSelfView();
    });

    self.selfViewEnableIcon.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.showSelfView();
    });
    $(".history-button").bind('click', function(e) {
      e.preventDefault();
      self.history.toggle();
    });
    $(".button-row button").bind('click', function(e) {
      e.preventDefault();
      var destinationStr = $("#destination").val();
      $("#destination").val(destinationStr + self.firstChild.nodeValue);
    });

    self.hold.onClick(function(e) {
      self.holdCall();
    });

    self.resume.onClick(function(e) {
      self.resumeCall();
    });

    self.muteAudioIcon.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.muteAudio();
    });

    self.unmuteAudioIcon.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.unmuteAudio();
    });

    self.dialpadShowIcon.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.showDialpad();
      self.destination.focus();
      self.settings.toggleSettings(false);
    });

    self.dialpadHideIcon.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.hideDialpad();
      self.history.historyToggled = true;
      self.history.toggle();
    });

    self.historyClose.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.history.toggle();
    });

    // Dialpad digits
    self.dialpadButtons.bind('click', function(e) {
      self.processDigitInput(e.target.textContent);
    });

    self.destination.keypress(function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        self.callUri(self.destination.val());
      }
    });
    $(".video").bind("click", function(e) {
      var $target = $(e.target);
      var dialpad = $target.closest(".dialpad").length;
      var history = $target.closest(".callHistory").length;
      var details = $target.closest(".callHistoryDetails").length;
      if (dialpad === 0 || history === 0 || details === 0) {
        //$(".callHistory").fadeOut(100);
        self.history.historyToggled = true;
        self.history.toggle();
      }
    });

    // Digits from keyboard
    $(document).unbind('keypress').bind('keypress', function(e) {});

    // Prevent the backspace key from navigating back if dialpad is shown
    $(document).unbind('keydown').bind('keydown', function(event) {
      var isModifier = event.altKey;
      if (isModifier) {
        if (self.transfer.targetInput.is(event.target)) {
          return;
        }

        if (event.which === 83) {
          self.stats.toggle();
        } else if (event.which === 84) {
          self.sms.toggle();
        }
        // toggle whiteboard
        else if (event.which === 87) {
          self.whiteboard.toggle();
        } else if (event.which === 72) {
          self.history.toggle();
        }
        return;
      }

      if (self.dialpadShown) {
        var doPrevent = false;
        if (event.keyCode === 8) {
          var d = event.srcElement || event.target;
          if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' ||
              d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' ||
              d.type.toUpperCase() === 'EMAIL')) || d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
          } else {
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

  self.processDigitInput = function(digit, event) { 
    if (!sipstack.isStarted() && self.dialpadShown) {
      // ignore if event happened on destination input itself
      if (event && self.destination.is(event.target)) {
        return;
      }
      self.destination.val(self.destination.val() + digit);
      self.destination.putCursorAtEnd();
    } else if (digit.match(/^[0-9A-D#*,]+$/i)) {
      self.pressDTMF(digit);
    }
  },

  self.onSessionStarted = function(sender) { 
    self.debug("setting active session to " + sender.id);
    sipstack.activeSession = sender;
    self.video.updateSessionStreams(sender);
    self.client.find('.stats-container').attr('id', sipstack.getSessionId() + '-1');
    sound.pause();
  },

  self.setEvent = function(event) { 
    self.event = event;
    self.updateClientClass();
  },

  self.setAudioOnlyOfferAndRec = function(audioOnly) { 
    configuration.audioOnly = audioOnly;
    configuration.offerToReceiveVideo = !audioOnly;
    sipstack.updateUserMedia();
  },

  self.setAudioOnly = function(audioOnly) { 
    configuration.audioOnly = audioOnly;
    configuration.offerToReceiveVideo = true;
    sipstack.updateUserMedia();
  },

  self.asScript = function() { 
    var script = '<script src="' + self.src + '" ';
    var dataStrs = Object.keys(self.styleData).filter(function(key) {
      var value = self.styleData[key];
      var defaultValue = WebRTC_C.STYLES[key];
      return !!value && value !== defaultValue;
    }).map(function(key) {
      var value = self.styleData[key];
      return "data-" + key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + "='" + value + "'";
    });
    script += dataStrs.join(' ');

    var config = $.extend({}, options);
    Object.keys(config).forEach(function(key) {
      var value = config[key];
      var defaultValue = ClientConfig[key];
      if (!value && !defaultValue) {
        delete config[key];
        return;
      }
      if (Array.isArray(value)) {
        value = JSON.stringify(value);
        defaultValue = JSON.stringify(defaultValue);
      } else {
        value = value + "";
        defaultValue = defaultValue + "";
      }
      if (value === defaultValue) {
        delete config[key];
      }
    });
    script += '>\n' + JSON.stringify(config, undefined, 2) + '\n</script>';
    return script;
  },

  self.updateClientClass = function() { 
    var classes = ["client"];
    classes.push("r" + configuration.getResolutionDisplay());
    classes.push(configuration.isWidescreen() ? "widescreen" : "standard");
    var callState = sipstack.getCallState();
    if (callState) {
      classes.push(callState);
    }
    if (sipstack.isRegistered()) {
      classes.push('registered');
    }
    if (configuration.enableMute) {
      classes.push("enable-mute");
    }
    if (configuration.enableShareScreen) {
      classes.push("enable-shareScreen");
    }
    if (configuration.enableCallControl) {
      classes.push("enable-call-control");
    }
    if (configuration.enableTransfer) {
      classes.push("enable-transfer");
    }
    if (configuration.enableHold) {
      classes.push("enable-hold");
    }
    if (configuration.enableCallTimer) {
      classes.push("enable-timer");
    }
    if (configuration.enableSettings) {
      classes.push("enable-settings");
    }
    if (configuration.enableFullScreen) {
      classes.push("enable-full-screen");
    }
    if (configuration.enableSelfView) {
      classes.push("enable-self-view");
    }
    if (configuration.enableDialpad) {
      classes.push("enable-dialpad");
    }
    if (configuration.enableSMS) {
      classes.push("enable-sms");
    }
    if (configuration.enableStats) {
      classes.push("enable-stats");
    }
    var views = configuration.getViews();
    if (views && views.length > 0) {
      views.map(function(view) {
        classes.push("view-" + view);
      });
    }
    if (configuration.enableScreenSharing) {
      classes.push("enable-screen-sharing");
    }
    if (configuration.enableFileShare) {
      classes.push("enable-file-share");
    }
    if (configuration.selfViewSize) {
      classes.push("selfView-" + configuration.selfViewSize);
    }
    if (configuration.selfViewLocation) {
      classes.push("selfView-" + configuration.selfViewLocation);
    }
    if (sound.muted) {
      classes.push("muted");
    } else {
      classes.push("unmuted");
    }
    if (self.settings.visible) {
      classes.push("settings-shown");
    } else {
      classes.push("settings-hidden");
    }
    if (self.selfViewEnabled) {
      classes.push("self-view-enabled");
    } else {
      classes.push("self-view-disabled");
    }
    Object.keys(self.visibilities).forEach(function(view){
      classes.push(view+'-'+(self.visibilities[view] ? 'shown' : 'hidden'));
    });
    if (self.dialpadShown) {
      classes.push("dialpad-shown");
    } else {
      classes.push("dialpad-hidden");
    }
    if (self.fullScreen) {
      classes.push("full-screen-expanded");
    } else {
      classes.push("full-screen-contracted");
    }
    if (self.isScreenSharing) {
      classes.push("screen-sharing");
    } else {
      classes.push("screen-sharing-off");
    }
    if (self.transfer.visible) {
      classes.push("transfer-visible");
    } else {
      classes.push("transfer-hidden");
    }
    if (self.authentication.visible) {
      classes.push("auth-visible");
    } else {
      classes.push("auth-hidden");
    }
    self.client.attr("class", classes.join(" "));
  }

  options = options;

  self.updateCss();

  self.wrapper = $('<div/>', {
    class: 'webrtc-wrapper'
  });

  self.wrapper.html(options.view || templates.webrtc());

  self.client = self.wrapper.find(options.clientEl || '.client');
  self.setup(options);

  if (options.parent) {
    self.appendTo($(options.parent));
  }

  return self;
}