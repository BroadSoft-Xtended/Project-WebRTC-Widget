var Client = require('./Client');
var Utils = require('./Utils');
var ClientConfig = require('../js/client-config.js.default');
var WebRTC = {
  Client: Client,
  Utils: Utils,
  Sound: require('./Sound')
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

$(document).ready(function() {
  var nodes = $("script[src*='webrtc-bundle']");
  if (nodes.length === 0) {
    console.error('no <script> with webrtc-bundle.js found');
    return;
  }

  window.BroadSoftWebRTC = window.BroadSoftWebRTC || {};
  window.BroadSoftWebRTC.clients = [];

  $.each(nodes, function(i, node) {
    node = $(node);
    if (!node.text()) {
      return;
    }
    var configData = JSON.parse(node.text());
    console.log("script config : ", configData);
    var clientConfig = Utils.clone(ClientConfig);
    var config = $.extend({}, clientConfig, configData);
    console.log("merged config : ", config);
    var client = new Client(config, node.parent());
    var styleData = node.data();
    if (styleData) {
      client.updateCss(styleData);
    }
    client.src = node[0].src;
    node.remove();
    window.BroadSoftWebRTC.clients.push(client);
  });
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