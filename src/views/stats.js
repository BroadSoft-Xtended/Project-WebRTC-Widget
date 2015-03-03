module.exports = StatsView;

var PopupView = require('./popup');
var Utils = require('../Utils');

function StatsView(options, eventbus) {
  var self = {};

  Utils.extend(self, PopupView(options, eventbus));

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
    var classes = jQuery.grep($(parentSelector).attr('class').split(" "), function(n) {
      return n.indexOf(className) === -1;
    });
    if (selected) {
      classes.push(id + '-selected');
      if (id !== className) {
        classes.push(className + '-selected');
      }
    }
    var classNames = classes.join(" ");
    $(parentSelector).attr('class', classNames);
  };

  self.listeners = function() {
    self.statsVar.click(function() {
      var index = self.statsVar.index($(this)[0]);
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