/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Video;
//    LOG_PREFIX = WebRTC.name +' | '+ 'Configuration' +' | ';

  Video = function() {
  };

  Video.prototype = {
    updateSessionStreams: function(rtcSession) {
      this.updateStreams(rtcSession ? rtcSession.getLocalStreams() : null,
        rtcSession ? rtcSession.getRemoteStreams() : null);
    },

    updateStreams: function(localStreams, remoteStreams) {
      var selfView = document.getElementById("localVideo");
      var remoteView = document.getElementById("remoteVideo");
      this.setVideoStream(selfView, localStreams);
      this.setVideoStream(remoteView, remoteStreams);
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
