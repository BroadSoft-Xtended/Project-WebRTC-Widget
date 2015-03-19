module.exports = require('webrtc-core').bdsft.View(TransferView);

var PopupView = require('webrtc-core').popup;
var Utils = require('webrtc-core').utils;
var Constants = require('webrtc-core').constants;

function TransferView(sound, eventbus, transfer) {
  var self = {};

  self.model = transfer;
  

  self.elements = ['accept', 'reject', 'target', 'typeAttended'];

  self.init = function() {
    PopupView(self, eventbus);
  };

  self.listeners = function() {
    eventbus.on('viewChanged', function(e){
      if(e.view === 'transfer' && e.visible) {
        self.target.focus();
      }
    });
    self.accept.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      transfer.transfer();
    });

    self.reject.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.hide();
    });
  };

  return self;
}