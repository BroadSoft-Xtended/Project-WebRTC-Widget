module.exports = IncomingCallView

var Utils = require('../Utils');
var ExSIP = require('exsip');
var PopupView = require('./popup');

function IncomingCallView(options, eventbus, sound, sipstack) {
  var self = {};

  Utils.extend(self, PopupView(options, eventbus));

  self.elements = ['incomingCallName', 'incomingCallUser', 'acceptIncomingCall', 'rejectIncomingCall', 'holdAndAnswerButton', 'dropAndAnswerButton'];

  self.incomingCallHandler = function(source, session) {
    self.hide();
    sound.pause();
    if (source.is(self.acceptIncomingCall)) {
      sipstack.answer(session);
    } else if (source.is(self.dropAndAnswerButton)) {
      sipstack.terminateSession();
      sipstack.answer(session);
    } else if (source.is(self.holdAndAnswerButton)) {
      sipstack.holdAndAnswer(session);
    } else if (source.is(self.rejectIncomingCall)) {
      sipstack.terminateSession(session);
    }
  };

  self.listeners = function() {
    eventbus.on("failed", function(e) {
      var error = e.cause;
      if (error === ExSIP.C.causes.CANCELED) {
        self.hide();
      }
    });

    eventbus.on("incomingCall", function(evt) {
      var incomingCallName = evt.data.request.from.display_name;
      var incomingCallUser = evt.data.request.from.uri.user;
      eventbus.message("Incoming Call", "success");
      self.show();
      self.incomingCallName.text(incomingCallName);
      self.incomingCallUser.text(incomingCallUser);
      Utils.rebindListeners("click", [self.rejectIncomingCall, self.acceptIncomingCall, self.holdAndAnswerButton, self.dropAndAnswerButton],
        function(e) {
          e.preventDefault();
          self.incomingCallHandler($(this), evt.data.session);
        }
      );
      sound.playRingtone();
    });
  };

  return self;
}