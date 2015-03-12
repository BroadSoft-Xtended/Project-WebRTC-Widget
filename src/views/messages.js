module.exports = require('webrtc-core').bdsft.View(MessagesView)

function MessagesView(messages) {
  var self = {};

  self.model = messages;
  
  self.elements = ['alert', 'success', 'warning', 'normal'];

  var _level;
  self.listeners = function(databinder){
    databinder.onModelPropChange('text', function(value){
      var messageEl = self[_level || 'normal'];
      messageEl.stop(true, true).fadeOut();
      messageEl.text(value).fadeIn(10).fadeOut(10000);
    });
    databinder.onModelPropChange('level', function(value){
      _level = value;
    });
  };

  return self;
}