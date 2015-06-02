require('./includes/common');
describe('widget', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.setupLocalStorage();
    config = {
      sipstack: {
        domainTo: "domain.to",
        domainFrom: "domain.from"
      },
      video: {
        displayResolution: '640x480'
      },
      callcontrol: {
        enableCallControl: true
      },
      stats: {
        enableCallStats: false
      },
      transfer: {
        enableTransfer: true
      },
      videobar: {
        enableMute: true
      }
    };
  });

  it('resolution class for view=audioOnly', function() {
    location.search = "?view=audioOnly";
    widget = create({config: config});
    expect(widget.model.classes.indexOf('audioOnly')).toNotEqual(-1);
  });
  it('getUserMedia failed', function() {
    var alertCalled = false;
    widget = create({config: config});
    widget.showErrorPopup = function() {
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