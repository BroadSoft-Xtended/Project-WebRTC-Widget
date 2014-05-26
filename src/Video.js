/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Video,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Video');

  Video = function(client, sipStack, eventBus) {
    this.local = $('#localVideo');
    this.remote = $('#remoteVideo');
    this.eventBus = eventBus;

    this.client = client;
    this.sipStack = sipStack;
    this.registerListeners();
  };

  Video.prototype = {
    registerListeners: function(){
      var self = this;
      this.local.bind("playing", function(){
        self.client.validateUserMediaResolution();
      });
      this.eventBus.on("userMediaUpdated", function(e){
        self.updateStreams([e.data.localStream], []);
      });
    },

    updateSessionStreams: function() {
      this.updateStreams(this.sipStack.getLocalStreams(), this.sipStack.getRemoteStreams());
    },

    updateStreams: function(localStreams, remoteStreams) {
      logger.log("updating video streams", this.client.configuration);
      this.setVideoStream(this.local[0], localStreams);
      this.setVideoStream(this.remote[0], remoteStreams);
    },

    localWidth: function(){
      return this.local[0].videoWidth;
    },

    localHeight: function(){
      return this.local[0].videoHeight;
    },

    setVideoStream: function(video, streams) {
      var hasStream = streams && streams.length > 0 && typeof(streams[0]) !== 'undefined' && !streams[0].ended;
      if (video && video.mozSrcObject !== undefined) {
        if(hasStream) {
          video.mozSrcObject = streams[0];
          video.play();
        }  else {
          video.mozSrcObject = null;
        }
      } else if(video) {
        if(hasStream) {
          video.src = (window.URL && window.URL.createObjectURL(streams[0])) || streams[0];
        }
        else {
          video.src = "";
        }
      }
    }

};

  WebRTC.Video = Video;
}(WebRTC));
