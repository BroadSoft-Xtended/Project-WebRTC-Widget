module.exports = CallControl;

var $ = require('jquery');
var fs = require('fs');

function CallControl(options, eventbus, configuration, sipstack, debug) {
  var self = {};


  self.listeners = function() {
    debug('------------- : callcontrol.listeners : '+configuration.destination);
    eventbus.on('userMediaUpdated', function(e) {
    debug('------------- : userMediaUpdated : '+configuration.destination);
      if (configuration.destination) {
        self.callUri(configuration.destination);
      }
    })
  };

  self.formatDestination = function(destination, domainTo) {
    if (destination.indexOf("@") === -1) {
      destination = (destination + "@" + domainTo);
    }

    var domain = destination.substring(destination.indexOf("@"));
    if (domain.indexOf(".") === -1) {
      destination = destination + "." + domainTo;
    }

    // WEBRTC-35 : filter out dtmf tones from destination
    return destination.replace(/,[0-9A-D#*,]+/, '');
  };

  self.isValidDestination = function(destination, allowOutside, domainTo) {
    if (!allowOutside && !new RegExp("[.||@]" + domainTo).test(destination)) {
      return false;
    }
    return true;
  };


  // Make sure destination allowed and in proper format
  self.validateDestination = function(destination) {
    if (!self.isValidDestination(destination, configuration.allowOutside, configuration.domainTo)) {
      eventbus.emit('message', {
        text: configuration.messageOutsideDomain,
        level: 'alert'
      });
      return false;
    }

    if (destination.indexOf("sip:") === -1) {
      destination = ("sip:" + destination);
    }

    return self.formatDestination(destination, configuration.domainTo);
  };

  // URL call
  self.callUri = function(destinationToValidate) {
    if (sipstack.getCallState() !== sipstack.C.STATE_CONNECTED) {
      debug('Already in call with state : ' + sipstack.getCallState());
      return;
    }
    if (destinationToValidate === "") {
      eventbus.message(configuration.messageEmptyDestination, "alert");
      return;
    }

    var destination = self.validateDestination(destinationToValidate);
    if (!destination) {
      debug("destination is not valid : " + destinationToValidate);
      return;
    }

    debug("calling destination : " + destination);

    eventbus.message(configuration.messageCall, 'success');
    eventbus.calling(destination);

    // Start the Call
    sipstack.call(destination);
  };


  return self;
}