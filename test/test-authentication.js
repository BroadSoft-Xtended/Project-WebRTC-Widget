require('./includes/common');
describe('mocha tests', function () {

  before(function () {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {
      console.log("enableLocalAudio : " + enable);
    }
    config = {domainTo: 'domain.to', domainFrom: 'domain.from', 
        enableRegistrationIcon: true, enableSMS: false, enableXMPP: false, register: false};
    client = create(config);   
  });

  it('on 403 : with settingUserId', function () {
    settings.userid = '12345';
    // settings.userid = '12345';
    testUA.connect();
    expect(authentication.visible).toEqual(false);
    testUA.registrationFailed(403);
    expect(authentication.visible).toEqual( true);
    expect(authentication.userid.val()).toEqual( '12345');
    expect(authentication.authUserid.val()).toEqual( '');
    expect(authentication.password.val()).toEqual( '');
    authentication.password.val("121212");
    authentication.ok.trigger("click");
    expect(authentication.visible).toEqual( false);
    expect(sipstack.ua.configuration.uri.toString()).toEqual( 'sip:12345@' + config.domainFrom);
    expect(sipstack.ua.configuration.authorization_user).toEqual( '12345');
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId : '+settings.userid);
    expect(settings.authenticationUserid).toEqual(undefined, 'should NOT set settings authenticationUserId : '+settings.authenticationUserid);
    expect(settings.password).toEqual(undefined, 'should NOT set settings password : '+settings.password);
    testUA.registered();
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId : '+settings.userid);
    expect(settings.authenticationUserid).toEqual(undefined, 'should NOT set settings authenticationUserId as same as userId : '+settings.authenticationUserid);
    expect(settings.password).toEqual('121212', 'should set settings password : '+settings.password);
    tearDown();
  });

  it('on 403 : with settingUserId and settingAuthenticationUserId', function() {
    settings.userid = '12345';
    settings.authenticationUserid = '54321';
    authentication.password.val('');
    testUA.connect();
    expect(authentication.visible).toEqual( false);
    testUA.registrationFailed(403);
    expect(authentication.visible).toEqual( true);
    expect(authentication.authUserid.val()).toEqual( '54321');
    expect(authentication.password.val()).toEqual( '');
    authentication.password.val("121212");
    authentication.ok.trigger("click");
    expect(authentication.visible).toEqual( false);
    expect(sipstack.ua.configuration.uri.toString()).toEqual( 'sip:12345@' + config.domainFrom);
    expect(sipstack.ua.configuration.authorization_user).toEqual( '54321');
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId');
    expect(settings.authenticationUserid).toEqual('54321', 'should NOT change settings authenticationUserId');
    expect(settings.password).toEqual(null, 'should NOT set settings password : '+settings.password);
    testUA.registered();
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId');
    expect(settings.authenticationUserid).toEqual('54321', 'should NOT change settings authenticationUserId as same as userId');
    expect(settings.password).toEqual('121212', 'should set settings password');
    tearDown();
  });

  it('on 403 : with settingUserId and authUserId changed', function() {
    settings.userid = '12345';
    testUA.connect();
    testUA.registrationFailed(403);
    authentication.authUserid.val("54321");
    authentication.password.val("121212");
    authentication.ok.trigger("click");
    expect(sipstack.ua.configuration.authorization_user).toEqual( '54321');
    testUA.registered();
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId');
    expect(settings.authenticationUserid).toEqual('54321', 'should set settings authenticationUserId');
    expect(settings.password).toEqual('121212', 'should set settings password');
    tearDown();
  });

  it('on 403 : with settingUserId and userId and authUserId changed', function() {
    settings.userid = '12345';
    testUA.connect();
    testUA.registrationFailed(403);
    authentication.userid.val("23456");
    authentication.authUserid.val("54321");
    authentication.password.val("121212");
    authentication.ok.trigger("click");
    expect(sipstack.ua.configuration.uri.toString()).toEqual( 'sip:23456@' + config.domainFrom);
    expect(sipstack.ua.configuration.authorization_user).toEqual( '54321');
    testUA.registered();
    expect(settings.userid).toEqual('23456', 'should change settings userId');
    expect(settings.authenticationUserid).toEqual('54321', 'should set settings authenticationUserId');
    expect(settings.password).toEqual('121212', 'should set settings password');
    tearDown();
  });

  it('on 403 : with settingUserId and settingsAuthenticationUserId and userId changed', function() {
    settings.userid = '12345';
    settings.authenticationUserid = '54321';
    testUA.connect();
    testUA.registrationFailed(403);
    authentication.authUserid.val("98765");
    authentication.password.val("121212");
    authentication.ok.trigger("click");
    expect(sipstack.ua.configuration.authorization_user).toEqual( '98765');
    testUA.registered();
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId');
    expect(settings.authenticationUserid).toEqual('98765', 'should change settings authenticationUserId');
    expect(settings.password).toEqual('121212', 'should set settings password');
    tearDown();
  });

  it('on 403 : with settingPassword and settingUserId', function() {
    settings.userid = '12345';
    settings.password = 'password';
    testUA.connect();
    expect(authentication.visible).toEqual( false);
    testUA.registrationFailed(403);
    expect(authentication.visible).toEqual( false);
    tearDown();
  });

  it('on 403 : with settingAuthenticationUserId and settingPassword and settingUserId', function() {
    settings.userid = '12345';
    settings.authenticationUserid = '54321';
    settings.password = 'password';
    testUA.connect();
    expect(authentication.visible).toEqual( false);
    testUA.registrationFailed(403);
    expect(authentication.visible).toEqual( false);
    tearDown();
  });

  it('on non 403', function() {
    $.cookie('settingUserId', '12345');
    testUA.connect();
    expect(authentication.visible).toEqual( false);
    testUA.registrationFailed(404);
    expect(authentication.visible).toEqual( false);
    tearDown();
  });
});