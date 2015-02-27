module.exports = Settings;

var WebRTC_C = require('../Constants');
var Utils = require('../Utils');

function Settings(configuration, settingsView, eventbus, debug) {
  var self = {};
  self.view = settingsView;
  
  var updatePageColor = function() {
    var color = configuration.getBackgroundColor();
    debug('updating page color : ' + color);
    $('body').css('backgroundColor', color || '');
  };

  var isStarted = false;
  var _changed = false;
  var changed = function() {
    if (!isStarted) {
      self.reload();
    } else {
      _changed = true;
    }
  };

  self.init = function() {
    updatePageColor();
  };

  self.listeners = function() {
    eventbus.on("ended", function() {
      isStarted = false;
      if (_changed) {
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
  self.save = function() {
    self.persist();
    settingsView.hide();
    changed();
  };
  self.signIn = function() {
    self.persist();
    eventbus.signIn();
    settingsView.enableRegistration(false);
  };
  self.signOut = function() {
    eventbus.signOut();
    self.clearConfigurationCookies();
    settingsView.enableRegistration(false);
  };
  self.resetLayout = function() {
    self.resolutionEncoding = WebRTC_C.DEFAULT_RESOLUTION_ENCODING;
    self.resolutionDisplay = WebRTC_C.DEFAULT_RESOLUTION_DISPLAY;
    eventbus.viewChanged(self);
  };
  self.clearConfigurationCookies = function() {
    $.removeCookie('settingsDisplayName');
    $.removeCookie('settingsUserid');
    $.removeCookie('settingsAuthenticationUserid');
    $.removeCookie('settingsPassword');
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
      value: function(){return configuration.sipDisplayName || $.cookie('settingsDisplayName')}
    },
    selfViewDisabled: {
      value: function(){return $.cookie('settingsSelfViewDisable') === "true"}
    },
    hd: {
      value: function(){return $.cookie('settingsHd') === "true"}
    },
    bandwidthLow: {
      value: function(){return configuration.bandwidthLow || $.cookie('settingsBandwidthLow')}
    },
    bandwidthMed: {
      value: function(){return configuration.bandwidthMed || $.cookie('settingsBandwidthMed')}
    },
    bandwidthHigh: {
      value: function(){return configuration.bandwidthHigh || $.cookie('settingsBandwidthHigh')}
    },
    color: {
      value: function(){return configuration.getBackgroundColor()}
    },
    resolutionDisplayStandard: true,
    resolutionDisplayWidescreen: true,
    resolutionEncodingStandard: true,
    resolutionEncodingWidescreen: true,
    // TODO - look into better handle resolution properties 
    resolutionDisplay: {
      get: function(){
        return self.getResolution("resolutionDisplayStandard", "resolutionDisplayWidescreen");
      },
      set: function(resolution){
        self.setResolution(resolution, "resolutionDisplayStandard", "resolutionDisplayWidescreen");
        $.cookie('settingsResolutionDisplay', resolution);
      },
      value: function(){
        return configuration.displayResolution || $.cookie('settingsResolutionDisplay') || WebRTC_C.DEFAULT_RESOLUTION_DISPLAY
      }
    },
    resolutionEncoding: {
      get: function(){
        return self.getResolution("resolutionEncodingStandard", "resolutionEncodingWidescreen");
      },
      set: function(resolution){
        self.setResolution(resolution, "resolutionEncodingStandard", "resolutionEncodingWidescreen")
        $.cookie('settingsResolutionEncoding', resolution);
      },
      value: function(){ return configuration.encodingResolution || $.cookie('settingsResolutionEncoding') || WebRTC_C.DEFAULT_RESOLUTION_ENCODING;}
    },
    size: {
      value: function(){return configuration.size || $.cookie('settingsSize')}
    },
    autoAnswer: {
      value: function(){
        var value = configuration.enableAutoAnswer !== undefined ? configuration.enableAutoAnswer : $.cookie('settingsAutoAnswer') === "true";
        return value;
      }
    },
    windowPosition: {
      get: function() {
        return ".localVideo" + "-" + settingsView.localVideoTop.val() + "-" + settingsView.localVideoLeft.val() + "|" +
          ".callHistory" + "-" + settingsView.callHistoryTop.val() + "-" + settingsView.callHistoryLeft.val() + "|" +
          ".callStats" + "-" + settingsView.callStatsTop.val() + "-" + settingsView.callStatsLeft.val();
      },
      set: function(val) {}
    }
  };


  return self;
}