module( "Client", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.mockSound();
    ClientConfig.domainTo = "domain.to";
    ClientConfig.domainFrom = "domain.from";
    WebRTC.Client.prototype.enableLocalAudio = function(enable) {console.log("enableLocalAudio : "+enable);}
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
  strictEqual(client.main.attr('class').split(" ")[0], "r"+WebRTC.C.R_1280x720);
});
test('resolution class for resolution setting', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "hd" ? "false" : false;}
  $.cookie("settingResolutionDisplay", WebRTC.C.R_960x720);
  $.cookie("settingResolutionEncoding", WebRTC.C.R_320x240);
  client = new WebRTC.Client();
  strictEqual(client.main.attr('class').split(" ")[0], "r"+WebRTC.C.R_960x720);
});
test('call if enter pressed on destination input', function() {
  var called = false;
  WebRTC.Client.prototype.call = function(){console.log('call');called = true;};
  client = new WebRTC.Client();
  var event = jQuery.Event("keypress");
  event.keyCode = 13;
  $("#destination").trigger(event);
  ok(called);
});
test('reInvite popup', function() {
  client = new WebRTC.Client();
  isVisible(client.reInvitePopup, false);
});
test('reInvite popup after incoming reInvite', function() {
  ClientConfig.enableAutoAcceptReInvite = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.emitReInvite(client);
  isVisible(client.reInvitePopup, true);
});
test('reInvite popup after incoming reInvite and accept clicked', function() {
  ClientConfig.enableAutoAcceptReInvite = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.emitReInvite(client);
  client.acceptReInviteCall.trigger("click");
  isVisible(client.reInvitePopup, false);
  ok(reInviteAccepted, "should have accepted the reInvite")
});
test('reInvite popup after incoming reInvite and reject clicked', function() {
  ClientConfig.enableAutoAcceptReInvite = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.emitReInvite(client);
  client.rejectReInviteCall.trigger("click");
  isVisible(client.reInvitePopup, false);
  ok(reInviteRejected, "should have rejected the reInvite")
});
test('muteAudio', function() {
  client = new WebRTC.Client();
  isVisible(client.muteAudio, false);
});
test('unmuteAudio', function() {
  client = new WebRTC.Client();
  isVisible(client.unmuteAudio, false);
});
test('transfer', function() {
  client = new WebRTC.Client();
  isVisible(client.transfer, false);
});
test('hangup', function() {
  client = new WebRTC.Client();
  isVisible(client.hangup, false);
});
test('transferPopup', function() {
  client = new WebRTC.Client();
  isVisible(client.transferPopup, false);
});
test('muteAudio on call started', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  isVisible(client.muteAudio, true);
});
test('transfer on call started', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  isVisible(client.transfer, true);
});
test('muteAudio on mute triggered', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.muteAudio.trigger("click");
  isVisible(client.muteAudio, false);
  client.unmuteAudio.trigger("click");
  isVisible(client.muteAudio, true);
});
test('unmuteAudio on mute triggered', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.muteAudio.trigger("click");
  isVisible(client.unmuteAudio, true);
  client.unmuteAudio.trigger("click");
  isVisible(client.unmuteAudio, false);
});
test('transferPopup on transfer triggered', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.transfer.trigger("click");
  isVisible(client.transferPopup, true);
  client.transfer.trigger("click");
  isVisible(client.transferPopup, false);
});
test('transferPopup on transfer rejected', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.transfer.trigger("click");
  isVisible(client.transferPopup, true);
  client.rejectTransfer.trigger("click");
  isVisible(client.transferPopup, false);
});
test('hangup on call started', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  isVisible(client.hangup, true);
});
test('transferPopup on call started', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  isVisible(client.transferPopup, false);
});
test('muteAudio on call started and disabled muted', function() {
  ClientConfig.enableMute = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  isVisible(client.muteAudio, false);
});
test('unmuteAudio on call started and disabled muted', function() {
  ClientConfig.enableMute = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  isVisible(client.unmuteAudio, false);
});
test('muteAudio on call ended', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.endCall();
  isVisible(client.muteAudio, false);
});
test('unmuteAudio on call ended', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.muteAudio.trigger("click");
  TestWebrtc.Helpers.endCall();
  isVisible(client.unmuteAudio, false);
});
test('hangup on call ended', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.endCall();
  isVisible(client.hangup, false);
});
test('transfer on call ended', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.endCall();
  isVisible(client.transfer, false);
});
test('acceptTransfer triggered with empty target', function() {
  var transferTarget = null;
  client = new WebRTC.Client();
  ExSIP.UA.prototype.transfer = function(target, rtcSession){console.log('transfer');transferTarget = target;};
  TestWebrtc.Helpers.startCall();
  client.transfer.trigger("click");
  isVisible(client.transferPopup, true);
  client.acceptTransfer.trigger("click");
  isVisible(client.transferPopup, true);
  strictEqual(transferTarget, null);
});
test('acceptTransfer triggered with target', function() {
  var transferTarget = null;
  client = new WebRTC.Client();
  ExSIP.UA.prototype.transfer = function(target, rtcSession){console.log('transfer');transferTarget = target;};
  TestWebrtc.Helpers.startCall();
  client.transfer.trigger("click");
  isVisible(client.transferPopup, true);
  client.transferTarget.val("1000@other.domain.to");
  client.acceptTransfer.trigger("click");
  isVisible(client.transferPopup, false);
  strictEqual(transferTarget, "sip:1000@other.domain.to");
});
test('acceptTransfer triggered with target and with attended checked', function() {
  var basicTransferTarget = null;
  var attendedTransferTarget = null;
  client = new WebRTC.Client();
  ExSIP.UA.prototype.transfer = function(target, rtcSession){console.log('basic transfer');basicTransferTarget = target;};
  ExSIP.UA.prototype.attendedTransfer = function(target, rtcSession){console.log('attended transfer');attendedTransferTarget = target;};
  TestWebrtc.Helpers.startCall();
  client.transfer.trigger("click");
  client.transferTypeAttended.prop('checked', true);
  client.transferTarget.val("1000@other.domain.to");
  client.acceptTransfer.trigger("click");
  strictEqual(attendedTransferTarget, "sip:1000@other.domain.to");
});

function isVisible(element, visible) {
  var isPopup = element.attr('class').indexOf('popup') !== -1;
  strictEqual(element.css('opacity'), visible ? "1" : "0");
  strictEqual(element.css('zIndex'), visible ? (isPopup ? "100" : "20") : "10");

}
