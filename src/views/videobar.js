module.exports = require('../factory')(VideoBarView)

var events;

function VideoBarView(options, eventbus, sound, transferView, settingsView, dialpadView, timerView) {
  var self = {};

  self.elements = ['transfer', 'settings', 'dialpadIconShow', 'dialpadIconHide', 'cellTimer'];

    self.fullScreenExpandIcon = self.client.find(".fullScreenExpand");
    self.fullScreenContractIcon = self.client.find(".fullScreenContract");
    self.dialpadShowIcon = self.client.find(".dialpadIconShow");
    self.dialpadHideIcon = self.client.find(".dialpadIconHide");
    self.muteAudioIcon = self.client.find(options.muteAudioEl || '.muteAudioIcon');
    self.unmuteAudioIcon = self.client.find(options.mainEl || '.unmuteAudioIcon');
    self.selfViewEnableIcon = self.client.find(".selfViewEnable");
    self.selfViewDisableIcon = self.client.find(".selfViewDisable");
    self.shareScreen = self.client.find(".shareScreen");
    self.stopShareScreen = self.client.find(".stopShareScreen");
    self.hangup = self.client.find(options.hangupEl || '.hangup');

  var toggleView = function(e, popup) {
    e.preventDefault();
    sound.playClick();
    popup.toggle();
  };

  self.listeners = function() {
    self.transfer.bind('click', function(e) {
      toggleView(e, transferView);
    });
    self.settings.bind('click', function(e) {
      toggleView(e, settingsView);
    });
    self.dialpadIconShow.bind('click', function(e) {
      toggleView(e, dialpadView);
    });
    self.dialpadIconHide.bind('click', function(e) {
      toggleView(e, dialpadView);
    });
  };

  return self;
}