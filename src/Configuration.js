/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Configuration,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Configuration');

  Configuration = function() {
    if(this.isDebug()) {
      logger.log('window.location.search : '+window.location.search);
    }
    // Default URL variables
    this.register = (WebRTC.Utils.getSearchVariable("register") === "true");
    this.password = WebRTC.Utils.getSearchVariable("password") || $.cookie('settingPassword');
    this.userid = WebRTC.Utils.getSearchVariable("userid") || $.cookie('settingUserid');
    this.destination = WebRTC.Utils.getSearchVariable("destination");
    this.hd = (WebRTC.Utils.getSearchVariable("hd") === "true") || $.cookie('settingHD');
    this.audioOnly = (WebRTC.Utils.getSearchVariable("audioOnly") === "true");
    this.displayName = $.cookie('settingDisplayName') || WebRTC.Utils.getSearchVariable("name").toString().replace("%20"," ");
    this.maxCallLength = WebRTC.Utils.getSearchVariable("maxCallLength");
    this.hideCallControl = (WebRTC.Utils.getSearchVariable("hide") === "true");
    this.size = WebRTC.Utils.getSearchVariable("size") || $.cookie('settingSize') || 1;
    this.color = WebRTC.Utils.colorNameToHex(WebRTC.Utils.getSearchVariable("color")) || $.cookie('settingColor');

    // Client Variables
    this.timerRunning = false;
    this.disableICE = ClientConfig.disableICE;
    this.transmitVGA = $.cookie('settingTransmitVGA') || ClientConfig.transmitVGA;
    this.transmitHD = $.cookie('settingTransmitHD') || ClientConfig.transmitHD;
  };

  Configuration.prototype = {
    getDTMFOptions: function(){
      return {duration: WebRTC.C.DEFAULT_DURATION, interToneGap: WebRTC.C.DEFAULT_INTER_TONE_GAP};
    },
    getExSIPOptions: function(){
      // Options Passed to ExSIP
      var options =
      {
        mediaConstraints:
        {
          audio: true,
          video: this.getVideoConstraints()
        },
        RTCConstraints: {'optional': [],'mandatory': {}}
      };

      return options;
    },

    getVideoConstraints: function(){
      if (this.audioOnly) {
        return false;
      } else {
        var constraints = this.getResolutionConstraints();
        return  constraints ? constraints : true;
      }
    },

    getResolutionConstraints: function(){
      if(this.hd === true) {
        return { mandatory: { minWidth: 1280, minHeight: 720 }};
      } else {
        var resolution = this.settings.getResolutionEncoding();
        if(!$.isBlank(resolution)) {
          var resolutions = resolution.split('x');
          return { mandatory: { maxWidth: parseInt(resolutions[0], 10), maxHeight: parseInt(resolutions[1], 10) }};
        } else {
          return false;
        }
      }
    },

    getExSIPConfig: function(userid, password){
      var sip_uri = null;
      // Config settings
      if ((userid.indexOf("@") === -1))
      {
        sip_uri = (userid + "@" + ClientConfig.domainFrom);
      }
      else
      {
        sip_uri = userid;
      }

      var config  =
      {
        'uri': sip_uri,
        'ws_servers': ClientConfig.websocketsType + "://" + ClientConfig.websocketsGateway + ":" + ClientConfig.websocketsPort,
        'stun_servers': 'stun:' + ClientConfig.stunServer + ':' + ClientConfig.stunPort,
        'trace_sip': ClientConfig.debug
      };

      // Add Display Name if set
      if (this.displayName.indexOf("false") === -1)
      {
        config.display_name = this.displayName;
      }

      // Modify config object based password
      if (password === false || password === undefined || password === '')
      {
        config.register = false;
      }
      else
      {
        config.register = true,
        config.password = password;
      }
      return config;
    },

    getRtcMediaHandlerOptions: function(){
      var options = {reuseLocalMedia: ClientConfig.enableConnectLocalMedia};
      if (this.isHD())
      {
        options["videoBandwidth"] = this.transmitHD;
      }
      else
      {
        options["videoBandwidth"] = this.transmitVGA;
      }
      options["disableICE"] = this.disableICE;
      return options;
    },

    setSettings: function(settings){
      this.settings = settings;
    },

    isDebug: function(){
      return ClientConfig.debug === true;
    },

    isHD: function(){
      return ClientConfig.enableHD === true && this.hd === true;
    },

    isWidescreen: function() {
      return this.isHD() || this.settings.resolutionType.val() === WebRTC.C.WIDESCREEN;
    },

    getResolutionDisplay: function() {
      return this.isHD() ? WebRTC.C.R_1280x720 : this.settings.getResolutionDisplay();
    }
  };
  WebRTC.Configuration = Configuration;
}(WebRTC));
