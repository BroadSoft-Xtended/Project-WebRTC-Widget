/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var History;
//    LOG_PREFIX = WebRTC.name +' | '+ 'Configuration' +' | ';

  History = function(sound) {
    this.page = 1;
    this.historyToggled = false;
    this.sound = sound;

    this.registerListeners();
  };

  History.prototype = {
    show: function(page) {
      var allCookies = document.cookie;
      var callsArray = allCookies.match(/call_(.*?)\:\d{2}\:\d{2}/g);
      var callsOnPage = 10;
      if (callsArray)
      {
        var baseIndex = (callsArray.length - callsOnPage*page);
        if (baseIndex >= 1)
        {
          $('#historyForward').fadeIn(100);
        }
        else
        {
          $('#historyForward').fadeOut(10);
        }
        if (page > 1)
        {
          $('#historyBack').fadeIn(100);
        }
        else
        {
          $('#historyBack').fadeOut(10);
        }
        if (callsOnPage > callsArray.length - baseIndex)
        {
          callsOnPage = callsArray.length - baseIndex;
        }
        for(var i = 0; i < callsOnPage && baseIndex + i < callsArray.length && i < callsOnPage; i ++)
        {
          if ((baseIndex + callsOnPage - i) > 0)
          {
            var key = callsArray[(baseIndex + callsOnPage - i)-1].split('=')[0];
            var value = callsArray[(baseIndex + callsOnPage - i)-1].split('=')[1];

            // Parse out call info
            var tempDate = new Date();
            var callArray = value.split('|');
            var destination = callArray[1];
            var historyDirection = callArray[2];
            var historyLength = callArray[3];
            tempDate.setTime(callArray[0]);
            var historyDate = tempDate.toLocaleString();
            var historyDestination = destination.replace(/sip:([^@]+)@.+/,"$1");
            var historyCall = key.replace(/^\D*(\d+)$/,"$1");

            // Display Call History
            $("#row" + i + " .historyCall").text(historyCall);
            $("#row" + i + " .historyDestination").text(historyDestination);
            $("#row" + i + " .historyDirection").text(historyDirection);
            $("#row" + i + " .historyDate").text(historyDate);
            $("#row" + i + " .historyLength").text(historyLength);
          }
          else
          {
            // Blank any remaining lines
            $("#row" + i + " .historyCall").text("");
            $("#row" + i + " .historyDestination").text("");
            $("#row" + i + " .historyDirection").text("");
            $("#row" + i + " .historyDate").text("");
            $("#row" + i + " .historyLength").text("");
          }
        }
      }
    },

   registerListeners: function() {
     var self = this;

     $("#historyForward").bind('click', function(e)
     {
       e.preventDefault();
       self.sound.playClick();
       self.page = self.page +1;
       self.show(self.page);
     });

     $("#historyBack").bind('click', function(e)
     {
       e.preventDefault();
       self.sound.playClick();
       self.page = self.page -1;
       self.show(self.page);
     });

     $("#callHistory").bind('click', function(e)
     {
//  var clicked = (e.target.innerText);
//  var callID = (e.target.parentElement.firstElementChild.firstChild.nodeValue);
     });

     $("#historyClear").bind('click', function(e)
     {
       e.preventDefault();
       self.sound.playClick();
       var allCookies = document.cookie;
       var callsArray = allCookies.match(/call_(.*?)\:\d{2}\:\d{2}/g);
       for (var i = 0; i < callsArray.length; i++)
       {
         $.removeCookie("call_" + (i));
       }
       self.show(1);
     });
   },

   toggle: function() {
      if (WebRTC.ClientConfig.enableCallHistory === true)
      {
        if (this.historyToggled === false)
        {
          $("#callHistory, #historyClear").fadeIn(100);
          this.show(1);
        }
        else if (this.historyToggled === true)
        {
          $("#callHistory, #historyClear").fadeOut(100);
        }
      }
      this.historyToggled = !this.historyToggled;
    }
  };

  WebRTC.History = History;
}(WebRTC));
