module.exports = require('webrtc-core').bdsft.View(WidgetView, {
  template: require('../../js/templates'), 
  style: require('../../js/styles')
});

var WebRTC_C = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;
var PopupView = require('webrtc-core').popup;
var defaults = require('webrtc-core').defaults;

function WidgetView(eventbus, debug, videoView, videobarView, callcontrolView, sipstack, transferView, authenticationView, 
  incomingcallView, messagesView, settingsView, connectionstatusView, statsView, historyView, chatView, widget) {
  var self = {};

  self.model = widget;

  self.elements = ['client', 'main'];

  self.visibilities = {};

  self.appendTo = function(parent) {
    parent.append(self.view);
  };
  self.remove = function() {
    self.view.remove();
  };

  self.init = function() {
    var unsupported = Utils.compatibilityCheck();
    if (unsupported) {
      Utils.getElement('#unsupported').html(unsupported).show();
    }

    // var whiteboardUnsupported = Utils.whiteboardCompabilityCheck();
    // if (whiteboardUnsupported) {
    //   Utils.getElement('#whiteboard_unsupported').html(whiteboardUnsupported).show();
    // }

    videoView.view.appendTo(self.main);
    videobarView.view.appendTo(self.main);
    messagesView.view.appendTo(self.main);
    connectionstatusView.view.appendTo(self.main);

    PopupView(authenticationView, eventbus, {parent: self.main});
    PopupView(callcontrolView, eventbus, {parent: self.main});
    PopupView(incomingcallView, eventbus, {parent: self.main});
    PopupView(settingsView, eventbus, {parent: self.main});
    PopupView(transferView, eventbus, {parent: self.main});
    PopupView(chatView, eventbus, {parent: self.main, modifier: 67});
    PopupView(historyView, eventbus, {parent: self.main, modifier: 72});
    PopupView(statsView, eventbus, {parent: self.main, modifier: 83});
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
        event.stopPropagation();
      }
    });
  };

  return self;
}