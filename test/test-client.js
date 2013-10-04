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
test('persist', function() {
  client = new WebRTC.Client();
  client.settings.persist();
  strictEqual($.cookie("settingUserid"), "");
  strictEqual($.cookie("settingPassword"), "");
});
test('persist with userid set', function() {
  client = new WebRTC.Client();
  $("#settingUserid").val('someuserid');
  client.settings.persist();
  strictEqual($.cookie("settingUserid"), "someuserid");
  strictEqual($.cookie("settingPassword"), "");
});
test('updates localVideo top and left setting after drag', function() {
  client = new WebRTC.Client();
  client.localVideo.simulate( "drag", {dx: 50, dy: 100 });
  strictEqual(client.settings.localVideoLeft.val(), "55");
  strictEqual(client.settings.localVideoTop.val(), "484");
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

//module( "Client", {
//  setup: function() {
//  }, teardown: function() {
//  }
//});
//test('call with hide param', function() {
//  WebRTC.Utils.getSearchVariable = function(name){ return name === "hide" ? "true" : false;}
//  client = new WebRTC.Client();
//});

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
  client.settings.persist();

  client = new WebRTC.Client();
  strictEqual(client.sipStack.configuration.register, false);
});

