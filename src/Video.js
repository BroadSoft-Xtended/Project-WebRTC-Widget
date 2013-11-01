/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Video,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Video');

  Video = function(client) {
    this.local = $('#localVideo');
    this.remote = $('#remoteVideo');

    this.client = client;
    this.registerListeners();
  };

  Video.prototype = {
    registerListeners: function(){
      var self = this;
      this.local.bind("playing", function(){
        self.client.validateUserMediaResolution();
      });
    },
    updateSessionStreams: function(rtcSession) {
      this.updateStreams(rtcSession ? rtcSession.getLocalStreams() : null,
        rtcSession ? rtcSession.getRemoteStreams() : null);
    },

    updateStreams: function(localStreams, remoteStreams) {
      logger.log('updateStreams with localStreams '+(localStreams ? localStreams.length : 0)+
        ' and remoteStreams '+(remoteStreams ? remoteStreams.length : 0));
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
      if (video.mozSrcObject !== undefined) {
        if(hasStream) {
          video.mozSrcObject = streams[0];
          video.play();
        }  else {
          video.mozSrcObject = null;
        }
      } else {
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
