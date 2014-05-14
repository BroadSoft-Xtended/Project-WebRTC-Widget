/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Timer,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Timer');

  Timer = function(client, stats, configuration) {
    this.text = $("#timer");

    this.client = client;
    this.stats = stats;
    this.configuration = configuration;
    this.callTimer = null;
    this.startTime = null;

    this.updateText();
  };

  Timer.prototype = {
    start: function()
    {
      if(this.callTimer) {
        logger.log('timer '+this.callTimer+' already running', this.configuration);
        return;
      }

      var timer = this.runningTimer();
      this.callTimer = setInterval(timer, 1000);
      logger.log("started timer interval : "+this.callTimer, this.configuration);
    },

    stop: function()
    {
      this.startTime = null;
      clearInterval(this.callTimer);
      logger.log("cleared timer interval : "+this.callTimer, this.configuration);
      this.callTimer = null;
      this.updateText();
    },

    getSeconds: function()
    {
      return Math.round((new Date().getTime() - (this.startTime || new Date().getTime())) / 1000);
    },

    updateText: function()
    {
      var secs = this.getSeconds();
      this.text.text(WebRTC.Utils.format(secs));
    },

// Display the timer on the screen
    runningTimer: function()
    {
      var self = this;
      this.startTime = new Date().getTime();
      return function ()
      {
        var secs = self.getSeconds();
        if (self.configuration.maxCallLength && secs >= self.configuration.maxCallLength)
        {
          self.client.terminateSessions();
          self.client.endCall();
          return;
        }
        self.updateText();
        if (ClientConfig.enableCallStats && WebRTC.Utils.isChrome())
        {
          self.stats.processStats();
        }
      };
    }
  };

  WebRTC.Timer = Timer;
}(WebRTC));
