/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var EventBus;
//    LOG_PREFIX = WebRTC.name +' | '+ 'EventBus' +' | ';

  EventBus = function(configuration) {
    this.configuration = configuration;

    var events = [
      'message',
      'userMediaUpdated',
      'reInvite',
      'incomingCall',
      'connected',
      'registered',
      'registrationFailed',
      'disconnected',
      'progress',
      'failed',
      'started',
      'ended'
    ];

    this.initEvents(events);
  };

  EventBus.prototype = new ExSIP.EventEmitter();

  EventBus.prototype.message = function(text, level) {
    this.emit("message", this, {text: text, level: level});
  };
  EventBus.prototype.userMediaUpdated = function(localStream) {
    this.emit("userMediaUpdated", this, {localStream: localStream});
  };
  EventBus.prototype.reInvite = function(data) {
    this.emit("reInvite", this, data);
  };
  EventBus.prototype.incomingCall = function(data) {
    this.emit("incomingCall", this, data);
  };
  EventBus.prototype.connected = function() {
    this.emit("connected", this);
  };
  EventBus.prototype.registered = function() {
    this.emit("registered", this);
  };
  EventBus.prototype.registrationFailed = function() {
    this.emit("registrationFailed", this);
  };
  EventBus.prototype.disconnected = function() {
    this.emit("disconnected", this);
  };
  EventBus.prototype.failed = function(sender, data) {
    this.emit("failed", sender, data);
  };
  EventBus.prototype.progress = function(sender, data) {
    this.emit("progress", sender, data);
  };
  EventBus.prototype.started = function(sender, data) {
    this.emit("started", sender, data);
  };
  EventBus.prototype.ended = function(sender, data) {
    this.emit("ended", sender, data);
  };
  EventBus.prototype.isDebug = function() {
    return this.configuration.isDebug();
  };

  WebRTC.EventBus = EventBus;
}(WebRTC));
