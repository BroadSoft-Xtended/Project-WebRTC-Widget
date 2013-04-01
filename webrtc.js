/***************************************************
 * webrtc.js
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton <nathan@robotics.net>
 *
 * Copyright 2013 Exario Networks
 * 
 * JsSIP library is MIT-license code: 
 * http://www.opensource.org/licenses/mit-license.php
 ***************************************************/
$(document).ready(function() {

// Default URL variables
var userid = getSearchVariable("userid");
register = (getSearchVariable("register") == "true");
destination = getSearchVariable("destination");
hd = (getSearchVariable("hd") == "true"); 
currentCallArray = new Array(4);
password = false;
mainDestination = $("#main input#destination");
soundOut = document.createElement("audio");
soundOut.volume = .05;
timerRunning = false;
formatedDuration = "00:00:00";

// Make it eaiser to pull variables from URL
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


// Start timer
function startTimer () {
	timerRunning = true;
	var startTimer = showTimer();
	callTimer = setInterval(startTimer, 1000);
	$("#timer").fadeIn(100);
}

// Stop timer
function stopTimer () {
	$("#timer").fadeOut(100);
	timerRunning = false;
	clearInterval(callTimer);
}

// Display the timer on the screen
function showTimer () {
	var element = timer, seconds = -1;
	return function () {
		++seconds;
      var secs = seconds;
      var hrs = Math.floor(secs / 3600);
      secs %= 3600;
      var mns = Math.floor(secs / 60);
      secs %= 60;
      formatedDuration = (hrs < 10 ? "0" : "") + hrs + ":" + (mns < 10 ? "0" : "") + mns + ":" + (secs < 10 ? "0" : "") + secs;
      $("#timer").text(formatedDuration);
  }
}

// Auth popup
function authPopUp() {
	if (!userid==false) {
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
		onLoad(userid, false, password);
		guiStart(userid, password);
	});;
}

// Display status messages
function message(text, level) {
	$("#messages").stop(true, true);
	$("#messages").removeClass("normal success warning alert");
	$("#messages").toggleClass(level).text(text).fadeIn(10).fadeOut(10000);
}

// Make sure destination has proper format
function validateDestination (destination) {
	var domain = "204.117.64.121";
	if (destination.indexOf("sip:") === -1) {
		destination = ("sip:" + destination);
	}
	if ((destination.indexOf("@") === -1)) {
		destination = (destination + "@" + domain);
	}
	return(destination); 
}

// URL call
function uriCall(destination) {
	var destination = validateDestination(destination);

	var constraints = {
		mandatory: {
			minWidth: 1280,
			minHeight: 720
		}
	}

	if (hd == true) {
		var video = constraints;
	} else {
		var video = true;
	}

  var eventHandlers = {
	  'progress': function(e) {
		  message("Progressing", "normal");
	  },

	  'failed': function(e) {
		  message(e.data.cause, "alert");	
		  endCall();
	  },

	  'started': function(e) {
		  var localStreams, remoteStreams;
      rtcSession = e.sender;
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
		  startTimer();
		  message("Call Started", "success");
      $("#muteAudio").fadeIn(1000);
	  },

    'ended': function(e) {
		message("Call Ended", "normal");
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
	
  console.log(options); 
        
	var selfView = document.getElementById("localVideo");
	var remoteView = document.getElementById("remoteVideo");
	
	$("#hangup").fadeIn(1000);
	setCookie("new", destination, ">");
	
	// Start the Call
	sipStack.call(destination, options);
  message("Performing NAT Tests", "success");
}

function guiStart(userid) {
	$("#main, #localVideo, #remoteVideo, #selfView, #fullScreen").fadeIn(1000);
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
	$("#main, #callButton, #localVideo, #remoteVideo, #selfView, #fullScreen").fadeIn(1000);
	if (timerRunning == true) {
		stopTimer();
	}
}

// Store call stats in array, then in cookie on update
function setCookie(type, remoteParty, direction) {
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
function onLoad(userid, destination, password) {
	// Config settings
	var sip_uri = (userid + '@exarionetworks.com');
	var config  = {
		'uri': sip_uri,
		'ws_servers': 'ws://proxy.exarionetworks.com:8060',
		'stun_servers': 'stun:204.117.64.117',
		'trace_sip': true,
		'hack_via_tcp': true,
	};

	// Modify config object based password
	if (password == false) {
		config.register = false;
	} else {
		config.register = true;
		config.password = password;
	}
	
	// SIP stack
	sipStack = new JsSIP.UA(config);

  // Start SIP Stack
  $("#connected").toggleClass("alert").fadeIn(10);
  sipStack.start();
	
	// If there is not a destination in URL start the GUI
	if(destination==false) {
		guiStart(userid);
	}
	
	// sipStack callbacks 
	sipStack.on('connected', function(e) {
		$("#connected").removeClass("alert");
		$("#connected").toggleClass("success").fadeIn(1000);
    $("#callButton").fadeIn(1000);
		message("Connected", "success");
		if (!destination==false & register==false) {
			$("#localVideo, #remoteVideo, #selfView, #fullScreen").fadeIn(1000);
			urlCall(destination);
		}
	});
	sipStack.on('disconnected', function(e) {
		$("#connected").removeClass("success");
    $("#connected").toggleClass("alert").fadeIn(1000);
    endCall();
    $("#callButton").fadeOut(100);
	});
  sipStack.on('newRTCSession', function(e) {
		if (e.data.session.direction == "incoming") {
			incommingCall(e);
		}
	});

	if (!password == false) {
		sipStack.on('registered', function(e) {
		$("#registered").removeClass("alert");
    $("#registered").toggleClass("success").fadeIn(1000);
		if (!destination==false) {
			urlCall(destination);
			}
		});
		sipStack.on('registrationFailed', function(e) {
		$("#registered").removeClass("success");
    $("#registered").toggleClass("alert").fadeIn(1000);
		});
	}
}

// Incoming call function
function incommingCall(message) {
	console.log(message);
	console.log(message.data.session.request.from.uri);
	console.log(message.data.session);
}

// What we do when we get a digit
function pressDTMF (digit) {
  dtmfOut = document.createElement("audio");
  dtmfOut.volume = 1;
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
  dtmfOut.setAttribute("src", "dtmf-" + file + ".ogg");
  dtmfOut.play();
	console.log("digit=" + digit);
  mainDestination.val(mainDestination.val() + digit);
	if (timerRunning == true) {
    rtcSession.sendDTMF(digit, options=null);
  }
}

// Allow the local video window to be draggable, required jQuery.UI
$(function() {
	$("#localVideo").draggable();
});

// Buttons
selfView = true;
$('#selfView').bind('click', function(e) {
	e.preventDefault();
	soundOut.setAttribute("src", "click.ogg");
	soundOut.play();
	if (selfView == true) {
		$("#localVideo").fadeOut(100);
		selfView = false;
	} else if (selfView == false) {
		$("#localVideo").fadeIn(100);
		selfView = true;
	}
});

$('#callButton').click(function() {	
	soundOut.setAttribute("src", "click.ogg");
	soundOut.play();	
	var destination = mainDestination.val();
	if (destination == "") {
		message("Invalid Number", "alert");
	} else {
		$('button#callButton.button').fadeOut(1000);
		uriCall(destination);
	}
});

dialpad = false;
$('#dialpadToggle').bind('click', function(e) {
	e.preventDefault();
	soundOut.setAttribute("src", "click.ogg");
	soundOut.play();
	if (dialpad == true) {
		$("#dialpad").fadeOut(100);
		dialpad = false;
	} else if (dialpad == false) {
		$("#dialpad").fadeIn(100);
		dialpad = true;
	}
});

$("#settings").bind('click', function(e) {
	e.preventDefault();
	soundOut.setAttribute("src", "click.ogg");
	soundOut.play();
	if (hd == true) {
		$("#localVideo, #remoteVideo, #selfView, #fullScreen, #muteAudio, #hangup, #messages, #timer").removeClass("hd");
		hd = false;
	} else if (hd == false) {
		$("#localVideo, #remoteVideo, #selfView, #fullScreen, #muteAudio, #hangup, #messages, #timer").addClass("hd");
	hd = true;
	}   
});

$('#hangup').bind('click', function(e) {
	e.preventDefault();
	soundOut.setAttribute("src", "click.ogg");
	soundOut.play();
	rtcSession.terminate();
	setCookie("update", false, false);
	endCall();
	if (fullScreen == true) {
		$('#fullScreen').click();
	}
});

historyPressed = false;
$('#historyToggle').bind('click', function(e) {
	e.preventDefault();
	soundOut.setAttribute("src", "click.ogg");
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

fullScreen = false;
$('#fullScreen').bind('click', function(e) {
	e.preventDefault();
	soundOut.setAttribute("src", "click.ogg");
	soundOut.play();
	if (fullScreen == true) {
		document.webkitCancelFullScreen();
		fullScreen = false;
	} else if (fullScreen == false) {
		video.webkitRequestFullScreen();
		fullScreen = true;
	}
});

isMuted = false;
$('#muteAudio').bind('click', function(e) {
  e.preventDefault();
  soundOut.setAttribute("src", "click.ogg");
  soundOut.play();
  local_media = rtcSession.getLocalStreams()[0];
  local_audio = local_media.getAudioTracks()[0];
    if (isMuted) {
      $("#muteAudio a.icon").removeClass("groupD");
      isMuted = false;
      local_audio.enabled = true;
    } else if (isMuted == false) {
      $("#muteAudio a.icon").addClass("groupD");
      isMuted = true;
      local_audio.enabled = false;
    }
});

$("#historyClear").bind('click', function(e) {
	e.preventDefault();
	soundOut.setAttribute("src", "click.ogg");
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

// Digits from keyboard
document.onkeypress=function(e){
	var e=window.event || e
	if ((e.charCode >= 48 && e.charCode <= 57) || e.charCode == 35 || e.charCode == 42) {
		var digit = String.fromCharCode(e.charCode);
	}
	if (timerRunning == true) {
		pressDTMF(digit);
	}
}

// Initial function selection
if (hd == true) {
	$("#localVideo, #remoteVideo, #selfView, #fullScreen, #hangup, #messages, #timer").addClass("hd");
}

if (!userid == false & register == false) {
	password = false;
	onLoad(userid, destination, password);
} else {
	authPopUp(userid, password);
}

});
