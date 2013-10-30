/***************************************************
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton <nathan@robotics.net>
 *
 * Copyright 2013 Exario Networks
 * http://www.exarionetworks.com
 ***************************************************/
(function(WebRTC) {
  var Settings,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Settings');

  Settings = function(client, configuration, sound) {
    this.localVideoTop = $("#settingLocalVideoTop");
    this.localVideoLeft = $("#settingLocalVideoLeft");
    this.userid = $("#settingUserid");
    this.save = $("#saveSettings");
    this.resolutionType = $('#resolutionTypeSelect');
    this.resolutionDisplayWidescreen = $('#resolutionDisplayWidescreenSelect');
    this.resolutionDisplayStandard = $('#resolutionDisplayStandardSelect');
    this.resolutionEncodingWidescreen = $('#resolutionEncodingWidescreenSelect');
    this.resolutionEncodingStandard = $('#resolutionEncodingStandardSelect');

    this.configuration = configuration;
    this.sound = sound;
    this.client = client;
    this.toggled = false;

    this.registerListeners();
    this.initUi();
    this.updatePageColor();
  };

  Settings.prototype = {
    registerListeners: function() {
      var self = this;

      $('#resolutionTypeSelect').bind('change', function(e){
        self.updateResolutionSelectVisibility();
      });
      $("#settings").bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        if (self.toggled === false)
        {
          $("#settingsPopup").fadeIn(1000);
        }
        else if (self.toggled === true)
        {
          $("#settingsPopup").fadeOut(100);
        }
        self.toggled = !self.toggled;
      });

      $("#settingColor").bind('change', function(e){
        self.updatePageColor();
      });
      this.save.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.persist();
        $("#settingsPopup").fadeOut(100);
        location.reload(0);
      });
      this.resolutionType.bind('change', function(e)
      {
        self.client.updateMainClass();
        self.client.updateUserMedia();
      });
      this.resolutionDisplayWidescreen.bind('change', function(e)
      {
        self.client.updateMainClass();
      });
      this.resolutionDisplayStandard.bind('change', function(e)
      {
        self.client.updateMainClass();
      });
      this.resolutionEncodingWidescreen.bind('change', function(e)
      {
        self.client.updateUserMedia();
      });
      this.resolutionEncodingStandard.bind('change', function(e)
      {
        self.client.updateUserMedia();
      });
    },
    updatePageColor: function(){
      var color = $("#settingColor").val();
      if(this.configuration.isDebug()) {
        logger.log('updating page color : '+color);
      }
      $('body').css('backgroundColor', color || '');
    },
    initUi: function(){
      if ((this.configuration.displayName !== "false"))
      {
        $("#settingDisplayName").val(this.configuration.displayName);
      }
      this.userid.val(this.configuration.userid);
      $("#settingPassword").val(this.configuration.password);
      $("#settingSelfViewDisable").prop('checked', ($.cookie('settingSelfViewDisable') === "true"));
      $("#settingHD").prop('checked', ($.cookie('settingHD') === "true"));
      $("#settingTransmitVGA").val($.cookie('settingTransmitVGA') || this.configuration.transmitVGA);
      $("#settingTransmitHD").val($.cookie('settingTransmitHDSetting') || this.configuration.transmitHD);
      $("#settingSize").val($.cookie('settingSize') || this.configuration.size);
      $("#settingColor").val($.cookie('settingColor') || this.configuration.color || $('body').css('backgroundColor'));
      this.setResolutionDisplay($.cookie('settingResolutionDisplay') || WebRTC.C.DEFAULT_RESOLUTION_DISPLAY);
      this.setResolutionEncoding($.cookie('settingResolutionEncoding') || WebRTC.C.DEFAULT_RESOLUTION_ENCODING);
      $("#settingAutoAnswer").prop('checked', ($.cookie('settingAutoAnswer') === "true") || ClientConfig.enableAutoAnswer );
      this.updateViewPositions();
    },
    updateViewPositions: function(){
      if (this.client.video.local.position().top !== 0 && this.client.video.local.position().left !== 0)
      {
        this.localVideoTop.val(this.client.video.local.position().top);
        this.localVideoLeft.val(this.client.video.local.position().left);
      }
      if ($("#callHistory").position().top !== 0 && $("#callHistory").position().left !== 0)
      {
        $("#settingCallHistoryTop").val($("#callHistory").position().top);
        $("#settingCallHistoryLeft").val($("#callHistory").position().left);
      }
      if ($("#callStats").position().top !== 0 && $("#callStats").position().left !== 0)
      {
        $("#settingCallStatsTop").val($("#callStats").position().top);
        $("#settingCallStatsLeft").val($("#callStats").position().left);
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
      $.cookie("settingDisplayName", ($("#settingDisplayName").val()), { expires: ClientConfig.expires });
      $.cookie("settingUserid", (this.userid.val()),  { expires: ClientConfig.expires });
      $.cookie("settingPassword", ($("#settingPassword").val()), { expires: ClientConfig.expires });
      $.cookie("settingSelfViewDisable", ($("#settingSelfViewDisable").prop('checked')), { expires: ClientConfig.expires });
      $.cookie("settingHD", ($("#settingHD").prop('checked')), { expires: ClientConfig.expires });
      $.cookie("settingTransmitVGA", ($("#settingTransmitVGA").val()), { expires: ClientConfig.expires });
      $.cookie("settingTransmitHD", ($("#settingTransmitHD").val()), { expires: ClientConfig.expires });
      $.cookie("settingTransmitHD", ($("#settingTransmitHD").val()), { expires: ClientConfig.expires });
      $.cookie("settingColor", ($("#settingColor").val()), { expires: ClientConfig.expires });
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
