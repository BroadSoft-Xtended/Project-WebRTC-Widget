module.exports = Transfer;

function Transfer(client, sound, sipStack, configuration) {
  this.icon = client.find(".transfer");
  this.popup = client.find(".transferPopup");
  this.accept = this.popup.find(".acceptTransfer");
  this.reject = this.popup.find(".rejectTransfer");
  this.targetInput = this.popup.find(".transferTarget");
  this.typeAttended = this.popup.find(".transferTypeAttended");

  this.visible = false;
  this.client = client;
  this.sound = sound;
  this.sipStack = sipStack;
  this.configuration = configuration;

  this.registerListeners();
}

Transfer.prototype = {
  registerListeners: function() {
    var self = this;
    this.icon.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.setVisible(!self.visible);
      if (self.visible) {
        self.targetInput.focus();
      }
    });

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
      self.sipStack.transfer(targetInput, self.typeAttended.is(':checked'));
    });

    this.reject.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.setVisible(false);
    });
  },

  setVisible: function(visible) {
    this.visible = visible;
    this.client.updateClientClass();
  }
};