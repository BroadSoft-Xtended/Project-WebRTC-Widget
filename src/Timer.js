/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Timer;
//    LOG_PREFIX = WebRTC.name +' | '+ 'Configuration' +' | ';

  Timer = function(client, stats, configuration) {
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
        $("#timer").fadeIn(100);
      }
    },

    stop: function()
    {
      $("#timer").fadeOut(100);
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
        $("#timer").text(self.format(secs));
        if (ClientConfig.enableCallStats && WebRTC.Utils.isChrome())
        {
          self.stats.processStats();
        }
      };
    },

    format: function(seconds)
    {
      var hrs = Math.floor(seconds / 3600);
      seconds %= 3600;
      var mns = Math.floor(seconds / 60);
      seconds %= 60;
      var formatedDuration = (hrs < 10 ? "0" : "") + hrs + ":" + (mns < 10 ? "0" : "") + mns + ":" + (seconds < 10 ? "0" : "") + seconds;
      return(formatedDuration);
    }
  };

  WebRTC.Timer = Timer;
}(WebRTC));
