module.exports = Configuration;

var Flags = {
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

Configuration.Flags = Flags;

var Utils = require('../Utils');
var WebRTC_C = require('../Constants');
var ExSIP = require('exsip');
var jQuery = $ = require('jquery');
// TODO : hack to test in node js directly
if(typeof document === 'undefined') {
  document = {};
}
function Configuration(options, eventbus, debug, settings) {
  var self = {};
  options = options || {};

  jQuery.extend(self, options);

  var screenshare = false;
  var offerToReceiveVideo = true;
  var bodyBackgroundColor = $('body').css('backgroundColor');
  
  // TODO - refactor to not have to specify each config prop but use from options
  self.props = {

    messageEnded: {value: function(){return options.messageEnded}},
    messageResume: {value: function(){return options.messageResume}},
    messageHold: {value: function(){return options.messageHold}},
    messageStarted: {value: function(){return options.messageStarted}},
    messageConnectionFailed: {value: function(){return options.messageConnectionFailed}},
    messageProgress: {value: function(){return options.messageProgress}},
    messageRegistrationFailed: {value: function(){return options.messageRegistrationFailed}},
    messageRegistered: {value: function(){return options.messageRegistered}},
    messageUnregistered: {value: function(){return options.messageUnregistered}},
    messageConnected: {value: function(){return options.messageConnected}},
    enableConnectLocalMedia: {value: function(){return options.enableConnectLocalMedia}},
    allowOutside: {value: function(){return options.allowOutside}},
    domainFrom: {value: function(){debug('domainFrom : '+options.domainFrom); return options.domainFrom}},
    domainTo: {value: function(){return options.domainTo}},
    destination: {
      value: function(){return options.destination || Utils.getSearchVariable("destination");}
    },
    networkUserId: {
      value: function(){return options.networkUserId || Utils.getSearchVariable("networkUserId");}
    },
    hd: {
      value: function(){return Utils.getSearchVariable("hd") === "true" || $.cookie('settingHD');}
    },
    audioOnly: {
      value: function(){return Utils.getSearchVariable("audioOnly") === "true";}
    },
    sipDisplayName: {
      value: function(){
        var name = options.displayName || Utils.getSearchVariable("name") || $.cookie('settingDisplayName');
        if (name) {
          name = name.replace(/%20/g, " ");
        }
        return name;
      }
    },
    maxCallLength: {
      value: function(){return Utils.getSearchVariable("maxCallLength");}
    },
    size: {
      value: function(){return Utils.getSearchVariable("size") || $.cookie('settingsize') || 1;}
    },
    color: {
      value: function(){return Utils.colorNameToHex(Utils.getSearchVariable("color")) || $.cookie('settingColor');}
    },
    enableMessages: {
      value: function(){return !(!!Utils.getSearchVariable("disableMessages"));}
    },
    features: {
      value: function(){
        var features = Utils.getSearchVariable("features");
        if (features) {
         self.setClientConfigFlags(parseInt(features, 10));
        }
      }
    }
  };

  self.init = function(options) { 
    debug('configuration options : ' + ExSIP.Utils.toString(options));
    debug('configuration : ' + ExSIP.Utils.toString(self));
  };

  self.listeners = function(audioOnly) { 
    eventbus.on('screenshare', function(e) {
      self.screenshare = e.enabled;
    });
    eventbus.on("started", function(e) {
      //remove configuration.destination to avoid multiple calls
      delete self.destination;
    });
  };

  self.setAudioOnlyOfferAndRec = function(audioOnly) { 
    self.audioOnly = audioOnly;
    offerToReceiveVideo = !audioOnly;
    sipstack.updateUserMedia();
  };

  self.setAudioOnly = function(audioOnly) { 
    self.audioOnly = audioOnly;
    offerToReceiveVideo = true;
    sipstack.updateUserMedia();
  };

  self.getClientConfigFlags = function() {
    var flags = 0;
    for (var flag in Flags) {
      var value = Flags[flag];
      if (self[flag]) {
        flags |= value;
      }
    }
    return flags;
  };
  self.setClientConfigFlags = function(flags) {
    for (var flag in Flags) {
      var value = Flags[flag];
      if (flags & value) {
        self[flag] = true;
      } else {
        self[flag] = false;
      }
    }
  };
  self.isAudioOnlyView = function() {
    var views = self.getViews();
    return views.indexOf('audioOnly') !== -1;
  };
  self.getViews = function() {
    var view = Utils.getSearchVariable("view");
    var views = [];
    if (self.view) {
      $.merge(views, self.view.split(' '));
    }
    if (view) {
      $.merge(views, view.split(' '));
    }
    return $.unique(views);
  };
  self.getBackgroundColor = function() {
    return self.color || self.bodyBackgroundColor;
  };
  self.getPassword = function() {
    return $.cookie('settingPassword');
  };
  self.isAutoAnswer = function() {
    return settings.autoAnswer;
  };
  self.getDTMFOptions = function() {
    return {
      duration: WebRTC_C.DEFAULT_DURATION,
      interToneGap: WebRTC_C.DEFAULT_INTER_TONE_GAP
    };
  };
  self.getExSIPOptions = function() {
    // Options Passed to ExSIP
    var options = {
      mediaConstraints: {
        audio: true,
        video: self.getVideoConstraints()
      },
      createOfferConstraints: {
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: !self.isAudioOnlyView() && offerToReceiveVideo
        }
      }
    };
    return options;
  };

  self.getMediaConstraints = function() {
    if (self.screenshare) {
      return {
        video: {
          mandatory: {
            chromeMediaSource: 'screen'
          }
        }
      };
    } else {
      return {
        audio: true,
        video: self.getVideoConstraints()
      };
    }
  };

  self.getVideoConstraints = function() {
    if (self.isAudioOnlyView() || self.audioOnly) {
      return false;
    } else {
      var constraints = self.getResolutionConstraints();
      return constraints ? constraints : true;
    }
  };

  self.getResolutionConstraints = function() {
    if (self.hd === true) {
      return {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      };
    } else {
      var width = settings.getResolutionEncodingWidth();
      var height = settings.getResolutionEncodingHeight();
      if (width && height) {
        if (height <= 480) {
          return {
            mandatory: {
              maxWidth: width,
              maxHeight: height
            }
          };
        } else {
          return {
            mandatory: {
              minWidth: width,
              minHeight: height
            }
          };
        }
      } else {
        return false;
      }
    }
  };

  self.getExSIPConfig = function(data) {
    data = data || {};
    var userid = data.userId || $.cookie('settingUserId') || self.networkUserId || Utils.randomUserid();

    var sip_uri = encodeURI(userid);
    if ((sip_uri.indexOf("@") === -1)) {
      sip_uri = (sip_uri + "@" + self.domainFrom);
    }

    var config = {
      'uri': sip_uri,
      'authorization_user': data.authenticationUserId || $.cookie('settingAuthenticationUserId') || userid,
      'ws_servers': self.websocketsServers,
      'stun_servers': 'stun:' + self.stunServer + ':' + self.stunPort,
      'trace_sip': self.debug,
      'enable_ims': self.enableIms,
      'p_asserted_identity': self.pAssertedIdentity,
      'enable_datachannel': self.enableWhiteboard || self.enableFileShare
    };

    // Add Display Name if set
    if (self.sipDisplayName) {
      config.display_name = self.sipDisplayName;
    }

    // do registration if setting User ID or configuration register is set
    if ($.cookie('settingUserId') || self.register) {
      config.register = true;
      config.password = data.password || $.cookie('settingPassword');
    } else {
      config.register = false;
    }
    return config;
  };

  self.getRtcMediaHandlerOptions = function() {
    var options = {
      reuseLocalMedia: self.enableConnectLocalMedia,
      videoBandwidth: settings.getBandwidth(),
      disableICE: self.disableICE,
      RTCConstraints: {
        'optional': [],
        'mandatory': {}
      }
    };
    return options;
  };

  self.isHD = function() {
    // console.log('isHD : '+self.enabledHD+', '+self.hd);
    return self.enableHD === true && self.hd === true;
  };

  self.isWidescreen = function() {
    return self.isHD() || settings.resolutionType === WebRTC_C.WIDESCREEN;
  };

  self.setResolutionDisplay = function(resolutionDisplay) {
    self.hd = false;
    settings.setResolutionDisplay(resolutionDisplay);
    eventbus.viewChanged(self);
  };

  self.getResolutionDisplay = function() {
    return self.isHD() ? WebRTC_C.R_1280x720 : settings.getResolutionDisplay();
  }  

  return self;
}

