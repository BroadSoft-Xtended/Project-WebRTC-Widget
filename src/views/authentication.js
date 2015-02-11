module.exports = require('../factory')(AuthenticationView)

var $ = require('jquery');
var PopupView = require('./popup');

function AuthenticationView(options, eventbus, settings, configuration) {
  var self = {};

  self.__proto__ = PopupView(eventbus);

  var settingsUserId = options.settingsUserId || settings.userId;
  var settingsAuthenticationUserId = options.authenticationUserId || settings.authenticationUserId;
  var settingsPassword = options.settingsPassword || settings.password;
  var configurationRegister = options.configurationRegister || configuration.register;

  self.elements = ['ok', 'userid', 'authUserid', 'password', 'alert'];

  self.listeners = function() {
    eventbus.on('registrationFailed', function(e) {
      var statusCode = e.data.response.status_code;
      if ((statusCode === 403 && settingsUserId && !settingsPassword()) || configurationRegister) {
        self.setVisible(true);
      }
    });

    eventbus.on('viewChanged', function(e) {
      if(e.view === 'authentication' && e.visible) {
        authUserid.val(settingsAuthenticationUserId());
        userid.val(settingsUserId());
      }
    });

    self.ok.bind('click', function() {
      var userId = self.userid.val();
      if (!userId) {
        self.alert.text("Invalid User ID").fadeIn(10).fadeOut(4000);
        return;
      }
      var authUserId = self.authUserid.val();
      var password = self.password.val();
      self.setVisible(false);
      eventbus.emit('authenticate', {
        userId: userId,
        authenticationUserId: authUserId,
        password: password
      })
      eventbus.once("registered", function() {
        if (authUserId && settingsUserId() !== authUserId) {
          settingsAuthenticationUserId(authUserId);
        }
        settingsUserId(userId);
        settingsPassword(password);
      });
    });

    self.view.bind('keypress', function(e) {
      if (e.which === 13) {
        self.ok.click();
      }
    });
  };

  return self;
}