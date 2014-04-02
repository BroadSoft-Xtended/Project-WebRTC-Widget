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
      if(this.running) {
        return;
      }

      var timer = this.runningTimer();
      this.callTimer = setInterval(timer, 1000);
    },

    stop: function()
    {
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
          self.client.terminateSessions();
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
