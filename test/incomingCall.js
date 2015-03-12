require('./includes/common');
describe('incoming call', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    config = {};
  });

  it('window.onbeforeunload', function() {
    client = create(config)
    testUA.connect();
    var session = testUA.incomingSession();
    var terminated = false;
    session.terminate = function(options) {
      terminated = true;
    }
    testUA.incomingCall(session);
    window.onbeforeunload();
    expect(terminated).toEqual(true, "Should terminate the incoming session");
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
    expect(incomingcallview.incomingCallName.text()).toEqual("Incoming DisplayName");
    expect(incomingcallview.incomingCallUser.text()).toEqual("Incoming User");
    expect(incomingcallview.visible).toEqual(true);
    testUA.isVisible(incomingcallview.view, true);
    testUA.isVisible(incomingcallview.dropAndAnswerButton, false);
    testUA.isVisible(incomingcallview.holdAndAnswerButton, false);
    testUA.isVisible(incomingcallview.acceptIncomingCall, true);
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
    testUA.isVisible(incomingcallview.view, true);
    session.failed('remote', null, ExSIP.C.causes.CANCELED);
    testUA.isVisible(incomingcallview.view, false);
  });

  it('1st incoming call with enableAutoAnswer', function() {
    config.enableAutoAnswer = true;
    client = create(config);   
    expect(incomingcallview.attached).toEqual(false);
    testUA.connect();
    var session = testUA.incomingSession();
    var answerOptions = "";
    session.answer = function(options) {
      console.log("answer");
      answerOptions = options;
    }
    expect(incomingcallview.attached).toEqual(false);
    testUA.incomingCall(session);
    expect(answerOptions).toNotEqual("", "Answer should have been called");
    expect(incomingcallview.attached).toEqual(false);
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
    expect(incomingcallview.incomingCallName.text()).toEqual("Incoming DisplayName");
    expect(incomingcallview.incomingCallUser.text()).toEqual("Incoming User");
    testUA.isVisible(incomingcallview.view, true);
    testUA.isVisible(incomingcallview.dropAndAnswerButton, true);
    testUA.isVisible(incomingcallview.holdAndAnswerButton, true);
    testUA.isVisible(incomingcallview.acceptIncomingCall, false);
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
    incomingcallview.holdAndAnswerButton.trigger("click");
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

    incomingcallview.holdAndAnswerButton.trigger("click");
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
    incomingcallview.dropAndAnswerButton.trigger("click");
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
    testUA.isVisible(incomingcallview.view, true);
    testUA.isVisible(incomingcallview.acceptIncomingCall, true);
    testUA.isVisible(incomingcallview.dropAndAnswerButton, false);
    testUA.isVisible(incomingcallview.holdAndAnswerButton, false);
  });
  
});