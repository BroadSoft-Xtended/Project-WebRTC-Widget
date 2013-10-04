/***************************************************
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton <nathan@robotics.net>
 *
 * Copyright 2013 Exario Networks
 * http://www.exarionetworks.com
 ***************************************************/
(function(WebRTC) {
  var Settings,
    LOG_PREFIX = WebRTC.name +' | '+ 'Settings' +' | ';

  Settings = function(configuration, sound) {
    this.configuration = configuration;
    this.sound = sound;
    this.toggled = false;
    this.userid = $("#settingUserid");
    this.localVideoTop = $("#settingLocalVideoTop");
    this.localVideoLeft = $("#settingLocalVideoLeft");

    this.registerListeners();
    this.initUi();
    this.updatePageColor();
  };

  Settings.prototype = {
    registerListeners: function() {
      var self = this;

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
      $("#saveSettings").bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.configuration.persist();
        $("#settingsPopup").fadeOut(100);
        location.reload(0);
      });
    },
    updatePageColor: function(){
      var color = $("#settingColor").val();
      console.log(LOG_PREFIX+'updating page color : '+color);
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
      $("#settingAutoAnswer").prop('checked', ($.cookie('settingAutoAnswer') === "true") || ClientConfig.enableAutoAnswer );
      this.updateViewPositions();
    },
    updateViewPositions: function(){
      if ($("#localVideo").position().top !== 0 && $("#localVideo").position().left !== 0)
      {
        this.localVideoTop.val($("#localVideo").position().top);
        this.localVideoLeft.val($("#localVideo").position().left);
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
      $.cookie("settingSize", ($("#settingSize").val()), { expires: ClientConfig.expires });
      $.cookie("settingAutoAnswer", ($("#settingAutoAnswer").prop('checked')), { expires: ClientConfig.expires });
      $.cookie("settingWindowPosition", "#localVideo" + "-" + this.localVideoTop.val() + "-" + this.localVideoLeft.val() + "|" +
        "#callHistory" + "-" + $("#settingCallHistoryTop").val() + "-" + $("#settingCallHistoryLeft").val() + "|" +
        "#callStats" + "-" + $("#settingCallStatsTop").val() + "-" + $("#settingCallStatsLeft").val());
    }
  };

  WebRTC.Settings = Settings;
}(WebRTC));
