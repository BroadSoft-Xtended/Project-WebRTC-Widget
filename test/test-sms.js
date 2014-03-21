module( "SMS", {
  setup: function() {
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.mockSound();
    TestWebrtc.Helpers.mockSMSProvider();
    ClientConfig.smsEnabled = true;
  }, teardown: function() {
    ClientConfig.smsEnabled = false;
  }
});

test('loginLink clicked', function() {
  client = new WebRTC.Client();
  var loginName = "", loginPassword = "";
  client.sms.smsProvider.login = function(name, password) {
    loginName = name;
    loginPassword = password;
  };
  client.sms.view.show();
  strictEqual(client.sms.loginForm.is(':visible'), true);
  strictEqual(client.sms.inbox.is(':visible'), false);
  client.sms.nameInput.val("12345678");
  client.sms.passwordInput.val("9876");
  client.sms.loginLink.trigger('click');
  strictEqual(loginName, '12345678');
  strictEqual(loginPassword, '9876');
});

test('login successful', function() {
  client = new WebRTC.Client();
  var readAllCalled = false;
  client.sms.smsProvider.readAll = function() {
    readAllCalled = true;
  };
  client.sms.smsProvider.login = function(name, password) {
    client.eventBus.smsLoggedIn(client.sms);
  };
  client.sms.nameInput.val("12345678");
  client.sms.passwordInput.val("9876");
  client.sms.loginLink.trigger('click');
  strictEqual(client.sms.loginForm.is(':visible'), false);
  strictEqual(client.sms.inbox.is(':visible'), true);
  strictEqual(readAllCalled, true);
});

test('received messages', function() {
  client = new WebRTC.Client();
  client.eventBus.smsLoggedIn(client.sms);
  client.eventBus.smsReadAll(client.sms, {messages: [
    {"mid":274907,"type":"sms","time":1394749434000,"stime":1394749434000,"status":"N","body":"BS: Test sending msg to cpa-dev-prod ","tn":"12403649086","rawtn":"12403649086","name":"","dir":"I"},
    {"mid":274910,"type":"sms","time":1394749434005,"stime":1394749434005,"status":"N","body":"BS: Test sending msg to cpa-dev-prod 2","tn":"12403649086","rawtn":"12403649086","name":"","dir":"I"},
    {"mid":274905,"type":"sms","time":1394749314000,"stime":1394749314000,"status":"R","body":"BS: Test sending msg to cca-prod ","tn":"12403649086","rawtn":"12403649086","name":"","dir":"O"}
  ]});
  strictEqual(client.sms.inboxItems.length, 2);
  strictEqual(client.sms.inboxItems[1].message.mid, 274907);
  strictEqual(client.sms.inboxItems[1].from.text(), "12403649086");
  strictEqual(client.sms.inboxItems[1].status.text(), "New");
  strictEqual(client.sms.inboxItems[1].time.text(), "03/13/2014 16:23:54");
  strictEqual(client.sms.inboxItems[1].bodyText.text(), "BS: Test sending msg to cpa-dev-prod");
});

test('delete message', function() {
  client = new WebRTC.Client();
  var removeCalled = false;
  window.confirm = function(){ return true;}
  client.sms.smsProvider.remove = function(mids, onSuccess, onFailure) {
    removeCalled = true;
    onSuccess();
  };

  client.eventBus.smsLoggedIn(client.sms);
  client.eventBus.smsReadAll(client.sms, {messages: [
    {"mid":274907,"type":"sms","time":1394749434000,"stime":1394749434000,"status":"N","body":"BS: Test sending msg to cpa-dev-prod ","tn":"12403649086","rawtn":"12403649086","name":"","dir":"I"},
    {"mid":274910,"type":"sms","time":1394749434005,"stime":1394749434005,"status":"N","body":"BS: Test sending msg to cpa-dev-prod 2","tn":"12403649086","rawtn":"12403649086","name":"","dir":"I"},
    {"mid":274905,"type":"sms","time":1394749314000,"stime":1394749314000,"status":"R","body":"BS: Test sending msg to cca-prod ","tn":"12403649086","rawtn":"12403649086","name":"","dir":"O"}
  ]});
  strictEqual($('#274910').length, 1);
  client.sms.inboxItems[0].removeLink.trigger('click');
  strictEqual($('#274910').length, 0);
  strictEqual(removeCalled, true);
  strictEqual(client.sms.status.is(':visible'), false);
});

test('send message', function() {
  client = new WebRTC.Client();
  var sendToArray = "", sendBody = "";
  client.sms.smsProvider.sendSMS = function(toArray, body) {
    sendToArray = toArray;
    sendBody = body;
    client.eventBus.smsSent(client.sms);
  };
  client.eventBus.smsLoggedIn(client.sms);
  client.sms.sendButton.trigger('click');
  strictEqual(client.sms.statusContent.text(), "Please enter a phone number to send to\nPlease enter a text to send");

  client.sms.sendTo.val('1234567890');
  client.sms.sendBody.val('some text');
  client.sms.sendButton.trigger('click');
  deepEqual(sendToArray, ['1234567890']);
  strictEqual(sendBody, 'some text');
  strictEqual(client.sms.status.is(':visible'), false);
  strictEqual(client.sms.sendBody.val(), '');
  strictEqual(client.sms.sendTo.val(), '');
});