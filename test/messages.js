require('./includes/common');
describe('messages', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    config = {};
    config.domainTo = "domain.to";
    config.domainFrom = "domain.from";
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {
      console.log("enableLocalAudio : " + enable);
    }
  });

  it('on disconnect', function() {
    config.enableMessages = true;
    client = create(config);
    testUA.disconnect();
    expect(messagesview.alert.text().trim()).toEqual('Connection failed');
  });
  it('on invalid destination and connected', function() {
    var config = {};
    config.enableMessages = true;
    jQuery.extend(config, config);
    config.destination = '12345';
    config.allowOutside = false;
    client = create(config);
    testUA.connect();
    expect(messagesview.success.text().trim()).toEqual('Connected');
  });
  it('on disconnect for 503 with retryAfter', function() {
    config.enableMessages = true;
    client = create(config);
    testUA.disconnect({
      code: 503,
      reason: 'Service Unavailable',
      retryAfter: 30
    });
    expect(messagesview.alert.text().trim()).toEqual('Service Unavailable - Retrying in 30 seconds');
  });
});
