module.exports = Transfer;

var Utils = require('webrtc-core').utils;

function Transfer(sipstack, eventbus, configuration, callcontrol, transferView) {
  var self = {};

  self.view = transferView;

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
      self.view.hide();
      sipstack.transfer(target, self.typeAttended);
    }
  };

  return self;
}