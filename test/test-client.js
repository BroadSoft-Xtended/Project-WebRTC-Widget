module( "Settings", {
  setup: function() {
  }, teardown: function() {
  }
});
test('without color url param', function() {
  client = new WebRTC.Client();
  strictEqual(client.configuration.color, undefined);
  strictEqual($('#settingColor').val(), '#ffffff');
});
test('with color url param', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "color" ? "red" : false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.color, '#ff0000');
});
test('with color url param as hex', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "color" ? "d0d0d0" : false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.color, '#d0d0d0');
});

module( "Timer", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
  }, teardown: function() {
  }
});
test('format', function() {
  client = new WebRTC.Client();
  client.sipStack.emit('connected');
  strictEqual($("#timer").text(), '');
});

module( "Configuration", {
  setup: function() {
  }, teardown: function() {
  }
});
test('userid', function() {
  client = new WebRTC.Client();
  ok("chooses random userid", client.configuration.userid !== undefined);
});
test('register', function() {
  client = new WebRTC.Client();
  strictEqual(client.sipStack.configuration.register, false);
});
test('register after persist', function() {
  client = new WebRTC.Client();
  strictEqual(client.sipStack.configuration.register, false);
  client.configuration.persist();

  client = new WebRTC.Client();
  strictEqual(client.sipStack.configuration.register, false);
});
test('persist', function() {
  client = new WebRTC.Client();
  client.configuration.persist();
  strictEqual($.cookie("settingUserid"), "");
  strictEqual($.cookie("settingPassword"), "");
});

