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