/**
 * @fileoverview Utils
 */

(function(WebRTC) {
var Utils;

Utils= {
  /* Pull the URL variables out of URL */
  getSearchVariable: function(variable)
  {
    var search = window.location.search.substring(1);
    var vars = search.split("&");
    for (var i=0;i<vars.length;i++)
    {
      var pair = vars[i].split("=");
      if(pair[0] === variable)
      {
        return pair[1];
      }
    }
    return(false);
  },

  // Generate a random userid
  randomUserid: function()
  {
    var chars = "0123456789abcdef";
    var string_length = 10;
    var userid = '';
    for (var i=0; i<string_length; i++)
    {
      var rnum = Math.floor(Math.random() * chars.length);
      userid += chars.substring(rnum,rnum+1);
    }
    return userid;
  },

  compatibilityCheck: function()
  {
    var isChrome = this.isChrome();
    var isFirefox = this.isFirefox();

    // Only Chrome 25+ and Firefox 22+ are supported
    if (!isChrome && !isFirefox)
    {
      return "Chrome or Firefox is required, please go to:<br>" +
        "<a href='http://chrome.google.com'>http://chrome.google.com</a> or <a href='http:www.mozilla.org'>http://www.mozilla.org</a>";
    }
    var major = this.majorVersion();
    if (isChrome && major < 25)
    {
      return "Your version of Chrome must be upgraded to at least version 25<br>" +
        "Please go to: <a href='http://chrome.google.com'>http://chrome.google.com</a>";
    }
    else
    {
      if (isFirefox && major < 22)
      {
        return "Your version of Firefox must be upgraded to at least version 22y<br>" +
          "Please go to: <a href='http://www.mozilla.org'>http://www.mozilla.org</a>";
      }
      ClientConfig.enableStats = false;
    }
  },

  majorVersion: function(){
    return detect.parse(navigator.userAgent).browser.major;
  },

  isChrome: function(){
    var ua = detect.parse(navigator.userAgent);
    return (/chrom(e|ium)/).test(ua.browser.family.toLowerCase());
  },

  isFirefox: function(){
    var ua = detect.parse(navigator.userAgent);
    return (/firefox/).test(ua.browser.family.toLowerCase());
  }
};

WebRTC.Utils = Utils;
}(WebRTC));
