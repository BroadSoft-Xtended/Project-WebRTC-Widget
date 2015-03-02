require('./includes/common');
describe('callcontrol', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    config = {};
    config.domainTo = "domain.to";
    config.domainFrom = "domain.from";
    config.enableMute = true;
    config.enableTransfer = true;
    config.enableCallStats = false;
    config.enableCallControl = true;
    config.enableHD = true;
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {
      console.log("enableLocalAudio : " + enable);
    }
  });

  it('call if enter pressed on destination input', function() {
    var called = false;
    client = create(config);
    testUA.connect();
    sipstack.ua.isConnected = function() {
      return true;
    };
    callcontrol.callUri = function() {
      console.log('call');
      called = true;
    };
    var event = jQuery.Event("keypress");
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
      console.log('call');
      called = true;
    };
    var event = jQuery.Event("keypress");
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
      console.log('call');
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