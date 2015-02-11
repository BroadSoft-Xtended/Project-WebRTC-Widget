module.exports = require('../factory')(Sound);

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
  };

  self.setMuted = function(m) {
    muted = m;
    eventbus.viewChanged(self);
    self.updateLocalAudio();
  };

  self.updateLocalAudio = function() {
    self.enableLocalAudio(!muted);
  };

  self.enableLocalAudio = function(enabled) {
    var localStreams = sipstack.getLocalStreams();
    if (!localStreams || localStreams.length === 0) {
      return;
    }
    var localMedia = localStreams[0];
    var localAudio = localMedia.getAudioTracks()[0];
    localAudio.enabled = enabled;
  };

  self.pause = function() {
    soundOut.pause();
    soundOutDTMF.pause();
  };

  self.playDtmfRingback = function() {
    self.playDtmf("dtmf-ringback", {
      loop: true
    });
  };

  self.playRingtone = function() {
    self.play("ringtone", {
      loop: true
    });
  };

  self.playDtmfTone = function(tone) {
    self.playDtmf("dtmf-" + tone);
  };

  self.playClick = function() {
    self.play("click");
  };

  self.play = function(media, options) {
    self.playTone(soundOut, media, options);
  };

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
  };

  self.playDtmf = function(media, options) {
    self.playTone(soundOutDTMF, media, options);
  };

  return self;
}
