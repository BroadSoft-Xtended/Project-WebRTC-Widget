require('./includes/common');
describe('configuration', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    // testUA.mockLocation();
    WebRTC.Utils.getSearchVariable = function(name){ return false;}
    $.cookie("settingResolutionDisplay", "");
    $.cookie("settingResolutionEncoding", "");
    config = {enableCallStats: false, domainTo: 'domain.to', domainFrom: 'domain.from'};
  });
  // afterEach(function() {
  //   settings.clear();
  // });

it('websocketsServers', function() {
  config.websocketsServers = [
    {'ws_uri':'ws://webrtc-gw1.broadsoft.com:8060', 'weight':0},
    {'ws_uri':'ws://webrtc-gw2.broadsoft.com:8060', 'weight':0},
    {'ws_uri':'ws://webrtc-gw.broadsoft.com:8060', 'weight':0}];
  client = create(config);
  expect(sipstack.ua.configuration.ws_servers.length).toEqual( 3);
});
it('networkUserId set', function() {
  config.networkUserId = '8323303809';
  client = create(config);
  expect(sipstack.ua.configuration.authorization_user).toEqual( '8323303809');
  expect(sipstack.ua.configuration.uri.toString()).toEqual( 'sip:8323303809@'+config.domainFrom);
  config.networkUserId = undefined;
});
it('WEBRTC-41 : networkUserId and userId set', function() {
  config.networkUserId = '8323303809';
  WebRTC.Utils.getSearchVariable = function(name){ return name === "userid" ? "8323303810" : false;}
  client = create(config);
  expect(sipstack.ua.configuration.authorization_user).toEqual('8323303809', "networkUserId takes precendence over userid");
  config.networkUserId = undefined;
});
it('enableIms = true', function() {
  config.enableIms = true;
  client = create(config);
  expect(sipstack.ua.configuration.enable_ims).toEqual( true);
});
it('enableIms = false', function() {
  config.enableIms = false;
  client = create(config);
  expect(sipstack.ua.configuration.enable_ims).toEqual( false);
});
it('userid:', function() {
  client = create(config);
  expect(sipstack.ua.configuration.uri !== undefined).toEqual(true);
});
it('getExSIPConfig() with userid with empty spaces', function() {
  client = create(config);
  settings.userid = 'my user id';
  expect(configuration.getExSIPConfig().uri).toEqual( "my%20user%20id@domain.from");
});
it('destination', function() {
  config.enableConnectLocalMedia = true;
  config.domainTo = "domain.to";
  config.allowOutside = true;
  WebRTC.Utils.getSearchVariable = function(name){ return name === "destination" ? "8323303810" : false;}
  client = create(config);
  var calledDestination = '';
  sipstack.call = function(destination){calledDestination = destination;};
  sipstack.ua.getUserMedia = function(options, success, failure, force){success();};

  testUA.connect();
  expect(calledDestination).toEqual( "sip:8323303810@domain.to");
});
it('WEBRTC-35 : destination with dtmf tones:', function() {
  config.enableConnectLocalMedia = true;
  config.domainTo = "domain.to";
  config.allowOutside = true;
  WebRTC.Utils.getSearchVariable = function(name){ return name === "destination" ? "8323303810,,123132" : false;}
  client = create(config);
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
  config.enableConnectLocalMedia = true;
  config.domainTo = "domain.to";
  config.allowOutside = true;
  WebRTC.Utils.getSearchVariable = function(name){ return name === "destination" ? "8323303810,,123132#" : false;}
  client = create(config);
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
  config.enableConnectLocalMedia = true;
  config.domainTo = "domain.to";
  config.allowOutside = true;
  WebRTC.Utils.getSearchVariable = function(name){ return name === "destination" ? "8323303810,,123132@some.domain" : false;}
  client = create(config);
  var calledDestination = '', sentTones = '';
  sipstack.call = function(destination){calledDestination = destination;};
  sipstack.sendDTMF = function(tones){sentTones = tones;};
  sipstack.ua.getUserMedia = function(options, success, failure, force){success();};

  testUA.connect();
  expect(calledDestination).toEqual( "sip:8323303810@some.domain");

  testUA.startCall();
  expect(sentTones).toEqual(",,123132");
});
it('getExSIPOptions', function() {
  delete config.encodingResolution;
  client = create(config);
  expect(settings.audioOnly).toEqual( undefined);

  var options = {
    mediaConstraints: { audio: true, video: { mandatory: { maxWidth: 640, maxHeight: 480 }}},
    createOfferConstraints: {mandatory:{OfferToReceiveAudio:true,OfferToReceiveVideo:true}}
  };
  expect(configuration.getExSIPOptions()).toEqual( options);
});
it('getExSIPOptions with resolution', function() {
  client = create(config);
  expect(configuration.audioOnly).toEqual( false);
  expect(configuration.hd).toEqual( undefined);
  settings.setResolutionEncoding('320x240');
  var options = {
    mediaConstraints: { audio: true, video: { mandatory: { maxWidth: 320, maxHeight: 240 }}},
    createOfferConstraints: {mandatory:{OfferToReceiveAudio:true,OfferToReceiveVideo:true}}
  };
  expect(configuration.getExSIPOptions()).toEqual( options);
});
it('getExSIPOptions with view = audioOnly', function() {
  config.view = 'audioOnly';
  client = create(config);
  var options = {
    mediaConstraints: { audio: true, video: false},
    createOfferConstraints: {mandatory:{OfferToReceiveAudio:true,OfferToReceiveVideo:false}}
  };
  expect(configuration.getExSIPOptions()).toEqual( options);
  delete config.view;
});
it('getExSIPOptions with resolution 960x720', function() {
  client = create(config);
  expect(configuration.audioOnly).toEqual( false);
  expect(configuration.hd).toEqual( undefined);
  settings.setResolutionEncoding('960x720');
  var options = {
    mediaConstraints: { audio: true, video: { mandatory: { minWidth: 960, minHeight: 720 }}},
    createOfferConstraints: {mandatory:{OfferToReceiveAudio:true,OfferToReceiveVideo:true}}
  };
  expect(configuration.getExSIPOptions()).toEqual( options);
});
it('getExSIPOptions with hd=true', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "hd" ? "true" : false;}
  client = create(config);
  expect(configuration.audioOnly).toEqual( false);
  expect(configuration.hd).toEqual( true);
  settings.setResolutionEncoding('960x720');
  var options = {
    mediaConstraints: { audio: true, video: { mandatory: { minWidth: 1280, minHeight: 720 }}},
    createOfferConstraints: {mandatory:{OfferToReceiveAudio:true,OfferToReceiveVideo:true}}
  };
  expect(configuration.getExSIPOptions()).toEqual( options);
});
it('setClientConfigFlags', function() {
  client = create(config);
  var flags = configuration.getClientConfigFlags();

  for(var flag in configuration.Flags) {
    setClientConfigFlagAndAssert(flag);
  }

  configuration.setClientConfigFlags(flags);
});
it('features url parameter', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "features" ? "524287" : false;}
  client = create(config);
  expect(configuration.getClientConfigFlags()).toEqual( 524287);
  WebRTC.Utils.getSearchVariable = function(name){ return false;}
});
it('setResolutionDisplay', function() {
  client = create(config);
  expect(configuration.getResolutionDisplay()).toEqual( WebRTC.C.DEFAULT_RESOLUTION_DISPLAY);
  configuration.setResolutionDisplay(WebRTC.C.R_1280x720);
  expect(configuration.getResolutionDisplay()).toEqual( WebRTC.C.R_1280x720);
  expect(client.client.attr('class').indexOf("r"+WebRTC.C.R_1280x720) !== -1).toEqual(true, "Should contain new resolution display as class name");
});
it('with view url param', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "view" ? "audioOnly" : false;}
  config.view = ''
  client = create(config);
  expect(configuration.getViews()).toEqual( ['audioOnly']);
});
it('with config.view param', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return false;}
  config.view = 'audioOnly';
  client = create(config);
  expect(configuration.getViews()).toEqual( ['audioOnly']);
  delete config.view;
});
it('with config.view param and url params', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "view" ? "centered" : false;}
  config.view = 'audioOnly';
  client = create(config);
  expect(configuration.getViews()).toEqual( ['audioOnly', 'centered']);
  delete config.view;
});
it('without color url param', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return false;}
  client = create(config);
  expect(configuration.getBackgroundColor()).toEqual( "#ffffff");
  expect($('body').css('backgroundColor')).toEqual( '#ffffff');
});
it('with color url param', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "color" ? "red" : false;}
  client = create(config);
  expect(configuration.getBackgroundColor()).toEqual( '#ff0000');
  expect($('body').css('backgroundColor')).toEqual( '#ff0000');
});
it('with color url param as hex', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "color" ? "d0d0d0" : false;}
  client = create(config);
  expect(configuration.getBackgroundColor()).toEqual( '#d0d0d0');
  expect($('body').css('backgroundColor')).toEqual( '#d0d0d0');
});
it('with color url param as transparent', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "color" ? "transparent" : false;}
  client = create(config);
  expect(configuration.getBackgroundColor()).toEqual( 'transparent');
  expect($('body').css('backgroundColor')).toEqual( 'transparent');
});


function setClientConfigFlagAndAssert(flagName) {
  var flagValue = configuration.Flags[flagName];
  configuration.setClientConfigFlags(flagValue);
  assertClientConfigFlags([flagName], true);
  expect(configuration.getClientConfigFlags()).toEqual( flagValue);
}

function assertClientConfigFlags(names, enabled) {
  for(var i=0; i<names.length; i++) {
    expect(configuration[names[i]]).toEqual(enabled, "Should be "+(enabled ? "enabled" : "disabled")+" : "+names[i]);
  }
}
});