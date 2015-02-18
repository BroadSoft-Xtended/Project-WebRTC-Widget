require('./includes/common');
describe('client', function() {

  beforeEach(function() {
    global.instances = {};
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

  it('validateDestination', function() {
    client = create(config);
    configuration.allowOutside = true;
    expect(callcontrol.validateDestination("1000")).toEqual("sip:1000@domain.to");
    expect(callcontrol.validateDestination("1000@webrtc")).toEqual("sip:1000@webrtc.domain.to");
    expect(callcontrol.validateDestination("1000@webrtc.domain.to")).toEqual("sip:1000@webrtc.domain.to");
    expect(callcontrol.validateDestination("1000@domain.to")).toEqual("sip:1000@domain.to");
  });
  it('validateDestination with allowOutside = false', function() {
    client = create(config);
    configuration.allowOutside = false;
    expect(callcontrol.validateDestination("1000")).toEqual(false);
    expect(callcontrol.validateDestination("1000@webrtc")).toEqual(false);
    expect(callcontrol.validateDestination("1000@webrtc.domain.to")).toEqual("sip:1000@webrtc.domain.to");
    expect(callcontrol.validateDestination("1000@domain.to")).toEqual("sip:1000@domain.to");
    expect(callcontrol.validateDestination("1000@anotherdomain.to")).toEqual(false);
  });
  it('resolution class for hd=true', function() {
    WebRTC.Utils.getSearchVariable = function(name) {
      return name === "hd" ? "true" : false;
    }
    client = create(config);
    expect(client.client.attr('class').split(" ")[1]).toEqual("r" + WebRTC.C.R_1280x720);
  });
  it('resolution class for resolution setting', function() {
    delete config.displayResolution;
    delete config.encodingResolution;
    WebRTC.Utils.getSearchVariable = function(name) {
      return name === "hd" ? "false" : false;
    }
    $.cookie("settingResolutionDisplay", WebRTC.C.R_960x720);
    $.cookie("settingResolutionEncoding", WebRTC.C.R_320x240);
    client = create(config);
    console.log('settings : '+settings.resolutionType);
    console.log('settings.getResolutionDisplay : '+settings.getResolutionDisplay());
    console.log('settingsview : '+settingsview.resolutionType.val());
    expect(client.client.attr('class').split(" ")[1]).toEqual("r" + WebRTC.C.R_960x720);
  });
  it('destination configuration and enableConnectLocalMedia = false', function() {
    var destinationCalled = '';
    config.destination = '12345';
    config.enableConnectLocalMedia = false;
    client = create(config);
    callcontrol.callUri = function(destination) {
      destinationCalled = destination;
    };
    testUA.connect();
    testUA.startCall();
    sipstack.ua.isConnected = function() {
      return true;
    };
    expect(destinationCalled).toEqual('12345');
    testUA.endCall();

    // trigger connect again to verify destination is only called once
    destinationCalled = '';
    testUA.connect();
    expect(destinationCalled).toEqual('');
    delete config.destination;
    config.enableConnectLocalMedia = true;
  });
  it('destination configuration and enableConnectLocalMedia = true', function() {
    var destinationCalled = '';
    config.destination = '12345';
    config.enableConnectLocalMedia = true;
    client = create(config);
    callcontrol.callUri = function(destination) {
      destinationCalled = destination;
    };
    testUA.connect();
    testUA.startCall();
    sipstack.ua.isConnected = function() {
      return true;
    };
    expect(destinationCalled).toEqual('12345');
    testUA.endCall();

    // trigger connect again to verify destination is only called once
    destinationCalled = '';
    testUA.connect();
    expect(destinationCalled).toEqual('');
    delete config.destination;
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
    client.destination.trigger(event);
    ok(called);
  });
  it('call and press enter on destination input', function() {
    var called = false;
    client = create(config);
    testUA.startCall();
    expect(sipstack.getCallState()).toEqual(WebRTC.SIPStack.C.STATE_STARTED);
    sipstack.call = function(destination) {
      console.log('call');
      called = true;
    };
    var event = jQuery.Event("keypress");
    event.keyCode = 13;
    client.destination.val("1000@domain.to");
    client.destination.trigger(event);
    ok(!called);
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
    client.destination.val("1000@domain.to");
    client.callButton.trigger("click");
    ok(called);
    called = false;
    client.callButton.trigger("click");
    ok(!called);
  });
  it('reInvite popup', function() {
    client = create(config);
    testUA.isVisible(client.reInvitePopup, false);
  });
  it('reInvite popup after incoming reInvite', function() {
    config.enableAutoAcceptReInvite = false;
    client = create(config);
    testUA.emitReInvite(client);
    testUA.isVisible(client.reInvitePopup, true);
  });
  it('reInvite popup after incoming reInvite and accept clicked', function() {
    config.enableAutoAcceptReInvite = false;
    client = create(config);
    testUA.emitReInvite(client);
    client.acceptReInviteCall.trigger("click");
    testUA.isVisible(client.reInvitePopup, false);
    ok(reInviteAccepted, "should have accepted the reInvite")
  });
  it('reInvite popup after incoming reInvite and reject clicked', function() {
    config.enableAutoAcceptReInvite = false;
    client = create(config);
    testUA.emitReInvite(client);
    client.rejectReInviteCall.trigger("click");
    testUA.isVisible(client.reInvitePopup, false);
    ok(reInviteRejected, "should have rejected the reInvite")
  });
  it('muteAudio', function() {
    client = create(config);
    testUA.isVisible(client.muteAudioIcon, false);
  });
  it('unmuteAudio', function() {
    client = create(config);
    testUA.isVisible(client.unmuteAudioIcon, false);
  });
  it('hangup', function() {
    client = create(config);
    testUA.isVisible(client.hangup, false);
  });
  it('muteAudio on call started', function() {
    client = create(config);
    testUA.startCall();
    testUA.isVisible(client.muteAudioIcon, true);
  });
  it('muteAudio on mute triggered', function() {
    client = create(config);
    testUA.startCall();
    client.muteAudioIcon.trigger("click");
    testUA.isVisible(client.muteAudioIcon, false);
    client.unmuteAudioIcon.trigger("click");
    testUA.isVisible(client.muteAudioIcon, true);
  });
  it('unmuteAudio on mute triggered', function() {
    client = create(config);
    testUA.startCall();
    client.muteAudioIcon.trigger("click");
    testUA.isVisible(client.unmuteAudioIcon, true);
    client.unmuteAudioIcon.trigger("click");
    testUA.isVisible(client.unmuteAudioIcon, false);
  });
  it('fullScreen icon', function() {
    config.enableFullScreen = true;
    client = create(config);
    testUA.isVisible(client.fullScreenExpandIcon, true);
    testUA.isVisible(client.fullScreenContractIcon, false);
  });
  it('fullScreen icon with enableFullScreen = false', function() {
    config.enableFullScreen = false;
    client = create(config);
    testUA.isVisible(client.fullScreenExpandIcon, false);
    testUA.isVisible(client.fullScreenContractIcon, false);
  });
  it('fullScreen icon after click', function() {
    config.enableFullScreen = true;
    client = create(config);
    client.fullScreenExpandIcon.trigger('click');
    testUA.isVisible(client.fullScreenExpandIcon, false);
    testUA.isVisible(client.fullScreenContractIcon, true);
    client.fullScreenContractIcon.trigger('click');
    testUA.isVisible(client.fullScreenExpandIcon, true);
    testUA.isVisible(client.fullScreenContractIcon, false);
  });
  it('selfView icon', function() {
    config.enableSelfView = true;
    client = create(config);
    testUA.isVisible(client.selfViewEnableIcon, false);
    testUA.isVisible(client.selfViewDisableIcon, true);
    testUA.isVisible(client.video.localHolder, true);
  });
  it('selfView icon with enableSelfView = false', function() {
    config.enableSelfView = false;
    client = create(config);
    testUA.isVisible(client.selfViewEnableIcon, false);
    testUA.isVisible(client.selfViewDisableIcon, false);
    testUA.isVisible(client.video.localHolder, false);
  });
  it('selfView icon after click', function() {
    config.enableSelfView = true;
    client = create(config);
    client.selfViewDisableIcon.trigger('click');
    testUA.isVisible(client.selfViewEnableIcon, true);
    testUA.isVisible(client.selfViewDisableIcon, false);
    testUA.isVisible(client.video.localHolder, false);
    client.selfViewEnableIcon.trigger('click');
    testUA.isVisible(client.selfViewEnableIcon, false);
    testUA.isVisible(client.selfViewDisableIcon, true);
    testUA.isVisible(client.video.localHolder, true);
  });
  it('dialpad icon', function() {
    config.enableDialpad = true;
    client = create(config);
    testUA.isVisible(client.dialpadShowIcon, true);
    testUA.isVisible(client.dialpadHideIcon, false);
    testUA.isVisible(client.dialpad, false);
  });
  it('dialpad icon with enableDialpad = false', function() {
    config.enableDialpad = false;
    client = create(config);
    testUA.isVisible(client.dialpadShowIcon, false);
    testUA.isVisible(client.dialpadHideIcon, false);
    testUA.isVisible(client.dialpad, false);
  });
  it('dialpad icon after click', function() {
    config.enableDialpad = true;
    client = create(config);
    client.dialpadShowIcon.trigger('click');
    testUA.isVisible(client.dialpadShowIcon, false);
    testUA.isVisible(client.dialpadHideIcon, true);
    testUA.isVisible(client.dialpad, true);
    client.dialpadHideIcon.trigger('click');
    testUA.isVisible(client.dialpadShowIcon, true);
    testUA.isVisible(client.dialpadHideIcon, false);
    testUA.isVisible(client.dialpad, false);
  });
  it('dialpad icon after click and in call', function() {
    config.enableDialpad = true;
    client = create(config);
    testUA.startCall();
    testUA.isVisible(client.hangup, true);
    client.dialpadShowIcon.trigger('click');
    testUA.isVisible(client.hangup, true);
    client.dialpadHideIcon.trigger('click');
    testUA.isVisible(client.hangup, true);
  });
  it('hangup on call started', function() {
    client = create(config);
    testUA.startCall();
    testUA.isVisible(client.hangup, true);
  });
  it('muteAudio on call started and disabled muted', function() {
    config.enableMute = false;
    client = create(config);
    testUA.startCall();
    testUA.isVisible(client.muteAudioIcon, false);
  });
  it('unmuteAudio on call started and disabled muted', function() {
    config.enableMute = false;
    client = create(config);
    testUA.startCall();
    testUA.isVisible(client.unmuteAudioIcon, false);
  });
  it('muteAudio on call ended', function() {
    client = create(config);
    testUA.startCall();
    testUA.endCall();
    testUA.isVisible(client.muteAudioIcon, false);
  });
  it('unmuteAudio on call ended', function() {
    client = create(config);
    testUA.startCall();
    client.muteAudioIcon.trigger("click");
    testUA.endCall();
    testUA.isVisible(client.unmuteAudioIcon, false);
  });
  it('hangup on call ended', function() {
    client = create(config);
    testUA.startCall();
    testUA.endCall();
    testUA.isVisible(client.hangup, false);
  });
  it('hangup on calling', function() {
    client = create(config);
    sipstack.ua.isConnected = function() {
      return true;
    }
    callcontrol.callUri("1000@webrtc.domain.to");
    testUA.newCall();
    expect(sipstack.getCallState()).toEqual("calling");
    testUA.isVisible(client.hangup, true);
    expect(client.callButton.css('opacity')).toEqual("0");
  });
  it('hangup on failed', function() {
    client = create(config);
    sipstack.ua.isConnected = function() {
      return true;
    }
    testUA.failCall();
    expect(sipstack.getCallState()).toEqual("connected");
    testUA.isVisible(client.hangup, false);
    expect(client.callButton.css('opacity')).toEqual("1");
  });
  it('getUserMedia failed', function() {
    var alertCalled = false;
    client = create(config);
    client.showErrorPopup = function() {
      alertCalled = true;
    }
    client.eventBus.on("calling", function(evt) {
      evt.sender.failed('local', null, ExSIP.C.causes.USER_DENIED_MEDIA_ACCESS);
    });
    testUA.connect();
    callcontrol.callUri("1000@webrtc.domain.to");
    expect(alertCalled).toEqual(true);
  });
  it('on disconnect', function() {
    config.enableMessages = true;
    client = create(config);
    testUA.disconnect();
    expect(messages.text().trim()).toEqual('Connection failed');
  });
  it('on invalid destination and connected', function() {
    var config = {};
    config.enableMessages = true;
    jQuery.extend(config, config);
    config.destination = '12345';
    config.allowOutside = false;
    client = create(config);
    testUA.connect();
    expect(messages.text().trim()).toEqual('Invalid Destination      Connected');
  });
  it('on disconnect for 503 with retryAfter', function() {
    config.enableMessages = true;
    client = create(config);
    testUA.disconnect({
      code: 503,
      reason: 'Service Unavailable',
      retryAfter: 30
    });
    expect(messages.text().trim()).toEqual('Service Unavailable - Retrying in 30 seconds');
  });
});