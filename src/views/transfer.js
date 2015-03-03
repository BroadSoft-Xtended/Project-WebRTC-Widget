module.exports = TransferView;

var PopupView = require('./popup');
var Utils = require('../Utils');

function TransferView(options, sound, eventbus, transfer) {
  var self = {};

  Utils.extend(self, PopupView(options, eventbus));

  self.elements = ['accept', 'reject', 'target', 'typeAttended'];

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