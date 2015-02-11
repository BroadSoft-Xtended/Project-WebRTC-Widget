
module.exports = Settings;

var WebRTC_C = require('../Constants');
var Utils = require('../Utils');
var PopupView = require('./popup');

function Settings(options, configuration, sound, sipStack, eventbus, debug) {
  var self = {};

  self.__proto__ = PopupView(eventbus);

  var updateRowVisibility = function() {
    self.autoAnswerRow.toggle(configuration.enableAutoAnswer);
    self.selfViewDisableRow.toggle(!configuration.hasOwnProperty("enableSelfView"));
    self.hdRow.toggle(!configuration.hasOwnProperty("enableHD"));
    self.resolutionRow.toggle(!configuration.hasOwnProperty("displayResolution") || !configuration.hasOwnProperty("encodingResolution"));
    self.resolutionDisplayRow.toggle(!configuration.hasOwnProperty("displayResolution"));
    self.resolutionEncodingRow.toggle(!configuration.hasOwnProperty("encodingResolution"));
    self.resolutionTypeRow.toggle(!configuration.hasOwnProperty("displayResolution") && !configuration.hasOwnProperty("encodingResolution"));
    self.bandwidthLow.toggle(!configuration.hasOwnProperty("bandwidthLow"));
    self.bandwidthMed.toggle(!configuration.hasOwnProperty("bandwidthMed"));
    self.bandwidthHigh.toggle(!configuration.hasOwnProperty("bandwidthHigh"));
    self.bandwidthRow.toggle(!configuration.hasOwnProperty("bandwidthLow") || !configuration.hasOwnProperty("bandwidthMed") || !configuration.hasOwnProperty("bandwidthHigh"));
    self.displayNameRow.toggle(!configuration.hasOwnProperty("displayName"));
  };

  var updatePageColor = function() {
    var color = configuration.getBackgroundColor();
    debug('updating page color : ' + color);
    $('body').css('backgroundColor', color || '');
  };

  var initUi = function() {
    Utils.addSelectOptions(WebRTC_C.RESOLUTION_TYPES, self.resolutionType);
    Utils.addSelectOptions(WebRTC_C.STANDARD_RESOLUTIONS, self.resolutionDisplayStandard);
    Utils.addSelectOptions(WebRTC_C.WIDESCREEN_RESOLUTIONS, self.resolutionDisplayWidescreen);
    Utils.addSelectOptions(WebRTC_C.STANDARD_RESOLUTIONS, self.resolutionEncodingStandard);
    Utils.addSelectOptions(WebRTC_C.WIDESCREEN_RESOLUTIONS, self.resolutionEncodingWidescreen);

    for (var cookie in self.cookiesMapper) {
      var mapping = self.cookiesMapper[cookie];
      var value = mapping.initValue ? mapping.initValue() : $.cookie(cookie);
      mapping.inputSetter(value);
    }
  };

  self.elements = ['localVideoTop', 'localVideoLeft', 'userid', 'password', 'save', 'authenticationUserid', 'signIn', 'signOut',
  'displayName', 'resolutionType', 'resolutionDisplayWidescreen', 'resolutionDisplayStandard', 'resolutionEncodingWidescreen', 
  'resolutionEncodingStandard', 'bandwidthLow', 'bandwidthMed', 'bandwidthHigh', 'displayNameRow', 'useridRow', 'selfViewDisableRow',
  'hdRow', 'autoAnswerRow', 'resolutionTypeRow', 'resolutionDisplayRow', 'resolutionEncodingRow', 'resolutionRow', 'bandwidthRow',
  'callHistoryTop', 'callHistoryLeft', 'callStatsTop', 'callStatsLeft', 'selfViewDisable', 'hd', 'size', 'autoAnswer', 'configure', 
  'layout', 'clear', 'tabs'];

  self.changed = false;

  self.listeners = function() {
    eventbus.on("ended", function() {
      if (self.changed) {
        self.reload();
      }
    });
    eventbus.on("registered", function() {
      self.enableRegistration(true);
    });
    eventbus.on("unregistered", function() {
      self.enableRegistration(true);
    });
    eventbus.on("registrationFailed", function() {
      self.enableRegistration(true);
    });
    self.resolutionType.bind('change', function() {
      self.updateResolutionSelectVisibility();
    });
    self.colorInput.bind('change', function() {
      updatePageColor();
    });
    self.clear.on('click', function(e) {
      e.preventDefault();
      self.resetLayout();
      eventbus.emit('message', {text: 'Settings reset'});
    });
    self.signOut.on('click', function(e) {
      e.preventDefault();
      self.signOut();
    });
    self.save.bind('click', function(e) {
      e.preventDefault();
      self.save();
    });
    self.signIn.bind('click', function(e) {
      e.preventDefault();
      self.signIn();
    });
    self.bandwidthLow.bind('blur', function() {
      sipstack.updateRtcMediaHandlerOptions();
    });
    self.bandwidthMed.bind('blur', function() {
      sipstack.updateRtcMediaHandlerOptions();
    });
    self.bandwidthHigh.bind('blur', function() {
      sipstack.updateRtcMediaHandlerOptions();
    });
    self.resolutionType.bind('change', function() {
      eventbus.viewChanged(self);
      sipstack.updateRtcMediaHandlerOptions();
      sipstack.updateUserMedia();
    });
    self.resolutionDisplayWidescreen.bind('change', function() {
      eventbus.viewChanged(self);
    });
    self.resolutionDisplayStandard.bind('change', function() {
      eventbus.viewChanged(self);
    });
    self.resolutionEncodingWidescreen.bind('change', function() {
      sipstack.updateRtcMediaHandlerOptions();
      sipstack.updateUserMedia();
    });
    self.resolutionEncodingStandard.bind('change', function() {
      sipstack.updateRtcMediaHandlerOptions();
      sipstack.updateUserMedia();
    });
    self.tabs.each(function() {
      var $active, $content, $links = $(this).find('a');
      $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
      $active.addClass('active');
      $content = $($active[0].hash);
      $links.not($active).each(function() {
        $(this.hash).hide();
      });
      $(this).on('click', 'a', function(e) {
        $active.removeClass('active');
        $content.hide();
        $active = $(this);
        $content = $(self.hash);
        $active.addClass('active');
        $content.show();
        e.preventDefault();
      });
    });

  },
  self.getBandwidth = function() {
    var height = self.getResolutionEncodingHeight();
    if (height <= 240) {
      return self.bandwidthLow.val();
    } else if (height <= 480) {
      return self.bandwidthMed.val();
    } else if (height <= 720) {
      return self.bandwidthHigh.val();
    }
  };
  self.reload = function() {
    location.reload(0);
  };
  self.updateResolutionSelectVisibility = function() {
    var resolutionType = self.resolutionType.val();
    self.resolutionDisplayStandard.toggle(resolutionType === WebRTC_C.STANDARD);
    self.resolutionEncodingStandard.toggle(resolutionType === WebRTC_C.STANDARD);
    self.resolutionDisplayWidescreen.toggle(resolutionType === WebRTC_C.WIDESCREEN);
    self.resolutionEncodingWidescreen.toggle(resolutionType === WebRTC_C.WIDESCREEN);
  };
  self.setResolutionDisplay = function(resolution) {
    self.setResolution(resolution, self.resolutionDisplayStandard, self.resolutionDisplayWidescreen);
  };
  self.setResolutionEncoding = function(resolution) {
    self.setResolution(resolution, self.resolutionEncodingStandard, self.resolutionEncodingWidescreen);
  };
  self.setResolution = function(resolution, resolutionStandard, resolutionWidescreen) {
    if (Utils.containsKey(WebRTC_C.STANDARD_RESOLUTIONS, resolution)) {
      self.resolutionType.val(WebRTC_C.STANDARD);
      resolutionStandard.val(resolution);
    } else if (Utils.containsKey(WebRTC_C.WIDESCREEN_RESOLUTIONS, resolution)) {
      self.resolutionType.val(WebRTC_C.WIDESCREEN);
      resolutionWidescreen.val(resolution);
    } else {
      debug('no resolution type for ' + resolution);
    }
    self.updateResolutionSelectVisibility();
  };
  self.getResolutionDisplay = function() {
    return self.getResolution(self.resolutionDisplayStandard, self.resolutionDisplayWidescreen);
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
  self.getResolutionEncoding = function() {
    return self.getResolution(self.resolutionEncodingStandard, self.resolutionEncodingWidescreen);
  };
  self.getResolution = function(resolutionStandard, resolutionWidescreen) {
    var resolutionType = self.resolutionType.val();
    if (resolutionType === WebRTC_C.STANDARD) {
      return resolutionStandard.val();
    } else if (resolutionType === WebRTC_C.WIDESCREEN) {
      return resolutionWidescreen.val();
    } else {
      return false;
    }
  };
  self.changed = function() {
    if (!sipstack.activeSession) {
      self.reload();
    } else {
      self.changed = true;
    }
  };
  self.save = function() {
    sound.playClick();
    self.persist();
    self.hide();
    self.changed();
  };
  self.enableRegistration = function(enable) {
    self.signIn.removeClass("disabled");
    self.signOut.removeClass("disabled");
    if (!enable) {
      self.signIn.addClass("disabled");
      self.signOut.addClass("disabled");
    }
  };
  self.signIn = function() {
    sound.playClick();
    self.persist();
    sipstack.init();
    self.enableRegistration(false);
  };
  self.signOut = function() {
    sound.playClick();
    sipstack.unregister();
    self.clearConfigurationCookies();
    self.enableRegistration(false);
  };
  self.resetLayout = function() {
    self.resolutionEncoding(WebRTC_C.DEFAULT_RESOLUTION_ENCODING);
    self.resolutionDisplay(WebRTC_C.DEFAULT_RESOLUTION_DISPLAY);
    eventbus.viewChanged(self);
  };
  self.clearConfigurationCookies = function() {
    $.removeCookie('settingDisplayName');
    $.removeCookie('settingUserId');
    $.removeCookie('settingAuthenticationUserId');
    $.removeCookie('settingPassword');
  };
  self.clearConfiguration = function() {
    self.displayName(null);
    self.userId(null);
    self.authenticationUserId(null);
    self.password(null);
  };
  self.clear = function() {
    for (var cookie in self.cookiesMapper) {
      var mapping = self.cookiesMapper[cookie];
      self[mapping.name](null);
    }
  };
  self.persist = function() {
    for (var cookie in self.cookiesMapper) {
      var mapping = self.cookiesMapper[cookie];
      $.cookie(cookie, mapping.inputGetter(), {
        expires: configuration.expires
      });
    }
  };


  self.cookiesMapper = {
    'settingDisplayName': {
      name: 'displayName',
      initValue: function() {
        return configuration.sipDisplayName || $.cookie('settingDisplayName');
      },
      inputSetter: function(val) {
        self.displayName.val(val);
      },
      inputGetter: function() {
        return self.displayName.val();
      }
    },
    'settingUserId': {
      name: 'userId',
      inputSetter: function(val) {
        self.userid.val(val);
      },
      inputGetter: function() {
        return self.userid.val();
      }
    },
    'settingPassword': {
      name: 'password',
      inputSetter: function(val) {
        self.password.val(val);
      },
      inputGetter: function() {
        return self.password.val();
      }
    },
    'settingAuthenticationUserId': {
      name: 'authenticationUserId',
      inputSetter: function(val) {
        self.authenticationuserid.val(val);
      },
      inputGetter: function() {
        return self.authenticationuserid.val();
      }
    },
    'selfViewDisable': {
      name: 'selfViewDisable',
      initValue: function() {
        return $.cookie('selfViewDisable') === "true";
      },
      inputSetter: function(val) {
        self.selfViewDisable.prop('checked', val);
      },
      inputGetter: function() {
        return self.selfViewDisable.prop('checked');
      }
    },
    'hd': {
      name: 'hd',
      initValue: function() {
        return $.cookie('hd') === "true";
      },
      inputSetter: function(val) {
        self.hd.prop('checked', val);
      },
      inputGetter: function() {
        return self.hd.prop('checked');
      }
    },
    'settingBandwidthLow': {
      name: 'bandwidthLow',
      initValue: function() {
        return configuration.bandwidthLow || $.cookie('settingBandwidthLow');
      },
      inputSetter: function(val) {
        self.bandwidthLow.val(val);
      },
      inputGetter: function() {
        return self.bandwidthLow.val();
      }
    },
    'settingBandwidthMed': {
      name: 'bandwidthMed',
      initValue: function() {
        return configuration.bandwidthMed || $.cookie('settingBandwidthMed');
      },
      inputSetter: function(val) {
        self.bandwidthMed.val(val);
      },
      inputGetter: function() {
        return self.bandwidthMed.val();
      }
    },
    'settingBandwidthHigh': {
      name: 'bandwidthHigh',
      initValue: function() {
        return configuration.bandwidthHigh || $.cookie('settingBandwidthHigh');
      },
      inputSetter: function(val) {
        self.bandwidthHigh.val(val);
      },
      inputGetter: function() {
        return self.bandwidthHigh.val();
      }
    },
    'settingColor': {
      name: 'color',
      initValue: function() {
        return configuration.getBackgroundColor();
      },
      inputSetter: function(val) {
        self.colorInput.val(val || '#ffffff');
      },
      inputGetter: function() {
        return self.colorInput.val();
      }
    },
    'settingResolutionDisplay': {
      name: 'resolutionDisplay',
      initValue: function() {
        return configuration.displayResolution || $.cookie('settingResolutionDisplay') || WebRTC_C.DEFAULT_RESOLUTION_DISPLAY;
      },
      inputSetter: function(val) {
        self.setResolutionDisplay(val);
      },
      inputGetter: function() {
        return self.getResolutionDisplay();
      }
    },
    'settingResolutionEncoding': {
      name: 'resolutionEncoding',
      initValue: function() {
        return configuration.encodingResolution || $.cookie('settingResolutionEncoding') || WebRTC_C.DEFAULT_RESOLUTION_ENCODING;
      },
      inputSetter: function(val) {
        self.setResolutionEncoding(val);
      },
      inputGetter: function() {
        return self.getResolutionEncoding();
      }
    },
    'size': {
      name: 'size',
      initValue: function() {
        return configuration.size || $.cookie('size');
      },
      inputSetter: function(val) {
        self.size.val(val);
      },
      inputGetter: function() {
        return self.size.val();
      }
    },
    'autoAnswer': {
      name: 'autoAnswer',
      initValue: function() {
        return $.cookie('autoAnswer') === "true";
      },
      inputSetter: function(val) {
        self.autoAnswer.prop('checked', val);
      },
      inputGetter: function() {
        return self.autoAnswer.prop('checked');
      }
    },
    'settingWindowPosition': {
      name: 'windowPosition',
      inputSetter: function() {},
      inputGetter: function() {
        return ".localVideo" + "-" + self.localVideoTop.val() + "-" + self.localVideoLeft.val() + "|" +
          ".callHistory" + "-" + self.callHistoryTop.val() + "-" + self.callHistoryLeft.val() + "|" +
          ".callStats" + "-" + self.callStatsTop.val() + "-" + self.callStatsLeft.val();
      }
    }
  };

  function makeAccessor(cookie) {
    var mapping = self.cookiesMapper[cookie];
    self[mapping.name] = function(value) {
      if (arguments.length === 1) {
        mapping.inputSetter(value);
        if (value) {
          $.cookie(cookie, value, {
            expires: configuration.expires
          });
        } else {
          jQuery.removeCookie(cookie);
        }
      } else {
        return mapping.inputGetter();
      }
    };
  }
  for (var cookie in self.cookiesMapper) {
    makeAccessor(cookie);
  }

  initUi();
  updateRowVisibility();
  updatePageColor();

  return self;
}

