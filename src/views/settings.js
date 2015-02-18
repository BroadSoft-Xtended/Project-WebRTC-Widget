module.exports = SettingsView;

var WebRTC_C = require('../Constants');
var Utils = require('../Utils');
var PopupView = require('./popup');

function SettingsView(options, settings, configuration, sipstack, eventbus, debug, sound) {
  var self = {};

  self.__proto__ = PopupView(options, self, eventbus);

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

  self.elements = ['localVideoTop', 'localVideoLeft', 'userid', 'password', 'save', 'authenticationUserid', 'signIn', 'signOut',
    'displayName', 'resolutionType', 'resolutionDisplayWidescreen', 'resolutionDisplayStandard', 'resolutionEncodingWidescreen',
    'resolutionEncodingStandard', 'bandwidthLow', 'bandwidthMed', 'bandwidthHigh', 'displayNameRow', 'useridRow', 'selfViewDisableRow',
    'hdRow', 'autoAnswerRow', 'resolutionTypeRow', 'resolutionDisplayRow', 'resolutionEncodingRow', 'resolutionRow', 'bandwidthRow',
    'callHistoryTop', 'callHistoryLeft', 'callStatsTop', 'callStatsLeft', 'selfViewDisable', 'hd', 'size', 'autoAnswer', 'configure',
    'layout', 'clear', 'tabs'
  ];

  self.init = function(options) {
    Utils.addSelectOptions(WebRTC_C.RESOLUTION_TYPES, self.resolutionType);
    Utils.addSelectOptions(WebRTC_C.STANDARD_RESOLUTIONS, self.resolutionDisplayStandard);
    Utils.addSelectOptions(WebRTC_C.WIDESCREEN_RESOLUTIONS, self.resolutionDisplayWidescreen);
    Utils.addSelectOptions(WebRTC_C.STANDARD_RESOLUTIONS, self.resolutionEncodingStandard);
    Utils.addSelectOptions(WebRTC_C.WIDESCREEN_RESOLUTIONS, self.resolutionEncodingWidescreen);

    settings.setResolutionDisplay(WebRTC_C.DEFAULT_RESOLUTION_DISPLAY);
    settings.setResolutionEncoding(WebRTC_C.DEFAULT_RESOLUTION_ENCODING);
    

    updateRowVisibility();
  };

  self.listeners = function() {
    eventbus.on("viewChanged", function(e) {
      if (e.view === 'dialpad' && e.visible) {
        self.hide();
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
    self.clear.on('click', function(e) {
      e.preventDefault();
      settings.resetLayout();
      eventbus.emit('message', {
        text: 'Settings reset'
      });
    });
    self.signOut.on('click', function(e) {
      e.preventDefault();
      sound.playClick();
      settings.signOut();
    });
    self.save.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      settings.save();
    });
    self.signIn.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      settings.signIn();
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
      self.updateResolutionSelectVisibility();
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
  };

  self.updateResolutionSelectVisibility = function() {
    var resolutionType = self.resolutionType.val();
    self.resolutionDisplayStandard.toggle(resolutionType === WebRTC_C.STANDARD);
    self.resolutionEncodingStandard.toggle(resolutionType === WebRTC_C.STANDARD);
    self.resolutionDisplayWidescreen.toggle(resolutionType === WebRTC_C.WIDESCREEN);
    self.resolutionEncodingWidescreen.toggle(resolutionType === WebRTC_C.WIDESCREEN);
  };
  self.enableRegistration = function(enable) {
    self.signIn.removeClass("disabled");
    self.signOut.removeClass("disabled");
    if (!enable) {
      self.signIn.addClass("disabled");
      self.signOut.addClass("disabled");
    }
  };

  return self;
}