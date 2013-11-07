module( "Call Waiting", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.mockSound();
    ClientConfig.domainTo = "domain.to";
    ClientConfig.domainFrom = "domain.from";
    ClientConfig.enableTransfer = true;
    ClientConfig.enableCallStats = false;
    WebRTC.Client.prototype.enableLocalAudio = function(enable) {console.log("enableLocalAudio : "+enable);}
  }, teardown: function() {
  }
});

test('1st incoming call', function() {
  ClientConfig.enableAutoAnswer = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  var session = TestWebrtc.Helpers.incomingSession();
  var answerOptions = "";
  session.answer = function(options){console.log("answer"); answerOptions = options;}
  TestWebrtc.Helpers.incomingCall(session);
  strictEqual(answerOptions, "", "Answer should not have been called");
  strictEqual(client.incomingCallName.text(), "Incoming DisplayName");
  strictEqual(client.incomingCallUser.text(), "Incoming User");
  TestWebrtc.Helpers.isVisible(client.callPopup, true);
  strictEqual(client.dropAndAnswerButton.is(":visible"), false);
  strictEqual(client.holdAndAnswerButton.is(":visible"), false);
  strictEqual(client.acceptIncomingCall.is(":visible"), true);
});

test('1st incoming call with enableAutoAnswer', function() {
  ClientConfig.enableAutoAnswer = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  var session = TestWebrtc.Helpers.incomingSession();
  var answerOptions = "";
  session.answer = function(options){console.log("answer"); answerOptions = options;}
  TestWebrtc.Helpers.incomingCall(session);
  notStrictEqual(answerOptions, "", "Answer should have been called");
  TestWebrtc.Helpers.isVisible(client.callPopup, false);
});

test('2nd incoming call with enableAutoAnswer', function() {
  ClientConfig.enableAutoAnswer = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  TestWebrtc.Helpers.startCall();
  var session = TestWebrtc.Helpers.incomingSession();
  var answerOptions = "";
  session.answer = function(options){console.log("answer"); answerOptions = options;}
  TestWebrtc.Helpers.incomingCall(session);
  strictEqual(answerOptions, "", "Answer should not have been called");
  strictEqual(client.incomingCallName.text(), "Incoming DisplayName");
  strictEqual(client.incomingCallUser.text(), "Incoming User");
  TestWebrtc.Helpers.isVisible(client.callPopup, true);
  strictEqual(client.dropAndAnswerButton.is(":visible"), true);
  strictEqual(client.holdAndAnswerButton.is(":visible"), true);
  strictEqual(client.acceptIncomingCall.is(":visible"), false);
});

test('2nd incoming call and hold+answer click', function() {
  ClientConfig.enableAutoAnswer = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  var outgoingSession = TestWebrtc.Helpers.outgoingSession();
  outgoingSession.hold = function(success){console.log("hold"); success();}
  TestWebrtc.Helpers.startCall(outgoingSession);
  var incomingSession = TestWebrtc.Helpers.incomingSession();
  incomingSession.answer = function(options){console.log("answer"); answerOptions = options; incomingSession.started('local');}
  TestWebrtc.Helpers.incomingCall(incomingSession);

  ok(client.activeSession === outgoingSession, "Outgoing session should be active");
  deepEqual(client.sessions.length, 2);
  client.holdAndAnswerButton.trigger("click");
  ok(client.activeSession === incomingSession, "Incoming session should be active");
  deepEqual(client.sessions.length, 2);
  notStrictEqual(answerOptions, "", "Answer should have been called");
});

test('2nd incoming call and hold+answer click and resume 1st call after 2nd ends', function() {
  ClientConfig.enableAutoAnswer = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  var outgoingSession = TestWebrtc.Helpers.outgoingSession();
  TestWebrtc.Helpers.startCall(outgoingSession);
  var incomingSession = TestWebrtc.Helpers.incomingSession();
  TestWebrtc.Helpers.incomingCall(incomingSession);

  client.holdAndAnswerButton.trigger("click");
  ok(client.activeSession === incomingSession, "Incoming session should be active");
  client.hangup.trigger("click");
  ok(client.activeSession === outgoingSession, "Outgoing session should be active again");
  strictEqual(client.sessions.length, 1);
});

test('2nd incoming call and drop+answer click', function() {
  ClientConfig.enableAutoAnswer = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  var outgoingSession = TestWebrtc.Helpers.outgoingSession();
  TestWebrtc.Helpers.startCall(outgoingSession);
  var incomingSession = TestWebrtc.Helpers.incomingSession();
  incomingSession.answer = function(options){console.log("answer"); answerOptions = options; incomingSession.started('local');}
  TestWebrtc.Helpers.incomingCall(incomingSession);

  ok(client.activeSession === outgoingSession, "Outgoing session should be active");
  deepEqual(client.sessions.length, 2);
  client.dropAndAnswerButton.trigger("click");
  ok(client.activeSession === incomingSession, "Incoming session should be active");
  deepEqual(client.sessions.length, 1);
  notStrictEqual(answerOptions, "", "Answer should have been called");
});

test('call and hangup and incoming call', function() {
  ClientConfig.enableAutoAnswer = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.incomingCall();
  TestWebrtc.Helpers.isVisible(client.callPopup, true);
  strictEqual(client.dropAndAnswerButton.is(":visible"), false);
  strictEqual(client.holdAndAnswerButton.is(":visible"), false);
  strictEqual(client.acceptIncomingCall.is(":visible"), true);
});