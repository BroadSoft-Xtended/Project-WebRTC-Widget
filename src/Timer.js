/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Timer;
//    LOG_PREFIX = WebRTC.name +' | '+ 'Configuration' +' | ';

  Timer = function(client, stats, configuration) {
    this.text = $("#timer");

    this.client = client;
    this.stats = stats;
    this.configuration = configuration;
    this.callTimer = null;
  };

  Timer.prototype = {
    start: function()
    {
      if(this.configuration.timerRunning) {
        return;
      }

      this.configuration.timerRunning = true;
      var timer = this.runningTimer();
      this.callTimer = setInterval(timer, 1000);
      if (ClientConfig.enableCallTimer)
      {
        this.text.fadeIn(100);
      }
    },

    stop: function()
    {
      this.text.fadeOut(100);
      this.configuration.timerRunning = false;
      clearInterval(this.callTimer);
    },

// Display the timer on the screen
    runningTimer: function()
    {
      var startTime = new Date().getTime(), self = this;
      return function ()
      {
        var secs = Math.round((new Date().getTime() - startTime) / 1000);
        if (self.configuration.maxCallLength && secs >= self.configuration.maxCallLength)
        {
          self.client.rtcSession.terminate();
          self.client.endCall();
          return;
        }
        self.text.text(WebRTC.Utils.format(secs));
        if (ClientConfig.enableCallStats && WebRTC.Utils.isChrome())
        {
          self.stats.processStats();
        }
      };
    }
  };

  WebRTC.Timer = Timer;
}(WebRTC));
