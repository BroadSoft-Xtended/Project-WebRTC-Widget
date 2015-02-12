module.exports = require('../factory')(Configuration);

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
require('jquery.cookie')
// TODO : hack to test in node js directly
if(typeof document === 'undefined') {
  document = {};
}
function Configuration(options, eventbus, debug, sipstack, settings) {
  var self = {};

  debug('configuration options : ' + ExSIP.Utils.toString(options));
  jQuery.extend(self, options);

  var screenshare = false;
  // Default URL variables
  if (Utils.getSearchVariable("disableMessages")) {
    self.enableMessages = false;
  }
  self.destination = self.destination || Utils.getSearchVariable("destination");
  self.networkUserId = self.networkUserId || Utils.getSearchVariable("networkUserId");
  self.hd = (Utils.getSearchVariable("hd") === "true") || $.cookie('settingHD');
  self.audioOnly = (Utils.getSearchVariable("audioOnly") === "true");
  self.sipDisplayName = self.displayName || Utils.getSearchVariable("name") || $.cookie('settingDisplayName');
  if (self.sipDisplayName) {
    self.sipDisplayName = self.sipDisplayName.replace(/%20/g, " ");
  }
  self.maxCallLength = Utils.getSearchVariable("maxCallLength");
  self.size = Utils.getSearchVariable("size") || $.cookie('settingSize') || 1;
  self.color = Utils.colorNameToHex(Utils.getSearchVariable("color")) || $.cookie('settingColor');
  self.offerToReceiveVideo = true;
  var features = Utils.getSearchVariable("features");
  if (features) {
    self.setClientConfigFlags(parseInt(features, 10));
  }
  self.bodyBackgroundColor = $('body').css('backgroundColor');

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
    self.offerToReceiveVideo = !audioOnly;
    sipstack.updateUserMedia();
  };

  self.setAudioOnly = function(audioOnly) { 
    self.audioOnly = audioOnly;
    self.offerToReceiveVideo = true;
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
    return self.settings.settingAutoAnswer.is(':checked');
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
          OfferToReceiveVideo: !self.isAudioOnlyView() && self.offerToReceiveVideo
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
      var width = self.settings.getResolutionEncodingWidth();
      var height = self.settings.getResolutionEncodingHeight();
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
      videoBandwidth: self.settings.getBandwidth(),
      disableICE: self.disableICE,
      RTCConstraints: {
        'optional': [],
        'mandatory': {}
      }
    };
    return options;
  };

  self.isHD = function() {
    return self.enableHD === true && self.hd === true;
  };

  self.isWidescreen = function() {
    return self.isHD() || self.settings.resolutionType.val() === WebRTC_C.WIDESCREEN;
  };

  self.setResolutionDisplay = function(resolutionDisplay) {
    self.hd = false;
    self.settings.setResolutionDisplay(resolutionDisplay);
    eventbus.viewChanged(self);
  };

  self.getResolutionDisplay = function() {
    return self.isHD() ? WebRTC_C.R_1280x720 : self.settings.getResolutionDisplay();
  }  

  return self;
}

