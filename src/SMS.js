/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var SMS,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'SMS');

  SMS = function(client, eventBus) {
    this.eventBus = eventBus;
    this.client = client;

    this.init();
  };

  SMS.prototype = {
    sendWithFlxhr: function(options) {
      var self = this;
      var url     = options['url'];
      var type    = options['type'] || 'GET';
      var success = options['success'];
      var error   = options['error'];
      var jsonData    = options['jsonData'];

      //
      // handles callbacks, just as above
      //
      function handle_load(XHRobj) {
        if (XHRobj.readyState === 4) {
          if (XHRobj.status === 200 && success) {
            logger.log("Success sending with flxhr : "+ExSIP.Utils.toString(XHRobj), self.client.configuration);
            var result = JSON.parse(XHRobj.responseText);
            if(result.status.code === '0000001') {
              success(result);
            } else {
              error(XHRobj);
            }
          }
          else {
            logger.error("Error sending with flxhr : "+ExSIP.Utils.toString(XHRobj));
            error(XHRobj);
          }
        }
      }

      var flproxy = new flensed.flXHR({
        autoUpdatePlayer:false,
        instanceId:"myproxy1",
        xmlResponseText:false,
        onreadystatechange:handle_load
      });

      flproxy.open(type, url, true);
      flproxy.send(JSON.stringify(jsonData));
    },
    send: function(type, restSuffix, jsonData, successCallback, failureCallback){
      var self = this;
      var url = "http://"+ClientConfig.smsHost+"/"+ClientConfig.smsUser+"/"+restSuffix;
      if(this.jsessionid) {
        url += ";jsessionid="+this.jsessionid;
      }
      logger.log("Request to "+url+" : "+jsonData, this.client.configuration);
      $.ajax({
        crossDomain: true,
        dataType: "json",
        type: type,
        url: url,
        data: JSON.stringify(jsonData)
      })
        .done(function(msg){
          if(msg.status.code === "0000001") {
            logger.log("Response successful : "+msg, self.client.configuration);
            if(successCallback) {
              successCallback(msg);
            }
          } else {
            logger.log("Response failed : "+msg.status.code, self.client.configuration);
            if(failureCallback) {
              failureCallback(msg);
            }
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown){
          logger.error('Response error : '+textStatus);
          self.sendWithFlxhr({url: url, type: 'POST', data: jsonData, success: successCallback, error: failureCallback});
        });

    },
    sendSMS: function(desttnarray, body){
      var self = this;
      var onSuccess = function( msg ) {
        logger.log( "send msg "+body+" to " + desttnarray, self.client.configuration);
      };
      var data = {desttnarray: desttnarray, body: body};
      this.send("GET", "ua/msg/sms/send", data, onSuccess);
    },
    remove: function(mids){
      var self = this;
      var onSuccess = function( msg ) {
        logger.log( "Deleted msgs : " + mids, self.client.configuration);
      };
      var data = {mids: mids};
      this.send("GET", "ua/msg/sms/delete", data, onSuccess);
    },
    readAll: function(){
      var self = this;
      var onSuccess = function( msg ) {
        logger.log( "Read all mgs : " + ExSIP.toString(msg.messages), self.client.configuration);
      };
      var data = {};
      this.send("GET", "ua/msg/sms/all", data, onSuccess);
    },
    login: function(name, password){
      var self = this;
      var onSuccess = function( msg ) {
        self.sessionid = msg.sessionid;
        logger.log( "Logged in: " + msg.sessionid, self.client.configuration);
      };
      var data = { spcode: ClientConfig.smsSpcode, password: password, name: name, platform: "fmc" };
      this.send("POST", "ua/login", data, onSuccess);
    },
    init: function(){
      if(ClientConfig.enableSMS) {
        try{
          this.login();
          this.registerListeners();
        } catch(e) {
          logger.error("Could not init SMS : "+e);
        }
      }
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

  WebRTC.SMS = SMS;
}(WebRTC));
