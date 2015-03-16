module.exports = require('webrtc-core').bdsft.View(SettingsView);

var WebRTC_C = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;
var PopupView = require('./popup');
var Constants = require('webrtc-core').constants;

function SettingsView(options, eventbus, debug, sound, settings) {
  var self = {};

  self.model = settings;

  var updateRowVisibility = function() {
    self.autoAnswerRow.toggleClass('hidden', options.hasOwnProperty("enableAutoAnswer"));
    self.selfViewDisableRow.toggleClass('hidden', options.hasOwnProperty("enableSelfView"));
    self.hdRow.toggleClass('hidden', options.hasOwnProperty("enableHD"));
    self.resolutionRow.toggleClass('hidden', options.hasOwnProperty("displayResolution") && options.hasOwnProperty("encodingResolution"));
    self.resolutionDisplayRow.toggleClass('hidden', options.hasOwnProperty("displayResolution"));
    self.resolutionEncodingRow.toggleClass('hidden', options.hasOwnProperty("encodingResolution"));
    self.resolutionTypeRow.toggleClass('hidden', options.hasOwnProperty("displayResolution") || options.hasOwnProperty("encodingResolution"));
    self.bandwidthLow.toggleClass('hidden', options.hasOwnProperty("bandwidthLow"));
    self.bandwidthMed.toggleClass('hidden', options.hasOwnProperty("bandwidthMed"));
    self.bandwidthHigh.toggleClass('hidden', options.hasOwnProperty("bandwidthHigh"));
    self.bandwidthRow.toggleClass('hidden', options.hasOwnProperty("bandwidthLow") && options.hasOwnProperty("bandwidthMed") && options.hasOwnProperty("bandwidthHigh"));
    self.displayNameRow.toggleClass('hidden', options.hasOwnProperty("displayName"));
  };

  self.elements = ['userid', 'password', 'save', 'authenticationUserid', 'signIn', 'signOut',
    'displayName', 'resolutionType', 'resolutionDisplayWidescreen', 'resolutionDisplayStandard', 'resolutionEncodingWidescreen',
    'resolutionEncodingStandard', 'bandwidthLow', 'bandwidthMed', 'bandwidthHigh', 'displayNameRow', 'useridRow', 'selfViewDisableRow',
    'hdRow', 'autoAnswerRow', 'resolutionTypeRow', 'resolutionDisplayRow', 'resolutionEncodingRow', 'resolutionRow', 'bandwidthRow',
    'selfViewDisable', 'hd', 'size', 'autoAnswer', 'configure',
    'layout', 'clear', 'tabs'
  ];

  self.init = function(options) {
    PopupView(self, eventbus);

    updateRowVisibility();
    self.updateResolutionSelectVisibility();
  };

  self.listeners = function(configurationDatabinder) {
    eventbus.on("viewChanged", function(e) {
      if (e.view === 'dialpad' && e.visible) {
        self.hide();
      }
    });
    eventbus.on(['registered', 'unregistered', 'registrationFailed'], function() {
      self.enableRegistration(true);
    });
    eventbus.on(['signIn', 'signOut'], function() {
      self.enableRegistration(false);
    });
    eventbus.on("resolutionChanged", function() {
      self.updateResolutionSelectVisibility();
    });
    self.clear.on('click', function(e) {
      e.preventDefault();
      settings.resetLayout();
      eventbus.message('Settings reset');
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
      self.hide();
    });
    self.signIn.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      settings.signIn();
    });
    self.tabs.each(function() {
      var active, activeTabSel, links = $(this).find('a');
      active = $(links.filter('[href="' + location.hash + '"]')[0] || links[0]);
      active.addClass('active');
      activeTabSel = active[0].hash;
      links.not(active).each(function() {
        $(this.hash).hide();
      });
      $(this).on('click', 'a', function(e) {
        e.preventDefault();
        active.removeClass('active');
        $(activeTabSel).hide();
        active = $(this);
        activeTabSel = this.hash;
        active.addClass('active');
        $(activeTabSel).show();
      });
    });
  };

  self.updateResolutionSelectVisibility = function() {
    var resolutionType = self.resolutionType.val();
    self.resolutionDisplayStandard.toggleClass('hidden', resolutionType !== WebRTC_C.STANDARD);
    self.resolutionEncodingStandard.toggleClass('hidden', resolutionType !== WebRTC_C.STANDARD);
    self.resolutionDisplayWidescreen.toggleClass('hidden', resolutionType !== WebRTC_C.WIDESCREEN);
    self.resolutionEncodingWidescreen.toggleClass('hidden', resolutionType !== WebRTC_C.WIDESCREEN);
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