module.exports = PopupView;

var $ = require('jquery');

function PopupView(options, parent, eventbus) {
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
      parent.view.appendTo(global.instances['clientview_'+options.id].client);        
      attached = true;
    }
    self.visible = visible;

    eventbus.viewChanged(parent);
  };

  return self;
}