module.exports = require('webrtc-core').bdsft.Model(Client);

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Client(eventbus, configuration) {
  var self = {};

  self.props = {'classes': true, 
    'fullscreenVisible' : {
      onSet: function(){
        updateClasses();
      }
    }
  };

  var updateClasses = function(){
    self.classes = [
      "r" + configuration.getResolutionDisplay(),
      self.fullscreenVisible ? 'fullscreen-shown' : 'fullscreen-hidden'
    ].concat(configuration.views);
  };

  self.listeners = function(sipstackDatabinder, configurationDatabinder) {
    eventbus.on('viewChanged', function(e){
      if(e.view === 'fullscreen') {
        self.fullscreenVisible = e.visible;
      }
    });
    configurationDatabinder.onModelPropChange(['displayResolution', 'views'], function(){
      updateClasses();
    });
    updateClasses();
  };

  return self;
}