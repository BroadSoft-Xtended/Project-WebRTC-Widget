module( "Authentication", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.mockSound();
    ClientConfig.domainTo = "domain.to";
    ClientConfig.domainFrom = "domain.from";
    ClientConfig.enableRegistrationIcon = true;
    ClientConfig.enableSMS = false;
    ClientConfig.enableXMPP = false;
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {console.log("enableLocalAudio : "+enable);}
  }, teardown: function() {
    ClientConfig.register = false;
    WebRTC.Utils.getSearchVariable = function(name){ return false;}
  }
});

test('without password and ClientConfig.register=true', function() {
  ClientConfig.register = true;
  WebRTC.Configuration.prototype.getPassword = function(){return false;}
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  strictEqual(client.authentication.visible, false);
});

test('without password and ClientConfig.register=false and &register=true', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "register" ? "true" : false;}
  ClientConfig.register = false;
  WebRTC.Configuration.prototype.getPassword = function(){return false;}
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  strictEqual(client.authentication.visible, false);
});

test('without password and register=true and click okButton', function() {
  ClientConfig.register = true;
  WebRTC.Configuration.prototype.getPassword = function(){return false;}
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  client.authentication.userid.val("1502");
  client.authentication.password.val("");
  client.authentication.okButton.trigger("click");
  strictEqual(client.authentication.visible, false);
});

test('with password and ClientConfig.register=true and &register=true and 401 response', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "register" ? "true" : false;}
  ClientConfig.register = false;
  WebRTC.Configuration.prototype.getPassword = function(){return "4009";}
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  strictEqual(client.authentication.visible, false);
  TestWebrtc.Helpers.registrationFailed();
  strictEqual(client.authentication.visible, true);

});

test('with password and register=true and 401 response', function() {
  ClientConfig.register = true;
  WebRTC.Configuration.prototype.getPassword = function(){return "4009";}
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  strictEqual(client.authentication.visible, false);
  TestWebrtc.Helpers.registrationFailed();
  strictEqual(client.authentication.visible, true);
});

test('with password and register=true and 403 response', function() {
  ClientConfig.register = true;
  WebRTC.Configuration.prototype.getPassword = function(){return "4009";}
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  strictEqual(client.authentication.visible, false);
  TestWebrtc.Helpers.registrationFailed(403);
  strictEqual(client.authentication.visible, true);
});

test('without password and register=false', function() {
  ClientConfig.register = false;
  WebRTC.Configuration.prototype.getPassword = function(){return false;}
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  strictEqual(client.authentication.visible, false);
});