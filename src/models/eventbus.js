// module.exports = EventBus;
module.exports = require('../factory')(EventBus);

var util = require('util');
var events = require('events');

function EventBus(){
	var self = this;

	self.message = function(text, level){
		self.emit('message', {text: text, level: level});
	};
	self.viewChanged = function(view){
		self.emit('viewChanged', {visible: view.visible, view: view._name.replace(/view$/i, '')});
	};
	self.calling = function(destination){
		self.emit('calling', {destination: destination});
	};

  events.EventEmitter.call(this);		

  return self;
}

util.inherits(EventBus, events.EventEmitter);