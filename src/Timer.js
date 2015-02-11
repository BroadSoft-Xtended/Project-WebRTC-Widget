module.exports = Timer;

var debug = function(msg){
  require('./debug')('timer')(msg);
}
var Utils = require('./Utils');

function Timer(client, stats, configuration) {
  this.text = client.find(".timer");

  this.client = client;
  this.stats = stats;
  this.configuration = configuration;
  this.callTimer = null;
  this.startTime = null;

  this.updateText();
}

Timer.prototype = {
  start: function() {
    if (this.callTimer) {
      debug('timer ' + this.callTimer + ' already running');
      return;
    }

    var timer = this.runningTimer();
    this.callTimer = setInterval(timer, 1000);
    debug("started timer interval : " + this.callTimer);
  },

  stop: function() {
    this.startTime = null;
    clearInterval(this.callTimer);
    debug("cleared timer interval : " + this.callTimer);
    this.callTimer = null;
    this.updateText();
  },

  getSeconds: function() {
    return Math.round((new Date().getTime() - (this.startTime || new Date().getTime())) / 1000);
  },

  updateText: function() {
    var secs = this.getSeconds();
    this.text.text(Utils.format(secs));
  },

  // Display the timer on the screen
  runningTimer: function() {
    var self = this;
    this.startTime = new Date().getTime();
    return function() {
      var secs = self.getSeconds();
      if (self.configuration.maxCallLength && secs >= self.configuration.maxCallLength) {
        self.client.terminateSessions();
        self.client.endCall();
        return;
      }
      self.updateText();
      if (self.configuration.enableCallStats && Utils.isChrome()) {
        self.stats.processStats();
      }
    };
  }
};