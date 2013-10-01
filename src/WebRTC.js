/*global console: false*/

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

  return WebRTC;
}());
