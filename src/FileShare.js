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
          var accept = window.confirm("User wants to share the file "+fileName+" with you. Do you want to receive it?");
          if(accept) {
            logger.log("received file : "+fileName, this.client.configuration);
            self.status.text("received file : "+fileName);
            data = data.replace(regex,'');
            var blob = WebRTC.Utils.dataURItoBlob(data);
            window.saveAs(blob, fileName);
          }
        }
      });
    },
    handleFileSelect: function(evt) {
      var file = evt.target.files[0];

      if (file) {
        var reader = new FileReader();
        reader.onload = $.proxy(this.sendFile, this);
        reader.readAsDataURL(file);
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
