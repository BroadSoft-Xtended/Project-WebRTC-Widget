module.exports = require('webrtc-core').bdsft.Model(IncomingCall)

var Utils = require('webrtc-core').utils;
var Constants = require('webrtc-core').constants;

function IncomingCall(eventbus, sound, sipstack) {
  var self = {};

  self.props = {'incomingCallName': true, 'incomingCallUser': true};

  var incomingSession;

  var handle = function(){
    eventbus.toggleView(Constants.VIEW_INCOMINGCALL, false);
    sound.pause();
  };

  self.accept = function() {
    handle();
    sipstack.answer(incomingSession)
  };

  self.dropAndAnswer = function() {
    handle();
    sipstack.terminateSession();
    sipstack.answer(incomingSession);
  };

  self.holdAndAnswer = function() {
    handle();
    sipstack.holdAndAnswer(incomingSession);
  };

  self.reject = function() {
    handle();
    sipstack.terminateSession(incomingSession);
  };

  self.listeners = function() {
    eventbus.on("canceled", function(e) {
      eventbus.toggleView(Constants.VIEW_INCOMINGCALL, false);
    });

    eventbus.on("incomingCall", function(evt) {
      incomingSession = evt.data.session
      var from = evt.data && evt.data.request && evt.data.request.from || {};
      eventbus.message("Incoming Call", "success");
      self.incomingCallName = from.display_name || '';
      self.incomingCallUser = from.uri && from.uri.user || '';
      eventbus.toggleView(Constants.VIEW_INCOMINGCALL);
      sound.playRingtone();
    });
  };

  return self;
}