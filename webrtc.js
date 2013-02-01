/***************************************************
 * webrtc.js
 * Created on Mon Jan 14 15:32:43 GMT 2013 by nathan
 *
 * $Author$
 * $Rev$
 * $Date$
 ***************************************************/
$(document).ready(function() {

// Default URL variables
var userid = getSearchVariable("userid");
register = (getSearchVariable("register") == "true");
destination = getSearchVariable("destination");
hd = (getSearchVariable("hd") == "true"); 
currentCallArray = new Array(5);
password = false;
main_destination = $("#main input#destination");
soundOut = document.createElement("audio");
soundOut.volume = 1;
firstDigit = true;
timer_running = false;

// Make it eaiser to pull variables from URL
function getSearchVariable(variable) {
       var search = window.location.search.substring(1);
       var vars = search.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


// Start timer
function startTimer () {
	timmer_running = true;
	var startTimer = showTimer();
	call_timer = setInterval(startTimer, 1000);
	$("#timer").fadeIn(100);
}

// Stop timer
function stopTimer () {
	$("#timer").fadeOut(100);
	clearInterval(call_timer);
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
	};
}

// Auth popup
function authPopUp() {
	if (!userid==false) {
		$("#auth-popup input#username").val(userid);
	}
	
	$("#auth-popup").keypress(function(e) {
		if (e.which == 13) {
			$('#auth-popup_button').click();
		}
	})
	
	$("#auth-popup").fadeIn(300);
	$('#auth-popup_button').click(function() {
		var userid = $("#auth-popup input#username").val();
		var password = $("#auth-popup input#password").val();
		register=true;
		if (userid == "") {
			$("#alert").text("Invalid Username").fadeIn(10).fadeOut(4000);
			return;
		}
		if (password == "") {
			$("#alert").text("Invalid Password").fadeIn(10).fadeOut(4000);
			return;
		}
		$("#auth-popup").fadeOut(300);
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
	var domain = "cbridge1.exarionetworks.com";
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
	sipSession = new JsSIP.Session(sipStack);

	var constraints = {
		mandatory: {
			minWidth: 1280,
			minHeight: 720
		}
	};

	if (hd == true) {
		var video = constraints;
	} else {
		var video = true;
	}

    var options = {
        mediaType: {
            audio: true,
            video: video
        },
        views: {
            selfView: document.getElementById("local-video"),
            remoteView: document.getElementById("remote-video")
        }
	};
	
	$("#hangup").fadeIn(1000);
	setCookie("new", destination, ">");
	
	// Start the Call
	sipSession.connect(destination, options);

	// Session event handlers
	sipSession.on('connecting', function(e) {
		message("Connecting", "normal");
	});
	sipSession.on('progress', function(e) {
		message("Progressing", "normal");
	});
	sipSession.on('failed', function(e) {
		var sip_reason = e.data.response.reason_phrase;
		if (sip_reason == null) {
			message("Call Failed", "alert");	
		} else {
			message(sip_reason, "alert");
		}
		endCall();
	});
	sipSession.on('started', function(e) {
		startTimer();
		message("Call Started", "success");
	});
	sipSession.on('ended', function(e) {
		message("Call Ended", "normal");
		endCall();
	});
}

function guiStart(userid) {
	$("#main, #local-video, #remote-video, #self-view, #full-screen").fadeIn(1000);
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
			var history_direction = callArray[2];
			var history_status = callArray[3];
			var history_length = callArray[4];
			var history_date = tempDate.toUTCString(callArray[0]);
			var history_destination = destination.replace(/sip:([^@]+)@.+/,"$1");
			var history_call = key.replace(/^\D*(\d+)$/,"$1");

			// Display Call History
			$("#row" + i + " .history_call").text(history_call);
			$("#row" + i + " .history_destination").text(history_destination);
			$("#row" + i + " .history_direction").text(history_direction);
			$("#row" + i + " .history_status").text(history_status);
			$("#row" + i + " .history_date").text(history_date);
			$("#row" + i + " .history_length").text(history_length);
		}
	}
}

function endCall() {
	$("#hangup").fadeOut(100);
	// Clear last image from video tags
	$("#local-video").removeAttr("src");
	$("#remote-video").removeAttr("src");
	// Bring up the main elements
	$("#main, #call_button, #local-video, #remote-video, #self-view, #full-screen").fadeIn(1000);
	if (timer_running == true) {
		stopTimer
	}
}

// Store call stats in array, then in cookie on update
function setCookie(type, remoteParty, direction, state) {
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
		var cookie_key = ("call_" + callNumber + "=" + currentCallArray[1]);
		var cookie_expires = ("expires=" + timestamp.toUTCString());

		var cookieValue = (cookie_key + "|" + currentCallArray[2] + "|" + currentCallArray[3] + "|" + state + "|" + formatedDuration + "|" + cookie_expires);
		document.cookie = cookieValue;	
	}
	
}

// Initial startup
function onLoad(userid, destination, password) {
	// Config settings
	var sip_uri = (userid + '@exarionetworks.com');
	var config  = {
		'uri': sip_uri,
		'outbound_proxy_set': 'ws://proxy.exarionetworks.com:8060',
		'stun_server': 'stun:stun.stunprotocol.org',
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
	sipStack.start();
	
	// If there is not a destination in URL start the GUI
	if(destination==false) {
		guiStart(userid);
	}
	
	// sipStack callbacks 
	sipStack.on('connected', function(e) {
		$('#connected_red').fadeOut(100);
		$('#connected_green').fadeIn(1000);
		message("Connected", "success");
		if (!destination==false & register==false) {
			$("#local-video, #remote-video, #self-view, #full-screen").fadeIn(1000);
			url_call(destination);
		}
	});
	sipStack.on('disconnected', function(e) {
		$('#connected_red').fadeIn(1000);
		});
	sipStack.on('newSession', function(e) {
		if (e.data.session.direction == "incoming") {
			incommingCall(e);
		}
	});
	if (!password == false) {
		sipStack.on('registered', function(e) {
		$('#registered_green').fadeIn(1000);
		if (!destination==false) {
			url_call(destination);
			}
		});
		sipStack.on('registrationFailed', function(e) {
		$('#registered_red').fadeIn(1000);
		});
	};
}

// Incoming call function
function incommingCall(message) {
	console.log(message);
	console.log(message.data.session.request.from.uri);
	console.log(message.data.session);
}

// Allow the local video window to be draggable, required jQuery.UI
$(function() {
	$("#local-video").draggable();
});

// Buttons
selfView = true;
$('#self-view').bind('click', function(e) {
	e.preventDefault();
	soundOut.setAttribute("src", "click.ogg");
    soundOut.play();
	if (selfView == true) {
		$("#local-video").fadeOut(100);
		selfView = false;
	} else if (selfView == false) {
		$("#local-video").fadeIn(100);
		selfView = true;
	}
});

$('#call_button').click(function() {	
	soundOut.setAttribute("src", "click.ogg");
    soundOut.play();	
	var destination = main_destination.val();
	if (destination == "") {
		message("Invalid Number", "alert");
	} else {
		$('button#call_button.button').fadeOut(1000);
		uriCall(destination);
	}
});

dialpad = false;
$('#dialpad-toggle').bind('click', function(e) {
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
    	$("#local-video, #remote-video, #self-view, #full-screen, #hangup, #messages, #timer").removeClass("hd");
    	history = false;
    } else if (history == false) {
    	$("#local-video, #remote-video, #self-view, #full-screen, #hangup, #messages, #timer").addClass("hd");
    	hd = true;
    }   
});

$('#hangup').bind('click', function(e) {
	e.preventDefault();
	soundOut.setAttribute("src", "click.ogg");
    soundOut.play();
	sipSession.terminate();
	setCookie("update", false, false, "hangup");
	endCall();
});

history = false;
$('#history-toggle').bind('click', function(e) {
	e.preventDefault();
	soundOut.setAttribute("src", "click.ogg");
    soundOut.play();
	if (history == true) {
		$("#call_history, #history-clear").fadeOut(100);
		history = false;
	} else if (history == false) {
		$("#call_history, #history-clear").fadeIn(100);
		showHistory(1);
		history = true;
	}
});

$("#call_history").bind('click', function(e) {
	var clicked = (e.target.innerText)
	var callID = (e.target.parentElement.firstElementChild.firstChild.nodeValue);
});

fullscreen = false;
$('#full-screen').bind('click', function(e) {
	e.preventDefault();
	soundOut.setAttribute("src", "click.ogg");
    soundOut.play();
	if (fullscreen == true) {
		document.webkitCancelFullScreen();
		fullscreen = false;
	} else if (fullscreen == false) {
		video.webkitRequestFullScreen();
		fullscreen = true;
	}
});

$("#history-clear").bind('click', function(e) {
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
   	$('#history-toggle').click();
});

// Dialpad functions
$("#dialpad").bind('click', function(e) {
	var digit = (e.toElement.innerText);
	if (digit.length != 1) {
		return;
	}
	if (firstDigit == true) {
		main_destination.val("");
		firstDigit = false;
	}
    if (digit == "*") {
		file = "star";
    } else if (digit == "#") {
    	file = "pound";
    } else {
    	file = digit;
    }
    soundOut.setAttribute("src", "dtmf-" + file + ".ogg");
    soundOut.play();
	main_destination.val(main_destination.val() + digit);
	var body = "Signal = " + digit + "\nDuration = 120" ;
	sipSession.sendINFO("application/dtmf", body, options=null);
});

// Initial function selection
if (hd == true) {
	$("#local-video, #remote-video, #self-view, #full-screen, #hangup, #messages, #timer").addClass("hd");
}

if (!userid == false & register == false) {
	password = false;
	onLoad(userid, destination, password);
} else {
	authPopUp(userid, password);
}

});
