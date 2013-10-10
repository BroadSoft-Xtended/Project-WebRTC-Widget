module( "Timer", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
  }, teardown: function() {
  }
});
test('format', function() {
  client = new WebRTC.Client();
  client.sipStack.emit('connected');
  strictEqual($("#timer").text(), '');
});