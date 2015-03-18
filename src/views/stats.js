module.exports = require('webrtc-core').bdsft.View(StatsView);

var PopupView = require('webrtc-core').popup;
var Utils = require('webrtc-core').utils;
var Constants = require('webrtc-core').constants;

function StatsView(eventbus, stats) {
  var self = {};

  self.model = stats;
  
  self.elements = ['statsVar', 'statsContainer', 'videoKiloBitsSentPerSecond', 'audioKiloBitsSentPerSecond', 
  'videoKiloBitsReceivedPerSecond', 'audioKiloBitsReceivedPerSecond', 'videoPacketsLost', 'videoPacketsLostPer',
  'audioPacketsLost', 'audioPacketsLostPer', 'videoGoogFrameRateSent', 'videoGoogFrameRateReceived', 'audioAudioInputLevel', 
  'audioAudioOutputLevel', 'videoGoogFrameWidthReceived', 'videoGoogFrameHeightReceived', 'videoGoogFrameWidthSent', 'videoGoogFrameHeightSent',
  'audioGoogRtt', 'audioGoogJitterReceived'];

  self.peerConnectionElement = function(){
    return self.statsContainer[0];
  };
  self.statsContainerId = function(value){
    self.statsContainer.attr('id', value);
  };

  self.setSelected = function(id, parentSelector, selected) {
    if (arguments.length === 2) {
      selected = true;
    }
    var className = id.replace(/\d+/g, '');
    var classesStr = Utils.getElement(parentSelector).attr('class').split(" ");
    var classes = classesStr.filter(function(n) {
      return n.indexOf(className) === -1;
    });
    if (selected) {
      classes.push(id + '-selected');
      if (id !== className) {
        classes.push(className + '-selected');
      }
    }
    var classNames = classes.join(" ");
    Utils.getElement(parentSelector).attr('class', classNames);
  };

  self.init = function() {
    PopupView(self, eventbus);
  };

  self.listeners = function() {
    self.statsVar.click(function() {
      var index = self.statsVar.index(Utils.getElement(this)[0]);
      self.setSelected("stats" + index, this.callStats);
    });
    eventbus.on('modifier', function(e){
      if(e.which === 83) {
        self.toggle();
      }
    });
  };

  return self;
}