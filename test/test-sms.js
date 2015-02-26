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
    sms.view.show();
    expect(sms.loginForm.hasClass('hidden')).toEqual(false);
    expect(sms.inbox.hasClass('hidden')).toEqual(true);
    sms.name.val("12345678");
    sms.password.val("9876");
    sms.loginLink.trigger('click');
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
    sms.view.show();
    sms.name.val("12345678");
    sms.password.val("9876");
    sms.loginLink.trigger('click');
    expect(sms.loginForm.hasClass('hidden')).toEqual(true);
    expect(sms.inbox.hasClass('hidden')).toEqual(false);
    expect(readAllCalled).toEqual(true);
  });

  it('received messages', function() {
    client = create(config)
    testUA.mockSMSProvider();
    sms.show();
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
    expect(sms.inboxItems[1].message.mid).toEqual(274907);
    expect(sms.inboxItems[1].from.text()).toEqual("12403649086");
    expect(sms.inboxItems[1].time.text()).toEqual( "03/13/2014 16:23:54");
    expect(sms.inboxItems[1].status.text()).toEqual("New");
    expect(sms.inboxItems[1].bodyText.text()).toEqual("BS: Test sending msg to cpa-dev-prod");
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
    sms.show();
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
    expect(sms.inboxContent.find('#274910').length).toEqual(1);
    sms.inboxItems[0].removeLink.trigger('click');
    expect(sms.inboxContent.find('#274910').length).toEqual(0);
    expect(removeCalled).toEqual(true);
    expect(sms.status.hasClass('hidden')).toEqual(true);
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
    sms.sendButton.trigger('click');
    expect(sms.statusContent.text()).toEqual("Please enter a phone number to send to\nPlease enter a text to send");

    sms.sendTo.val('1234567890');
    sms.sendBody.val('some text');
    sms.sendButton.trigger('click');
    expect(sendToArray).toEqual(['1234567890']);
    expect(sendBody).toEqual('some text');
    expect(sms.status.hasClass('hidden')).toEqual(true);
    expect(sms.sendBody.val()).toEqual('');
    expect(sms.sendTo.val()).toEqual('');
  });
});