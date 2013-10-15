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
test('call if enter pressed on destination input', function() {
  var called = false;
  WebRTC.Client.prototype.call = function(){console.log('call');called = true;};
  client = new WebRTC.Client();
  var event = jQuery.Event("keypress");
  event.keyCode = 13;
  $("#destination").trigger(event);
  ok(called);
});
