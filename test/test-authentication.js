require('./includes/common');
describe('mocha tests', function () {

  before(function () {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    ClientConfig.domainTo = "domain.to";
    ClientConfig.domainFrom = "domain.from";
    ClientConfig.enableRegistrationIcon = true;
    ClientConfig.enableSMS = false;
    ClientConfig.enableXMPP = false;
    ClientConfig.register = false;
    WebRTC.Sound.prototype.enableLocalAudio = function(enable) {
      console.log("enableLocalAudio : " + enable);
    }
    client = new WebRTC.Client(ClientConfig, '#testWrapper');   
  });

  it('on 403 : with settingUserId', function () {
    client.settings.userId('12345');
    testUA.connect();
    expect(client.authentication.visible).toEqual(false);
    testUA.registrationFailed(403);
    expect(client.authentication.visible).toEqual( true);
    expect(client.authentication.userIdInput.val()).toEqual( '12345');
    expect(client.authentication.authUserIdInput.val()).toEqual( '');
    expect(client.authentication.passwordInput.val()).toEqual( '');
    client.authentication.passwordInput.val("121212");
    client.authentication.okButton.trigger("click");
    expect(client.authentication.visible).toEqual( false);
    expect(client.sipStack.ua.configuration.uri.toString()).toEqual( 'sip:12345@' + ClientConfig.domainFrom);
    expect(client.sipStack.ua.configuration.authorization_user).toEqual( '12345');
    expect(client.settings.userId()).toEqual('12345', 'should NOT change settings userId');
    expect(client.settings.authenticationUserId()).toEqual('', 'should NOT set settings authenticationUserId');
    expect(client.settings.password()).toEqual('', 'should NOT set settings password');
    testUA.registered();
    expect(client.settings.userId()).toEqual('12345', 'should NOT change settings userId');
    expect(client.settings.authenticationUserId()).toEqual('', 'should NOT set settings authenticationUserId as same as userId');
    expect(client.settings.password()).toEqual('121212', 'should set settings password');
    tearDown();
  });

  it('on 403 : with settingUserId and settingAuthenticationUserId', function() {
    client.settings.userId('12345');
    client.settings.authenticationUserId('54321');
    client.authentication.passwordInput.val('');
    testUA.connect();
    expect(client.authentication.visible).toEqual( false);
    testUA.registrationFailed(403);
    expect(client.authentication.visible).toEqual( true);
    expect(client.authentication.authUserIdInput.val()).toEqual( '54321');
    expect(client.authentication.passwordInput.val()).toEqual( '');
    client.authentication.passwordInput.val("121212");
    client.authentication.okButton.trigger("click");
    expect(client.authentication.visible).toEqual( false);
    expect(client.sipStack.ua.configuration.uri.toString()).toEqual( 'sip:12345@' + ClientConfig.domainFrom);
    expect(client.sipStack.ua.configuration.authorization_user).toEqual( '54321');
    expect(client.settings.userId()).toEqual('12345', 'should NOT change settings userId');
    expect(client.settings.authenticationUserId()).toEqual('54321', 'should NOT change settings authenticationUserId');
    expect(client.settings.password()).toEqual('', 'should NOT set settings password');
    testUA.registered();
    expect(client.settings.userId()).toEqual('12345', 'should NOT change settings userId');
    expect(client.settings.authenticationUserId()).toEqual('54321', 'should NOT change settings authenticationUserId as same as userId');
    expect(client.settings.password()).toEqual('121212', 'should set settings password');
    tearDown();
  });

  it('on 403 : with settingUserId and authUserId changed', function() {
    client.settings.userId('12345');
    testUA.connect();
    testUA.registrationFailed(403);
    client.authentication.authUserIdInput.val("54321");
    client.authentication.passwordInput.val("121212");
    client.authentication.okButton.trigger("click");
    expect(client.sipStack.ua.configuration.authorization_user).toEqual( '54321');
    testUA.registered();
    expect(client.settings.userId()).toEqual('12345', 'should NOT change settings userId');
    expect(client.settings.authenticationUserId()).toEqual('54321', 'should set settings authenticationUserId');
    expect(client.settings.password()).toEqual('121212', 'should set settings password');
    tearDown();
  });

  it('on 403 : with settingUserId and userId and authUserId changed', function() {
    client.settings.userId('12345');
    testUA.connect();
    testUA.registrationFailed(403);
    client.authentication.userIdInput.val("23456");
    client.authentication.authUserIdInput.val("54321");
    client.authentication.passwordInput.val("121212");
    client.authentication.okButton.trigger("click");
    expect(client.sipStack.ua.configuration.uri.toString()).toEqual( 'sip:23456@' + ClientConfig.domainFrom);
    expect(client.sipStack.ua.configuration.authorization_user).toEqual( '54321');
    testUA.registered();
    expect(client.settings.userId()).toEqual('23456', 'should change settings userId');
    expect(client.settings.authenticationUserId()).toEqual('54321', 'should set settings authenticationUserId');
    expect(client.settings.password()).toEqual('121212', 'should set settings password');
    tearDown();
  });

  it('on 403 : with settingUserId and settingsAuthenticationUserId and userId changed', function() {
    client.settings.userId('12345');
    client.settings.authenticationUserId('54321');
    testUA.connect();
    testUA.registrationFailed(403);
    client.authentication.authUserIdInput.val("98765");
    client.authentication.passwordInput.val("121212");
    client.authentication.okButton.trigger("click");
    expect(client.sipStack.ua.configuration.authorization_user).toEqual( '98765');
    testUA.registered();
    expect(client.settings.userId()).toEqual('12345', 'should NOT change settings userId');
    expect(client.settings.authenticationUserId()).toEqual('98765', 'should change settings authenticationUserId');
    expect(client.settings.password()).toEqual('121212', 'should set settings password');
    tearDown();
  });

  it('on 403 : with settingPassword and settingUserId', function() {
    client.settings.userId('12345');
    client.settings.password('password');
    testUA.connect();
    expect(client.authentication.visible).toEqual( false);
    testUA.registrationFailed(403);
    expect(client.authentication.visible).toEqual( false);
    tearDown();
  });

  it('on 403 : with settingAuthenticationUserId and settingPassword and settingUserId', function() {
    client.settings.userId('12345');
    client.settings.authenticationUserId('54321');
    client.settings.password('password');
    testUA.connect();
    expect(client.authentication.visible).toEqual( false);
    testUA.registrationFailed(403);
    expect(client.authentication.visible).toEqual( false);
    tearDown();
  });

  it('on non 403', function() {
    $.cookie('settingUserId', '12345');
    testUA.connect();
    expect(client.authentication.visible).toEqual( false);
    testUA.registrationFailed(404);
    expect(client.authentication.visible).toEqual( false);
    tearDown();
  });
});