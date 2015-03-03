require('./includes/common');
describe('transfer', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    config = {
      domainTo: "domain.to",
      domainFrom: "domain.from",
      enableTransfer: true,
      enableCallStats: false
    };
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {
      console.log("enableLocalAudio : " + enable);
    }
  });

  it('transfer', function() {
    client = create(config)
    testUA.isVisible(videobar.transfer, false);
  });
  it('transferPopup', function() {
    client = create(config)
    expect(transferview.attached).toEqual(false);
  });
  it('transfer on call started with enableTransfer is false', function() {
    config.enableTransfer = false;
    client = create(config)
    testUA.startCall();
    testUA.isVisible(videobar.transfer, false);
  });
  it('transfer on call started', function() {
    client = create(config)
    testUA.startCall();
    testUA.isVisible(videobar.transfer, true);
  });
  it('transferPopup on transfer triggered', function() {
    client = create(config)
    testUA.startCall();
    videobar.transfer.trigger("click");
    testUA.isVisible(transferview.view, true);
    videobar.transfer.trigger("click");
    testUA.isVisible(transferview.view, false);
  });
  it('transferPopup on transfer rejected', function() {
    client = create(config)
    testUA.startCall();
    videobar.transfer.trigger("click");
    testUA.isVisible(transferview.view, true);
    transferview.reject.trigger("click");
    testUA.isVisible(transferview.view, false);
  });
  it('transferPopup on call started', function() {
    client = create(config)
    testUA.startCall();
    expect(transferview.attached).toEqual(false);
  });
  it('transfer on call ended', function() {
    client = create(config)
    testUA.startCall();
    testUA.endCall();
    testUA.isVisible(videobar.transfer, false);
  });
  it('hold call and invite target', function() {
    config.enableAutoAnswer = false;
    client = create(config)
    testUA.connect();
    var sessionToTransfer = testUA.outgoingSession({
      id: "sessionToTransfer"
    });
    testUA.startCall(sessionToTransfer);
    expect(sipstack.activeSession.id).toEqual(sessionToTransfer.id);
    sessionToTransfer.hold();
    var targetSession = testUA.outgoingSession({
      id: "targetSession"
    });
    testUA.startCall(targetSession);
    expect(sipstack.activeSession.id).toEqual(targetSession.id);
    testUA.isVisible(videobar.hangup, true);
  });

  it('hold call and invite target failed', function() {
    config.enableAutoAnswer = false;
    client = create(config)
    testUA.connect();
    var sessionToTransfer = testUA.outgoingSession({
      id: "sessionToTransfer"
    });
    testUA.startCall(sessionToTransfer);
    sessionToTransfer.hold();
    var targetSession = testUA.outgoingSession({
      id: "targetSession"
    });
    testUA.failCall(targetSession);
    expect(sipstack.activeSession.id).toEqual(sessionToTransfer.id);
    testUA.isVisible(videobar.hangup, true);
  });
  it('acceptTransfer triggered with empty target', function() {
    var transferTarget = null;
    client = create(config)
    ExSIP.UA.prototype.transfer = function(target, rtcSession) {
      console.log('transfer');
      transferTarget = target;
    };
    testUA.startCall();
    videobar.transfer.trigger("click");
    testUA.isVisible(transferview.view, true);
    transferview.accept.trigger("click");
    testUA.isVisible(transferview.view, true);
    expect(transferTarget).toEqual(null);
  });
  it('acceptTransfer triggered with target', function() {
    var transferTarget = null;
    client = create(config)
    ExSIP.UA.prototype.transfer = function(target, rtcSession) {
      console.log('transfer');
      transferTarget = target;
    };
    testUA.startCall();
    videobar.transfer.trigger("click");
    testUA.isVisible(transferview.view, true);
    transferview.target.val("1000@other.domain.to");
    transferview.accept.trigger("click");
    testUA.isVisible(transferview.view, false);
    expect(transferTarget).toEqual("sip:1000@other.domain.to");
  });
  it('acceptTransfer triggered with target and with attended checked', function() {
    var basicTransferTarget = null;
    var attendedTransferTarget = null;
    client = create(config)
    ExSIP.UA.prototype.transfer = function(target, rtcSession) {
      console.log('basic transfer');
      basicTransferTarget = target;
    };
    ExSIP.UA.prototype.attendedTransfer = function(target, rtcSession) {
      console.log('attended transfer');
      attendedTransferTarget = target;
    };
    testUA.startCall();
    videobar.transfer.trigger("click");
    transferview.typeAttended.prop('checked', true);
    transferview.target.val("1000@other.domain.to");
    transferview.accept.trigger("click");
    expect(attendedTransferTarget).toEqual("sip:1000@other.domain.to");
  });
});