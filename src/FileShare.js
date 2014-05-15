/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var FileShare,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'FileShare');

  FileShare = function (client, eventBus, sipStack) {
    this.ui = $('#file_share');
    this.fileInput = this.ui.find('input[type="file"]');
    this.status = this.ui.find('.status');

    this.toggled = false;
    this.client = client;
    this.sipStack = sipStack;
    this.eventBus = eventBus;

    this.registerListeners();
  };

  FileShare.prototype = {
    registerListeners: function() {
      var self = this;
      this.fileInput.on('change', $.proxy(this.handleFileSelect, this));

      this.eventBus.on("dataReceived", function(e){
        var data = e.data.data, match;
        var regex = /^fileshare:([^:]*?):/;
        if(match = data.match(regex)) {
          var fileName = match.pop();
          logger.log("received file : "+fileName, this.client.configuration);
          self.status.text("received file : "+fileName);
          data = data.replace(regex,'');
          self.saveToDisk(data, match.pop());
        }
      });
    },
    saveToDisk: function(fileURL, fileName) {
      // for non-IE
      if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var event = document.createEvent('Event');
        event.initEvent('click', true, true);
        save.dispatchEvent(event);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      }

      // for IE
      else if ( !! window.ActiveXObject && document.execCommand)
      {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL);
        _window.close();
      }
    },
    handleFileSelect: function(evt) {
      var file = evt.target.files[0];

      if (file) {
        var reader = new FileReader();
        reader.onload = $.proxy(this.sendFile, this);
        reader.readAsText(file);
      } else {
        alert("Failed to load file");
      }
    },
    sendFile: function(e) {
      var data = e.target.result;
      var fileName = this.fileInput.val().split('\\').pop();
      logger.log("send file : "+fileName, this.client.configuration);
      this.status.text("send file : "+fileName);
      this.sipStack.sendData("fileshare:"+fileName+":"+data);
    }
  };

  WebRTC.FileShare = FileShare;
}(WebRTC));
