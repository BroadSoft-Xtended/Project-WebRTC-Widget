/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var SMS,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'SMS');

  SMS = function (client, eventBus, sound) {
    this.client = client;
    this.eventBus = eventBus;
    this.sound = sound;

    this.view = $("#sms");
    this.status = $("#smsStatus");
    this.statusContent = this.status.find(".content");
    this.inbox = $("#smsInbox");
    this.inboxContent = this.inbox.find(".content");
    this.loginForm = $("#smsLoginForm");
    this.loginLink = $("#smsLogin");
    this.nameInput = $("#smsName");
    this.passwordInput = $("#smsPassword");
    this.sendForm = $("#smsSendForm");
    this.sendTo = $("#smsSendTo");
    this.sendBody = $("#smsSendBody");
    this.sendButton = $("#smsSendButton");
    this.inboxItems = [];

    this.smsProvider = new WebRTC.SMSProvider(this.client, this.eventBus);
    this.toggled = false;

    this.registerListeners();
  };

  SMS.InboxItem = function (sms, message) {
    this.sms = sms;
    this.message = message;
    this.cloned = $("#sms-inbox-item-sample").clone(false);
    this.cloned.attr('id', message.mid);
    this.from = this.cloned.find('.from');
    this.status = this.cloned.find('.status');
    this.time = this.cloned.find('.time');
    this.body = this.cloned.find('.body');
    this.remove = this.cloned.find('.icon-trash');
    this.dateFormat = new WebRTC.DateFormat('%m/%d/%y %H:%M:%S');

    this.registerListeners();

    this.updateContent(message);

    return this;
  };

  SMS.InboxItem.prototype = {
    registerListeners: function(){
      var self = this;
      this.remove.bind('click', function(){
        self.sms.remove(self.message, self);
      });
    },
    enableActions: function(enable){
      this.remove.attr('disabled', !enable);
    },
    updateContent: function(message){
      this.from.text(message.tn);
      this.status.text(SMS.getStatusAsString(message.status));
      this.time.text(this.dateFormat.format(new Date(message.time)));
      this.body.text(message.body.trim());
    },
    appendTo: function(element) {
      this.cloned.appendTo(element);
    }
  };

  SMS.getStatusAsString = function(status){
    if(status === 'N') {
      return "New";
    }
    else if(status === 'U') {
      return "Unread";
    }
    else if(status === 'R') {
      return "Read";
    }
    else if(status === 'L') {
      return "Locked";
    }
    else if(status === 'D') {
      return "Deleted";
    }
    else {
      throw new Error('Unsupported status : '+status);
    }
  };

  SMS.prototype = {
    registerListeners:function () {
      var self = this;

      this.eventBus.on('smsLoggedIn', function(e){
        self.onLoggedIn();
      });
      this.eventBus.on('smsSent', function(e){
        self.sendButton.attr('disabled', false);
      });
      this.eventBus.on('smsReadAll', function(e){
        self.status.hide();
        var messages = e.data.messages;

        messages = messages.sort(function(a,b) { return b.time - a.time; });

        var incomingMessages = $.grep(messages, function( n, i ) {
          return ( n.dir === 'I' );
        });
//        var outgoingMessages = $.grep(messages, function( n, i ) {
//          return ( n.dir === 'O' );
//        });
        self.updateInbox(incomingMessages);
      });

      this.loginLink.bind('click', function (e) {
        e.preventDefault();
        self.login(self.nameInput.val(), self.passwordInput.val());
      });
      this.sendButton.bind('click', function (e) {
        e.preventDefault();
        self.sendSMS();
      });
    },

    remove: function (message, inboxItem) {
      var self = this;
      this.sound.playClick();
      if(!window.confirm("Do you really want to delete SMS from "+message.tn+"?")) {
        return;
      }
      this.info("Deleting SMS...");
      if(inboxItem) {
        inboxItem.enableActions(false);
      }
      this.smsProvider.remove([message.mid], function(){
        inboxItem.enableActions(true);
      }, function(msg){
        self.error("Deleting SMS failed : "+msg);
        inboxItem.enableActions(true);
      });
    },

    login: function (name, password) {
      var self = this;
      this.sound.playClick();
      this.info("Logging in...");
      this.smsProvider.login(name, password, function(msg){
        self.error("Logging failed : "+msg);
      });
    },

    onNotification: function (notifications) {
      var needsRead = false, self = this;
      for(var i=0; i < notifications.length; i++) {
        if(notifications[i].action === 'new-rec' || notifications[i].action === 'update' || notifications[i].action === 'delete') {
          needsRead = true;
          break;
        }
      }
      if(needsRead) {
        this.smsProvider.readAll(function(msg){
          self.error("Fetching SMS failed : "+msg);
        });
      }
    },

    enableUpdate: function (enable) {
      this.enableUpdate = enable;
      this.triggerUpdate();
    },

    triggerUpdate: function () {
      var self = this;
      if(this.enableUpdate && !this.pendingUpdate) {
        logger.log('triggering getUpdate', this.client.configuration);
        this.pendingUpdate = true;
        this.smsProvider.getUpdate(function(notifications){
          self.pendingUpdate = false;
          self.onNotification(notifications);
          self.triggerUpdate();
        }, function(){
          self.pendingUpdate = false;
          self.triggerUpdate();
        });
      }
    },

    sendSMS: function () {
      var self = this;
      this.sound.playClick();
      var msg = this.validateSendForm();
      if(msg !== "") {
        this.error(msg);
        return;
      }
      this.info("Sending SMS...");
      this.sendButton.attr("disabled", true);
      this.smsProvider.sendSMS([this.sendTo.val()], this.sendBody.val(), function(msg){
        self.sendButton.attr("disabled", false);
        self.error("Sending SMS failed : "+msg);
      });

    },

    validateSendForm: function () {
      var to = this.sendTo.val();
      var msgs = [];
      if(to === '') {
        msgs.push('Please enter a phone number to send to');
      }
      else if(!WebRTC.Utils.isValidUsPstn(to)) {
        msgs.push(to+' not a valid US phone number');
      }

      var body = this.sendBody.val();
      if(body === '') {
        msgs.push('Please enter a text to send');
      }

      return msgs.join('\n');
    },

    onLoggedIn: function () {
      var self = this;
      this.loginForm.hide();
      this.inbox.show();
      this.sendForm.show();
      this.enableUpdate(true);
      this.smsProvider.readAll(function(msg){
        self.error("Fetching SMS failed : "+msg);
      });
      this.info("Fetching SMS...");
    },

    updateInbox: function (messages) {
      this.inboxContent.html('');
      this.inboxItems = [];
      for(var i = 0; i < messages.length; i++) {
        var inboxItem = new SMS.InboxItem(this, messages[i]);
        inboxItem.appendTo(this.inboxContent);
        this.inboxItems.push(inboxItem);
      }
    },

    setStatus: function (msg, type) {
      this.status.show();
      this.status.attr("class", type);
      this.statusContent.text(msg);
    },

    error: function (msg) {
      this.setStatus(msg, "error");
    },

    info: function (msg) {
      this.setStatus(msg, "info");
    },

    toggle: function () {
      if (ClientConfig.enableSMS) {
        if (this.toggled) {
          this.view.fadeOut(100);
        }
        else {
          this.view.fadeIn(100);
        }
        this.toggled = !this.toggled;
      }
    }
  };

  WebRTC.SMS = SMS;
}(WebRTC));
