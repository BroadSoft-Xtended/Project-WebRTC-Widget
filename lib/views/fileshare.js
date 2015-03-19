module.exports = require('webrtc-core').bdsft.View(FileShareView)

function FileShareView(eventbus, fileshare) {
  var self = {};

  self.model = fileshare;
  
  self.elements = ['file', 'status'];

  var requestSend = function(e) {
    var data = e.target.result;
    var file = self.file.val();
    eventbus.shareFile(file);
  };

  var handleFileSelect = function(evt) {
    var file = evt.target.files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = requestSend;
      reader.readAsDataURL(file);
    } else {
      alert("Failed to load file");
    }
  };

  self.listeners = function() {
    self.file.on('change', handleFileSelect);
  };

  return self;
}