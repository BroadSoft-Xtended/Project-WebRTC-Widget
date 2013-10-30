module( "Settings", {
  setup: function() {
    TestWebrtc.Helpers.mockSound();
    TestWebrtc.Helpers.mockLocation();
    TestWebrtc.Helpers.deleteAllCookies();
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
  client.video.local.simulate( "drag", {dx: 50, dy: 100 });
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
test('change encoding resolution with different video resolution', function() {
  WebRTC.Video.prototype.localWidth = function(){return 640;}
  WebRTC.Video.prototype.localHeight = function(){return 480;}
  client = new WebRTC.Client();
  client.settings.resolutionEncodingStandard.val(WebRTC.C.R_960x720);
  client.settings.resolutionEncodingStandard.trigger('change');
  client.video.local.trigger("playing");
  strictEqual(client.messages.text(), "Video resolution 640,480 does not match selected encoding 960,720");
});