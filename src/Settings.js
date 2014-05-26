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
    this.userid = this.settingsUi.find(".settingUserid");
    this.save = this.settingsUi.find(".saveSettings");
    this.displayName = this.settingsUi.find(".settingDisplayName");
    this.resolutionType = this.settingsUi.find('.resolutionTypeSelect');
    this.resolutionDisplayWidescreen = this.settingsUi.find('.resolutionDisplayWidescreenSelect');
    this.resolutionDisplayStandard = this.settingsUi.find('.resolutionDisplayStandardSelect');
    this.resolutionEncodingWidescreen = this.settingsUi.find('.resolutionEncodingWidescreenSelect');
    this.resolutionEncodingStandard = this.settingsUi.find('.resolutionEncodingStandardSelect');
    this.settingBandwidthLow = this.settingsUi.find('.settingBandwidthLow');
    this.settingBandwidthMed = this.settingsUi.find('.settingBandwidthMed');
    this.settingBandwidthHigh = this.settingsUi.find('.settingBandwidthHigh');
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
    this.settingPassword = this.settingsUi.find(".settingPassword");
    this.settingSelfViewDisable = this.settingsUi.find(".settingSelfViewDisable");
    this.settingHD = this.settingsUi.find(".settingHD");
    this.settingSize = this.settingsUi.find(".settingSize");
    this.settingAutoAnswer = this.settingsUi.find(".settingAutoAnswer");
    this.color = this.settingsUi.find(".settingColor");

    this.configuration = configuration;
    this.sound = sound;
    this.client = client;
    this.eventBus = eventBus;
    this.sipStack = sipStack;
    this.toggled = false;
    this.settingsChanged = false;

    this.registerListeners();
    this.initUi();
    this.updateRowVisibility();
    this.updatePageColor();
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
      });

      this.color.bind('change', function(e){
        self.updatePageColor();
      });
      this.save.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.persist();
        self.settingsUi.fadeOut(100);
        if(!self.sipStack.activeSession) {
          self.reload();
        } else {
          self.settingsChanged = true;
        }
      });
      this.settingBandwidthLow.bind('blur', function(e)
      {
        self.client.sipStack.updateRtcMediaHandlerOptions();
      });
      this.settingBandwidthMed.bind('blur', function(e)
      {
        self.client.sipStack.updateRtcMediaHandlerOptions();
      });
      this.settingBandwidthHigh.bind('blur', function(e)
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
      this.settingAutoAnswerRow.toggle(!ClientConfig.hasOwnProperty("enableAutoAnswer"));
      this.settingSelfViewDisableRow.toggle(!ClientConfig.hasOwnProperty("enableSelfView"));
      this.settingUseridRow.toggle(!ClientConfig.hasOwnProperty("networkUserId"));
      this.settingHDRow.toggle(!ClientConfig.hasOwnProperty("enableHD"));
      this.settingResolutionRow.toggle(!ClientConfig.hasOwnProperty("displayResolution") || !ClientConfig.hasOwnProperty("encodingResolution"));
      this.settingResolutionDisplayRow.toggle(!ClientConfig.hasOwnProperty("displayResolution"));
      this.settingResolutionEncodingRow.toggle(!ClientConfig.hasOwnProperty("encodingResolution"));
      this.settingResolutionTypeRow.toggle(!ClientConfig.hasOwnProperty("displayResolution") && !ClientConfig.hasOwnProperty("encodingResolution"));
      this.settingBandwidthLow.toggle(!ClientConfig.hasOwnProperty("bandwidthLow"));
      this.settingBandwidthMed.toggle(!ClientConfig.hasOwnProperty("bandwidthMed"));
      this.settingBandwidthHigh.toggle(!ClientConfig.hasOwnProperty("bandwidthHigh"));
      this.settingBandwidthRow.toggle(!ClientConfig.hasOwnProperty("bandwidthLow") || !ClientConfig.hasOwnProperty("bandwidthMed") || !ClientConfig.hasOwnProperty("bandwidthHigh"));
      this.settingDisplayNameRow.toggle(!ClientConfig.hasOwnProperty("displayName"));
    },
    getBandwidth: function(){
      var height = this.getResolutionEncodingHeight();
      if(height <= 240) {
        return this.settingBandwidthLow.val();
      } else if(height <= 480) {
        return this.settingBandwidthMed.val();
      } else if(height <= 720) {
        return this.settingBandwidthHigh.val();
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

      this.displayName.val(this.configuration.displayName);
      this.userid.val(this.configuration.userid);
      this.settingPassword.val(this.configuration.password);
      this.settingSelfViewDisable.prop('checked', ($.cookie('settingSelfViewDisable') === "true"));
      this.settingHD.prop('checked', ($.cookie('settingHD') === "true"));
      this.settingBandwidthLow.val(ClientConfig.bandwidthLow || $.cookie('settingBandwidthLow'));
      this.settingBandwidthMed.val(ClientConfig.bandwidthMed || $.cookie('settingBandwidthMed'));
      this.settingBandwidthHigh.val(ClientConfig.bandwidthHigh || $.cookie('settingBandwidthHigh'));
      this.settingSize.val($.cookie('settingSize') || this.configuration.size);
      this.color.val(this.configuration.getBackgroundColor());
      this.setResolutionDisplay(ClientConfig.displayResolution || $.cookie('settingResolutionDisplay') || WebRTC.C.DEFAULT_RESOLUTION_DISPLAY);
      this.setResolutionEncoding(ClientConfig.encodingResolution || $.cookie('settingResolutionEncoding') || WebRTC.C.DEFAULT_RESOLUTION_ENCODING);
      this.settingAutoAnswer.prop('checked', (ClientConfig.enableAutoAnswer || $.cookie('settingAutoAnswer') === "true"));
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
    persist: function(){
      $.cookie("settingDisplayName", (this.displayName.val()), { expires: ClientConfig.expires });
      $.cookie("settingUserid", (this.userid.val()),  { expires: ClientConfig.expires });
      $.cookie("settingPassword", (this.settingPassword.val()), { expires: ClientConfig.expires });
      $.cookie("settingSelfViewDisable", (this.settingSelfViewDisable.prop('checked')), { expires: ClientConfig.expires });
      $.cookie("settingHD", (this.settingHD.prop('checked')), { expires: ClientConfig.expires });
      $.cookie("settingBandwidthLow", (this.settingBandwidthLow.val()), { expires: ClientConfig.expires });
      $.cookie("settingBandwidthMed", (this.settingBandwidthMed.val()), { expires: ClientConfig.expires });
      $.cookie("settingBandwidthHigh", (this.settingBandwidthHigh.val()), { expires: ClientConfig.expires });
      $.cookie("settingColor", (this.color.val()), { expires: ClientConfig.expires });
      $.cookie("settingResolutionDisplay", (this.getResolutionDisplay()), { expires: ClientConfig.expires });
      $.cookie("settingResolutionEncoding", (this.getResolutionEncoding()), { expires: ClientConfig.expires });
      $.cookie("settingSize", (this.settingSize.val()), { expires: ClientConfig.expires });
      $.cookie("settingAutoAnswer", (this.settingAutoAnswer.prop('checked')), { expires: ClientConfig.expires });
      $.cookie("settingWindowPosition", ".localVideo" + "-" + this.localVideoTop.val() + "-" + this.localVideoLeft.val() + "|" +
        ".callHistory" + "-" + this.settingCallHistoryTop.val() + "-" + this.settingCallHistoryLeft.val() + "|" +
        ".callStats" + "-" + this.settingCallStatsTop.val() + "-" + this.settingCallStatsLeft.val());
    }
  };

  WebRTC.Settings = Settings;
}(WebRTC));
