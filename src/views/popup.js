module.exports = PopupView;

var $ = require('jquery');

function PopupView(eventbus) {
  var self = {};

  var attached = false;

  self.visible = false;

  self.show = function() {
    self.setVisible(true);
  };

  self.hide = function() {
    self.setVisible(false);
  };

  self.toggle = function() {
    self.setVisible(!self.visible);
  };

  self.setVisible = function(visible) {
    if (!attached) {
      if(typeof document !== 'undefined') {
        self.view.appendTo($(document));        
      }
      attached = true;
    }
    self.visible = visible;

    eventbus.viewChanged(self);
  };

  return self;
}