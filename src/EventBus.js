/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var EventBus;
//    LOG_PREFIX = WebRTC.name +' | '+ 'EventBus' +' | ';

  EventBus = function(options) {
    this.options = options || {};

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
      'held',
      'resumed',
      'ended',
      'calling',
      'newDTMF',
      'viewChanged',
      'dataSent',
      'dataReceived',
      'smsLoggedIn',
      'smsReadAll',
      'smsSent'
    ];

    this.initEvents(events);
  };

  EventBus.prototype = new ExSIP.EventEmitter();

  EventBus.prototype.viewChanged = function(sender, data) {
    this.emit("viewChanged", sender, data);
  };
  EventBus.prototype.message = function(text, level) {
    this.emit("message", this, {text: text, level: level});
  };
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
  EventBus.prototype.connected = function(data) {
    this.emit("connected", this, data);
  };
  EventBus.prototype.registered = function(data) {
    this.emit("registered", this, data);
  };
  EventBus.prototype.registrationFailed = function(data) {
    this.emit("registrationFailed", this, data);
  };
  EventBus.prototype.disconnected = function(data) {
    this.emit("disconnected", this, data);
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
  EventBus.prototype.held = function(sender, data) {
    this.emit("held", sender, data);
  };
  EventBus.prototype.resumed = function(sender, data) {
    this.emit("resumed", sender, data);
  };
  EventBus.prototype.ended = function(sender, data) {
    this.emit("ended", sender, data);
  };
  EventBus.prototype.dataSent = function(sender, data) {
    this.emit("dataSent", sender, data);
  };
  EventBus.prototype.dataReceived = function(sender, data) {
    this.emit("dataReceived", sender, data);
  };
  EventBus.prototype.calling = function(sender, data) {
    this.emit("calling", sender, data);
  };
  EventBus.prototype.newDTMF = function(sender, data) {
    this.emit("newDTMF", sender, data);
  };
  EventBus.prototype.smsLoggedIn = function(sender, data) {
    this.emit("smsLoggedIn", sender, data);
  };
  EventBus.prototype.smsReadAll = function(sender, data) {
    this.emit("smsReadAll", sender, data);
  };
  EventBus.prototype.smsSent = function(sender, data) {
    this.emit("smsSent", sender, data);
  };
  EventBus.prototype.isDebug = function() {
    return this.options.isDebug();
  };

  WebRTC.EventBus = EventBus;
}(WebRTC));
