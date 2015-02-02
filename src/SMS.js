module.exports = SMS;

var events = require('events');
var debug = require('debug')('sms');
var SMSProvider = require('./SMSProvider');
var DateFormat = require('./DateFormat');
var Utils = require('./Utils');

function SMS(element, sound) {
  this.sound = sound;

  this.view = element;
  this.status = element.find(".smsStatus");
  this.statusContent = this.status.find(".content");
  this.inbox = element.find(".smsInbox");
  this.inboxContent = this.inbox.find(".content");
  this.loginForm = element.find(".smsLoginForm");
  this.loginLink = element.find(".smsLogin");
  this.nameInput = element.find(".smsName");
  this.passwordInput = element.find(".smsPassword");
  this.sendForm = element.find(".smsSendForm");
  this.sendTo = element.find(".smsSendTo");
  this.sendBody = element.find(".smsSendBody");
  this.sendButton = element.find(".smsSendButton");
  this.inboxItems = [];

  this.smsProvider = new SMSProvider();
  this.toggled = false;

  this.registerListeners();
}

SMS.InboxItem = function(sms, message) {
  this.sms = sms;
  this.message = message;
  this.cloned = sms.view.find(".sms-inbox-item-sample").clone(false);
  this.cloned.removeClass('sms-inbox-item-sample');
  this.cloned.attr('id', message.mid);
  this.from = this.cloned.find('.from');
  this.status = this.cloned.find('.status');
  this.time = this.cloned.find('.time');
  this.bodyText = this.cloned.find('.body .text');
  this.bodyImageLink = this.cloned.find('.body .image a');
  this.bodyImageText = this.cloned.find('.body .image span');
  this.bodyImageThumbnail = this.cloned.find('.body .image img');
  this.bodyVideo = this.cloned.find('.body .video video');
  this.bodyAudio = this.cloned.find('.body .audio audio');
  this.removeLink = this.cloned.find('.icon-trash');
  this.dateFormat = new DateFormat('%m/%d/%y %H:%M:%S');

  this.registerListeners();

  this.updateContent(message);

  return this;
};

SMS.InboxItem.prototype = {
  registerListeners: function() {
    var self = this;
    this.removeLink.bind('click', function() {
      self.sms.remove(self.message, self);
    });
  },
  enableActions: function(enable) {
    this.removeLink.attr('disabled', !enable);
  },
  updateContent: function(message) {
    var messageType = this.getMessageType(message);
    this.cloned.addClass(messageType);

    this.from.text(message.tn);
    this.status.text(SMS.getStatusAsString(message.status));
    this.time.text(this.dateFormat.format(new Date(message.time)));

    var body = message.body.trim();
    if (messageType === 'image') {
      this.bodyImageLink.attr('href', message.mmscontentlocation);
      this.bodyImageText.text(body);
      if (message.mmscontentthumbnail) {
        this.bodyImageThumbnail.attr('src', 'data:' + message.mmscontentsubtype + ';base64,' + message.mmscontentthumbnail);
      }
    } else if (messageType === 'video') {
      this.bodyVideo.attr('src', message.mmscontentlocation);
      this.bodyVideo.text(body);
    } else if (messageType === 'audio') {
      this.bodyAudio.attr('src', message.mmscontentlocation);
      this.bodyAudio.text(body);
    } else {
      this.bodyText.html(body);
    }
  },
  getMessageType: function(message) {
    if (message.mmscontentsubtype && message.mmscontentsubtype.indexOf('image/') !== -1) {
      return 'image';
    } else if (message.mmscontentsubtype && message.mmscontentsubtype.indexOf('video/') !== -1) {
      return 'video';
    } else if (message.mmscontentsubtype && message.mmscontentsubtype.indexOf('audio/') !== -1) {
      return 'audio';
    } else {
      return 'text';
    }
  },
  remove: function() {
    this.cloned.remove();
  },
  appendTo: function(element) {
    this.cloned.appendTo(element);
  }
};

SMS.getStatusAsString = function(status) {
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

SMS.prototype = {
  registerListeners: function() {
    var self = this;

    events.on('smsLoggedIn', function() {
      self.onLoggedIn();
    });
    events.on('smsSent', function() {
      self.status.hide();
      self.sendBody.val('');
      self.sendTo.val('');
      self.sendButton.attr('disabled', false);
    });
    events.on('smsReadAll', function(e) {
      self.status.hide();
      var messages = e.data.messages;

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

    this.loginLink.bind('click', function(e) {
      e.preventDefault();
      self.login(self.nameInput.val(), self.passwordInput.val());
    });
    this.passwordInput.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        self.login(self.nameInput.val(), self.passwordInput.val());
      }
    });
    this.sendButton.bind('click', function(e) {
      e.preventDefault();
      self.sendSMS();
    });
    this.sendBody.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        self.sendSMS();
      }
    });
  },

  remove: function(message, inboxItem) {
    var self = this;
    this.sound.playClick();
    if (!window.confirm("Do you really want to delete SMS from " + message.tn + "?")) {
      return;
    }
    this.info("Deleting SMS...");
    if (inboxItem) {
      inboxItem.enableActions(false);
    }
    this.smsProvider.remove([message.mid], function() {
      self.status.hide();
      inboxItem.remove();
    }, function(msg) {
      self.error("Deleting SMS failed : " + msg);
      inboxItem.enableActions(true);
    });
  },

  login: function(name, password) {
    var self = this;
    this.sound.playClick();
    this.info("Logging in...");
    this.smsProvider.login(name, password, function(msg) {
      self.error("Logging failed : " + msg);
    });
  },

  onNotification: function(notifications) {
    var needsRead = false,
      self = this;
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
      this.smsProvider.readAll(function(msg) {
        self.error("Fetching SMS failed : " + msg);
      });
    }
  },

  enableUpdate: function(enable) {
    this.enableUpdate = enable;
    this.triggerUpdate();
  },

  triggerUpdate: function() {
    var self = this;
    if (this.enableUpdate && !this.pendingUpdate) {
      debug('triggering getUpdate');
      this.pendingUpdate = true;
      this.smsProvider.getUpdate(function(notifications) {
        self.pendingUpdate = false;
        self.onNotification(notifications);
        self.triggerUpdate();
      }, function() {
        self.pendingUpdate = false;
        self.error("Technical problems connecting to server - auto refresh disabled");
      });
    }
  },

  sendSMS: function() {
    var self = this;
    this.sound.playClick();
    var msg = this.validateSendForm();
    if (msg !== "") {
      this.error(msg);
      return;
    }
    this.info("Sending SMS...");
    this.sendButton.attr("disabled", true);
    this.smsProvider.sendSMS([this.sendTo.val()], this.sendBody.val(), function(msg) {
      self.sendButton.attr("disabled", false);
      self.error("Sending SMS failed : " + msg);
    });

  },

  validateSendForm: function() {
    var to = this.sendTo.val();
    var msgs = [];
    if (to === '') {
      msgs.push('Please enter a phone number to send to');
    } else if (!Utils.isValidUsPstn(to)) {
      msgs.push(to + ' not a valid US phone number');
    }

    var body = this.sendBody.val();
    if (body === '') {
      msgs.push('Please enter a text to send');
    }

    return msgs.join('\n');
  },

  onLoggedIn: function() {
    var self = this;
    this.loginForm.hide();
    this.inbox.show();
    this.sendForm.show();
    this.enableUpdate(true);
    this.smsProvider.readAll(function(msg) {
      self.error("Fetching SMS failed : " + msg);
    });
    this.info("Fetching SMS...");
  },

  updateInbox: function(messages) {
    this.inboxContent.html('');
    this.inboxItems = [];
    for (var i = 0; i < messages.length; i++) {
      var inboxItem = new SMS.InboxItem(this, messages[i]);
      inboxItem.appendTo(this.inboxContent);
      this.inboxItems.push(inboxItem);
    }
  },

  setStatus: function(msg, type) {
    this.status.show();
    this.status.attr("class", type);
    this.statusContent.text(msg);
  },

  error: function(msg) {
    this.setStatus(msg, "error");
  },

  info: function(msg) {
    this.setStatus(msg, "info");
  },

  toggle: function() {
    if (ClientConfig.enableSMS) {
      if (this.toggled) {
        this.view.fadeOut(100);
      } else {
        this.view.fadeIn(100);
      }
      this.toggled = !this.toggled;
    }
  }
};