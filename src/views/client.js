module.exports = ClientView;

var fs = require('fs');
var styles = require('style');
var ejs = require('ejs');
var $ = jQuery = require('jquery');
var Icon = require('webrtc-core/Icon');
var WebRTC_C = require('webrtc-core/Constants');
var Utils = require('webrtc-core/Utils');
var ExSIP = require('exsip');
var ClientConfig = require('client-config');

function ClientView(options, eventbus, debug, configuration, video, videobarView, sound, callcontrol, sipstack, transfer, authentication, 
  xmppView, incomingcall, reinvite, messages, settings, smsView, connectionstatus, whiteboardView, fileshareView, stats) {
  var self = {};

  self.elements = ['client', 'main', 'errorPopup'];

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

  self.init = function(options) {
    var unsupported = Utils.compatibilityCheck(configuration);
    if (unsupported) {
      $('#unsupported').html(unsupported).show();
    }

    var whiteboardUnsupported = Utils.whiteboardCompabilityCheck();
    if (whiteboardUnsupported) {
      $('#whiteboard_unsupported').html(whiteboardUnsupported).show();
    }

    self.updateCss();

    video.view.view.appendTo(self.main);
    videobarView.view.appendTo(self.main);
    messages.view.view.appendTo(self.main);
    connectionstatus.view.view.appendTo(self.main);
    fileshareView.view.appendTo(self.client);

    self.updateClientClass();

    $.cookie.raw = true;
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

  self.listeners = function() {
    $(document).unbind('keypress').bind('keypress', function(e) {});
    $(document).unbind('keydown').bind('keydown', function(event) {
      var isModifier = event.altKey;
      if (isModifier) {
        if (transfer.view.target.is(event.target)) {
          return;
        }
        eventbus.modifier(event.which);
      }
    });

    eventbus.on("attachView", function(e) {
      e.view.appendTo(self.client);        
    });
    eventbus.on("viewChanged", function(e) {
      self.visibilities[e.view] = e.visible;
      self.updateClientClass();
    });
    eventbus.on("failed", function(e) {
      var error = e.cause;
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
    eventbus.on("resolutionChanged", function(e) {
      self.updateClientClass();
    });
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

    Object.getOwnPropertyNames(configuration).forEach(function(key) {
      if(key.match(/^enable/) && configuration[key] && typeof configuration[key] !== 'function') {
        classes.push(key);
      }
    }); 
    var views = configuration.getViews();
    if (views && views.length > 0) {
      views.map(function(view) {
        classes.push("view-" + view);
      });
    }
    if (configuration.selfViewSize) {
      classes.push("selfView-" + configuration.selfViewSize);
    }
    if (configuration.selfViewLocation) {
      classes.push("selfView-" + configuration.selfViewLocation);
    }
    Object.keys(self.visibilities).forEach(function(view) {
      classes.push(view + '-' + (self.visibilities[view] ? 'shown' : 'hidden'));
    });
    self.client.attr("class", classes.join(" "));
  };

  return self;
}

exports.constructor = ClientView;