var loader = require('webrtc-core').loader;
var Widget = require('../');

var widgetLoader = loader(Widget, {
      // Overwrite styles and templates
      // style: {
      //       authentication: require('../js/styles').authentication
      // },
      // template: {
      //       authentication: require('../js/templates').authentication
      // },
      dependencies: {
            audio: require("webrtc-audio"),
            authentication: require("webrtc-authentication"),
            dialpad: require("webrtc-dialpad"),
            dms: require("webrtc-dms"),
            callcontrol: require("webrtc-callcontrol"),
            connectionstatus: require("webrtc-connectionstatus"),
            fullscreen: require("webrtc-fullscreen"),
            history: require("webrtc-history"),
            incomingcall: require("webrtc-incomingcall"),
            messages: require("webrtc-messages"),
            settings: require("webrtc-settings"),
            sipstack: require("webrtc-sipstack"),
            stats: require("webrtc-stats"),
            sound: require("webrtc-sound"),
            timer: require("webrtc-timer"),
            transfer: require("webrtc-transfer"),
            video: require("webrtc-video"),
            videobar: require("webrtc-videobar"),
            xmpp: require("webrtc-xmpp"),
            widget: Widget
      }
});

window.BroadSoftWebRTC = window.BroadSoftWebRTC || {};
window.BroadSoftWebRTC.loader = widgetLoader;

module.exports = widgetLoader;