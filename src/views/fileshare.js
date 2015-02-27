module.exports = FileShareView

var Utils = require('../Utils');
var fileSaver = require('filesaver.js');

function FileShareView(options, sipstack, eventbus, debug) {
  var self = {};

  var C = self.C = {
    ACTION_REQUEST: 'request',
    ACTION_REPLY: 'reply',
    ACTION_SEND: 'send',
    ACTION_RECEIVED: 'received'
  };

  var requests = {};

  var handleFileSelect = function(evt) {
    var file = evt.target.files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = $.proxy(requestSend, self);
      reader.readAsDataURL(file);
    } else {
      alert("Failed to load file");
    }
  };

  var process = function(action, fileName, data) {
    if (action === C.ACTION_REQUEST) {
      var accept = window.confirm("User wants to share the file " + fileName + " with you. Do you want to receive it?");
      replyRequest(accept, fileName);
    } else if (action === C.ACTION_REPLY) {
      if (data === 'true') {
        var fileData = requests[fileName];
        sendFile(fileData, fileName);
      } else {
        updateStatus("rejected request for " + fileName);
        delete requests[fileName];
      }
    } else if (action === C.ACTION_SEND) {
      self.receivedFile(data, fileName);
    } else if (action === C.ACTION_RECEIVED) {
      updateStatus(fileName + " transferred successfully");
      delete requests[fileName];
    }
  };
  var requestSend = function(e) {
    var data = e.target.result;
    var file = self.file.val();
    var fileNameStr = fileName(file);
    requests[fileNameStr] = data;

    updateStatus("requesting sending file " + fileNameStr + " ...");
    send(C.ACTION_REQUEST, fileNameStr);
  };
  var replyRequest = function(accept, fileName) {
    if (accept) {
      updateStatus("receiving file " + fileName + " ...");
    }
    send(C.ACTION_REPLY, fileName, accept);
  };
  self.receivedFile = function(data, fileName) {
    updateStatus("received file " + fileName);
    var blob = Utils.dataURItoBlob(data);
    fileSaver(blob, fileName);
    send(C.ACTION_RECEIVED, fileName);
  };
  var sendFile = function(data, fileName) {
    updateStatus("sending file " + fileName + " ...");
    send(C.ACTION_SEND, fileName, data);
  };
  var send = function(action, fileName, data) {
    var dataString = "fileshare:" + action + ":" + fileName;
    if (data) {
      dataString += ":" + data;
    }
    sipstack.sendData(dataString);
  };
  var updateStatus = function(status) {
    debug(status);
    self.status.text(status);
  };
  var fileName = function(file) {
    return file.split('\\').pop();
  };

  self.elements = ['file', 'status'];

  self.listeners = function() {
    self.file.on('change', $.proxy(handleFileSelect, self));

    eventbus.on("dataReceived", function(e) {
      var data = e.data, match;
      var regex = /^fileshare:([^:]*):([^:]*):?/;
      if (!!(match = data.match(regex))) {
        var fileName = match.pop();
        var action = match.pop();
        data = data.replace(regex, '');
        process(action, fileName, data);
      }
    });
  };

  return self;
}