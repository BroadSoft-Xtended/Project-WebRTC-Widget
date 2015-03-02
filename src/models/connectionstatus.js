module.exports = ConnectionStatus

var Utils = require('../Utils');

function ConnectionStatus(options, eventbus, configuration, connectionstatusView) {
  var self = {};

  self.view = connectionstatusView;

  self.props = {'connected': true, 'registered': true};

  self.listeners = function() {
    eventbus.on("disconnected", function(e) {
      if (configuration.enableConnectionIcon) {
        self.connected = false;
      }
    });
    eventbus.on("connected", function(e) {
      if (configuration.enableConnectionIcon) {
        self.connected = true;
      }
    });
    eventbus.on("registrationFailed", function(e) {
      if (configuration.enableRegistrationIcon) {
        self.registered = false;
      }
    });
    eventbus.on("registered", function(e) {
      if (configuration.enableRegistrationIcon) {
        self.registered = true;
      }
    });
  };

  return self;
}