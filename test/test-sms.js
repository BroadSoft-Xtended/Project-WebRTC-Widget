require('./includes/common');
describe('SMS', function() {

  beforeEach(function() {
    setUp();
    testUA.mockWebRTC();
    testUA.mockSound();
    config = {
      smsEnabled: true
    };
  });

  it('loginLink clicked', function() {
    client = create(config)
    testUA.mockSMSProvider();
    var loginName = "",
      loginPassword = "";
    smsprovider.login = function(name, password) {
      loginName = name;
      loginPassword = password;
    };
    smsview.view.show();
    expect(smsview.loginForm.hasClass('hidden')).toEqual(false);
    expect(smsview.inbox.hasClass('hidden')).toEqual(true);
    smsview.name.val("12345678");
    smsview.password.val("9876");
    smsview.loginLink.trigger('click');
    expect(loginName).toEqual('12345678');
    expect(loginPassword).toEqual('9876');
  });

  it('login successful', function() {
    client = create(config)
    testUA.mockSMSProvider();
    var readAllCalled = false;
    smsprovider.readAll = function() {
      readAllCalled = true;
    };
    smsprovider.login = function(name, password) {
      eventbus.emit('smsLoggedIn');
    };
    smsview.view.show();
    smsview.name.val("12345678");
    smsview.password.val("9876");
    smsview.loginLink.trigger('click');
    expect(smsview.loginForm.hasClass('hidden')).toEqual(true);
    expect(smsview.inbox.hasClass('hidden')).toEqual(false);
    expect(readAllCalled).toEqual(true);
  });

  it('received messages', function() {
    client = create(config)
    testUA.mockSMSProvider();
    smsview.show();
    eventbus.emit('smsLoggedIn');
    eventbus.emit('smsReadAll', {
      messages: [{
        "mid": 274907,
        "type": "sms",
        "time": 1394749434000,
        "stime": 1394749434000,
        "status": "N",
        "body": "BS: Test sending msg to cpa-dev-prod ",
        "tn": "12403649086",
        "rawtn": "12403649086",
        "name": "",
        "dir": "I"
      }, {
        "mid": 274910,
        "type": "sms",
        "time": 1394749434005,
        "stime": 1394749434005,
        "status": "N",
        "body": "BS: Test sending msg to cpa-dev-prod 2",
        "tn": "12403649086",
        "rawtn": "12403649086",
        "name": "",
        "dir": "I"
      }, {
        "mid": 274905,
        "type": "sms",
        "time": 1394749314000,
        "stime": 1394749314000,
        "status": "R",
        "body": "BS: Test sending msg to cca-prod ",
        "tn": "12403649086",
        "rawtn": "12403649086",
        "name": "",
        "dir": "O"
      }]
    });
    expect(sms.inboxItems.length).toEqual(2);
    expect(sms.inboxItems[1].id).toEqual(274907);
    expect(sms.inboxItems[1].from).toEqual("12403649086");
    expect(sms.inboxItems[1].time).toEqual( "03/13/2014 16:23:54");
    expect(sms.inboxItems[1].status).toEqual("New");
    expect(sms.inboxItems[1].bodyText).toEqual("BS: Test sending msg to cpa-dev-prod");
  });

  it('delete message', function() {
    client = create(config)
    testUA.mockSMSProvider();
    var removeCalled = false;
    window.confirm = function() {
      return true;
    }
    smsprovider.remove = function(mids, onSuccess, onFailure) {
      removeCalled = true;
      onSuccess();
    };
    smsview.show();
    eventbus.emit('smsLoggedIn');
    eventbus.emit('smsReadAll', {
      messages: [{
        "mid": 274907,
        "type": "sms",
        "time": 1394749434000,
        "stime": 1394749434000,
        "status": "N",
        "body": "BS: Test sending msg to cpa-dev-prod ",
        "tn": "12403649086",
        "rawtn": "12403649086",
        "name": "",
        "dir": "I"
      }, {
        "mid": 274910,
        "type": "sms",
        "time": 1394749434005,
        "stime": 1394749434005,
        "status": "N",
        "body": "BS: Test sending msg to cpa-dev-prod 2",
        "tn": "12403649086",
        "rawtn": "12403649086",
        "name": "",
        "dir": "I"
      }, {
        "mid": 274905,
        "type": "sms",
        "time": 1394749314000,
        "stime": 1394749314000,
        "status": "R",
        "body": "BS: Test sending msg to cca-prod ",
        "tn": "12403649086",
        "rawtn": "12403649086",
        "name": "",
        "dir": "O"
      }]
    });
    expect(smsview.inboxContent.find('#274910').length).toEqual(1);
    smsview.inboxContent.find('#274910 .icon-trash').trigger('click');
    expect(smsview.inboxContent.find('#274910').length).toEqual(0);
    expect(removeCalled).toEqual(true);
    expect(smsview.status.hasClass('hidden')).toEqual(true);
  });

  it('send message', function() {
    client = create(config)
    testUA.mockSMSProvider();
    var sendToArray = "",
      sendBody = "";
    smsprovider.sendSMS = function(toArray, body) {
      sendToArray = toArray;
      sendBody = body;
      eventbus.emit('smsSent');
    };
    eventbus.emit('smsLoggedIn');
    smsview.sendButton.trigger('click');
    expect(smsview.statusContent.text()).toEqual("Please enter a phone number to send to\nPlease enter a text to send");

    smsview.sendTo.val('1234567890');
    smsview.sendBody.val('some text');
    smsview.sendButton.trigger('click');
    expect(sendToArray).toEqual(['1234567890']);
    expect(sendBody).toEqual('some text');
    expect(smsview.status.hasClass('hidden')).toEqual(true);
    expect(smsview.sendBody.val()).toEqual('');
    expect(smsview.sendTo.val()).toEqual('');
  });
});