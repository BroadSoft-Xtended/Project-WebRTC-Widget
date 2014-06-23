/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Configuration,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Configuration'),
    Flags = {
      enableHD: 1,
      enableCallControl: 2,
      enableCallTimer: 4,
      enableCallHistory: 8,
      enableFullScreen: 16,
      enableSelfView: 32,
      enableCallStats: 64,
      enableDialpad: 128,
      enableMute: 256,
      enableMessages: 512,
      enableRegistrationIcon: 1024,
      enableConnectionIcon: 2048,
      enableWindowDrag: 4096,
      enableSettings: 8192,
      enableAutoAnswer: 16384,
      enableAutoAcceptReInvite: 32768,
      enableConnectLocalMedia: 65536,
      enableTransfer: 131072,
      enableHold: 262144,
      enableIms: 524288
    };

  Configuration = function(client, configObj) {
    logger.log('window.location.search : '+window.location.search, this);
    logger.log('configuration options : '+ExSIP.Utils.toString(configObj), this);
    jQuery.extend(this, configObj);

    // Default URL variables
    this.client = client;
    this.userid = this.networkUserId || WebRTC.Utils.getSearchVariable("userid") || $.cookie('settingUserid');
    this.destination = this.destination || WebRTC.Utils.getSearchVariable("destination");
    this.hd = (WebRTC.Utils.getSearchVariable("hd") === "true") || $.cookie('settingHD');
    this.audioOnly = (WebRTC.Utils.getSearchVariable("audioOnly") === "true");
    this.sipDisplayName = this.displayName || WebRTC.Utils.getSearchVariable("name") || $.cookie('settingDisplayName');
    if(this.sipDisplayName) {
      this.sipDisplayName = this.sipDisplayName.replace(/%20/g," ");
    }
    this.maxCallLength = WebRTC.Utils.getSearchVariable("maxCallLength");
    this.size = WebRTC.Utils.getSearchVariable("size") || $.cookie('settingSize') || 1;
    this.color = WebRTC.Utils.colorNameToHex(WebRTC.Utils.getSearchVariable("color")) || $.cookie('settingColor');
    this.offerToReceiveVideo = true;
    var features = WebRTC.Utils.getSearchVariable("features");
    if(features) {
      this.setClientConfigFlags(parseInt(features, 10));
    }
  };

  Configuration.prototype = {
    getClientConfigFlags: function(){
      var flags = 0;
      for(var flag in Flags) {
        var value = Flags[flag];
        if(this[flag]) {
          flags |= value;
        }
      }
      return flags;
    },
    setClientConfigFlags: function(flags){
      for(var flag in Flags) {
        var value = Flags[flag];
        if(flags & value) {
          this[flag] = true;
        } else {
          this[flag] = false;
        }
      }
    },
    isAudioOnlyView: function(){
      var view = this.getView();
      return view === 'audioOnly';
    },
    getView: function(){
      return this.view || WebRTC.Utils.getSearchVariable("view");
    },
    getBackgroundColor: function(){
      return this.color || $('body').css('backgroundColor');
    },
    getRegister: function(){
      return this.register || WebRTC.Utils.getSearchVariable("register") === "true";
    },
    getPassword: function(){
      return WebRTC.Utils.getSearchVariable("password") || $.cookie('settingPassword');
    },
    isAutoAnswer: function(){
      return this.settings.settingAutoAnswer.is(':checked');
    },
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
        createOfferConstraints: {mandatory:{
          OfferToReceiveAudio:true,
          OfferToReceiveVideo: !this.isAudioOnlyView() && this.offerToReceiveVideo
        }}
      };

      return options;
    },

    getVideoConstraints: function(){
      if (this.isAudioOnlyView() || this.audioOnly) {
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
        var width = this.settings.getResolutionEncodingWidth();
        var height = this.settings.getResolutionEncodingHeight();
        if(width && height) {
          if(height <= 480) {
            return { mandatory: { maxWidth: width, maxHeight: height }};
          } else {
            return { mandatory: { minWidth: width, minHeight: height }};
          }
        } else {
          return false;
        }
      }
    },

    getExSIPConfig: function(userid, password){
      var sip_uri = null;
      // Config settings
      userid = encodeURI(userid);
      if ((userid.indexOf("@") === -1))
      {
        sip_uri = (userid + "@" + this.domainFrom);
      }
      else
      {
        sip_uri = userid;
      }

      var config  =
      {
        'uri': sip_uri,
        'ws_servers': this.websocketsServers,
        'stun_servers': 'stun:' + this.stunServer + ':' + this.stunPort,
        'trace_sip': this.debug,
        'enable_ims': this.enableIms
      };

      // Add Display Name if set
      if (this.sipDisplayName)
      {
        config.display_name = this.sipDisplayName;
      }

      // Modify config object based password
      if ((password === false || password === undefined || password === '') && !this.getRegister())
      {
        config.register = false;
      }
      else
      {
        config.register = true;
        config.password = password;
      }
      return config;
    },

    getRtcMediaHandlerOptions: function(){
      var options = {
        reuseLocalMedia: this.enableConnectLocalMedia,
        videoBandwidth: this.settings.getBandwidth(),
        disableICE: this.disableICE,
        RTCConstraints: {'optional': [],'mandatory': {}}
      };
      return options;
    },

    setSettings: function(settings){
      this.settings = settings;
    },

    isDebug: function(){
      return this.debug === true;
    },

    isHD: function(){
      return this.enableHD === true && this.hd === true;
    },

    isWidescreen: function() {
      return this.isHD() || this.settings.resolutionType.val() === WebRTC.C.WIDESCREEN;
    },

    setResolutionDisplay: function(resolutionDisplay) {
      this.hd = false;
      this.settings.setResolutionDisplay(resolutionDisplay);
      this.client.updateClientClass();
    },

    getResolutionDisplay: function() {
      return this.isHD() ? WebRTC.C.R_1280x720 : this.settings.getResolutionDisplay();
    }
  };
  WebRTC.Configuration = Configuration;
  WebRTC.Configuration.Flags = Flags;
}(WebRTC));
