module( "Timer", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
  }, teardown: function() {
  }
});
test('format', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  strictEqual(client.timer.text.text(), '00:00:00');
  var timerFunction = client.timer.runningTimer();
  timerFunction();
  strictEqual(client.timer.text.text(), '00:00:00');
});
test('timer on call started with enableCallTimer = true', function() {
  ClientConfig.enableCallTimer = true;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.timer.text, false);
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.timer.text, true);
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.timer.text, false);
  strictEqual(client.timer.text.text(), '00:00:00');
});
test('timer on call started with enableCallTimer = false', function() {
  ClientConfig.enableCallTimer = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.timer.text, false);
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.timer.text, false);
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.timer.text, false);
});
