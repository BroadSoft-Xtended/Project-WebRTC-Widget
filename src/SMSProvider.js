module.exports = SMSProvider;

var ExSIP = require('exsip');
var events = require('./eventbus');
var debug = function(msg){
  require('./debug')('smsprovider')(msg);
}

function SMSProvider() {
  this.init();
}

SMSProvider.prototype = {
  send: function(type, restSuffix, jsonData, successCallback, failureCallback, isJsonp) {
    //      $.flXHRproxy.registerOptions("http://"+ClientConfig.smsHost+"/", {xmlResponseText:false});
    //      $.ajaxSetup({transport:'flXHRproxy'});

    var url = "http://" + ClientConfig.smsHost + "/" + ClientConfig.smsUser + "/" + restSuffix;
    if (this.sessionid) {
      url += ";jsessionid=" + this.sessionid;
    }
    debug("Request to " + url + " : " + ExSIP.Utils.toString(jsonData));
    $.ajax({
        crossDomain: true,
        contentType: type === "GET" ? "text/plain" : "text/plain",
        dataType: isJsonp ? "jsonp" : "json",
        type: type,
        url: url,
        data: type === "GET" ? jsonData : JSON.stringify(jsonData)
      })
      .done(function(msg) {
        if (msg.status === "empty" || msg.status === "success" || msg.status.code === "0000001") {
          debug("Response successful : " + ExSIP.Utils.toString(msg));
          if (successCallback) {
            successCallback(msg);
          }
        } else {
          debug("Response failed : " + ExSIP.Utils.toString(msg));
          if (failureCallback) {
            failureCallback(msg.status.message);
          }
        }
      })
      .fail(function(jqXHR, textStatus) {
        debug('Response error : ' + textStatus);
        if (failureCallback) {
          failureCallback(textStatus);
        }
      });
  },

  getUpdate: function(onNotification, onFailure) {
    var onSuccess = function(msg) {
      debug("received notification : " + ExSIP.Utils.toString(msg));
      onNotification(msg.notifications);
    };
    var data = {
      fid: this.name,
      platform: "fmc"
    };
    this.send("GET", "getUpdate", data, onSuccess, onFailure, false);
  },
  sendSMS: function(desttnarray, body, onFailure) {
    var onSuccess = function(msg) {
      debug("sent msg " + msg + " to " + desttnarray);
      events.emit('smsSent', {
        desttnarray: desttnarray,
        body: body
      });
    };
    var data = {
      desttnarray: desttnarray,
      body: body
    };
    this.send("POST", "ua/msg/sms/send", data, onSuccess, onFailure);
  },
  remove: function(mids, onSuccess, onFailure) {
    var data = {
      mids: mids
    };
    this.send("POST", "ua/msg/sms/delete", data, function() {
      debug("Deleted msgs : " + mids);
      if (onSuccess) {
        onSuccess();
      }
    }, onFailure);
  },
  readAll: function(onFailure) {
    var onSuccess = function(msg) {
      debug("Read all mgs : " + ExSIP.Utils.toString(msg.messages));
      events.emit('smsReadAll', {
        messages: msg.messages
      });
    };
    var data = null;
    this.send("GET", "ua/msg/sms/all", data, onSuccess, onFailure);
  },
  login: function(name, password, onFailure) {
    var self = this;
    var onSuccess = function(msg) {
      self.sessionid = msg.sessionid;
      self.name = name;
      debug("Logged in " + name + " : " + msg.sessionid);
      events.emit('smsLoggedIn');
    };
    var data = {
      spcode: ClientConfig.smsSpcode,
      password: password,
      name: name,
      platform: "fmc"
    };
    this.send("POST", "ua/login", data, onSuccess, onFailure);
  },

  init: function() {
    this.registerListeners();
  },
  registerListeners: function() {
    //      var self = this;
    //      this.eventBus.on("started", function(e){
    //        self.statusBeforeCall = converse.getStatus();
    //        debug('status before call : '+self.statusBeforeCall, self.client.configuration);
    //        converse.setStatus('dnd');
    //      });
    //      this.eventBus.on("ended", function(e){
    //        debug('reset status to : '+self.statusBeforeCall, self.client.configuration);
    //        converse.setStatus(self.statusBeforeCall);
    //      });
  }
};