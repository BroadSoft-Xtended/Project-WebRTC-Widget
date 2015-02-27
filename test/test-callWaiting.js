require('./includes/common');
describe('call waiting', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    config = {domainTo: 'domain.to', domainFrom: 'domain.from', enabledTransfer: true, enableCallStats: false};
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {
      console.log("enableLocalAudio : " + enable);
    }
  });

  it('1st incoming call:', function() {
    config.enableAutoAnswer = false;
    client = create(config);   
    testUA.connect();
    var session = testUA.incomingSession();
    var answerOptions = "";
    session.answer = function(options) {
      console.log("answer");
      answerOptions = options;
    }
    testUA.incomingCall(session);
    expect(answerOptions).toEqual("", "Answer should not have been called");
    expect(incomingcall.incomingCallName.text()).toEqual("Incoming DisplayName");
    expect(incomingcall.incomingCallUser.text()).toEqual("Incoming User");
    expect(incomingcall.visible).toEqual(true);
    testUA.isVisible(incomingcall.view, true);
    testUA.isVisible(incomingcall.dropAndAnswerButton, false);
    testUA.isVisible(incomingcall.holdAndAnswerButton, false);
    testUA.isVisible(incomingcall.acceptIncomingCall, true);
  });

  it('incoming call and cancel', function() {
    config.enableAutoAnswer = false;
    client = create(config);   
    testUA.connect();
    var session = testUA.incomingSession();
    var answerOptions = "";
    session.answer = function(options) {
      console.log("answer");
      answerOptions = options;
    }
    testUA.incomingCall(session);
    expect(answerOptions).toEqual("", "Answer should NOT have been called");
    testUA.isVisible(incomingcall.view, true);
    session.failed('remote', null, ExSIP.C.causes.CANCELED);
    testUA.isVisible(incomingcall.view, false);
  });

  it('1st incoming call with enableAutoAnswer', function() {
    config.enableAutoAnswer = true;
    client = create(config);   
    expect(incomingcall.attached).toEqual(false);
    testUA.connect();
    var session = testUA.incomingSession();
    var answerOptions = "";
    session.answer = function(options) {
      console.log("answer");
      answerOptions = options;
    }
    expect(incomingcall.attached).toEqual(false);
    testUA.incomingCall(session);
    expect(answerOptions).toNotEqual("", "Answer should have been called");
    expect(incomingcall.attached).toEqual(false);
  });

  it('2nd incoming call with enableAutoAnswer', function() {
    config.enableAutoAnswer = true;
    client = create(config);   
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
    expect(incomingcall.incomingCallName.text()).toEqual("Incoming DisplayName");
    expect(incomingcall.incomingCallUser.text()).toEqual("Incoming User");
    testUA.isVisible(incomingcall.view, true);
    testUA.isVisible(incomingcall.dropAndAnswerButton, true);
    testUA.isVisible(incomingcall.holdAndAnswerButton, true);
    testUA.isVisible(incomingcall.acceptIncomingCall, false);
  });

  it('2nd incoming call and hold+answer click', function() {
    config.enableAutoAnswer = true;
    client = create(config);   
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

    expect(sipstack.activeSession === outgoingSession).toEqual(true, "Outgoing session should be active");
    expect(sipstack.sessions.length).toEqual( 2);
    incomingcall.holdAndAnswerButton.trigger("click");
    expect(sipstack.activeSession === incomingSession).toEqual(true, "Incoming session should be active");
    expect(sipstack.sessions.length).toEqual( 2);
    expect(answerOptions).toNotEqual("", "Answer should have been called");
  });

  it('2nd incoming call and hold+answer click and resume 1st call after 2nd ends', function() {
    config.enableAutoAnswer = true;
    client = create(config);   
    testUA.connect();
    var outgoingSession = testUA.outgoingSession();
    testUA.startCall(outgoingSession);
    var incomingSession = testUA.incomingSession();
    testUA.incomingCall(incomingSession);

    incomingcall.holdAndAnswerButton.trigger("click");
    expect(sipstack.activeSession === incomingSession).toEqual(true, "Incoming session should be active");
    videobar.hangup.trigger("click");
    expect(sipstack.activeSession === outgoingSession).toEqual(true, "Outgoing session should be active again");
    expect(sipstack.sessions.length).toEqual(1);
  });

  it('2nd incoming call and drop+answer click', function() {
    config.enableAutoAnswer = true;
    client = create(config);   
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

    expect(sipstack.activeSession === outgoingSession).toEqual(true, "Outgoing session should be active");
    expect(sipstack.sessions.length).toEqual( 2);
    incomingcall.dropAndAnswerButton.trigger("click");
    expect(sipstack.activeSession === incomingSession).toEqual(true, "Incoming session should be active");
    expect(sipstack.sessions.length).toEqual( 1);
    expect(answerOptions).toNotEqual("", "Answer should have been called");
  });

  it('call and hangup and incoming call', function() {
    config.enableAutoAnswer = false;
    client = create(config);   
    testUA.connect();
    testUA.startCall();
    testUA.endCall();
    testUA.incomingCall();
    testUA.isVisible(incomingcall.view, true);
    testUA.isVisible(incomingcall.acceptIncomingCall, true);
    testUA.isVisible(incomingcall.dropAndAnswerButton, false);
    testUA.isVisible(incomingcall.holdAndAnswerButton, false);
  });
});