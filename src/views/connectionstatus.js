module.exports = ConnectionStatusView

function ConnectionStatusView() {
  var self = {};

  self.elements = ['connectedIcon', 'registeredIcon'];

  self.fieldValue = function(name, value) {
    if(arguments.length === 2) {
      if(value) {
        show(self[name+'Icon'], 'success', 3000);
      } else {
        show(self[name+'Icon'], 'alert');
      }
    } else {
      return self[name+'Icon'].hasClass('success');  
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