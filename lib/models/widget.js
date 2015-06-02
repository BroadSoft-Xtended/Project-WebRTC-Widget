module.exports = require('webrtc-core').bdsft.Model(Widget);

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Widget(eventbus, video, urlconfig, cookieconfig, fullscreen) {
  var self = {};

  self.props = ['classes'];

  self.bindings = {
    classes: {
        video: 'displayResolution',
        fullscreen: 'visible',
        urlconfig: ['view', 'hd'],
        cookieconfig: ['hd'],
    }
  }

  return self;
}