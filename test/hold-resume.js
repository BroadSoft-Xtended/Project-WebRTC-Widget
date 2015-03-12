require('./includes/common');
describe('hold/resume', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    config = {domainTo: "domain.to", domainFrom: "domain.from", enableTransfer: true, enableCallStats: false};
  });

it('hold icon', function() {
  client = create(config)
  testUA.isVisible(videobar.hold.element, false);
});
it('resume icon', function() {
  client = create(config)
  testUA.isVisible(videobar.resume.element, false);
});
it('hold icon on call started with enableHold is false', function() {
  config.enableHold = false;
  client = create(config)
  testUA.startCall();
  testUA.isVisible(videobar.hold.element, false);
});

it('hold icon on call started with enableHold is true', function() {
  config.enableHold = true;
  client = create(config)
  testUA.startCall();
  testUA.isVisible(videobar.hold.element, true);
});
it('resume icon on call started with enableHold is false', function() {
  config.enableHold = false;
  client = create(config)
  testUA.startCall();
  testUA.isVisible(videobar.resume.element, false);
});
it('resume icon on call started with enableHold is true', function() {
  config.enableHold = true;
  client = create(config)
  testUA.startCall();
  testUA.isVisible(videobar.resume.element, false);
});
it('hold icon after call held', function() {
  config.enableHold = true;
  client = create(config)
  testUA.startCall();
  videobar.hold.element.trigger("click");
  testUA.isVisible(videobar.hold.element, false);
});
it('resume icon after call held', function() {
  config.enableHold = true;
  client = create(config)
  testUA.startCall();
  videobar.hold.element.trigger("click");
  expect(videobar.hold.disabled).toEqual( false);
  testUA.isVisible(videobar.resume.element, true);
});
it('hold icon after call resumed', function() {
  config.enableHold = true;
  client = create(config)
  testUA.startCall();
  videobar.hold.element.trigger("click");
  videobar.resume.element.trigger("click");
  expect(videobar.resume.disabled).toEqual( false);
  testUA.isVisible(videobar.hold.element, true);
});
it('resume icon after call resumed', function() {
  config.enableHold = true;
  client = create(config)
  testUA.startCall();
  videobar.hold.element.trigger("click");
  videobar.resume.element.trigger("click");
  testUA.isVisible(videobar.resume.element, false);
});
it('hold icon on call ended', function() {
  client = create(config)
  testUA.startCall();
  testUA.endCall();
  testUA.isVisible(videobar.hold.element, false);
});
it('resume icon on call ended', function() {
  client = create(config)
  testUA.startCall();
  videobar.hold.element.trigger("click");
  testUA.endCall();
  testUA.isVisible(videobar.resume.element, false);
});
});