module.exports = ReinviteView

var PopupView = require('./popup');
var Utils = require('../Utils');

function ReinviteView(options, eventbus, reinvite) {
  var self = {};

  Utils.extend(self, PopupView(options, eventbus));

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