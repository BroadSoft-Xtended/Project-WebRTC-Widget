module.exports = AuthenticationView;

var $ = require('jquery');
var PopupView = require('./popup');

function AuthenticationView(options, eventbus, settings, configuration, debug) {
  var self = {};

  self.__proto__ = PopupView(options, self, eventbus);

  self.elements = ['ok', 'userid', 'authUserid', 'password', 'alert'];

  self.listeners = function() {
    eventbus.on('registrationFailed', function(e) {
      var statusCode = e.data.response.status_code;
      debug('registration failed : '+statusCode+', '+settings.userid+', '+settings.password);
      if ((statusCode === 403 && settings.userid && !settings.password) || configuration.register) {
        self.setVisible(true);
      }
    });

    eventbus.on('viewChanged', function(e) {
      if(e.view === 'authentication' && e.visible) {
        self.authUserid.val(settings.authenticationUserid);
        self.userid.val(settings.userid);
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
        if (authUserId && settings.userid !== authUserId) {
          settings.authenticationUserid = authUserId;
        }
        settings.userid = userId;
        settings.password = password;
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