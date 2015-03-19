module.exports = require('webrtc-core').bdsft.Model(Settings);

var WebRTC_C = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Settings(eventbus, debug, configuration) {
  var self = {};

  var getResolution = function(resolutionStandard, resolutionWidescreen) {
    // console.log('self.resolutionType : '+self.resolutionType);
    if (self.resolutionType === WebRTC_C.STANDARD) {
      return self[resolutionStandard];
    } else if (self.resolutionType === WebRTC_C.WIDESCREEN) {
      return self[resolutionWidescreen];
    } else {
      return false;
    }
  };

  var setResolutionType = function(resolution) {
    if (Utils.containsKey(WebRTC_C.STANDARD_RESOLUTIONS, resolution)) {
      self.resolutionType = WebRTC_C.STANDARD;
    } else if (Utils.containsKey(WebRTC_C.WIDESCREEN_RESOLUTIONS, resolution)) {
      self.resolutionType = WebRTC_C.WIDESCREEN;
    } else {
      debug('no resolution type for ' + resolution);
    }
  };

  var setResolution = function(resolution, resolutionStandard, resolutionWidescreen) {
    if (Utils.containsKey(WebRTC_C.STANDARD_RESOLUTIONS, resolution)) {
      self.resolutionType = WebRTC_C.STANDARD;
      self[resolutionStandard] = resolution;
    } else if (Utils.containsKey(WebRTC_C.WIDESCREEN_RESOLUTIONS, resolution)) {
      self.resolutionType = WebRTC_C.WIDESCREEN;
      self[resolutionWidescreen] = resolution;
    } else {
      debug('no resolution type for ' + resolution);
    }
  };

  var updatePageColor = function() {
    var color = configuration.getBackgroundColor();
    debug('updating page color : ' + color);
    Utils.getElement('body').css('backgroundColor', color || '');
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

  self.props = {
    _type: 'cookie',
    userid: {
      onSet: function(value) {
        configuration.userid = value;
      }
    },
    password: {
      onSet: function(value) {
        configuration.password = value;
      },
    },
    authenticationUserid: {
      onSet: function(value) {
        configuration.authenticationUserid = value;
      },
    },
    resolutionType: {
      onSet: function(value) {
        configuration.resolutionType = value;
      },
    },
    localVideoTop: true,
    localVideoLeft: true,
    callHistoryTop: true,
    callHistoryLeft: true,
    callStatsTop: true,
    callStatsLeft: true,
    displayName: {
      value: function() {
        return configuration.sipDisplayName || $.cookie('settingsDisplayName')
      }
    },
    selfViewDisabled: {
      value: function() {
        return $.cookie('settingsSelfViewDisable') === "true"
      }
    },
    hd: {
      value: function() {
        return $.cookie('settingsHd') === "true"
      }
    },
    bandwidthLow: {
      value: function() {
        return configuration.bandwidthLow || $.cookie('settingsBandwidthLow')
      },
      onSet: function(value) {
        configuration.bandwidthLow = value;
      }
    },
    bandwidthMed: {
      value: function() {
        return configuration.bandwidthMed || $.cookie('settingsBandwidthMed')
      },
      onSet: function(value) {
        configuration.bandwidthMed = value;
      }
    },
    bandwidthHigh: {
      value: function() {
        return configuration.bandwidthHigh || $.cookie('settingsBandwidthHigh')
      },
      onSet: function(value) {
        configuration.bandwidthHigh = value;
      }
    },
    color: {
      value: function() {
        return configuration.getBackgroundColor()
      }
    },
    resolutionDisplayStandard: {
      onSet: function(value) {
        // console.log('resolutionDisplayStandard : onSet : '+value);
        if(self.resolutionType === WebRTC_C.STANDARD) {
          configuration.displayResolution = value;          
        }
      },
      value: function() {
        return configuration.displayResolution;
      }
    },
    resolutionDisplayWidescreen: {
      onSet: function(value) {
        // console.log('resolutionDisplayWidescreen : onSet : '+value);
        if(self.resolutionType === WebRTC_C.WIDESCREEN) {
          configuration.displayResolution = value;          
        }
      },
      value: function() {
        return configuration.displayResolution;
      }
    },
    resolutionEncodingStandard: {
      onSet: function(value) {
        // console.log('resolutionEncodingStandard : onSet : '+value);
        if(self.resolutionType === WebRTC_C.STANDARD) {
          configuration.encodingResolution = value;          
        }
      },
      value: function() {
        // console.log('resolutionEncodingStandard : ', configuration.encodingResolution);
        return configuration.encodingResolution;
      }
    },
    resolutionEncodingWidescreen: {
      onSet: function(value) {
        // console.log('resolutionEncodingWidescreen : onSet : '+value);
        if(self.resolutionType === WebRTC_C.WIDESCREEN) {
          configuration.encodingResolution = value;          
        }
      },
      value: function() {
        return configuration.encodingResolution;
      }
    },
    // TODO - look into better handle resolution properties 
    resolutionDisplay: {
      get: function() {
        return getResolution("resolutionDisplayStandard", "resolutionDisplayWidescreen");
      },
      set: function(resolution) {
        // console.log('resolutionDisplay : set : '+resolution);
        configuration.displayResolution = resolution;
        setResolution(resolution, "resolutionDisplayStandard", "resolutionDisplayWidescreen");
        $.cookie('settingsResolutionDisplay', resolution);
      },
      value: function() {
        return configuration.displayResolution;
      }
    },
    resolutionEncoding: {
      get: function() {
        return getResolution("resolutionEncodingStandard", "resolutionEncodingWidescreen");
      },
      set: function(resolution) {
        // console.log('resolutionEncoding : set : '+resolution);
        configuration.encodingResolution = resolution;
        setResolution(resolution, "resolutionEncodingStandard", "resolutionEncodingWidescreen")
        $.cookie('settingsResolutionEncoding', resolution);
      },
      value: function() {
        return configuration.encodingResolution;
      }
    },
    size: {
      value: function() {
        return configuration.size || $.cookie('settingsSize')
      }
    },
    autoAnswer: {
      value: function() {
        var value = configuration.enableAutoAnswer !== undefined ? configuration.enableAutoAnswer : $.cookie('settingsAutoAnswer') === "true";
        return value;
      }
    },
    windowPosition: {
      get: function() {
        return ".localVideo" + "-" + self.localVideoTop + "-" + self.localVideoLeft + "|" +
          ".callHistory" + "-" + self.callHistoryTop + "-" + self.callHistoryLeft + "|" +
          ".callStats" + "-" + self.callStatsTop + "-" + self.callStatsLeft;
      },
      set: function(val) {}
    }
  };

  self.init = function() {
    updatePageColor();
  };

  self.listeners = function(configurationDatabinder) {
    configurationDatabinder.onModelChange(function(name, value){
      self[name] = value;
    });
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

  self.reload = function() {
    location.reload(0);
  };
  self.save = function() {
    self.persist();
    changed();
  };
  self.signIn = function() {
    self.persist();
    eventbus.signIn();
  };
  self.signOut = function() {
    eventbus.signOut();
    self.clearConfigurationCookies();
  };
  self.resetLayout = function() {
    self.resolutionEncoding = WebRTC_C.DEFAULT_RESOLUTION_ENCODING;
    self.resolutionDisplay = WebRTC_C.DEFAULT_RESOLUTION_DISPLAY;
  };
  self.clearConfigurationCookies = function() {
    $.removeCookie('settingsDisplayName');
    $.removeCookie('settingsUserid');
    $.removeCookie('settingsAuthenticationUserid');
    $.removeCookie('settingsPassword');
  };
  self.clearConfiguration = function() {
    self.displayName = null;
    self.userid = null;
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

  return self;
}