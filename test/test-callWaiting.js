require('./includes/common');
describe('call waiting', function() {

  before(function() {
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
    console.log('client.client : ', client.client.attr('class'));
    testUA.isVisible(incomingcall.view, true);
    expect(incomingcall.dropAndAnswerButton.css('display')).toEqual('none');
    expect(incomingcall.dropAndAnswerButton.is(":visible")).toEqual(false);
    expect(incomingcall.acceptIncomingCall.css('display')).toEqual('inline-block');
    expect(incomingcall.holdAndAnswerButton.css('display')).toEqual('none');
    expect(incomingcall.dropAndAnswerButton.is(":visible")).toEqual(false);
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
    testUA.isVisible(client.callPopup, true);
    session.failed('remote', null, ExSIP.C.causes.CANCELED);
    testUA.isVisible(client.callPopup, false);
  });

  it('1st incoming call with enableAutoAnswer', function() {
    config.enableAutoAnswer = true;
    client = create(config);   
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
    expect(client.incomingCallName.text()).toEqual("Incoming DisplayName");
    expect(client.incomingCallUser.text()).toEqual("Incoming User");
    testUA.isVisible(client.callPopup, true);
    expect(client.dropAndAnswerButton.is(":visible")).toEqual(true);
    expect(client.holdAndAnswerButton.is(":visible")).toEqual(true);
    expect(client.acceptIncomingCall.is(":visible")).toEqual(false);
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

    ok(sipstack.activeSession === outgoingSession, "Outgoing session should be active");
    deepEqual(sipstack.sessions.length, 2);
    client.holdAndAnswerButton.trigger("click");
    ok(sipstack.activeSession === incomingSession, "Incoming session should be active");
    deepEqual(sipstack.sessions.length, 2);
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

    client.holdAndAnswerButton.trigger("click");
    ok(sipstack.activeSession === incomingSession, "Incoming session should be active");
    client.hangup.trigger("click");
    ok(sipstack.activeSession === outgoingSession, "Outgoing session should be active again");
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

    ok(sipstack.activeSession === outgoingSession, "Outgoing session should be active");
    deepEqual(sipstack.sessions.length, 2);
    client.dropAndAnswerButton.trigger("click");
    ok(sipstack.activeSession === incomingSession, "Incoming session should be active");
    deepEqual(sipstack.sessions.length, 1);
    expect(answerOptions).toNotEqual("", "Answer should have been called");
  });

  it('call and hangup and incoming call', function() {
    config.enableAutoAnswer = false;
    client = create(config);   
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