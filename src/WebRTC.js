var ExSIP = require('exsip');
var jQuery = jquery = $ = require('jquery');
require('jquery.cookie')
var Client = require('views/client');
var Constants = require('webrtc-core/Constants');
var Utils = require('webrtc-core/Utils');
var ClientConfig = require('client-config');
var WebRTC = {
  Client: Client,
  Utils: Utils,
  C: Constants,
  Sound: require('models/sound'),
  Settings: require('models/settings')
};

module.exports = WebRTC;

Object.defineProperties(WebRTC, {
  version: {
    get: function() {
      return '<%= pkg.version %>';
    }
  },
  name: {
    get: function() {
      return '<%= pkg.title %>';
    }
  }
});

jQuery.fn.putCursorAtEnd = function() {

  return this.each(function() {

    $(this).focus();

    // If this function exists...
    if (this.setSelectionRange) {
      // ... then use it (Doesn't work in IE)

      // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      var len = $(this).val().length * 2;

      this.setSelectionRange(len, len);

    } else {
      // ... otherwise replace the contents with itself
      // (Doesn't work in Google Chrome)

      $(this).val($(this).val());

    }

    // Scroll to the bottom, in case we're in a tall textarea
    // (Necessary for Firefox and Google Chrome)
    this.scrollTop = 999999;

  });

};

$.cssHooks.backgroundColor = {
  get: function(elem) {
    var bg = null;
    if (elem.currentStyle) {
      bg = elem.currentStyle.backgroundColor;
    } else if (window.getComputedStyle) {
      bg = document.defaultView.getComputedStyle(elem,
        null).getPropertyValue("background-color");
    }
    if (bg.search("rgb") === -1 || bg === 'transparent') {
      return bg;
    } else {
      bg = bg.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+).*\)$/);
      var hex = function(x) {
        return ("0" + parseInt(x, 10).toString(16)).slice(-2);
      };
      return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
    }
  }
};

var currentScript = $('script').last();
$(document).ready(function() {
  window.BroadSoftWebRTC = window.BroadSoftWebRTC || {};
  window.BroadSoftWebRTC.clients = [];

  if (!currentScript.text()) {
    return;
  }
  var configData = JSON.parse(currentScript.text());
  console.log("script config : ", configData);
  var clientConfig = Utils.clone(ClientConfig);
  var options = $.extend({}, clientConfig, configData);
  console.log("options : ", options);
  options.id = options.id || window.BroadSoftWebRTC.clients.length === 0 && 'default' || Utils.rstring();
  var client = require('./factory')(Client)(options);
  client.appendTo(currentScript.parent());
  var styleData = currentScript.data();
  if (styleData) {
    client.updateCss(styleData);
  }
  client.src = currentScript[0].src;
  currentScript.remove();
  window.BroadSoftWebRTC.clients.push(client);
});

(function($) {
  $.isBlank = function(obj) {
    return (!obj || $.trim(obj) === "");
  };
})(jQuery);

if (typeof String.prototype.endsWith !== 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}