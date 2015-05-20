module.exports = require('webrtc-core').bdsft.Model(Widget);

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Widget(eventbus, configuration, videobar) {
  var self = {};

  self.props = {'classes': true};

  self.bindings = {
    'classes': {
        videobar: ['fullscreenVisible'],
        configuration: ['getResolutionDisplay', 'views']
    }
  }

  return self;
}