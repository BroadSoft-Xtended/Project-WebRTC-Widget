module.exports = Video;

var events = require('./eventbus');
var debug = function(msg){
  require('./debug')('video')(msg);
}

function Video(element, sipStack, options) {
  this.ui = element;
  this.local = this.ui.find('.localVideo video');
  this.localHolder = this.ui.find('.localVideo');
  this.remote = this.ui.find('.remoteVideo');

  this.options = options || {};
  this.sipStack = sipStack;

  this.registerListeners();
}

Video.prototype = {
  registerListeners: function() {
    var self = this;
    this.local.bind("playing", function() {
      self.options.onPlaying();
    });
    events.on("userMediaUpdated", function(e) {
      self.updateStreams([e && e.localStream], []);
    });
  },

  updateSessionStreams: function() {
    this.updateStreams(this.sipStack.getLocalStreams(), this.sipStack.getRemoteStreams());
  },

  updateStreams: function(localStreams, remoteStreams) {
    debug("updating video streams");
    this.setVideoStream(this.local[0], localStreams);
    this.setVideoStream(this.remote[0], remoteStreams);
  },

  localWidth: function() {
    return this.local[0].videoWidth;
  },

  localHeight: function() {
    return this.local[0].videoHeight;
  },

  setVideoStream: function(video, streams) {
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
  }

};