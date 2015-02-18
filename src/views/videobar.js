module.exports = VideoBarView;

var Icon = require('../Icon');
var events;

function VideoBarView(options, eventbus, sound, sipstack, transferView, settingsView, dialpadView, timerView) {
  var self = {};

  self.fullScreen = false;
  self.selfViewEnabled = true;
  self.isScreenSharing = false;

  self.elements = ['transfer', 'settings', 'dialpadIconShow', 'dialpadIconHide', 'cellTimer', 'hangup', 'fullScreenExpand', 'fullScreenContract',
    'muteAudioIcon', 'unmuteAudioIcon', 'selfViewEnable', 'selfViewDisable', 'shareScreen', 'stopShareScreen', 'hold', 'resume'
  ];

  var toggleView = function(e, popup) {
    e.preventDefault();
    sound.playClick();
    popup.toggle();
  };

  self.endCall = function(options) { 
    options = options || {};
    var rtcSession = options.rtcSession;
    if (rtcSession === 'all') {
      sipstack.terminateSessions();
    } else if (rtcSession) {
      sipstack.terminateSession(rtcSession);
    } else {
      sipstack.terminateSession();
    }
    sound.pause();
    self.video.updateSessionStreams();

    self.guiStart();

    self.timer.stop();
    self.checkEndCallURL();
  };

  self.enableScreenSharing = function(enabled) {
    self.isScreenSharing = enabled;
    eventbus.screenshare(enabled);
    eventbus.viewChanged(self);
    if (enabled) {
      var onShareScreenSuccess = function(localMedia) {
        localMedia.onended = function() {
          self.enableScreenSharing(false);
        };
      };
      var onShareScreenFailure = function(e) {
        // no way to distinguish between flag not enabled or simply rejected enabling screen sharing
        if (e) {
          self.screenSharingUnsupported.show();
        }
        self.enableScreenSharing(false);
      };
      sipstack.reconnectUserMedia(onShareScreenSuccess, onShareScreenFailure);
    } else {
      sipstack.reconnectUserMedia();
    }
  };

  self.holdCall = function() {
    self.hold.disable();
    var enable = function() {
      self.hold.enable();
    };
    sipstack.hold(enable, enable);
  };

  self.resumeCall = function() {
    self.resume.disable();
    var enable = function() {
      self.resume.enable();
    };
    sipstack.unhold(enable, enable);
  };

  self.hideSelfView = function() {
    self.selfViewEnabled = false;
    eventbus.viewChanged(self);
  };

  self.stopFullScreen = function() {
    if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    self.fullScreen = false;
    eventbus.viewChanged(self);
  };

  self.showSelfView = function() {
    self.selfViewEnabled = true;
    eventbus.viewChanged(self);
  };

  self.updateFullScreen = function() {
    self.fullScreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
    self.updateClientClass();
  };

  self.showFullScreen = function() {
    if (self.client[0].webkitRequestFullScreen) {
      self.client[0].webkitRequestFullScreen();
    }
    self.fullScreen = true;
    eventbus.viewChanged(self);
  };

  self.muteAudio = function() {
    sound.setMuted(true);
  };

  self.unmuteAudio = function() {
    sound.setMuted(false);
  };


  self.listeners = function() {
    self.hold = new Icon(self.hold, sound);
    self.resume = new Icon(self.resume, sound);

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
    self.shareScreen.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.enableScreenSharing(true);
    });
    self.stopShareScreen.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.enableScreenSharing(false);
    });

    self.hangup.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.endCall();
      if (self.fullScreen) {
        self.fullScreenContract.click();
      }
    });

    self.fullScreenExpand.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.showFullScreen();
    });

    self.fullScreenContract.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.stopFullScreen();
    });
    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
      self.updateFullScreen();
    });

    self.selfViewDisable.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.hideSelfView();
    });

    self.selfViewEnable.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.showSelfView();
    });

    self.hold.onClick(function(e) {
      self.holdCall();
    });

    self.resume.onClick(function(e) {
      self.resumeCall();
    });

    self.muteAudioIcon.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.muteAudio();
    });

    self.unmuteAudioIcon.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.unmuteAudio();
    });


  };

  return self;
}