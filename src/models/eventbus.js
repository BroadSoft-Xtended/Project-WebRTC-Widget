module.exports = EventBus;

var ee = require('event-emitter');

function EventBus() {
	var self = {};

	var emitter = ee({});
	self.test = '121';
	
	self.on = function(type, listener){
		if(Array.isArray(type)) {
			type.forEach(function(t) {
				emitter.on(t, listener);
			});
		} else {
			emitter.on(type, listener);
		}
	};
	self.once = function(type, listener){
		if(Array.isArray(type)) {
			type.forEach(function(t) {
				emitter.once(t, listener);
			});
		} else {
			emitter.once(type, listener);
		}		
	};
	self.emit = function(type, obj){
		if(Array.isArray(type)) {
			type.forEach(function(t) {
				emitter.emit(t, obj);
			});
		} else {
			emitter.emit(type, obj);
		}
	};
	self.attachView = function(view) {
		self.emit('attachView', {
			view: view
		});
	};
	self.message = function(text, level) {
		self.emit('message', {
			text: text,
			level: level
		});
	};
	self.smsRemovedFailed = function(inboxItem) {
		self.emit('smsRemovedFailed', {inboxItem: inboxItem});
	};
	self.smsRemoved = function(inboxItem) {
		self.emit('smsRemoved', {inboxItem: inboxItem});
	};
	self.smsRemoving = function(inboxItem) {
		self.emit('smsRemoving', {inboxItem: inboxItem});
	};
	self.smsSending = function() {
		self.emit('smsSending', {});
	};
	self.shareFile = function(file) {		
		self.emit('shareFile', {
			file: file
		});
	};
	self.digit = function(digit, isFromDestination) {		
		self.emit('digit', {
			digit: digit,
			isFromDestination: isFromDestination
		});
	};
	self.viewChanged = function(view) {
		self.emit('viewChanged', {
			visible: view.visible,
			view: view.name || view._name.replace(/view$/i, '')
		});
	};
	self.resolutionChanged = function(resolution) {
		self.emit('resolutionChanged', {
			type: resolution.resolutionType || resolution.type,
			encoding: resolution.resolutionEncoding || resolution.encoding,
			display: resolution.resolutionDisplay || resolution.display
		});
	};
	self.bandwidthChanged = function(bandwidth) {
		self.emit('bandwidthChanged', {
			type: bandwidth.bandwidthLow || bandwidth.low,
			encoding: bandwidth.bandwidthMed || bandwidth.med,
			display: bandwidth.bandwidthHigh || bandwidth.high
		});
	};
	self.authenticationFailed = function(authentication) {
		self.emit('authenticationFailed', {
			userid: authentication.userid,
			authUserid: authentication.authUserid,
			password: authentication.password
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
