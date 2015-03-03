module.exports = PopupView;

var $ = require('jquery');

function PopupView(eventbus) {
  var self = {};

  self.attached = false;

  self.visible = false;

  self.show = function() {
    this.setVisible(true);
  };

  self.hide = function() {
    this.setVisible(false);
  };

  self.toggle = function() {
    this.setVisible(!this.visible);
  };

  self.appendTo = function(parent) {
    this.view.appendTo(parent);
  };

  self.setVisible = function(visible) {
    if (!self.attached) {
      eventbus.attachView(this);
      self.attached = true;
    }
    this.visible = visible;

    eventbus.viewChanged(this);
  };

  return self;
}