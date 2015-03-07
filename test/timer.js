require('./includes/common');
describe('timer', function() {

  beforeEach(function() {
    setUp();
    config = {};
    testUA.mockWebRTC();
  });

it('format', function() {
  client = create(config)
  expect(timerview.text.text()).toEqual( '00:00:00');
  var timerFunction = timer.runningTimer();
  timerFunction();
  expect(timerview.text.text()).toEqual( '00:00:00');
});
it('timer on call started with enableCallTimer = true', function() {
  config.enableCallTimer = true;
  client = create(config)
  testUA.isVisible(timerview.view, false);
  testUA.startCall();
  testUA.isVisible(timerview.view, true);
  testUA.endCall();
  testUA.isVisible(timerview.view, false);
  expect(timerview.text.text()).toEqual( '00:00:00');
});
it('timer on call started with enableCallTimer = false', function() {
  config.enableCallTimer = false;
  client = create(config)
  testUA.isVisible(timerview.view, false);
  testUA.startCall();
  testUA.isVisible(timerview.view, false);
  testUA.endCall();
  testUA.isVisible(timerview.view, false);
});
});