module( "SipStack", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.mockSound();
    ClientConfig.domainTo = "domain.to";
    ClientConfig.domainFrom = "domain.from";
    ClientConfig.enableTransfer = true;
    ClientConfig.enableCallStats = false;
    ClientConfig.register = false;
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {console.log("enableLocalAudio : "+enable);}
  }, teardown: function() {
  }
});

test('RTCMediaHandlerOptions and bandwidth med change', function() {
  ClientConfig.allowOutside = true;
  client = new WebRTC.Client();
  client.sipStack.ua.setRtcMediaHandlerOptions = function(options) {rtcMediaHandlerOptions= options;}
  client.settings.resolutionType.val(WebRTC.C.STANDARD);
  client.settings.resolutionEncodingStandard.val(WebRTC.C.R_640x480);
  client.settings.settingBandwidthMed.val("600");
  client.settings.settingBandwidthMed.trigger("blur");
  deepEqual(rtcMediaHandlerOptions, {
    RTCConstraints: {'optional': [],'mandatory': {}},
    "disableICE": true,
    "reuseLocalMedia": true,
    "videoBandwidth": "600"
  });
});
test('RTCMediaHandlerOptions and bandwidth low change for resolution 180', function() {
  ClientConfig.allowOutside = true;
  client = new WebRTC.Client();
  client.sipStack.ua.setRtcMediaHandlerOptions = function(options) {rtcMediaHandlerOptions= options;}
  client.settings.settingBandwidthLow.val("200");
  client.settings.settingBandwidthLow.trigger("blur");
  client.settings.resolutionType.val(WebRTC.C.STANDARD);
  client.settings.resolutionEncodingStandard.val(WebRTC.C.R_320x240);
  client.settings.resolutionEncodingStandard.trigger("change");
  deepEqual(rtcMediaHandlerOptions, {
    RTCConstraints: {'optional': [],'mandatory': {}},
    "disableICE": true,
    "reuseLocalMedia": true,
    "videoBandwidth": "200"
  });
});