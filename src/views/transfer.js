module.exports = TransferView;

var PopupView = require('./popup');
var Utils = require('../Utils');

function TransferView(options, sound, sipstack, eventbus, configuration, callcontrol) {
  var self = {};

  Utils.extend(self, PopupView(options, eventbus));

  self.elements = ['accept', 'reject', 'targetInput', 'typeAttended'];

  self.listeners = function() {
    eventbus.on('viewChanged', function(e){
      if(e.view === 'transfer' && e.visible) {
        self.targetInput.focus();
      }
    });
    self.accept.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      var targetInput = self.targetInput.val();
      if ($.isBlank(targetInput)) {
        eventbus.emit('message', {text: configuration.messageOutsideDomain, level: 'alert'});
        return;
      }
      targetInput = callcontrol.validateDestination(targetInput);
      if(targetInput) {
        self.setVisible(false);
        sipstack.transfer(targetInput, self.typeAttended.is(':checked'));        
      }
    });

    self.reject.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.setVisible(false);
    });
  };

  return self;
}