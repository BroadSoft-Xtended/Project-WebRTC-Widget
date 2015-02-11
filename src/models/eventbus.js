// module.exports = EventBus;
module.exports = require('../factory')(EventBus);

var util = require('util');
var events = require('events');

function EventBus(){
  events.EventEmitter.call(this);		
}

util.inherits(EventBus, events.EventEmitter);