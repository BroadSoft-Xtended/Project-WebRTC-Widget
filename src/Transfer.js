/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var Transfer;

  Transfer = function (client, sound, sipStack) {
    this.icon = $("#transfer");
    this.popup = $("#transferPopup");
    this.accept = $("#acceptTransfer");
    this.reject = $("#rejectTransfer");
    this.targetInput = $("#transferTarget");
    this.typeAttended = $("#transferTypeAttended");

    this.visible = false;
    this.client = client;
    this.sound = sound;
    this.sipStack = sipStack;

    this.registerListeners();
  };

  Transfer.prototype = {
    registerListeners: function () {
      var self = this;
      this.icon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.setVisible(!self.visible);
        if(self.visible) {
          self.targetInput.focus();
        }
      });

      this.accept.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        var targetInput = self.targetInput.val();
        if($.isBlank(targetInput)) {
          self.client.message(ClientConfig.messageOutsideDomain, "alert");
          return;
        }
        targetInput = self.client.validateDestination(targetInput);
        self.setVisible(false);
        self.sipStack.transfer(targetInput, self.typeAttended.is(':checked'));
      });

      this.reject.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.setVisible(false);
      });
    },

    setVisible: function(visible){
      this.visible = visible;
      this.client.updateClientClass();
    }
  };

  WebRTC.Transfer = Transfer;
}(WebRTC));
