module( "Timer", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
  }, teardown: function() {
  }
});
test('format', function() {
  client = new WebRTC.Client();
  var timerFunction = client.timer.runningTimer();
  timerFunction();
  strictEqual(client.timer.text.text(), '00:00:00');
});