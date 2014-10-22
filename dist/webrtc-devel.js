(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/***************************************************
* Created on Mon Jan 14 15:32:43 GMT 2013 by:
*
* Copyright 2013 Broadsoft
* http://www.broadsoft.com
***************************************************/


/**
 * @name WebRTC
 * @namespace
 */
(function(window) {

var WebRTC = (function() {
  "use strict";

  var WebRTC = {};

  Object.defineProperties(WebRTC, {
    version: {
      get: function(){ return '0.1.0'; }
    },
    name: {
      get: function(){ return 'webrtc'; }
    }
  });

  // IIFE to ensure safe use of $
  (function( $ ) {
    // Create plugin
    $.fn.tooltips = function(el) {

      var $el;

      // Ensure chaining works
      return this.each(function(i, el) {

        $el = $(el).attr("data-tooltip", i);
        var tooltipEl = $el.attr('data-tooltip-element');
        var content = tooltipEl ? $(tooltipEl)[0].outerHTML : $el.attr('title');
        // Make DIV and append to page
        var $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + content + '<div class="arrow"></div></div>').appendTo("body");

        // Position right away, so first appearance is smooth
        $tooltip.position({
          at: "center top",
          my: "center bottom",
          of: $el,
          collision: 'none'
        });

        $el
          // Get rid of yellow box popup
          .removeAttr("title")

          // Mouseenter
          .hover(function() {

            $el = $(this);

            $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']');

            // Reposition tooltip, in case of page movement e.g. screen resize
            $tooltip.position({
              at: "center top",
              my: "center bottom",
              of: $el,
              collision: 'none'
            });

            // Adding class handles animation through CSS
            $tooltip.addClass("active");

            // Mouseleave
          }, function() {

            $el = $(this);

            // Temporary class for same-direction fadeout
            $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");

            // Remove all classes
            setTimeout(function() {
              $tooltip.removeClass("active").removeClass("out");
            }, 300);

          });
      });
    };
  })(jQuery);

  jQuery.fn.putCursorAtEnd = function() {

    return this.each(function() {

      $(this).focus();

      // If this function exists...
      if (this.setSelectionRange) {
        // ... then use it (Doesn't work in IE)

        // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
        var len = $(this).val().length * 2;

        this.setSelectionRange(len, len);

      } else {
        // ... otherwise replace the contents with itself
        // (Doesn't work in Google Chrome)

        $(this).val($(this).val());

      }

      // Scroll to the bottom, in case we're in a tall textarea
      // (Necessary for Firefox and Google Chrome)
      this.scrollTop = 999999;

    });

  };

  $.cssHooks.backgroundColor = {
    get: function(elem) {
      var bg = null;
      if (elem.currentStyle) {
        bg = elem.currentStyle["backgroundColor"];
      }
      else if (window.getComputedStyle) {
        bg = document.defaultView.getComputedStyle(elem,
          null).getPropertyValue("background-color");
      }
      if (bg.search("rgb") === -1 || bg === 'transparent') {
        return bg;
      }
      else {
        bg = bg.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+).*\)$/);
        var hex = function(x) {
          return ("0" + parseInt(x, 10).toString(16)).slice(-2);
        };
        return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
      }
    }
  };

  $(document).ready(function(){
    var nodes = $("script[src*='webrtc-bundle']");
    if(nodes.length === 0) {
      console.error('no <script> with webrtc-bundle.js found');
      return;
    }

    window.BroadSoftWebRTC = window.BroadSoftWebRTC || {};
    window.BroadSoftWebRTC.clients = [];

    $.each(nodes, function(i, node){
      node = $(node);
      if(!node.text()) {
        return;
      }
      var configData = JSON.parse(node.text());
      console.log("script config : ", configData);
      var config = $.extend({}, window.ClientConfig, configData);
      console.log("merged config : ", config);
      var client = new WebRTC.Client(config, node.parent());
      var styleData = node.data();
      if(styleData) {
        client.updateCss(styleData);
      }
      node.remove();
      window.BroadSoftWebRTC.clients.push(client);
    });
  });

  (function($){
    $.isBlank = function(obj){
      return(!obj || $.trim(obj) === "");
    };
  })(jQuery);

  if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }

  return WebRTC;
}());



/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var EventBus;
//    LOG_PREFIX = WebRTC.name +' | '+ 'EventBus' +' | ';

  EventBus = function(options) {
    this.options = options || {};

    var events = [
      'message',
      'userMediaUpdated',
      'reInvite',
      'incomingCall',
      'connected',
      'registered',
      'unregistered',
      'registrationFailed',
      'disconnected',
      'progress',
      'failed',
      'started',
      'held',
      'resumed',
      'ended',
      'calling',
      'newDTMF',
      'viewChanged',
      'dataSent',
      'dataReceived',
      'smsLoggedIn',
      'smsReadAll',
      'smsSent'
    ];

    this.initEvents(events);
  };

  EventBus.prototype = new ExSIP.EventEmitter();

  EventBus.prototype.viewChanged = function(sender, data) {
    this.emit("viewChanged", sender, data);
  };
  EventBus.prototype.message = function(text, level) {
    this.emit("message", this, {text: text, level: level});
  };
  EventBus.prototype.message = function(text, level) {
    this.emit("message", this, {text: text, level: level});
  };
  EventBus.prototype.userMediaUpdated = function(localStream) {
    this.emit("userMediaUpdated", this, {localStream: localStream});
  };
  EventBus.prototype.reInvite = function(data) {
    this.emit("reInvite", this, data);
  };
  EventBus.prototype.incomingCall = function(data) {
    this.emit("incomingCall", this, data);
  };
  EventBus.prototype.connected = function(data) {
    this.emit("connected", this, data);
  };
  EventBus.prototype.unregistered = function(data) {
    this.emit("unregistered", this, data);
  };
  EventBus.prototype.registered = function(data) {
    this.emit("registered", this, data);
  };
  EventBus.prototype.registrationFailed = function(data) {
    this.emit("registrationFailed", this, data);
  };
  EventBus.prototype.disconnected = function(data) {
    this.emit("disconnected", this, data);
  };
  EventBus.prototype.failed = function(sender, data) {
    this.emit("failed", sender, data);
  };
  EventBus.prototype.progress = function(sender, data) {
    this.emit("progress", sender, data);
  };
  EventBus.prototype.started = function(sender, data) {
    this.emit("started", sender, data);
  };
  EventBus.prototype.held = function(sender, data) {
    this.emit("held", sender, data);
  };
  EventBus.prototype.resumed = function(sender, data) {
    this.emit("resumed", sender, data);
  };
  EventBus.prototype.ended = function(sender, data) {
    this.emit("ended", sender, data);
  };
  EventBus.prototype.dataSent = function(sender, data) {
    this.emit("dataSent", sender, data);
  };
  EventBus.prototype.dataReceived = function(sender, data) {
    this.emit("dataReceived", sender, data);
  };
  EventBus.prototype.calling = function(sender, data) {
    this.emit("calling", sender, data);
  };
  EventBus.prototype.newDTMF = function(sender, data) {
    this.emit("newDTMF", sender, data);
  };
  EventBus.prototype.smsLoggedIn = function(sender, data) {
    this.emit("smsLoggedIn", sender, data);
  };
  EventBus.prototype.smsReadAll = function(sender, data) {
    this.emit("smsReadAll", sender, data);
  };
  EventBus.prototype.smsSent = function(sender, data) {
    this.emit("smsSent", sender, data);
  };
  EventBus.prototype.isDebug = function() {
    return this.options.isDebug();
  };

  WebRTC.EventBus = EventBus;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var DateFormat,
    C = {
      dayNames: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      mthNames: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    };
    C.zeroPad = function(number) {
        return ("0"+number).substr(-2,2);
    };
    C.dateMarkers = {
      d:['getDate',function(v) { return C.zeroPad(v);}],
      m:['getMonth',function(v) { return C.zeroPad(v+1);}],
      n:['getMonth',function(v) { return C.mthNames[v]; }],
      w:['getDay',function(v) { return C.dayNames[v]; }],
      y:['getFullYear'],
      H:['getHours',function(v) { return C.zeroPad(v);}],
      M:['getMinutes',function(v) { return C.zeroPad(v);}],
      S:['getSeconds',function(v) { return C.zeroPad(v);}],
      i:['toISOString']
    };

  DateFormat = function (fstr) {
    this.formatString = fstr;
  };

  DateFormat.prototype = {
    format: function(date) {
      var dateTxt = this.formatString.replace(/%(.)/g, function(m, p) {
        var dateMarker = C.dateMarkers[p];
        var method = dateMarker[0];
        var rv = date[method]();

        if ( dateMarker[1] != null ) {
          rv = dateMarker[1](rv);
        }

        return rv;

      });

      return dateTxt;
    }
  };

  WebRTC.DateFormat = DateFormat;
  WebRTC.DateFormat.C = C;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Configuration,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Configuration'),
    Flags = {
      enableHD: 1,
      enableCallControl: 2,
      enableCallTimer: 4,
      enableCallHistory: 8,
      enableFullScreen: 16,
      enableSelfView: 32,
      enableCallStats: 64,
      enableDialpad: 128,
      enableMute: 256,
      enableMessages: 512,
      enableRegistrationIcon: 1024,
      enableConnectionIcon: 2048,
      enableWindowDrag: 4096,
      enableSettings: 8192,
      enableAutoAnswer: 16384,
      enableAutoAcceptReInvite: 32768,
      enableConnectLocalMedia: 65536,
      enableTransfer: 131072,
      enableHold: 262144,
      enableIms: 524288
    };

  Configuration = function(eventBus, configObj) {
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Configuration');

    logger.log('window.location.search : '+window.location.search, this);
    logger.log('configuration options : '+ExSIP.Utils.toString(configObj), this);
    jQuery.extend(this, configObj);

    // Default URL variables
    this.eventBus = eventBus;
    if(WebRTC.Utils.getSearchVariable("disableMessages")) {
      this.enableMessages = false;
    }
    this.destination = this.destination || WebRTC.Utils.getSearchVariable("destination");
    this.networkUserId = this.networkUserId || WebRTC.Utils.getSearchVariable("networkUserId");
    this.hd = (WebRTC.Utils.getSearchVariable("hd") === "true") || $.cookie('settingHD');
    this.audioOnly = (WebRTC.Utils.getSearchVariable("audioOnly") === "true");
    this.sipDisplayName = this.displayName || WebRTC.Utils.getSearchVariable("name") || $.cookie('settingDisplayName');
    if(this.sipDisplayName) {
      this.sipDisplayName = this.sipDisplayName.replace(/%20/g," ");
    }
    this.maxCallLength = WebRTC.Utils.getSearchVariable("maxCallLength");
    this.size = WebRTC.Utils.getSearchVariable("size") || $.cookie('settingSize') || 1;
    this.color = WebRTC.Utils.colorNameToHex(WebRTC.Utils.getSearchVariable("color")) || $.cookie('settingColor');
    this.offerToReceiveVideo = true;
    var features = WebRTC.Utils.getSearchVariable("features");
    if(features) {
      this.setClientConfigFlags(parseInt(features, 10));
    }
  };

  Configuration.prototype = {
    getClientConfigFlags: function(){
      var flags = 0;
      for(var flag in Flags) {
        var value = Flags[flag];
        if(this[flag]) {
          flags |= value;
        }
      }
      return flags;
    },
    setClientConfigFlags: function(flags){
      for(var flag in Flags) {
        var value = Flags[flag];
        if(flags & value) {
          this[flag] = true;
        } else {
          this[flag] = false;
        }
      }
    },
    isAudioOnlyView: function(){
      var views = this.getViews();
      return views.indexOf('audioOnly') !== -1;
    },
    getViews: function(){
      var view = WebRTC.Utils.getSearchVariable("view");
      var views = [];
      if(this.view) {
        $.merge(views, this.view.split(' '));
      }
      if(view) {
        $.merge(views, view.split(' '));        
      }
      return $.unique(views);
    },    
    getBackgroundColor: function(){
      return this.color || $('body').css('backgroundColor');
    },
    getPassword: function(){
      return $.cookie('settingPassword');
    },
    isAutoAnswer: function(){
      return this.settings.settingAutoAnswer.is(':checked');
    },
    getDTMFOptions: function(){
      return {duration: WebRTC.C.DEFAULT_DURATION, interToneGap: WebRTC.C.DEFAULT_INTER_TONE_GAP};
    },
    getExSIPOptions: function(){
      // Options Passed to ExSIP
      var options =
      {
        mediaConstraints:
        {
          audio: true,
          video: this.getVideoConstraints()
        },
        createOfferConstraints: {mandatory:{
          OfferToReceiveAudio:true,
          OfferToReceiveVideo: !this.isAudioOnlyView() && this.offerToReceiveVideo
        }}
      };
      return options;
    },

    getMediaConstraints: function(){
      if(this.client.isScreenSharing) {
        return { video: { mandatory: { chromeMediaSource: 'screen' }}};
      } else {
        return { audio: true, video: this.getVideoConstraints() };
      }
    },

    getVideoConstraints: function(){
      if (this.isAudioOnlyView() || this.audioOnly) {
        return false;
      } else {
        var constraints = this.getResolutionConstraints();
        return  constraints ? constraints : true;
      }
    },

    getResolutionConstraints: function(){
      if(this.hd === true) {
        return { mandatory: { minWidth: 1280, minHeight: 720 }};
      } else {
        var width = this.settings.getResolutionEncodingWidth();
        var height = this.settings.getResolutionEncodingHeight();
        if(width && height) {
          if(height <= 480) {
            return { mandatory: { maxWidth: width, maxHeight: height }};
          } else {
            return { mandatory: { minWidth: width, minHeight: height }};
          }
        } else {
          return false;
        }
      }
    },

    getExSIPConfig: function(data){
      data = data || {};
      var userid = data.userId || $.cookie('settingUserId') || this.networkUserId || WebRTC.Utils.randomUserid();

      var sip_uri = encodeURI(userid);
      if ((sip_uri.indexOf("@") === -1))
      {
        sip_uri = (sip_uri + "@" + this.domainFrom);
      }

      var config  =
      {
        'uri': sip_uri,
        'authorization_user': data.authenticationUserId || $.cookie('settingAuthenticationUserId') || userid,
        'ws_servers': this.websocketsServers,
        'stun_servers': 'stun:' + this.stunServer + ':' + this.stunPort,
        'trace_sip': this.debug,
        'enable_ims': this.enableIms,
        'p_asserted_identity': this.pAssertedIdentity,
        'enable_datachannel': this.enableWhiteboard || this.enableFileShare
      };

      // Add Display Name if set
      if (this.sipDisplayName)
      {
        config.display_name = this.sipDisplayName;
      }

      // do registration if setting User ID or configuration register is set
      if ($.cookie('settingUserId') || this.register)
      {
        config.register = true;
        config.password = data.password || $.cookie('settingPassword');
      }
      else
      {
        config.register = false;
      }
      return config;
    },

    getRtcMediaHandlerOptions: function(){
      var options = {
        reuseLocalMedia: this.enableConnectLocalMedia,
        videoBandwidth: this.settings.getBandwidth(),
        disableICE: this.disableICE,
        RTCConstraints: {'optional': [],'mandatory': {}}
      };
      return options;
    },

    setSettings: function(settings){
      this.settings = settings;
    },

    isDebug: function(){
      return this.debug === true;
    },

    isHD: function(){
      return this.enableHD === true && this.hd === true;
    },

    isWidescreen: function() {
      return this.isHD() || this.settings.resolutionType.val() === WebRTC.C.WIDESCREEN;
    },

    setResolutionDisplay: function(resolutionDisplay) {
      this.hd = false;
      this.settings.setResolutionDisplay(resolutionDisplay);
      this.eventBus.viewChanged(this.settings);
    },

    getResolutionDisplay: function() {
      return this.isHD() ? WebRTC.C.R_1280x720 : this.settings.getResolutionDisplay();
    }
  };
  WebRTC.Configuration = Configuration;
  WebRTC.Configuration.Flags = Flags;
}(WebRTC));



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
      this.eventBus.on("registered", function(e){ 
        self.enableRegistration(true);
      });
      this.eventBus.on("unregistered", function(e){ 
        self.enableRegistration(true);
      });
      this.eventBus.on("registrationFailed", function(e){ 
        self.enableRegistration(true);
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
    enableRegistration: function(enable){
      this.signInBtn.removeClass("disabled");
      this.signOutBtn.removeClass("disabled");
      if(!enable) {
        this.signInBtn.addClass("disabled");
        this.signOutBtn.addClass("disabled");
      }
    },
    signIn: function(){
      this.sound.playClick();
      this.persist();
      this.sipStack.init();
      this.enableRegistration(false);
    },    
    signOut: function(){
      this.sound.playClick();
      this.sipStack.unregister();
      this.clearConfigurationCookies();
      this.enableRegistration(false);
    },    
    resetLayout: function(){
      this.resolutionEncoding(WebRTC.C.DEFAULT_RESOLUTION_ENCODING);
      this.resolutionDisplay(WebRTC.C.DEFAULT_RESOLUTION_DISPLAY);
      this.client.updateClientClass();
    },
    clearConfigurationCookies: function(){
      $.removeCookie('settingDisplayName');
      $.removeCookie('settingUserId');
      $.removeCookie('settingAuthenticationUserId');
      $.removeCookie('settingPassword');
    },
    clearConfiguration: function(){
      this.displayName(null);
      this.userId(null);
      this.authenticationUserId(null);
      this.password(null);
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



/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var History;

  History = function (client, sound, stats, sipStack, configuration) {
    this.callHistory = client.find('.callHistory');
    this.content = this.callHistory.find('.content');
    this.historyForward = this.callHistory.find('.historyForward');
    this.historyBack = this.callHistory.find('.historyBack');
    this.callHistoryDetails = this.callHistory.find('.callHistoryDetails');
    this.historyDetailsClose = this.callHistory.find('.historyDetailsClose');
    this.resolutionIn = this.callHistory.find('.resolutionIn');
    this.resolutionOut = this.callHistory.find('.resolutionOut');
    this.bitrateIn = this.callHistory.find('.bitrateIn');
    this.bitrateOut = this.callHistory.find('.bitrateOut');
    this.frameRateIn = this.callHistory.find('.frameRateIn');
    this.frameRateOut = this.callHistory.find('.frameRateOut');
    this.audioLostPer = this.callHistory.find('.audioLostPer');
    this.videoLostPer = this.callHistory.find('.videoLostPer');
    this.jitter = this.callHistory.find('.jitter');
    this.historyClear = this.callHistory.find(".historyClear");
    this.historyCallLink = this.callHistory.find(".callLink");
    this.historyButton = $(".history-button");

    this.pageNumber = 0;
    this.historyToggled = false;
    this.configuration = configuration;
    this.client = client;
    this.sound = sound;
    this.stats = stats;
    this.sipStack = sipStack;
    this.callsPerPage = 10;
    this.maxPages = 25;
    this.rows = [];

    this.registerListeners();

    this.updateContent();
  };

  History.Page = function (number, callsValue) {
    this.number = number;
    this.calls = this.parseCalls(callsValue);
  };

  History.Page.prototype = {
    callsAsString: function () {
      return this.calls.map(function(call){return call.toString();}).join("~");
    },
    parseCalls: function (callsValue) {
      var calls = [];
      if(callsValue.trim().length > 0) {
        var callsArray = callsValue.split("~");
        for(var i=0; i<callsArray.length; i++){
          calls.push(new History.Call(callsArray[i]));
        }
      }
      return calls;
    }
  };

  History.Call = function (value) {
    var values = value ? value.split("|") : [];
    this.startTime = values[0];
    this.destination = values[1];
    this.direction = values[2];
    this.resolutionIn = values[3];
    this.resolutionOut = values[4];
    this.bitrateIn = values[5];
    this.bitrateOut = values[6];
    this.frameRateIn = values[7];
    this.frameRateOut = values[8];
    this.audioLostPer = values[9];
    this.videoLostPer = values[10];
    this.jitter = values[11];
    this.length = values[12];
  };

  History.Call.prototype = {
    startDate: function(){
      var date = new Date();
      date.setTime(this.startTime);
      return date.toLocaleString();
    },
    destinationWithoutSip: function(){
      return this.destination.replace(/sip:([^@]+)@.+/, "$1");
    },
    toString: function(){
      var values = [this.startTime, this.destination, this.direction, this.resolutionIn, this.resolutionOut, this.bitrateIn,
        this.bitrateOut, this.frameRateIn, this.frameRateOut, this.audioLostPer, this.videoLostPer, this.jitter, this.length];
      return values.join("|");
    }
  };

  History.prototype = {
    pages: function(){
      var pages = [];
      for(var i=0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var regex = new RegExp(/page_(.*)/g);
        var match = regex.exec(key);
        if(match != null && match.length > 1) {
          var value = localStorage.getItem(key);
          var page = new History.Page(parseInt(match[1], 10), value);
          pages.push(page);
        }
      }
      // sort pages descendingly
      pages.sort(function(page1, page2) {
        return page2.number - page1.number;
      });
      return pages;
    },

    updateButtonsVisibility: function() {
      var pages = this.pages();
      var pagesCount = pages ? pages.length - 1 : 0;
      if (this.pageNumber < pagesCount) {
        this.historyForward.show();
      }
      else {
        this.historyForward.hide();
      }
      if (this.pageNumber > 0) {
        this.historyBack.show();
      }
      else {
        this.historyBack.hide();
      }
    },

    updateContent: function() {
      this.content.html("");
      this.rows = [];
      this.updateButtonsVisibility();
      var calls = this.getAllCalls();
      var startPos = this.callsPerPage * this.pageNumber;
      for (var i = startPos; i < startPos + this.callsPerPage && i < calls.length; i++) {
        var row = this.client.find('.historyRowSample').clone();
        row.attr('id', '');
        row.attr('class', 'history-row');
        var call = calls[i];
        row.bind("click", this.callDetailsHandler(call));
        row.find(".historyCall").text((this.pageNumber * 10) + i + 1);
        row.find(".hist-destination").text(call.destinationWithoutSip());
        //row.find(".historyDirection").text(call.direction);
        row.find(".hist-direction").append("<i class='icon-arrow-"+call.direction+"-thick'></i>");
        //row.find(".historyDate").text(call.startDate());
        row.find(".hist-date").text(WebRTC.Utils.formatDateTime(call.startDate()));
        row.find(".hist-length").text(call.length);
        this.rows.push(row);
        row.appendTo(this.content);
      }
    },
    getAllCalls:function () {
      var pages = this.pages();
      var calls = [];
      for(var i=0; i<pages.length; i++) {
        calls = calls.concat(pages[i].calls);
      }
      return calls;
    },

    callDetailsHandler:function (call) {
      var self = this;
      return function (e) {
        e.preventDefault();
        self.resolutionIn.text(call.resolutionIn);
        self.resolutionOut.text(call.resolutionOut);
        self.bitrateIn.text(call.bitrateIn);
        self.bitrateOut.text(call.bitrateOut);
        self.frameRateIn.text(call.frameRateIn);
        self.frameRateOut.text(call.frameRateOut);
        self.audioLostPer.text(call.audioLostPer);
        self.videoLostPer.text(call.videoLostPer);
        self.jitter.text(call.jitter);
        self.historyCallLink.attr("data-destination", call.destinationWithoutSip());
        self.historyCallLink.text("Call "+call.destinationWithoutSip());
        self.callHistoryDetails.fadeIn(100);
        self.callHistory.css({width:"416px"});
        $(".history-row").removeClass("active");
        $(this).addClass("active");
      };
    },

    setPageNumber: function(pageNumber) {
      this.pageNumber = pageNumber;
      this.updateContent();
    },

    registerListeners:function () {
      var self = this;

      this.historyForward.bind('click', function (e) {
        e.preventDefault();
        self.sound.playClick();
        self.setPageNumber(self.pageNumber + 1);
      });

      this.historyBack.bind('click', function (e) {
        e.preventDefault();
        self.sound.playClick();
        self.setPageNumber(self.pageNumber - 1);
      });

      this.historyDetailsClose.bind('click', function (e) {
        e.preventDefault();
        self.callHistoryDetails.fadeOut(100);
        self.callHistory.css({width:"200px"});
      });

      this.historyCallLink.bind('click', function (e) {
        e.preventDefault();
        if(self.sipStack.getCallState() === WebRTC.SIPStack.C.STATE_CONNECTED) {
          self.sound.playClick();
          var destination = self.historyCallLink.attr("data-destination");
          self.client.destination.val(destination);
          self.client.callUri(destination);
          self.callHistory.css({width:"200px"});
          self.callHistory.fadeOut(100);
        }
        self.callHistoryDetails.hide();
      });

      this.historyClear.bind('click', function (e) {
        e.preventDefault();
        self.sound.playClick();
        var pages = self.pages();
        for (var i = 0; i < pages.length; i++) {
          localStorage.removeItem("page_" + (pages[i].number));
        }
        self.setPageNumber(0);
      });
    },

    persistPage:function (page) {
      var key = ("page_" + page.number);
      var value = page.callsAsString();
      localStorage[key] = value;
    },

    persistCall:function (rtcSession) {
      if (!this.configuration.enableCallHistory) {
        return;
      }
      // Get latest cookie
      var pages = this.pages();
      var page = null;
      if (pages.length > 0) {
        page = pages[0];
      }
      else {
        page = new History.Page(0, "");
      }

      if(page.calls.length >= this.callsPerPage) {
        if(page.number+1 >= this.maxPages) {
          // remove oldest call and reorder calls to each page
          for(var i=0; i<pages.length; i++) {
            var lastPageCall = pages[i].calls.pop();
            if(i+1 < pages.length) {
              pages[i+1].calls.unshift(lastPageCall);
            }
            this.persistPage(pages[i]);
          }
        } else {
          page = new History.Page(page.number+1, "");
        }
      }

      // cookie vars
      var call = this.createCall(rtcSession);
      page.calls.unshift(call);
      this.persistPage(page);
      this.updateContent();
    },

    createCall: function(rtcSession) {
      var call = new History.Call();
      var start = rtcSession.start_time;
      call.startTime = new Date(start).getTime();
      call.destination = rtcSession.remote_identity.uri;
      if (rtcSession.direction === "outgoing") {
        call.direction = "up";
      }
      else {
         call.direction = "down";
      }
      call.resolutionIn = this.stats.getValue("video", "googFrameWidthReceived")+"x"+this.stats.getValue("video", "googFrameHeightReceived");
      call.resolutionOut = this.stats.getValue("video", "googFrameWidthSent")+"x"+this.stats.getValue("video", "googFrameHeightSent");
      call.bitrateIn = this.stats.getAvg("video", "kiloBitsReceivedPerSecond");
      call.bitrateOut = this.stats.getAvg("video", "kiloBitsSentPerSecond");
      call.frameRateIn = this.stats.getAvg("video", "googFrameRateReceived");
      call.frameRateOut = this.stats.getAvg("video", "googFrameRateSent");
      call.audioLostPer = this.stats.getAvg("audio", "packetsLostPer");
      call.videoLostPer = this.stats.getAvg("video", "packetsLostPer");
      call.jitter = this.stats.getAvg("audio", "googJitterReceived");
      call.length = WebRTC.Utils.format(Math.round(Math.abs((rtcSession.end_time - start) / 1000)));
      return call;
    },

    toggle:function () {
      if (this.configuration.enableCallHistory === true) {
        if (this.historyToggled === false) {
          this.callHistory.fadeIn(100);
          this.historyClear.fadeIn(100);
          this.historyButton.addClass("active");
        }
        else if (this.historyToggled === true) {
          this.callHistory.fadeOut(100);
          this.historyClear.fadeOut(100);
          this.historyButton.removeClass("active");
        }
      }
      this.historyToggled = !this.historyToggled;
    }
  };

  WebRTC.History = History;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var Transfer;

  Transfer = function (client, sound, sipStack, configuration) {
    this.icon = client.find(".transfer");
    this.popup = client.find(".transferPopup");
    this.accept = this.popup.find(".acceptTransfer");
    this.reject = this.popup.find(".rejectTransfer");
    this.targetInput = this.popup.find(".transferTarget");
    this.typeAttended = this.popup.find(".transferTypeAttended");

    this.visible = false;
    this.client = client;
    this.sound = sound;
    this.sipStack = sipStack;
    this.configuration = configuration;

    this.registerListeners();
  };

  Transfer.prototype = {
    registerListeners: function () {
      var self = this;
      this.icon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.setVisible(!self.visible);
        if(self.visible) {
          self.targetInput.focus();
        }
      });

      this.accept.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        var targetInput = self.targetInput.val();
        if($.isBlank(targetInput)) {
          self.client.message(self.configuration.messageOutsideDomain, "alert");
          return;
        }
        targetInput = self.client.validateDestination(targetInput);
        self.setVisible(false);
        self.sipStack.transfer(targetInput, self.typeAttended.is(':checked'));
      });

      this.reject.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.setVisible(false);
      });
    },

    setVisible: function(visible){
      this.visible = visible;
      this.client.updateClientClass();
    }
  };

  WebRTC.Transfer = Transfer;
}(WebRTC));



/**
 * @fileoverview ExSIP Constants
 */

/**
 * ExSIP Constants.
 * @augments ExSIP
 */

(function(WebRTC) {
  var C= {
    WIDESCREEN: 'widescreen',
    STANDARD: 'standard',
    R_1280x720: '1280x720',
    R_640x360: '640x360',
    R_320x180: '320x180',
    R_960x720: '960x720',
    R_640x480: '640x480',
    R_320x240: '320x240',
    DEFAULT_DURATION:        500,
    DEFAULT_INTER_TONE_GAP:  200,

    TEMPLATES: '$TEMPLATES$',

    CSS: '$CSS$',

    MEDIA: '$MEDIA$',

    FONTS: '$FONTS$',

    STYLES: {
      iconHightlightColor: '#00adef',
      infoMessageColor: '#999999',
      successMessageColor: '#00FF00',
      warningMessageColor: '#FFFF00',
      alertMessageColor: '#FF0000',
      statsColor: '#999999',
      timerColor: '#FFFFFF'
    }

  };
  C.DEFAULT_RESOLUTION_ENCODING = C.R_640x480;
  C.DEFAULT_RESOLUTION_DISPLAY = C.R_640x480;
  C.RESOLUTION_TYPES = {'standard': C.STANDARD, 'widescreen': C.WIDESCREEN};
  C.STANDARD_RESOLUTIONS = {'960 x 720': C.R_960x720, '640 x 480': C.R_640x480, '320 x 240': C.R_320x240};
  C.WIDESCREEN_RESOLUTIONS = {'1280 x 720': C.R_1280x720, '640 x 360': C.R_640x360, '320 x 180': C.R_320x180};

  WebRTC.C = C ;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Timer,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Timer');

  Timer = function(client, stats, configuration) {
    this.text = client.find(".timer");

    this.client = client;
    this.stats = stats;
    this.configuration = configuration;
    this.callTimer = null;
    this.startTime = null;

    this.updateText();
  };

  Timer.prototype = {
    start: function()
    {
      if(this.callTimer) {
        logger.log('timer '+this.callTimer+' already running', this.configuration);
        return;
      }

      var timer = this.runningTimer();
      this.callTimer = setInterval(timer, 1000);
      logger.log("started timer interval : "+this.callTimer, this.configuration);
    },

    stop: function()
    {
      this.startTime = null;
      clearInterval(this.callTimer);
      logger.log("cleared timer interval : "+this.callTimer, this.configuration);
      this.callTimer = null;
      this.updateText();
    },

    getSeconds: function()
    {
      return Math.round((new Date().getTime() - (this.startTime || new Date().getTime())) / 1000);
    },

    updateText: function()
    {
      var secs = this.getSeconds();
      this.text.text(WebRTC.Utils.format(secs));
    },

// Display the timer on the screen
    runningTimer: function()
    {
      var self = this;
      this.startTime = new Date().getTime();
      return function ()
      {
        var secs = self.getSeconds();
        if (self.configuration.maxCallLength && secs >= self.configuration.maxCallLength)
        {
          self.client.terminateSessions();
          self.client.endCall();
          return;
        }
        self.updateText();
        if (self.configuration.enableCallStats && WebRTC.Utils.isChrome())
        {
          self.stats.processStats();
        }
      };
    }
  };

  WebRTC.Timer = Timer;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var FileShare,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'FileShare'),
    C = {
      ACTION_REQUEST: 'request',
      ACTION_REPLY: 'reply',
      ACTION_SEND: 'send',
      ACTION_RECEIVED: 'received'
    };

  FileShare = function (client, element, eventBus, sipStack) {
    this.ui = element;
    this.fileInput = this.ui.find('input[type="file"]');
    this.status = this.ui.find('.status');

    this.requests = {};
    this.toggled = false;
    this.client = client;
    this.sipStack = sipStack;
    this.eventBus = eventBus;

    this.registerListeners();
  };

  FileShare.prototype = {
    registerListeners: function() {
      var self = this;
      this.fileInput.on('change', $.proxy(this.handleFileSelect, this));

      this.eventBus.on("dataReceived", function(e){
        var data = e.data.data, match;
        var regex = /^fileshare:([^:]*):([^:]*):?/;
        if(match = data.match(regex)) {
          var fileName = match.pop();
          var action = match.pop();
          data = data.replace(regex,'');
          self.process(action, fileName, data);
        }
      });
    },
    process: function(action, fileName, data) {
      if(action === C.ACTION_REQUEST) {
        var accept = window.confirm("User wants to share the file "+fileName+" with you. Do you want to receive it?");
        this.replyRequest(accept, fileName);
      }
      else if(action === C.ACTION_REPLY) {
        if(data === 'true') {
          var fileData = this.requests[fileName];
          this.sendFile(fileData, fileName);
        } else {
          this.updateStatus("rejected request for "+fileName);
          delete this.requests[fileName];
        }
      }
      else if(action === C.ACTION_SEND) {
        this.receivedFile(data, fileName);
      }
      else if(action === C.ACTION_RECEIVED) {
        this.updateStatus(fileName+" transferred successfully");
        delete this.requests[fileName];
      }
    },
    handleFileSelect: function(evt) {
      var file = evt.target.files[0];

      if (file) {
        var reader = new FileReader();
        reader.onload = $.proxy(this.requestSend, this);
        reader.readAsDataURL(file);
      } else {
        alert("Failed to load file");
      }
    },
    requestSend: function(e) {
      var data = e.target.result;
      var file = this.fileInput.val();
      var fileName = this.fileName(file);
      this.requests[fileName] = data;

      this.updateStatus("requesting sending file "+fileName+" ...");
      this.send(C.ACTION_REQUEST, fileName);
    },
    replyRequest: function(accept, fileName) {
      if(accept) {
        this.updateStatus("receiving file "+fileName+" ...");
      }
      this.send(C.ACTION_REPLY, fileName, accept);
    },
    receivedFile: function(data, fileName) {
      this.updateStatus("received file "+fileName);
      var blob = WebRTC.Utils.dataURItoBlob(data);
      window.saveAs(blob, fileName);
      this.send(C.ACTION_RECEIVED, fileName);
    },
    sendFile: function(data, fileName) {
      this.updateStatus("sending file "+fileName+" ...");
      this.send(C.ACTION_SEND, fileName, data);
    },
    send: function(action, fileName, data) {
      var dataString = "fileshare:"+action+":"+fileName;
      if(data) {
        dataString += ":"+data;
      }
      this.sipStack.sendData(dataString);
    },
    updateStatus: function(status) {
      logger.log(status, this.client.configuration);
      this.status.text(status);
    },
    fileName: function(file) {
      return file.split('\\').pop();
    }
  };

  WebRTC.FileShare = FileShare;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var Whiteboard;

  Whiteboard = function (client, element, eventBus, sipStack) {
    this.whiteboard = element;
    this.canvas = this.whiteboard.find('.simple_sketch');
    this.context = this.canvas[0].getContext('2d');

    this.toggled = false;
    this.client = client;
    this.sipStack = sipStack;
    this.eventBus = eventBus;

    this.color = '#000';
    this.size = 5;
    this.tool = 'marker';
    this.action = [];

    this.initCanvas();
    this.registerListeners();
    this.updateToolsSelection();
  };

  Whiteboard.prototype = {
    registerListeners: function() {
      var self = this;
      this.eventBus.on("dataReceived", function(e){
        var data = e.data.data;
        var regex = /^whiteboard:/;
        if(data.match(regex)) {
          data = data.replace(regex,'');
          var img = new Image();
          img.onload = function(){
            self.clear();
            self.context.drawImage(img,0,0); // Or at whatever offset you like
          };
          img.src = data;
        }
      });
    },
    initCanvas: function() {
      var self = this;
      $.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
        self.whiteboard.find('.tools').append("<a href='.simple_sketch' onclick='javascript:;' data-color='" + this + "' style='width: 10px; background: " + this + ";'></a> ");
      });
      $.each([3, 5, 10, 15], function() {
        self.whiteboard.find('.tools').append("<a href='.simple_sketch' onclick='javascript:;' data-size='" + this + "' style='background: #ccc'>" + this + "</a> ");
      });

      this.canvas.bind('click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel', jQuery.proxy( this, "onEvent" ));

      $('body').delegate("a[href=\"." + (this.canvas.attr('class')) + "\"]", 'click', function(e) {
        var $canvas, $this, key, sketch, _i, _len, _ref;
        $this = $(this);
        $canvas = $($this.attr('href'));
        sketch = $canvas.data('sketch');
        _ref = ['color', 'size', 'tool'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          var value = $this.attr("data-" + key);
          if (value) {
            if(key === "size") {
              value = +value;
            }
            self[key] = value;
          }
        }
        self.updateToolsSelection();
        return false;
      });
    },
    updateToolsSelection: function() {
      var self = this;
      $.each(this.whiteboard.find(".tools a"), function(){
        var selected = $(this).data('color') === self.color || $(this).data('tool') === self.tool || +$(this).data('size') === self.size;
        if(selected) {
          $(this).attr('class', 'selected');
        } else {
          $(this).attr('class', '');
        }
      });
    },
    sendData: function() {
      var data = this.canvas[0].toDataURL();
      this.sipStack.sendData("whiteboard:"+data);
    },
    clear: function() {
      // Store the current transformation matrix
      this.context.save();

      // Use the identity matrix while clearing the canvas
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);

      // Restore the transform
      this.context.restore();
    },
    onEvent: function(e) {
      if (e.originalEvent && e.originalEvent.targetTouches) {
        e.pageX = e.originalEvent.targetTouches[0].pageX;
        e.pageY = e.originalEvent.targetTouches[0].pageY;
      }
      switch (e.type) {
        case 'mousedown':
        case 'touchstart':
          this.painting = true;
          this.action = {
            tool: this.tool,
            color: this.color,
            size: parseFloat(this.size),
            events: []
          };
          break;
      }
      if(this.painting) {
        this.action.events.push({
          x: e.pageX - this.canvas.offset().left,
          y: e.pageY - this.canvas.offset().top,
          event: e.type
        });
        if(this.tool === 'marker') {
          this.draw(this.action);
        } else if(this.tool === 'eraser') {
          this.erase(this.action);
        }
      }
      switch (e.type) {
        case 'mouseup':
        case 'mouseout':
        case 'mouseleave':
        case 'touchend':
        case 'touchcancel':
          this.painting = false;
          this.action = null;
          this.sendData();
      }
      e.preventDefault();
      return false;
    },
    erase: function(action) {
      var oldcomposite;
      oldcomposite = this.context.globalCompositeOperation;
      this.context.globalCompositeOperation = "copy";
      action.color = "rgba(0,0,0,0)";
      this.draw(action);
      return this.context.globalCompositeOperation = oldcomposite;
    },
    draw: function(action) {
      var event, previous, _i, _len, _ref;
      this.context.lineJoin = "round";
      this.context.lineCap = "round";
      this.context.beginPath();
      this.context.moveTo(action.events[0].x, action.events[0].y);
      _ref = action.events;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this.context.lineTo(event.x, event.y);
        previous = event;
      }
      this.context.strokeStyle = action.color;
      this.context.lineWidth = action.size;
      return this.context.stroke();
    },
    toggle: function() {
      if (this.toggled) {
        this.whiteboard.fadeOut(100);
      }
      else {
        this.whiteboard.fadeIn(100);
      }
      this.toggled = !this.toggled;
    }
  };

  WebRTC.Whiteboard = Whiteboard;
}(WebRTC));



(function(WebRTC) {
  var Stats;

  Stats = function(client, sipStack, configuration) {
    this.ui = client.find('.callStats');

    this.statsToggled = false;
    this.sipStack = sipStack;
    this.configuration = configuration;

    this.initialize();
  };

  Stats.prototype = {
    toggle: function()
    {
      if (this.configuration.enableCallStats)
      {
        if (this.statsToggled === false)
        {
          this.ui.fadeIn(100);
        }
        else if (this.statsToggled === true)
        {
          this.ui.fadeOut(100);
        }
      }
      this.statsToggled = !this.statsToggled;
    },

    getReportById: function(reports, id)
    {
      for(var i = 0; i < reports.length; i++)
      {
        if(reports[i].id === id)
        {
          return reports[i];
        }
      }
      return null;
    },

    processStats: function() {
      var self = this;

      var peerConnection = this.sipStack.activeSession.rtcMediaHandler.peerConnection;

      peerConnection.getStats(function (stats)
      {
        var results = stats.result();
        var reports = [];
        for (var i = 0; i < results.length; ++i)
        {
          var res = results[i];
          var report = self.getReportById(reports, res.id);
          if(!report)
          {
            report = {};
            report["type"] = res.type;
            report["id"] = res.id;
          }

          var names = res.names();
          var values = [];
          for(var j = 0; j < names.length; j++)
          {
            var name = names[j];
            if(!name)
            {
              continue;
            }
            var value = res.stat(name);
            values.push(name);
            values.push(value);
          }
          var valueObj = {};
          valueObj["timestamp"] = res.timestamp;
          valueObj["values"] = values;
          report["stats"] = valueObj;
          reports.push(report);
        }
        var data = {"lid":1,"pid":self.sipStack.getSessionId(),"reports":reports};
        addStats(data);
      });
    },

    getDataSerie: function(type, label, sessionId) {
      var dataSeries = getDataSeriesByLabel(sessionId || this.sipStack.getSessionId(), type, label);
      var result;
      for(var i = 0; i < dataSeries.length; i++) {
        var dataSerie = dataSeries[i];
        if(!result || dataSerie.getAvg() > result.getAvg()) {
          result = dataSerie;
        }
      }
      return result;
    },

    getStatValues: function(type, label, sessionId) {
      var dataSerie = this.getDataSerie(type, label, sessionId);
      return dataSerie ? dataSerie.dataPoints_.map(function(e){return e.value;}) : null;
    },

    getStatAvg: function(type, label, sessionId) {
      var dataSerie = this.getDataSerie(type, label, sessionId);
      return dataSerie ? dataSerie.getAvg() : null;
    },

    setSelected: function(id, parentSelector, selected) {
      if (arguments.length === 2) {
        selected = true;
      }
      var className = id.replace(/\d+/g, '');
      var classes = jQuery.grep($(parentSelector).attr('class').split(" "), function(n, i){
        return n.indexOf(className) === -1;
      });
      if(selected) {
        classes.push(id+'-selected');
        if(id !== className) {
          classes.push(className+'-selected');
        }
      }
      var classNames = classes.join(" ");
      $(parentSelector).attr('class', classNames);

    },

    getValue: function(type, name) {
      return $('[data-type="'+type+'"][data-var="'+name+'"]').text();
    },

    getAvg: function(type, name) {
      return Math.round(($('[data-type="'+type+'"][data-var="'+name+'"]').attr("data-avg") * 100)) / 100.0;
    },

    initialize: function() {
      var self = this;
      $("a.stats-var").click(function(){
        var index = $(".stats-var").index($(this)[0]);
        self.setSelected("stats"+index, this.callStats);
      });
    }
  };

  WebRTC.Stats = Stats;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function(WebRTC) {
var Utils;

Utils= {
  dataURItoBlob: function(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  },

  format: function(seconds)
  {
    var hrs = Math.floor(seconds / 3600);
    seconds %= 3600;
    var mns = Math.floor(seconds / 60);
    seconds %= 60;
    var formatedDuration = (hrs < 10 ? "0" : "") + hrs + ":" + (mns < 10 ? "0" : "") + mns + ":" + (seconds < 10 ? "0" : "") + seconds;
    return(formatedDuration);
  },
  /* format date and time for call history */
  formatDateTime: function (dateStr){
    var date = new Date(dateStr);
    var strDate =  (date.getMonth() + 1) + "/" + date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strDate + " - " + strTime;
  },
  /* Pull the URL variables out of URL */
  getSearchVariable: function(variable)
  {
    var search = decodeURIComponent(window.location.search.substring(1));
    var vars = search.split("&");
    for (var i=0;i<vars.length;i++)
    {
      var pair = vars[i].split("=");
      if(pair[0] === variable)
      {
        return pair[1];
      }
    }
    return false;
  },

  containsKey: function(object, value) {
    return $.inArray(value, $.map(object, function(key, value) { return key; })) !== -1;
  },

  containsValue: function(object, value) {
    return $.inArray(value, $.map(object, function(key, value) { return value; })) !== -1;
  },

  addSelectOptions: function(options, selector) {
    $.each(options, function(key, value) {
      $(selector)
        .append($('<option>', { value : value })
        .text(key));
    });
  },

  // Generate a random userid
  randomUserid: function()
  {
    var chars = "0123456789abcdef";
    var string_length = 10;
    var userid = '';
    for (var i=0; i<string_length; i++)
    {
      var rnum = Math.floor(Math.random() * chars.length);
      userid += chars.substring(rnum,rnum+1);
    }
    return userid;
  },

  whiteboardCompabilityCheck: function()
  {
    var isChrome = this.isChrome();

    // Only Chrome 34+
    if (!isChrome)
    {
      return "Chrome is required for whiteboard feature, please go to:<br>" +
        "<a href='http://chrome.google.com'>http://chrome.google.com</a>";
    }
    var major = this.majorVersion();
    if (isChrome && major < 34)
    {
      return "Your version of Chrome must be upgraded to at least version 34 in order to be able to use the whiteboard<br>" +
        "Please go to: <a href='http://chrome.google.com'>http://chrome.google.com</a> or <a href='https://www.google.com/intl/en/chrome/browser/canary.html'>https://www.google.com/intl/en/chrome/browser/canary.html</a>";
    }
  },

  compatibilityCheck: function(client)
  {
    var isChrome = this.isChrome();
    var isFirefox = this.isFirefox();

    // Only Chrome 25+ and Firefox 22+ are supported
    if (!isChrome && !isFirefox)
    {
      return "Chrome or Firefox is required, please go to:<br>" +
        "<a href='http://chrome.google.com'>http://chrome.google.com</a> or <a href='http:www.mozilla.org'>http://www.mozilla.org</a>";
    }
    var major = this.majorVersion();
    if (isChrome && major < 25)
    {
      return "Your version of Chrome must be upgraded to at least version 25<br>" +
        "Please go to: <a href='http://chrome.google.com'>http://chrome.google.com</a>";
    }
    else
    {
      if (isFirefox && major < 22)
      {
        return "Your version of Firefox must be upgraded to at least version 22y<br>" +
          "Please go to: <a href='http://www.mozilla.org'>http://www.mozilla.org</a>";
      }
      client.configuration.enableStats = false;
    }
  },

  isValidUsPstn: function(pstn){
    pstn = pstn.replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '');
    return pstn.match(/^1?\d{10}$/) !== null;
  },

  majorVersion: function(){
    return detect.parse(navigator.userAgent).browser.major;
  },

  isChrome: function(){
    var ua = detect.parse(navigator.userAgent);
    return (/chrom(e|ium)/).test(ua.browser.family.toLowerCase());
  },

  isFirefox: function(){
    var ua = detect.parse(navigator.userAgent);
    return (/firefox/).test(ua.browser.family.toLowerCase());
  },

  rebindListeners: function(type, elements, listener){
    for(var i=0; i<elements.length; i++) {
      this.rebindListener(type, elements[i], listener);
    }
  },

  rebindListener: function(type, element, listener){
    element.off(type);
    element.on(type, listener);
  },

  colorNameToHex: function(color){
    if(!color) {
      return false;
    }
    var colors = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
      "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
      "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
      "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
      "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
      "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
      "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
      "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
      "honeydew":"#f0fff0","hotpink":"#ff69b4",
      "indianred ":"#cd5c5c","indigo ":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
      "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
      "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
      "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
      "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
      "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
      "navajowhite":"#ffdead","navy":"#000080",
      "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
      "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
      "red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
      "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
      "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
      "violet":"#ee82ee",
      "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
      "yellow":"#ffff00","yellowgreen":"#9acd32","transparent":"transparent"};

    if (typeof colors[color.toLowerCase()] !== 'undefined') {
      return colors[color.toLowerCase()];
    }

    return this.isHexColor(color) ? (color.indexOf("#") !== -1 ? color : "#"+color) : false;
  },

  isHexColor: function(color) {
    return (/(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i.test(color));
  },

  parseDTMFTones: function(destination) {
    if(!destination) {
      return null;
    }
    var dtmfMatch = destination.match(/,[0-9A-D#*,]+/, '');
    return dtmfMatch ? dtmfMatch[0] : null;
  }
};

WebRTC.Utils = Utils;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Sound;
//    LOG_PREFIX = WebRTC.name +' | '+ 'Configuration' +' | ';

  Sound = function(sipStack, configuration, eventBus) {
    this.sipStack = sipStack;
    this.eventBus = eventBus;
    this.soundOut = document.createElement("audio");
    this.soundOut.volume = configuration.volumeClick;
    this.soundOutDTMF = document.createElement("audio");
    this.soundOutDTMF.volume = configuration.volumeDTMF;
    this.muted = false;

    this.registerListeners();
  };

  Sound.prototype = {
    registerListeners: function() {
      var self = this;
      this.eventBus.on("resumed", function(e){
        self.updateLocalAudio();
      });
      this.eventBus.on("started", function(e){
        self.updateLocalAudio();
      });
      this.eventBus.on("userMediaUpdated", function(e){
        self.updateLocalAudio();
      });
    },
      
    setMuted: function(muted) {
      this.muted = muted;
      this.eventBus.viewChanged(this);
      this.updateLocalAudio();
    },
      
    updateLocalAudio: function() {
      this.enableLocalAudio(!this.muted);
    },  

    enableLocalAudio: function(enabled) {
      var localStreams = this.sipStack.getLocalStreams();
      if(!localStreams) {
        return;
      }
      var localMedia = localStreams[0];
      var localAudio = localMedia.getAudioTracks()[0];
      localAudio.enabled = enabled;
    },

    pause: function(){
      this.soundOut.pause();
      this.soundOutDTMF.pause();
    },

    playDtmfRingback: function(){
      this.playDtmf("dtmf-ringback", {loop: true});
    },

    playRingtone: function(){
      this.play("ringtone", {loop: true});
    },

    playDtmfTone: function(tone){
      this.playDtmf("dtmf-" + tone);
    },

    playClick: function(){
      this.play("click");
    },

    play: function(media, options){
      this.playTone(this.soundOut, media, options);
    },

    playTone: function(audioSource, media, options){
      // avoid restarting same playing audio
      if(audioSource.getAttribute("src") === media && !audioSource.paused) {
        return;
      }
      options = options || {};
      audioSource.setAttribute("src", WebRTC.C.MEDIA[media]);
      if(options.loop) {
        audioSource.setAttribute("loop", "true");
      } else {
        audioSource.removeAttribute("loop");
      }
      audioSource.play();
    },

    playDtmf: function(media, options){
      this.playTone(this.soundOutDTMF, media, options);
    }
  };

  WebRTC.Sound = Sound;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Video,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Video');

  Video = function(element, sipStack, eventBus, options) {
    this.ui = element;
    this.local = this.ui.find('.localVideo');
    this.remote = this.ui.find('.remoteVideo');
    this.eventBus = eventBus;

    this.options = options || {};
    this.sipStack = sipStack;
    this.registerListeners();
  };

  Video.prototype = {
    registerListeners: function(){
      var self = this;
      this.local.bind("playing", function(){
        self.options.onPlaying();
      });
      this.eventBus.on("userMediaUpdated", function(e){
        self.updateStreams([e.data.localStream], []);
      });
    },

    updateSessionStreams: function() {
      this.updateStreams(this.sipStack.getLocalStreams(), this.sipStack.getRemoteStreams());
    },

    updateStreams: function(localStreams, remoteStreams) {
      logger.log("updating video streams", this.eventBus);
      this.setVideoStream(this.local[0], localStreams);
      this.setVideoStream(this.remote[0], remoteStreams);
    },

    localWidth: function(){
      return this.local[0].videoWidth;
    },

    localHeight: function(){
      return this.local[0].videoHeight;
    },

    setVideoStream: function(video, streams) {
      var hasStream = streams && streams.length > 0 && typeof(streams[0]) !== 'undefined' && !streams[0].ended;
      if (video && video.mozSrcObject !== undefined) {
        if(hasStream) {
          video.mozSrcObject = streams[0];
          video.play();
        }  else {
          video.mozSrcObject = null;
        }
      } else if(video) {
        if(hasStream) {
          video.src = (window.URL && window.URL.createObjectURL(streams[0])) || streams[0];
        }
        else {
          video.src = "";
        }
      }
    }

};

  WebRTC.Video = Video;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var SIPStack,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'SIPStack'),
    C = {
      // RTCSession states
      STATE_CONNECTED:    "connected",
      STATE_DISCONNECTED: "disconnected",
      STATE_CALLING:      "calling",
      STATE_STARTED:      "started",
      STATE_HELD:         "held"
    };

  SIPStack = function(configuration, eventBus) {
    this.configuration = configuration;
    this.eventBus = eventBus;
    this.ua = null;
    this.activeSession = null;
    this.sessions = [];
  };

  SIPStack.prototype = {
    getLocalStreams: function(){
      return this.activeSession ? this.activeSession.getLocalStreams() : null;
    },

    getRemoteStreams: function(){
      return this.activeSession ? this.activeSession.getRemoteStreams() : null;
    },

    getSessionId: function(){
      return this.activeSession.id.replace(/\./g,'');
    },

    terminateSession: function(session){
      session = session || this.activeSession;
      if(!session) {
        return;
      }
      var index = this.sessions.indexOf(session);
      if(index !== -1) {
        this.sessions.splice(index, index+1);
      }
      if(session.status !== ExSIP.RTCSession.C.STATUS_TERMINATED) {
        session.terminate();
      }
      if(session === this.activeSession) {
        logger.log("clearing active session", this.configuration);
        this.activeSession = null;
      }
      this.eventBus.viewChanged(this);
    },

    terminateSessions: function(){
      var allSessions = [];
      allSessions = allSessions.concat(this.sessions);
      for(var i=0; i<allSessions.length; i++){
        this.terminateSession(allSessions[i]);
      }
    },

    holdAndAnswer: function(session){
      var self = this;
      var firstSession = this.activeSession;
      session.on('ended', function(e) {
        self.eventBus.message("Resuming with " + firstSession.remote_identity.uri.user, "normal");
        logger.log("incoming call ended - unholding first call", self.configuration);
        firstSession.unhold(function() {
          logger.log("unhold first call successful", self.configuration);
        });
      });
      this.activeSession.hold(function(){
        logger.log("hold successful - answering incoming call", self.configuration);
        self.answer(session);
      });
    },

    answer: function(session){
      session.answer(this.configuration.getExSIPOptions());
    },

    hold: function(successCallback, failureCallback){
      if(this.activeSession) {
        this.activeSession.hold(successCallback, failureCallback);
      }
    },

    unhold: function(successCallback, failureCallback){
      if(this.activeSession) {
        this.activeSession.unhold(successCallback, failureCallback);
      }
    },

    reconnectUserMedia: function(successCallback, failureCallback){
      var self = this;
      var onUserMediaUpdateSuccess = function(localMedia) {
        logger.log("reconnect user media successful", self.configuration);
        if(self.activeSession) {
          self.activeSession.changeSession({localMedia: localMedia}, function(){
            console.log("session changed successfully");
            if(successCallback) {
              successCallback(localMedia);
            }
          }, failureCallback);
        } else if (successCallback) {
          successCallback(localMedia);
        }
      };
      this.updateUserMedia(onUserMediaUpdateSuccess, failureCallback);
    },

    call: function(destination){
      var self = this;
      var session = this.ua.call(destination, this.configuration.getExSIPOptions());
      session.on('failed', function(e)
      {
        self.eventBus.failed(e.sender, e.data);
      });
      this.eventBus.calling(session);
    },

    sendDTMF: function(digit) {
      this.activeSession.sendDTMF(digit, this.configuration.getDTMFOptions());
    },    

    isStarted: function() {
      return this.getCallState() === C.STATE_STARTED;
    },

    unregister: function() {
      return this.ua && this.ua.unregister();
    },

    register: function() {
      return this.ua && this.ua.register();
    },

    isRegistered: function() {
      return this.ua && this.ua.isRegistered();
    },

    sendData: function(data) {
      if(this.activeSession) {
        this.activeSession.sendData(data);
      }
    },

    transfer: function(transferTarget, isAttended) {
      if(isAttended) {
        this.ua.attendedTransfer(transferTarget, this.activeSession);
      } else {
        this.ua.transfer(transferTarget, this.activeSession);
      }
    },

    updateRtcMediaHandlerOptions: function(){
      if(typeof(this.ua) === 'undefined') {
        return;
      }

      this.ua.setRtcMediaHandlerOptions(this.configuration.getRtcMediaHandlerOptions());
    },

    getCallState: function(){
      if(this.sessions.length > 0) {
        if(this.sessions.length === 1 && !this.sessions[0].isStarted()) {
          return C.STATE_CALLING;
        } else {
          if(this.activeSession && this.activeSession.isHeld()) {
            return C.STATE_STARTED + " " + C.STATE_HELD;
          } else {
            return C.STATE_STARTED;
          }
        }
      } else {
        if(this.ua && this.ua.isConnected()) {
          return C.STATE_CONNECTED;
        } else {
          return C.STATE_DISCONNECTED;
        }
      }
    },

    updateUserMedia: function(userMediaCallback, failureCallback){
      var self = this;
      if(this.configuration.enableConnectLocalMedia || this.activeSession) {
        // Connect to local stream
        var options = this.configuration.getExSIPOptions();
        logger.log("updating user media ...", self.configuration);
        this.ua.getUserMedia(options, function(localStream){
          self.eventBus.userMediaUpdated(localStream);
          if(self.activeSession) {
            logger.log("changing active session ...", self.configuration);
            self.activeSession.changeSession({localMedia: localStream, createOfferConstraints: options.createOfferConstraints}, function(){
              logger.log('change session succeeded', self.configuration);
            }, function(){
              logger.log('change session failed', self.configuration);
            });
          }

          if(userMediaCallback) {
            userMediaCallback(localStream);
          }
        }, function(e){
          self.eventBus.message(self.configuration.messageGetUserMedia || "Get User Media Failed", "alert");
          if(failureCallback) {
            failureCallback(e);
          }
        }, true);
      }
    },

    // Incoming reinvite function
    incomingReInvite: function(e) {
      if (this.configuration.enableAutoAcceptReInvite) {
        logger.log("auto accepting reInvite", this.configuration);
        e.data.session.acceptReInvite();
      } else {
        this.eventBus.reInvite(e.data);
      }
    },

    incomingCall: function(evt)
    {
      var session = evt.data.session;
      if (!this.activeSession && this.configuration.isAutoAnswer())
      {
        session.answer(this.configuration.getExSIPOptions());
      }
      else
      {
        this.eventBus.incomingCall(evt.data);
      }
    },

    init: function(data){
      try {
        var self = this;

        if(this.ua) {
          logger.log('stopping existing UA', this.configuration);
          this.ua.stop();
        }

        this.ua = new ExSIP.UA(this.configuration.getExSIPConfig(data));

        this.updateRtcMediaHandlerOptions();

        // Start SIP Stack
        this.ua.start();

        // sipStack callbacks
        this.ua.on('connected', function(e)
        {
          self.eventBus.viewChanged(self);
          self.eventBus.connected(e.data);
        });
        this.ua.on('disconnected', function(e)
        {
          self.eventBus.viewChanged(self);
          self.eventBus.disconnected(e.data);
        });
        this.ua.on('onReInvite', function(e) {
          logger.log("incoming onReInvite event", self.configuration);
          self.incomingReInvite(e);
        });
        this.ua.on('newRTCSession', function(e)
        {
          var session = e.data.session;
          self.sessions.push(session);
          self.eventBus.viewChanged(self);

          // call event handlers
          session.on('progress', function(e)
          {
            self.eventBus.progress(e.sender, e.data);
          });
          session.on('failed', function(e)
          {
            self.eventBus.failed(e.sender, e.data);
          });
          session.on('started', function(e) {
            self.eventBus.viewChanged(self);
            self.eventBus.started(e.sender, e.data);
          });
          session.on('resumed', function(e) {
            self.eventBus.viewChanged(self);
            self.eventBus.resumed(e.sender, e.data);
          });
          session.on('held', function(e) {
            self.eventBus.viewChanged(self);
            self.eventBus.held(e.sender, e.data);
          });
          session.on('ended', function(e)
          {
            self.eventBus.ended(e.sender, e.data);
          });
          session.on('newDTMF', function(e)
          {
            self.eventBus.newDTMF(e.sender, e.data);
          });
          session.on('dataSent', function(e)
          {
            self.eventBus.dataSent(e.sender, e.data);
          });
          session.on('dataReceived', function(e)
          {
            self.eventBus.dataReceived(e.sender, e.data);
          });
          // handle incoming call
          if (e.data.session.direction === "incoming")
          {
            self.incomingCall(e);
          } else {
            if(!self.activeSession) {
              logger.log('new active session : '+session.id, self.configuration);
              self.activeSession = session;
            }
          }
        });

        this.ua.on('registered', function(e)
        {
          self.eventBus.registered();
        });
        this.ua.on('unregistered', function(e)
        {
          self.eventBus.unregistered();
        });
        this.ua.on('registrationFailed', function(e)
        {
          self.eventBus.registrationFailed(e.data);
        });
      } catch(e) {
        console.error('could not init sip stack', e);
      }
    }
  };
  WebRTC.SIPStack = SIPStack;
  WebRTC.SIPStack.C = C;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var Icon;

  Icon = function (element, sound) {
    this.element = element;
    this.sound = sound;
    this.disabled = false;
  };

  Icon.prototype = {
    css: function (name) {
      return this.element.css(name);
    },
    attr: function (name) {
      return this.element.attr(name);
    },
    disable: function () {
      this.disabled = true;
    },
    enable: function () {
      this.disabled = false;
    },
    onClick: function(handler) {
      var self = this;
      this.element.bind("click", function(e){
        e.preventDefault();
        if(self.disabled) {
          return;
        }
        self.sound.playClick();
        handler(e);
      });
    }
  };

  WebRTC.Icon = Icon;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var Authentication;

  Authentication = function (element, eventBus, options) {
    this.popup = element;
    this.okButton = this.popup.find('.authPopupButton');
    this.userIdInput = this.popup.find('input.userid');
    this.authUserIdInput = this.popup.find('input.authUserid');
    this.passwordInput = this.popup.find('input.password');
    this.alert = this.popup.find('.alert');

    this.visible = false;
    this.eventBus = eventBus;
    this.options = options || {};

    this.registerListeners();
  };

  Authentication.prototype = {
    registerListeners: function () {
      var self = this;

      this.eventBus.on("registrationFailed", function(e){
        var statusCode = e.data.response.status_code;
        if((statusCode === 403 && self.options.settingsUserId() && !self.options.settingsPassword()) || self.options.configurationRegister) {
          self.setVisible(true);
        }
      });

      this.okButton.bind('click', function()
      {
        var userId = self.userIdInput.val();
        if (!userId)
        {
          self.alert.text("Invalid User ID").fadeIn(10).fadeOut(4000);
          return;
        }
        var authUserId = self.authUserIdInput.val();
//        if (!authUserId)
//        {
//          self.alert.text("Invalid Auth User ID").fadeIn(10).fadeOut(4000);
//          return;
//        }
        var password = self.passwordInput.val();
        self.setVisible(false);
        self.options.onAuthenticate({userId: userId, authenticationUserId: authUserId, password: password});
        self.eventBus.once("registered", function(e){
          if(authUserId && self.options.settingsUserId() !== authUserId) {
            self.options.settingsAuthenticationUserId(authUserId);
          }
          self.options.settingsUserId(userId);
          self.options.settingsPassword(password);
        });
      });

      this.popup.bind('keypress', function(e)
      {
        if (e.which === 13)
        {
          self.okButton.click();
        }
      });
    },

    show: function(){
      this.setVisible(true);
    },

    setVisible: function(visible){
      this.visible = visible;

      this.authUserIdInput.val(this.options.settingsAuthenticationUserId());
      this.userIdInput.val(this.options.settingsUserId());

      this.eventBus.viewChanged(this);
    }
  };

  WebRTC.Authentication = Authentication;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var XMPP,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'XMPP');

  XMPP = function(client, eventBus) {
    this.eventBus = eventBus;
    this.client = client;

    this.init();
  };

  XMPP.prototype = {
    init: function(){
      if(ClientConfig.enableXMPP) {
        try{
          converse.initialize({
            auto_list_rooms: false,
            auto_subscribe: false,
            bosh_service_url: 'https://bind.opkode.im', // Please use this connection manager only for testing purposes
            hide_muc_server: false,
            i18n: locales.en, // Refer to ./locale/locales.js to see which locales are supported
            prebind: false,
            show_controlbox_by_default: true,
            xhr_user_search: false
          });
          this.registerListeners();
        } catch(e) {
          logger.error("Could not init XMPP chat : "+e);
        }
      }
    },
    registerListeners: function(){
      var self = this;
      this.eventBus.on("started", function(e){
        self.statusBeforeCall = converse.getStatus();
        logger.log('status before call : '+self.statusBeforeCall, self.client.configuration);
        converse.setStatus('dnd');
      });
      this.eventBus.on("ended", function(e){
        logger.log('reset status to : '+self.statusBeforeCall, self.client.configuration);
        converse.setStatus(self.statusBeforeCall);
      });
    }
  };

  WebRTC.XMPP = XMPP;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var SMSProvider,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'SMSProvider');

  SMSProvider = function(client, eventBus) {
    this.eventBus = eventBus;
    this.client = client;

    this.init();
  };

  SMSProvider.prototype = {
    send: function(type, restSuffix, jsonData, successCallback, failureCallback, isJsonp){
//      $.flXHRproxy.registerOptions("http://"+ClientConfig.smsHost+"/", {xmlResponseText:false});
//      $.ajaxSetup({transport:'flXHRproxy'});

      var self = this;
      var url = "http://"+ClientConfig.smsHost+"/"+ClientConfig.smsUser+"/"+restSuffix;
      if(this.sessionid) {
        url += ";jsessionid="+this.sessionid;
      }
      logger.log("Request to "+url+" : "+ExSIP.Utils.toString(jsonData), this.client.configuration);
      $.ajax({
        crossDomain: true,
        contentType: type === "GET" ? "text/plain" : "text/plain",
        dataType: isJsonp ? "jsonp" : "json",
        type: type,
        url: url,
        data: type === "GET" ? jsonData : JSON.stringify(jsonData)
      })
        .done(function(msg){
          if(msg.status === "empty" || msg.status === "success" || msg.status.code === "0000001") {
            logger.log("Response successful : "+ExSIP.Utils.toString(msg), self.client.configuration);
            if(successCallback) {
              successCallback(msg);
            }
          } else {
            logger.error("Response failed : "+ExSIP.Utils.toString(msg), self.client.configuration);
            if(failureCallback) {
              failureCallback(msg.status.message);
            }
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown){
          logger.error('Response error : '+textStatus);
          if(failureCallback) {
            failureCallback(textStatus);
          }
        });
    },

    getUpdate: function(onNotification, onFailure){
      var self = this;
      var onSuccess = function( msg ) {
        logger.log( "received notification : "+ExSIP.Utils.toString(msg), self.client.configuration);
        onNotification(msg.notifications);
      };
      var data = {fid: this.name, platform: "fmc"};
      this.send("GET", "getUpdate", data, onSuccess, onFailure, false);
    },
    sendSMS: function(desttnarray, body, onFailure){
      var self = this;
      var onSuccess = function( msg ) {
        logger.log( "sent msg "+body+" to " + desttnarray, self.client.configuration);
        self.eventBus.smsSent(self, {desttnarray: desttnarray, body: body});
      };
      var data = {desttnarray: desttnarray, body: body};
      this.send("POST", "ua/msg/sms/send", data, onSuccess, onFailure);
    },
    remove: function(mids, onSuccess, onFailure){
      var self = this;
      var data = {mids: mids};
      this.send("POST", "ua/msg/sms/delete", data, function(){
        logger.log( "Deleted msgs : " + mids, self.client.configuration);
        if(onSuccess) {
          onSuccess();
        }
      }, onFailure);
    },
    readAll: function(onFailure){
      var self = this;
      var onSuccess = function( msg ) {
        logger.log( "Read all mgs : " + ExSIP.Utils.toString(msg.messages), self.client.configuration);
        self.eventBus.smsReadAll(self, {messages: msg.messages});
      };
      var data = null;
      this.send("GET", "ua/msg/sms/all", data, onSuccess, onFailure);
    },
    login: function(name, password, onFailure){
      var self = this;
      var onSuccess = function( msg ) {
        self.sessionid = msg.sessionid;
        self.name = name;
        logger.log( "Logged in "+name+" : " + msg.sessionid, self.client.configuration);
        self.eventBus.smsLoggedIn(self);
      };
      var data = { spcode: ClientConfig.smsSpcode, password: password, name: name, platform: "fmc" };
      this.send("POST", "ua/login", data, onSuccess, onFailure);
    },

    init: function(){
      this.registerListeners();
    },
    registerListeners: function(){
//      var self = this;
//      this.eventBus.on("started", function(e){
//        self.statusBeforeCall = converse.getStatus();
//        logger.log('status before call : '+self.statusBeforeCall, self.client.configuration);
//        converse.setStatus('dnd');
//      });
//      this.eventBus.on("ended", function(e){
//        logger.log('reset status to : '+self.statusBeforeCall, self.client.configuration);
//        converse.setStatus(self.statusBeforeCall);
//      });
    }
  };

  WebRTC.SMSProvider = SMSProvider;
}(WebRTC));



/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var SMS,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'SMS');

  SMS = function (client, element, eventBus, sound) {
    this.client = client;
    this.eventBus = eventBus;
    this.sound = sound;

    this.view = element;
    this.status = element.find(".smsStatus");
    this.statusContent = this.status.find(".content");
    this.inbox = element.find(".smsInbox");
    this.inboxContent = this.inbox.find(".content");
    this.loginForm = element.find(".smsLoginForm");
    this.loginLink = element.find(".smsLogin");
    this.nameInput = element.find(".smsName");
    this.passwordInput = element.find(".smsPassword");
    this.sendForm = element.find(".smsSendForm");
    this.sendTo = element.find(".smsSendTo");
    this.sendBody = element.find(".smsSendBody");
    this.sendButton = element.find(".smsSendButton");
    this.inboxItems = [];

    this.smsProvider = new WebRTC.SMSProvider(this.client, this.eventBus);
    this.toggled = false;

    this.registerListeners();
  };

  SMS.InboxItem = function (sms, message) {
    this.sms = sms;
    this.message = message;
    this.cloned = sms.view.find(".sms-inbox-item-sample").clone(false);
    this.cloned.removeClass('sms-inbox-item-sample');
    this.cloned.attr('id', message.mid);
    this.from = this.cloned.find('.from');
    this.status = this.cloned.find('.status');
    this.time = this.cloned.find('.time');
    this.bodyText = this.cloned.find('.body .text');
    this.bodyImageLink = this.cloned.find('.body .image a');
    this.bodyImageText = this.cloned.find('.body .image span');
    this.bodyImageThumbnail = this.cloned.find('.body .image img');
    this.bodyVideo = this.cloned.find('.body .video video');
    this.bodyAudio = this.cloned.find('.body .audio audio');
    this.removeLink = this.cloned.find('.icon-trash');
    this.dateFormat = new WebRTC.DateFormat('%m/%d/%y %H:%M:%S');

    this.registerListeners();

    this.updateContent(message);

    return this;
  };

  SMS.InboxItem.prototype = {
    registerListeners: function(){
      var self = this;
      this.removeLink.bind('click', function(){
        self.sms.remove(self.message, self);
      });
    },
    enableActions: function(enable){
      this.removeLink.attr('disabled', !enable);
    },
    updateContent: function(message){
      var messageType = this.getMessageType(message);
      this.cloned.addClass(messageType);

      this.from.text(message.tn);
      this.status.text(SMS.getStatusAsString(message.status));
      this.time.text(this.dateFormat.format(new Date(message.time)));

      var body = message.body.trim();
      if(messageType === 'image') {
        this.bodyImageLink.attr('href', message.mmscontentlocation);
        this.bodyImageText.text(body);
        if(message.mmscontentthumbnail) {
          this.bodyImageThumbnail.attr('src', 'data:'+message.mmscontentsubtype+';base64,'+message.mmscontentthumbnail);
        }
      }
      else if(messageType === 'video') {
        this.bodyVideo.attr('src', message.mmscontentlocation);
        this.bodyVideo.text(body);
      }
      else if(messageType === 'audio') {
        this.bodyAudio.attr('src', message.mmscontentlocation);
        this.bodyAudio.text(body);
      }
      else {
        this.bodyText.html(body);
      }
    },
    getMessageType: function(message){
      if(message.mmscontentsubtype && message.mmscontentsubtype.indexOf('image/') !== -1) {
        return 'image';
      }
      else if(message.mmscontentsubtype && message.mmscontentsubtype.indexOf('video/') !== -1) {
        return 'video';
      }
      else if(message.mmscontentsubtype && message.mmscontentsubtype.indexOf('audio/') !== -1) {
        return 'audio';
      }
      else {
        return 'text';
      }
    },
    remove: function() {
      this.cloned.remove();
    },
    appendTo: function(element) {
      this.cloned.appendTo(element);
    }
  };

  SMS.getStatusAsString = function(status){
    if(status === 'N') {
      return "New";
    }
    else if(status === 'U') {
      return "Unread";
    }
    else if(status === 'R') {
      return "Read";
    }
    else if(status === 'L') {
      return "Locked";
    }
    else if(status === 'D') {
      return "Deleted";
    }
    else {
      throw new Error('Unsupported status : '+status);
    }
  };

  SMS.prototype = {
    registerListeners:function () {
      var self = this;

      this.eventBus.on('smsLoggedIn', function(e){
        self.onLoggedIn();
      });
      this.eventBus.on('smsSent', function(e){
        self.status.hide();
        self.sendBody.val('');
        self.sendTo.val('');
        self.sendButton.attr('disabled', false);
      });
      this.eventBus.on('smsReadAll', function(e){
        self.status.hide();
        var messages = e.data.messages;

        messages = messages.sort(function(a,b) { return b.time - a.time; });

        var incomingMessages = $.grep(messages, function( n, i ) {
          return ( n.dir === 'I' );
        });
//        var outgoingMessages = $.grep(messages, function( n, i ) {
//          return ( n.dir === 'O' );
//        });
        self.updateInbox(incomingMessages);
      });

      this.loginLink.bind('click', function (e) {
        e.preventDefault();
        self.login(self.nameInput.val(), self.passwordInput.val());
      });
      this.passwordInput.bind('keypress', function (e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          self.login(self.nameInput.val(), self.passwordInput.val());
        }
      });
      this.sendButton.bind('click', function (e) {
        e.preventDefault();
        self.sendSMS();
      });
      this.sendBody.bind('keypress', function (e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          self.sendSMS();
        }
      });
    },

    remove: function (message, inboxItem) {
      var self = this;
      this.sound.playClick();
      if(!window.confirm("Do you really want to delete SMS from "+message.tn+"?")) {
        return;
      }
      this.info("Deleting SMS...");
      if(inboxItem) {
        inboxItem.enableActions(false);
      }
      this.smsProvider.remove([message.mid], function(){
        self.status.hide();
        inboxItem.remove();
      }, function(msg){
        self.error("Deleting SMS failed : "+msg);
        inboxItem.enableActions(true);
      });
    },

    login: function (name, password) {
      var self = this;
      this.sound.playClick();
      this.info("Logging in...");
      this.smsProvider.login(name, password, function(msg){
        self.error("Logging failed : "+msg);
      });
    },

    onNotification: function (notifications) {
      var needsRead = false, self = this;
      if(!notifications) {
        return;
      }

      for(var i=0; i < notifications.length; i++) {
        if(notifications[i].action === 'new-rec' || notifications[i].action === 'update' || notifications[i].action === 'delete') {
          needsRead = true;
          break;
        }
      }
      if(needsRead) {
        this.smsProvider.readAll(function(msg){
          self.error("Fetching SMS failed : "+msg);
        });
      }
    },

    enableUpdate: function (enable) {
      this.enableUpdate = enable;
      this.triggerUpdate();
    },

    triggerUpdate: function () {
      var self = this;
      if(this.enableUpdate && !this.pendingUpdate) {
        logger.log('triggering getUpdate', this.client.configuration);
        this.pendingUpdate = true;
        this.smsProvider.getUpdate(function(notifications){
          self.pendingUpdate = false;
          self.onNotification(notifications);
          self.triggerUpdate();
        }, function(){
          self.pendingUpdate = false;
          self.error("Technical problems connecting to server - auto refresh disabled");
        });
      }
    },

    sendSMS: function () {
      var self = this;
      this.sound.playClick();
      var msg = this.validateSendForm();
      if(msg !== "") {
        this.error(msg);
        return;
      }
      this.info("Sending SMS...");
      this.sendButton.attr("disabled", true);
      this.smsProvider.sendSMS([this.sendTo.val()], this.sendBody.val(), function(msg){
        self.sendButton.attr("disabled", false);
        self.error("Sending SMS failed : "+msg);
      });

    },

    validateSendForm: function () {
      var to = this.sendTo.val();
      var msgs = [];
      if(to === '') {
        msgs.push('Please enter a phone number to send to');
      }
      else if(!WebRTC.Utils.isValidUsPstn(to)) {
        msgs.push(to+' not a valid US phone number');
      }

      var body = this.sendBody.val();
      if(body === '') {
        msgs.push('Please enter a text to send');
      }

      return msgs.join('\n');
    },

    onLoggedIn: function () {
      var self = this;
      this.loginForm.hide();
      this.inbox.show();
      this.sendForm.show();
      this.enableUpdate(true);
      this.smsProvider.readAll(function(msg){
        self.error("Fetching SMS failed : "+msg);
      });
      this.info("Fetching SMS...");
    },

    updateInbox: function (messages) {
      this.inboxContent.html('');
      this.inboxItems = [];
      for(var i = 0; i < messages.length; i++) {
        var inboxItem = new SMS.InboxItem(this, messages[i]);
        inboxItem.appendTo(this.inboxContent);
        this.inboxItems.push(inboxItem);
      }
    },

    setStatus: function (msg, type) {
      this.status.show();
      this.status.attr("class", type);
      this.statusContent.text(msg);
    },

    error: function (msg) {
      this.setStatus(msg, "error");
    },

    info: function (msg) {
      this.setStatus(msg, "info");
    },

    toggle: function () {
      if (ClientConfig.enableSMS) {
        if (this.toggled) {
          this.view.fadeOut(100);
        }
        else {
          this.view.fadeIn(100);
        }
        this.toggled = !this.toggled;
      }
    }
  };

  WebRTC.SMS = SMS;
}(WebRTC));



/*jshint unused: false */
/***************************************************
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton
 *
 * Copyright 2013 Broadsoft
 * http://www.broadsoft.com
 ***************************************************/
(function(WebRTC) {
  var Client,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'Client'),
    ejs = require('ejs');

  Client = function(config, element) {
    this.config = config;    
    if(element) {
      this.appendTo($(element));
    }
  };

  Client.prototype = {
    setup: function(){
      var self = this;
      this.main = this.client.find(".main");
      this.muteAudioIcon = this.client.find('.muteAudioIcon');
      this.unmuteAudioIcon = this.client.find('.unmuteAudioIcon');
      this.hangup = this.client.find(".hangup");
      this.callControl = this.client.find(".callControl");
      this.destination = this.callControl.find("input.destination");
      this.callButton = this.client.find('.call');
      this.reInvitePopup = this.client.find('.reInvitePopup');
      this.acceptReInviteCall = this.client.find(".acceptReInviteCall");
      this.rejectReInviteCall = this.client.find(".rejectReInviteCall");
      this.messages = this.client.find(".messages");
      this.callPopup = this.client.find(".callPopup");
      this.incomingCallName = this.callPopup.find(".incomingCallName");
      this.incomingCallUser = this.callPopup.find(".incomingCallUser");
      this.acceptIncomingCall = this.callPopup.find(".acceptIncomingCall");
      this.rejectIncomingCall = this.callPopup.find(".rejectIncomingCall");
      this.holdAndAnswerButton = this.callPopup.find(".holdAndAnswerButton");
      this.dropAndAnswerButton = this.callPopup.find(".dropAndAnswerButton");
      this.errorPopup = this.client.find( ".errorPopup" );
      this.fullScreenExpandIcon = this.client.find(".fullScreenExpand");
      this.fullScreenContractIcon = this.client.find(".fullScreenContract");
      this.dialpadShowIcon = this.client.find(".dialpadIconShow");
      this.dialpadHideIcon = this.client.find(".dialpadIconHide");
      this.dialpad = this.client.find(".dialpad");
      this.dialpadButtons = this.client.find(".dialpad button");
      this.selfViewEnableIcon = this.client.find(".selfViewEnable");
      this.selfViewDisableIcon = this.client.find(".selfViewDisable");
      this.connected = this.client.find(".connected-icon");
      this.registered = this.client.find(".registered-icon");
      this.historyClose = this.client.find(".historyClose");
      this.callHistory = this.client.find(".callHistory");
      this.callStats = this.client.find(".callStats");
      this.shareScreen = this.client.find( ".shareScreen" );
      this.stopShareScreen = this.client.find( ".stopShareScreen" );
      this.screenSharingUnsupported = this.client.find( ".screen_sharing_unsupported" );


      if(!this.config && typeof(ClientConfig) === 'undefined') {
        $('#unsupported').text("Could not read ClientConfig - make sure it is included and properly formatted");
        $('#unsupported').show();
        return;
      }

      this.config = this.config || ClientConfig;
      this.eventBus = new WebRTC.EventBus({
        isDebug: function(){
          return self.config.debug === true;
        }
      });
      this.configuration = new WebRTC.Configuration(this.eventBus, this.config);
      this.sipStack = new WebRTC.SIPStack(this.configuration, this.eventBus);
      this.sound = new WebRTC.Sound(this.sipStack, this.configuration, this.eventBus);
      this.video = new WebRTC.Video(this.client.find('.video'), this.sipStack, this.eventBus, {
        onPlaying: function(){
          self.validateUserMediaResolution();
        }
      });
      this.xmpp = new WebRTC.XMPP(this, this.eventBus);
      this.sms = new WebRTC.SMS(this, this.client.find(".sms"), this.eventBus, this.sound);
      this.settings = new WebRTC.Settings(this, this.configuration, this.sound, this.eventBus, this.sipStack);
      this.stats = new WebRTC.Stats(this, this.sipStack, this.configuration);
      this.timer = new WebRTC.Timer(this, this.stats, this.configuration);
      this.history = new WebRTC.History(this, this.sound, this.stats, this.sipStack, this.configuration);
      this.transfer = new WebRTC.Transfer(this, this.sound, this.sipStack, this.configuration);
      this.whiteboard = new WebRTC.Whiteboard(this, this.client.find(".whiteboard"), this.eventBus, this.sipStack);
      this.fileShare = new WebRTC.FileShare(this, this.client.find(".file_share"), this.eventBus, this.sipStack);
      this.authentication = new WebRTC.Authentication(this.client.find(".authPopup"), this.eventBus, {
        onAuthenticate: function(data) {
          self.sipStack.init(data);
        },
        configurationRegister: self.configuration.register,
        settingsUserId: self.settings.userId,
        settingsAuthenticationUserId: self.settings.authenticationUserId,
        settingsPassword: self.settings.password
      });
      this.hold = new WebRTC.Icon(this.client.find( ".hold" ), this.sound);
      this.resume = new WebRTC.Icon(this.client.find( ".resume" ), this.sound);
      this.fullScreen = false;
      this.selfViewEnabled = true;
      this.dialpadShown = false;
      this.isScreenSharing = false;

      this.configuration.setSettings(this.settings);

      this.registerListeners();

      this.init();
    },
    appendTo: function(parent){
      this.updateCss();

      this.wrapper = $('<div/>', {class: 'webrtc-wrapper'});
      parent.append(this.wrapper);

      var renderData = {};
      var html = ejs.render(WebRTC.C.TEMPLATES.webrtc, renderData);
      this.wrapper.html(html);

      this.client = this.wrapper.find('.client');
      this.setup();
    },
    updateCss: function(styleData) {
      styleData = styleData || {};
      var cssData = $.extend({}, WebRTC.C.STYLES, WebRTC.C.FONTS, styleData);
      var cssStr = ejs.render(WebRTC.C.CSS.stylesheet, cssData);
      if (!this.hasCss) {
        this.hasCss = true;
        $("<style type='text/css' id='webrtc_css'>"+cssStr+"</style>").appendTo("head");
      } else {
        $("#webrtc_css").text(cssStr);
      }
    },
    init: function() {
      var self = this;
      var unsupported = WebRTC.Utils.compatibilityCheck(this);
      if(unsupported)
      {
        $('#unsupported').html(unsupported).show();
      }

      var whiteboardUnsupported = WebRTC.Utils.whiteboardCompabilityCheck();
      if(whiteboardUnsupported)
      {
        $('#whiteboard_unsupported').html(whiteboardUnsupported).show();
      }

      // Allow some windows to be draggable, required jQuery.UI
      if (this.configuration.enableWindowDrag)
      {
        $(function()
        {
          self.video.local.draggable({
            snap: ".remoteVideo,.videoBar",
            containment: "parent",
            snapTolerance: 200,
            stop: function( event, ui ) {self.settings.updateViewPositions();}
          });
          // self.callStats.draggable({
          //   snap: ".remoteVideo,.videoBar",
          //   containment: "parent",
          //   stop: function( event, ui ) {self.settings.updateViewPositions();}
          // });
          // self.callHistory.draggable({
          //   snap: ".remoteVideo,.videoBar",
          //   containment: "parent",
          //   stop: function( event, ui ) {self.settings.updateViewPositions();}
          // });
        });
      }

      this.updateClientClass();

      $.cookie.raw = true;

      window.onbeforeunload = function(e) {
        self.endCall({rtcSession: 'all'});
        return null;
      };

      this.onLoad();
    },

    showErrorPopup: function(error) {
      window.alert(error);
    },

    // Setup the GUI
    guiStart: function() {
      // Set size for Chrome and Firefox
      this.main.css("zoom", this.configuration.size);
      this.main.css("-moz-transform", "scale(" + this.configuration.size +")");
      if (($.cookie("settingWindowPosition")))
      {
        var windowPositions = $.cookie("settingWindowPosition").split('|');
        for (var i = 0; i < windowPositions.length; ++i)
        {
          var elementPosition = windowPositions[i].split('-');
          this.client.find(elementPosition[0]).css("top", elementPosition[1]);
          this.client.find(elementPosition[0]).css("left", elementPosition[2]);
        }
      }
      // Fade in UI elements
      this.client.find(".remoteVideo, .videoBar").fadeIn(1000);
      if (this.configuration.enableCallControl)
      {
        this.callControl.fadeIn(1000);
      }
      else {
        this.callControl.fadeOut(1000);
      }
    },

    find: function(selector) {
      return this.client.find(selector);
    },

    // Display status messages
    message: function(text, level)
    {
      if(!this.configuration.enableMessages)
      {
        return;
      }
      var messageEl = this.messages.find("."+level);
      messageEl.stop(true, true).fadeOut();
      messageEl.text(text).fadeIn(10).fadeOut(10000);
    },

    // Make sure destination allowed and in proper format
    validateDestination: function(destination)
    {
      if (destination.indexOf("sip:") === -1)
      {
        destination = ("sip:" + destination);
      }
      if (!this.configuration.allowOutside && !new RegExp("[.||@]"+this.configuration.domainTo).test(destination) )
      {
        this.message(this.configuration.messageOutsideDomain, "alert");
        return(false);
      }
      if ((destination.indexOf("@") === -1))
      {
        destination = (destination + "@" + this.configuration.domainTo);
      }
      var domain = destination.substring(destination.indexOf("@"));
      if(domain.indexOf(".") === -1) {
        destination = destination + "." + this.configuration.domainTo;
      }

      // WEBRTC-35 : filter out dtmf tones from destination
      return destination.replace(/,[0-9A-D#*,]+/, '');
    },

    // URL call
    callUri: function(destinationToValidate)
    {
      if(this.sipStack.getCallState() !== WebRTC.SIPStack.C.STATE_CONNECTED) {
        logger.log('Already in call with state : '+this.sipStack.getCallState());
        return;
      }
      if (destinationToValidate === "")
      {
        this.message(this.configuration.messageEmptyDestination, "alert");
        return;
      }

      var destination = this.validateDestination(destinationToValidate);
      if (destination === false)
      {
        logger.log("destination is not valid : "+destinationToValidate, this.configuration);
        return;
      }

      logger.log("calling destination : "+destination, this.configuration);

      this.message(this.configuration.messageCall, "success");

      // Start the Call
      this.sipStack.call(destination);
    },

    setClientConfig: function(clientConfig) {
      var connectionChanged = this.configuration.websocketsServers[0].ws_uri !== clientConfig.websocketsServers[0].ws_uri;
      jQuery.extend(this.configuration, clientConfig);
      this.guiStart();
      this.updateClientClass();
      if(connectionChanged) {
        this.sipStack.init();
      }
    },

    endCall: function(options) {
      options = options || {};
      var rtcSession = options['rtcSession'];
      if(rtcSession === 'all') {
        this.sipStack.terminateSessions();
      } else if(rtcSession) {
        this.sipStack.terminateSession(rtcSession);
      } else {
        this.sipStack.terminateSession();
      }
      this.setEvent(null);
      this.sound.pause();
      this.video.updateSessionStreams();

      this.guiStart();

      this.timer.stop();
      this.checkEndCallURL();
    },

    // Initial startup
    checkEndCallURL: function() {
      if (this.configuration.endCallURL)
      {
        window.location = this.configuration.endCallURL;
      }
    },

    onLoad: function() {
      var self = this;
      logger.log("onLoad", this.configuration);

      this.sipStack.init();

      if(!this.configuration.enableConnectLocalMedia && this.configuration.destination) {
        this.eventBus.once("connected", function(e){
          self.callUri(self.configuration.destination);
        });
      }

      // Start the GUI
      this.guiStart();
    },

    // What we do when we get a digit during a call
    pressDTMF: function(digit)
    {
      if (digit.length !== 1)
      {
        return;
      }
      if (this.sipStack.isStarted())
      {
        this.destination.val(this.destination.val() + digit);
        this.sound.playClick();
        this.sipStack.sendDTMF(digit);
      }
    },

    resumeCall: function() {
      var self = this;
      this.resume.disable();
      var enable = function(){
        self.resume.enable();
      };
      this.sipStack.unhold(enable, enable);
    },

    hideSelfView: function() {
      this.selfViewEnabled = false;
      this.updateClientClass();
    },

    stopFullScreen: function() {
      if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      this.fullScreen = false;
      this.updateClientClass();
    },

    showSelfView: function() {
      this.selfViewEnabled = true;
      this.updateClientClass();
    },

    showFullScreen: function() {
      if(this.client[0].webkitRequestFullScreen) {
        this.client[0].webkitRequestFullScreen();
      }
      this.fullScreen = true;
      this.updateClientClass();
    },

    muteAudio: function() {
      this.sound.setMuted(true);
    },

    unmuteAudio: function() {
      this.sound.setMuted(false);
    },

    showDialpad: function() {
      this.dialpadShown = true;
      this.updateClientClass();
    },

    hideDialpad: function() {
      this.dialpadShown = false;
      this.updateClientClass();
    },

    toggleDialpad: function(flag) {
      this.dialpadShown = flag;
      this.updateClientClass();
    },

    updateFullScreen: function() {
      this.fullScreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
      this.updateClientClass();
    },

    holdCall: function() {
      var self = this;
      this.hold.disable();
      var enable = function(){
        self.hold.enable();
      };
      this.sipStack.hold(enable, enable);
    },

    getRemoteUser: function(rtcSession) {
      return rtcSession.remote_identity.uri.user || rtcSession.remote_identity.uri.host;
    },

    enableScreenSharing: function(enabled) {
      var self = this;
      this.isScreenSharing = enabled;
      this.updateClientClass();
      if(enabled) {
        var onShareScreenSuccess = function(localMedia){
          localMedia.onended = function(){
            self.enableScreenSharing(false);
          };
        };
        var onShareScreenFailure = function(e){
          // no way to distinguish between flag not enabled or simply rejected enabling screen sharing
          if(e) {
            self.screenSharingUnsupported.show();
          }
          self.enableScreenSharing(false);
        };
        self.sipStack.reconnectUserMedia(onShareScreenSuccess, onShareScreenFailure);
      } else {
        self.sipStack.reconnectUserMedia();
      }
    },

    registerListeners: function() {
      var self = this;

      this.eventBus.on("viewChanged", function(e){
        self.updateClientClass();
      });
      this.eventBus.on("ended", function(e){
        self.message(self.configuration.messageEnded.replace('{0}', self.getRemoteUser(e.sender)), "normal");
        self.history.persistCall(e.sender);
        self.endCall({rtcSession: e.sender});
      });
      this.eventBus.on("resumed", function(e){
        self.onSessionStarted(e.sender);
        self.message(self.configuration.messageResume.replace('{0}', self.getRemoteUser(e.sender)), "success");
      });
      this.eventBus.on("started", function(e){
        self.onSessionStarted(e.sender);
        var dtmfTones = WebRTC.Utils.parseDTMFTones(self.configuration.destination);
        if(dtmfTones && e.data && !e.data.isReconnect) {
          logger.log("DTMF tones found in destination - sending DTMF tones : "+dtmfTones);
          self.sipStack.sendDTMF(dtmfTones);
        }
        //remove configuration.destination to avoid multiple calls
        delete self.configuration.destination;
        if(e.data && !e.data.isReconnect) {
          self.message(self.configuration.messageStarted.replace('{0}', self.getRemoteUser(e.sender)), "success");
          self.timer.start();
        }
      });
      this.eventBus.on("held", function(e){
        self.message(self.configuration.messageHold.replace('{0}', self.getRemoteUser(e.sender)), "success");
      });
      this.eventBus.on("disconnected", function(e){
        if (self.configuration.enableConnectionIcon)
        {
          self.connected.removeClass("success");
          self.connected.addClass("alert").fadeIn(100);
        }
        var msg = self.configuration.messageConnectionFailed;
        if(e.data && e.data.reason) {
          msg = e.data.reason;
        }
        if(e.data && e.data.retryAfter) {
          msg += " - Retrying in "+e.data.retryAfter+" seconds";
        }
        self.message(msg, "alert");
        self.endCall();
      });
      this.eventBus.on("failed", function(e){
        var error = e.data.cause;
        self.message(error, "alert");
        if (error === "User Denied Media Access")
        {
          self.showErrorPopup("WebRTC was not able to access your microphone/camera!");
        }
        else if (error === ExSIP.C.causes.CANCELED)
        {
          self.setEvent("incomingCall-done");
        }
        self.sound.pause();
        self.endCall({rtcSession: e.sender});
      });
      this.eventBus.on("progress", function(e){
        self.message(self.configuration.messageProgress, "normal");
        self.sound.playDtmfRingback();
      });
      this.eventBus.on("message", function(e){
        self.message(e.data.text, e.data.level);
      });
      this.eventBus.on("registrationFailed", function(e){
        self.updateClientClass();
        if (self.configuration.enableRegistrationIcon)
        {
          //$("#registered").removeClass("success");
          self.registered.addClass("alert").fadeIn(100);
        }
        var statusCode = e.data.response.status_code;
        var msg = statusCode;
        if(statusCode === 403) {
          msg = "403 Authentication Failure";
        }
        self.message(self.configuration.messageRegistrationFailed.replace('{0}', msg), "alert");
      });
      this.eventBus.on("registered", function(e){
        self.updateClientClass();
        if (self.configuration.enableRegistrationIcon)
        {
          self.registered.removeClass("alert");
          self.registered.addClass("success").fadeIn(10).fadeOut(3000);
        }
        self.message(self.configuration.messageRegistered, "success");
      });
      this.eventBus.on("unregistered", function(e){
        self.updateClientClass();
        self.message(self.configuration.messageUnregistered || 'Unregistered', "success");
      });
      this.eventBus.on("connected", function(e){
        if (self.configuration.enableConnectionIcon)
        {
          self.connected.removeClass("alert");
          self.connected.addClass("success").fadeIn(10).fadeOut(3000);
        }
        self.message(self.configuration.messageConnected, "success");

        self.sipStack.updateUserMedia(function(){
          if (self.configuration.destination)
          {
            self.callUri(self.configuration.destination);
          }
        });
      });
      this.eventBus.on("incomingCall", function(evt){
        var incomingCallName = evt.data.request.from.display_name;
        var incomingCallUser = evt.data.request.from.uri.user;
        self.message("Incoming Call", "success");
        self.setEvent("incomingCall");
        self.incomingCallName.text(incomingCallName);
        self.incomingCallUser.text(incomingCallUser);
        WebRTC.Utils.rebindListeners("click",
          [self.rejectIncomingCall, self.acceptIncomingCall, self.holdAndAnswerButton, self.dropAndAnswerButton],
          function(e) {
            e.preventDefault();
            self.incomingCallHandler($(this), evt.data.session);
          }
        );
        self.sound.playRingtone();
      });
      this.eventBus.on("reInvite", function(e){
        self.setEvent("reInvite");
        var incomingCallName = e.data.request.from.display_name;
        var incomingCallUser = e.data.request.from.uri.user;
        var title = e.data.audioAdd ? "Adding Audio" : "Adding Video";
        self.message(title, "success");
        self.reInvitePopup.find(".incomingCallName").text(incomingCallName);
        self.reInvitePopup.find(".incomingCallUser").text(incomingCallUser);
        self.reInvitePopup.find(".title").text(title);
        self.acceptReInviteCall.off("click");
        self.acceptReInviteCall.on("click", function(){
          self.setEvent("reInvite-done");
          e.data.session.acceptReInvite();
        });
        self.rejectReInviteCall.off("click");
        self.rejectReInviteCall.on("click", function(){
          self.setEvent("reInvite-done");
          e.data.session.rejectReInvite();
        });
      });
      this.eventBus.on('message', function(e)
      {
        self.message();
      });
      this.eventBus.on('newDTMF', function(e)
      {
        var digit = e.data.tone;
        logger.log('DTMF sent : '+ digit, self.configuration);
        if(!digit) {
          return;
        }
        var file = null;
        if (digit === "*")
        {
          file = "star";
        }
        else if (digit === "#")
        {
          file = "pound";
        }
        else
        {
          file = digit;
        }
        self.sound.playDtmfTone(file);
      });

      // Buttons
      this.shareScreen.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.enableScreenSharing(true);
      });
      this.stopShareScreen.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.enableScreenSharing(false);
      });

      this.callButton.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.callUri(self.destination.val());
      });

      this.hangup.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.endCall();
        if (self.fullScreen)
        {
          self.fullScreenContractIcon.click();
        }
      });

      this.fullScreenExpandIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.showFullScreen();
      });

      this.fullScreenContractIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.stopFullScreen();
      });
      $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e)
      {
        self.updateFullScreen();
      });

      this.selfViewDisableIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.hideSelfView();
      });

      this.selfViewEnableIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.showSelfView();
      });
      $(".history-button").bind('click', function(e)
      {
        e.preventDefault();
        self.history.toggle();
      });
      $(".button-row button").bind('click', function(e)
      {
        e.preventDefault();
        var destinationStr = $("#destination").val();
        $("#destination").val(destinationStr + this.firstChild.nodeValue);
      });

      this.hold.onClick(function(e)
      {
        self.holdCall();
      });

      this.resume.onClick(function(e)
      {
        self.resumeCall();
      });

      this.muteAudioIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.muteAudio();
      });

      this.unmuteAudioIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.unmuteAudio();
      });

      this.dialpadShowIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.showDialpad();
        self.destination.focus();
        self.settings.toggleSettings(false);
      });

      this.dialpadHideIcon.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.hideDialpad();
        self.history.historyToggled = true;
        self.history.toggle();
      });

      this.historyClose.bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.history.toggle();
      });

      // Dialpad digits
      this.dialpadButtons.bind('click', function(e)
      {
        self.processDigitInput(e.target.textContent);
      });

      this.destination.keypress(function (e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          self.callUri(self.destination.val());
        }
      });
      $(".video").bind("click",function(e){
        var $target = $(e.target);
        var dialpad = $target.closest(".dialpad").length;
        var history = $target.closest(".callHistory").length;
        var details = $target.closest(".callHistoryDetails").length;
        if(dialpad === 0 || history === 0 || details === 0)
        {
            //$(".callHistory").fadeOut(100);
            self.history.historyToggled = true;
            self.history.toggle();
        }
      });

      // Digits from keyboard
      $(document).unbind('keypress').bind('keypress', function(e)
      {
      });

      // Prevent the backspace key from navigating back if dialpad is shown
      $(document).unbind('keydown').bind('keydown', function (event) {
        var isModifier = event.altKey;
        if(isModifier) {
          if(self.transfer.targetInput.is(event.target)) {
            return;
          }

          console.dir(event);
          if (event.which === 83)
          {
            self.stats.toggle();
          }
          else if (event.which === 84)
          {
            self.sms.toggle();
          }
          // toggle whiteboard
          else if (event.which === 87)
          {
            self.whiteboard.toggle();
          }
          else if (event.which === 72)
          {
            self.history.toggle();
          }
          return;
        }

        if(self.dialpadShown) {
          var doPrevent = false;
          if (event.keyCode === 8) {
            var d = event.srcElement || event.target;
            if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' ||
              d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' ||
              d.type.toUpperCase() === 'EMAIL' )) || d.tagName.toUpperCase() === 'TEXTAREA') {
              doPrevent = d.readOnly || d.disabled;
            }
            else {
              doPrevent = true;
              self.destination.trigger('keydown', event);
              self.destination.putCursorAtEnd();
            }
          }

          if (doPrevent) {
            event.preventDefault();
            return;
          }
        }

        var digit = String.fromCharCode(event.which);
        self.processDigitInput(digit, event);

      });
    },

    processDigitInput: function(digit, event){
      if(!this.sipStack.isStarted() && this.dialpadShown) {
        // ignore if event happened on destination input itself
        if(event && this.destination.is(event.target)) {
          return;
        }
        this.destination.val(this.destination.val() + digit);
        this.destination.putCursorAtEnd();
      }
      else if (digit.match(/^[0-9A-D#*,]+$/i))
      {
        this.pressDTMF(digit);
      }
    },

    onSessionStarted: function(sender){
      logger.log("setting active session to "+ sender.id, this.configuration);
      this.sipStack.activeSession = sender;
      this.video.updateSessionStreams(sender);
      this.client.find('.stats-container').attr('id', this.sipStack.getSessionId()+'-1');
      this.sound.pause();
    },

    incomingCallHandler: function(source, session){
      this.setEvent("incomingCall-done");
      this.sound.pause();
      if (source.is(this.acceptIncomingCall)) {
        this.sipStack.answer(session);
      } else if (source.is(this.dropAndAnswerButton)) {
        this.sipStack.terminateSession();
        this.sipStack.answer(session);
      } else if (source.is(this.holdAndAnswerButton)) {
        this.sipStack.holdAndAnswer(session);
      } else if (source.is(this.rejectIncomingCall)) {
        this.sipStack.terminateSession(session);
      }
    },

    setEvent: function(event){
      this.event = event;
      this.updateClientClass();
    },

    validateUserMediaResolution: function(){
      var encodingWidth = this.settings.getResolutionEncodingWidth();
      var encodingHeight = this.settings.getResolutionEncodingHeight();
      var videoWidth = this.video.localWidth();
      var videoHeight = this.video.localHeight();
      logger.log("validating video resolution "+videoWidth+","+videoHeight+" to match selected encoding "+encodingWidth+","+encodingHeight, this.configuration);
      if(!videoWidth && !videoHeight) {
        return;
      }

      if(encodingWidth !== videoWidth || encodingHeight !== videoHeight) {
        var msg = "Video resolution "+videoWidth+","+videoHeight+" does not match selected encoding "+encodingWidth+","+encodingHeight;
//        this.message(msg, "alert");
        logger.warn(msg, this.configuration);
      }
    },

    setAudioOnlyOfferAndRec: function(audioOnly){
      this.configuration.audioOnly = audioOnly;
      this.configuration.offerToReceiveVideo = !audioOnly;
      this.sipStack.updateUserMedia();
    },

    setAudioOnly: function(audioOnly){
      this.configuration.audioOnly = audioOnly;
      this.configuration.offerToReceiveVideo = true;
      this.sipStack.updateUserMedia();
    },

    updateClientClass: function(){
      var classes = ["client"];
      classes.push("r"+this.configuration.getResolutionDisplay());
      classes.push(this.configuration.isWidescreen() ? "widescreen" : "standard");
      var callState = this.sipStack.getCallState();
      if(callState) {
        classes.push(callState);
      }
      if(this.sipStack.isRegistered()) {
        classes.push('registered');
      }
      if(this.event) {
        classes.push(this.event);
      }
      if (this.configuration.enableMute)
      {
        classes.push("enable-mute");
      }
      if (this.configuration.enableShareScreen)
      {
        classes.push("enable-shareScreen");
      }
      if (this.configuration.enableCallControl)
      {
        classes.push("enable-call-control");
      }
      if (this.configuration.enableTransfer)
      {
        classes.push("enable-transfer");
      }
      if (this.configuration.enableHold)
      {
        classes.push("enable-hold");
      }
      if (this.configuration.enableCallTimer)
      {
        classes.push("enable-timer");
      }
      if (this.configuration.enableSettings)
      {
        classes.push("enable-settings");
      }
      if (this.configuration.enableFullScreen)
      {
        classes.push("enable-full-screen");
      }
      if (this.configuration.enableSelfView)
      {
        classes.push("enable-self-view");
      }
      if (this.configuration.enableDialpad)
      {
        classes.push("enable-dialpad");
      }
      var views = this.configuration.getViews();
      if (views && views.length > 0)
      {
        views.map(function(view){
          classes.push("view-"+view);
        });
      }
      if (this.configuration.enableScreenSharing)
      {
        classes.push("enable-screen-sharing");
      }
      if (this.configuration.enableFileShare)
      {
        classes.push("enable-file-share");
      }
      if(this.sound.muted) { classes.push("muted"); } else { classes.push("unmuted"); }
      if(this.settings.toggled) { classes.push("settings-shown"); } else { classes.push("settings-hidden"); }
      if(this.selfViewEnabled) { classes.push("self-view-enabled"); } else { classes.push("self-view-disabled"); }
      if(this.dialpadShown) { classes.push("dialpad-shown"); } else { classes.push("dialpad-hidden"); }
      if(this.fullScreen) { classes.push("full-screen-expanded"); } else { classes.push("full-screen-contracted"); }
      if(this.isScreenSharing) { classes.push("screen-sharing"); } else { classes.push("screen-sharing-off"); }
      if(this.transfer.visible) { classes.push("transfer-visible"); } else { classes.push("transfer-hidden"); }
      if(this.authentication.visible) { classes.push("auth-visible"); } else { classes.push("auth-hidden"); }
      this.client.attr("class", classes.join(" "));
    }
  };

  WebRTC.Client = Client;
}(WebRTC));



window.WebRTC = WebRTC;
}(window));


},{"ejs":5}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":4}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],5:[function(require,module,exports){

/*!
 * EJS
 * Copyright(c) 2012 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var utils = require('./utils')
  , path = require('path')
  , dirname = path.dirname
  , extname = path.extname
  , join = path.join
  , fs = require('fs')
  , read = fs.readFileSync;

/**
 * Filters.
 *
 * @type Object
 */

var filters = exports.filters = require('./filters');

/**
 * Intermediate js cache.
 *
 * @type Object
 */

var cache = {};

/**
 * Clear intermediate js cache.
 *
 * @api public
 */

exports.clearCache = function(){
  cache = {};
};

/**
 * Translate filtered code into function calls.
 *
 * @param {String} js
 * @return {String}
 * @api private
 */

function filtered(js) {
  return js.substr(1).split('|').reduce(function(js, filter){
    var parts = filter.split(':')
      , name = parts.shift()
      , args = parts.join(':') || '';
    if (args) args = ', ' + args;
    return 'filters.' + name + '(' + js + args + ')';
  });
};

/**
 * Re-throw the given `err` in context to the
 * `str` of ejs, `filename`, and `lineno`.
 *
 * @param {Error} err
 * @param {String} str
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

function rethrow(err, str, filename, lineno){
  var lines = str.split('\n')
    , start = Math.max(lineno - 3, 0)
    , end = Math.min(lines.length, lineno + 3);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
}

/**
 * Parse the given `str` of ejs, returning the function body.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

var parse = exports.parse = function(str, options){
  var options = options || {}
    , open = options.open || exports.open || '<%'
    , close = options.close || exports.close || '%>'
    , filename = options.filename
    , compileDebug = options.compileDebug !== false
    , buf = "";

  buf += 'var buf = [];';
  if (false !== options._with) buf += '\nwith (locals || {}) { (function(){ ';
  buf += '\n buf.push(\'';

  var lineno = 1;

  var consumeEOL = false;
  for (var i = 0, len = str.length; i < len; ++i) {
    var stri = str[i];
    if (str.slice(i, open.length + i) == open) {
      i += open.length

      var prefix, postfix, line = (compileDebug ? '__stack.lineno=' : '') + lineno;
      switch (str[i]) {
        case '=':
          prefix = "', escape((" + line + ', ';
          postfix = ")), '";
          ++i;
          break;
        case '-':
          prefix = "', (" + line + ', ';
          postfix = "), '";
          ++i;
          break;
        default:
          prefix = "');" + line + ';';
          postfix = "; buf.push('";
      }

      var end = str.indexOf(close, i);

      if (end < 0){
        throw new Error('Could not find matching close tag "' + close + '".');
      }

      var js = str.substring(i, end)
        , start = i
        , include = null
        , n = 0;

      if ('-' == js[js.length-1]){
        js = js.substring(0, js.length - 2);
        consumeEOL = true;
      }

      if (0 == js.trim().indexOf('include')) {
        var name = js.trim().slice(7).trim();
        if (!filename) throw new Error('filename option is required for includes');
        var path = resolveInclude(name, filename);
        include = read(path, 'utf8');
        include = exports.parse(include, { filename: path, _with: false, open: open, close: close, compileDebug: compileDebug });
        buf += "' + (function(){" + include + "})() + '";
        js = '';
      }

      while (~(n = js.indexOf("\n", n))) n++, lineno++;
      if (js.substr(0, 1) == ':') js = filtered(js);
      if (js) {
        if (js.lastIndexOf('//') > js.lastIndexOf('\n')) js += '\n';
        buf += prefix;
        buf += js;
        buf += postfix;
      }
      i += end - start + close.length - 1;

    } else if (stri == "\\") {
      buf += "\\\\";
    } else if (stri == "'") {
      buf += "\\'";
    } else if (stri == "\r") {
      // ignore
    } else if (stri == "\n") {
      if (consumeEOL) {
        consumeEOL = false;
      } else {
        buf += "\\n";
        lineno++;
      }
    } else {
      buf += stri;
    }
  }

  if (false !== options._with) buf += "'); })();\n} \nreturn buf.join('');";
  else buf += "');\nreturn buf.join('');";
  return buf;
};

/**
 * Compile the given `str` of ejs into a `Function`.
 *
 * @param {String} str
 * @param {Object} options
 * @return {Function}
 * @api public
 */

var compile = exports.compile = function(str, options){
  options = options || {};
  var escape = options.escape || utils.escape;

  var input = JSON.stringify(str)
    , compileDebug = options.compileDebug !== false
    , client = options.client
    , filename = options.filename
        ? JSON.stringify(options.filename)
        : 'undefined';

  if (compileDebug) {
    // Adds the fancy stack trace meta info
    str = [
      'var __stack = { lineno: 1, input: ' + input + ', filename: ' + filename + ' };',
      rethrow.toString(),
      'try {',
      exports.parse(str, options),
      '} catch (err) {',
      '  rethrow(err, __stack.input, __stack.filename, __stack.lineno);',
      '}'
    ].join("\n");
  } else {
    str = exports.parse(str, options);
  }

  if (options.debug) console.log(str);
  if (client) str = 'escape = escape || ' + escape.toString() + ';\n' + str;

  try {
    var fn = new Function('locals, filters, escape, rethrow', str);
  } catch (err) {
    if ('SyntaxError' == err.name) {
      err.message += options.filename
        ? ' in ' + filename
        : ' while compiling ejs';
    }
    throw err;
  }

  if (client) return fn;

  return function(locals){
    return fn.call(this, locals, filters, escape, rethrow);
  }
};

/**
 * Render the given `str` of ejs.
 *
 * Options:
 *
 *   - `locals`          Local variables object
 *   - `cache`           Compiled functions are cached, requires `filename`
 *   - `filename`        Used by `cache` to key caches
 *   - `scope`           Function execution context
 *   - `debug`           Output generated function body
 *   - `open`            Open tag, defaulting to "<%"
 *   - `close`           Closing tag, defaulting to "%>"
 *
 * @param {String} str
 * @param {Object} options
 * @return {String}
 * @api public
 */

exports.render = function(str, options){
  var fn
    , options = options || {};

  if (options.cache) {
    if (options.filename) {
      fn = cache[options.filename] || (cache[options.filename] = compile(str, options));
    } else {
      throw new Error('"cache" option requires "filename".');
    }
  } else {
    fn = compile(str, options);
  }

  options.__proto__ = options.locals;
  return fn.call(options.scope, options);
};

/**
 * Render an EJS file at the given `path` and callback `fn(err, str)`.
 *
 * @param {String} path
 * @param {Object|Function} options or callback
 * @param {Function} fn
 * @api public
 */

exports.renderFile = function(path, options, fn){
  var key = path + ':string';

  if ('function' == typeof options) {
    fn = options, options = {};
  }

  options.filename = path;

  var str;
  try {
    str = options.cache
      ? cache[key] || (cache[key] = read(path, 'utf8'))
      : read(path, 'utf8');
  } catch (err) {
    fn(err);
    return;
  }
  fn(null, exports.render(str, options));
};

/**
 * Resolve include `name` relative to `filename`.
 *
 * @param {String} name
 * @param {String} filename
 * @return {String}
 * @api private
 */

function resolveInclude(name, filename) {
  var path = join(dirname(filename), name);
  var ext = extname(name);
  if (!ext) path += '.ejs';
  return path;
}

// express support

exports.__express = exports.renderFile;

/**
 * Expose to require().
 */

if (require.extensions) {
  require.extensions['.ejs'] = function (module, filename) {
    filename = filename || module.filename;
    var options = { filename: filename, client: true }
      , template = fs.readFileSync(filename).toString()
      , fn = compile(template, options);
    module._compile('module.exports = ' + fn.toString() + ';', filename);
  };
} else if (require.registerExtension) {
  require.registerExtension('.ejs', function(src) {
    return compile(src, {});
  });
}

},{"./filters":6,"./utils":7,"fs":2,"path":3}],6:[function(require,module,exports){
/*!
 * EJS - Filters
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * First element of the target `obj`.
 */

exports.first = function(obj) {
  return obj[0];
};

/**
 * Last element of the target `obj`.
 */

exports.last = function(obj) {
  return obj[obj.length - 1];
};

/**
 * Capitalize the first letter of the target `str`.
 */

exports.capitalize = function(str){
  str = String(str);
  return str[0].toUpperCase() + str.substr(1, str.length);
};

/**
 * Downcase the target `str`.
 */

exports.downcase = function(str){
  return String(str).toLowerCase();
};

/**
 * Uppercase the target `str`.
 */

exports.upcase = function(str){
  return String(str).toUpperCase();
};

/**
 * Sort the target `obj`.
 */

exports.sort = function(obj){
  return Object.create(obj).sort();
};

/**
 * Sort the target `obj` by the given `prop` ascending.
 */

exports.sort_by = function(obj, prop){
  return Object.create(obj).sort(function(a, b){
    a = a[prop], b = b[prop];
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
};

/**
 * Size or length of the target `obj`.
 */

exports.size = exports.length = function(obj) {
  return obj.length;
};

/**
 * Add `a` and `b`.
 */

exports.plus = function(a, b){
  return Number(a) + Number(b);
};

/**
 * Subtract `b` from `a`.
 */

exports.minus = function(a, b){
  return Number(a) - Number(b);
};

/**
 * Multiply `a` by `b`.
 */

exports.times = function(a, b){
  return Number(a) * Number(b);
};

/**
 * Divide `a` by `b`.
 */

exports.divided_by = function(a, b){
  return Number(a) / Number(b);
};

/**
 * Join `obj` with the given `str`.
 */

exports.join = function(obj, str){
  return obj.join(str || ', ');
};

/**
 * Truncate `str` to `len`.
 */

exports.truncate = function(str, len, append){
  str = String(str);
  if (str.length > len) {
    str = str.slice(0, len);
    if (append) str += append;
  }
  return str;
};

/**
 * Truncate `str` to `n` words.
 */

exports.truncate_words = function(str, n){
  var str = String(str)
    , words = str.split(/ +/);
  return words.slice(0, n).join(' ');
};

/**
 * Replace `pattern` with `substitution` in `str`.
 */

exports.replace = function(str, pattern, substitution){
  return String(str).replace(pattern, substitution || '');
};

/**
 * Prepend `val` to `obj`.
 */

exports.prepend = function(obj, val){
  return Array.isArray(obj)
    ? [val].concat(obj)
    : val + obj;
};

/**
 * Append `val` to `obj`.
 */

exports.append = function(obj, val){
  return Array.isArray(obj)
    ? obj.concat(val)
    : obj + val;
};

/**
 * Map the given `prop`.
 */

exports.map = function(arr, prop){
  return arr.map(function(obj){
    return obj[prop];
  });
};

/**
 * Reverse the given `obj`.
 */

exports.reverse = function(obj){
  return Array.isArray(obj)
    ? obj.reverse()
    : String(obj).split('').reverse().join('');
};

/**
 * Get `prop` of the given `obj`.
 */

exports.get = function(obj, prop){
  return obj[prop];
};

/**
 * Packs the given `obj` into json string
 */
exports.json = function(obj){
  return JSON.stringify(obj);
};

},{}],7:[function(require,module,exports){

/*!
 * EJS
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function(html){
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
};
 

},{}]},{},[1]);
