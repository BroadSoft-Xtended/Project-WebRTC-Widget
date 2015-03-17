require('./includes/common');
describe('messages', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    config = {};
    config.domainTo = "domain.to";
    config.domainFrom = "domain.from";
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
    Utils.extend(config, config);
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
