require('./includes/common');
describe('utils', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
  });
  
  it('isValidUsPstn', function() {
    expect(WebRTC.Utils.isValidUsPstn('240-534-2345')).toEqual( true);
    expect(WebRTC.Utils.isValidUsPstn('1240-534-2345')).toEqual( true);
    expect(WebRTC.Utils.isValidUsPstn('1(240)-(534)-(2345)')).toEqual( true);
    expect(WebRTC.Utils.isValidUsPstn('(240)-(534)-(2345)')).toEqual( true);
    expect(WebRTC.Utils.isValidUsPstn('(240)(534)(2345)')).toEqual( true);
    expect(WebRTC.Utils.isValidUsPstn('22345678908')).toEqual( false);
    expect(WebRTC.Utils.isValidUsPstn('asasdasdas')).toEqual( false);
  });
});