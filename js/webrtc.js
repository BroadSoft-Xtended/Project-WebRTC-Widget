/***************************************************
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton <nathan@robotics.net>
 *
 * Copyright 2013 Exario Networks
 * http://www.exarionetworks.com
 ***************************************************/

$(document).ready(function()
{

// Default URL variables
var register = (getSearchVariable("register") == "true");
var password = getSearchVariable("password") || $.cookie('settingPassword');
var userid = getSearchVariable("userid") || $.cookie('settingUserid');
var destination = getSearchVariable("destination");
var hd = (getSearchVariable("hd") == "true") || $.cookie('settingHD');
var audioOnly = (getSearchVariable("audioOnly") == "true");
var displayName = $.cookie('settingDisplayName') || getSearchVariable("name").toString().replace("%20"," ");
var maxCallLength = getSearchVariable("maxCallLength");
var hideCallControl = (getSearchVariable("hide") == "true");
var size = getSearchVariable("size") || $.cookie('settingSize') || 1; 

// Client Variables
var soundOut = document.createElement("audio");
soundOut.volume = clientConfig.volumeClick;
var soundOutDTMF = document.createElement("audio");
soundOutDTMF.volume = clientConfig.volumeDTMF;
var timerRunning = false;
disableICE = clientConfig.disableICE;
var transmitVGA = $.cookie('settingTransmitVGA') || clientConfig.transmitVGA;
var transmitHD = $.cookie('settingTransmitHD') || clientConfig.transmitHD;
var currentCallArray = new Array(4);

// Pull the URL variables out of URL
function getSearchVariable(variable)
{
  var search = window.location.search.substring(1);
  var vars = search.split("&");
  for (var i=0;i<vars.length;i++)
  {
    var pair = vars[i].split("=");
    if(pair[0] == variable)
    {
      return pair[1];
    }
  }
  return(false);
}

// Generate a random userid
function randomUserid()
{
  var chars = "0123456789abcdef";
  var string_length = 10;
  var randomstring = '';
  userid = '';
  for (var i=0; i<string_length; i++)
  {
    var rnum = Math.floor(Math.random() * chars.length);
    userid += chars.substring(rnum,rnum+1);
  }
  return(userid);
}

var formatedDuration = "00:00:00";
// Start timer
function startTimer ()
{
  timerRunning = true;
  var startTimer = runningTimer();
  callTimer = setInterval(startTimer, 1000);
  if (clientConfig.enableCallTimer)
  {
    $("#timer").fadeIn(100);
  }
}

// Stop timer
function stopTimer ()
{
  $("#timer").fadeOut(100);
  timerRunning = false;
  clearInterval(callTimer);
}

// Display the timer on the screen
function runningTimer ()
{
  var element = timer, seconds = -1;
  return function ()
  {
    ++seconds;
    var secs = seconds;
    if (maxCallLength && seconds >= maxCallLength)
    {
      rtcSession.terminate();
      endCall();
      return;
    }
    $("#timer").text(formatTimer(secs));
    if (clientConfig.enableCallStats && isChrome)
    {
      processStats();
    }
  }
}

function formatTimer(seconds)
{
  var hrs = Math.floor(seconds / 3600);
  seconds %= 3600;
  var mns = Math.floor(seconds / 60);
  seconds %= 60;
  var formatedDuration = (hrs < 10 ? "0" : "") + hrs + ":" + (mns < 10 ? "0" : "") + mns + ":" + (seconds < 10 ? "0" : "") + seconds;
  return(formatedDuration);
}

// Auth popup
function authPopUp()
{
  if (!userid == false)
  {
    $("#authPopup input#username").val(userid);
  }

  $("#authPopup").keypress(function(e)
  {
    if (e.which == 13)
    {
      $('#authPopupButton').click();
      }
      })

  $("#authPopup").fadeIn(300);
  $('#authPopupButton').click(function()
  {
  var userid = $("#authPopup input#username").val();
  var password = $("#authPopup input#password").val();
  if ($("#authPopup input#displayName").val())
  {
    displayName = $("#authPopup input#displayName").val();
  }
  register=true;
  if (userid == "")
  {
    $("#alert").text("Invalid Username").fadeIn(10).fadeOut(4000);
    return;
  }
  if (password == "")
  {
    $("#alert").text("Invalid Password").fadeIn(10).fadeOut(4000);
    return;
  }
  $("#authPopup").fadeOut(300);
  onLoad(userid, password);
  });
}

function errorPopup(error)
{
  $( "#errorPopup" ).text(error).dialog(
    {
      draggable: true,
      dialogClass: "no-close",
      buttons: 
      [
        {
          text: "OK",
          click: function() 
          {
            $( this ).dialog( "close" );
          }
        }
      ]
    }
  );
}


// Setup the GUI
function guiStart()
{
  // Set size for Chrome and Firefox
  $("#main").css("size", size);
  $("#main").css("-moz-transform", "scale(" + size +")");
  if (($.cookie("settingWindowPosition")))
  {
  var windowPositions = $.cookie("settingWindowPosition").split('|');
  for (var i = 0; i < windowPositions.length; ++i)
  {
    var elementPosition = windowPositions[i].split('-');
    $(elementPosition[0]).css("top", elementPosition[1]);
    $(elementPosition[0]).css("left", elementPosition[2]);
  }
  }
  // Fade in UI elements
  $("#remoteVideo, #videoBar").fadeIn(1000)
  if (clientConfig.enableCallControl && !hideCallControl)
  {
    $("#callControl, #call, #ok").fadeIn(1000);
  }
  if (clientConfig.enableDialpad)
  {
    $("#dialpadIconShow").fadeIn(1000);
  }
  if (clientConfig.enableSelfView)
  {
    if ($.cookie('settingSelfViewDisable') == "true")
    {
      $("#localVideo, #selfViewDisable").fadeOut(100);
      $("#selfViewEnable").fadeIn(1000);
    } 
    else
    {
      $("#selfViewEnable").fadeOut(1000);
      $("#localVideo, #selfViewDisable").fadeIn(1000);
    }
  }
  if (clientConfig.enableSettings)
  {
    $("#settings").fadeIn(1000);
  }
  if (clientConfig.enableFullScreen)
  {
    $("#fullScreenExpand").fadeIn(1000);
  }
}

// Display status messages
function message(text, level)
{
  if(!clientConfig.enableMessages)
  {
    return;
  }
  $("#messages").stop(true, true).fadeOut();
  $("#messages").removeClass("normal success warning alert");
  $("#messages").addClass(level).text(text).fadeIn(10).fadeOut(10000);
}

// Make sure destination allowed and in proper format
function validateDestination (destination)
{
  if (destination.indexOf("sip:") === -1)
  {
    destination = ("sip:" + destination);
  }
  if ((destination.indexOf(clientConfig.domainTo) === -1 ) && clientConfig.allowOutside == false)
  {
    message(clientConfig.messageOutsideDomain, "alert");
    return(false);
  }
  if ((destination.indexOf("@") === -1))
  {
    destination = (destination + "@" + clientConfig.domainTo);
  }
  return(destination); 
}

// 720p constraints
var constraints = {
  mandatory: {
  minWidth: 1280,
  minHeight: 720
  }
}

// PeerConnection constraints
if (hd == true)
{
  var video = constraints;
} 
else if (audioOnly)
{
  var video = false;
} 
else
{
  var video = true;
}

// Options Passed to ExSIP
var options =
{
  mediaConstraints:
  {
    audio: true,
    video: video
  },
  RTCConstraints: {'optional': [],'mandatory': {}},
};

// URL call
function uriCall(destination)
{
  var destination = validateDestination(destination);
  if (destination == false)
  {
    return;
  }

  $('#call').fadeOut(1000);
  $("#hangup").fadeIn(1000);
  message(clientConfig.messageCall, "success");

  // Start the Call
  sipStack.call(destination, options);
}

// Incoming reinvite function
function incomingReInvite(e) {
  var incomingCallName = e.data.request.from.display_name;
  var incomingCallUser = e.data.request.from.uri.user;
  var incomingCall = e.data.request.from.uri;
  var title = e.data.audioAdd ? "Adding Audio" : "Adding Video";
  message(title, "success");
  $("#reInvitePopup").fadeIn(100);
  $("#reInvitePopup .incomingCallName").text(incomingCallName);
  $("#reInvitePopup .incomingCallUser").text(incomingCallUser);
  $("#reInvitePopup .title").text(title);
  $("#acceptReInviteCall").off("click");
  $("#acceptReInviteCall").on("click", function(){
    $('#reInvitePopup').fadeOut(1000);
    e.data.session.acceptReInvite();
  });
  $("#rejectReInviteCall").off("click");
  $("#rejectReInviteCall").on("click", function(){
    $('#reInvitePopup').fadeOut(1000);
    e.data.session.rejectReInvite();
  });
}

// Incoming call function
function incomingCall(e)
{
  var incomingCallName = e.data.request.from.display_name;
  var incomingCallUser = e.data.request.from.uri.user;
  var incomingCall = e.data.request.from.uri;
  message("Incoming Call", "success");
  if (clientConfig.enableAutoAnswer)
  {
    $("#hangup").fadeIn(1000);
    rtcSession.answer(options);
  } 
  else
  {
    $("#callPopup").fadeIn(100);
    $("#callPopup .incomingCallName").text(incomingCallName);
    $("#callPopup .incomingCallUser").text(incomingCallUser);
    soundOut.setAttribute("src", "media/ringtone.ogg");
    soundOut.play();
  }
}

function endCall()
{
  updateSessionStreams(rtcSession);
  rtcSession = null;
  $("#hangup, #muteAudio").fadeOut(100);
  isMuted = false;
  // Bring up the main elements
  if (clientConfig.enableCallControl == true)
  {
    hideCallControl = false;
  }
  guiStart();
  if (timerRunning == true)
  {
    stopTimer();
  }
  if (!clientConfig.endCallURL == false)
  {
    window.location = clientConfig.endCallURL;
  }
}

function processStats()
{
  RTCPeerConnection = rtcSession.rtcMediaHandler.peerConnection;
  RTCPeerConnection.getStats(function (stats)
  {
    var videoPacketLoss = 0;
    var audioPacketLoss = 0
    var results = stats.result();
    var reports = [];
    for (var i = 0; i < results.length; ++i)
    {
      var res = results[i];
      var report = getReportById(reports, res.id);
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
    var data = {"lid":1,"pid":getSessionId(),"reports":reports};
    addStats(data);
  });
}

function getReportById(reports, id)
{
  for(var i = 0; i < reports.length; i++)
  {
    if(reports[i].id == id)
    {
      return reports[i];
    }
  }
  return null;
}

function getStatsValue(reports, attribute)
{
  for(var i = 0; i < reports.length; i++)
  {
    var values = reports[i].stats.values;
    for(var j = 0; j < values.length; j++)
    {
      if(values[j] == attribute)
      {
        return values[j+1];
      }
    }
  }
  return null;
}

function setCookie()
{
  if (!clientConfig.enableCallHistory)
  {
    return;
  }
  // Get latest cookie
  var allCookies = document.cookie;
  var callsArray = allCookies.match(/call_(.*?)\:\d{2}\:\d{2}/g);
  if (callsArray)
  {
    var callNumber = callsArray.length + 1;
  }
  else
  {
    callNumber = 0;
  }
  callNumber++;

  // cookie vars
  var start = rtcSession.start_time;
  var epochStart = new Date(start).getTime();
  var end = rtcSession.end_time;
  var length = formatTimer(Math.round(Math.abs((rtcSession.end_time - start) / 1000)));
  var remote = rtcSession.remote_identity.uri; 
  if (rtcSession.direction == "outgoing")
  {
    var direction = "------>";
  }
  else
  {
    var direction = "<------";
  }
  var cookieKey = ("call_" + callNumber);
  var cookieValue = (epochStart + "|" + remote + "|" + direction + "|" + length);
  $.cookie(cookieKey, cookieValue, { expires: clientConfig.expires});	
}

var page = 1;
function showHistory(page) 
{
  var allCookies = document.cookie;
  var callsArray = allCookies.match(/call_(.*?)\:\d{2}\:\d{2}/g);
  var callsOnPage = 10;
  if (callsArray)
  {
    var baseIndex = (callsArray.length - callsOnPage*page);
    if (baseIndex >= 1)
    {
      $('#historyForward').fadeIn(100);
    } 
    else
    {
      $('#historyForward').fadeOut(10);
    }
    if (page > 1)
    {
      $('#historyBack').fadeIn(100);
    }
    else
    {
      $('#historyBack').fadeOut(10);
    }
    if (callsOnPage > callsArray.length - baseIndex)
    {
      callsOnPage = callsArray.length - baseIndex;
    }
    for(var i = 0; i < callsOnPage && baseIndex + i < callsArray.length && i < callsOnPage; i ++)
    {
      if ((baseIndex + callsOnPage - i) > 0)
      {
        key = callsArray[(baseIndex + callsOnPage - i)-1].split('=')[0];
        value = callsArray[(baseIndex + callsOnPage - i)-1].split('=')[1];

        // Parse out call info
        var tempDate = new Date();
        var callArray = value.split('|');
        var destination = callArray[1];
        var historyDirection = callArray[2];
        var historyLength = callArray[3];
        tempDate.setTime(callArray[0]);
        var historyDate = tempDate.toLocaleString();
        var historyDestination = destination.replace(/sip:([^@]+)@.+/,"$1");
        var historyCall = key.replace(/^\D*(\d+)$/,"$1");

        // Display Call History
        $("#row" + i + " .historyCall").text(historyCall);
        $("#row" + i + " .historyDestination").text(historyDestination);
        $("#row" + i + " .historyDirection").text(historyDirection);
        $("#row" + i + " .historyDate").text(historyDate);
        $("#row" + i + " .historyLength").text(historyLength);
      } 
      else
      {
        // Balnk any remaining lines
        $("#row" + i + " .historyCall").text("");
        $("#row" + i + " .historyDestination").text("");
        $("#row" + i + " .historyDirection").text("");
        $("#row" + i + " .historyDate").text("");
        $("#row" + i + " .historyLength").text("");
      }
    }
  }
}

// Initial startup
function onLoad(userid, password)
{
  // Config settings
  if ((userid.indexOf("@") === -1))
  {
    var sip_uri = (userid + "@" + clientConfig.domainFrom);
  }
  else
  {
    var sip_uri = userid;
  }
  var config  =
  {
    'uri': sip_uri,
    'ws_servers': clientConfig.websocketsType + "://" + clientConfig.websocketsGateway + ":" + clientConfig.websocketsPort,
    'stun_servers': 'stun:' + clientConfig.stunServer + ':' + clientConfig.stunPort,
    'trace_sip': clientConfig.debug,
  };

  // Add Display Name if set
  if (displayName.indexOf("false") === -1)
  {
    config.display_name = displayName
  }

  // Modify config object based password
  if (password == false || password === undefined)
  {
    config.register = false
  } 
  else
  {
    config.register = true,
      config.password = password
  }

  // SIP stack
  sipStack = new ExSIP.UA(config);

  updateRtcMediaHandlerOptions();

  // Start SIP Stack
  sipStack.start();

    // Start the GUI
  guiStart();

  // sipStack callbacks 
  sipStack.on('connected', function(e)
  {
    if (clientConfig.enableConnectionIcon)
    {
      $("#connected").removeClass("alert");
      $("#connected").addClass("success").fadeIn(10).fadeOut(3000);
    }
    if (clientConfig.enableCallControl && !hideCallControl)
    {
      $("#call").fadeIn(1000);
    }
    message(clientConfig.messageConnected, "success");

    if(clientConfig.enableConnectLocalMedia) {
      // Connect to local stream
      sipStack.getUserMedia(options, function(localStream){
        updateStreams([localStream], []);
        // Start a call
        if (!destination == false)
        {
          uriCall(destination);
        }
      });
    }
  });
  sipStack.on('disconnected', function(e)
  {
    if (clientConfig.enableConnectionIcon)
    {
      $("#connected").removeClass("success");
      $("#connected").addClass("alert").fadeIn(100);
    }
    message(clientConfig.messageConnectionFailed, "alert");
    endCall();
    $("#call").hide();
  });
  sipStack.on('onReInvite', function(e) {
    incomingReInvite(e);
  });
  sipStack.on('newRTCSession', function(e)
  {
    rtcSession = e.data.session;

    // call event handlers
    rtcSession.on('progress', function(e)
    {
      message(clientConfig.messageProgress, "normal");
      soundOut.setAttribute("src", "media/dtmf-ringback.ogg");
      soundOut.play();
    });
    rtcSession.on('failed', function(e)
    {
      var error = e.data.cause;
      message(error, "alert");
      if (error == "User Denied Media Access")
      {
        errorPopup("WebRTC was not able to access your camera!");
      }
      soundOut.pause();
      endCall();
    });
    rtcSession.on('started', function(e)
    {
      updateSessionStreams(rtcSession);
      $('.stats-container').attr('id', getSessionId()+'-1');
      soundOut.pause();
      startTimer();
      message(clientConfig.messageStarted, "success");
      if (clientConfig.enableMute)
      {
        $("#muteAudio").fadeIn(1000);
      }
    });
    rtcSession.on('ended', function(e)
    {
      message(clientConfig.messageEnded, "normal");
      setCookie();
      endCall();
    });
    // handle incoming call
    if (e.data.session.direction == "incoming")
    {
      incomingCall(e);
    }
  });
  if(!clientConfig.enableConnectLocalMedia) {
    if (!destination == false) {
      // Wait 300 ms for websockets connection then call destination in URL
      setTimeout(function(){uriCall(destination)},300);
    }
  }

  // Registration callbacks only if registering
  if (!password == false)
  {
    sipStack.on('registered', function(e)
    {
      if (clientConfig.enableRegistrationIcon)
      {
         $("#registered").removeClass("alert");
         $("#registered").addClass("success").fadeIn(10).fadeOut(3000);
      }
      message(clientConfig.messageRegistered, "success");
    });
    sipStack.on('registrationFailed', function(e)
    {
      if (clientConfig.enableRegistrationIcon)
      {
        //$("#registered").removeClass("success");
        $("#registered").addClass("alert").fadeIn(100);
        }
        message(clientConfig.messageRegistrationFailed, "alert");
        });
  }
}

function updateSessionStreams(rtcSession) {
  updateStreams(rtcSession.getLocalStreams(), rtcSession.getRemoteStreams());
}

function updateStreams(localStreams, remoteStreams) {
  var selfView = document.getElementById("localVideo");
  var remoteView = document.getElementById("remoteVideo");
  console.log("update streams with remoteStreams : "+ExSIP.Utils.toString(remoteStreams)+", and localStreams : "+ExSIP.Utils.toString(localStreams));
  if ( localStreams.length > 0 && !localStreams[0].ended)
  {
    selfView.src = window.URL.createObjectURL(localStreams[0]);
  } else {
    selfView.src = "";
  }

  if ( remoteStreams.length > 0 && !remoteStreams[0].ended)
  {
    remoteView.src = window.URL.createObjectURL(remoteStreams[0]);
  } else {
    remoteView.src = "";
  }
}

mainDestination = $("#callControl input#destination");
// What we do when we get a digit during a call
function pressDTMF (digit)
{
  if (digit.length != 1)
  {
    return;
  }
  if (timerRunning == true)
  {
    if (digit == "*")
    {
      file = "star";
    } 
    else if (digit == "#")
    {
      file = "pound";
    } 
    else
    {
      file = digit;
    }
    soundOutDTMF.setAttribute("src", "media/dtmf-" + file + ".ogg");
    soundOutDTMF.play();
    mainDestination.val(mainDestination.val() + digit);
    if (timerRunning == true)
    {
      rtcSession.sendDTMF(digit, options=null);
    }
  }
}

// Allow some windows to be draggable, required jQuery.UI
if (clientConfig.enableWindowDrag)
{
  $(function()
  {
    $("#localVideo").draggable();
    $("#callStats").draggable();
    $("#callHistory").draggable();
  });
}

// Buttons
$('#call').bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();	
  var destination = mainDestination.val();
  if (destination == "")
  {
    message(clientConfig.messageEmptyDestination, "alert");
  } 
  else
  {
    uriCall(destination);
  }
});

$('#hangup').bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  rtcSession.terminate();
  if (fullScreen == true)
  {
    $('#fullScreenContract').click();
  }
});

var fullScreen = false;
$('#fullScreenExpand').bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  video.webkitRequestFullScreen();
  fullScreen = true;
});

$('#fullScreenContract').bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  document.webkitCancelFullScreen();
  fullScreen = false;
  $("#fullScreenContract").fadeOut(100);
  $("#fullScreenExpand").fadeIn(1000);
});

$('#selfViewDisable').bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  $("#localVideo, #selfViewDisable").fadeOut(100);
  $("#selfViewEnable").fadeIn(1000);
});

$('#selfViewEnable').bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  $("#selfViewEnable").fadeOut(1000);
  $("#localVideo, #selfViewDisable").fadeIn(1000);
});

$('#muteAudio').bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  localMedia = rtcSession.getLocalStreams()[0];
  localAudio = localMedia.getAudioTracks()[0];
  localAudio.clientConfig.enabled = false;
  $("#muteAudio").fadeOut(1000);
  $("#unmuteAudio").fadeIn(1000);
});

$('#unmuteAudio').bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  localAudio.clientConfig.enabled = true;
  $("#unmuteAudio").fadeOut(1000);
  $("#muteAudio").fadeIn(1000);
});

$('#dialpadIconShow').bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  $("#dialIconpadShow").fadeOut(1000);
  $("#dialpad, #dialpadIconHide").fadeIn(1000);
});

$('#dialpadIconHide').bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  $("#dialpad, #dialpadIconHide").fadeOut(1000);
  $("#dialpadIconShow").fadeIn(1000);
});

var settingsToggled = false;
$("#settings").bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  if (settingsToggled == false)
  {
    if (!(displayName == "false"))
    {
      $("#settingDisplayName").val(displayName);
    }
    $("#settingUserid").val(userid);
    $("#settingPassword").val(password);
    $("#settingSelfViewDisable").prop('checked', ($.cookie('settingSelfViewDisable') == "true"));
    $("#settingHD").prop('checked', ($.cookie('settingHD') == "true"));
    $("#settingTransmitVGA").val($.cookie('settingTransmitVGA') || transmitVGA);
    $("#settingTransmitHD").val($.cookie('settingTransmitHDSetting') || transmitHD);
    $("#settingSize").val($.cookie('settingSize') || size);
    $("#settingAutoAnswer").prop('checked', ($.cookie('settingAutoAnswer') == "true") || clientConfig.enableAutoAnswer );
    if ($("#localVideo").position().top != 0 && $("#localVideo").position().left != 0)
    {
      $("#settingLocalVideoTop").val($("#localVideo").position().top);
      $("#settingLocalVideoLeft").val($("#localVideo").position().left);
    }
    if ($("#callHistory").position().top != 0 && $("#callHistory").position().left != 0)
    {
      $("#settingCallHistoryTop").val($("#callHistory").position().top);
      $("#settingCallHistoryLeft").val($("#callHistory").position().left);
    }
    if ($("#callStats").position().top != 0 && $("#callStats").position().left != 0)
    {
      $("#settingCallStatsTop").val($("#callStats").position().top);
      $("#settingCallStatsLeft").val($("#callStats").position().left);
    } 
    $("#settingsPopup").fadeIn(1000);
  }
  else if (settingsToggled == true)
  {
    $("#settingsPopup").fadeOut(100);
  }
  settingsToggled = !settingsToggled;
});

$("#saveSettings").bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  $.cookie("settingDisplayName", ($("#settingDisplayName").val()), { expires: clientConfig.expires });
  $.cookie("settingUserid", ($("#settingUserid").val()),  { expires: clientConfig.expires });
  $.cookie("settingPassword", ($("#settingPassword").val()), { expires: clientConfig.expires });
  $.cookie("settingSelfViewDisable", ($("#settingSelfViewDisable").prop('checked')), { expires: clientConfig.expires });
  $.cookie("settingHD", ($("#settingHD").prop('checked')), { expires: clientConfig.expires });
  $.cookie("settingTransmitVGA", ($("#settingTransmitVGA").val()), { expires: clientConfig.expires });
  $.cookie("settingTransmitHD", ($("#settingTransmitHD").val()), { expires: clientConfig.expires });
  $.cookie("settingTransmitHD", ($("#settingTransmitHD").val()), { expires: clientConfig.expires });
  $.cookie("settingSize", ($("#settingSize").val()), { expires: clientConfig.expires });
  $.cookie("settingAutoAnswer", ($("#settingAutoAnswer").prop('checked')), { expires: clientConfig.expires });
  $.cookie("settingWindowPosition", "#localVideo" + "-" + $("#settingLocalVideoTop").val() + "-" + $("#settingLocalVideoLeft").val() + "|" +
                                    "#callHistory" + "-" + $("#settingCallHistoryTop").val() + "-" + $("#settingCallHistoryLeft").val() + "|" +
                                    "#callStats" + "-" + $("#settingCallStatsTop").val() + "-" + $("#settingCallStatsLeft").val())
  $("#settingsPopup").fadeOut(100);
  location.reload(0);
});

$("#historyClose").bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  toggleHistory();
});

$("#historyForward").bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  page = page +1;
  showHistory(page);
});

$("#historyBack").bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  page = page -1;
  showHistory(page);
});

$('#acceptIncomingCall, #rejectIncomingCall').bind('click', function(e)
{
  e.preventDefault();
  $("#callPopup").fadeOut(500);
  soundOut.pause();
  if (this.id == "acceptIncomingCall")
  {
    $('#call').fadeOut(1000);
    $("#hangup").fadeIn(1000);
    rtcSession.answer(options);
  }
  else if (this.id == "rejectIncomingCall")
  {
    rtcSession.terminate();
  }
});

var statsToggled = false;
function toggleStats ()
{
  if (clientConfig.enableCallStats)
  {
    if (statsToggled == false)
    {
      $("#callStats").fadeIn(100);
     } 
     else if (statsToggled == true)
     {
       $("#callStats").fadeOut(100);
     }
  }
  statsToggled = !statsToggled;
}

function getSessionId ()
{
  return rtcSession.id.replace(/\./g,'');
}

var historyToggled = false;
function toggleHistory ()
{
  if (clientConfig.enableCallHistory == true)
  {
    if (historyToggled == false)
    {
      $("#callHistory, #historyClear").fadeIn(100);
      showHistory(1);
    } 
    else if (historyToggled == true)
    {
      $("#callHistory, #historyClear").fadeOut(100);
    }
  }
  historyToggled = !historyToggled;
}

$("#callHistory").bind('click', function(e)
{
  var clicked = (e.target.innerText)
  var callID = (e.target.parentElement.firstElementChild.firstChild.nodeValue);
});

$("#historyClear").bind('click', function(e)
{
  e.preventDefault();
  soundOut.setAttribute("src", "media/click.ogg");
  soundOut.play();
  var allCookies = document.cookie;
  var callsArray = allCookies.match(/call_(.*?)\:\d{2}\:\d{2}/g);
  for (var i = 0; i < callsArray.length; i++)
  {
    $.removeCookie("call_" + (i));
  }
  showHistory(1);
});

// Dialpad digits
$("#dialpad").bind('click', function(e)
{
  pressDTMF(e.target.textContent)
});

// Digits from keyboard
document.onkeypress=function(e)
{
  var e=window.event || e
  if ((e.charCode >= 48 && e.charCode <= 57) || e.charCode == 35 || e.charCode == 42)
  {
    var digit = String.fromCharCode(e.charCode);
    pressDTMF(digit);
  }
  else if (e.charCode == 83)
  {
    toggleStats();
  }
  else if (e.charCode == 72)
  {
    toggleHistory();
  }
}

function updateRtcMediaHandlerOptions(){
    if(typeof(sipStack) == 'undefined') {
      return;
    }

    var options = {reuseLocalMedia: clientConfig.enableConnectLocalMedia};
    if (clientConfig.enableHD == true & hd == true)
    {
      options["videoBandwidth"] = transmitHD;
    }
    else
    {
      options["videoBandwidth"] = transmitVGA;
    }
    options["disableICE"] = disableICE;

    sipStack.setRtcMediaHandlerOptions(options);
}

function compatibilityCheck()
{
  var ua = detect.parse(navigator.userAgent);
  isChrome = /chrom(e|ium)/.test(ua.browser.family.toLowerCase());
  isFirefox = /firefox/.test(ua.browser.family.toLowerCase());

  // Only Chrome 25+ and Firefox 22+ are supported
  if (!isChrome && !isFirefox)
  {
    return "Chrome or Firefox is required, please go to:<br>" +
      "<a href='http://chrome.google.com'>http://chrome.google.com</a> or <a href='http:www.mozilla.org'>http://www.mozilla.org</a>";
  }
  var major = ua.browser.major;
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
        "Please go to: <a href='http:www.mozilla.org'>http://www.mozilla.org</a>";
    }
    clientConfig.enableStats = false; 
  } 
}

var unsupported = compatibilityCheck();
if(unsupported)
{
  $('#unsupported').html(unsupported).show();
}

// Initial function selection
if (clientConfig.enableHD == true & hd == true)
{
  $("*").addClass("hd");
}

if (register == true && !password)
{
  authPopUp(userid, password);
} 
else
{
  if (!userid)
  {
    randomUserid();
  }
}

if (destination)
{
  hideCallControl = true;
}

$.cookie.raw = true;

window.onbeforeunload = function(e) {
  if (timerRunning)
  {
    rtcSession.terminate();
  }
  endCall();
  return null;
}

onLoad(userid, password);

});
