module.exports = require('webrtc-core').bdsft.Model(SMS);

var DateFormat = require('webrtc-core').dateformat;
var Utils = require('webrtc-core').utils;

function InboxItem(sms, message) {
  var self = {};

  self.dateFormat = new DateFormat('%m/%d/%y %H:%M:%S');

  self.getMessageType = function() {
    if (self.message.mmscontentsubtype && self.message.mmscontentsubtype.indexOf('image/') !== -1) {
      return 'image';
    } else if (self.message.mmscontentsubtype && self.message.mmscontentsubtype.indexOf('video/') !== -1) {
      return 'video';
    } else if (self.message.mmscontentsubtype && self.message.mmscontentsubtype.indexOf('audio/') !== -1) {
      return 'audio';
    } else {
      return 'text';
    }
  };

  self.message = message;

  self.messageType = self.getMessageType();
  self.from = message.tn;
  self.id = message.mid;
  self.status = sms.getStatusAsString(message.status);
  self.time = self.dateFormat.format(new Date(message.time));

  var body = message.body.trim();
  if (self.messageType === 'image') {
    self.bodyImageLink = message.mmscontentlocation;
    self.bodyImageText = body;
    if (message.mmscontentthumbnail) {
      self.bodyImageThumbnail = 'data:' + message.mmscontentsubtype + ';base64,' + message.mmscontentthumbnail;
    }
  } else if (self.messageType === 'video') {
    self.bodyVideo = message.mmscontentlocation;
    self.bodyVideoText = body;
  } else if (self.messageType === 'audio') {
    self.bodyAudio = message.mmscontentlocation;
    self.bodyAudioText = body;
  } else {
    self.bodyText = body;
  }

  return self;
};

function SMS(eventbus, debug, smsprovider, sound) {
  var self = {};

  self.props = {'name': true, 'password': true, 'sendTo': true, 'sendBody': true, 'statusText': true, 'type': true, 'inboxItems': true};

  self.getStatusAsString = function(status) {
    if (status === 'N') {
      return "New";
    } else if (status === 'U') {
      return "Unread";
    } else if (status === 'R') {
      return "Read";
    } else if (status === 'L') {
      return "Locked";
    } else if (status === 'D') {
      return "Deleted";
    } else {
      throw new Error('Unsupported status : ' + status);
    }
  };

  self.listeners = function() {
    eventbus.on('smsLoggedIn', function() {
      self.enableUpdate(true);
      smsprovider.readAll(function(msg) {
        self.error("Fetching SMS failed : " + msg);
      });
      self.info("Fetching SMS...");
    });
    eventbus.on('smsSent', function() {
      self.sendBody = '';
      self.sendTo = '';
    });
    eventbus.on('smsReadAll', function(e) {
      var messages = e.messages;

      messages = messages.sort(function(a, b) {
        return b.time - a.time;
      });

      var incomingMessages = $.grep(messages, function(n) {
        return (n.dir === 'I');
      });
      //        var outgoingMessages = $.grep(messages, function( n, i ) {
      //          return ( n.dir === 'O' );
      //        });
      self.updateInbox(incomingMessages);
    });
  };

  self.remove = function(inboxItem) {
    sound.playClick();
    if (!window.confirm("Do you really want to delete SMS from " + inboxItem.from + "?")) {
      return;
    }
    self.info("Deleting SMS...");
    eventbus.smsRemoving(inboxItem);
    smsprovider.remove([inboxItem.id], function() {
      eventbus.smsRemoved(inboxItem);
    }, function(msg) {
      eventbus.smsRemovedFailed(inboxItem);
      self.error("Deleting SMS failed : " + msg);
    });
  };

  self.login = function(name, password) {
    sound.playClick();
    self.info("Logging in...");
    smsprovider.login(name, password, function(msg) {
      self.error("Logging failed : " + msg);
    });
  };

  self.onNotification = function(notifications) {
    var needsRead = false;
    if (!notifications) {
      return;
    }

    for (var i = 0; i < notifications.length; i++) {
      if (notifications[i].action === 'new-rec' || notifications[i].action === 'update' || notifications[i].action === 'delete') {
        needsRead = true;
        break;
      }
    }
    if (needsRead) {
      smsprovider.readAll(function(msg) {
        self.error("Fetching SMS failed : " + msg);
      });
    }
  };

  self.enableUpdate = function(enable) {
    self.enableUpdate = enable;
    self.triggerUpdate();
  };

  self.triggerUpdate = function() {
    if (self.enableUpdate && !self.pendingUpdate) {
      debug('triggering getUpdate');
      self.pendingUpdate = true;
      smsprovider.getUpdate(function(notifications) {
        self.pendingUpdate = false;
        self.onNotification(notifications);
        self.triggerUpdate();
      }, function() {
        self.pendingUpdate = false;
        self.error("Technical problems connecting to server - auto refresh disabled");
      });
    }
  };

  self.sendSMS = function() {
    sound.playClick();
    var msg = self.validateSendForm();
    if (msg !== "") {
      self.error(msg);
      return;
    }
    self.info("Sending SMS...");
    eventbus.smsSending();
    smsprovider.sendSMS([self.sendTo], self.sendBody, function(msg) {
      self.error("Sending SMS failed : " + msg);
    });
  };

  self.validateSendForm = function() {
    var to = self.sendTo;
    var msgs = [];
    if (!to) {
      msgs.push('Please enter a phone number to send to');
    } else if (!Utils.isValidUsPstn(to)) {
      msgs.push(to + ' not a valid US phone number');
    }

    var body = self.sendBody;
    if (body === '') {
      msgs.push('Please enter a text to send');
    }

    return msgs.join('\n');
  };

  self.updateInbox = function(messages) {
    var inboxItems = [];
    for (var i = 0; i < messages.length; i++) {
      var inboxItem = new InboxItem(this, messages[i]);
      inboxItems.push(inboxItem);
    }
    self.inboxItems = inboxItems;
  };

  self.setStatus = function(msg, type) {
    self.type = type;
    self.statusText = msg;
  };

  self.error = function(msg) {
    self.setStatus(msg, "error");
  };

  self.info = function(msg) {
    self.setStatus(msg, "info");
  };

  return self;
}