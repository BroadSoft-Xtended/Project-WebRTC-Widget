/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Sound;
//    LOG_PREFIX = WebRTC.name +' | '+ 'Configuration' +' | ';

  Sound = function(sipStack) {
    this.sipStack = sipStack;
    this.soundOut = document.createElement("audio");
    this.soundOut.volume = ClientConfig.volumeClick;
    this.soundOutDTMF = document.createElement("audio");
    this.soundOutDTMF.volume = ClientConfig.volumeDTMF;
  };

  Sound.prototype = {
    enableLocalAudio: function(enabled) {
      var localStreams = this.sipStack.getLocalStreams();
      if(!localStreams) {
        return;
      }
      var localMedia = localStreams[0];
      var localAudio = localMedia.getAudioTracks()[0];
      localAudio.enabled = enabled;
    },

    pause: function(){
      this.soundOut.pause();
      this.soundOutDTMF.pause();
    },

    playDtmfRingback: function(){
      this.playDtmf("media/dtmf-ringback.ogg", {loop: true});
    },

    playRingtone: function(){
      this.play("media/ringtone.ogg", {loop: true});
    },

    playDtmfTone: function(tone){
      this.playDtmf("media/dtmf-" + tone + ".ogg");
    },

    playClick: function(){
      this.play("media/click.ogg");
    },

    play: function(media, options){
      this.playTone(this.soundOut, media, options);
    },

    playTone: function(audioSource, media, options){
      // avoid restarting same playing audio
      if(audioSource.getAttribute("src") === media && !audioSource.paused) {
        return;
      }
      options = options || {};
      audioSource.setAttribute("src", media);
      if(options.loop) {
        audioSource.setAttribute("loop", "true");
      } else {
        audioSource.removeAttribute("loop");
      }
      audioSource.play();
    },

    playDtmf: function(media, options){
      this.playTone(this.soundOutDTMF, media, options);
    }
  };

  WebRTC.Sound = Sound;
}(WebRTC));
