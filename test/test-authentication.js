module( "Authentication", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.mockSound();
    ClientConfig.domainTo = "domain.to";
    ClientConfig.domainFrom = "domain.from";
    ClientConfig.enableRegistrationIcon = true;
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {console.log("enableLocalAudio : "+enable);}
    initalGetPassword = WebRTC.Configuration.prototype.getPassword;
  }, teardown: function() {
    ClientConfig.register = false;
    WebRTC.Utils.getSearchVariable = function(name){ return false;}
    WebRTC.Configuration.prototype.getPassword = initalGetPassword;
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
  WebRTC.Utils.getSearchVariable = function(name){ return false;}
  ClientConfig.register = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  client.authentication.userid.val("1502");
  client.authentication.password.val("121212");
  client.authentication.okButton.trigger("click");
  strictEqual(client.authentication.visible, false);
  strictEqual(client.sipStack.ua.configuration.uri.toString(), 'sip:1502@'+ClientConfig.domainFrom);
  strictEqual($.cookie('settingUserid'), '1502');
  strictEqual($.cookie('settingPassword'), '121212');
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

test('with cookies set and register=true and 403 response', function() {
  $.cookie('settingUserid', 'test');
  $.cookie('settingPassword', '121212');
  $.cookie('settingDisplayName', 'mydisplayname');
  ClientConfig.register = true;
  WebRTC.Configuration.prototype.getPassword = function(){return "121212";}
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  strictEqual(client.authentication.visible, false);
  TestWebrtc.Helpers.registrationFailed(403);
  strictEqual(client.authentication.visible, true);
  strictEqual(client.authentication.userid.val(), 'test');
  strictEqual(client.authentication.password.val(), '121212');
  strictEqual(client.authentication.displayName.val(), 'mydisplayname');
});

test('without password and register=false', function() {
  ClientConfig.register = false;
  WebRTC.Configuration.prototype.getPassword = function(){return false;}
  client = new WebRTC.Client();
  TestWebrtc.Helpers.connect();
  strictEqual(client.authentication.visible, false);
});