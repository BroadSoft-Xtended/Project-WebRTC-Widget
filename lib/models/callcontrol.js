module.exports = require('webrtc-core').bdsft.Model(CallControl);

var fs = require('fs');
var C = require('webrtc-core').constants;

function CallControl(eventbus, debug, configuration, sipstack, sound) {
  var self = {};

  self.props = {'destination': true};

  self.listeners = function() {
    if (!configuration.enableConnectLocalMedia && configuration.destination) {
      eventbus.once("connected", function(e) {
        self.callUri(configuration.destination);
      });
    } else if(configuration.destination){
      eventbus.once('userMediaUpdated', function(e) {
        self.callUri(configuration.destination);
      });
    }
    eventbus.on('calling', function(e) {
      self.destination = e.destination;
    });
    eventbus.on('viewChanged', function(e) {
      if(e.view === 'callcontrol') {
        self.callControlVisible = e.visible;
      }
    });
    eventbus.on('digit', function(e) {
      self.processDigitInput(e.digit, e.isFromDestination);
    });
  };

  self.pressDTMF = function(digit) {
    if (digit.length !== 1) {
      return;
    }
    if (sipstack.isStarted()) {
      self.destination = self.destination + digit;
      sound.playClick();
      sipstack.sendDTMF(digit);
    }
  };

  self.processDigitInput = function(digit, isFromDestination) {
    if (!sipstack.isStarted() && self.callControlVisible) {
      if(isFromDestination) {
        return;
      }
      self.destination = self.destination + digit;
    } else if (digit.match(/^[0-9A-D#*,]+$/i)) {
      self.pressDTMF(digit);
    }
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
    if (sipstack.getCallState() !== C.STATE_CONNECTED) {
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

    // Start the Call
    sipstack.call(destination);
  };


  return self;
}