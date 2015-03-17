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

});