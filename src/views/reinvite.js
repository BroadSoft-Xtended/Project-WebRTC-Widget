module.exports = ReinviteView

var PopupView = require('./popup');
var Utils = require('webrtc-core/Utils');

function ReinviteView(eventbus, reinvite) {
  var self = {};

  Utils.extend(self, PopupView(eventbus));

  self.elements = ['incomingCallName', 'incomingCallUser', 'acceptReInviteCall', 'rejectReInviteCall', 'title'];

  self.listeners = function() {
    self.acceptReInviteCall.on('click', function(){
      reinvite.accept();
    });
    self.rejectReInviteCall.on('click', function(){
      reinvite.reject();
    });
  };

  return self;
}