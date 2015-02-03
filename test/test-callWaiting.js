require('./includes/common');
describe('call waiting', function() {

  before(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    ClientConfig.domainTo = "domain.to";
    ClientConfig.domainFrom = "domain.from";
    ClientConfig.enableTransfer = true;
    ClientConfig.enableCallStats = false;
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {
      console.log("enableLocalAudio : " + enable);
    }
  });

  it('1st incoming call', function() {
    ClientConfig.enableAutoAnswer = false;
    client = new WebRTC.Client(ClientConfig, '#testWrapper');
    testUA.connect();
    var session = testUA.incomingSession();
    var answerOptions = "";
    session.answer = function(options) {
      console.log("answer");
      answerOptions = options;
    }
    testUA.incomingCall(session);
    expect(answerOptions).toEqual("", "Answer should not have been called");
    expect(client.incomingCallName.text()).toEqual("Incoming DisplayName");
    expect(client.incomingCallUser.text()).toEqual("Incoming User");
    testUA.isVisible(client.callPopup, true);
    expect(client.dropAndAnswerButton.is(":visible")).toEqual(false);
    expect(client.holdAndAnswerButton.is(":visible")).toEqual(false);
    expect(client.acceptIncomingCall.is(":visible")).toEqual(true);
  });

  it('incoming call and cancel', function() {
    ClientConfig.enableAutoAnswer = false;
    client = new WebRTC.Client(ClientConfig, '#testWrapper');
    testUA.connect();
    var session = testUA.incomingSession();
    var answerOptions = "";
    session.answer = function(options) {
      console.log("answer");
      answerOptions = options;
    }
    testUA.incomingCall(session);
    expect(answerOptions).toEqual("", "Answer should NOT have been called");
    testUA.isVisible(client.callPopup, true);
    session.failed('remote', null, ExSIP.C.causes.CANCELED);
    testUA.isVisible(client.callPopup, false);
  });

  it('1st incoming call with enableAutoAnswer', function() {
    ClientConfig.enableAutoAnswer = true;
    client = new WebRTC.Client(ClientConfig, '#testWrapper');
    client.settings.settingAutoAnswer.prop('checked', true);
    testUA.connect();
    var session = testUA.incomingSession();
    var answerOptions = "";
    session.answer = function(options) {
      console.log("answer");
      answerOptions = options;
    }
    testUA.incomingCall(session);
    expect(answerOptions).toNotEqual("", "Answer should have been called");
    testUA.isVisible(client.callPopup, false, 'should not show call popup');
  });

  it('2nd incoming call with enableAutoAnswer', function() {
    ClientConfig.enableAutoAnswer = true;
    client = new WebRTC.Client(ClientConfig, '#testWrapper');
    testUA.connect();
    testUA.startCall();
    var session = testUA.incomingSession();
    var answerOptions = "";
    session.answer = function(options) {
      console.log("answer");
      answerOptions = options;
    }
    testUA.incomingCall(session);
    expect(answerOptions).toEqual("", "Answer should not have been called");
    expect(client.incomingCallName.text()).toEqual("Incoming DisplayName");
    expect(client.incomingCallUser.text()).toEqual("Incoming User");
    testUA.isVisible(client.callPopup, true);
    expect(client.dropAndAnswerButton.is(":visible")).toEqual(true);
    expect(client.holdAndAnswerButton.is(":visible")).toEqual(true);
    expect(client.acceptIncomingCall.is(":visible")).toEqual(false);
  });

  it('2nd incoming call and hold+answer click', function() {
    ClientConfig.enableAutoAnswer = true;
    client = new WebRTC.Client(ClientConfig, '#testWrapper');
    testUA.connect();
    var outgoingSession = testUA.outgoingSession();
    testUA.startCall(outgoingSession);
    var incomingSession = testUA.incomingSession();
    var answerOptions = "";
    incomingSession.answer = function(options) {
      console.log("answer");
      answerOptions = options;
      incomingSession.started('local');
    }
    testUA.incomingCall(incomingSession);

    ok(client.sipStack.activeSession === outgoingSession, "Outgoing session should be active");
    deepEqual(client.sipStack.sessions.length, 2);
    client.holdAndAnswerButton.trigger("click");
    ok(client.sipStack.activeSession === incomingSession, "Incoming session should be active");
    deepEqual(client.sipStack.sessions.length, 2);
    expect(answerOptions).toNotEqual("", "Answer should have been called");
  });

  it('2nd incoming call and hold+answer click and resume 1st call after 2nd ends', function() {
    ClientConfig.enableAutoAnswer = true;
    client = new WebRTC.Client(ClientConfig, '#testWrapper');
    testUA.connect();
    var outgoingSession = testUA.outgoingSession();
    testUA.startCall(outgoingSession);
    var incomingSession = testUA.incomingSession();
    testUA.incomingCall(incomingSession);

    client.holdAndAnswerButton.trigger("click");
    ok(client.sipStack.activeSession === incomingSession, "Incoming session should be active");
    client.hangup.trigger("click");
    ok(client.sipStack.activeSession === outgoingSession, "Outgoing session should be active again");
    expect(client.sipStack.sessions.length).toEqual(1);
  });

  it('2nd incoming call and drop+answer click', function() {
    ClientConfig.enableAutoAnswer = true;
    client = new WebRTC.Client(ClientConfig, '#testWrapper');
    testUA.connect();
    var outgoingSession = testUA.outgoingSession();
    testUA.startCall(outgoingSession);
    var incomingSession = testUA.incomingSession();
    incomingSession.answer = function(options) {
      console.log("answer");
      answerOptions = options;
      incomingSession.started('local');
    }
    testUA.incomingCall(incomingSession);

    ok(client.sipStack.activeSession === outgoingSession, "Outgoing session should be active");
    deepEqual(client.sipStack.sessions.length, 2);
    client.dropAndAnswerButton.trigger("click");
    ok(client.sipStack.activeSession === incomingSession, "Incoming session should be active");
    deepEqual(client.sipStack.sessions.length, 1);
    expect(answerOptions).toNotEqual("", "Answer should have been called");
  });

  it('call and hangup and incoming call', function() {
    ClientConfig.enableAutoAnswer = false;
    client = new WebRTC.Client(ClientConfig, '#testWrapper');
    testUA.connect();
    testUA.startCall();
    testUA.endCall();
    testUA.incomingCall();
    testUA.isVisible(client.callPopup, true);
    expect(client.dropAndAnswerButton.is(":visible")).toEqual(false);
    expect(client.holdAndAnswerButton.is(":visible")).toEqual(false);
    expect(client.acceptIncomingCall.is(":visible")).toEqual(true);
  });
});