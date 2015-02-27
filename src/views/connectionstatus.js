module.exports = ConnectionStatusView

var Utils = require('../Utils');
var ExSIP = require('exsip');

function ConnectionStatusView(options, eventbus, configuration) {
  var self = {};

  self.elements = ['connectedIcon', 'registeredIcon'];

  var levels = ['success', 'alert'];
  var show = function(element, level, hideDelay){
    levels.forEach(function(l){
      element.toggleClass(l, l === level);
    });
    element.toggleClass('fadeOut', false);
    element.toggleClass('fadeIn', true);
    if(hideDelay) {
      window.setTimeout(function(){
        hide(element);
      }, hideDelay);
    }
  };

  var hide = function(element){
    element.toggleClass('fadeIn', false);
    element.toggleClass('fadeOut', true);
  };

  self.listeners = function() {
    eventbus.on("disconnected", function(e) {
      if (configuration.enableConnectionIcon) {
        show(self.connectedIcon, 'alert');
      }
    });
    eventbus.on("connected", function(e) {
      if (configuration.enableConnectionIcon) {
        show(self.connectedIcon, 'success', 3000);
      }
    });
    eventbus.on("registrationFailed", function(e) {
      if (configuration.enableRegistrationIcon) {
        show(self.registeredIcon, 'alert');
      }
    });
    eventbus.on("registered", function(e) {
      if (configuration.enableRegistrationIcon) {
        show(self.registeredIcon, 'success', 3000);
      }
    });
  };

  return self;
}