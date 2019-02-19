/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Video,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Video');

  Video = function(element, sipStack, eventBus, options) {
    this.ui = element;
    this.local = this.ui.find('.localVideo');
    this.remote = this.ui.find('.remoteVideo');
    this.remoteAudio = this.ui.find('.remoteAudio');
    this.eventBus = eventBus;

    this.options = options || {};
    this.sipStack = sipStack;
    this.registerListeners();
  };

  Video.prototype = {
    registerListeners: function(){
      var self = this;
      this.local.bind("playing", function(){
        self.options.onPlaying();
      });
      this.eventBus.on("userMediaUpdated", function(e){
        self.updateStreams([e.data.localStream], []);
      });
    },

    updateSessionStreams: function() {
      this.updateStreams(this.sipStack.getLocalStreams(), this.sipStack.getRemoteStreams());
    },

    updateStreams: function(localStreams, remoteStreams) {
      logger.log("updating video streams", this.eventBus);
      var audioOnly = this.sipStack.configuration.audioOnly || false;  
      logger.log("audioOnly = " + audioOnly, this.eventBus);
      logger.log("setting local streams in media elements", this.eventBus);
      this.setMediaElementStreams(this.local[0], null, localStreams);
      logger.log("setting remote streams in media elements", this.eventBus);
      this.setMediaElementStreams(audioOnly ? null : this.remote[0], this.remoteAudio[0], remoteStreams);
    },

    localWidth: function(){
      return this.local[0].videoWidth;
    },

    localHeight: function(){
      return this.local[0].videoHeight;
    },

    setMediaElementStreams: function(video, audio, streams) {
      var hasStream = streams && streams.length > 0 && typeof(streams[0]) !== 'undefined';
      if(hasStream) {
        if((video === null || streams[0].getVideoTracks().length <= 0) && audio !== null)
        {
          audio.muted = false;
          audio.srcObject = streams[0];
        }
	else if((audio === null || streams[0].getAudioTracks().length <= 0) && video !== null)
        {
          video.srcObject = streams[0];
        }
        else if(audio !== null && video !== null)
        {
          // Video element needs the first video frame received to start playing audio, but we could get a stream with audio-Only before reciving any 
          // video frame, so a work-around has been implemented to play audio in audio element until we get first video frame based on loadedmetadata event.
          audio.muted = false;
          var videoStream = streams[0].clone();
          videoStream.getAudioTracks()[0].enabled = false;
          var audioStream = streams[0].clone();
          audioStream.removeTrack(audioStream.getVideoTracks()[0]);
          video.onloadedmetadata = function() {
            logger.log("Meta data for video loaded, re-enabling audio in video element.", this.eventBus);
            audioStream.getAudioTracks()[0].enabled = false;
            audio.muted = true;
            videoStream.getAudioTracks()[0].enabled = true;
          };
          video.srcObject = videoStream;
          audio.srcObject = audioStream;
        }
      }
    }

};

  WebRTC.Video = Video;
}(WebRTC));
