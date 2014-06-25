/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var Authentication;

  Authentication = function (element, eventBus, options) {
    this.popup = element;
    this.okButton = this.popup.find('.authPopupButton');
    this.userIdInput = this.popup.find('input.username');
    this.passwordInput = this.popup.find('input.password');
    this.alert = this.popup.find('.alert');

    this.visible = false;
    this.eventBus = eventBus;
    this.options = options || {};

    this.registerListeners();
  };

  Authentication.prototype = {
    registerListeners: function () {
      var self = this;

      this.eventBus.on("registrationFailed", function(e){
        var statusCode = e.data.response.status_code;
        if(statusCode === 403 && self.options.settingsUserId() && !self.options.settingsPassword()) {
          self.setVisible(true);
        }
      });

      this.okButton.bind('click', function()
      {
        var userId = self.userIdInput.val();
        if (!userId)
        {
          self.alert.text("Invalid Username").fadeIn(10).fadeOut(4000);
          return;
        }
        var password = self.passwordInput.val();
        self.setVisible(false);
        self.options.onAuthenticate({userId: userId, password: password});
        self.eventBus.once("registered", function(e){
          if(self.options.settingsUserId() !== userId) {
            self.options.settingsAuthenticationUserId(userId);
          }
          self.options.settingsPassword(password);
        });
      });

      this.popup.bind('keypress', function(e)
      {
        if (e.which === 13)
        {
          self.okButton.click();
        }
      });
    },

    show: function(){
      this.setVisible(true);
    },

    setVisible: function(visible){
      this.visible = visible;

      this.userIdInput.val(this.options.settingsUserId());

      this.eventBus.viewChanged(this);
    }
  };

  WebRTC.Authentication = Authentication;
}(WebRTC));
