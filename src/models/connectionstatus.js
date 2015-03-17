module.exports = require('webrtc-core').bdsft.Model(ConnectionStatus)

var Utils = require('webrtc-core').utils;

function ConnectionStatus(options, eventbus, configuration) {
  var self = {};

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