var loader = require('webrtc-core').loader;
var Widget = require('../');

module.exports = loader(Widget, {
      dependencies: {
            authentication: require("webrtc-authentication"),
            dialpad: require("webrtc-dialpad"),
            callcontrol: require("webrtc-callcontrol"),
            connectionstatus: require("webrtc-connectionstatus"),
            fileshare: require("webrtc-fileshare"),
            stats: require("webrtc-stats"),
            history: require("webrtc-history"),
            incomingcall: require("webrtc-incomingcall"),
            messages: require("webrtc-messages"),
            reinvite: require("webrtc-reinvite"),
            settings: require("webrtc-settings"),
            sms: require("webrtc-sms"),
            timer: require("webrtc-timer"),
            transfer: require("webrtc-transfer"),
            video: require("webrtc-video"),
            videobar: require("webrtc-videobar"),
            whiteboard: require("webrtc-whiteboard"),
            xmpp: require("webrtc-xmpp"),
            client: Widget
      }
});