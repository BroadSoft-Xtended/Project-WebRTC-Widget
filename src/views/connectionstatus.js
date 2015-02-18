module.exports = ConnectionStatusView

var Utils = require('../Utils');
var ExSIP = require('exsip');

function ConnectionStatusView(options, eventbus, configuration) {
  var self = {};

  self.elements = ['connectedIcon', 'registeredIcon'];

  self.listeners = function() {
    eventbus.on("disconnected", function(e) {
      if (configuration.enableConnectionIcon) {
        self.connectedIcon.removeClass("success");
        self.connectedIcon.addClass("alert").fadeIn(100);
      }
    });
    eventbus.on("connected", function(e) {
      if (configuration.enableConnectionIcon) {
        self.connectedIcon.removeClass("alert");
        self.connectedIcon.addClass("success").fadeIn(10).fadeOut(3000);
      }
    });
    eventbus.on("registrationFailed", function(e) {
      if (configuration.enableRegistrationIcon) {
        self.registeredIcon.addClass("alert").fadeIn(100);
      }
    });
    eventbus.on("registered", function(e) {
      if (configuration.enableRegistrationIcon) {
        self.registeredIcon.removeClass("alert");
        self.registeredIcon.addClass("success").fadeIn(10).fadeOut(3000);
      }
    });
  };

  return self;
}