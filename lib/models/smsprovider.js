module.exports = require('webrtc-core').bdsft.Model(SMSProvider);

function SMSProvider(eventbus, debug, configuration) {
  var self = {};

  self.send = function(type, restSuffix, jsonData, successCallback, failureCallback, isJsonp) {
    //      $.flXHRproxy.registerOptions("http://"+configuration.smsHost+"/", {xmlResponseText:false});
    //      $.ajaxSetup({transport:'flXHRproxy'});

    var url = "http://" + configuration.smsHost + "/" + configuration.smsUser + "/" + restSuffix;
    if (self.sessionid) {
      url += ";jsessionid=" + self.sessionid;
    }
    debug("Request to " + url + " : " + JSON.stringify(jsonData));
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
          debug("Response successful : " + JSON.stringify(msg));
          if (successCallback) {
            successCallback(msg);
          }
        } else {
          debug("Response failed : " + JSON.stringify(msg));
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
  };

  self.getUpdate = function(onNotification, onFailure) {
    var onSuccess = function(msg) {
      debug("received notification : " + JSON.stringify(msg));
      onNotification(msg.notifications);
    };
    var data = {
      fid: self.name,
      platform: "fmc"
    };
    self.send("GET", "getUpdate", data, onSuccess, onFailure, false);
  };
  self.sendSMS = function(desttnarray, body, onFailure) {
    var onSuccess = function(msg) {
      debug("sent msg " + msg + " to " + desttnarray);
      eventbus.emit('smsSent', {
        desttnarray: desttnarray,
        body: body
      });
    };
    var data = {
      desttnarray: desttnarray,
      body: body
    };
    self.send("POST", "ua/msg/sms/send", data, onSuccess, onFailure);
  };
  self.remove = function(mids, onSuccess, onFailure) {
    var data = {
      mids: mids
    };
    self.send("POST", "ua/msg/sms/delete", data, function() {
      debug("Deleted msgs : " + mids);
      if (onSuccess) {
        onSuccess();
      }
    }, onFailure);
  };
  self.readAll = function(onFailure) {
    var onSuccess = function(msg) {
      debug("Read all mgs : " + JSON.stringify(msg.messages));
      eventbus.emit('smsReadAll', {
        messages: msg.messages
      });
    };
    var data = null;
    self.send("GET", "ua/msg/sms/all", data, onSuccess, onFailure);
  };
  self.login = function(name, password, onFailure) {
    var onSuccess = function(msg) {
      self.sessionid = msg.sessionid;
      self.name = name;
      debug("Logged in " + name + " : " + msg.sessionid);
      eventbus.emit('smsLoggedIn');
    };
    var data = {
      spcode: configuration.smsSpcode,
      password: password,
      name: name,
      platform: "fmc"
    };
    self.send("POST", "ua/login", data, onSuccess, onFailure);
  };

  return self;
}