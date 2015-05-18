module.exports = require('webrtc-core').bdsft.View(ClientView, {
  template: require('../../js/templates'), 
  style: require('../../js/styles')
});

var WebRTC_C = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;
var PopupView = require('webrtc-core').popup;
var defaults = require('webrtc-core').defaults;

function ClientView(options, eventbus, debug, configuration, videoView, videobarView, callcontrolView, sipstack, transferView, authenticationView, 
  xmppView, incomingcallView, reinviteView, messagesView, settingsView, smsView, connectionstatusView, whiteboardView, fileshareView, statsView, 
  historyView, client) {
  var self = {};

  self.model = client;

  self.elements = ['client', 'main', 'errorPopup'];

  options = options || Utils.clone(defaults);
  self.visibilities = {};

  self.appendTo = function(parent) {
    parent.append(self.view);
  };
  self.remove = function() {
    self.view.remove();
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

    videoView.view.appendTo(self.main);
    videobarView.view.appendTo(self.main);
    messagesView.view.appendTo(self.main);
    connectionstatusView.view.appendTo(self.main);
    fileshareView.view.appendTo(self.client);

    PopupView(authenticationView, eventbus, {parent: self.main});
    PopupView(callcontrolView, eventbus, {parent: self.main});
    PopupView(incomingcallView, eventbus, {parent: self.main});
    PopupView(reinviteView, eventbus, {parent: self.main});
    PopupView(settingsView, eventbus, {parent: self.main});
    PopupView(transferView, eventbus, {parent: self.main});
    PopupView(historyView, eventbus, {parent: self.main, modifier: 72});
    PopupView(statsView, eventbus, {parent: self.main, modifier: 83});
    PopupView(smsView, eventbus, {parent: self.main, modifier: 84});
    PopupView(whiteboardView, eventbus, {parent: self.main, modifier: 87});
    PopupView(xmppView, eventbus, {parent: self.main, modifier: 88});
  };

  self.showErrorPopup = function(error) {
    window.alert(error);
  };

  self.setClientConfig = function(clientConfig) {
    var connectionChanged = configuration.websocketsServers[0].ws_uri !== clientConfig.websocketsServers[0].ws_uri;
    Utils.extend(options, clientConfig);
    Utils.extend(configuration, options);
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

    eventbus.on("failed", function(e) {
      var error = e.cause;
      if (error === "User Denied Media Access") {
        self.showErrorPopup("WebRTC was not able to access your microphone/camera!");
      }
    });
  };


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

  return self;
}