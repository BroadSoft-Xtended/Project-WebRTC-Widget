module.exports = require('webrtc-core').bdsft.View(IncomingCallView)

var Utils = require('webrtc-core').utils;
var PopupView = require('webrtc-core').popup;
var Constants = require('webrtc-core').constants;

function IncomingCallView(eventbus, incomingcall) {
  var self = {};

  self.model = incomingcall;
  

  self.elements = ['incomingCallName', 'incomingCallUser', 'acceptIncomingCall', 'rejectIncomingCall', 'holdAndAnswerButton', 'dropAndAnswerButton'];

  self.init = function() {
    PopupView(self, eventbus);
  };

  self.listeners = function() {
    self.acceptIncomingCall.on('click', function(e) {
      e.preventDefault();
      incomingcall.accept();
    });
    self.rejectIncomingCall.on('click', function(e) {
      e.preventDefault();
      incomingcall.reject();
    });
    self.holdAndAnswerButton.on('click', function(e) {
      e.preventDefault();
      incomingcall.holdAndAnswer();
    });
    self.dropAndAnswerButton.on('click', function(e) {
      e.preventDefault();
      incomingcall.dropAndAnswer();
    });
  };

  return self;
}