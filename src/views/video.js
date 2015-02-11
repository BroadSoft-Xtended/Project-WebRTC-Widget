module.exports = require('../factory')(VideoView);

function VideoView(options, sipstack, eventbus, debug, settingsView) {
  var self = {}; 
  self.elements = ['local', 'remote'];

  var validateUserMediaResolution = function() {
    var encodingWidth = settingsView.getResolutionEncodingWidth();
    var encodingHeight = settingsView.getResolutionEncodingHeight();
    var videoWidth = self.localWidth();
    var videoHeight = self.localHeight();
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
    self.local.bind("playing", function() {
      validateUserMediaResolution();
    });
    eventbus.on("userMediaUpdated", function(e) {
      self.updateStreams([e && e.localStream], []);
    });
  };

  self.updateSessionStreams = function() {
    self.updateStreams(sipstack.getLocalStreams(), sipstack.getRemoteStreams());
  };

  self.updateStreams = function(localStreams, remoteStreams) {
    debug("updating video streams");
    self.setVideoStream(self.local[0], localStreams);
    self.setVideoStream(self.remote[0], remoteStreams);
  };

  self.localWidth = function() {
    return self.local[0].videoWidth;
  };

  self.localHeight = function() {
    return self.local[0].videoHeight;
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