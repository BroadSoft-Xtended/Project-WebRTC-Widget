module.exports = require('webrtc-core').bdsft.Model(Timer);

var Utils = require('webrtc-core').utils;

function Timer(eventbus, debug, configuration, sipstack) {
  var self = {};

  self.callTimer = null;
  self.startTime = null;

  self.props = {'text': true};

  self.init = function() {
    self.updateText();
  };

  self.listeners = function() {
    eventbus.on("started", function(e) {
      if (e.data && !e.data.isReconnect) {
        self.start();
      }
    });
    eventbus.on(["disconnected", "endCall", "ended", "failed"], function(e) {
      self.stop();
    });
  };

  self.start = function() {
    if (self.callTimer) {
      debug('timer ' + self.callTimer + ' already running');
      return;
    }

    var timer = self.runningTimer();
    timer();
    self.callTimer = setInterval(timer, 1000);
    debug("started timer interval");
  };

  self.stop = function() {
    self.startTime = null;
    clearInterval(self.callTimer);
    debug("cleared timer interval");
    self.callTimer = null;
    self.updateText();
  };

  self.getSeconds = function() {
    return Math.round((new Date().getTime() - (self.startTime || new Date().getTime())) / 1000);
  };

  self.updateText = function() {
    var secs = self.getSeconds();
    self.text = Utils.format(secs);
  };

  // Display the timer on the screen
  self.runningTimer = function() {
    self.startTime = new Date().getTime();
    return function() {
      var secs = self.getSeconds();
      if (configuration.maxCallLength && secs >= configuration.maxCallLength) {
        eventbus.endCall();
        return;
      }
      self.updateText();
    };
  }

  return self;
}