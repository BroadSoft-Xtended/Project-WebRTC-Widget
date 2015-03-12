module.exports = require('webrtc-core').bdsft.Model(Transfer);

var Utils = require('webrtc-core').utils;
var Constants = require('webrtc-core').constants;

function Transfer(sipstack, eventbus, configuration, callcontrol) {
  var self = {};

  self.props = {
    'target': true,
    'typeAttended': true
  };

  self.transfer = function() {
    var target = self.target;
    if ($.isBlank(target)) {
      eventbus.emit('message', {
        text: configuration.messageOutsideDomain,
        level: 'alert'
      });
      return;
    }
    target = callcontrol.validateDestination(target);
    if (target) {
      eventbus.toggleView(Constants.VIEW_TRANSFER, false);
      sipstack.transfer(target, self.typeAttended);
    }
  };

  return self;
}