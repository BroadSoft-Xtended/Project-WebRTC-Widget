(function(window) {
var TestWebrtc = (function() {
  "use string";
  return {};
}());


TestWebrtc.Helpers = {

  DEFAULT_EXSIP_CONFIGURATION_AFTER_START: {
    password: null,
    register_expires: 600,
    register_min_expires: 120,
    register: false,
    connection_recovery_min_interval: 2,
    connection_recovery_max_interval: 30,
    use_preloaded_route: true,
    no_answer_timeout: 60000,
    stun_servers: ['stun:stun.l.google.com:19302'],
    trace_sip: false,
    hack_via_tcp: false,
    hack_ip_in_contact: false,
    uri: 'sip:fakeUA@exsip.net',
    registrar_server: 'sip:registrar.exsip.net:6060;transport=tcp',
    ws_servers: [{'ws_uri':'ws://localhost:12345','sip_uri':'<sip:localhost:12345;transport=ws;lr>','weight':0,'status':0,'scheme':'WS'}],
    display_name: 'Fake UA ð→€ł !!!',
    authorization_user: 'fakeUA'
  },

  FAKE_UA_CONFIGURATION: {
    uri: 'f%61keUA@exsip.net',
    ws_servers:  'ws://localhost:12345',
    display_name: 'Fake UA ð→€ł !!!',
    register: false,
    use_preloaded_route: true,
    registrar_server: 'registrar.exsip.NET:6060;TRansport=TCP'
  },

  endCall: function() {
    client.rtcSession.emit('ended');
  },

  startCall: function() {
    var rtcSession = new ExSIP.RTCSession(client.sipStack);
    rtcSession.id = "someid";
    rtcSession.remote_identity = {uri: "remoteuri"};
    client.sipStack.emit('newRTCSession', client.sipStack, {session: rtcSession});
    rtcSession.emit('started');
  },

  createFakeUA: function(options) {
    return new ExSIP.UA(ExSIP.Utils.merge_options(this.FAKE_UA_CONFIGURATION, options || {}));
  },

  createSIPMessage: function(ua, sip) {
    var branch = Object.keys(ua.transactions.ict)[0];
    var callId = ua.transactions.ict[branch].request.call_id;
    var fromTag = ua.sessions[Object.keys(ua.sessions)[0]].from_tag;
    console.log("--- branch : "+branch+", call_id : "+callId+", fromTag : "+fromTag);
    return sip.replace(/<via_host>/g, ua.configuration.via_host).replace(/<branch>/g, branch).replace(/<from_tag>/g, fromTag).replace(/<call_id>/g, callId);
  },

  startAndConnect: function(ua) {
    ua.start();
    var options =
    {
      mediaConstraints: {audio: true, video: false},
      RTCConstraints: {'optional': [],'mandatory': {}}
    };
    ua.transport.send = function(msg){console.log("-- Transport.send() WebSocket message:\n\n" + msg + "\n");return true;};
    var session = ua.call("sip:fakeUA@exsip.net", options);
    session.rtcMediaHandler.peerConnection.onicecandidate({e:null});
  },

  mockSound: function(){
    WebRTC.Sound.prototype.playClick = function(){console.log('playClick');}
    WebRTC.Sound.prototype.pause = function(){console.log('pause');}
  },

  mockLocation: function(){
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

  ringingResponse: function(ua) {
    var sip = "SIP/2.0 180 Ringing\r\n"+
      "Via: SIP/2.0/WS <via_host>;branch=<branch>;received=200.49.190.72\r\n"+
      "Contact: <sip:1000@204.117.64.109:8060;transport=ws>\r\n"+
      "To: <sip:fakeUA@exsip.net>;tag=8c9b3674\r\n"+
      "From: \"Dom Webrtc\" <sip:1500@exarionetworks.com>;tag=<from_tag>\r\n"+
      "Call-ID: <call_id>\r\n"+
      "CSeq: 2938 INVITE\r\n"+
      "Content-Length: 0\r\n"+
      "\r\n"+
      "\r\n";
    return TestWebrtc.Helpers.createSIPMessage(ua, sip);
  },

  inviteResponse: function(ua, options) {
    options = options || {};
    var sdp = "v=0\r\n"+
      "o=mscore 1379559174 1 IN IP4 204.117.64.109\r\n"+
      "s=b9mlib9112gtm83k4lbq\r\n"+
      "t=0 0\r\n"+
      (options["withoutAudio"] ? "" :
        "m=audio "+(options["audioPort"] || "58148")+" RTP/SAVPF 111\r\n"+
        (options["withoutAudioConnection"] ? "" : "c=IN IP4 204.117.64.109\r\n")+
        "a=rtpmap:111 opus/48000/2\r\n"+
        "a=fmtp:111 minptime=10\r\n"+
        "a=rtcp-mux\r\n"+
        "a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:w1uzue7tA74YN0vj0kjOp6o8Zo8p6kq/aDlgFYNf\r\n"+
        "a=ice-ufrag:nb48ZfyHpbcKBBQL\r\n"+
        "a=ice-pwd:2Agek09Gmi0ekjFkmiBo4dcv\r\n"+
        "a=ssrc:4292613481 cname:Uv5rvwZOZremxEJW\r\n"+
        "a=candidate:0 1 udp 2113929216 204.117.64.109 58148 typ host\r\n")+
      (options["withoutVideo"] ? "" :
        "m=video "+(options["videoPort"] || "59988")+" RTP/SAVPF 100\r\n"+
        (options["withoutVideoConnection"] ? "" :"c=IN IP4 204.117.64.109\r\n")+
        (options["hasBandwidth"] ? "b=AS:123\r\n" : "")+
        "a=rtpmap:100 VP8/90000\r\n"+
        "a=rtcp-mux\r\n"+
        "a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:w1uzue7tA74YN0vj0kjOp6o8Zo8p6kq/aDlgFYNf\r\n"+
        "a=ice-ufrag:U9A49JC2KZCAR1WI\r\n"+
        "a=ice-pwd:aqWBGDUIRk2WLsY1ww1ucq6K\r\n"+
        "a=ssrc:9348930 cname:21NBsl8jj5ZcdrtT\r\n"+
        "a=candidate:0 1 udp 2113929216 204.117.64.109 59988 typ host\r\n")+
      "\r\n";

    var sip = "SIP/2.0 200 OK\r\n"+
      "Via: SIP/2.0/WS <via_host>;branch=<branch>;received=200.49.190.72\r\n"+
      "Contact: <sip:1000@204.117.64.109:8060;transport=ws>\r\n"+
      "To: <sip:fakeUA@exsip.net>;tag=8c9b3674\r\n"+
      "From: \"Dom Webrtc\" <sip:1500@exarionetworks.com>;tag=<from_tag>\r\n"+
      "Call-ID: <call_id>\r\n"+
      "CSeq: 1353 INVITE\r\n"+
      "Allow: INVITE, ACK, CANCEL, OPTIONS, BYE, UPDATE, INVITE, REGISTER, ACK, CANCEL, BYE, INFO\r\n"+
      "Content-Type: application/sdp\r\n"+
      "Content-Length: "+sdp.length+"\r\n"+
      "\r\n"+
      sdp;
    return TestWebrtc.Helpers.createSIPMessage(ua, sip);
  },

  ackResponse: function(ua, options) {
    options = options || {};

    var sip = "ACK sip:fakeUA@exsip.net SIP/2.0\r\n"+
      "Via: SIP/2.0/WS exarionetworks.com;branch=z9hG4bKBroadWorks.11l7pom-10.48.0.60V5060-0-637827301-392082884-1379960159630\r\n"+
      "Max-Forwards: 69\r\n"+
      "To: <sip:fakeUA@exsip.net>;tag=<from_tag>\r\n"+
      "From: \"Dom Webrtc\" <sip:1500@exarionetworks.com>;tag=8c9b3674\r\n"+
      "Call-ID: <call_id>\r\n"+
      "CSeq: 637827301 ACK\r\n"+
      "Content-Length: 0\r\n"+
      "\r\n";
    return TestWebrtc.Helpers.createSIPMessage(ua, sip);

  },

  inviteRequest: function(ua, options) {
    options = options || {};
    var sdp = "v=0\r\n"+
      "o=BroadWorks 728485 2 IN IP4 10.48.7.56\r\n"+
      "s=-\r\n"+
      (options["withoutConnection"] ? "" : "c=IN IP4 10.48.1.13\r\n")+
      "t=0 0\r\n"+
      (options["withoutAudio"] ? "" :
        "m=audio "+(options["audioPort"] || "16550")+" RTP/AVP 9\r\n"+
        "a="+(options["audioMode"] || "sendrecv")+"\r\n"+
        "a=rtpmap:9 G722/8000\r\n")+
      (options["withoutVideo"] ? "" :
        "m=video "+(options["videoPort"] || "16930")+" RTP/AVP 99 109 34\r\n"+
        "b=AS:"+(options["videoBandwidth"] || "1024")+"\r\n"+
        "a=rtpmap:99 H264/90000\r\n"+
        "a=fmtp:99 profile-level-id=42801E; packetization-mode=0\r\n"+
        "a="+(options["videoMode"] || "sendrecv")+"\r\n"+
        "a=rtpmap:109 H264/90000\r\n"+
        "a=fmtp:109 profile-level-id=42801E; packetization-mode=0\r\n"+
        "a=rtpmap:34 H263/90000\r\n"+
        "a=fmtp:34 CIF=1;QCIF=1;SQCIF=1");

    var sip = "INVITE sip:fakeUA@exsip.net SIP/2.0\r\n"+
      "Via: SIP/2.0/WS <via_host>;branch=z9hG4bKBroadWorks.11l7pom-10.48.0.60V5060-0-637827301-392082884-1379960159630\r\n"+
      "Max-Forwards: 69\r\n"+
      "To: <sip:fakeUA@exsip.net>;tag=<from_tag>\r\n"+
      "From: \"Dom Webrtc\" <sip:1500@exarionetworks.com>;tag=8c9b3674\r\n"+
      "Call-ID: <call_id>\r\n"+
      "CSeq: 637827301 INVITE\r\n"+
      "Contact: <sip:5vlmplnu@exarionetworks.com;transport=ws;ob>\r\n"+
      "Allow: "+(options["allow"] || "ACK,CANCEL,BYE,OPTIONS,INVITE")+"\r\n"+
      "Content-Type: application/sdp\r\n"+
      "Supported: "+(options["supported"] || "path, outbound, gruu")+"\r\n"+
      "User-Agent: Exario Networks WebRTC - 1.4\r\n"+
      "Content-Length: "+sdp.length+"\r\n"+
      "\r\n"+
      sdp;
    return TestWebrtc.Helpers.createSIPMessage(ua, sip);
  }

};


window.TestWebrtc = TestWebrtc;
}(window));


