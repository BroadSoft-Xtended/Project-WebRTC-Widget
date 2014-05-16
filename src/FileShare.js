/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var FileShare,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'FileShare'),
    C = {
      ACTION_REQUEST: 'request',
      ACTION_REPLY: 'reply',
      ACTION_SEND: 'send'
    };

  FileShare = function (client, eventBus, sipStack) {
    this.ui = $('#file_share');
    this.fileInput = this.ui.find('input[type="file"]');
    this.status = this.ui.find('.status');

    this.requests = {};
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
        var regex = /^fileshare:([^:]*):([^:]*):?/;
        if(match = data.match(regex)) {
          var fileName = match.pop();
          var action = match.pop();
          data = data.replace(regex,'');
          if(action === C.ACTION_REQUEST) {
            var accept = window.confirm("User wants to share the file "+fileName+" with you. Do you want to receive it?");
            self.replyRequest(accept, fileName);
          }
          else if(action === C.ACTION_REPLY) {
            if(data === 'true') {
              var fileData = self.requests[fileName];
              self.sendFile(fileData, fileName);
            } else {
              self.updateStatus("rejected request for "+fileName);
            }
            delete self.requests[fileName];
          }
          else if(action === C.ACTION_SEND) {
            self.updateStatus("received file "+fileName);
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
        reader.onload = $.proxy(this.requestSend, this);
        reader.readAsDataURL(file);
      } else {
        alert("Failed to load file");
      }
    },
    requestSend: function(e) {
      var data = e.target.result;
      var file = this.fileInput.val();
      var fileName = this.fileName(file);
      this.requests[fileName] = data;

      this.updateStatus("requesting sending file "+fileName+" ...");
      this.sipStack.sendData("fileshare:"+C.ACTION_REQUEST+":"+fileName);
    },
    replyRequest: function(accept, fileName) {
      this.sipStack.sendData("fileshare:"+C.ACTION_REPLY+":"+fileName+":"+accept);
    },
    sendFile: function(data, fileName) {
      this.updateStatus("sending file "+fileName+" ...");
      this.sipStack.sendData("fileshare:"+C.ACTION_SEND+":"+fileName+":"+data);
    },
    updateStatus: function(status) {
      logger.log(status, this.client.configuration);
      this.status.text(status);
    },
    fileName: function(file) {
      return file.split('\\').pop();
    }
  };

  WebRTC.FileShare = FileShare;
}(WebRTC));
