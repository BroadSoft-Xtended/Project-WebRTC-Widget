module( "Transfer", {
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
test('transfer', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.transfer.icon, false);
});
test('transferPopup', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.transfer.popup, false);
});
test('transfer on call started with enableTransfer is false', function() {
  ClientConfig.enableTransfer = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.transfer.icon, false);
});
test('transfer on call started', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.transfer.icon, true);
});
test('transferPopup on transfer triggered', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.transfer.icon.trigger("click");
  TestWebrtc.Helpers.isVisible(client.transfer.popup, true);
  client.transfer.icon.trigger("click");
  TestWebrtc.Helpers.isVisible(client.transfer.popup, false);
});
test('transferPopup on transfer rejected', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.transfer.icon.trigger("click");
  TestWebrtc.Helpers.isVisible(client.transfer.popup, true);
  client.transfer.reject.trigger("click");
  TestWebrtc.Helpers.isVisible(client.transfer.popup, false);
});
test('transferPopup on call started', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.transfer.popup, false);
});
test('transfer on call ended', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.transfer.icon, false);
});
test('hold call and invite target', function() {
  ClientConfig.enableAutoAnswer = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  var sessionToTransfer = TestWebrtc.Helpers.outgoingSession({id: "sessionToTransfer"});
  TestWebrtc.Helpers.startCall(sessionToTransfer);
  strictEqual(client.sipStack.activeSession.id, sessionToTransfer.id);
  sessionToTransfer.hold();
  var targetSession = TestWebrtc.Helpers.outgoingSession({id: "targetSession"});
  TestWebrtc.Helpers.startCall(targetSession);
  strictEqual(client.sipStack.activeSession.id, targetSession.id);
  TestWebrtc.Helpers.isVisible(client.hangup, true);
});

test('hold call and invite target failed', function() {
  ClientConfig.enableAutoAnswer = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  var sessionToTransfer = TestWebrtc.Helpers.outgoingSession({id: "sessionToTransfer"});
  TestWebrtc.Helpers.startCall(sessionToTransfer);
  sessionToTransfer.hold();
  var targetSession = TestWebrtc.Helpers.outgoingSession({id: "targetSession"});
  TestWebrtc.Helpers.failCall(targetSession);
  strictEqual(client.sipStack.activeSession.id, sessionToTransfer.id);
  TestWebrtc.Helpers.isVisible(client.hangup, true);
});
test('acceptTransfer triggered with empty target', function() {
  var transferTarget = null;
  client = new WebRTC.Client();
  ExSIP.UA.prototype.transfer = function(target, rtcSession){console.log('transfer');transferTarget = target;};
  TestWebrtc.Helpers.startCall();
  client.transfer.icon.trigger("click");
  TestWebrtc.Helpers.isVisible(client.transfer.popup, true);
  client.transfer.accept.trigger("click");
  TestWebrtc.Helpers.isVisible(client.transfer.popup, true);
  strictEqual(transferTarget, null);
});
test('acceptTransfer triggered with target', function() {
  var transferTarget = null;
  client = new WebRTC.Client();
  ExSIP.UA.prototype.transfer = function(target, rtcSession){console.log('transfer');transferTarget = target;};
  TestWebrtc.Helpers.startCall();
  client.transfer.icon.trigger("click");
  TestWebrtc.Helpers.isVisible(client.transfer.popup, true);
  client.transfer.targetInput.val("1000@other.domain.to");
  client.transfer.accept.trigger("click");
  TestWebrtc.Helpers.isVisible(client.transfer.popup, false);
  strictEqual(transferTarget, "sip:1000@other.domain.to");
});
test('acceptTransfer triggered with target and with attended checked', function() {
  var basicTransferTarget = null;
  var attendedTransferTarget = null;
  client = new WebRTC.Client();
  ExSIP.UA.prototype.transfer = function(target, rtcSession){console.log('basic transfer');basicTransferTarget = target;};
  ExSIP.UA.prototype.attendedTransfer = function(target, rtcSession){console.log('attended transfer');attendedTransferTarget = target;};
  TestWebrtc.Helpers.startCall();
  client.transfer.icon.trigger("click");
  client.transfer.typeAttended.prop('checked', true);
  client.transfer.targetInput.val("1000@other.domain.to");
  client.transfer.accept.trigger("click");
  strictEqual(attendedTransferTarget, "sip:1000@other.domain.to");
});
