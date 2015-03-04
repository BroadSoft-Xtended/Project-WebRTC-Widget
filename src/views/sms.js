module.exports = SMSView;

var Utils = require('webrtc-core/Utils');
var PopupView = require('./popup');

function SMSView(eventbus, debug, sound, sms) {
  var self = {};

  Utils.extend(self, PopupView(eventbus));

  function InboxItemView(inboxItem) {
    var _self = {};

    _self.inboxItem = inboxItem;

    var cloned = self.inboxItemSample.clone(false);
    cloned.removeClass('inboxItemSample');
    cloned.attr('id', inboxItem.id);
    var from = cloned.find('.from');
    var status = cloned.find('.statusCol');
    var time = cloned.find('.time');
    var bodyText = cloned.find('.body .text');
    var bodyImageLink = cloned.find('.body .image a');
    var bodyImageText = cloned.find('.body .image span');
    var bodyImageThumbnail = cloned.find('.body .image img');
    var bodyVideo = cloned.find('.body .video video');
    var bodyAudio = cloned.find('.body .audio audio');
    var removeLink = cloned.find('.icon-trash');

    cloned.addClass(inboxItem.messageType);

    from.text(inboxItem.from);
    status.text(inboxItem.status);
    time.text(inboxItem.time);

    bodyImageLink.attr('href', inboxItem.bodyImageLink);
    bodyImageText.text(inboxItem.bodyImageText);
    bodyImageThumbnail.attr('src', inboxItem.bodyImageThumbnail);
    bodyVideo.attr('src', inboxItem.bodyVideo);
    bodyVideo.text(inboxItem.bodyVideoText);
    bodyAudio.attr('src', inboxItem.bodyAudio);
    bodyAudio.text(inboxItem.bodyAudioText);
    bodyText.html(inboxItem.bodyText);

    removeLink.bind('click', function() {
      sms.remove(inboxItem);
    });

    _self.enableActions = function(enable) {
      removeLink.attr('disabled', !enable);
    };
    _self.remove = function() {
      cloned.remove();
    };
    _self.appendTo = function(element) {
      cloned.appendTo(element);
    };

    return _self;
  };

  self.elements = ['status', 'statusContent', 'inbox', 'inboxContent', 'loginForm', 'loginLink', 'name', 'password', 'sendForm',
    'sendTo', 'sendBody', 'sendButton', 'inboxItemSample'
  ];

  var inboxItemViews = [];

  var inboxItemView = function(inboxItem){
    return inboxItemViews.filter(function(view){
      return view.inboxItem === inboxItem;
    }).pop();
  };

  self.inboxItems = function(items){
    if(arguments.length === 1) {
      inboxItemViews = [];
      self.inboxContent.html('');
      for (var i = 0; i < items.length; i++) {
        var inboxItemView = new InboxItemView(items[i]);
        inboxItemView.appendTo(self.inboxContent);
        inboxItemViews.push(inboxItemView);
      }      
    } else {
      return inboxItemViews.map(function(view){ return view.inboxItem;});
    }
  };

  self.listeners = function() {
    eventbus.on('modifier', function(e) {
      if (e.which === 84) {
        self.show();
      }
    });
    eventbus.on('smsLoggedIn', function() {
      self.loginForm.toggleClass('hidden', true);
      self.inbox.toggleClass('hidden', false);
      self.sendForm.toggleClass('hidden', false);
    });
    eventbus.on('smsSending', function(e) {
      self.sendButton.attr("disabled", true);
    });
    eventbus.on('smsSent', function(e) {
      self.sendButton.attr("disabled", false);
    });
    eventbus.on('smsRemoving', function(e) {
      inboxItemView(e.inboxItem).enableActions(false);
    });
    eventbus.on('smsRemoved', function(e) {
      self.status.toggleClass('hidden', true);
      inboxItemView(e.inboxItem).remove();
    });
    eventbus.on('smsRemovedFailed', function(e) {
      inboxItemView(e.inboxItem).enableActions(true);
    });
    eventbus.on('smsSent', function() {
      self.status.toggleClass('hidden', true);
      self.sendButton.attr('disabled', false);
    });
    eventbus.on('smsReadAll', function(e) {
      self.status.toggleClass('hidden', true);
    });
    self.loginLink.bind('click', function(e) {
      e.preventDefault();
      sms.login(self.name.val(), self.password.val());
    });
    self.password.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        sms.login(self.name.val(), self.password.val());
      }
    });
    self.sendButton.bind('click', function(e) {
      e.preventDefault();
      sms.sendSMS();
    });
    self.sendBody.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        sms.sendSMS();
      }
    });
  };

  var _type;
  self.type = function(value) {
    _type = value;
  };
  self.statusText = function(value) {
    self.status.toggleClass('hidden', false);
    self.status.attr("class", _type);
    self.statusContent.text(value);
  };

  return self;
}