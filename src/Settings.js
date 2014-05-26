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
    this.localVideoTop = $("#settingLocalVideoTop");
    this.localVideoLeft = $("#settingLocalVideoLeft");
    this.userid = $("#settingUserid");
    this.save = $("#saveSettings");
    this.displayName = $("#settingDisplayName");
    this.resolutionType = $('#resolutionTypeSelect');
    this.resolutionDisplayWidescreen = $('#resolutionDisplayWidescreenSelect');
    this.resolutionDisplayStandard = $('#resolutionDisplayStandardSelect');
    this.resolutionEncodingWidescreen = $('#resolutionEncodingWidescreenSelect');
    this.resolutionEncodingStandard = $('#resolutionEncodingStandardSelect');
    this.settingBandwidthLow = $('#settingBandwidthLow');
    this.settingBandwidthMed = $('#settingBandwidthMed');
    this.settingBandwidthHigh = $('#settingBandwidthHigh');
    this.settingDisplayNameRow = $('#settingDisplayNameRow');
    this.settingUseridRow = $('#settingUseridRow');
    this.settingSelfViewDisableRow = $('#settingSelfViewDisableRow');
    this.settingHDRow = $('#settingHDRow');
    this.settingAutoAnswerRow = $('#settingAutoAnswerRow');
    this.settingsIcon = $("#settings");
    this.popup = $("#settingsPopup");
    this.settingResolutionTypeRow = $("#settingResolutionTypeRow");
    this.settingResolutionDisplayRow = $("#settingResolutionDisplayRow");
    this.settingResolutionEncodingRow = $("#settingResolutionEncodingRow");
    this.settingResolutionRow = $("#settingResolutionRow");
    this.settingBandwidthRow = $("#settingBandwidthRow");
    this.color = $("#settingColor");

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
      $('#resolutionTypeSelect').bind('change', function(e){
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
        $("#settingsPopup").fadeOut(100);
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
      $("#settingPassword").val(this.configuration.password);
      $("#settingSelfViewDisable").prop('checked', ($.cookie('settingSelfViewDisable') === "true"));
      $("#settingHD").prop('checked', ($.cookie('settingHD') === "true"));
      this.settingBandwidthLow.val(ClientConfig.bandwidthLow || $.cookie('settingBandwidthLow'));
      this.settingBandwidthMed.val(ClientConfig.bandwidthMed || $.cookie('settingBandwidthMed'));
      this.settingBandwidthHigh.val(ClientConfig.bandwidthHigh || $.cookie('settingBandwidthHigh'));
      $("#settingSize").val($.cookie('settingSize') || this.configuration.size);
      this.color.val(this.configuration.getBackgroundColor());
      this.setResolutionDisplay(ClientConfig.displayResolution || $.cookie('settingResolutionDisplay') || WebRTC.C.DEFAULT_RESOLUTION_DISPLAY);
      this.setResolutionEncoding(ClientConfig.encodingResolution || $.cookie('settingResolutionEncoding') || WebRTC.C.DEFAULT_RESOLUTION_ENCODING);
      $("#settingAutoAnswer").prop('checked', (ClientConfig.enableAutoAnswer || $.cookie('settingAutoAnswer') === "true"));
      this.updateViewPositions();
    },
    updateViewPositions: function(){
      var localVideoPosition = this.client.video.local.position();
      if (localVideoPosition && localVideoPosition.top !== 0 && localVideoPosition.left !== 0)
      {
        this.localVideoTop.val(localVideoPosition.top);
        this.localVideoLeft.val(localVideoPosition.left);
      }
      var callHistoryPosition = $("#callHistory").position();
      if (callHistoryPosition && callHistoryPosition.top !== 0 && callHistoryPosition.left !== 0)
      {
        $("#settingCallHistoryTop").val(callHistoryPosition.top);
        $("#settingCallHistoryLeft").val(callHistoryPosition.left);
      }
      var callStatsPosition = $("#callStats").position();
      if (callStatsPosition && callStatsPosition.top !== 0 && callStatsPosition.left !== 0)
      {
        $("#settingCallStatsTop").val(callStatsPosition.top);
        $("#settingCallStatsLeft").val(callStatsPosition.left);
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
      $.cookie("settingPassword", ($("#settingPassword").val()), { expires: ClientConfig.expires });
      $.cookie("settingSelfViewDisable", ($("#settingSelfViewDisable").prop('checked')), { expires: ClientConfig.expires });
      $.cookie("settingHD", ($("#settingHD").prop('checked')), { expires: ClientConfig.expires });
      $.cookie("settingBandwidthLow", (this.settingBandwidthLow.val()), { expires: ClientConfig.expires });
      $.cookie("settingBandwidthMed", (this.settingBandwidthMed.val()), { expires: ClientConfig.expires });
      $.cookie("settingBandwidthHigh", (this.settingBandwidthHigh.val()), { expires: ClientConfig.expires });
      $.cookie("settingColor", (this.color.val()), { expires: ClientConfig.expires });
      $.cookie("settingResolutionDisplay", (this.getResolutionDisplay()), { expires: ClientConfig.expires });
      $.cookie("settingResolutionEncoding", (this.getResolutionEncoding()), { expires: ClientConfig.expires });
      $.cookie("settingSize", ($("#settingSize").val()), { expires: ClientConfig.expires });
      $.cookie("settingAutoAnswer", ($("#settingAutoAnswer").prop('checked')), { expires: ClientConfig.expires });
      $.cookie("settingWindowPosition", "#localVideo" + "-" + this.localVideoTop.val() + "-" + this.localVideoLeft.val() + "|" +
        "#callHistory" + "-" + $("#settingCallHistoryTop").val() + "-" + $("#settingCallHistoryLeft").val() + "|" +
        "#callStats" + "-" + $("#settingCallStatsTop").val() + "-" + $("#settingCallStatsLeft").val());
    }
  };

  WebRTC.Settings = Settings;
}(WebRTC));
