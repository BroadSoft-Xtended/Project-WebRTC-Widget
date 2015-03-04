module.exports = VideoBarView;

var Icon = require('webrtc-core/Icon');
var events;

function VideoBarView(eventbus, sound, sipstack, transferView, settingsView, dialpadView, timer, video, callcontrolView, configuration) {
  var self = {};

  self.fullScreen = false;
  self.isScreenSharing = false;
  self.soundEnabled = true;
  self.selfViewVisible = true;

  self.elements = ['transfer', 'settings', 'dialpadIconShow', 'dialpadIconHide', 'cellTimer', 'hangup', 'fullScreenExpand', 'fullScreenContract',
    'muteAudioIcon', 'unmuteAudioIcon', 'selfViewEnable', 'selfViewDisable', 'shareScreen', 'stopShareScreen', 'hold', 'resume'
  ];

  var clickHander = function(callback){
    return function(e) {
      e.preventDefault();
      sound.playClick();
      callback();
    }
  }
  var toggleSelfView = function(selfViewVisible) {
    self.selfViewVisible = selfViewVisible || !self.selfViewVisible;
    eventbus.viewChanged({visible: self.selfViewVisible, name: 'video'});
  };

  var toggleSound = function(soudEnabled) {
    self.enableSound(soudEnabled || !self.soundEnabled);
  };

  var toggleShareScreen = function() {
    self.enableScreenSharing(!self.isScreenSharing);
  };

  var toggleFullScreen = function() {
    self.enableFullScreen(!self.fullScreen);
  };

  var togglePopup = function(popup) {
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
    video.updateSessionStreams();

    // self.guiStart();

    timer.stop();
    self.checkEndCallURL();
  };

  // Initial startup
  self.init = function() {
    toggleSelfView(self.selfViewVisible);
    toggleSound(self.soundEnabled);

    timer.view.view.appendTo(self.cellTimer);

  };

  self.checkEndCallURL = function() {
    if (configuration.endCallURL && !configuration.disabled) {
      window.location = configuration.endCallURL;
    }
  };

  self.enableScreenSharing = function(enabled) {
    self.isScreenSharing = enabled;
    eventbus.screenshare(enabled);
    eventbus.viewChanged({visible: enabled, name: 'screenshare'});
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

  self.enableFullScreen = function(enable) {
    if(!enable) {
      if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    } else {
      if (document.webkitRequestFullScreen) {
        document.webkitRequestFullScreen();
      }      
    }
    self.fullScreen = enable;
    eventbus.viewChanged({name: 'fullscreen', visible: enable});
  };

  self.updateFullScreen = function() {
    var enable = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
    self.enableFullScreen(enable);
  };

  self.enableSound = function(enable) {
    self.soundEnabled = enable;
    sound.setMuted(!enable);
    eventbus.viewChanged({name: 'sound', visible: enable});
  };

  self.listeners = function() {
    self.hold = new Icon(self.hold, sound);
    self.resume = new Icon(self.resume, sound);

    window.onbeforeunload = function(e) {
      self.endCall({
        rtcSession: 'all'
      });
      return null;
    };
    eventbus.on("disconnected", function(e) {
      self.endCall();
    });
    eventbus.on(["ended", "failed"], function(e) {
      self.endCall({
        rtcSession: e.sender
      });
    });

    self.transfer.bind('click', clickHander(function() {
      togglePopup(transferView);
    }));
    self.settings.bind('click', clickHander(function() {
      togglePopup(settingsView);
    }));
    self.dialpadIconShow.bind('click', clickHander(function() {
      togglePopup(callcontrolView);
    }));
    self.dialpadIconHide.bind('click', clickHander(function() {
      togglePopup(callcontrolView);
    }));
    self.shareScreen.bind('click', clickHander(function() {
      toggleShareScreen();
    }));
    self.stopShareScreen.bind('click', clickHander(function() {
      toggleShareScreen();
    }));
    self.fullScreenExpand.bind('click', clickHander(function() {
      toggleFullScreen();
    }));
    self.fullScreenContract.bind('click', clickHander(function() {
      toggleFullScreen();
    }));
    self.selfViewDisable.bind('click', clickHander(function() {
      toggleSelfView();
    }));
    self.selfViewEnable.bind('click', clickHander(function() {
      toggleSelfView();
    }));
    self.muteAudioIcon.bind('click', clickHander(function() {
      toggleSound();
    }));
    self.unmuteAudioIcon.bind('click', clickHander(function() {
      toggleSound();
    }));
    self.hold.onClick(function(e) {
      self.holdCall();
    });
    self.resume.onClick(function(e) {
      self.resumeCall();
    });
    self.hangup.bind('click', clickHander(function() {
      self.endCall();
      if (self.fullScreen) {
        self.fullScreenContract.click();
      }
    }));

    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
      self.updateFullScreen();
    });
  };

  return self;
}