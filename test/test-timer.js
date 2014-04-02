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
test('timer on call started with enableCallTimer = true', function() {
  ClientConfig.enableCallTimer = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.timer.text, false);
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.timer.text, true);
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.timer.text, false);
});
test('timer on call started with enableCallTimer = false', function() {
  ClientConfig.enableCallTimer = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.timer.text, false);
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.timer.text, false);
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.timer.text, false);
});
