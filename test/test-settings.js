module( "Settings", {
  setup: function() {
    TestWebrtc.Helpers.mockSound();
    TestWebrtc.Helpers.mockLocation();
    TestWebrtc.Helpers.deleteAllCookies();
    ClientConfig.enableCallStats = false;
    $.cookie("settingPassword", "");
  }, teardown: function() {
  }
});
test('settings icon', function() {
  ClientConfig.enableSettings = true;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.settings.settingsIcon, true);
  TestWebrtc.Helpers.isVisible(client.settings.popup, false);
});
test('settings icon after call started', function() {
  ClientConfig.enableSettings = true;
  client = new WebRTC.Client();
  client.settings.settingsIcon.trigger('click');
  TestWebrtc.Helpers.startCall();
  TestWebrtc.Helpers.isVisible(client.settings.settingsIcon, false);
  TestWebrtc.Helpers.isVisible(client.settings.popup, false);
});
test('settings icon with enableSettings = false', function() {
  ClientConfig.enableSettings = false;
  client = new WebRTC.Client();
  TestWebrtc.Helpers.isVisible(client.settings.settingsIcon, false);
  TestWebrtc.Helpers.isVisible(client.settings.popup, false);
});
test('settings icon after click', function() {
  ClientConfig.enableSettings = true;
  client = new WebRTC.Client();
  client.settings.settingsIcon.trigger('click');
  TestWebrtc.Helpers.isVisible(client.settings.settingsIcon, true);
  TestWebrtc.Helpers.isVisible(client.settings.popup, true);
  client.settings.settingsIcon.trigger('click');
  TestWebrtc.Helpers.isVisible(client.settings.settingsIcon, true);
  TestWebrtc.Helpers.isVisible(client.settings.popup, false);
});
test('persist', function() {
  client = new WebRTC.Client();
  client.settings.save.trigger("click");
  strictEqual($.cookie("settingUserId"), "");
  strictEqual($.cookie("settingPassword"), "");
});
test('persist with active call', function() {
  client = new WebRTC.Client();
  var reload = false;
  client.settings.reload = function(){reload = true;}
  TestWebrtc.Helpers.startCall();
  client.settings.save.trigger("click");
  strictEqual(reload, false);
  TestWebrtc.Helpers.endCall();
  strictEqual(reload, true);
});
test('persist with userid set', function() {
  client = new WebRTC.Client();
  client.settings.userId('someuserid');
  client.settings.save.trigger("click");
  strictEqual($.cookie("settingUserId"), "someuserid");
  strictEqual($.cookie("settingPassword"), "");
});
test('persist with display name set', function() {
  client = new WebRTC.Client();
  strictEqual(client.settings.displayName(), "");
  client.settings.displayName('somedisplayname');
  client.settings.save.trigger("click");
  strictEqual($.cookie("settingDisplayName"), "somedisplayname");
  client = new WebRTC.Client();
  strictEqual(client.settings.displayName(), "somedisplayname");
});
test('resolution types with ClientConfig set', function() {
  ClientConfig.displayResolution = WebRTC.C.R_960x720;
  ClientConfig.encodingResolution = WebRTC.C.R_320x240;
  client = new WebRTC.Client();
  strictEqual(client.settings.getResolutionDisplay(), WebRTC.C.R_960x720);
  strictEqual(client.settings.getResolutionEncoding(), WebRTC.C.R_320x240);
  ClientConfig.displayResolution = null;
  ClientConfig.encodingResolution = null;
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
test('persist with password set', function() {
  client = new WebRTC.Client();
  client.settings.password('121212');
  client.settings.save.trigger("click");
  strictEqual($.cookie("settingPassword"), '121212');
  strictEqual(WebRTC.Utils.getSearchVariable("password"), false);
  strictEqual(client.configuration.getPassword(), '121212');
  client = new WebRTC.Client();
  strictEqual(client.configuration.getPassword(), '121212');
  strictEqual(client.settings.password(), '121212');
  $.cookie("settingPassword", "");
});
test('updates localVideo top and left setting after drag', function() {
  ClientConfig.enableSelfView = true;
  client = new WebRTC.Client();
  client.video.local.simulate( "drag", {dx: 50, dy: 100 });
  strictEqual(client.settings.localVideoLeft.val(), "56");
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
test('hide or disable settings when ClientConfig has corresponding attributes set', function() {
  ClientConfig.enableAutoAnswer = true;
  delete ClientConfig.enableSelfView;
  delete ClientConfig.networkUserId;
  delete ClientConfig.enableHD;
  delete ClientConfig.displayResolution;
  delete ClientConfig.encodingResolution;
  delete ClientConfig.bandwidthLow;
  delete ClientConfig.bandwidthMed;
  delete ClientConfig.bandwidthHigh;
  delete ClientConfig.displayName;
  client = new WebRTC.Client();
  client.settings.settingsIcon.trigger('click');
  strictEqual(client.settings.settingAutoAnswerRow.is(":visible"), true);
  strictEqual(client.settings.settingSelfViewDisableRow.is(":visible"), true);
  strictEqual(client.settings.settingUseridRow.is(":visible"), true);
  strictEqual(client.settings.settingHDRow.is(":visible"), true);
  strictEqual(client.settings.settingResolutionRow.is(":visible"), true);
  strictEqual(client.settings.settingResolutionTypeRow.is(":visible"), true);
  strictEqual(client.settings.settingResolutionDisplayRow.is(":visible"), true);
  strictEqual(client.settings.settingResolutionEncodingRow.is(":visible"), true);
  strictEqual(client.settings.bandwidthLowInput.is(":visible"), true);
  strictEqual(client.settings.bandwidthMedInput.is(":visible"), true);
  strictEqual(client.settings.bandwidthHighInput.is(":visible"), true);
  strictEqual(client.settings.settingBandwidthRow.is(":visible"), true);
  strictEqual(client.settings.settingDisplayNameRow.is(":visible"), true);

  ClientConfig.enableAutoAnswer = false;
  ClientConfig.enableSelfView = false;
  ClientConfig.networkUserId = '12345678';
  ClientConfig.enableHD = false;
  ClientConfig.displayResolution = '960x720';
  ClientConfig.encodingResolution = '960x720';
  ClientConfig.bandwidthLow = '256';
  ClientConfig.bandwidthMed = '1024';
  ClientConfig.bandwidthHigh = '2048';
  ClientConfig.displayName = 'test display name';
  client = new WebRTC.Client();
  client.settings.settingsIcon.trigger('click');
  strictEqual(client.settings.settingAutoAnswerRow.is(":visible"), false);
  strictEqual(client.settings.settingSelfViewDisableRow.is(":visible"), false);
  strictEqual(client.settings.settingUseridRow.is(":visible"), true);
  strictEqual(client.settings.settingHDRow.is(":visible"), false);
  strictEqual(client.settings.settingResolutionRow.is(":visible"), false);
  strictEqual(client.settings.settingResolutionTypeRow.is(":visible"), false);
  strictEqual(client.settings.settingResolutionDisplayRow.is(":visible"), false);
  strictEqual(client.settings.settingResolutionEncodingRow.is(":visible"), false);
  strictEqual(client.settings.bandwidthLowInput.is(":visible"), false);
  strictEqual(client.settings.bandwidthMedInput.is(":visible"), false);
  strictEqual(client.settings.bandwidthHighInput.is(":visible"), false);
  strictEqual(client.settings.settingBandwidthRow.is(":visible"), false);
  strictEqual(client.settings.settingDisplayNameRow.is(":visible"), false);

  delete ClientConfig.displayResolution;
  client = new WebRTC.Client();
  client.settings.settingsIcon.trigger('click');
  strictEqual(client.settings.settingResolutionRow.is(":visible"), true);
  strictEqual(client.settings.settingResolutionTypeRow.is(":visible"), false);
  strictEqual(client.settings.settingResolutionDisplayRow.is(":visible"), true);
  strictEqual(client.settings.settingResolutionEncodingRow.is(":visible"), false);

  delete ClientConfig.encodingResolution;
  ClientConfig.displayResolution = '960x720';
  client = new WebRTC.Client();
  client.settings.settingsIcon.trigger('click');
  strictEqual(client.settings.settingResolutionRow.is(":visible"), true);
  strictEqual(client.settings.settingResolutionTypeRow.is(":visible"), false);
  strictEqual(client.settings.settingResolutionDisplayRow.is(":visible"), false);
  strictEqual(client.settings.settingResolutionEncodingRow.is(":visible"), true);

});