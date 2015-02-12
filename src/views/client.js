module.exports = require('../factory')(ClientView);

var fs = require('fs');
var styles = fs.readFileSync(__dirname + '/../../styles/bundle.min.css', 'utf-8');
var ejs = require('ejs');
var $ = jQuery = require('jquery');
var Icon = require('../Icon');
var WebRTC_C = require('../Constants');
var Utils = require('../Utils');
var ExSIP = require('exsip');
var ClientConfig = require('../../js/client-config.js.default');

function ClientView(options, eventbus, debug, configuration, videoView, videobarView, sound, callcontrol) {
  var self = {};

  self.elements = ['main', 'errorPopup'];

  options = options || Utils.clone(ClientConfig);
  self.visibilities = {};

  self.appendTo = function(parent) {
    parent.append(self.view);
  };

  self.updateCss = function(styleData) {
    self.styleData = styleData || {};
    var cssData = $.extend({}, WebRTC_C.STYLES, WebRTC_C.FONTS, self.styleData);
    var cssStr = ejs.render(styles, cssData);
    if ($("#webrtc_css").length === 0) {
      $("<style type='text/css' id='webrtc_css'>" + cssStr + "</style>").appendTo("head");
    } else {
      $("#webrtc_css").text(cssStr);
    }
  };

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
          stop: function(event, ui) {
            self.settings.updateViewPositions();
          }
        });
      });
    }

    self.updateClientClass();

    $.cookie.raw = true;

    sipstack.init();

    if (!configuration.enableConnectLocalMedia && configuration.destination) {
      eventbus.once("connected", function(e) {
        callcontrol.callUri(configuration.destination);
      });
    }
  };

  self.showErrorPopup = function(error) {
    window.alert(error);
  };

  self.setClientConfig = function(clientConfig) {
    var connectionChanged = configuration.websocketsServers[0].ws_uri !== clientConfig.websocketsServers[0].ws_uri;
    jQuery.extend(options, clientConfig);
    jQuery.extend(configuration, options);
    self.updateClientClass();
    if (connectionChanged) {
      sipstack.init();
    }
  };

  // Initial startup
  self.checkEndCallURL = function() {
    if (configuration.endCallURL && !configuration.disabled) {
      window.location = configuration.endCallURL;
    }
  };

  self.getRemoteUser = function(rtcSession) {
    return rtcSession.remote_identity.uri.user || rtcSession.remote_identity.uri.host;
  };

  self.listeners = function() {
    $(document).unbind('keypress').bind('keypress', function(e) {});
    $(document).unbind('keydown').bind('keydown', function(event) {
      var isModifier = event.altKey;
      if (isModifier) {
        if (self.transferView.targetInput.is(event.target)) {
          return;
        }

        eventbus.modifier(event.which);
      }
    });

    eventbus.on("viewChanged", function(e) {
      self.visibilities[e.view] = e.visible;
      self.updateClientClass();
    });
    eventbus.on("failed", function(e) {
      var error = e.data.cause;
      if (error === "User Denied Media Access") {
        self.showErrorPopup("WebRTC was not able to access your microphone/camera!");
      }
    });
    eventbus.on("registrationFailed", function(e) {
      self.updateClientClass();
    });
    eventbus.on("registered", function(e) {
      self.updateClientClass();
    });
    eventbus.on("unregistered", function(e) {
      self.updateClientClass();
    });

    self.updateCss();

    if (options.parent) {
      self.appendTo($(options.parent));
    }

    self.init();
  };

  // Buttons


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
  };

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
    if (self.selfViewEnabled) {
      classes.push("self-view-enabled");
    } else {
      classes.push("self-view-disabled");
    }
    Object.keys(self.visibilities).forEach(function(view) {
      classes.push(view + '-' + (self.visibilities[view] ? 'shown' : 'hidden'));
    });
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
  };

  return self;
}