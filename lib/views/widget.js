module.exports = require('webrtc-core').bdsft.View(WidgetView, {
  template: require('../../js/templates'), 
  style: require('../../js/styles')
});

var WebRTC_C = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;
var PopupView = require('webrtc-core').popup;
var defaults = require('webrtc-core').defaults;

function WidgetView(options, eventbus, debug, configuration, videoView, videobarView, callcontrolView, sipstack, transferView, authenticationView, 
  xmppView, incomingcallView, reinviteView, messagesView, settingsView, smsView, connectionstatusView, whiteboardView, fileshareView, statsView, 
  historyView, widget) {
  var self = {};

  self.model = widget;

  self.elements = ['client', 'main', 'errorPopup'];

  options = options || Utils.clone(defaults);
  self.visibilities = {};

  self.appendTo = function(parent) {
    parent.append(self.view);
  };
  self.remove = function() {
    self.view.remove();
  };

  self.init = function() {
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

  return self;
}