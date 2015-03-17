require('./includes/common');
describe('sipstack', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    config = {
      domainTo: "domain.to",
      domainFrom: "domain.from",
      enableTransfer: true,
      enableCallStats: false
    };
  });

  it('RTCMediaHandlerOptions and bandwidth med change', function() {
    config.allowOutside = true;
    client = create(config)
    sipstack.ua.setRtcMediaHandlerOptions = function(options) {
      rtcMediaHandlerOptions = options;
    }
    testUA.val(settingsview.resolutionType, WebRTC.C.WIDESCREEN);
    testUA.val(settingsview.resolutionEncodingWidescreen, WebRTC.C.R_640x360);
    testUA.val(settingsview.bandwidthMed, "600");
    expect(configuration.encodingResolution).toEqual('640x360');
    expect(rtcMediaHandlerOptions).toEqual({
      RTCConstraints: {
        'optional': [],
        'mandatory': {}
      },
      "disableICE": true,
      "reuseLocalMedia": true,
      "videoBandwidth": "600"
    });
  });
  it('RTCMediaHandlerOptions and bandwidth low change for resolution 180', function() {
    config.allowOutside = true;
    client = create(config)
    sipstack.ua.setRtcMediaHandlerOptions = function(options) {
      rtcMediaHandlerOptions = options;
    }
    testUA.val(settingsview.bandwidthLow, "200");
    testUA.val(settingsview.resolutionType, WebRTC.C.WIDESCREEN);
    testUA.val(settingsview.resolutionEncodingWidescreen, WebRTC.C.R_320x180);
    expect(rtcMediaHandlerOptions).toEqual({
      RTCConstraints: {
        'optional': [],
        'mandatory': {}
      },
      "disableICE": true,
      "reuseLocalMedia": true,
      "videoBandwidth": "200"
    });
  });
});