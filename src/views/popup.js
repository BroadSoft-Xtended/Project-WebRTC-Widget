module.exports = PopupView;

var $ = require('jquery');

function PopupView(options, eventbus) {
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

  self.setVisible = function(visible) {
    if (!self.attached) {
      this.view.appendTo(global.instances['clientview_'+options.id].client);        
      self.attached = true;
    }
    this.visible = visible;

    eventbus.viewChanged(this);
  };

  return self;
}