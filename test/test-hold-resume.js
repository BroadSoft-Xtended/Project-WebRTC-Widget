module( "Hold/Resume", {
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
test('hold icon', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.hold, false);
});
test('resume icon', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.resume, false);
});
test('hold icon on call started with enableHold is false', function() {
  ClientConfig.enableHold = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.hold, false);
});

test('hold icon on call started with enableHold is true', function() {
  ClientConfig.enableHold = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.hold, true);
});
test('resume icon on call started with enableHold is false', function() {
  ClientConfig.enableHold = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.resume, false);
});
test('resume icon on call started with enableHold is true', function() {
  ClientConfig.enableHold = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.resume, false);
});
test('hold icon after call holded', function() {
  ClientConfig.enableHold = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.hold.element.trigger("click");
  TestWebrtc.Helpers.isVisible(client.hold, false);
});
test('resume icon after call holded', function() {
  ClientConfig.enableHold = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.hold.element.trigger("click");
  strictEqual(client.hold.disabled, false);
  TestWebrtc.Helpers.isVisible(client.resume, true);
});
test('hold icon after call unholded', function() {
  ClientConfig.enableHold = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.hold.element.trigger("click");
  client.resume.element.trigger("click");
  strictEqual(client.resume.disabled, false);
  TestWebrtc.Helpers.isVisible(client.hold, true);
});
test('resume icon after call unholded', function() {
  ClientConfig.enableHold = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.hold.element.trigger("click");
  client.resume.element.trigger("click");
  TestWebrtc.Helpers.isVisible(client.resume, false);
});
test('hold icon on call ended', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.hold, false);
});
test('resume icon on call ended', function() {
  client = new WebRTC.Client();
  TestWebrtc.Helpers.startCall();
  client.hold.element.trigger("click");
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.resume, false);
});
