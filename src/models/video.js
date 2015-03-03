module.exports = Video;

function Video(eventbus, debug, settings, videoView) {
  var self = {}; 

  self.view = videoView;

  self.props = {'localEl': true, 'remoteEl': true, 'localWidth': true, 'localHeight': true};

  var validateUserMediaResolution = function() {
    var encodingWidth = settings.getResolutionEncodingWidth();
    var encodingHeight = settings.getResolutionEncodingHeight();
    debug("validating video resolution " + videoWidth + "," + videoHeight + " to match selected encoding " + encodingWidth + "," + encodingHeight);
    if (!videoWidth && !videoHeight) {
      return;
    }

    if (encodingWidth !== videoWidth || encodingHeight !== videoHeight) {
      var msg = "Video resolution " + videoWidth + "," + videoHeight + " does not match selected encoding " + encodingWidth + "," + encodingHeight;
      debug(msg);
    }
  };

  self.listeners = function() {
    eventbus.on("userMediaUpdated", function(e) {
      self.updateStreams([e && e.localStream], []);
    });
    eventbus.on("resumed", function(e) {
      self.updateSessionStreams(e.sender);
    });
    eventbus.on("started", function(e) {
      self.updateSessionStreams(e.sender);
    });
  };

  self.updateSessionStreams = function(session) {
    self.updateStreams(session.getLocalStreams(), session.getRemoteStreams());
  };

  self.updateStreams = function(localStreams, remoteStreams) {
    debug("updating video streams");
    self.setVideoStream(self.localEl, localStreams);
    self.setVideoStream(self.remoteEl, remoteStreams);
  };

  self.setVideoStream = function(video, streams) {
    var hasStream = streams && streams.length > 0 && typeof(streams[0]) !== 'undefined' && !streams[0].ended;
    if (video && video.mozSrcObject !== undefined) {
      if (hasStream) {
        video.mozSrcObject = streams[0];
        video.play();
      } else {
        video.mozSrcObject = null;
      }
    } else if (video) {
      if (hasStream) {
        video.src = (window.URL && window.URL.createObjectURL(streams[0])) || streams[0];
      } else {
        video.src = "";
      }
    }
  };

  return self;
}