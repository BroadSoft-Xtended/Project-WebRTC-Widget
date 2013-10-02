/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var Configuration,
    LOG_PREFIX = WebRTC.name +' | '+ 'Configuration' +' | ';

  Configuration = function() {
    console.log(LOG_PREFIX+'window.location.search : '+window.location.search);
    // Default URL variables
    this.register = (WebRTC.Utils.getSearchVariable("register") === "true");
    this.password = WebRTC.Utils.getSearchVariable("password") || $.cookie('settingPassword');
    this.userid = WebRTC.Utils.getSearchVariable("userid") || $.cookie('settingUserid');
    this.destination = WebRTC.Utils.getSearchVariable("destination");
    this.hd = (WebRTC.Utils.getSearchVariable("hd") === "true") || $.cookie('settingHD');
    this.audioOnly = (WebRTC.Utils.getSearchVariable("audioOnly") === "true");
    this.displayName = $.cookie('settingDisplayName') || WebRTC.Utils.getSearchVariable("name").toString().replace("%20"," ");
    this.maxCallLength = WebRTC.Utils.getSearchVariable("maxCallLength");
    this.hideCallControl = (WebRTC.Utils.getSearchVariable("hide") === "true");
    this.size = WebRTC.Utils.getSearchVariable("size") || $.cookie('settingSize') || 1;
    this.color = WebRTC.Utils.colorNameToHex(WebRTC.Utils.getSearchVariable("color")) || $.cookie('settingColor') || '#ffffff';

    // Client Variables
    this.timerRunning = false;
    this.disableICE = ClientConfig.disableICE;
    this.transmitVGA = $.cookie('settingTransmitVGA') || ClientConfig.transmitVGA;
    this.transmitHD = $.cookie('settingTransmitHD') || ClientConfig.transmitHD;
  };

  Configuration.prototype.getExSIPOptions = function(){
    // 720p constraints
    var constraints = {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      }
    };

    // PeerConnection constraints
    var hasVideo = false;
    if (this.hd === true)
    {
      hasVideo = constraints;
    }
    else if (this.audioOnly)
    {
      hasVideo = false;
    }
    else
    {
      hasVideo = true;
    }

    // Options Passed to ExSIP
    var options =
    {
      mediaConstraints:
      {
        audio: true,
        video: hasVideo
      },
      RTCConstraints: {'optional': [],'mandatory': {}}
    };

    return options;
  };

  Configuration.prototype.getRtcMediaHandlerOptions = function(){
    var options = {reuseLocalMedia: ClientConfig.enableConnectLocalMedia};
    if (ClientConfig.enableHD === true & this.hd === true)
    {
      options["videoBandwidth"] = this.transmitHD;
    }
    else
    {
      options["videoBandwidth"] = this.transmitVGA;
    }
    options["disableICE"] = this.disableICE;
    return options;
  };

  Configuration.prototype.persist = function(){
    $.cookie("settingDisplayName", ($("#settingDisplayName").val()), { expires: ClientConfig.expires });
    $.cookie("settingUserid", ($("#settingUserid").val()),  { expires: ClientConfig.expires });
    $.cookie("settingPassword", ($("#settingPassword").val()), { expires: ClientConfig.expires });
    $.cookie("settingSelfViewDisable", ($("#settingSelfViewDisable").prop('checked')), { expires: ClientConfig.expires });
    $.cookie("settingHD", ($("#settingHD").prop('checked')), { expires: ClientConfig.expires });
    $.cookie("settingTransmitVGA", ($("#settingTransmitVGA").val()), { expires: ClientConfig.expires });
    $.cookie("settingTransmitHD", ($("#settingTransmitHD").val()), { expires: ClientConfig.expires });
    $.cookie("settingTransmitHD", ($("#settingTransmitHD").val()), { expires: ClientConfig.expires });
    $.cookie("settingColor", ($("#settingColor")[0].value), { expires: ClientConfig.expires });
    $.cookie("settingSize", ($("#settingSize").val()), { expires: ClientConfig.expires });
    $.cookie("settingAutoAnswer", ($("#settingAutoAnswer").prop('checked')), { expires: ClientConfig.expires });
    $.cookie("settingWindowPosition", "#localVideo" + "-" + $("#settingLocalVideoTop").val() + "-" + $("#settingLocalVideoLeft").val() + "|" +
      "#callHistory" + "-" + $("#settingCallHistoryTop").val() + "-" + $("#settingCallHistoryLeft").val() + "|" +
      "#callStats" + "-" + $("#settingCallStatsTop").val() + "-" + $("#settingCallStatsLeft").val());
  };

  WebRTC.Configuration = Configuration;
}(WebRTC));
