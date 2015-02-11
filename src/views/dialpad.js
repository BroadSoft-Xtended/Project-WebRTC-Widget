module.exports = require('../factory')(DialpadView)

var Utils = require('../Utils');
var $ = require('jquery');
var PopupView = require('./popup');

function DialpadView(options, eventbus) {
  var self = {};

  self.__proto__ = PopupView(eventbus);

  self.elements = ['historyButton', 'destination'];

  self.listeners = function() {
    eventbus.on('calling', function(e) {
      self.destination.val(e.destination);
    });
    eventbus.on('viewChanged', function(e) {
      if(e.view === 'history') {
        if(e.visible) {
          self.historyButton.removeClass("active");
        } else {
          self.historyButton.addClass("active");
        }
      } else if(e.view === 'settings' && e.visible) {
        self.hide();
      }
    });
  };

  return self;
}