module.exports = Sound;

var $ = require('jquery');
var fs = require('fs');
var medias = require('bdsft-webrtc-media');

function Sound(eventbus, configuration, sipstack) {
  var self = {};

  var soundOut;
  var soundOutDTMF;
  var muted = false;
  
  self.init = function() {
    soundOut = $('<audio>', {volume: configuration.volumeClick}).appendTo($('body'));
    soundOutDTMF = $('<audio>', {volume: configuration.volumeDTMF}).appendTo($('body'));
  };

  self.listeners = function() {
    eventbus.on("progress", function(e) {
      self.playDtmfRingback();
    });
    eventbus.on("failed", function(e) {
      self.pause();
    });
    eventbus.on("resumed", function() {
      self.pause();
      self.updateLocalAudio();
    });
    eventbus.on("started", function() {
      self.pause();
      self.updateLocalAudio();
    });
    eventbus.on("userMediaUpdated", function() {
      self.updateLocalAudio();
    });
    eventbus.on('newDTMF', function(e) {
      var digit = e.data.tone;
      debug('DTMF sent : ' + digit);
      if (!digit) {
        return;
      }
      var file = null;
      if (digit === "*") {
        file = "star";
      } else if (digit === "#") {
        file = "pound";
      } else {
        file = digit;
      }
      self.playDtmfTone(file);
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
    soundOut.trigger('pause');
    soundOutDTMF.trigger('pause');
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
    if (audioSource.attr("src") === media && !audioSource[0].paused) {
      return;
    }
    options = options || {};
    audioSource.attr("src", 'data:audio/ogg;base64,'+medias[media]);
    if (options.loop) {
      audioSource.attr('loop', 'true');
    } else {
      audioSource.removeAttr('loop');
    }
    audioSource.trigger('play');
  };

  self.playDtmf = function(media, options) {
    self.playTone(soundOutDTMF, media, options);
  };

  return self;
}
