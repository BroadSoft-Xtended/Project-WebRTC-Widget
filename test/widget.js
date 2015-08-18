require('./includes/common');
describe('widget', function() {

  afterEach(function() {
    cookieconfig.bandwidthLow = undefined;
    cookieconfig.bandwidthMed = undefined;
    cookieconfig.bandwidthHigh = undefined;
  });
  beforeEach(function() {
    setUp();
    test.setupLocalStorage();
    // config = {
    //   sipstack: {
    //     domainTo: "domain.to",
    //     domainFrom: "domain.from"
    //   },
    //   video: {
    //     displayResolution: '640x480'
    //   },
    //   callcontrol: {
    //     enableCallControl: true
    //   },
    //   stats: {
    //     enableCallStats: false
    //   },
    //   transfer: {
    //     enableTransfer: true
    //   },
    //   videobar: {
    //     enableMute: true
    //   }
    // };
  });

  it('updateConfigs() and asScript()', function() {
    widget = create();
    widget.updateConfigs({sipstack: {domainFrom: 'newdomain.from'}})
    expect(widget.asScript().replace(/\n/g,'')).toEqual('<script src="undefined" >{  "sipstack": {    "domainFrom": "newdomain.from"  }}</script>');
  });

  it('updateStyles() and asScript()', function() {
    widget = create();
    widget.updateStyles({settings: {settingsTabActiveColor: "red"}, core: {iconHighlightColor: "blue"}})
    expect(widget.asScript().replace(/\n/g,'')).toEqual('<script src="undefined" data-icon-highlight-color="blue" data-settings-tab-active-color="red"></script>');
  });

  it('classes for view=audioOnly', function() {
    location.search = "?view=audioOnly";
    widget = create();
    expect(widget.model.classes.indexOf('sendVideo')).toEqual(-1);
  });

});