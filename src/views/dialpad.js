module.exports = DialpadView

function DialpadView(options, eventbus, callcontrol, historyView, videobarView, sipstack, sound) {
  var self = {};

  self.elements = ['keys'];

  self.listeners = function() {
    self.keys.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      eventbus.digit(this.firstChild.nodeValue);
    });
  };

  return self;
}