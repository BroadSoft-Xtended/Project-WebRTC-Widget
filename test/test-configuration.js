module( "Configuration", {
  setup: function() {
    TestWebrtc.Helpers.mockSound();
    TestWebrtc.Helpers.mockLocation();
    WebRTC.Utils.getSearchVariable = function(name){ return false;}
    $.cookie("settingResolutionDisplay", "");
    $.cookie("settingResolutionEncoding", "");
    ClientConfig.enableCallStats = false;
  }, teardown: function() {
  }
});
test('websocketsServers', function() {
  ClientConfig.websocketsServers = [
    {'ws_uri':'ws://webrtc-gw1.broadsoft.com:8060', 'weight':0},
    {'ws_uri':'ws://webrtc-gw2.broadsoft.com:8060', 'weight':0},
    {'ws_uri':'ws://webrtc-gw.broadsoft.com:8060', 'weight':0}];
  client = new WebRTC.Client();
  strictEqual(client.sipStack.ua.configuration.ws_servers.length, 3);
});
test('networkUserId set', function() {
  ClientConfig.networkUserId = '8323303809';
  client = new WebRTC.Client();
  strictEqual(client.sipStack.ua.configuration.authorization_user, '8323303809');
  ClientConfig.networkUserId = undefined;
});
test('WEBRTC-41 : networkUserId and userId set', function() {
  ClientConfig.networkUserId = '8323303809';
  WebRTC.Utils.getSearchVariable = function(name){ return name === "userid" ? "8323303810" : false;}
  client = new WebRTC.Client();
  strictEqual(client.sipStack.ua.configuration.authorization_user, '8323303809', "networkUserId takes precendence over userid");
  ClientConfig.networkUserId = undefined;
});
test('enableIms = true', function() {
  ClientConfig.enableIms = true;
  client = new WebRTC.Client();
  strictEqual(client.sipStack.ua.configuration.enable_ims, true);
});
test('enableIms = false', function() {
  ClientConfig.enableIms = false;
  client = new WebRTC.Client();
  strictEqual(client.sipStack.ua.configuration.enable_ims, false);
});
test('userid', function() {
  client = new WebRTC.Client();
  ok("chooses random userid", client.configuration.userid !== undefined);
});
test('getExSIPConfig() with userid with empty spaces', function() {
  client = new WebRTC.Client();
  strictEqual(client.configuration.getExSIPConfig('my user id').uri, "my%20user%20id@domain.from");
});
test('destination', function() {
  ClientConfig.enableConnectLocalMedia = true;
  ClientConfig.domainTo = "domain.to";
  ClientConfig.allowOutside = true;
  WebRTC.Utils.getSearchVariable = function(name){ return name === "destination" ? "8323303810" : false;}
  client = new WebRTC.Client();
  var calledDestination = '';
  client.sipStack.call = function(destination){calledDestination = destination;};
  client.sipStack.ua.getUserMedia = function(options, success, failure, force){success();};

  TestWebrtc.Helpers.connect();
  strictEqual(calledDestination, "sip:8323303810@domain.to");
});
test('WEBRTC-35 : destination with dtmf tones', function() {
  ClientConfig.enableConnectLocalMedia = true;
  ClientConfig.domainTo = "domain.to";
  ClientConfig.allowOutside = true;
  WebRTC.Utils.getSearchVariable = function(name){ return name === "destination" ? "8323303810,,123132" : false;}
  client = new WebRTC.Client();
  var calledDestination = '', sentTones = '';
  client.sipStack.call = function(destination){calledDestination = destination;};
  client.sipStack.sendDTMF = function(tones){sentTones = tones;};
  client.sipStack.ua.getUserMedia = function(options, success, failure, force){success();};

  TestWebrtc.Helpers.connect();
  strictEqual(calledDestination, "sip:8323303810@domain.to");

  var session = TestWebrtc.Helpers.startCall();
  strictEqual(sentTones, ",,123132");

  sentTones = '';

  TestWebrtc.Helpers.reconnectCall(session);
  strictEqual(sentTones, "", "Should NOT send the dtmf again");
});
test('WEBRTC-35 : destination with dtmf tones and #', function() {
  ClientConfig.enableConnectLocalMedia = true;
  ClientConfig.domainTo = "domain.to";
  ClientConfig.allowOutside = true;
  WebRTC.Utils.getSearchVariable = function(name){ return name === "destination" ? "8323303810,,123132#" : false;}
  client = new WebRTC.Client();
  var calledDestination = '', sentTones = '';
  client.sipStack.call = function(destination){calledDestination = destination;};
  client.sipStack.sendDTMF = function(tones){sentTones = tones;};
  client.sipStack.ua.getUserMedia = function(options, success, failure, force){success();};

  TestWebrtc.Helpers.connect();
  strictEqual(calledDestination, "sip:8323303810@domain.to");

  TestWebrtc.Helpers.startCall();
  strictEqual(sentTones, ",,123132#");
});
test('WEBRTC-35 : destination with dtmf tones and domain', function() {
  ClientConfig.enableConnectLocalMedia = true;
  ClientConfig.domainTo = "domain.to";
  ClientConfig.allowOutside = true;
  WebRTC.Utils.getSearchVariable = function(name){ return name === "destination" ? "8323303810,,123132@some.domain" : false;}
  client = new WebRTC.Client();
  var calledDestination = '', sentTones = '';
  client.sipStack.call = function(destination){calledDestination = destination;};
  client.sipStack.sendDTMF = function(tones){sentTones = tones;};
  client.sipStack.ua.getUserMedia = function(options, success, failure, force){success();};

  TestWebrtc.Helpers.connect();
  strictEqual(calledDestination, "sip:8323303810@some.domain");

  TestWebrtc.Helpers.startCall();
  strictEqual(sentTones, ",,123132");
});
test('register', function() {
  client = new WebRTC.Client();
  strictEqual(client.sipStack.configuration.getRegister(), false);
});
test('register after persist', function() {
  client = new WebRTC.Client();
  strictEqual(client.sipStack.configuration.getRegister(), false);
  client.settings.save.trigger("click");
  client.timer.stop();
  client = new WebRTC.Client();
  strictEqual(client.sipStack.configuration.getRegister(), false);
});
test('getExSIPOptions', function() {
  delete ClientConfig.encodingResolution;
  client = new WebRTC.Client();
  strictEqual(client.settings.audioOnly, undefined);

  var options = {
    mediaConstraints: { audio: true, video: { mandatory: { maxWidth: 640, maxHeight: 480 }}},
    createOfferConstraints: {mandatory:{OfferToReceiveAudio:true,OfferToReceiveVideo:true}}
  };
  deepEqual(client.configuration.getExSIPOptions(), options);
});
test('getExSIPOptions with resolution', function() {
  client = new WebRTC.Client();
  strictEqual(client.configuration.audioOnly, false);
  strictEqual(client.configuration.hd, "false");
  client.settings.setResolutionEncoding('320x240');
  var options = {
    mediaConstraints: { audio: true, video: { mandatory: { maxWidth: 320, maxHeight: 240 }}},
    createOfferConstraints: {mandatory:{OfferToReceiveAudio:true,OfferToReceiveVideo:true}}
  };
  deepEqual(client.configuration.getExSIPOptions(), options);
});
test('getExSIPOptions with view = audioOnly', function() {
  ClientConfig.view = 'audioOnly';
  client = new WebRTC.Client();
  var options = {
    mediaConstraints: { audio: true, video: false},
    createOfferConstraints: {mandatory:{OfferToReceiveAudio:true,OfferToReceiveVideo:false}}
  };
  deepEqual(client.configuration.getExSIPOptions(), options);
  delete ClientConfig.view;
});
test('getExSIPOptions with resolution 960x720', function() {
  client = new WebRTC.Client();
  strictEqual(client.configuration.audioOnly, false);
  strictEqual(client.configuration.hd, "false");
  client.settings.setResolutionEncoding('960x720');
  var options = {
    mediaConstraints: { audio: true, video: { mandatory: { minWidth: 960, minHeight: 720 }}},
    createOfferConstraints: {mandatory:{OfferToReceiveAudio:true,OfferToReceiveVideo:true}}
  };
  deepEqual(client.configuration.getExSIPOptions(), options);
});
test('getExSIPOptions with hd=true', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "hd" ? "true" : false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.audioOnly, false);
  strictEqual(client.configuration.hd, true);
  client.settings.setResolutionEncoding('960x720');
  var options = {
    mediaConstraints: { audio: true, video: { mandatory: { minWidth: 1280, minHeight: 720 }}},
    createOfferConstraints: {mandatory:{OfferToReceiveAudio:true,OfferToReceiveVideo:true}}
  };
  deepEqual(client.configuration.getExSIPOptions(), options);
});
test('setClientConfigFlags', function() {
  client = new WebRTC.Client();
  var flags = client.configuration.getClientConfigFlags();

  for(var flag in WebRTC.Configuration.Flags) {
    setClientConfigFlagAndAssert(flag);
  }

  client.configuration.setClientConfigFlags(flags);
});
test('features url parameter', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "features" ? "524287" : false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.getClientConfigFlags(), 524287);
  WebRTC.Utils.getSearchVariable = function(name){ return false;}
});
test('setResolutionDisplay', function() {
  client = new WebRTC.Client();
  strictEqual(client.configuration.getResolutionDisplay(), WebRTC.C.DEFAULT_RESOLUTION_DISPLAY);
  client.configuration.setResolutionDisplay(WebRTC.C.R_1280x720);
  strictEqual(client.configuration.getResolutionDisplay(), WebRTC.C.R_1280x720);
  strictEqual(client.client.attr('class').indexOf("r"+WebRTC.C.R_1280x720) !== -1, true, "Should contain new resolution display as class name");
});
test('with view url param', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "view" ? "audioOnly" : false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.getView(), 'audioOnly');
});
test('with ClientConfig.view param', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return false;}
  ClientConfig.view = 'audioOnly';
  client = new WebRTC.Client();
  strictEqual(client.configuration.getView(), 'audioOnly');
  delete ClientConfig.view;
});
test('without color url param', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.getBackgroundColor(), "#ffffff");
  strictEqual(client.settings.color.val(), '#ffffff');
  strictEqual($('body').css('backgroundColor'), '#ffffff');
});
test('with color url param', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "color" ? "red" : false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.getBackgroundColor(), '#ff0000');
  strictEqual($('body').css('backgroundColor'), '#ff0000');
});
test('with color url param as hex', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "color" ? "d0d0d0" : false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.getBackgroundColor(), '#d0d0d0');
  strictEqual($('body').css('backgroundColor'), '#d0d0d0');
});
test('with color url param as transparent', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "color" ? "transparent" : false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.getBackgroundColor(), 'transparent');
  strictEqual($('body').css('backgroundColor'), '#000000');
});


function setClientConfigFlagAndAssert(flagName) {
  var flagValue = WebRTC.Configuration.Flags[flagName];
  client.configuration.setClientConfigFlags(flagValue);
  assertClientConfigFlags([flagName], true);
  strictEqual(client.configuration.getClientConfigFlags(), flagValue);
}

function assertClientConfigFlags(names, enabled) {
  for(var i=0; i<names.length; i++) {
    strictEqual(client.configuration[names[i]], enabled, "Should be "+(enabled ? "enabled" : "disabled")+" : "+names[i]);
  }
}