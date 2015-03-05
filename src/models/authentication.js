module.exports = Authentication;

var $ = require('jquery');
var Utils = require('webrtc-core').utils;

function Authentication(eventbus, settings, configuration, debug, authenticationView) {
  var self = {};

  self.view = authenticationView;

  self.props = {
    'userid': true,
    'authUserid': true,
    'password': true
  };

  self.listeners = function() {
    eventbus.on('registrationFailed', function(e) {
      var statusCode = e.data.response.status_code;
      debug('registration failed : ' + statusCode + ', ' + settings.userid + ', ' + settings.password);
      if ((statusCode === 403 && settings.userid && !settings.password) || configuration.register) {
        eventbus.emit('authenticationFailed', self);
      }
    });

    eventbus.on('viewChanged', function(e) {
      if (e.view === 'authentication' && e.visible) {
        self.authUserid = settings.authenticationUserid;
        self.userid = settings.userid;
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
      if (self.authUserid && settings.userid !== self.authUserid) {
        settings.authenticationUserid = self.authUserid;
      }
      settings.userid = self.userid;
      settings.password = self.password;
    });
  };

  return self;
}