var ExSIP = require('ExSIP');
var WebRTC = require('../../src/WebRTC');

module.exports = {
  isVisible: function(element, visible) {
    // fix caching bug with jsdom and css() by calling _clearMemoizedQueries();
    element[0]._clearMemoizedQueries();
    var isPopup = element.attr('class').indexOf('popup') !== -1;
    expect(element.css('opacity')).toEqual(visible ? "1" : "0");
    expect(element.css('zIndex')).toEqual(visible ? (isPopup ? "100" : "20") : "-1");
  },

  deleteAllCookies: function() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  },

  emitReInvite: function() {
    sipstack.ua.emit("onReInvite", sipstack.ua, {
      session: {acceptReInvite: function(){reInviteAccepted = true;},
        rejectReInvite: function(){reInviteRejected = true;}},
      request: {from: {displayName: "test", uri: {user: "user"}}},
      audioAdd: true,
      videoAdd: true
    });
  },

  connectAndStartCall: function() {
    this.connect();
    this.startCall();
  },

  connect: function() {
    sipstack.ua.isConnected = function(){return true;};
    sipstack.ua.emit('connected', sipstack.ua);
  },

  disconnect: function(data) {
    sipstack.ua.isConnected = function(){return false;};
    sipstack.ua.emit('disconnected', sipstack.ua, data);
  },

  registrationFailed: function(statusCode) {
    sipstack.ua.emit('registrationFailed', sipstack.ua, {response: {status_code: (statusCode || 401)}});
  },

  registered: function() {
    sipstack.ua.emit('registered', sipstack.ua, {response: {status_code: 200}});
  },

  endCall: function() {
    sipstack.activeSession.status = ExSIP.RTCSession.C.STATUS_TERMINATED;
    sipstack.activeSession.emit('ended', sipstack.activeSession);
  },

  startCall: function(session) {
    session = session || this.outgoingSession();
    sipstack.ua.emit('newRTCSession', sipstack.ua, {session: session});
    session.started('local');
    return session;
  },

  reconnectCall: function(session) {
    session = session || this.outgoingSession();
    session.started('local', undefined, true);
  },

  newCall: function(session) {
    session = session || this.outgoingSession();
    sipstack.ua.emit('newRTCSession', sipstack.ua, {session: session});
  },

  failCall: function(session) {
    session = session || this.outgoingSession();
    sipstack.ua.emit('newRTCSession', sipstack.ua, {session: session});
    session.failed('local', 'somemessage', 'somecause');
  },

  outgoingSession: function(option){
    option = option || {};
    var session = this.createSession();
    session.id = option.id || "someid";
    session.remote_identity = {uri: "remoteuri"};
    return session;
  },

  incomingSession: function(){
    var session = this.createSession();
    session.id = "incomingid";
    session.direction = "incoming";
    session.status = ExSIP.RTCSession.C.STATUS_WAITING_FOR_ANSWER;
    session.remote_identity = {uri: "incoming_remote_uri"};
    return session;
  },

  createSession: function(){
    var session = new ExSIP.RTCSession(sipstack.ua);
    session.hold = function(success){console.log("hold"); session.held(); if(success){success();}}
    session.unhold = function(success){console.log("unhold"); session.resumed(); if(success){success();}}
    session.terminate = function(options){console.log("terminate"); session.ended('local');}
    session.answer = function(options){console.log("answer"); answerOptions = options; session.started('local');}
    session.changeSession = function(options, success){console.log("changeSession"); session.started('local'); success();}
    return session;
  },

  incomingCall: function(session){
    session = session || this.incomingSession();
    var request = {to_tag: "1234567", from_tag: "7654321", from: {display_name: "Incoming DisplayName", uri: {user: "Incoming User"}}};
    sipstack.ua.emit('newRTCSession', sipstack.ua, {session: session, request: request});
  },

  createLocalMedia: function(){
    return {stop: function(){}, getAudioTracks: function(){return [{}];}};
  },

  mockSound: function(){
    WebRTC.Sound.prototype.playClick = function(){console.log('playClick');}
    WebRTC.Sound.prototype.play = function(){console.log('play');}
    WebRTC.Sound.prototype.pause = function(){console.log('pause');}
  },

  mockSMSProvider: function(){
    smsprovider.remove = function(){console.log('remove');}
    smsprovider.sendSMS = function(){console.log('sendSMS');}
    smsprovider.login = function(){console.log('login');}
    smsprovider.readAll = function(){console.log('readAll');}
    smsprovider.getUpdate = function(){console.log('getUpdate');}
  },

  mockLocation: function(){
    WebRTC.Settings.prototype.reload = function(){console.log('reloaded');}
    window.location.reload = function(){console.log('reloaded');}
  },

  mockWebRTC: function(){
    var self = this;
    ExSIP.WebRTC.RTCPeerConnection = function(){
      console.log('-- RTCPeerConnection.new()');
      return {
        localDescription: null,
        remoteDescription: null,
        createDTMFSender: function(){console.log('createDTMFSender'); return {}},
        close: function(){console.log("-- RTCPeerConnection.close()")},
        setRemoteDescription: function(description, success, failure){console.log("-- RTCPeerConnection.setRemoteDescription() : "+ExSIP.Utils.toString(description));this.remoteDescription = description; if(success){success();}},
        addStream: function(){console.log("-- RTCPeerConnection.addStream()")},
        createOffer: function(success){console.log("-- RTCPeerConnection.createOffer()"); success(new ExSIP.WebRTC.RTCSessionDescription());},
        createAnswer: function(success){console.log("-- RTCPeerConnection.createAnswer()"); success(new ExSIP.WebRTC.RTCSessionDescription());},
        setLocalDescription: function(description){console.log("-- RTCPeerConnection.setLocalDescription() : "+ExSIP.Utils.toString(description));this.localDescription = description;}
      }
    };
    ExSIP.WebRTC.getUserMedia = function(constraints, success, failure){
      success(self.createLocalMedia());
    };
    ExSIP.WebRTC.isSupported = true;
    ExSIP.UA.prototype.recoverTransport = function(){console.log("--recoverTransport");}
    WebRTC.Client.checkEndCallURL = function(){console.log("---checkEndCallURL");}
    WebRTC.Utils.compatibilityCheck = function(){}
    WebRTC.Utils.whiteboardCompabilityCheck = function(){}
  }
}
