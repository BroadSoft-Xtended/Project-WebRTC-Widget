module.exports = Authentication;

var events = require('events');
var util = require('util');

function Authentication(element, options) {
  this.popup = element;
  this.okButton = this.popup.find('.authPopupButton');
  this.userIdInput = this.popup.find('input.userid');
  this.authUserIdInput = this.popup.find('input.authUserid');
  this.passwordInput = this.popup.find('input.password');
  this.alert = this.popup.find('.alert');

  this.visible = false;
  this.options = options || {};

  events.EventEmitter.call(this);
  this.registerListeners();
}

util.inherits(Authentication, events.EventEmitter);

Authentication.prototype = {
  registerListeners: function() {
    var self = this;

    events.on("registrationFailed", function(e) {
      var statusCode = e.data.response.status_code;
      if ((statusCode === 403 && self.options.settingsUserId() && !self.options.settingsPassword()) || self.options.configurationRegister) {
        self.setVisible(true);
      }
    });

    this.okButton.bind('click', function() {
      var userId = self.userIdInput.val();
      if (!userId) {
        self.alert.text("Invalid User ID").fadeIn(10).fadeOut(4000);
        return;
      }
      var authUserId = self.authUserIdInput.val();
      //        if (!authUserId)
      //        {
      //          self.alert.text("Invalid Auth User ID").fadeIn(10).fadeOut(4000);
      //          return;
      //        }
      var password = self.passwordInput.val();
      self.setVisible(false);
      self.options.onAuthenticate({
        userId: userId,
        authenticationUserId: authUserId,
        password: password
      });
      events.once("registered", function() {
        if (authUserId && self.options.settingsUserId() !== authUserId) {
          self.options.settingsAuthenticationUserId(authUserId);
        }
        self.options.settingsUserId(userId);
        self.options.settingsPassword(password);
      });
    });

    this.popup.bind('keypress', function(e) {
      if (e.which === 13) {
        self.okButton.click();
      }
    });
  },

  show: function() {
    this.setVisible(true);
  },

  setVisible: function(visible) {
    this.visible = visible;

    this.authUserIdInput.val(this.options.settingsAuthenticationUserId());
    this.userIdInput.val(this.options.settingsUserId());

    events.emit('viewChanged', this);
  }
};