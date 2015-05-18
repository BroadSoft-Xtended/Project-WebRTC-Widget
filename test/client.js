require('./includes/common');
describe('client', function() {

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

  it('resolution class for resolution setting', function() {
    config.displayResolution = '';
    config.encodingResolution = '';
    location.search = "?hd=false";
    $.cookie("settingsResolutionDisplay", Constants.R_960x720);
    $.cookie("settingsResolutionEncoding", Constants.R_320x240);
    client = create(config);
    expect(configuration.displayResolution).toEqual(Constants.R_960x720);
    expect(client.model.classes.indexOf('_'+Constants.R_960x720)).toNotEqual(-1);
  });
  it('resolution class for hd=true', function() {
    location.search = "?hd=true";
    client = create(config);
    expect(client.model.classes.indexOf('_'+Constants.R_1280x720)).toNotEqual(-1);
  });
  it('getUserMedia failed', function() {
    var alertCalled = false;
    client = create(config);
    client.showErrorPopup = function() {
      alertCalled = true;
    }
    eventbus.on("calling", function(e) {
      e.session.failed('local', null, ExSIP.C.causes.USER_DENIED_MEDIA_ACCESS);
    });
    testUA.connect();
    callcontrol.callUri("1000@webrtc.domain.to");
    expect(alertCalled).toEqual(true);
  });
});