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

  it('classes for view=audioOnly', function() {
    location.search = "?view=audioOnly";
    widget = create({config: config});
    expect(widget.model.classes.indexOf('audioOnly')).toNotEqual(-1);
  });
});