require('./includes/common');
describe('connectionstatus', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    testUA.mockLocation();
    config = {};
  });

  it('on startup', function() {
    client = create(config)
    expect(connectionstatus.registered).toEqual(false);
    expect(connectionstatus.connected).toEqual(false);
  });
  it('on connected', function() {
    client = create(config)
    testUA.connect();
    expect(connectionstatus.registered).toEqual(false);
    expect(connectionstatus.connected).toEqual(true);
  });
  it('on disconnected', function() {
    client = create(config)
    testUA.connect();
    testUA.disconnect();
    expect(connectionstatus.registered).toEqual(false);
    expect(connectionstatus.connected).toEqual(false);
  });
  it('on registered', function() {
    client = create(config)
    testUA.registered();
    expect(connectionstatus.registered).toEqual(true);
    expect(connectionstatus.connected).toEqual(false);
  });
  it('on registrationFailed', function() {
    client = create(config)
    testUA.registered();
    testUA.registrationFailed();
    expect(connectionstatus.registered).toEqual(false);
    expect(connectionstatus.connected).toEqual(false);
  });
});