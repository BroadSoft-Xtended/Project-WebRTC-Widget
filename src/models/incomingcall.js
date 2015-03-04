module.exports = IncomingCall

var Utils = require('webrtc-core/Utils');
var ExSIP = require('exsip');

function IncomingCall(options, eventbus, sound, sipstack, incomingcallView) {
  var self = {};

  self.view = incomingcallView;

  self.props = {'incomingCallName': true, 'incomingCallUser': true};

  var incomingSession;

  var handle = function(){
    self.view.hide();
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
    eventbus.on("failed", function(e) {
      var error = e.cause;
      if (error === ExSIP.C.causes.CANCELED) {
        self.view.hide();
      }
    });

    eventbus.on("incomingCall", function(evt) {
      incomingSession = evt.data.session
      var from = evt.data && evt.data.request && evt.data.request.from || {};
      eventbus.message("Incoming Call", "success");
      self.incomingCallName = from.display_name || '';
      self.incomingCallUser = from.uri && from.uri.user || '';
      self.view.show();
      sound.playRingtone();
    });
  };

  return self;
}