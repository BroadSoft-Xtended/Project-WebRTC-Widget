module.exports = require('../factory')(ConnectionStatusView)

var Utils = require('../Utils');
var ExSIP = require('exsip');

function ConnectionStatusView(options, eventbus, configuration) {
  var self = {};

  self.elements = ['connectedIcon', 'registeredIcon'];

  self.listeners = function() {

  };

  return self;
}