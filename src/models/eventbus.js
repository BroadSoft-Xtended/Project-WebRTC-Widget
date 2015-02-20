module.exports = EventBus;

var ee = require('event-emitter');

function EventBus() {
	var self = {};

	var emitter = ee({});
	self.test = '121';
	
	self.on = function(type, listener){
		emitter.on(type, listener);
	};
	self.once = function(type, listener){
		emitter.once(type, listener);
	};
	self.emit = function(type, obj){
		emitter.emit(type, obj);
	};
	self.message = function(text, level) {
		self.emit('message', {
			text: text,
			level: level
		});
	};
	self.viewChanged = function(view) {
		self.emit('viewChanged', {
			visible: view.visible,
			view: view._name.replace(/view$/i, '')
		});
	};
	self.calling = function(destination, session) {
		self.emit('calling', {
			destination: destination,
			session: session
		});
	};
	self.modifier = function(which) {
		self.emit('modifier', {
			which: which
		});
	};
	self.screenshare = function(enabled) {
		self.emit('screenshare', {
			enabled: enabled
		});
	};
	self.signIn = function() {
		self.emit('signIn');
	};
	self.signOut = function() {
		self.emit('signOut');
	};

	return self;
}
