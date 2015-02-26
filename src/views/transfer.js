module.exports = TransferView;

var PopupView = require('./popup');
var Utils = require('../Utils');

function TransferView(options, sound, sipstack, eventbus, configuration, callcontrol) {
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
      var target = self.target.val();
      if ($.isBlank(target)) {
        eventbus.emit('message', {text: configuration.messageOutsideDomain, level: 'alert'});
        return;
      }
      target = callcontrol.validateDestination(target);
      if(target) {
        self.setVisible(false);
        sipstack.transfer(target, self.typeAttended.is(':checked'));        
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