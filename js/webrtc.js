/***************************************************
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton <nathan@robotics.net>
 *
 * Copyright 2013 Exario Networks
 * http://www.exarionetworks.com
 * 
 * JsSIP library is MIT-license code: 
 * http://www.opensource.org/licenses/mit-license.php
 ***************************************************/

$(document).ready(function() {

// Default URL variables
var userid = getSearchVariable("userid");
var register = (getSearchVariable("register") == "true");
var destination = getSearchVariable("destination");
var hd = (getSearchVariable("hd") == "true"); 
var audioOnly = (getSearchVariable("audioOnly") == "true");
var displayName = getSearchVariable("name").toString().replace("%20"," ");
var maxCallLength = getSearchVariable("maxCallLength");
var hideCallControl = (getSearchVariable("hide") == "true");

// Enable Client Features
var enableHD = true;
var enableCallControl = true;
var enableCallTimer = true;
var enableCallHistory = true;
var enableFullScreen = true;
var enableSelfView = true;
var enableCallStats = true;
var enableDialpad = true;
var enableMute = true;
var enableMessages = true;
var enableRegistrationIcon = true;
var enableConnectionIcon = true;
var enableWindowDrag = true;

// Client Variables
var password = false;
var volumeClick = 1;
var soundOut = document.createElement("audio");
soundOut.volume = volumeClick;
var volumeDTMF = 1;
var soundOutDTMF = document.createElement("audio");
soundOutDTMF.volume = volumeDTMF;
var timerRunning = false;
var wssGateway = 'nathan.exarionetworks.com';
var wssPort = 8443;
var stunServer = '204.117.64.117';
var stunPort = 3478;
var domainFrom = 'nathan.exarionetworks.com';
var domainTo = '204.117.64.115';
var allowOutside = true;
var endCallURL = false;
disableICE = true;
var transmitVGA = 512;
var transmitHD = 2048;

// Client Messages
var messageProgress = "Ringing";
var messageOutsideDomain = "Invalid Destination";
var messageStarted = "Call Started";
var messageEnded = "Call Ended";
var messageCall = "Performing NAT Tests";
var messageConnected = "Connected";
var messageEmptyDestination = "Invalid Number";

// Pull the URL variables out of URL
function getSearchVariable(variable) {
  var search = window.location.search.substring(1);
  var vars = search.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){
      return pair[1];
    }
  }
  return(false);
}

// Generate a random userid
function randomUserid() {
  var chars = "0123456789abcdef";
  var string_length = 10;
  var randomstring = '';
  userid = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    userid += chars.substring(rnum,rnum+1);
  }
  return(userid);
}

formatedDuration = "00:00:00";
// Start timer
function startTimer () {
  timerRunning = true;
  var startTimer = runningTimer();
  callTimer = setInterval(startTimer, 1000);
  if (enableCallTimer) {
    $("#timer").fadeIn(100);
  }
}

// Stop timer
function stopTimer () {
  $("#timer").fadeOut(100);
  timerRunning = false;
  clearInterval(callTimer);
}

// Display the timer on the screen
function runningTimer () {
  var element = timer, seconds = -1;
  return function () {
    ++seconds;
    var secs = seconds;
    if (maxCallLength && seconds >= maxCallLength) {
      endCall();
      return;
    }
    var hrs = Math.floor(secs / 3600);
    secs %= 3600;
    var mns = Math.floor(secs / 60);
    secs %= 60;
    formatedDuration = (hrs < 10 ? "0" : "") + hrs + ":" + (mns < 10 ? "0" : "") + mns + ":" + (secs < 10 ? "0" : "") + secs;
    $("#timer").text(formatedDuration);
    if (enableCallStats) {
      processStats();
    }
  }
}

// Auth popup
function authPopUp() {
  if (!userid == false) {
    $("#authPopup input#username").val(userid);
  }

  $("#authPopup").keypress(function(e) {
    if (e.which == 13) {
      $('#authPopupButton').click();
    }
  })

  $("#authPopup").fadeIn(300);
  $('#authPopupButton').click(function() {
  var userid = $("#authPopup input#username").val();
  var password = $("#authPopup input#password").val();
  if ($("#authPopup input#displayName").val()) {
    displayName = $("#authPopup input#displayName").val();
  }
  register=true;
  if (userid == "") {
    $("#alert").text("Invalid Username").fadeIn(10).fadeOut(4000);
    return;
  }
  if (password == "") {
    $("#alert").text("Invalid Password").fadeIn(10).fadeOut(4000);
    return;
  }
  $("#authPopup").fadeOut(300);
  onLoad(userid, password);
  });
}

// Display status messages
function message(text, level) {
  if(!enableMessages) {
    return;
  }
  $("#messages").stop(true, true).fadeOut();
  $("#messages").removeClass("normal success warning alert");
  $("#messages").addClass(level).text(text).fadeIn(10).fadeOut(10000);
}

// Make sure destination allowed and in proper format
function validateDestination (destination) {
  if (destination.indexOf("sip:") === -1) {
    destination = ("sip:" + destination);
  }
  if ((destination.indexOf(domainTo) === -1 ) && allowOutside == false) {
    message(messageOutsideDomain, "alert");
    return(false);
  }
  if ((destination.indexOf("@") === -1)) {
    destination = (destination + "@" + domainTo);
  }
  return(destination); 
}

// URL call
function uriCall(destination) {
  var destination = validateDestination(destination);
  if (destination == false) {
    return;
  }

  $('#call').fadeOut(1000);
	
  var constraints = {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    }
  }

  if (hd == true) {
    videoBandwidth = transmitHD;
    var video = constraints;
    } else if (audioOnly) {
    var video = false;
  } else {
    videoBandwidth = transmitVGA;
    var video = true;
  }

  var eventHandlers = {
    'progress': function(e) {
       message(messageProgress, "normal");
       soundOut.setAttribute("src", "media/dtmf-ringback.ogg");
       soundOut.play();
    },

    'failed': function(e) {
      message(e.data.cause, "alert");
      soundOut.pause();
      endCall();
    },

    'started': function(e) {
      var localStreams, remoteStreams;
      if (window.mozRTCPeerConnection) {
        localStreams = rtcSession.rtcMediaHandler.peerConnection.localStreams;
        remoteStreams = rtcSession.rtcMediaHandler.peerConnection.remoteStreams;
      } else {
        localStreams = rtcSession.getLocalStreams();
        remoteStreams = rtcSession.getRemoteStreams();
      }
      if ( localStreams.length > 0) {
        selfView.src = window.URL.createObjectURL(rtcSession.getLocalStreams()[0]);
      }
      if ( remoteStreams.length > 0) {
        remoteView.src = window.URL.createObjectURL(rtcSession.getRemoteStreams()[0]);
      }
      soundOut.pause();
      startTimer();
      message(messageStarted, "success");
      if (enableMute) {
        $("#muteAudio").fadeIn(1000);
      }
    },

    'ended': function(e) {
      message(messageEnded, "normal");
      endCall();
    }
  };

  var options = {
    mediaConstraints: {
      audio: true,
      video: video
    },
    RTCConstraints: {'optional': [],'mandatory': {}},
    eventHandlers: eventHandlers
  };
	
  var selfView = document.getElementById("localVideo");
  var remoteView = document.getElementById("remoteVideo");
	
  $("#hangup").fadeIn(1000);
  setCookie("new", destination, ">");
	
  // Start the Call
  message(messageCall, "success");
  sipStack.call(destination, options);
}

videoOutBytesPrev = 0;
videoInBytesPrev = 0;
audioOutBytesPrev = 0;
audioInBytesPrev = 0;

function processStats() {
  RTCPeerConnection = rtcSession.rtcMediaHandler.peerConnection;
  RTCPeerConnection.getStats(function (stats) {
    var videoPacketLoss = 0;
    var audioPacketLoss = 0
    var results = stats.result();
    for (var i = 0; i < results.length; ++i) {
      var res = results[i];
      if (!res.local || res.local === res) {
        if (res.type == 'ssrc' && res.stat('googFrameHeightSent')) {
          var videoOutBytesNow = res.stat('bytesSent');
          var videoOutBitRate = Math.round((videoOutBytesNow - videoOutBytesPrev) * 8 / 1024);
          videoOutBytesPrev = videoOutBytesNow;
          var videoOutFrameRate = res.stat('googFrameRateSent');
        }
        else if (res.type == 'ssrc' && res.stat('googFrameHeightReceived')) {
          var videoInBytesNow = res.stat('bytesReceived');
          var videoInBitRate = Math.round((videoInBytesNow - videoInBytesPrev) * 8 / 1024);
          videoInBytesPrev = videoInBytesNow;
          var videoPacketsLost = parseInt(res.stat('packetsLost'));
          var videoPacketsReceived = parseInt(res.stat('packetsReceived'));
          var videoInFrameRate = res.stat('googFrameRateReceived');
          if (videoPacketsLost > 0) {
            var videoPacketLoss = Math.round((videoPacketsLost * 100 / (videoPacketsReceived + videoPacketsLost))*100);
          }
        }
        else if (res.type == 'ssrc' && res.stat('audioInputLevel')) {
          var audioOutBytesNow = res.stat('bytesSent');
          var audioOutBitRate = Math.round((audioOutBytesNow - audioOutBytesPrev) * 8 / 1024);
          audioOutBytesPrev = audioOutBytesNow;
          var audioInputLevel = res.stat('audioInputLevel');
        }
        else if (res.type == 'ssrc' && res.stat('audioOutputLevel')) {
          var audioInBytesNow = res.stat('bytesReceived');
          var audioInBitRate = Math.round((audioInBytesNow - audioInBytesPrev) * 8 / 1024);
          audioInBytesPrev = audioInBytesNow;
          var audioPacketsLost = res.stat('packetsLost');
          var audioPacketsReceived = res.stat('packetsReceived');
          var audioJitter = res.stat('googJitterReceived');
          var audioOutputLevel = res.stat('audioOutputLevel');
          if (audioPacketsLost > 0) {
            var audioPacketLoss = Math.round((audioPacketsLost * 100 / (audioPacketsReceived + audioPacketsLost))*100);
          }
        }
        else if (res.type == 'ssrc' && res.stat('googRtt') && res.stat('googJitterReceived')) {
          var videoJitter = res.stat('googJitterReceived');
        }
      }
      $("#callStats .statsVideo").text("Video Statistics\n\n"
        + "Bitrate out: " + videoOutBitRate + " kb/s\n"
        + "Bitrate in: " + videoInBitRate + " kb/s\n"
        + "Lost: " + videoPacketsLost + " packets " + (videoPacketLoss/100) + "%\n"
        + "Jitter: " + videoJitter + " ms\n"
        + "Frame Rate out: " + videoOutFrameRate + " in: " + videoInFrameRate + "\n");
      $("#callStats .statsAudio").text("Audio Statistics\n\n"
        + "Bitrate out: " + audioOutBitRate + " kb/s\n"
        + "Bitrate in: " + audioInBitRate + " kb/s\n"
        + "Lost: " + audioPacketsLost + " packets " + (audioPacketLoss/100) + "%\n"
        + "Jitter: " + audioJitter + " ms\n"
        + "Audio Level out: " + audioOutputLevel + " in: " + audioInputLevel + "\n");

    }
    if (videoPacketLoss < 10) {
      $("#quality1").fadeIn(10);
      $("#quality2, #quality3, #quality4").fadeOut(10);
    }
    else if (videoPacketLoss > 10 && videoPacketLoss < 20) {
      $("#quality2").fadeIn(10);
      $("#quality1, #quality3, #quality4").fadeOut(10);
    }
    else if (videoPacketLoss > 20 && videoPacketLoss < 100) {
      $("#quality3").fadeIn(10);
      $("#quality1, #quality2, #quality4").fadeOut(10);
    }
    else if (videoPacketLoss > 100 && videoPacketLoss < 1000) {
      $("#quality4").fadeIn(10);
      $("#quality1, #quality2, #quality3").fadeOut(10);
    }
  });
}

function guiStart() {
  $("#remoteVideo, #videoBar, #muteAudio").fadeIn(1000)
  if(enableCallControl && !hideCallControl) {
    $("#callControl, #call").fadeIn(1000);
  }
  if(enableDialpad) {
    $("#dialpadIconShow").fadeIn(1000);
  }
  if(enableSelfView) {
    $("#localVideo, #selfViewDisable").fadeIn(1000);
  }
  if(enableFullScreen) {
    $("#fullScreenExpand").fadeIn(1000);
  }
}

function showHistory(page) {	
  var allCookies = document.cookie;
  var cookiesArray = allCookies.split(';');
  var callsOnPage = 10;
  var baseIndex = cookiesArray.length > callsOnPage*page ? (cookiesArray.length - callsOnPage*page):0;
	
  if (callsOnPage > cookiesArray.length - baseIndex) {
    callsOnPage = cookiesArray.length - baseIndex;
  }
  if (allCookies != "") {
    for(var i = 0; i < callsOnPage && baseIndex + i < cookiesArray.length && i < callsOnPage; i ++) {
      key = cookiesArray[(baseIndex + callsOnPage - i)-1].split('=')[0];
      value = cookiesArray[(baseIndex + callsOnPage - i)-1].split('=')[1];
		
      // Parse out call info
      var tempDate = new Date();
      var callArray = value.split('|');
      var destination = callArray[1];
      var historyDirection = callArray[2];
      var historyLength = callArray[3];
      var historyDate = tempDate.toUTCString(callArray[0]);
      var historyDestination = destination.replace(/sip:([^@]+)@.+/,"$1");
      var historyCall = key.replace(/^\D*(\d+)$/,"$1");

      // Display Call History
      $("#row" + i + " .historyCall").text(historyCall);
      $("#row" + i + " .historyDestination").text(historyDestination);
      $("#row" + i + " .historyDirection").text(historyDirection);
      $("#row" + i + " .historyDate").text(historyDate);
      $("#row" + i + " .historyLength").text(historyLength);
    }
  }
}

function endCall() {
  $("#hangup, #muteAudio").fadeOut(100);
  isMuted = false;
  // Clear last image from video tags
  $("#localVideo").removeAttr("src");
  $("#remoteVideo").removeAttr("src");
  // Bring up the main elements
  if (enableCallControl == true) {
    hideCallControl = false;
  }
  guiStart();
  if (timerRunning == true) {
    stopTimer();
  }
  if (!endCallURL == false) {
    window.location = endCallURL;
  }
}

currentCallArray = new Array(4);
// Store call stats in array, then in cookie on update
function setCookie(type, remoteParty, direction) {
  if (!enableCallHistory) {
    return;
  }
  if (type=="new") {
    timestamp = new Date();
    var epoch = timestamp.getTime();
    currentCallArray[1] = epoch;
    currentCallArray[2] = remoteParty;
    currentCallArray[3] = direction;
  } else if (type=="update") {
    // Get latest cookie
    var allCookies = document.cookie;
    var allCookiesArray = allCookies.split(';');
    var callNumber = allCookiesArray.length;
    if (allCookies == "") {
      var allCookies = document.cookie;
      callNumber = 0;
    }
    callNumber++;
    var expires = 365;
    timestamp.setDate(timestamp.getDate() + expires);
    var cookieKey = ("call_" + callNumber + "=" + currentCallArray[1]);
    var cookieExpires = ("expires=" + timestamp.toUTCString());
    var cookieValue = (cookieKey + "|" + currentCallArray[2] + "|" + currentCallArray[3] + "|" + formatedDuration + "|" + cookieExpires);
    document.cookie = cookieValue;	
  }
}

// Initial startup
function onLoad(userid, password) {
  // Config settings
  if ((userid.indexOf("@") === -1)) {
    var sip_uri = (userid + "@" + domainFrom);
  } else {
    var sip_uri = userid;
  }
  var config  = {
    'uri': sip_uri,
    'ws_servers': 'wss://' + wssGateway + ':' + wssPort,
    'stun_servers': 'stun:' + stunServer + ':' + stunPort,
    'trace_sip': true,
    'hack_via_tcp': true,
  };

  // Add Display Name if set
  if (displayName.indexOf("false") === -1) {
    config.display_name = displayName
  }

  // Modify config object based password
  if (password == false) {
    config.register = false
  } else {
    config.register = true,
    config.password = password
  }
	
  // SIP stack
  sipStack = new JsSIP.UA(config);

  // Start SIP Stack
  sipStack.start();
	
  // Start the GUI
  guiStart();
	
  // sipStack callbacks 
  sipStack.on('connected', function(e) {
    if (enableConnectionIcon) {
      $("#connected").removeClass("alert");
      $("#connected").addClass("success").fadeIn(10).fadeOut(3000);
    }
    message(messageConnected, "success");
  });
  sipStack.on('disconnected', function(e) {
  if (enableConnectionIcon) {
     $("#connected").removeClass("success");
     $("#connected").addClass("alert").fadeIn(100);
   }
   endCall();
   $("#call").fadeOut(100);
  });
  sipStack.on('newRTCSession', function(e) {
    rtcSession = e.data.session;
    if (e.data.session.direction == "incoming") {
      incommingCall(e);
    }
  });

  // Registration callbacks only if registering
  if (!password == false) {
    sipStack.on('registered', function(e) {
      if (enableRegisterationIcon) {
         $("#registered").removeClass("alert");
         $("#registered").addClass("success").fadeIn(10).fadeOut(3000);
      }
    });
    sipStack.on('registrationFailed', function(e) {
      if (enableRegistrationIcon) {
        $("#registered").removeClass("success");
        $("#registered").addClass("alert").fadeIn(100);
      }
    });
  }
  // Start a call
  if (!destination == false) {
    uriCall(destination);
  }
}

// Incoming call function
function incommingCall(message) {
  message("Incoming Call", "normal");
  soundOut.setAttribute("src", "media/dtmf-ringtone.ogg");
  soundOut.play();
  console.log(message);
  console.log(message.data.session.request.from.uri);
  console.log(message.data.session);
}

mainDestination = $("#callControl input#destination");
// What we do when we get a digit
function pressDTMF (digit) {
  if (digit.length != 1) {
    return;
  }
  if (digit == "*") {
    file = "star";
  } else if (digit == "#") {
    file = "pound";
  } else {
    file = digit;
  }
  soundOutDTMF.setAttribute("src", "media/dtmf-" + file + ".ogg");
  soundOutDTMF.play();
  mainDestination.val(mainDestination.val() + digit);
  if (timerRunning == true) {
    rtcSession.sendDTMF(digit, options=null);
  }
}

// Allow the local video window to be draggable, required jQuery.UI
if (enableWindowDrag) {
  $(function() {
    $("#localVideo").draggable();
  });
}

// Buttons
$('#call').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();	
  var destination = mainDestination.val();
  if (destination == "") {
    message(messageEmptyDestination, "alert");
  } else {
    uriCall(destination);
  }
});

$('#hangup').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  rtcSession.terminate();
  setCookie("update", false, false);
  endCall();
  if (fullScreen == true) {
    $('#fullScreenContract').click();
  }
});

fullScreen = false;
$('#fullScreenExpand').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  video.webkitRequestFullScreen();
  fullScreen = true;
});

$('#fullScreenContract').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  document.webkitCancelFullScreen();
  fullScreen = false;
  $("#fullScreenContract").fadeOut(100);
  $("#fullScreenExpand").fadeIn(1000);
});

$('#selfViewDisable').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  $("#localVideo, #selfViewDisable").fadeOut(100);
  $("#selfViewEnable").fadeIn(1000);
});

$('#selfViewEnable').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  $("#selfViewEnable").fadeOut(1000);
  $("#localVideo, #selfViewDisable").fadeIn(1000);
});

$('#muteAudio').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  localMedia = rtcSession.getLocalStreams()[0];
  localAudio = localMedia.getAudioTracks()[0];
  localAudio.enabled = false;
  $("#muteAudio").fadeOut(1000);
  $("#unmuteAudio").fadeIn(1000);
});

$('#unmuteAudio').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  localAudio.enabled = true;
  $("#unmuteAudio").fadeOut(1000);
  $("#muteAudio").fadeIn(1000);
});

$('#dialpadIconShow').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  $("#dialIconpadShow").fadeOut(1000);
  $("#dialpad, #dialpadIconHide").fadeIn(1000);
});

$('#dialpadIconHide').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  $("#dialpad, #dialpadIconHide").fadeOut(1000);
  $("#dialpadIconShow").fadeIn(1000);
});

$("#settings").bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  if (hd == false) {
    $("*").removeClass("hd");
    hd = false;
  } else if (hd == true) {
    $("*").addClass("hd");
    hd = true;
  }   
});

historyPressed = false;
$('#historyToggle').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  if (historyPressed == true) {
    historyPressed = false;
    $("#callHistory, #historyClear").fadeOut(100);
  } else if (historyPressed == false) {
    historyPressed = true;
    $("#callHistory, #historyClear").fadeIn(100);
    showHistory(1);
  }
  e.stopPropagation();
});

$("#callHistory").bind('click', function(e) {
  var clicked = (e.target.innerText)
  var callID = (e.target.parentElement.firstElementChild.firstChild.nodeValue);
});

$("#historyClear").bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
  $('#historyToggle').click();
});

// Dialpad digits
$("#dialpad").bind('click', function(e) {
  pressDTMF(e.target.textContent)
});

showStats = false;
// Digits from keyboard
document.onkeypress=function(e){
  var e=window.event || e
  if (timerRunning == true) {
    if ((e.charCode >= 48 && e.charCode <= 57) || e.charCode == 35 || e.charCode == 42) {
      var digit = String.fromCharCode(e.charCode);
      pressDTMF(digit);
    }
    else if (e.charCode == 83) {
      callStats();
    }
  }
}

function callStats() {
  if (enableCallStats) {
    if (showStats == false) {
      $("#callStats").fadeIn(1000);
       showStats = true;
     } else if (showStats) {
       $("#callStats").fadeOut(100);
       showStats = false;
     }
  }
}

function compatibilityCheck() {
  var ua = detect.parse(navigator.userAgent);
  var isChrome = /chrom(e|ium)/.test(ua.browser.family.toLowerCase());
  var isFirefox = /firefox/.test(ua.browser.family.toLowerCase());
  
  // Only Chrome 25+ and Firefox 22+ are supported
  if (!isChrome && !isFirefox) {
    return "Chrome or Firefox is required, please go to:<br>" +
    "<a href='http://chrome.google.com'>http://chrome.google.com</a> or <a href='http:www.mozilla.org'>http://www.mozilla.org</a>";
  }
  var major = ua.browser.major;
  if (isChrome && major < 25) {
    return "Your version of Chrome must be upgraded to at least version 25<br>" +
    "Please go to: <a href='http://chrome.google.com'>http://chrome.google.com</a>";
  } else {
    if (isFirefox && major < 22) {
      return "Your version of Firefox must be upgraded to at least version 22y<br>" +
      "Please go to: <a href='http:www.mozilla.org'>http://www.mozilla.org</a>";
    }
    enableStats = false; 
  } 
}

var unsupported = compatibilityCheck();
if(unsupported) {
  $('#unsupported').html(unsupported).show();
}

// Initial function selection
if (enableHD == true & hd == true) {
  $('#settings').click();
}

if (register == true) {
  authPopUp(userid, password);
} else {
  if (!userid) {
    randomUserid();
  }
}

if (destination) {
  hideCallControl = true;
}

onLoad(userid, password);
});
