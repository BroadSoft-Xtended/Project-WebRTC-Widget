/**
 * @name WebRTC
 * @namespace
 */
(function(window) {

var WebRTC = (function() {
  "use strict";

  var WebRTC = {};

  Object.defineProperties(WebRTC, {
    version: {
      get: function(){ return '<%= pkg.version %>'; }
    },
    name: {
      get: function(){ return '<%= pkg.title %>'; }
    }
  });

  $.cssHooks.backgroundColor = {
    get: function(elem) {
      var bg = null;
      if (elem.currentStyle) {
        bg = elem.currentStyle["backgroundColor"];
      }
      else if (window.getComputedStyle) {
        bg = document.defaultView.getComputedStyle(elem,
          null).getPropertyValue("background-color");
      }
      if (bg.search("rgb") === -1) {
        return bg;
      }
      else {
        bg = bg.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+))?\)$/);
        var hex = function(x) {
          return ("0" + parseInt(x, 10).toString(16)).slice(-2);
        };
        return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
      }
    }
  };

  (function($){
    $.isBlank = function(obj){
      return(!obj || $.trim(obj) === "");
    };
  })(jQuery);

  return WebRTC;
}());
