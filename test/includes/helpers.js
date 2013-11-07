(function(window) {
var TestWebrtc = (function() {
  "use string";
  return {};
}());


TestWebrtc.Helpers = {

  isVisible: function(element, visible) {
    var isPopup = element.attr('class').indexOf('popup') !== -1;
    strictEqual(element.css('opacity'), visible ? "1" : "0");
    strictEqual(element.css('zIndex'), visible ? (isPopup ? "100" : "20") : "10");
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
    client.sipStack.emit("onReInvite", client.sipStack, {
      session: {acceptReInvite: function(){reInviteAccepted = true;},
        rejectReInvite: function(){reInviteRejected = true;}},
      request: {from: {displayName: "test", uri: {user: "user"}}},
      audioAdd: true,
      videoAdd: true
    });
  },

  connect: function() {
    client.sipStack.emit('connected', client.sipStack);
  },

  endCall: function() {
    client.activeSession.status = ExSIP.RTCSession.C.STATUS_TERMINATED;
    client.activeSession.emit('ended', client.activeSession);
  },

  startCall: function(session) {
    session = session || this.outgoingSession();
    client.sipStack.emit('newRTCSession', client.sipStack, {session: session});
    session.emit('started', session);
  },

  outgoingSession: function(){
    var session = this.createSession();
    session.id = "someid";
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
    var session = new ExSIP.RTCSession(client.sipStack);
    session.hold = function(success){console.log("hold"); session.holded(), success();}
    session.unhold = function(success){console.log("unhold"); session.unholded(), success();}
    session.terminate = function(options){console.log("terminate"); session.ended('local');}
    session.answer = function(options){console.log("answer"); answerOptions = options; session.started('local');}
    return session;
  },

  incomingCall: function(session){
    session = session || this.incomingSession();
    var request = {to_tag: "1234567", from_tag: "7654321", from: {display_name: "Incoming DisplayName", uri: {user: "Incoming User"}}};
    client.sipStack.emit('newRTCSession', client.sipStack, {session: session, request: request});
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
        setRemoteDescription: function(description, success, failure){console.log("-- RTCPeerConnection.setRemoteDescription() : "+ExSIP.Utils.toString(description));this.remoteDescription = description; success();},
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


