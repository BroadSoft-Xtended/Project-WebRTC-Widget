module.exports = Settings;

var WebRTC_C = require('../Constants');
var Utils = require('../Utils');

function Settings(options, configuration, settingsView) {
  var self = {};
  var eventbus = require('../factory')(require('./eventbus'))(options);
  var debug = require('../factory')(require('./debug'))(options);
  self.view = settingsView;
  
  var updatePageColor = function() {
    var color = configuration.getBackgroundColor();
    debug('updating page color : ' + color);
    $('body').css('backgroundColor', color || '');
  };

  var isStarted = false;
  self.changed = false;

  self.init = function(options) {
    updatePageColor();
  };

  self.listeners = function() {
    eventbus.on("ended", function() {
      isStarted = false;
      if (self.changed) {
        self.reload();
      }
    });
    eventbus.on("started", function() {
      isStarted = true;
    });
  };

  self.getBandwidth = function() {
    var height = self.getResolutionEncodingHeight();
    if (height <= 240) {
      return self.bandwidthLow;
    } else if (height <= 480) {
      return self.bandwidthMed;
    } else if (height <= 720) {
      return self.bandwidthHigh;
    }
  };
  self.reload = function() {
    location.reload(0);
  };
  self.getResolutionDisplay = function() {
    debug('+++++++++++++'+$.cookie('settingResolutionDisplay'));
    return self.getResolution("resolutionDisplayStandard", "resolutionDisplayWidescreen");
  };
  self.getResolutionEncoding = function() {
    return self.getResolution("resolutionEncodingStandard", "resolutionEncodingWidescreen");
  };
  self.getResolutionEncodingWidth = function() {
    var resolution = self.getResolutionEncoding();
    if (!$.isBlank(resolution)) {
      var resolutions = resolution.split('x');
      return parseInt(resolutions[0], 10);
    }
  };
  self.getResolutionEncodingHeight = function() {
    var resolution = self.getResolutionEncoding();
    if (!$.isBlank(resolution)) {
      var resolutions = resolution.split('x');
      return parseInt(resolutions[1], 10);
    }
  };
  self.getResolution = function(resolutionStandard, resolutionWidescreen) {
    // console.log('self.resolutionType : '+self.resolutionType);
    if (self.resolutionType === WebRTC_C.STANDARD) {
      return self[resolutionStandard];
    } else if (self.resolutionType === WebRTC_C.WIDESCREEN) {
      return self[resolutionWidescreen];
    } else {
      return false;
    }
  };

  self.setResolutionDisplay = function(resolution) {
    self.setResolution(resolution, "resolutionDisplayStandard", "resolutionDisplayWidescreen");
  };

  self.setResolutionEncoding = function(resolution) {
    self.setResolution(resolution, "resolutionEncodingStandard", "resolutionEncodingWidescreen");
  };

  self.setResolution = function(resolution, resolutionStandard, resolutionWidescreen) {
    if (Utils.containsKey(WebRTC_C.STANDARD_RESOLUTIONS, resolution)) {
      self.resolutionType = WebRTC_C.STANDARD;
      self[resolutionStandard] = resolution;
    } else if (Utils.containsKey(WebRTC_C.WIDESCREEN_RESOLUTIONS, resolution)) {
      self.resolutionType = WebRTC_C.WIDESCREEN;
      self[resolutionWidescreen] = resolution;
    } else {
      debug('no resolution type for ' + resolution);
    }
    settingsView.updateResolutionSelectVisibility();
  };

  self.changed = function() {
    if (!isStarted) {
      self.reload();
    } else {
      self.changed = true;
    }
  };
  self.save = function() {
    self.persist();
    view.hide();
    self.changed();
  };
  self.signIn = function() {
    self.persist();
    eventbus.signIn();
    view.enableRegistration(false);
  };
  self.signOut = function() {
    eventbus.signOut();
    self.clearConfigurationCookies();
    view.enableRegistration(false);
  };
  self.resetLayout = function() {
    self.resolutionEncoding = WebRTC_C.DEFAULT_RESOLUTION_ENCODING;
    self.resolutionDisplay = WebRTC_C.DEFAULT_RESOLUTION_DISPLAY;
    eventbus.viewChanged(self);
  };
  self.clearConfigurationCookies = function() {
    $.removeCookie('settingDisplayName');
    $.removeCookie('settingUserid');
    $.removeCookie('settingAuthenticationUserid');
    $.removeCookie('settingPassword');
  };
  self.clearConfiguration = function() {
    self.displayName = null;
    self.userid = null ;
    self.authenticationUserid = null;
    self.password = null;
  };
  self.clear = function() {
    for (var name in self.props) {
      self[name] = null;
    }
  };
  self.persist = function() {
    for (var name in self.props) {
      self[name] = self[name];
    }
  };


  self.props = {
    _type: 'cookie',
    userid: true,
    password: true,
    authenticationUserid: true,
    resolutionType: true,
    displayName: {
      value: function(){return configuration.sipDisplayName || $.cookie('settingDisplayName')}
    },
    selfViewDisabled: {
      value: function(){return $.cookie('selfViewDisable') === "true"}
    },
    hd: {
      value: function(){return $.cookie('hd') === "true"}
    },
    bandwidthLow: {
      value: function(){return configuration.bandwidthLow || $.cookie('settingBandwidthLow')}
    },
    bandwidthMed: {
      value: function(){return configuration.bandwidthMed || $.cookie('settingBandwidthMed')}
    },
    bandwidthHigh: {
      value: function(){return configuration.bandwidthHigh || $.cookie('settingBandwidthHigh')}
    },
    color: {
      value: function(){return configuration.getBackgroundColor()},
      default: '#ffffff'
    },
    resolutionDisplayStandard: true,
    resolutionDisplayWidescreen: true,
    resolutionEncodingStandard: true,
    resolutionEncodingWidescreen: true,
    resolutionDisplay: {
      get: function(){
        return self.getResolution("resolutionDisplayStandard", "resolutionDisplayWidescreen");
      },
      set: function(resolution){
        self.setResolution(resolution, "resolutionDisplayStandard", "resolutionDisplayWidescreen")
      },
      value: function(){
            debug('+++++++++++++ : '+configuration.displayResolution);
            debug('+++++++++++++ : '+$.cookie('settingResolutionDisplay'));

        return configuration.displayResolution || $.cookie('settingResolutionDisplay') || WebRTC_C.DEFAULT_RESOLUTION_DISPLAY
      }
    },
    resolutionEncoding: {
      get: function(){
        return self.getResolution("resolutionEncodingStandard", "resolutionEncodingWidescreen");
      },
      set: function(resolution){
        self.setResolution(resolution, "resolutionEncodingStandard", "resolutionEncodingWidescreen")
      },
      value: function(){ return configuration.encodingResolution || $.cookie('settingResolutionEncoding') || WebRTC_C.DEFAULT_RESOLUTION_ENCODING;}
    },
    size: {
      value: function(){return configuration.size || $.cookie('size')}
    },
    autoAnswer: {
      value: function(){return $.cookie('autoAnswer') === "true"}
    },
    windowPosition: {
      get: function() {
        return ".localVideo" + "-" + self.localVideoTop.val() + "-" + self.localVideoLeft.val() + "|" +
          ".callHistory" + "-" + self.callHistoryTop.val() + "-" + self.callHistoryLeft.val() + "|" +
          ".callStats" + "-" + self.callStatsTop.val() + "-" + self.callStatsLeft.val();
      },
      set: function(val) {}
    }
  };


  return self;
}