/***************************************************
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton
 *
 * Copyright 2013 Broadsoft
 * http://www.broadsoft.com
 ***************************************************/
(function(WebRTC) {
  var Settings,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Settings');

  Settings = function(client, configuration, sound, eventBus, sipStack) {
    this.settingsIcon = client.find(".settings");
    this.settingsUi = client.find('.settingsPopup');
    this.popup = this.settingsUi;
    this.localVideoTop = this.settingsUi.find(".settingLocalVideoTop");
    this.localVideoLeft = this.settingsUi.find(".settingLocalVideoLeft");
    this.userIdInput = this.settingsUi.find(".settingUserid");
    this.authenticationUserIdInput = this.settingsUi.find(".settingAuthenticationUserid");
    this.passwordInput = this.settingsUi.find(".settingPassword");
    this.saveBtn = this.settingsUi.find(".saveSettings");
    this.signInBtn = this.settingsUi.find(".sign-in");
    this.signOutBtn = this.settingsUi.find(".sign-out");
    this.displayNameInput = this.settingsUi.find(".settingDisplayName");
    this.resolutionType = this.settingsUi.find('.resolutionTypeSelect');
    this.resolutionDisplayWidescreen = this.settingsUi.find('.resolutionDisplayWidescreenSelect');
    this.resolutionDisplayStandard = this.settingsUi.find('.resolutionDisplayStandardSelect');
    this.resolutionEncodingWidescreen = this.settingsUi.find('.resolutionEncodingWidescreenSelect');
    this.resolutionEncodingStandard = this.settingsUi.find('.resolutionEncodingStandardSelect');
    this.bandwidthLowInput = this.settingsUi.find('.settingBandwidthLow');
    this.bandwidthMedInput = this.settingsUi.find('.settingBandwidthMed');
    this.bandwidthHighInput = this.settingsUi.find('.settingBandwidthHigh');
    this.settingDisplayNameRow = this.settingsUi.find('.settingDisplayNameRow');
    this.settingUseridRow = this.settingsUi.find('.settingUseridRow');
    this.settingSelfViewDisableRow = this.settingsUi.find('.settingSelfViewDisableRow');
    this.settingHDRow = this.settingsUi.find('.settingHDRow');
    this.settingAutoAnswerRow = this.settingsUi.find('.settingAutoAnswerRow');
    this.settingResolutionTypeRow = this.settingsUi.find(".settingResolutionTypeRow");
    this.settingResolutionDisplayRow = this.settingsUi.find(".settingResolutionDisplayRow");
    this.settingResolutionEncodingRow = this.settingsUi.find(".settingResolutionEncodingRow");
    this.settingResolutionRow = this.settingsUi.find(".settingResolutionRow");
    this.settingBandwidthRow = this.settingsUi.find(".settingBandwidthRow");
    this.settingCallHistoryTop = this.settingsUi.find(".settingCallHistoryTop");
    this.settingCallHistoryLeft = this.settingsUi.find(".settingCallHistoryLeft");
    this.settingCallStatsTop = this.settingsUi.find(".settingCallStatsTop");
    this.settingCallStatsLeft = this.settingsUi.find(".settingCallStatsLeft");
    this.resolutionTypeSelect = this.settingsUi.find(".resolutionTypeSelect");
    this.settingSelfViewDisable = this.settingsUi.find(".settingSelfViewDisable");
    this.settingHD = this.settingsUi.find(".settingHD");
    this.settingSize = this.settingsUi.find(".settingSize");
    this.settingAutoAnswer = this.settingsUi.find(".settingAutoAnswer");
    this.colorInput = this.settingsUi.find(".settingColor");
    this.tabConfigureLink = this.settingsUi.find("[href='#tab1']");
    this.tabLayoutLink = this.settingsUi.find("[href='#tab2']");
    this.clearLink = this.settingsUi.find(".clear");

    this.configuration = configuration;
    this.sound = sound;
    this.client = client;
    this.eventBus = eventBus;
    this.sipStack = sipStack;
    this.toggled = false;
    this.settingsChanged = false;

    var self = this;
    this.cookiesMapper = {
      'settingDisplayName': {
        name: 'displayName',
        initValue: function(){return self.configuration.sipDisplayName || $.cookie('settingDisplayName');},
        inputSetter: function(val){self.displayNameInput.val(val);},
        inputGetter: function(){return self.displayNameInput.val();}},
      'settingUserId': {
        name: 'userId',
        inputSetter: function(val){self.userIdInput.val(val);},
        inputGetter: function(){return self.userIdInput.val();}},
      'settingPassword': {
        name: 'password',
        inputSetter: function(val){self.passwordInput.val(val);},
        inputGetter: function(){return self.passwordInput.val();}},
      'settingAuthenticationUserId': {
        name: 'authenticationUserId',
        inputSetter: function(val){self.authenticationUserIdInput.val(val);},
        inputGetter: function(){return self.authenticationUserIdInput.val();}},
      'settingSelfViewDisable': {
        name: 'selfViewDisable',
        initValue: function(){return $.cookie('settingSelfViewDisable') === "true";},
        inputSetter: function(val){self.settingSelfViewDisable.prop('checked', val);},
        inputGetter: function(){return self.settingSelfViewDisable.prop('checked');}},
      'settingHD': {
        name: 'hd',
        initValue: function(){return $.cookie('settingHD') === "true";},
        inputSetter: function(val){self.settingHD.prop('checked', val);},
        inputGetter: function(){return self.settingHD.prop('checked');}},
      'settingBandwidthLow': {
        name: 'bandwidthLow',
        initValue: function(){return self.configuration.bandwidthLow || $.cookie('settingBandwidthLow');},
        inputSetter: function(val){self.bandwidthLowInput.val(val);},
        inputGetter: function(){return self.bandwidthLowInput.val();}},
      'settingBandwidthMed': {
        name: 'bandwidthMed',
        initValue: function(){return self.configuration.bandwidthMed || $.cookie('settingBandwidthMed');},
        inputSetter: function(val){self.bandwidthMedInput.val(val);},
        inputGetter: function(){return self.bandwidthMedInput.val();}},
      'settingBandwidthHigh': {
        name: 'bandwidthHigh',
        initValue: function(){return self.configuration.bandwidthHigh || $.cookie('settingBandwidthHigh');},
        inputSetter: function(val){self.bandwidthHighInput.val(val);},
        inputGetter: function(){return self.bandwidthHighInput.val();}},
      'settingColor': {
        name: 'color',
        initValue: function(){return self.configuration.getBackgroundColor();},
        inputSetter: function(val){self.colorInput.val(val || '#ffffff');},
        inputGetter: function(){return self.colorInput.val();}},
      'settingResolutionDisplay': {
        name: 'resolutionDisplay',
        initValue: function(){return self.configuration.displayResolution || $.cookie('settingResolutionDisplay') || WebRTC.C.DEFAULT_RESOLUTION_DISPLAY;},
        inputSetter: function(val){self.setResolutionDisplay(val);},
        inputGetter: function(){return self.getResolutionDisplay();}},
      'settingResolutionEncoding': {
        name: 'resolutionEncoding',
        initValue: function(){return self.configuration.encodingResolution || $.cookie('settingResolutionEncoding') || WebRTC.C.DEFAULT_RESOLUTION_ENCODING;},
        inputSetter: function(val){self.setResolutionEncoding(val);},
        inputGetter: function(){return self.getResolutionEncoding();}},
      'settingSize': {
        name: 'size',
        initValue: function(){return self.configuration.size || $.cookie('settingSize');},
        inputSetter: function(val){self.settingSize.val(val);},
        inputGetter: function(){return self.settingSize.val();}},
      'settingAutoAnswer': {
        name: 'autoAnswer',
        initValue: function(){return $.cookie('settingAutoAnswer') === "true";},
        inputSetter: function(val){self.settingAutoAnswer.prop('checked', val);},
        inputGetter: function(){return self.settingAutoAnswer.prop('checked');}},
      'settingWindowPosition': {
        name: 'windowPosition',
        inputSetter: function(val){},
        inputGetter: function(){return ".localVideo" + "-" + self.localVideoTop.val() + "-" + self.localVideoLeft.val() + "|" +
          ".callHistory" + "-" + self.settingCallHistoryTop.val() + "-" + self.settingCallHistoryLeft.val() + "|" +
          ".callStats" + "-" + self.settingCallStatsTop.val() + "-" + self.settingCallStatsLeft.val();}}
    };

    function makeAccessor(cookie) {
      var mapping = self.cookiesMapper[cookie];
      self[mapping.name] = function(value){
        if(arguments.length === 1) {
          mapping.inputSetter(value);
          if(value) {
            $.cookie(cookie, value,  { expires: self.configuration.expires });
          } else {
            $.removeCookie(cookie);
          }
        } else {
          return mapping.inputGetter();
        }
      };
    }
    for(var cookie in this.cookiesMapper) {
      makeAccessor(cookie);
    }
    this.registerListeners();
    this.initUi();
    this.updateRowVisibility();
    this.updatePageColor();
    this.initializeTabs();
  };

  Settings.prototype = {
    registerListeners: function() {
      var self = this;

      this.eventBus.on("ended", function(e){
        if(self.settingsChanged) {
          self.reload();
        }
      });
      this.resolutionTypeSelect.bind('change', function(e){
        self.updateResolutionSelectVisibility();
      });
      this.settingsIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.toggled = !self.toggled;
        self.client.updateClientClass();
        self.client.toggleDialpad(false);
        self.client.history.historyToggled = true;
        self.client.history.toggle();
      });

      this.colorInput.bind('change', function(e){
        self.updatePageColor();
      });
      this.clearLink.on('click', function(e) {
        e.preventDefault();
        self.resetLayout();
        self.eventBus.message('Settings reset');
      });
      this.signOutBtn.on('click', function(e) {
        e.preventDefault();
        self.signOut();
      });
      this.saveBtn.bind('click', function(e)
      {
        e.preventDefault();
        self.save();
      });
      this.signInBtn.bind('click', function(e)
      {
        e.preventDefault();
        self.signIn();
      });
      this.bandwidthLowInput.bind('blur', function(e)
      {
        self.client.sipStack.updateRtcMediaHandlerOptions();
      });
      this.bandwidthMedInput.bind('blur', function(e)
      {
        self.client.sipStack.updateRtcMediaHandlerOptions();
      });
      this.bandwidthHighInput.bind('blur', function(e)
      {
        self.client.sipStack.updateRtcMediaHandlerOptions();
      });
      this.resolutionType.bind('change', function(e)
      {
        self.client.updateClientClass();
        self.client.sipStack.updateRtcMediaHandlerOptions();
        self.client.sipStack.updateUserMedia();
      });
      this.resolutionDisplayWidescreen.bind('change', function(e)
      {
        self.client.updateClientClass();
      });
      this.resolutionDisplayStandard.bind('change', function(e)
      {
        self.client.updateClientClass();
      });
      this.resolutionEncodingWidescreen.bind('change', function(e)
      {
        self.client.sipStack.updateRtcMediaHandlerOptions();
        self.client.sipStack.updateUserMedia();
      });
      this.resolutionEncodingStandard.bind('change', function(e)
      {
        self.client.sipStack.updateRtcMediaHandlerOptions();
        self.client.sipStack.updateUserMedia();
      });
    },
    updateRowVisibility: function(){
      this.settingAutoAnswerRow.toggle(this.configuration.enableAutoAnswer);
      this.settingSelfViewDisableRow.toggle(!this.configuration.hasOwnProperty("enableSelfView"));
      this.settingHDRow.toggle(!this.configuration.hasOwnProperty("enableHD"));
      this.settingResolutionRow.toggle(!this.configuration.hasOwnProperty("displayResolution") || !this.configuration.hasOwnProperty("encodingResolution"));
      this.settingResolutionDisplayRow.toggle(!this.configuration.hasOwnProperty("displayResolution"));
      this.settingResolutionEncodingRow.toggle(!this.configuration.hasOwnProperty("encodingResolution"));
      this.settingResolutionTypeRow.toggle(!this.configuration.hasOwnProperty("displayResolution") && !this.configuration.hasOwnProperty("encodingResolution"));
      this.bandwidthLowInput.toggle(!this.configuration.hasOwnProperty("bandwidthLow"));
      this.bandwidthMedInput.toggle(!this.configuration.hasOwnProperty("bandwidthMed"));
      this.bandwidthHighInput.toggle(!this.configuration.hasOwnProperty("bandwidthHigh"));
      this.settingBandwidthRow.toggle(!this.configuration.hasOwnProperty("bandwidthLow") || !this.configuration.hasOwnProperty("bandwidthMed") || !this.configuration.hasOwnProperty("bandwidthHigh"));
      this.settingDisplayNameRow.toggle(!this.configuration.hasOwnProperty("displayName"));
    },
    getBandwidth: function(){
      var height = this.getResolutionEncodingHeight();
      if(height <= 240) {
        return this.bandwidthLowInput.val();
      } else if(height <= 480) {
        return this.bandwidthMedInput.val();
      } else if(height <= 720) {
        return this.bandwidthHighInput.val();
      }
    },
    reload: function(){
      location.reload(0);
    },
    updatePageColor: function(){
      var color = this.configuration.getBackgroundColor();
      logger.log('updating page color : '+color, this.configuration);
      $('body').css('backgroundColor', color || '');
    },
    initUi: function(){
      WebRTC.Utils.addSelectOptions(WebRTC.C.RESOLUTION_TYPES, this.resolutionType);
      WebRTC.Utils.addSelectOptions(WebRTC.C.STANDARD_RESOLUTIONS, this.resolutionDisplayStandard);
      WebRTC.Utils.addSelectOptions(WebRTC.C.WIDESCREEN_RESOLUTIONS, this.resolutionDisplayWidescreen);
      WebRTC.Utils.addSelectOptions(WebRTC.C.STANDARD_RESOLUTIONS, this.resolutionEncodingStandard);
      WebRTC.Utils.addSelectOptions(WebRTC.C.WIDESCREEN_RESOLUTIONS, this.resolutionEncodingWidescreen);

      for(var cookie in this.cookiesMapper) {
        var mapping = this.cookiesMapper[cookie];
        var value = mapping.initValue ? mapping.initValue() : $.cookie(cookie);
        mapping.inputSetter(value);
      }
      this.updateViewPositions();
    },
    updateViewPositions: function(){
      var localVideoPosition = this.client.video.local.position();
      if (localVideoPosition && localVideoPosition.top !== 0 && localVideoPosition.left !== 0)
      {
        this.localVideoTop.val(localVideoPosition.top);
        this.localVideoLeft.val(localVideoPosition.left);
      }
      var callHistoryPosition = this.client.callHistory.position();
      if (callHistoryPosition && callHistoryPosition.top !== 0 && callHistoryPosition.left !== 0)
      {
        this.settingCallHistoryTop.val(callHistoryPosition.top);
        this.settingCallHistoryLeft.val(callHistoryPosition.left);
      }
      var callStatsPosition = this.client.callStats.position();
      if (callStatsPosition && callStatsPosition.top !== 0 && callStatsPosition.left !== 0)
      {
        this.settingCallStatsTop.val(callStatsPosition.top);
        this.settingCallStatsLeft.val(callStatsPosition.left);
      }
    },
    updateResolutionSelectVisibility: function(){
      var resolutionType = this.resolutionType.val();
      this.resolutionDisplayWidescreen.hide();
      this.resolutionDisplayStandard.hide();
      this.resolutionEncodingWidescreen.hide();
      this.resolutionEncodingStandard.hide();
      if(resolutionType === WebRTC.C.STANDARD) {
        this.resolutionDisplayStandard.show();
        this.resolutionEncodingStandard.show();
      } else if(resolutionType === WebRTC.C.WIDESCREEN) {
        this.resolutionDisplayWidescreen.show();
        this.resolutionEncodingWidescreen.show();
      }
    },

    setResolutionDisplay: function(resolution){
      this.setResolution(resolution, this.resolutionDisplayStandard, this.resolutionDisplayWidescreen);
    },
    setResolutionEncoding: function(resolution){
      this.setResolution(resolution, this.resolutionEncodingStandard, this.resolutionEncodingWidescreen);
    },
    setResolution: function(resolution, resolutionStandard, resolutionWidescreen){
      if(WebRTC.Utils.containsKey(WebRTC.C.STANDARD_RESOLUTIONS, resolution)) {
        this.resolutionType.val(WebRTC.C.STANDARD);
        resolutionStandard.val(resolution);
      } else if(WebRTC.Utils.containsKey(WebRTC.C.WIDESCREEN_RESOLUTIONS, resolution)) {
        this.resolutionType.val(WebRTC.C.WIDESCREEN);
        resolutionWidescreen.val(resolution);
      } else {
        logger.error('no resolution type for '+resolution);
      }
      this.updateResolutionSelectVisibility();
    },
    getResolutionDisplay: function(){
      return this.getResolution(this.resolutionDisplayStandard, this.resolutionDisplayWidescreen);
    },
    getResolutionEncodingWidth: function(){
      var resolution = this.getResolutionEncoding();
      if(!$.isBlank(resolution)) {
        var resolutions = resolution.split('x');
        return parseInt(resolutions[0], 10);
      }
    },
    getResolutionEncodingHeight: function(){
      var resolution = this.getResolutionEncoding();
      if(!$.isBlank(resolution)) {
        var resolutions = resolution.split('x');
        return parseInt(resolutions[1], 10);
      }
    },
    getResolutionEncoding: function(){
      return this.getResolution(this.resolutionEncodingStandard, this.resolutionEncodingWidescreen);
    },
    getResolution: function(resolutionStandard, resolutionWidescreen){
      var resolutionType = this.resolutionType.val();
      if(resolutionType === WebRTC.C.STANDARD) {
        return resolutionStandard.val();
      } else if(resolutionType === WebRTC.C.WIDESCREEN) {
        return resolutionWidescreen.val();
      } else {
        return false;
      }
    },
    changed: function(){
      if(!this.sipStack.activeSession) {
        this.reload();
      } else {
        this.settingsChanged = true;
      }
    },
    save: function(){
      this.sound.playClick();
      this.persist();
      this.toggled = false;
      this.client.updateClientClass();
      this.changed();
    },
    signIn: function(){
      this.sound.playClick();
      this.persist();
      this.sipStack.init();
      this.toggled = false;
      this.client.updateClientClass();
    },    
    resetLayout: function(){
      this.resolutionEncoding(WebRTC.C.DEFAULT_RESOLUTION_ENCODING);
      this.resolutionDisplay(WebRTC.C.DEFAULT_RESOLUTION_DISPLAY);
      this.client.updateClientClass();
    },
    clearConfiguration: function(){
      this.displayName(null);
      this.userId(null);
      this.authenticationUserId(null);
      this.password(null);
    },
    signOut: function(){
      this.sound.playClick();
      this.sipStack.unregister();
      this.clearConfiguration();
      this.sipStack.init();
      this.toggled = false;
      this.client.updateClientClass();
    },
    clear: function(){
      for(var cookie in this.cookiesMapper) {
        var mapping = this.cookiesMapper[cookie];
        this[mapping.name](null);
      }
    },
    persist: function(){
      for(var cookie in this.cookiesMapper) {
        var mapping = this.cookiesMapper[cookie];
        $.cookie(cookie, mapping.inputGetter(), { expires: this.configuration.expires });
      }
    },
    toggleSettings: function(flag){
      this.toggled = flag;
      this.client.updateClientClass();
    },
    initializeTabs: function(){
      $('ul.tabs').each(function(){
        var $active, $content, $links = $(this).find('a');
        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active');
        $content = $($active[0].hash);
        $links.not($active).each(function () {
          $(this.hash).hide();
        });
        $(this).on('click', 'a', function(e){
          $active.removeClass('active');
          $content.hide();
          $active = $(this);
          $content = $(this.hash);
          $active.addClass('active');
          $content.show();
          e.preventDefault();
        });
      });
    }
  };

  WebRTC.Settings = Settings;
}(WebRTC));
