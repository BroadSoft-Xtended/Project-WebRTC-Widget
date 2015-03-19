require('./includes/common');
describe('callcontrol', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    config = {};
    config.domainTo = "domain.to";
    config.domainFrom = "domain.from";
    config.enableMute = true;
    config.enableTransfer = true;
    config.enableCallStats = false;
    config.enableCallControl = true;
    config.enableHD = true;
  });

  it('call if enter pressed on destination input', function() {
    var called = false;
    client = create(config);
    testUA.connect();
    sipstack.ua.isConnected = function() {
      return true;
    };
    callcontrol.callUri = function() {
      called = true;
    };
    var event = Utils.createEvent("keypress");
    event.keyCode = 13;
    callcontrolview.destination.trigger(event);
    expect(called).toExist();
  });
  it('call and press enter on destination input', function() {
    var called = false;
    client = create(config);
    testUA.connectAndStartCall();
    expect(sipstack.getCallState()).toEqual(Constants.STATE_STARTED);
    sipstack.call = function(destination) {
      called = true;
    };
    var event = Utils.createEvent("keypress");
    event.keyCode = 13;
    callcontrolview.destination.val("1000@domain.to");
    callcontrolview.destination.trigger(event);
    expect(!called).toExist();
  });
  it('click callButton twice', function() {
    var called = false;
    client = create(config);
    testUA.connect();

    sipstack.ua.call = function(destination) {
      called = true;
      var session = testUA.outgoingSession();
      sipstack.ua.emit('newRTCSession', sipstack.ua, {
        session: session
      });
      return session;
    };
    callcontrolview.destination.val("1000@domain.to");
    callcontrolview.call.trigger("click");
    expect(called).toExist();
    called = false;
    callcontrolview.call.trigger("click");
    expect(!called).toExist();
  });
  it('destination:', function() {
    configuration.enableConnectLocalMedia = true;
    configuration.domainTo = "domain.to";
    configuration.allowOutside = true;
    location.search = '?destination=8323303810';
    sipstack.init();
    var calledDestination = '';
    sipstack.call = function(destination){calledDestination = destination;};
    sipstack.ua.getUserMedia = function(options, success, failure, force){success();};

    testUA.connect();
    expect(calledDestination).toEqual( "sip:8323303810@domain.to");
  });
  it('WEBRTC-35 : destination with dtmf tones:', function() {
    configuration.enableConnectLocalMedia = true;
    configuration.domainTo = "domain.to";
    configuration.allowOutside = true;
    location.search = '?destination=8323303810,,123132';
    sipstack.init();
    var calledDestination = '', sentTones = '';
    sipstack.call = function(destination){calledDestination = destination;};
    sipstack.sendDTMF = function(tones){sentTones = tones;};
    sipstack.ua.getUserMedia = function(options, success, failure, force){success();};

    testUA.connect();
    expect(calledDestination).toEqual( "sip:8323303810@domain.to");

    var session = testUA.startCall();
    expect(sentTones).toEqual(",,123132");

    sentTones = '';

    testUA.reconnectCall(session);
    expect(sentTones).toEqual("", "Should NOT send the dtmf again");
  });
  it('WEBRTC-35 : destination with dtmf tones and #', function() {
    configuration.enableConnectLocalMedia = true;
    configuration.domainTo = "domain.to";
    configuration.allowOutside = true;
    location.search = '?destination=8323303810,,123132#';
    sipstack.init();
    var calledDestination = '', sentTones = '';
    sipstack.call = function(destination){calledDestination = destination;};
    sipstack.sendDTMF = function(tones){sentTones = tones;};
    sipstack.ua.getUserMedia = function(options, success, failure, force){success();};

    testUA.connect();
    expect(calledDestination).toEqual( "sip:8323303810@domain.to");

    testUA.startCall();
    expect(sentTones).toEqual(",,123132#");
  });
  it('WEBRTC-35 : destination with dtmf tones and domain', function() {
    configuration.enableConnectLocalMedia = true;
    configuration.domainTo = "domain.to";
    configuration.allowOutside = true;
    location.search = '?destination=8323303810,,123132@some.domain';
    sipstack.init();
    var calledDestination = '', sentTones = '';
    sipstack.call = function(destination){calledDestination = destination;};
    sipstack.sendDTMF = function(tones){sentTones = tones;};
    sipstack.ua.getUserMedia = function(options, success, failure, force){success();};

    testUA.connect();
    expect(calledDestination).toEqual( "sip:8323303810@some.domain");

    testUA.startCall();
    expect(sentTones).toEqual(",,123132");
  });
});