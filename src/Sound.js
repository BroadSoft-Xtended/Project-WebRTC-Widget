module.exports = Sound;

var events = require('events');
var WebRTC_C = require('./Constants');

function Sound(sipStack, configuration) {
  this.sipStack = sipStack;
  this.soundOut = document.createElement("audio");
  this.soundOut.volume = configuration.volumeClick;
  this.soundOutDTMF = document.createElement("audio");
  this.soundOutDTMF.volume = configuration.volumeDTMF;
  this.muted = false;

  this.registerListeners();
}

Sound.prototype = {
  registerListeners: function() {
    var self = this;
    events.on("resumed", function() {
      self.updateLocalAudio();
    });
    events.on("started", function() {
      self.updateLocalAudio();
    });
    events.on("userMediaUpdated", function() {
      self.updateLocalAudio();
    });
  },

  setMuted: function(muted) {
    this.muted = muted;
    events.emit('viewChanged', this);
    this.updateLocalAudio();
  },

  updateLocalAudio: function() {
    this.enableLocalAudio(!this.muted);
  },

  enableLocalAudio: function(enabled) {
    var localStreams = this.sipStack.getLocalStreams();
    if (!localStreams || localStreams.length === 0) {
      return;
    }
    var localMedia = localStreams[0];
    var localAudio = localMedia.getAudioTracks()[0];
    localAudio.enabled = enabled;
  },

  pause: function() {
    this.soundOut.pause();
    this.soundOutDTMF.pause();
  },

  playDtmfRingback: function() {
    this.playDtmf("dtmf-ringback", {
      loop: true
    });
  },

  playRingtone: function() {
    this.play("ringtone", {
      loop: true
    });
  },

  playDtmfTone: function(tone) {
    this.playDtmf("dtmf-" + tone);
  },

  playClick: function() {
    this.play("click");
  },

  play: function(media, options) {
    this.playTone(this.soundOut, media, options);
  },

  playTone: function(audioSource, media, options) {
    // avoid restarting same playing audio
    if (audioSource.getAttribute("src") === media && !audioSource.paused) {
      return;
    }
    options = options || {};
    audioSource.setAttribute("src", WebRTC_C.MEDIA[media]);
    if (options.loop) {
      audioSource.setAttribute("loop", "true");
    } else {
      audioSource.removeAttribute("loop");
    }
    audioSource.play();
  },

  playDtmf: function(media, options) {
    this.playTone(this.soundOutDTMF, media, options);
  }
};