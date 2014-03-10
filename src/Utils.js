/**
 * @fileoverview Utils
 */

(function(WebRTC) {
var Utils;

Utils= {
  format: function(seconds)
  {
    var hrs = Math.floor(seconds / 3600);
    seconds %= 3600;
    var mns = Math.floor(seconds / 60);
    seconds %= 60;
    var formatedDuration = (hrs < 10 ? "0" : "") + hrs + ":" + (mns < 10 ? "0" : "") + mns + ":" + (seconds < 10 ? "0" : "") + seconds;
    return(formatedDuration);
  },

  /* Pull the URL variables out of URL */
  getSearchVariable: function(variable)
  {
    var search = decodeURIComponent(window.location.search.substring(1));
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

  containsKey: function(object, value) {
    return $.inArray(value, $.map(object, function(key, value) { return key; })) !== -1;
  },

  containsValue: function(object, value) {
    return $.inArray(value, $.map(object, function(key, value) { return value; })) !== -1;
  },

  addSelectOptions: function(options, selector) {
    $.each(options, function(key, value) {
      $(selector)
        .append($('<option>', { value : value })
        .text(key));
    });
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

  whiteboardCompabilityCheck: function()
  {
    var isChrome = this.isChrome();

    // Only Chrome 34+
    if (!isChrome)
    {
      return "Chrome is required, please go to:<br>" +
        "<a href='http://chrome.google.com'>http://chrome.google.com</a>";
    }
    var major = this.majorVersion();
    if (isChrome && major < 34)
    {
      return "Your version of Chrome must be upgraded to at least version 34 in order to be able to use the whiteboard<br>" +
        "Please go to: <a href='http://chrome.google.com'>http://chrome.google.com</a> or <a href='https://www.google.com/intl/en/chrome/browser/canary.html'>https://www.google.com/intl/en/chrome/browser/canary.html</a>";
    }
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
  },

  rebindListeners: function(type, elements, listener){
    for(var i=0; i<elements.length; i++) {
      this.rebindListener(type, elements[i], listener);
    }
  },

  rebindListener: function(type, element, listener){
    element.off(type);
    element.on(type, listener);
  },

  colorNameToHex: function(color){
    if(!color) {
      return false;
    }
    var colors = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
      "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
      "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
      "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
      "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
      "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
      "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
      "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
      "honeydew":"#f0fff0","hotpink":"#ff69b4",
      "indianred ":"#cd5c5c","indigo ":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
      "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
      "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
      "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
      "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
      "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
      "navajowhite":"#ffdead","navy":"#000080",
      "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
      "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
      "red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
      "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
      "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
      "violet":"#ee82ee",
      "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
      "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colors[color.toLowerCase()] !== 'undefined') {
      return colors[color.toLowerCase()];
    }

    return this.isHexColor(color) ? (color.indexOf("#") !== -1 ? color : "#"+color) : false;
  },

  isHexColor: function(color) {
    return (/(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i.test(color));
  },

  parseDTMFTones: function(destination) {
    if(!destination) {
      return null;
    }
    var dtmfMatch = destination.match(/,[0-9A-D#*,]+/, '');
    return dtmfMatch ? dtmfMatch[0] : null;
  }
};

WebRTC.Utils = Utils;
}(WebRTC));
