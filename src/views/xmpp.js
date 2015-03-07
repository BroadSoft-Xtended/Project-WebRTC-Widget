module.exports = require('webrtc-core').bdsft.View(XMPPView);

// var View = require('ampersand-view');
// var GroupedCollectionView = require('ampersand-grouped-collection-view');
// var ChatInputView = require('otalk-chat-input-view');
var PopupView = require('./popup');
var Utils = require('webrtc-core').utils;
var $ = require('jquery');

function XMPPView(debug, eventbus, configuration, sound, xmpp) {
  var self = {};

  self.model = xmpp;
  Utils.extend(self, PopupView(eventbus));

  self.elements = ['content', 'name', 'password', 'login', 'messages'];

  // var chatInputView = new ChatInputView({
  //   sendChat: function(body, prevID) {
  //     client.sendChat({
  //       to: peer.id,
  //       body: body,
  //       replace: prevID
  //     });
  //   },
  //   sendChatState: function(state) {
  //     client.sendChatState({
  //       to: peer.id,
  //       chatState: state
  //     });
  //   },
  //   previousMessage: function() {
  //     return {
  //       id: peer.lastSentMessage.id,
  //       body: peer.lastSentMessage.body
  //     };
  //   }
  // });


  self.init = function() {
    // self.content.append($(chatInputView));
  };

  self.listeners = function() {
    self.login.on('click', function(e) {
      sound.playClick();
      xmpp.login(name.val(), password.val());
    });
    eventbus.on('modifier', function(e) {
      if (e.which === 88) {
        self.toggle();
      }
    });    
    eventbus.on('xmppmessages', function(e) {
      // var view = new GroupedCollectionView({
      //     el: self.messages,
      //     collection: e.messages,

      //     itemView: View.extend({
      //         template: '<div><p data-hook="msg-body"></p><span data-hook="msg-time"><span></div>',
      //         bindings: {
      //             'model.body': {
      //                 type: 'text',
      //                 hook: 'msg-body'
      //             },
      //             'model.timestamp': {
      //                 type: 'text',
      //                 hook: 'msg-time'
      //             }
      //         }
      //     }),
      //     groupView: View.extend({
      //         template: '<div><img data-hook="avatar"/><ul data-hook="messages"></ul></div>',
      //         bindings: {
      //             'model.avatar': {
      //                 type: 'attribute',
      //                 name: 'src',
      //                 hook: 'avatar'
      //             }
      //         },
      //         render: function () {
      //             this.renderWithTemplate();
      //             // The `groupEl` property is special for group views. If provided, item
      //             // views will be appended there instead of on the root element for the
      //             // group view.
      //             this.cacheElements({
      //                 groupEl: '[data-hook=messages]'
      //             });
      //         }
      //     }),

      //     groupsWith: function (model, prevModel, currentGroup) {
      //         // Used to determine when a new group is needed.
      //         // Return `true` if `model` belongs to the same group
      //         // as `prevModel`.
      //         // The current group is also available for comparison.
      //         return model.sender.id === prevModel.sender.id;
      //     },
      //     prepareGroup: function (model, prevGroup) {
      //         // Prepare a Group model based on the Item model
      //         // that triggered the group's creation.
      //         // The previous group model is also provided.
      //         return model.sender; 
      //     }
      // });
    });    
  };

  return self;
}