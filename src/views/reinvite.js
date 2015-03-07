module.exports = require('webrtc-core').bdsft.View(ReinviteView)

var PopupView = require('./popup');
var Utils = require('webrtc-core').utils;

function ReinviteView(eventbus, reinvite) {
  var self = {};

  self.model = reinvite;
  
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