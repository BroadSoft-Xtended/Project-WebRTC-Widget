require('./includes/common');
describe('registration', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    config = {
      domainTo: "domain.to",
      domainFrom: "domain.from",
      enableRegistrationIcon: true
    };
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {
      console.log("enableLocalAudio : " + enable);
    }
  });

  it('with settingUserID', function() {
    client = create(config)
    settings.userid = '12345';
    configuration.getPassword = function() {
      return false;
    }
    expect(configuration.getExSIPConfig("1509", false).register).toEqual(true);
    testUA.connect();
    var registered = false;
    eventbus.on("registered", function(e) {
      registered = true;
    });
    sipstack.ua.emit('registered', sipstack.ua);
    expect(registered).toEqual(true, "should have received registered from UA");
  });
  it('without settingUserID', function() {
    client = create(config)
    settings.userid = '';
    configuration.getPassword = function() {
      return false;
    }
    expect(configuration.getExSIPConfig("1509", "4009").register).toEqual(false);
  });
  it('without settingUserID and with configuration.register', function() {
    config.register = true;
    client = create(config)
    settings.userid = '';
    configuration.getPassword = function() {
      return false;
    }
    expect(configuration.getExSIPConfig("1509", false).register).toEqual(true);
    testUA.connect();
    var registered = false;
    eventbus.on("registered", function(e) {
      registered = true;
    });
    sipstack.ua.emit('registered', sipstack.ua);
    expect(registered).toEqual(true, "should have received registered from UA");
    delete config.register;
  });
});