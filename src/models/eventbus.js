module.exports = EventBus;

var ee = require('event-emitter');

function EventBus() {
	var self = ee({});

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
	self.calling = function(destination) {
		self.emit('calling', {
			destination: destination
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
