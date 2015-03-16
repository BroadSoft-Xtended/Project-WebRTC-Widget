require('./includes/common');
describe('mocha tests', function () {

  beforeEach(function () {
    setUp();
    testUA.mockWebRTC();
    config = {domainTo: 'domain.to', domainFrom: 'domain.from', 
        enableRegistrationIcon: true, enableSMS: false, enableXMPP: false, register: false};
    client = create(config);   
  });
  afterEach(function(){
    tearDown();
  });

  it('on 403 : with settingUserId:', function () {
    settings.userid = '12345';
    // settings.userid = '12345';
    testUA.connect();
    expect(authenticationview.visible).toEqual(false);
    testUA.registrationFailed(403);
    expect(authenticationview.visible).toEqual( true);
    expect(authenticationview.userid.val()).toEqual( '12345');
    expect(authenticationview.authUserid.val()).toEqual( '');
    expect(authenticationview.password.val()).toEqual( '');
    testUA.val(authenticationview.password, "121212");
    authenticationview.ok.trigger("click");
    expect(authenticationview.visible).toEqual( false);
    expect(sipstack.ua.configuration.uri.toString()).toEqual( 'sip:12345@' + config.domainFrom);
    expect(sipstack.ua.configuration.authorization_user).toEqual( '12345');
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId : '+settings.userid);
    expect(settings.authenticationUserid).toEqual(undefined, 'should NOT set settings authenticationUserId : '+settings.authenticationUserid);
    expect(settings.password).toEqual(undefined, 'should NOT set settings password : '+settings.password);
    testUA.registered();
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId : '+settings.userid);
    expect(settings.authenticationUserid).toEqual(undefined, 'should NOT set settings authenticationUserId as same as userId : '+settings.authenticationUserid);
    expect(settings.password).toEqual('121212', 'should set settings password : '+settings.password);
  });

  it('on 403 : with settingUserId and settingAuthenticationUserId', function() {
    settings.userid = '12345';
    settings.authenticationUserid = '54321';
    settings.password = '';
    testUA.connect();
    expect(authenticationview.visible).toEqual( false);
    testUA.registrationFailed(403);
    expect(authenticationview.visible).toEqual( true);
    expect(authenticationview.authUserid.val()).toEqual( '54321');
    expect(authenticationview.password.val()).toEqual( '');
    testUA.val(authenticationview.password, "121212");
    expect(authentication.password).toEqual('121212');
    authenticationview.ok.trigger("click");
    expect(authenticationview.visible).toEqual( false);
    expect(sipstack.ua.configuration.uri.toString()).toEqual( 'sip:12345@' + config.domainFrom);
    expect(sipstack.ua.configuration.authorization_user).toEqual( '54321');
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId');
    expect(settings.authenticationUserid).toEqual('54321', 'should NOT change settings authenticationUserId');
    expect(settings.password).toEqual('', 'should NOT set settings password : '+settings.password);
    testUA.registered();
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId');
    expect(settings.authenticationUserid).toEqual('54321', 'should NOT change settings authenticationUserId as same as userId');
    expect(settings.password).toEqual('121212', 'should set settings password');
  });

  it('on 403 : with settingUserId and authUserId changed', function() {
    settings.userid = '12345';
    testUA.connect();
    testUA.registrationFailed(403);
    testUA.val(authenticationview.authUserid, "54321");
    testUA.val(authenticationview.password, "121212");
    authenticationview.ok.trigger("click");
    expect(sipstack.ua.configuration.authorization_user).toEqual( '54321');
    testUA.registered();
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId');
    expect(settings.authenticationUserid).toEqual('54321', 'should set settings authenticationUserId');
    expect(settings.password).toEqual('121212', 'should set settings password');
  });

  it('on 403 : with settingUserId and userId and authUserId changed', function() {
    settings.userid = '12345';
    testUA.connect();
    testUA.registrationFailed(403);
    testUA.val(authenticationview.userid, "23456");
    testUA.val(authenticationview.authUserid, "54321");
    testUA.val(authenticationview.password, "121212");
    authenticationview.ok.trigger("click");
    expect(sipstack.ua.configuration.uri.toString()).toEqual( 'sip:23456@' + config.domainFrom);
    expect(sipstack.ua.configuration.authorization_user).toEqual( '54321');
    testUA.registered();
    expect(settings.userid).toEqual('23456', 'should change settings userId');
    expect(settings.authenticationUserid).toEqual('54321', 'should set settings authenticationUserId');
    expect(settings.password).toEqual('121212', 'should set settings password');
  });

  it('on 403 : with settingUserId and settingsAuthenticationUserId and userId changed', function() {
    settings.userid = '12345';
    settings.authenticationUserid = '54321';
    testUA.connect();
    testUA.registrationFailed(403);
    testUA.val(authenticationview.authUserid, "98765");
    testUA.val(authenticationview.password, "121212");
    authenticationview.ok.trigger("click");
    expect(sipstack.ua.configuration.authorization_user).toEqual( '98765');
    testUA.registered();
    expect(settings.userid).toEqual('12345', 'should NOT change settings userId');
    expect(settings.authenticationUserid).toEqual('98765', 'should change settings authenticationUserId');
    expect(settings.password).toEqual('121212', 'should set settings password');
  });

  it('on 403 : with settingPassword and settingUserId', function() {
    settings.userid = '12345';
    settings.password = 'password';
    testUA.connect();
    expect(authenticationview.visible).toEqual( false);
    testUA.registrationFailed(403);
    expect(authenticationview.visible).toEqual( false);
  });

  it('on 403 : with settingAuthenticationUserId and settingPassword and settingUserId', function() {
    settings.userid = '12345';
    settings.authenticationUserid = '54321';
    settings.password = 'password';
    testUA.connect();
    expect(authenticationview.visible).toEqual( false);
    testUA.registrationFailed(403);
    expect(authenticationview.visible).toEqual( false);
  });

  it('on non 403', function() {
    $.cookie('settingUserId', '12345');
    testUA.connect();
    expect(authenticationview.visible).toEqual( false);
    testUA.registrationFailed(404);
    expect(authenticationview.visible).toEqual( false);
  });
});