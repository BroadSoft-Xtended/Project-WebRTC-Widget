module( "Client", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.mockSound();
    ClientConfig.domainTo = "domain.to";
    ClientConfig.domainFrom = "domain.from";
    ClientConfig.enableTransfer = true;
    ClientConfig.enableCallStats = false;
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {console.log("enableLocalAudio : "+enable);}
  }, teardown: function() {
  }
});

test('validateDestination', function() {
  client = new WebRTC.Client();
  ClientConfig.allowOutside = true;
  strictEqual(client.validateDestination("1000"), "sip:1000@domain.to");
  strictEqual(client.validateDestination("1000@webrtc"), "sip:1000@webrtc.domain.to");
  strictEqual(client.validateDestination("1000@webrtc.domain.to"), "sip:1000@webrtc.domain.to");
  strictEqual(client.validateDestination("1000@domain.to"), "sip:1000@domain.to");
});
test('validateDestination with allowOutside = false', function() {
  client = new WebRTC.Client();
  ClientConfig.allowOutside = false;
  strictEqual(client.validateDestination("1000"), false);
  strictEqual(client.validateDestination("1000@webrtc"), false);
  strictEqual(client.validateDestination("1000@webrtc.domain.to"), "sip:1000@webrtc.domain.to");
  strictEqual(client.validateDestination("1000@domain.to"), "sip:1000@domain.to");
  strictEqual(client.validateDestination("1000@anotherdomain.to"), false);
});
test('resolution class for hd=true', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "hd" ? "true" : false;}
  client = new WebRTC.Client();
  strictEqual(client.client.attr('class').split(" ")[0], "r"+WebRTC.C.R_1280x720);
});
test('resolution class for resolution setting', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "hd" ? "false" : false;}
  $.cookie("settingResolutionDisplay", WebRTC.C.R_960x720);
  $.cookie("settingResolutionEncoding", WebRTC.C.R_320x240);
  client = new WebRTC.Client();
  strictEqual(client.client.attr('class').split(" ")[0], "r"+WebRTC.C.R_960x720);
});
test('call if enter pressed on destination input', function() {
  var called = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  client.sipStack.ua.isConnected = function(){return true;};
  client.call = function(){console.log('call');called = true;};
  var event = jQuery.Event("keypress");
  event.keyCode = 13;
  $("#destination").trigger(event);
  ok(called);
});
test('call and press enter on destination input', function() {
  var called = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  strictEqual(client.sipStack.getCallState(), WebRTC.SIPStack.C.STATE_STARTED);
  client.sipStack.call = function(destination){console.log('call');called = true;};
  var event = jQuery.Event("keypress");
  event.keyCode = 13;
  client.destination.val("1000@domain.to");
  client.destination.trigger(event);
  ok(!called);
});
test('reInvite popup', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.reInvitePopup, false);
});
test('reInvite popup after incoming reInvite', function() {
  ClientConfig.enableAutoAcceptReInvite = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.emitReInvite(client);
  TestWebrtc.Helpers.isVisible(client.reInvitePopup, true);
});
test('reInvite popup after incoming reInvite and accept clicked', function() {
  ClientConfig.enableAutoAcceptReInvite = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.emitReInvite(client);
  client.acceptReInviteCall.trigger("click");
  TestWebrtc.Helpers.isVisible(client.reInvitePopup, false);
  ok(reInviteAccepted, "should have accepted the reInvite")
});
test('reInvite popup after incoming reInvite and reject clicked', function() {
  ClientConfig.enableAutoAcceptReInvite = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.emitReInvite(client);
  client.rejectReInviteCall.trigger("click");
  TestWebrtc.Helpers.isVisible(client.reInvitePopup, false);
  ok(reInviteRejected, "should have rejected the reInvite")
});
test('muteAudio', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.muteAudio, false);
});
test('unmuteAudio', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.unmuteAudio, false);
});
test('hangup', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.hangup, false);
});
test('muteAudio on call started', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.muteAudio, true);
});
test('muteAudio on mute triggered', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.muteAudio.trigger("click");
  TestWebrtc.Helpers.isVisible(client.muteAudio, false);
  client.unmuteAudio.trigger("click");
  TestWebrtc.Helpers.isVisible(client.muteAudio, true);
});
test('unmuteAudio on mute triggered', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.muteAudio.trigger("click");
  TestWebrtc.Helpers.isVisible(client.unmuteAudio, true);
  client.unmuteAudio.trigger("click");
  TestWebrtc.Helpers.isVisible(client.unmuteAudio, false);
});
test('hangup on call started', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.hangup, true);
});
test('muteAudio on call started and disabled muted', function() {
  ClientConfig.enableMute = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.muteAudio, false);
});
test('unmuteAudio on call started and disabled muted', function() {
  ClientConfig.enableMute = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.unmuteAudio, false);
});
test('muteAudio on call ended', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.muteAudio, false);
});
test('unmuteAudio on call ended', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.muteAudio.trigger("click");
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.unmuteAudio, false);
});
test('hangup on call ended', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.hangup, false);
});
test('hangup on calling', function() {
  client = new WebRTC.Client();
  client.sipStack.ua.isConnected = function(){ return true;}
  client.uriCall("1000@webrtc.domain.to");
  TestWebrtc.Helpers.newCall();
  strictEqual(client.sipStack.getCallState(), "calling");
  TestWebrtc.Helpers.isVisible(client.hangup, true);
  TestWebrtc.Helpers.isVisible(client.callButton, false);
});
test('hangup on failed', function() {
  client = new WebRTC.Client();
  client.sipStack.ua.isConnected = function(){ return true;}
  TestWebrtc.Helpers.failCall();
  strictEqual(client.sipStack.getCallState(), "connected");
  TestWebrtc.Helpers.isVisible(client.hangup, false);
  TestWebrtc.Helpers.isVisible(client.callButton, true);
});
test('getUserMedia failed', function() {
  client = new WebRTC.Client();
  client.eventBus.on("calling", function(evt){
    evt.sender.failed('local', null, ExSIP.C.causes.USER_DENIED_MEDIA_ACCESS);
  });
  TestWebrtc.Helpers.connect();
  client.call();
  client.uriCall("1000@webrtc.domain.to");
  strictEqual(client.errorPopup.dialog( "isOpen" ), true);
});
