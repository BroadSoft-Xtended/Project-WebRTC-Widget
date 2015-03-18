// var jQuery = jquery = $ = require('jquery');
// require('jquery.cookie')
var core = require('webrtc-core');
var Constants = core.constants;
var Utils = core.utils;
var Client = require('views/client');
var Sound = require('models/sound');
var WebRTC = {
  Utils: Utils,
  C: Constants,
  Client: Client,
  Sound: Sound
};

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

// if(!jQuery.fn) {
//   jQuery.fn = {};
// }
// jQuery.fn.putCursorAtEnd = function() {

//   return this.each(function() {

//     $(this).focus();

//     // If this function exists...
//     if (this.setSelectionRange) {
//       // ... then use it (Doesn't work in IE)

//       // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
//       var len = $(this).val().length * 2;

//       this.setSelectionRange(len, len);

//     } else {
//       // ... otherwise replace the contents with itself
//       // (Doesn't work in Google Chrome)

//       $(this).val($(this).val());

//     }

//     // Scroll to the bottom, in case we're in a tall textarea
//     // (Necessary for Firefox and Google Chrome)
//     this.scrollTop = 999999;

//   });

// };

// if(!jQuery.cssHooks) {
//   jQuery.cssHooks = {};
// }
// jQuery.cssHooks.backgroundColor = {
//   get: function(elem) {
//     var bg = null;
//     if (elem.currentStyle) {
//       bg = elem.currentStyle.backgroundColor;
//     } else if (window.getComputedStyle) {
//       bg = document.defaultView.getComputedStyle(elem,
//         null).getPropertyValue("background-color");
//     }
//     if (bg.search("rgb") === -1 || bg === 'transparent') {
//       return bg;
//     } else {
//       bg = bg.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+).*\)$/);
//       var hex = function(x) {
//         return ("0" + parseInt(x, 10).toString(16)).slice(-2);
//       };
//       return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
//     }
//   }
// };

var currentScript = core.utils.getElement('script').last();
core.utils.getElement(document).ready(function() {
  window.BroadSoftWebRTC = window.BroadSoftWebRTC || {};
  window.BroadSoftWebRTC.clients = [];

  if (!currentScript.text()) {
    return;
  }
  var ClientConfig = require('bdsft-webrtc-config');
  var configData = JSON.parse(currentScript.text());
  console.log("script config : ", configData);
  var client = createClient(configData);
  client.appendTo(currentScript.parent());
  var styleData = currentScript.data();
  if (styleData) {
    client.updateCss(styleData);
  }
  client.src = currentScript[0].src;
  currentScript.remove();
  window.BroadSoftWebRTC.clients.push(client);
});

var createClient = function(configData) {
  var clientConfig = Utils.clone(ClientConfig);
  var options = core.utils.extend({}, clientConfig, configData);
  options.id = options.id || window.BroadSoftWebRTC.clients.length === 0 && 'default' || Utils.rstring();
  options.dependencies = {
    core: core,
    authenticationView: require("webrtc-authentication").view,
    callcontrolView: require("views/callcontrol.js"),
    clientView: require("views/client.js"),
    connectionstatusView: require("views/connectionstatus.js"),
    dialpadView: require("views/dialpad.js"),
    fileshareView: require("views/fileshare.js"),
    historyView: require("views/history.js"),
    incomingcallView: require("views/incomingcall.js"),
    messagesView: require("views/messages.js"),
    reinviteView: require("views/reinvite.js"),
    settingsView: require("views/settings.js"),
    smsView: require("views/sms.js"),
    statsView: require("views/stats.js"),
    timerView: require("views/timer.js"),
    transferView: require("views/transfer.js"),
    videoView: require("views/video.js"),
    videobarView: require("views/videobar.js"),
    whiteboardView: require("views/whiteboard.js"),
    xmppView: require("views/xmpp.js"),
    authentication: require("webrtc-authentication").model,
    callcontrol: require("models/callcontrol.js"),
    connectionstatus: require("models/connectionstatus.js"),
    fileshare: require("models/fileshare.js"),
    history: require("models/history.js"),
    incomingcall: require("models/incomingcall.js"),
    messages: require("models/messages.js"),
    reinvite: require("models/reinvite.js"),
    settings: require("models/settings.js"),
    sms: require("models/sms.js"),
    smsprovider: require("models/smsprovider.js"),
    sound: require("models/sound.js"),
    stats: require("models/stats.js"),
    timer: require("models/timer.js"),
    transfer: require("models/transfer.js"),
    video: require("models/video.js"),
    xmpp: require("models/xmpp.js")    
  };
  options.instancesObj = 'bdsft_client_instances';
  return core.factory(options)(Client);
}

WebRTC.createClient = createClient;

// (function($) {
//   $.isBlank = function(obj) {
//     return (!obj || $.trim(obj) === "");
//   };
// })(jQuery);

if (typeof String.prototype.endsWith !== 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

module.exports = WebRTC;