module.exports = require('webrtc-core').bdsft.Model(Authentication);

var Utils = require('webrtc-core').utils;

function Authentication(eventbus, debug, configuration) {
  var self = {};

  self.props = {
    'userid': true,
    'authUserid': true,
    'password': true
  };

  self.listeners = function() {
    eventbus.on('registrationFailed', function(e) {
      var statusCode = e.data.response.status_code;
      debug('registration failed : ' + statusCode + ', ' + configuration.userid + ', ' + configuration.password);
      if ((statusCode === 403 && configuration.userid && !configuration.password) || configuration.register) {
        eventbus.emit('authenticationFailed', self);
      }
    });

    eventbus.on('viewChanged', function(e) {
      if (e.view === 'authentication' && e.visible) {
        self.authUserid = configuration.authenticationUserid;
        self.userid = configuration.userid;
      }
    });
  };

  self.authenticate = function() {
    if (!self.userid) {
      self.alert.text("Invalid User ID").fadeIn(10).fadeOut(4000);
      return;
    }
    eventbus.emit('authenticate', {
      userId: self.userid,
      authenticationUserId: self.authUserid,
      password: self.password
    })
    eventbus.once("registered", function() {
      if (self.authUserid && configuration.userid !== self.authUserid) {
        configuration.authenticationUserid = self.authUserid;
      }
      configuration.userid = self.userid;
      configuration.password = self.password;
    });
  };

  return self;
}