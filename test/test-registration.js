module( "Registration", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.mockSound();
    ClientConfig.domainTo = "domain.to";
    ClientConfig.domainFrom = "domain.from";
    ClientConfig.enableRegistrationIcon = true;
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {console.log("enableLocalAudio : "+enable);}
  }, teardown: function() {
    ClientConfig.register = false;
  }
});

test('ExSipConfig without password and register=false', function() {
  ClientConfig.register = false;
  WebRTC.Configuration.prototype.getPassword = function(){return false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.getExSIPConfig("1509", false).register, false);
});
test('ExSipConfig without password and register=true', function() {
  ClientConfig.register = true;
  WebRTC.Configuration.prototype.getPassword = function(){return false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.getExSIPConfig("1509", false).register, true);
});
test('ExSipConfig with password', function() {
  WebRTC.Configuration.prototype.getPassword = function(){return false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.getExSIPConfig("1509", "4009").register, true);
});

test('Register with password', function() {
  WebRTC.Configuration.prototype.getPassword = function(){return "4009";}
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  var registered = false;
  client.eventBus.on("registered", function(e){
    registered = true;
  });
  client.sipStack.ua.emit('registered', client.sipStack.ua);
  strictEqual(registered, true);
});

test('Register without password', function() {
  WebRTC.Configuration.prototype.getPassword = function(){return false;}
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  var registered = false;
  client.eventBus.on("registered", function(e){
    registered = true;
  });
  client.sipStack.ua.emit('registered', client.sipStack.ua);
  strictEqual(registered, true, "should have received registered from UA");
});