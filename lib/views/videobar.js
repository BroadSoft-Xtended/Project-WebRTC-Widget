module.exports = require('webrtc-core').bdsft.View(VideoBarView);

var Icon = require('webrtc-core').icon;
var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;
var events;

function VideoBarView(eventbus, sound, timerView, video) {
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

  // Initial startup
  self.init = function() {
    toggleSelfView(self.selfViewVisible);
    toggleSound(self.soundEnabled);

    timerView.view.appendTo(self.cellTimer);

  };

  self.enableScreenSharing = function(enabled) {
    eventbus.screenshare(enabled);
    eventbus.viewChanged({visible: enabled, name: 'screenshare'});
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

    eventbus.on('callHeld', function(e) {
      self.hold.enable();
    });
    eventbus.on('callResumed', function(e) {
      self.resume.enable();
    });
    eventbus.on('screenshare', function(e) {
      self.isScreenSharing = e.enabled;
    });
    eventbus.on('screenshareFailure', function(e) {
      // TODO - screenSharingUnsupported not implemented
      // no way to distinguish between flag not enabled or simply rejected enabling screen sharing
      if (e.e) {
        self.screenSharingUnsupported.show();
      }
    });
    self.transfer.bind('click', clickHander(function() {
      eventbus.toggleView(Constants.VIEW_TRANSFER);
    }));
    self.settings.bind('click', clickHander(function() {
      eventbus.toggleView(Constants.VIEW_SETTINGS);
    }));
    self.dialpadIconShow.bind('click', clickHander(function() {
      eventbus.toggleView(Constants.VIEW_CALLCONTROL);
    }));
    self.dialpadIconHide.bind('click', clickHander(function() {
      eventbus.toggleView(Constants.VIEW_CALLCONTROL);
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
      self.hold.disable();
      eventbus.holdCall();
    });
    self.resume.onClick(function(e) {
      self.resume.disable();
      eventbus.resumeCall();
    });
    self.hangup.bind('click', clickHander(function() {
      eventbus.endCall();
      if (self.fullScreen) {
        self.fullScreenContract.click();
      }
    }));

    Utils.getElement(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
      self.updateFullScreen();
    });
  };

  return self;
}