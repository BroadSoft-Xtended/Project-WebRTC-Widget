module.exports = require('../factory')(TransferView)

var events;

function TransferView(options) {
  var self = {};

  self.visible = false;
  self.attached = false;

  self.elements = ['accept', 'reject', 'targetInput', 'typeAttended'],
  self.models = ['sound', 'sipstack', 'eventbus'],
  self.listeners = function() {
    this.accept.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      var targetInput = self.targetInput.val();
      if ($.isBlank(targetInput)) {
        self.client.message(self.configuration.messageOutsideDomain, "alert");
        return;
      }
      targetInput = self.client.validateDestination(targetInput);
      self.setVisible(false);
      self.sipstack.transfer(targetInput, self.typeAttended.is(':checked'));
    });

    this.reject.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.setVisible(false);
    });
  },

  self.setVisible = function(visible) {
    if(!this.attached) {
      this.view.appendTo($(document));
      this.attached = true;
    }
    this.visible = visible;
    this.eventbus.emit('viewChanged');
  }

  return self;  
}