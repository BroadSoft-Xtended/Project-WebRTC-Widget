module.exports = require('webrtc-core').bdsft.View(ConnectionStatusView)

function ConnectionStatusView(connectionstatus) {
  var self = {};

  self.model = connectionstatus;
  
  self.elements = ['connectedIcon', 'registeredIcon'];

  var isEnabled = function(icon){
    return icon.hasClass('success');
  };

  var enableIcon = function(icon, enable){
    if(enable) {
      show(icon, 'success', 3000);
    } else {
      show(icon, 'alert');
    }
  };

  self.connected = function(value){
    if(arguments.length === 1) {
      enableIcon(self.connectedIcon, value);
    } else {
      return isEnabled(self.connectedIcon);
    }
  };
  self.registered = function(value){
    if(arguments.length === 1) {
      enableIcon(self.registeredIcon, value);
    } else {
      return isEnabled(self.registeredIcon);
    }
  };

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

  return self;
}