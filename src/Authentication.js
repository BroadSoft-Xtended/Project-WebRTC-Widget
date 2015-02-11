module.exports = require('./factory')(Authentication)

var events;
var templates = require('../js/templates');
var $ = require('jquery');

function Authentication(options) {
  options = options || {};
  events = require('./eventbus')(options);
  var settings = require('./settings')(options);

  this.popup = $(options.view || templates.authentication());
  this.okButton = this.popup.find(options.okEl || '.authPopupButton');
  this.userIdInput = this.popup.find(options.useridEl || 'input.userid');
  this.authUserIdInput = this.popup.find(options.authUseridEl || 'input.authUserid');
  this.passwordInput = this.popup.find(options.passwordEl || 'input.password');
  this.alert = this.popup.find(options.alertEl || '.alert');

  this.settingsUserId = options.settingsUserId || settings.userId;
  this.settingsAuthenticationUserId = options.authenticationUserId || settings.authenticationUserId;
  this.settingsPassword = options.settingsPassword || settings.password;
  this.configurationRegister = options.configurationRegister || configuration.register;

  this.visible = false;
  this.registerListeners();
}

Authentication.prototype = {
  registerListeners: function() {
    var self = this;

    events.on("registrationFailed", function(e) {
      var statusCode = e.data.response.status_code;
      if ((statusCode === 403 && self.settingsUserId && !self.settingsPassword()) || self.configurationRegister) {
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
      var password = self.passwordInput.val();
      self.setVisible(false);
      events.emit('authenticate', {
        userId: userId,
        authenticationUserId: authUserId,
        password: password
      })
      events.once("registered", function() {
        if (authUserId && self.settingsUserId() !== authUserId) {
          self.settingsAuthenticationUserId(authUserId);
        }
        self.settingsUserId(userId);
        self.settingsPassword(password);
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

    this.authUserIdInput.val(this.settingsAuthenticationUserId());
    this.userIdInput.val(this.settingsUserId());

    events.emit('viewChanged');
  }
};