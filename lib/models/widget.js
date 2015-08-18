module.exports = require('webrtc-core').bdsft.Model(Widget);

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Widget(eventbus, video, urlconfig, sipstack, cookieconfig, fullscreen, settings, callcontrol, history) {
  var self = {};

  self.props = ['classes'];

  self.bindings = {
    classes: {
        video: 'displayResolution',
        fullscreen: 'visible',
        urlconfig: 'hd',
        sipstack: ['sendVideo', 'receiveVideo'],
        cookieconfig: 'hd'
    }
  }

  self.listeners = function(settingsDatabinder, callcontrolDatabinder){
    settingsDatabinder.onModelPropChange('visible', function(visible){
      visible && history.hide();
      visible && callcontrol.hide();
    });
    callcontrolDatabinder.onModelPropChange('visible', function(visible){
      !visible && history.hide();
      visible && settings.hide();
    });
  }

  return self;
}