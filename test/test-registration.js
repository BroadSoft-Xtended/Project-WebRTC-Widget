module( "Registration", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.mockSound();
    ClientConfig.domainTo = "domain.to";
    ClientConfig.domainFrom = "domain.from";
    ClientConfig.enableRegistrationIcon = true;
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {console.log("enableLocalAudio : "+enable);}
    initalGetPassword = WebRTC.Configuration.prototype.getPassword;
  }, teardown: function() {
    $.cookie('settingUserId', '');
    WebRTC.Configuration.prototype.getPassword = initalGetPassword;
  }
});

test('with settingUserID', function() {
  $.cookie('settingUserId', '12345')
  WebRTC.Configuration.prototype.getPassword = function(){return false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.getExSIPConfig("1509", false).register, true);
  TestWebrtc.Helpers.connect();
  var registered = false;
  client.eventBus.on("registered", function(e){
    registered = true;
  });
  client.sipStack.ua.emit('registered', client.sipStack.ua);
  strictEqual(registered, true, "should have received registered from UA");
});
test('without settingUserID', function() {
  WebRTC.Configuration.prototype.getPassword = function(){return false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.getExSIPConfig("1509", "4009").register, false);
});