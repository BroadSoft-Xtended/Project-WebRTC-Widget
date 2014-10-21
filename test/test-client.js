module( "Client", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.mockSound();
    ClientConfig.domainTo = "domain.to";
    ClientConfig.domainFrom = "domain.from";
    ClientConfig.enableMute = true;
    ClientConfig.enableTransfer = true;
    ClientConfig.enableCallStats = false;
    ClientConfig.enableCallControl = true;
    ClientConfig.enableHD = true;
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {console.log("enableLocalAudio : "+enable);}
  }, teardown: function() {
  }
});

test('validateDestination', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  client.configuration.allowOutside = true;
  strictEqual(client.validateDestination("1000"), "sip:1000@domain.to");
  strictEqual(client.validateDestination("1000@webrtc"), "sip:1000@webrtc.domain.to");
  strictEqual(client.validateDestination("1000@webrtc.domain.to"), "sip:1000@webrtc.domain.to");
  strictEqual(client.validateDestination("1000@domain.to"), "sip:1000@domain.to");
});
test('validateDestination with allowOutside = false', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  client.configuration.allowOutside = false;
  strictEqual(client.validateDestination("1000"), false);
  strictEqual(client.validateDestination("1000@webrtc"), false);
  strictEqual(client.validateDestination("1000@webrtc.domain.to"), "sip:1000@webrtc.domain.to");
  strictEqual(client.validateDestination("1000@domain.to"), "sip:1000@domain.to");
  strictEqual(client.validateDestination("1000@anotherdomain.to"), false);
});
test('resolution class for hd=true', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "hd" ? "true" : false;}
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  strictEqual(client.client.attr('class').split(" ")[1], "r"+WebRTC.C.R_1280x720);
});
test('resolution class for resolution setting', function() {
  delete ClientConfig.displayResolution;
  delete ClientConfig.encodingResolution;
  WebRTC.Utils.getSearchVariable = function(name){ return name === "hd" ? "false" : false;}
  $.cookie("settingResolutionDisplay", WebRTC.C.R_960x720);
  $.cookie("settingResolutionEncoding", WebRTC.C.R_320x240);
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  strictEqual(client.client.attr('class').split(" ")[1], "r"+WebRTC.C.R_960x720);
});
test('destination configuration and enableConnectLocalMedia = false', function() {
  var destinationCalled = '';
  ClientConfig.destination = '12345';
  ClientConfig.enableConnectLocalMedia = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  client.callUri = function(destination){destinationCalled = destination;};
  TestWebrtc.Helpers.connect();
  TestWebrtc.Helpers.startCall();
  client.sipStack.ua.isConnected = function(){return true;};
  strictEqual(destinationCalled, '12345');
  TestWebrtc.Helpers.endCall();

  // trigger connect again to verify destination is only called once
  destinationCalled = '';
  TestWebrtc.Helpers.connect();
  strictEqual(destinationCalled, '');
  delete ClientConfig.destination;
  ClientConfig.enableConnectLocalMedia = true;
});
test('destination configuration and enableConnectLocalMedia = true', function() {
  var destinationCalled = '';
  ClientConfig.destination = '12345';
  ClientConfig.enableConnectLocalMedia = true;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  client.callUri = function(destination){destinationCalled = destination;};
  TestWebrtc.Helpers.connect();
  TestWebrtc.Helpers.startCall();
  client.sipStack.ua.isConnected = function(){return true;};
  strictEqual(destinationCalled, '12345');
  TestWebrtc.Helpers.endCall();

  // trigger connect again to verify destination is only called once
  destinationCalled = '';
  TestWebrtc.Helpers.connect();
  strictEqual(destinationCalled, '');
  delete ClientConfig.destination;
});
test('call if enter pressed on destination input', function() {
  var called = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.connect();
  client.sipStack.ua.isConnected = function(){return true;};
  client.callUri = function(){console.log('call');called = true;};
  var event = jQuery.Event("keypress");
  event.keyCode = 13;
  client.destination.trigger(event);
  ok(called);
});
test('call and press enter on destination input', function() {
  var called = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.startCall();
  strictEqual(client.sipStack.getCallState(), WebRTC.SIPStack.C.STATE_STARTED);
  client.sipStack.call = function(destination){console.log('call');called = true;};
  var event = jQuery.Event("keypress");
  event.keyCode = 13;
  client.destination.val("1000@domain.to");
  client.destination.trigger(event);
  ok(!called);
});
test('click callButton twice', function() {
  var called = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.connect();

  client.sipStack.ua.call = function(destination){
    console.log('call');
    called = true;
    var session = TestWebrtc.Helpers.outgoingSession();
    client.sipStack.ua.emit('newRTCSession', client.sipStack.ua, {session: session});
    return session;
  };
  client.destination.val("1000@domain.to");
  client.callButton.trigger("click");
  ok(called);
  called = false;
  client.callButton.trigger("click");
  ok(!called);
});
test('reInvite popup', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.reInvitePopup, false);
});
test('reInvite popup after incoming reInvite', function() {
  ClientConfig.enableAutoAcceptReInvite = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.emitReInvite(client);
  TestWebrtc.Helpers.isVisible(client.reInvitePopup, true);
});
test('reInvite popup after incoming reInvite and accept clicked', function() {
  ClientConfig.enableAutoAcceptReInvite = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.emitReInvite(client);
  client.acceptReInviteCall.trigger("click");
  TestWebrtc.Helpers.isVisible(client.reInvitePopup, false);
  ok(reInviteAccepted, "should have accepted the reInvite")
});
test('reInvite popup after incoming reInvite and reject clicked', function() {
  ClientConfig.enableAutoAcceptReInvite = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.emitReInvite(client);
  client.rejectReInviteCall.trigger("click");
  TestWebrtc.Helpers.isVisible(client.reInvitePopup, false);
  ok(reInviteRejected, "should have rejected the reInvite")
});
test('muteAudio', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.muteAudioIcon, false);
});
test('unmuteAudio', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.unmuteAudioIcon, false);
});
test('hangup', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.hangup, false);
});
test('muteAudio on call started', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.muteAudioIcon, true);
});
test('muteAudio on mute triggered', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.startCall();
  client.muteAudioIcon.trigger("click");
  TestWebrtc.Helpers.isVisible(client.muteAudioIcon, false);
  client.unmuteAudioIcon.trigger("click");
  TestWebrtc.Helpers.isVisible(client.muteAudioIcon, true);
});
test('unmuteAudio on mute triggered', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.startCall();
  client.muteAudioIcon.trigger("click");
  TestWebrtc.Helpers.isVisible(client.unmuteAudioIcon, true);
  client.unmuteAudioIcon.trigger("click");
  TestWebrtc.Helpers.isVisible(client.unmuteAudioIcon, false);
});
test('fullScreen icon', function() {
  ClientConfig.enableFullScreen = true;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.fullScreenExpandIcon, true);
  TestWebrtc.Helpers.isVisible(client.fullScreenContractIcon, false);
});
test('fullScreen icon with enableFullScreen = false', function() {
  ClientConfig.enableFullScreen = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.fullScreenExpandIcon, false);
  TestWebrtc.Helpers.isVisible(client.fullScreenContractIcon, false);
});
test('fullScreen icon after click', function() {
  ClientConfig.enableFullScreen = true;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  client.fullScreenExpandIcon.trigger('click');
  TestWebrtc.Helpers.isVisible(client.fullScreenExpandIcon, false);
  TestWebrtc.Helpers.isVisible(client.fullScreenContractIcon, true);
  client.fullScreenContractIcon.trigger('click');
  TestWebrtc.Helpers.isVisible(client.fullScreenExpandIcon, true);
  TestWebrtc.Helpers.isVisible(client.fullScreenContractIcon, false);
});
test('selfView icon', function() {
  ClientConfig.enableSelfView = true;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.selfViewEnableIcon, false);
  TestWebrtc.Helpers.isVisible(client.selfViewDisableIcon, true);
  TestWebrtc.Helpers.isVisible(client.video.local, true);
});
test('selfView icon with enableSelfView = false', function() {
  ClientConfig.enableSelfView = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.selfViewEnableIcon, false);
  TestWebrtc.Helpers.isVisible(client.selfViewDisableIcon, false);
  TestWebrtc.Helpers.isVisible(client.video.local, false);
});
test('selfView icon after click', function() {
  ClientConfig.enableSelfView = true;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  client.selfViewDisableIcon.trigger('click');
  TestWebrtc.Helpers.isVisible(client.selfViewEnableIcon, true);
  TestWebrtc.Helpers.isVisible(client.selfViewDisableIcon, false);
  TestWebrtc.Helpers.isVisible(client.video.local, false);
  client.selfViewEnableIcon.trigger('click');
  TestWebrtc.Helpers.isVisible(client.selfViewEnableIcon, false);
  TestWebrtc.Helpers.isVisible(client.selfViewDisableIcon, true);
  TestWebrtc.Helpers.isVisible(client.video.local, true);
});
test('dialpad icon', function() {
  ClientConfig.enableDialpad = true;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.dialpadShowIcon, true);
  TestWebrtc.Helpers.isVisible(client.dialpadHideIcon, false);
  TestWebrtc.Helpers.isVisible(client.dialpad, false);
});
test('dialpad icon with enableDialpad = false', function() {
  ClientConfig.enableDialpad = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.isVisible(client.dialpadShowIcon, false);
  TestWebrtc.Helpers.isVisible(client.dialpadHideIcon, false);
  TestWebrtc.Helpers.isVisible(client.dialpad, false);
});
test('dialpad icon after click', function() {
  ClientConfig.enableDialpad = true;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  client.dialpadShowIcon.trigger('click');
  TestWebrtc.Helpers.isVisible(client.dialpadShowIcon, false);
  TestWebrtc.Helpers.isVisible(client.dialpadHideIcon, true);
  TestWebrtc.Helpers.isVisible(client.dialpad, true);
  client.dialpadHideIcon.trigger('click');
  TestWebrtc.Helpers.isVisible(client.dialpadShowIcon, true);
  TestWebrtc.Helpers.isVisible(client.dialpadHideIcon, false);
  TestWebrtc.Helpers.isVisible(client.dialpad, false);
});
test('dialpad icon after click and in call', function() {
  ClientConfig.enableDialpad = true;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.hangup, true);
  client.dialpadShowIcon.trigger('click');
  TestWebrtc.Helpers.isVisible(client.hangup, true);
  client.dialpadHideIcon.trigger('click');
  TestWebrtc.Helpers.isVisible(client.hangup, true);
});
test('hangup on call started', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.hangup, true);
});
test('muteAudio on call started and disabled muted', function() {
  ClientConfig.enableMute = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.muteAudioIcon, false);
});
test('unmuteAudio on call started and disabled muted', function() {
  ClientConfig.enableMute = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.unmuteAudioIcon, false);
});
test('muteAudio on call ended', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.muteAudioIcon, false);
});
test('unmuteAudio on call ended', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.startCall();
  client.muteAudioIcon.trigger("click");
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.unmuteAudioIcon, false);
});
test('hangup on call ended', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.endCall();
  TestWebrtc.Helpers.isVisible(client.hangup, false);
});
test('hangup on calling', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  client.sipStack.ua.isConnected = function(){ return true;}
  client.callUri("1000@webrtc.domain.to");
  TestWebrtc.Helpers.newCall();
  strictEqual(client.sipStack.getCallState(), "calling");
  TestWebrtc.Helpers.isVisible(client.hangup, true);
  strictEqual(client.callButton.css('opacity'), "0");
});
test('hangup on failed', function() {
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  client.sipStack.ua.isConnected = function(){ return true;}
  TestWebrtc.Helpers.failCall();
  strictEqual(client.sipStack.getCallState(), "connected");
  TestWebrtc.Helpers.isVisible(client.hangup, false);
  strictEqual(client.callButton.css('opacity'), "1");
});
test('getUserMedia failed', function() {
  var alertCalled = false;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  client.showErrorPopup = function(){ alertCalled = true;}
  client.eventBus.on("calling", function(evt){
    evt.sender.failed('local', null, ExSIP.C.causes.USER_DENIED_MEDIA_ACCESS);
  });
  TestWebrtc.Helpers.connect();
  client.callUri("1000@webrtc.domain.to");
  strictEqual(alertCalled, true);
});
test('on disconnect', function() {
  ClientConfig.enableMessages = true;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.disconnect();
  strictEqual(client.messages.text().trim(), 'Connection Failed!');
});
test('on invalid destination and connected', function() {
  var config = {};
  ClientConfig.enableMessages = true;
  jQuery.extend(config, ClientConfig);
  config.destination = '12345';
  config.allowOutside = false;
  client = new WebRTC.Client(config, '#testWrapper');
  TestWebrtc.Helpers.connect();
  strictEqual(client.messages.text().trim(), 'Invalid Destination      Connected');
});
test('on disconnect for 503 with retryAfter', function() {
  ClientConfig.enableMessages = true;
  client = new WebRTC.Client(ClientConfig, '#testWrapper');
  TestWebrtc.Helpers.disconnect({code: 503, reason: 'Service Unavailable', retryAfter: 30});
  strictEqual(client.messages.text().trim(), 'Service Unavailable - Retrying in 30 seconds');
});
