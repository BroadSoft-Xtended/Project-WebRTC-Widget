(function(window) {
var TestWebrtc = (function() {
  "use string";
  return {};
}());


TestWebrtc.Helpers = {

  isVisible: function(element, visible) {
    var isPopup = element.attr('class').indexOf('popup') !== -1;
    strictEqual(element.css('opacity'), visible ? "1" : "0");
    strictEqual(element.css('zIndex'), visible ? (isPopup ? "100" : "20") : "-1");
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

  emitReInvite: function(client) {
    client.sipStack.ua.emit("onReInvite", client.sipStack.ua, {
      session: {acceptReInvite: function(){reInviteAccepted = true;},
        rejectReInvite: function(){reInviteRejected = true;}},
      request: {from: {displayName: "test", uri: {user: "user"}}},
      audioAdd: true,
      videoAdd: true
    });
  },

  connect: function() {
    client.sipStack.ua.emit('connected', client.sipStack.ua);
  },

  disconnect: function(data) {
    client.sipStack.ua.emit('disconnected', client.sipStack.ua, data);
  },

  registrationFailed: function(statusCode) {
    client.sipStack.ua.emit('registrationFailed', client.sipStack.ua, {response: {status_code: (statusCode || 401)}});
  },

  endCall: function() {
    client.sipStack.activeSession.status = ExSIP.RTCSession.C.STATUS_TERMINATED;
    client.sipStack.activeSession.emit('ended', client.sipStack.activeSession);
  },

  startCall: function(session) {
    session = session || this.outgoingSession();
    client.sipStack.ua.emit('newRTCSession', client.sipStack.ua, {session: session});
    session.started('local');
    return session;
  },

  reconnectCall: function(session) {
    session = session || this.outgoingSession();
    session.started('local', undefined, true);
  },

  newCall: function(session) {
    session = session || this.outgoingSession();
    client.sipStack.ua.emit('newRTCSession', client.sipStack.ua, {session: session});
  },

  failCall: function(session) {
    session = session || this.outgoingSession();
    client.sipStack.ua.emit('newRTCSession', client.sipStack.ua, {session: session});
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
    var session = new ExSIP.RTCSession(client.sipStack.ua);
    session.hold = function(success){console.log("hold"); session.held(); if(success){success();}}
    session.unhold = function(success){console.log("unhold"); session.resumed(); if(success){success();}}
    session.terminate = function(options){console.log("terminate"); session.ended('local');}
    session.answer = function(options){console.log("answer"); answerOptions = options; session.started('local');}
    return session;
  },

  incomingCall: function(session){
    session = session || this.incomingSession();
    var request = {to_tag: "1234567", from_tag: "7654321", from: {display_name: "Incoming DisplayName", uri: {user: "Incoming User"}}};
    client.sipStack.ua.emit('newRTCSession', client.sipStack.ua, {session: session, request: request});
  },

  mockSound: function(){
    WebRTC.Sound.prototype.playClick = function(){console.log('playClick');}
    WebRTC.Sound.prototype.play = function(){console.log('play');}
    WebRTC.Sound.prototype.pause = function(){console.log('pause');}
  },

  mockLocation: function(){
    WebRTC.Settings.prototype.reload = function(){console.log('reloaded');}
    window.location.reload = function(){console.log('reloaded');}
  },

  mockWebRTC: function(){
    ExSIP.WebRTC.RTCPeerConnection = function(){
      console.log('-- RTCPeerConnection.new()');
      return {
        localDescription: null,
        remoteDescription: null,
        close: function(){console.log("-- RTCPeerConnection.close()")},
        setRemoteDescription: function(description, success, failure){console.log("-- RTCPeerConnection.setRemoteDescription() : "+ExSIP.Utils.toString(description));this.remoteDescription = description; if(success){success();}},
        addStream: function(){console.log("-- RTCPeerConnection.addStream()")},
        createOffer: function(success){console.log("-- RTCPeerConnection.createOffer()"); success(new ExSIP.WebRTC.RTCSessionDescription());},
        createAnswer: function(success){console.log("-- RTCPeerConnection.createAnswer()"); success(new ExSIP.WebRTC.RTCSessionDescription());},
        setLocalDescription: function(description){console.log("-- RTCPeerConnection.setLocalDescription() : "+ExSIP.Utils.toString(description));this.localDescription = description;}
      }
    };
    ExSIP.WebRTC.getUserMedia = function(constraints, success, failure){
      console.log('-- getUserMedia ');
      success();
    };
    ExSIP.WebRTC.isSupported = true;
    ExSIP.UA.prototype.recoverTransport = function(){console.log("--recoverTransport");}
  }
};


window.TestWebrtc = TestWebrtc;
}(window));


