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
test('persist with resolution set', function() {
  client = new WebRTC.Client();
  client.settings.resolutionType.val(WebRTC.C.STANDARD);
  client.settings.resolutionDisplayStandard.val(WebRTC.C.R_960x720);
  client.settings.resolutionEncodingStandard.val(WebRTC.C.R_320x240);
  client.settings.save.trigger("click");
  strictEqual($.cookie("settingResolutionDisplay"), WebRTC.C.R_960x720);
  strictEqual($.cookie("settingResolutionEncoding"), WebRTC.C.R_320x240);
  client = new WebRTC.Client();
  strictEqual(client.settings.resolutionType.val(), WebRTC.C.STANDARD);
  strictEqual(client.settings.resolutionDisplayStandard.val(), WebRTC.C.R_960x720);
  strictEqual(client.settings.resolutionEncodingStandard.val(), WebRTC.C.R_320x240);
  $.cookie("settingResolutionDisplay", "");
  $.cookie("settingResolutionEncoding", "");
});
test('updates localVideo top and left setting after drag', function() {
  client = new WebRTC.Client();
  client.localVideo.simulate( "drag", {dx: 50, dy: 100 });
  strictEqual(client.settings.localVideoLeft.val(), "55");
  strictEqual(client.settings.localVideoTop.val(), "484");
});
test('setResolution with standard resolution', function() {
  client = new WebRTC.Client();
  client.settings.setResolutionDisplay(WebRTC.C.R_320x240);
  client.settings.setResolutionEncoding(WebRTC.C.R_320x240);
  deepEqual(client.settings.resolutionType.val(), WebRTC.C.STANDARD);
  deepEqual(client.settings.resolutionDisplayWidescreen.css("display"), "none");
  deepEqual(client.settings.resolutionEncodingWidescreen.css("display"), "none");
  deepEqual(client.settings.resolutionDisplayStandard.css("display"), "inline-block");
  deepEqual(client.settings.resolutionEncodingStandard.css("display"), "inline-block");
});
test('setResolution with widescreen resolution', function() {
  client = new WebRTC.Client();
  client.settings.setResolutionDisplay(WebRTC.C.R_320x180);
  client.settings.setResolutionEncoding(WebRTC.C.R_320x180);
  deepEqual(client.settings.resolutionType.val(), WebRTC.C.WIDESCREEN);
  deepEqual(client.settings.resolutionDisplayWidescreen.css("display"), "inline-block");
  deepEqual(client.settings.resolutionEncodingWidescreen.css("display"), "inline-block");
  deepEqual(client.settings.resolutionDisplayStandard.css("display"), "none");
  deepEqual(client.settings.resolutionEncodingStandard.css("display"), "none");
});
test('change resolution type', function() {
  client = new WebRTC.Client();
  client.settings.resolutionType.val('standard');
  client.settings.resolutionType.trigger('change');
  deepEqual(client.settings.resolutionDisplayWidescreen.css("display"), "none");
  deepEqual(client.settings.resolutionEncodingWidescreen.css("display"), "none");
  deepEqual(client.settings.resolutionDisplayStandard.css("display"), "inline-block");
  deepEqual(client.settings.resolutionEncodingStandard.css("display"), "inline-block");
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

module( "Client", {
  setup: function() {
  }, teardown: function() {
  }
});
test('resolution class for hd=true', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "hd" ? "true" : false;}
  client = new WebRTC.Client();
  strictEqual($('#main').attr('class'), "r"+WebRTC.C.R_1280x720);
});
test('resolution class for resolution setting', function() {
  WebRTC.Utils.getSearchVariable = function(name){ return name === "hd" ? "false" : false;}
  $.cookie("settingResolutionDisplay", WebRTC.C.R_960x720);
  $.cookie("settingResolutionEncoding", WebRTC.C.R_320x240);
  client = new WebRTC.Client();
  strictEqual($('#main').attr('class'), "r"+WebRTC.C.R_960x720);
});

module( "Configuration", {
  setup: function() {
    TestWebrtc.Helpers.mockSound();
    TestWebrtc.Helpers.mockLocation();
    WebRTC.Utils.getSearchVariable = function(name){ return false;}
    $.cookie("settingResolutionDisplay", "");
    $.cookie("settingResolutionEncoding", "");
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
    mediaConstraints: { audio: true, video: { mandatory: { maxWidth: 640, maxHeight: 480 }}},
    RTCConstraints: {'optional': [],'mandatory': {}}
  };
  deepEqual(client.configuration.getExSIPOptions(), options);
});
test('getExSIPOptions with resolution', function() {
  client = new WebRTC.Client();
  strictEqual(client.configuration.audioOnly, false);
  strictEqual(client.configuration.hd, "false");
  client.settings.setResolutionEncoding('320x240');
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
  client.settings.setResolutionEncoding('960x720');
  var options = {
    mediaConstraints: { audio: true, video: { mandatory: { minWidth: 1280, minHeight: 720 }}},
    RTCConstraints: {'optional': [],'mandatory': {}}
  };
  deepEqual(client.configuration.getExSIPOptions(), options);
});

