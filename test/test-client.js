module( "Settings", {
  setup: function() {
    TestWebrtc.Helpers.mockSound();
    TestWebrtc.Helpers.mockLocation();
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
  client.settings.save.trigger("click");
  strictEqual($.cookie("settingUserid"), "");
  strictEqual($.cookie("settingPassword"), "");
});
test('persist with userid set', function() {
  client = new WebRTC.Client();
  client.settings.userid.val('someuserid');
  client.settings.save.trigger("click");
  strictEqual($.cookie("settingUserid"), "someuserid");
  strictEqual($.cookie("settingPassword"), "");
});
test('updates localVideo top and left setting after drag', function() {
  client = new WebRTC.Client();
  client.localVideo.simulate( "drag", {dx: 50, dy: 100 });
  strictEqual(client.settings.localVideoLeft.val(), "55");
  strictEqual(client.settings.localVideoTop.val(), "484");
});
test('setResolution with standard resolution', function() {
  client = new WebRTC.Client();
  client.settings.setResolution('320x240');
  deepEqual(client.settings.resolutionType.val(), "standard");
  deepEqual(client.settings.resolutionWidescreen.css("display"), "none");
  deepEqual(client.settings.resolutionStandard.css("display"), "inline-block");
});
test('setResolution with widescreen resolution', function() {
  client = new WebRTC.Client();
  client.settings.setResolution('320x180');
  deepEqual(client.settings.resolutionType.val(), "widescreen");
  deepEqual(client.settings.resolutionWidescreen.css("display"), "inline-block");
  deepEqual(client.settings.resolutionStandard.css("display"), "none");
});
test('setResolution with no resolution', function() {
  client = new WebRTC.Client();
  client.settings.setResolution(undefined);
  deepEqual(client.settings.resolutionType.val(), "");
  deepEqual(client.settings.resolutionWidescreen.css("display"), "none");
  deepEqual(client.settings.resolutionStandard.css("display"), "none");
});
test('change resolution type', function() {
  client = new WebRTC.Client();
  client.settings.resolutionType.val('standard');
  client.settings.resolutionType.trigger('change');
  deepEqual(client.settings.resolutionWidescreen.css("display"), "none");
  deepEqual(client.settings.resolutionStandard.css("display"), "inline-block");
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
    TestWebrtc.Helpers.mockSound();
    TestWebrtc.Helpers.mockLocation();
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
  client.settings.save.trigger("click");
  client = new WebRTC.Client();
  strictEqual(client.sipStack.configuration.register, false);
});
test('getExSIPOptions', function() {
  client = new WebRTC.Client();
  strictEqual(client.settings.audioOnly, undefined);

  var options = {
    mediaConstraints: { audio: true, video: true},
    RTCConstraints: {'optional': [],'mandatory': {}}
  };
  deepEqual(client.configuration.getExSIPOptions(), options);
});
test('getExSIPOptions with resolution', function() {
  client = new WebRTC.Client();
  strictEqual(client.configuration.audioOnly, false);
  strictEqual(client.configuration.hd, "false");
  client.settings.setResolution('320x240');
  var options = {
    mediaConstraints: { audio: true, video: { mandatory: { maxWidth: 320, maxHeight: 240 }}},
    RTCConstraints: {'optional': [],'mandatory': {}}
  };
  deepEqual(client.configuration.getExSIPOptions(), options);
});
test('getExSIPOptions with hd=true', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "hd" ? "true" : false;}
  client = new WebRTC.Client();
  strictEqual(client.configuration.audioOnly, false);
  strictEqual(client.configuration.hd, true);
  client.settings.setResolution('960x720');
  var options = {
    mediaConstraints: { audio: true, video: { mandatory: { minWidth: 1280, minHeight: 720 }}},
    RTCConstraints: {'optional': [],'mandatory': {}}
  };
  deepEqual(client.configuration.getExSIPOptions(), options);
});

