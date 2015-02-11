module.exports = require('../factory')(SMSView);

var DateFormat = require('../DateFormat');
var Utils = require('../Utils');

function InboxItem(sms, message) {
  var self = {};

  self.cloned = sms.inboxItemSample.clone(false);
  self.cloned.removeClass('inboxItemSample');
  self.cloned.attr('id', message.mid);
  self.from = self.cloned.find('.from');
  self.status = self.cloned.find('.status');
  self.time = self.cloned.find('.time');
  self.bodyText = self.cloned.find('.body .text');
  self.bodyImageLink = self.cloned.find('.body .image a');
  self.bodyImageText = self.cloned.find('.body .image span');
  self.bodyImageThumbnail = self.cloned.find('.body .image img');
  self.bodyVideo = self.cloned.find('.body .video video');
  self.bodyAudio = self.cloned.find('.body .audio audio');
  self.removeLink = self.cloned.find('.icon-trash');
  self.dateFormat = new DateFormat('%m/%d/%y %H:%M:%S');

  self.listeners = function() {
    self.removeLink.bind('click', function() {
      sms.remove(message, self);
    });
  };
  self.enableActions = function(enable) {
    self.removeLink.attr('disabled', !enable);
  };
  self.updateContent = function(message) {
    var messageType = self.getMessageType(message);
    self.cloned.addClass(messageType);

    self.from.text(message.tn);
    self.status.text(sms.getStatusAsString(message.status));
    self.time.text(self.dateFormat.format(new Date(message.time)));

    var body = message.body.trim();
    if (messageType === 'image') {
      self.bodyImageLink.attr('href', message.mmscontentlocation);
      self.bodyImageText.text(body);
      if (message.mmscontentthumbnail) {
        self.bodyImageThumbnail.attr('src', 'data:' + message.mmscontentsubtype + ';base64,' + message.mmscontentthumbnail);
      }
    } else if (messageType === 'video') {
      self.bodyVideo.attr('src', message.mmscontentlocation);
      self.bodyVideo.text(body);
    } else if (messageType === 'audio') {
      self.bodyAudio.attr('src', message.mmscontentlocation);
      self.bodyAudio.text(body);
    } else {
      self.bodyText.html(body);
    }
  };
  self.getMessageType = function(message) {
    if (message.mmscontentsubtype && message.mmscontentsubtype.indexOf('image/') !== -1) {
      return 'image';
    } else if (message.mmscontentsubtype && message.mmscontentsubtype.indexOf('video/') !== -1) {
      return 'video';
    } else if (message.mmscontentsubtype && message.mmscontentsubtype.indexOf('audio/') !== -1) {
      return 'audio';
    } else {
      return 'text';
    }
  };
  self.remove = function() {
    self.cloned.remove();
  };
  self.appendTo = function(element) {
    self.cloned.appendTo(element);
  };

  self.listeners();

  self.updateContent(message);

  return self;
};

function SMSView(options, eventbus, debug, smsprovider, sound) {
  var self = {};

  self.__proto__ = PopupView(eventbus);

  self.elements = ['status', 'statusContent', 'inbox', 'inboxContent', 'loginForm', 'loginLink', 'name', 'password', 'sendForm',
    'sendTo', 'sendBody', 'sendButton'
  ];
  self.inboxItems = [];

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
      self.onLoggedIn();
    });
    eventbus.on('smsSent', function() {
      self.status.hide();
      self.sendBody.val('');
      self.sendTo.val('');
      self.sendButton.attr('disabled', false);
    });
    eventbus.on('smsReadAll', function(e) {
      self.status.hide();
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

    self.loginLink.bind('click', function(e) {
      e.preventDefault();
      self.login(self.name.val(), self.password.val());
    });
    self.password.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        self.login(self.name.val(), self.password.val());
      }
    });
    self.sendButton.bind('click', function(e) {
      e.preventDefault();
      self.sendSMS();
    });
    self.sendBody.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        self.sendSMS();
      }
    });
  };

  self.remove = function(message, inboxItem) {
    sound.playClick();
    if (!window.confirm("Do you really want to delete SMS from " + message.tn + "?")) {
      return;
    }
    self.info("Deleting SMS...");
    if (inboxItem) {
      inboxItem.enableActions(false);
    }
    smsprovider.remove([message.mid], function() {
      self.status.hide();
      inboxItem.remove();
    }, function(msg) {
      self.error("Deleting SMS failed : " + msg);
      inboxItem.enableActions(true);
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
    self.sendButton.attr("disabled", true);
    smsprovider.sendSMS([self.sendTo.val()], self.sendBody.val(), function(msg) {
      self.sendButton.attr("disabled", false);
      self.error("Sending SMS failed : " + msg);
    });
  };

  self.validateSendForm = function() {
    var to = self.sendTo.val();
    var msgs = [];
    if (to === '') {
      msgs.push('Please enter a phone number to send to');
    } else if (!Utils.isValidUsPstn(to)) {
      msgs.push(to + ' not a valid US phone number');
    }

    var body = self.sendBody.val();
    if (body === '') {
      msgs.push('Please enter a text to send');
    }

    return msgs.join('\n');
  };

  self.onLoggedIn = function() {
    self.loginForm.hide();
    self.inbox.show();
    self.sendForm.show();
    self.enableUpdate(true);
    smsprovider.readAll(function(msg) {
      self.error("Fetching SMS failed : " + msg);
    });
    self.info("Fetching SMS...");
  };

  self.updateInbox = function(messages) {
    self.inboxContent.html('');
    self.inboxItems = [];
    for (var i = 0; i < messages.length; i++) {
      var inboxItem = new InboxItem(this, messages[i]);
      inboxItem.appendTo(self.inboxContent);
      self.inboxItems.push(inboxItem);
    }
  };

  self.setStatus = function(msg, type) {
    self.status.show();
    self.status.attr("class", type);
    self.statusContent.text(msg);
  };

  self.error = function(msg) {
    self.setStatus(msg, "error");
  };

  self.info = function(msg) {
    self.setStatus(msg, "info");
  };

  return self;
}