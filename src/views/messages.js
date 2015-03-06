module.exports = MessagesView

function MessagesView() {
  var self = {};

  self.elements = ['alert', 'success', 'warning', 'normal'];

  var _level;
  self.level = function(value) {
    _level = value;
  };

  self.text = function(value) {
    var messageEl = self[_level || 'normal'];
    messageEl.stop(true, true).fadeOut();
    messageEl.text(value).fadeIn(10).fadeOut(10000);
  };

  return self;
}