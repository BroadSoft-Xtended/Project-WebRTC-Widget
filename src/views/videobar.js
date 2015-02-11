module.exports = require('./factory')(VideoBar)

var events;

function VideoBar(options) {
  events = require('./eventbus')(options);

  options = options.videobar || options;
  this.view = $(options.view || templates.videobar());
  this.accept = this.view.find(options.acceptEl || '.acceptTransfer');
  this.reject = this.popup.find(options.rejectEl || '.rejectTransfer');
  this.targetInput = this.popup.find(options.targetEl || '.transferTarget');
  this.typeAttended = this.popup.find(options.attendedEl || '.transferTypeAttended');

  this.visible = false;
  this.client = client;
  this.sound = sound;
  this.sipStack = sipStack;
  this.configuration = configuration;

  this.registerListeners();
}

VideoBar.prototype = {
  registerListeners: function() {
  }
};