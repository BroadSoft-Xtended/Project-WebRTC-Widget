require('./includes/common');
describe('incoming call', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    config = {};
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {
      console.log("enableLocalAudio : " + enable);
    }
  });

  it('window.onbeforeunload', function() {
    client = create(config)
    testUA.connect();
    var session = testUA.incomingSession();
    var terminated = false;
    session.terminate = function(options) {
      terminated = true;
    }
    testUA.incomingCall(session);
    window.onbeforeunload();
    expect(terminated).toEqual(true, "Should terminate the incoming session");
  });
});