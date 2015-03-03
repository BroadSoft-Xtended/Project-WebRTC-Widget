require('./includes/common');
describe('call waiting', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    config = {domainTo: 'domain.to', domainFrom: 'domain.from', enabledTransfer: true, enableCallStats: false};
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {
      console.log("enableLocalAudio : " + enable);
    }
  });

});