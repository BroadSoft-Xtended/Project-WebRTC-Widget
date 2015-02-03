var util = require('util');
var events = require('events');

function EventBus(){
  events.EventEmitter.call(this);
}

util.inherits(EventBus, events.EventEmitter);

// Assure the configuration object is a singleton.
global.WEBRTC_EVENTBUS = global.WEBRTC_EVENTBUS || new EventBus();
//
// // The module exports a singleton instance of the Config class so the
// // instance is immediately available on require(), and the prototype methods
// // aren't a part of the object namespace when inspected.
module.exports = global.WEBRTC_EVENTBUS;
