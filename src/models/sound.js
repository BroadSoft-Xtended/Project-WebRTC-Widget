module.exports = Sound;

var $ = require('jquery');
var fs = require('fs');

function Sound(options, eventbus, configuration, sipstack) {
  var self = {};

  var soundOut = $('<audio>', {volume: configuration.volumeClick}).appendTo('body');
  var soundOutDTMF = $('<audio>', {volume: configuration.volumeDTMF}).appendTo('body');
  var muted = false;

  self.listeners = function() {
    eventbus.on("resumed", function() {
      self.updateLocalAudio();
    });
    eventbus.on("started", function() {
      self.updateLocalAudio();
    });
    eventbus.on("userMediaUpdated", function() {
      self.updateLocalAudio();
    });
  },

  self.setMuted = function(m) {
    muted = m;
    eventbus.emit('viewChanged');
    this.updateLocalAudio();
  },

  self.updateLocalAudio = function() {
    this.enableLocalAudio(!muted);
  },

  self.enableLocalAudio = function(enabled) {
    var localStreams = this.sipStack.getLocalStreams();
    if (!localStreams || localStreams.length === 0) {
      return;
    }
    var localMedia = localStreams[0];
    var localAudio = localMedia.getAudioTracks()[0];
    localAudio.enabled = enabled;
  },

  self.pause = function() {
    soundOut.pause();
    soundOutDTMF.pause();
  },

  self.playDtmfRingback = function() {
    this.playDtmf("dtmf-ringback", {
      loop: true
    });
  },

  self.playRingtone = function() {
    this.play("ringtone", {
      loop: true
    });
  },

  self.playDtmfTone = function(tone) {
    this.playDtmf("dtmf-" + tone);
  },

  self.playClick = function() {
    this.play("click");
  },

  self.play = function(media, options) {
    this.playTone(soundOut, media, options);
  },

  self.playTone = function(audioSource, media, options) {
    // avoid restarting same playing audio
    if (audioSource.getAttribute("src") === media && !audioSource.paused) {
      return;
    }
    options = options || {};
    var media = fs.readFileSync(__dirname + '/../../media/'+media, 'base64');
    audioSource.setAttribute("src", media);
    if (options.loop) {
      audioSource.setAttribute("loop", "true");
    } else {
      audioSource.removeAttribute("loop");
    }
    audioSource.play();
  },

  self.playDtmf = function(media, options) {
    this.playTone(soundOutDTMF, media, options);
  }

  return self;
}
