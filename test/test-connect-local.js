module( "setRtcMediaHandlerOptions", {
  setup: function() {
    ua = TestWebrtc.Helpers.createFakeUA({trace_sip: true, use_preloaded_route: false});
    ua.on('newRTCSession', function(e){ session = e.data.session; });
    TestWebrtc.Helpers.mockWebRTC();

    ua.setRtcMediaHandlerOptions({videoBandwidth: '512', disableICE: true});
    TestWebrtc.Helpers.startAndConnect(ua);
  }, teardown: function() {
  }
});
test('without b=AS', function() {
  testInviteRTCMessage(false);
});

test('with b=AS', function() {
  testInviteRTCMessage(true);
});

function testInviteRTCMessage(hasBandwidth) {
  ua.transport.onMessage({data: TestWebrtc.Helpers.ringingResponse(ua)});
  ua.transport.onMessage({data: TestWebrtc.Helpers.inviteResponse(ua, {hasBandwidth: hasBandwidth})});
  strictEqual(session.rtcMediaHandler.peerConnection.remoteDescription.getVideoBandwidth(), "512")
}