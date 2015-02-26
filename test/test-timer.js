require('./includes/common');
describe('timer', function() {

  beforeEach(function() {
    setUp();
    config = {};
    testUA.mockWebRTC();
  });

it('format', function() {
  client = create(config)
  expect(timer.text.text()).toEqual( '00:00:00');
  var timerFunction = timer.runningTimer();
  timerFunction();
  expect(timer.text.text()).toEqual( '00:00:00');
});
it('timer on call started with enableCallTimer = true', function() {
  config.enableCallTimer = true;
  client = create(config)
  testUA.isVisible(timer.view, false);
  testUA.startCall();
  testUA.isVisible(timer.view, true);
  testUA.endCall();
  testUA.isVisible(timer.view, false);
  expect(timer.text.text()).toEqual( '00:00:00');
});
it('timer on call started with enableCallTimer = false', function() {
  config.enableCallTimer = false;
  client = create(config)
  testUA.isVisible(timer.view, false);
  testUA.startCall();
  testUA.isVisible(timer.view, false);
  testUA.endCall();
  testUA.isVisible(timer.view, false);
});
});