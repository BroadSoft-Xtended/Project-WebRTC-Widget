module( "Utils", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
  }, teardown: function() {
  }
});
test('isValidUsPstn', function() {
  strictEqual(WebRTC.Utils.isValidUsPstn('240-534-2345'), true);
  strictEqual(WebRTC.Utils.isValidUsPstn('1240-534-2345'), true);
  strictEqual(WebRTC.Utils.isValidUsPstn('1(240)-(534)-(2345)'), true);
  strictEqual(WebRTC.Utils.isValidUsPstn('(240)-(534)-(2345)'), true);
  strictEqual(WebRTC.Utils.isValidUsPstn('(240)(534)(2345)'), true);
  strictEqual(WebRTC.Utils.isValidUsPstn('22345678908'), false);
  strictEqual(WebRTC.Utils.isValidUsPstn('asasdasdas'), false);
});
