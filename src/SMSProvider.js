/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var SMSProvider,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'SMSProvider');

  SMSProvider = function(client, eventBus) {
    this.eventBus = eventBus;
    this.client = client;

    this.init();
  };

  SMSProvider.prototype = {
    send: function(type, restSuffix, jsonData, successCallback, failureCallback, isJsonp){
//      $.flXHRproxy.registerOptions("http://"+ClientConfig.smsHost+"/", {xmlResponseText:false});
//      $.ajaxSetup({transport:'flXHRproxy'});

      var self = this;
      var url = "http://"+ClientConfig.smsHost+"/"+ClientConfig.smsUser+"/"+restSuffix;
      if(this.sessionid) {
        url += ";jsessionid="+this.sessionid;
      }
      logger.log("Request to "+url+" : "+ExSIP.Utils.toString(jsonData), this.client.configuration);
      $.ajax({
        crossDomain: true,
        contentType: type === "GET" ? "text/plain" : "text/plain",
        dataType: isJsonp ? "jsonp" : "json",
        type: type,
        url: url,
        data: type === "GET" ? jsonData : JSON.stringify(jsonData)
      })
        .done(function(msg){
          if(msg.status.code === "0000001" || msg.status === "success") {
            logger.log("Response successful : "+ExSIP.Utils.toString(msg), self.client.configuration);
            if(successCallback) {
              successCallback(msg);
            }
          } else {
            logger.error("Response failed : "+ExSIP.Utils.toString(msg), self.client.configuration);
            if(failureCallback) {
              failureCallback(msg.status.message);
            }
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown){
          logger.error('Response error : '+textStatus);
          if(failureCallback) {
            failureCallback(textStatus);
          }
        });
    },

    getUpdate: function(onNotification, onFailure){
      var self = this;
      var onSuccess = function( msg ) {
        logger.log( "received notification : "+ExSIP.Utils.toString(msg), self.client.configuration);
        onNotification(msg.notifications);
      };
      var data = {fid: this.name, platform: "fmc"};
      this.send("GET", "getUpdate", data, onSuccess, onFailure, false);
    },
    sendSMS: function(desttnarray, body, onFailure){
      var self = this;
      var onSuccess = function( msg ) {
        logger.log( "sent msg "+body+" to " + desttnarray, self.client.configuration);
        self.eventBus.smsSent(self, {desttnarray: desttnarray, body: body});
      };
      var data = {desttnarray: desttnarray, body: body};
      this.send("POST", "ua/msg/sms/send", data, onSuccess, onFailure);
    },
    remove: function(mids, onSuccess, onFailure){
      var self = this;
      var data = {mids: mids};
      this.send("POST", "ua/msg/sms/delete", data, function(){
        logger.log( "Deleted msgs : " + mids, self.client.configuration);
        if(onSuccess) {
          self.onSuccess();
        }
      }, onFailure);
    },
    readAll: function(onFailure){
      var self = this;
      var onSuccess = function( msg ) {
        logger.log( "Read all mgs : " + ExSIP.Utils.toString(msg.messages), self.client.configuration);
        self.eventBus.smsReadAll(self, {messages: msg.messages});
      };
      var data = null;
      this.send("GET", "ua/msg/sms/all", data, onSuccess, onFailure);
    },
    login: function(name, password, onFailure){
      var self = this;
      var onSuccess = function( msg ) {
        self.sessionid = msg.sessionid;
        self.name = name;
        logger.log( "Logged in "+name+" : " + msg.sessionid, self.client.configuration);
        self.eventBus.smsLoggedIn(self);
      };
      var data = { spcode: ClientConfig.smsSpcode, password: password, name: name, platform: "fmc" };
      this.send("POST", "ua/login", data, onSuccess, onFailure);
    },

    init: function(){
      this.registerListeners();
    },
    registerListeners: function(){
//      var self = this;
//      this.eventBus.on("started", function(e){
//        self.statusBeforeCall = converse.getStatus();
//        logger.log('status before call : '+self.statusBeforeCall, self.client.configuration);
//        converse.setStatus('dnd');
//      });
//      this.eventBus.on("ended", function(e){
//        logger.log('reset status to : '+self.statusBeforeCall, self.client.configuration);
//        converse.setStatus(self.statusBeforeCall);
//      });
    }
  };

  WebRTC.SMSProvider = SMSProvider;
}(WebRTC));
