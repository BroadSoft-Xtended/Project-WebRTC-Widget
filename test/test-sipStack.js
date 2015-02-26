require('./includes/common');
describe('sipstack', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    config = {domainTo: "domain.to", domainFrom: "domain.from", enableTransfer: true, enableCallStats: false};
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {console.log("enableLocalAudio : "+enable);}
  });

it('RTCMediaHandlerOptions and bandwidth med change', function() {
  config.allowOutside = true;
  client = create(config)
  sipstack.ua.setRtcMediaHandlerOptions = function(options) {rtcMediaHandlerOptions= options;}
  settingsview.resolutionType.val(WebRTC.C.STANDARD);
  settingsview.resolutionEncodingStandard.val(WebRTC.C.R_640x480);
  settingsview.bandwidthMed.val("600");
  settingsview.bandwidthMed.trigger("blur");
  expect(rtcMediaHandlerOptions).toEqual({
    RTCConstraints: {'optional': [],'mandatory': {}},
    "disableICE": true,
    "reuseLocalMedia": true,
    "videoBandwidth": "600"
  });
});
it('RTCMediaHandlerOptions and bandwidth low change for resolution 180', function() {
  config.allowOutside = true;
  client = create(config)
  sipstack.ua.setRtcMediaHandlerOptions = function(options) {rtcMediaHandlerOptions= options;}
  settingsview.bandwidthLow.val("200");
  settingsview.bandwidthLow.trigger("blur");
  settingsview.resolutionType.val(WebRTC.C.STANDARD);
  settingsview.resolutionEncodingStandard.val(WebRTC.C.R_320x240);
  settingsview.resolutionEncodingStandard.trigger("change");
  expect(rtcMediaHandlerOptions).toEqual({
    RTCConstraints: {'optional': [],'mandatory': {}},
    "disableICE": true,
    "reuseLocalMedia": true,
    "videoBandwidth": "200"
  });
});
});