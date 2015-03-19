module.exports = require('webrtc-core').bdsft.View(ClientView);

var styles = require('bdsft-webrtc-style');
var ejs = require('ejs');
var WebRTC_C = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;
var defaults = require('webrtc-core').defaults;

function ClientView(options, eventbus, debug, configuration, videoView, videobarView, sound, callcontrolView, sipstack, transferView, authenticationView, 
  xmppView, incomingcallView, reinviteView, messagesView, settingsView, smsView, connectionstatusView, whiteboardView, fileshareView, statsView) {
  var self = {};

  self.elements = ['client', 'main', 'errorPopup'];

  options = options || Utils.clone(defaults);
  self.visibilities = {};

  self.appendTo = function(parent) {
    parent.append(self.view);
  };
  self.remove = function() {
    self.view.remove();
  };

  self.updateCss = function(styleData) {
    self.styleData = styleData || {};
    var cssData = Utils.extend({}, WebRTC_C.STYLES, WebRTC_C.FONTS, self.styleData);
    var cssStr = ejs.render(styles, cssData);
    var cssEl = Utils.getElement('#webrtc_css');
    if (!cssEl || cssEl.length === 0) {
      cssEl = Utils.createElement('<style>', {id: 'webrtc_css', type: 'text/css', text: cssStr}, {parent: 'head'});
    }
    cssEl.text(cssStr);
  };

  self.init = function(options) {
    var unsupported = Utils.compatibilityCheck(configuration);
    if (unsupported) {
      Utils.getElement('#unsupported').html(unsupported).show();
    }

    var whiteboardUnsupported = Utils.whiteboardCompabilityCheck();
    if (whiteboardUnsupported) {
      Utils.getElement('#whiteboard_unsupported').html(whiteboardUnsupported).show();
    }

    self.updateCss();

    videoView.view.appendTo(self.main);
    videobarView.view.appendTo(self.main);
    messagesView.view.appendTo(self.main);
    connectionstatusView.view.appendTo(self.main);
    fileshareView.view.appendTo(self.client);

    self.updateClientClass();
  };

  self.showErrorPopup = function(error) {
    window.alert(error);
  };

  self.setClientConfig = function(clientConfig) {
    var connectionChanged = configuration.websocketsServers[0].ws_uri !== clientConfig.websocketsServers[0].ws_uri;
    Utils.extend(options, clientConfig);
    Utils.extend(configuration, options);
    self.updateClientClass();
    if (connectionChanged) {
      sipstack.init();
    }
  };

  self.listeners = function() {
    // $(document).unbind('keypress').bind('keypress', function(e) {});
    // $(document).unbind('keydown').bind('keydown', function(event) {
    document.addEventListener('keydown', function(event) {
      var isModifier = event.altKey;
      if (isModifier) {
        if (transferView.target.is(event.target)) {
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

    var config = Utils.extend({}, options);
    Object.keys(config).forEach(function(key) {
      var value = config[key];
      var defaultValue = defaults[key];
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