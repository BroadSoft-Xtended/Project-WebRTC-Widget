module( "Incoming Call", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.mockSound();
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {console.log("enableLocalAudio : "+enable);}
  }, teardown: function() {
  }
});

test('window.onbeforeunload', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  var session = TestWebrtc.Helpers.incomingSession();
  var terminated = false;
  session.terminate = function(options){terminated = true;}
  TestWebrtc.Helpers.incomingCall(session);
  window.onbeforeunload();
  strictEqual(terminated, true, "Should terminate the incoming session");
});
