(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function e(e){return null!=e&&""!==e}function n(t){return(Array.isArray(t)?t.map(n):t&&"object"==typeof t?Object.keys(t).filter(function(e){return t[e]}):[t]).filter(e).join(" ")}var t={};return t.merge=function r(n,t){if(1===arguments.length){for(var a=n[0],i=1;i<n.length;i++)a=r(a,n[i]);return a}var o=n["class"],s=t["class"];(o||s)&&(o=o||[],s=s||[],Array.isArray(o)||(o=[o]),Array.isArray(s)||(s=[s]),n["class"]=o.concat(s).filter(e));for(var l in t)"class"!=l&&(n[l]=t[l]);return n},t.joinClasses=n,t.cls=function(e,r){for(var a=[],i=0;i<e.length;i++)a.push(r&&r[i]?t.escape(n([e[i]])):n(e[i]));var o=n(a);return o.length?' class="'+o+'"':""},t.style=function(e){return e&&"object"==typeof e?Object.keys(e).map(function(n){return n+":"+e[n]}).join(";"):e},t.attr=function(e,n,r,a){return"style"===e&&(n=t.style(n)),"boolean"==typeof n||null==n?n?" "+(a?e:e+'="'+e+'"'):"":0==e.indexOf("data")&&"string"!=typeof n?(-1!==JSON.stringify(n).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),n&&"function"==typeof n.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+e+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'"):r?(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+t.escape(n)+'"'):(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+n+'"')},t.attrs=function(e,r){var a=[],i=Object.keys(e);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],l=e[s];"class"==s?(l=n(l))&&a.push(" "+s+'="'+l+'"'):a.push(t.attr(s,l,!1,r))}return a.join("")},t.escape=function(e){var n=String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+e?e:n},t.rethrow=function a(e,n,t,r){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||r))throw e.message+=" on line "+t,e;try{r=r||require("fs").readFileSync(n,"utf8")}catch(i){a(e,null,t)}var o=3,s=r.split("\n"),l=Math.max(t-o,0),f=Math.min(s.length,t+o),o=s.slice(l,f).map(function(e,n){var r=n+l+1;return(r==t?"  > ":"    ")+r+"| "+e}).join("\n");throw e.path=n,e.message=(n||"Jade")+":"+t+"\n"+o+"\n\n"+e.message,e},t}();

    var templatizer = {};


    // webrtc.jade compiled template
    templatizer["webrtc"] = function tmpl_webrtc() {
        return '<div id="unsupported" class="unsupported"></div><div id="whiteboard_unsupported" class="unsupported"></div><div id="screen_sharing_unsupported" class="unsupported">Could not retrieve screen capture. Do you have it enabled?<br/>  Open link to check : <span>chrome://flags/#enable-usermedia-screen-capture</span></div><noscript><div id="javascript_disabled" class="unsupported">JavaScript must be enabled to load the WebRTC client</div></noscript><div id="conversejs"></div><div id="client" class="client"><div class="authPopup fadeable popup"><span>User ID</span><br/><input type="text" value="" class="userid"/><br/><span>Auth User ID</span><br/><input type="text" value="" class="authUserid"/><br/><span>Password</span><br/><input type="password" value="" class="password"/><br/><br/><div class="alert"></div><button type="button" class="authPopupButton button">Sign in</button></div><div class="fileshare-container table"><div class="cell"><div class="file_share fadeable"><span>Share File:</span><br/><input type="file"/><div class="status"></div></div></div></div><div class="main"><div class="errorPopup"></div><div class="callPopup fadeable popup"><span class="incomingCallTitle">Incoming Call</span><span class="incomingCallName"></span><span class="incomingCallUser"></span><div class="table"><div class="cell"><button type="button" class="acceptIncomingCall button">Accept</button><button type="button" class="holdAndAnswerButton button">Hold And Answer</button><button type="button" class="dropAndAnswerButton button">Drop And Answer</button></div><div id="rejectIncomingCallContainer" class="cell"><button type="button" class="rejectIncomingCall button">Reject</button></div></div></div><div class="reInvitePopup fadeable popup"><span class="title">ReInvite</span><br/><br/><span class="incomingCallName"></span><br/><span class="incomingCallUser"></span><br/><br/><button type="button" class="acceptReInviteCall button">Accept</button><button type="button" class="rejectReInviteCall button">Reject</button></div><div class="transferPopup fadeable popup"><div class="title">Transfer</div><div><input type="text" placeholder="To Target" class="transferTarget"/><input type="checkbox" class="transferTypeAttended"/>Attended</div><div class="actions"><button type="button" class="acceptTransfer button">Transfer</button><button type="button" class="rejectTransfer button">Cancel</button></div></div><div class="settingsPopup table collapse fixed fadeable popup"><div class="row"><ul class="tabs"><li><a href="#tab1"><span class="icon-cog"></span>Configure</a></li><li><a href="#tab2"><span class="icon-th"></span>Layout</a></li></ul><div id="tab1"><div class="settingDisplayNameRow row"><span class="cell">Display Name</span><input type="text" value="" class="settingDisplayName cell"/></div><div class="settingAuthenticationUseridRow row"><span class="cell">Auth User ID</span><input type="text" value="" class="settingAuthenticationUserid cell"/></div><div class="settingUseridRow row"><span class="cell">User ID</span><input type="text" value="" class="settingUserid cell"/></div><div class="settingPasswordRow row"><span class="cell">Password</span><input type="password" value="" class="settingPassword cell"/></div><div class="settingHDRow row"><span class="cell">Start in HD</span><input type="checkbox" class="settingHD cell"/><br/></div><div class="settingAutoAnswerRow row"><span class="cell">Auto Answer</span><input type="checkbox" class="settingAutoAnswer cell"/></div><div class="settingBandwidthRow row"><span class="cell">Bandwidth</span><span class="cell"><input type="text" maxlength="4" value="" placeholder="low" class="settingBandwidthLow short"/><input type="text" maxlength="4" value="" placeholder="medium" class="settingBandwidthMed short"/><input type="text" maxlength="4" value="" placeholder="high" class="settingBandwidthHigh short"/></span></div><div class="row"><span class="cell"><a href="" title="Sign In" class="btn sign-in">Sign In</a><a href="" title="Sign Out" class="btn sign-out">Sign Out</a></span></div></div><div id="tab2"><div class="settingSelfViewDisableRow row"><span class="cell">Disable Self View</span><input type="checkbox" class="settingSelfViewDisable cell"/></div><!--<div class="row">\n<span class="cell">Window Zoom</span>\n<input class="settingZoom cell short" type="text" maxlength="4" value=""/>\n</div>\n<div class="row">\n<span class="cell">Self View Window</span>\n<span class="cell">\n<input class="settingLocalVideoTop short" type="text" maxlength="4" value=""/><span> top </span>\n<input class="settingLocalVideoLeft short" type="text" maxlength="4" value=""/><span> left </span>\n</span>\n</div>\n<div class="row">\n<span class="cell">Call History Window</span>\n<span class="cell">\n<input class="settingCallHistoryTop short" type="text" maxlength="4" value=""/><span> top </span>\n<input class="settingCallHistoryLeft short" type="text" maxlength="4" value=""/><span> left </span>\n</span>\n</div>\n<div class="row">\n<span class="cell">Call Stats Window</span>\n<span class="cell">\n<input class="settingCallStatsTop short" type="text" maxlength="4" value=""/><span> top </span>\n<input class="settingCallStatsLeft short" type="text" maxlength="4" value=""/><span> left </span>\n</span>\n</div>\n<div class="row">\n<span class="cell">Page Color</span>\n<input class="settingColor cell" type="color" /><br>\n</div>--><div class="settingResolutionRow"><!-- <span class="cell">Resolution</span>--><div class="row"><span class="settingResolutionTypeRow cell">Mode</span><select class="resolutionTypeSelect cell"></select></div><div class="row"><span class="settingResolutionDisplayRow cell">Resolution</span><span class="cell"><select class="resolutionDisplayStandardSelect resolutionSubType"></select><select class="resolutionDisplayWidescreenSelect resolutionSubType"></select></span></div><div class="row"><span class="settingResolutionEncodingRow cell">Encoding</span><span class="cell"><select class="resolutionEncodingStandardSelect resolutionSubType"></select><select class="resolutionEncodingWidescreenSelect resolutionSubType"></select></span></div></div><div class="row"><span class="cell"><a href="" title="Save Settings" class="btn saveSettings">Save Settings</a><a href="" title="Reset Settings" class="clear">Reset Settings</a></span></div></div></div></div><div class="video"><span class="icon-facetime-video watermark-icon"></span><video autoplay="autoplay" class="remoteVideo"></video><div class="localVideo fadeable"><div class="inner"><video autoplay="autoplay" muted="true"></video></div></div></div><div class="videoBar"><div class="table fixed collapse"><div class="cell leftSpacer"></div><div class="cell cell-selfView"><div class="selfViewDisable icon fadeable"><a href="" title="Disable Self View" class="icon-selfViewDisable"></a></div><div class="selfViewEnable icon fadeable"><a href="" title="Enable Self View" class="icon-selfViewEnable"></a></div></div><div class="cell cell-dialpad"><div class="dialpadIconShow icon fadeable"><a href="" title="Show Dialpad" class="icon-dialpadShow"></a></div><div class="dialpadIconHide icon fadeable"><a href="" title="Hide Dialpad" class="icon-dialpadHide"></a></div></div><div class="cell cell-muteAudio"><div class="icon fadeable muteAudioIcon"><a href="" title="Mute Audio" class="icon-muteAudio"></a></div><div class="icon fadeable unmuteAudioIcon"><a href="" title="Unmute Audio" class="icon-unmuteAudio"></a></div></div><div class="cell cell-hold"><div class="hold icon fadeable"><a href="" title="Hold Call" class="icon-hold"></a></div><div class="resume icon fadeable"><a href="" title="Resume Call" class="icon-resume"></a></div></div><div class="cell cell-hangup"><div class="hangup icon fadeable"><a href="" title="Hangup" class="icon-hangup"></a><div class="subtitle">End Conference</div></div></div><div class="cell cell-transfer"><div class="transfer icon fadeable"><a href="" title="Transfer" class="icon-transfer"></a></div></div><div class="cell cell-shareScreen"><div class="icon fadeable shareScreen"><a href="" title="Share Screen" class="icon-screen-sharing"></a></div><div class="icon fadeable stopShareScreen"><a href="" title="Stop Share Screen" class="icon-screen-sharing-off"></a></div></div><div class="cell cell-timer"><div class="timer fadeable"></div></div><div class="cell cell-settings"><div class="settings icon fadeable"><a href="" title="Settings" class="icon-settings"></a></div></div><div class="cell cell-fullScreen"><div class="fullScreenExpand icon fadeable"><a href="" title="Expand Full Screen" class="icon-fullScreenExpand"></a></div><div class="fullScreenContract icon fadeable"><a href="" title="Contract Full Screen" class="icon-fullScreenContract"></a></div></div><div class="cell rightSpacer"></div></div></div><div class="connected-icon"><span title="Websockets Status" class="icon-link exario"></span></div><div class="registered-icon"><span title="Registered" class="icon-link exario"></span></div><div class="quality1"><span title="Call Quality" class="icon-quality1 exario"></span></div><div class="quality2"><span title="Call Quality" class="icon-quality2 exario"></span></div><div class="quality3"><span title="Call Quality" class="icon-quality3 exario"></span></div><div class="quality4"><span title="Call Quality" class="icon-quality4 exario"></span></div><div class="dialpad fadeable popup"><div class="callControl destination-container"><input type="text" onclick="this.focus();this.select()" class="destination"/><button title="Call History" class="history-button"><i class="icon-clock"></i></button><hr/></div><div class="button-row"><button>1</button><button>2</button><button>3</button></div><div class="button-row"><button>4</button><button>5</button><button>6</button></div><div class="button-row"><button>7</button><button>8</button><button>9</button></div><div class="button-row"><button class="btn-star">*</button><button>0</button><button>#</button></div><div class="dialpad-control-bar"><div class="call main-button"><a href="">Call</a></div></div></div><div class="callHistory"><div class="content"></div><div class="classHistoryActions"><!--<span class="historyBack">\n<a href="" title="Previous" class="icon-arrow-up-thick"></a>\n</span>--><span class="historyClear"><a href="" title="Clear History">Clear</a></span><span class="historyClose"><a href="" title="Close History">Close</a></span><!--<span class="historyForward">\n<a href="" title="Next" class="icon-arrow-down-thick"></a>\n</span>--></div><div class="callHistoryDetails popup"><div id="history-dt-close-container"><span class="historyDetailsClose cell"><a href="" title="Close" class="icon-cancel3"></a></span></div><div class="table"><div class="row"><div class="cell">Resolution In : </div><div class="resolutionIn cell default-color"></div></div><div class="row"><div class="cell">Resolution Out : </div><div class="resolutionOut cell default-color"></div></div><div class="row"><div class="cell">Bitrate In : </div><div class="bitrateIn cell default-color"></div></div><div class="row"><div class="cell">Bitrate Out : </div><div class="bitrateOut cell default-color"></div></div><div class="row"><div class="cell">Frame Rate In : </div><div class="frameRateIn cell default-color"></div></div><div class="row"><div class="cell">Frame Rate Out : </div><div class="frameRateOut cell default-color"></div></div><div class="row"><div class="cell">Audio Lost : </div><div class="audioLostPer cell default-color">%</div></div><div class="row"><div class="cell">Video Out : </div><div class="videoLostPer cell default-color">%</div></div><div class="row"><div class="cell">Jitter : </div><div class="jitter cell default-color"></div></div></div><div class="actions table"><a href="" title="Call" class="callLink cell"></a></div></div></div><div class="callStats"><div class="stats-container"></div><div class="table fixed collapse"><div class="heading"><div class="cell">Video Stats</div><div class="cell">Audio Stats</div></div><div class="row"><div class="cell">Bitrate out: <a href="javascript:;" data-type="video" data-var="kiloBitsSentPerSecond" class="stats-var"></a> kb/s</div><div class="cell">Bitrate out: <a href="javascript:;" data-type="audio" data-var="kiloBitsSentPerSecond" class="stats-var"></a> kb/s</div></div><div class="row"><div class="cell">Bitrate in: <a href="javascript:;" data-type="video" data-var="kiloBitsReceivedPerSecond" class="stats-var"></a> kb/s</div><div class="cell">Bitrate in: <a href="javascript:;" data-type="audio" data-var="kiloBitsReceivedPerSecond" class="stats-var"></a> kb/s</div></div><div class="row"><div class="cell">Lost: <a href="javascript:;" data-type="video" data-var="packetsLost" class="stats-var"></a> packets (<a href="javascript:;" data-type="video" data-var="packetsLostPer" class="stats-var"></a> %)</div><div class="cell">Lost: <a href="javascript:;" data-type="audio" data-var="packetsLost" class="stats-var"></a> packets (<a href="javascript:;" data-type="audio" data-var="packetsLostPer" class="stats-var"></a> %)</div></div><div class="row"><div class="cell">Frame rate out: <a href="javascript:;" data-type="video" data-var="googFrameRateSent" class="stats-var"></a> in: <a href="javascript:;" data-type="video" data-var="googFrameRateReceived" class="stats-var"></a></div><div class="cell">Audio Level out: <a href="javascript:;" data-type="audio" data-var="audioInputLevel" class="stats-var"></a> in: <a href="javascript:;" data-type="audio" data-var="audioOutputLevel" class="stats-var"></a></div></div><div class="row spacer"></div><div class="heading"><div class="cell">Resolution</div><div class="cell">Link</div></div><div class="row"><div class="cell">In: <span data-type="video" data-var="googFrameWidthReceived" class="stats-var"></span> x <span data-type="video" data-var="googFrameHeightReceived" class="stats-var"></span> Out: <span data-type="video" data-var="googFrameWidthSent" class="stats-var"></span> x <span data-type="video" data-var="googFrameHeightSent" class="stats-var"></span></div><div class="cell"><span class="statsDelay">Delay: <a href="javascript:;" data-type="audio" data-var="googRtt" class="stats-var"></a></span> Jitter: <a href="javascript:;" data-type="audio" data-var="googJitterReceived" class="stats-var"></a></div></div><div class="row spacer"></div></div></div><div class="messages"><div class="alert"></div><div class="success"></div><div class="warning"></div><div class="normal"></div></div></div><div class="historyRowSample"><div class="row"><a href="" title="Number" class="hist-destination"></a><span class="hist-direction"></span><span class="hist-date"></span><span class="hist-length"></span><span class="hist-details-arrow icon-angle-right"></span></div></div><div class="whiteboard"><div class="tools"><a href=".simple_sketch" data-tool="marker" class="tooltype">Marker</a><a href=".simple_sketch" data-tool="eraser" class="tooltype">Eraser</a></div><canvas width="600" height="400" class="simple_sketch"></canvas></div><div class="sms"><div class="smsView"><div class="table fixed smsLoginForm"><div class="row"><label class="cell">Name:</label><input type="text" name="name" placeholder="Email or TN" class="cell smsName"/></div><div class="row"><label class="cell">Password:</label><input type="password" name="password" class="cell smsPassword"/></div><div class="row"><div class="cell"></div><input type="button" value="Log In" class="cell smsLogin"/></div></div><div class="smsInbox"><fieldset><legend>Inbox</legend><div class="inner"><div class="table fixed"><div class="row"><div class="cell title status">Status</div><div class="cell title time">Received</div><div class="cell title from">From</div><div class="cell title body">Message</div><div class="cell title actions"></div></div><div class="content"></div></div></div></fieldset></div><div class="smsSendForm"><div><div><span>To</span><input type="text" placeholder="US Phone Number" class="smsSendTo"/><span>Text</span><input type="text" placeholder="Message to Send" class="smsSendBody"/><input type="button" value="Send SMS" class="smsSendButton"/></div></div></div><div id="sample" class="sms-inbox-item sms-inbox-item-sample row"><div class="status cell"></div><div class="time cell"></div><div class="from cell"></div><div class="body cell"><div class="image"><a href="" target="_blank"><span></span><img src=""/></a></div><div class="video"><video controls=""></video></div><div class="audio"><audio controls=""></audio></div><div class="text"></div></div><div class="actions cell"><a href="javascript:;" title="Delete SMS" class="icon-trash"></a></div></div></div><div class="smsStatus"><span class="content"></span></div></div></div>';
    };

    return templatizer;
}));
},{"fs":2}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
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

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],4:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],5:[function(require,module,exports){
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
},{"_process":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],8:[function(require,module,exports){
(function (process,global){
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

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":7,"_process":6,"inherits":4}],9:[function(require,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Use chrome.storage.local if we are in an app
 */

var storage;

if (typeof chrome !== 'undefined' && typeof chrome.storage !== 'undefined')
  storage = chrome.storage.local;
else
  storage = window.localStorage;

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      storage.removeItem('debug');
    } else {
      storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

},{"./debug":10}],10:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":11}],11:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 's':
      return n * s;
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],12:[function(require,module,exports){

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

},{"./filters":13,"./utils":14,"fs":2,"path":5}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){

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
 

},{}],15:[function(require,module,exports){
module.exports = Authentication;

var events = require('./EventBus');

function Authentication(element, options) {
  this.popup = element;
  this.okButton = this.popup.find('.authPopupButton');
  this.userIdInput = this.popup.find('input.userid');
  this.authUserIdInput = this.popup.find('input.authUserid');
  this.passwordInput = this.popup.find('input.password');
  this.alert = this.popup.find('.alert');

  this.visible = false;
  this.options = options || {};

  this.registerListeners();
}

Authentication.prototype = {
  registerListeners: function() {
    var self = this;

    events.on("registrationFailed", function(e) {
      var statusCode = e.data.response.status_code;
      if ((statusCode === 403 && self.options.settingsUserId() && !self.options.settingsPassword()) || self.options.configurationRegister) {
        self.setVisible(true);
      }
    });

    this.okButton.bind('click', function() {
      var userId = self.userIdInput.val();
      if (!userId) {
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
      self.options.onAuthenticate({
        userId: userId,
        authenticationUserId: authUserId,
        password: password
      });
      events.once("registered", function() {
        if (authUserId && self.options.settingsUserId() !== authUserId) {
          self.options.settingsAuthenticationUserId(authUserId);
        }
        self.options.settingsUserId(userId);
        self.options.settingsPassword(password);
      });
    });

    this.popup.bind('keypress', function(e) {
      if (e.which === 13) {
        self.okButton.click();
      }
    });
  },

  show: function() {
    this.setVisible(true);
  },

  setVisible: function(visible) {
    this.visible = visible;

    this.authUserIdInput.val(this.options.settingsAuthenticationUserId());
    this.userIdInput.val(this.options.settingsUserId());

    events.emit('viewChanged');
  }
};
},{"./EventBus":20}],16:[function(require,module,exports){
/*jshint unused: false */
/***************************************************
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton
 *
 * Copyright 2013 Broadsoft
 * http://www.broadsoft.com
 ***************************************************/
module.exports = Client;


var styles = "/***************************************************\n * Created on Mon Jan 14 15:32:43 GMT 2013 by:\n *\n * Copyright 2013 Broadsoft\n * http://www.broadsoft.com\n ***************************************************/\n@font-face {\n    font-family: 'Exario-Icon-Fonts';\n    src: url('data:application/font-woff;charset=utf-8;<%= Exario_Icon_Fonts_woff %>') format('woff');\n}\n\nbody {\n    background-color: #FFFFFF;\n    margin:0;\n}\n\n.callControl {\n    display: none;\n    position: relative;\n    left: 0px;\n    top: 0;\n    height: 75px;\n    color: #666666;\n    font-family:arial;\n    font-size: 18px;\n    font-weight: bold;\n}\n\n.callControl\n{\n    height:auto;\n}\n.callControl input {\n    background: #333;\n    border: 1px solid #3c3c3c;\n    color: #d3d3d3;\n    font-family: arial;\n    font-size: 18px;\n    padding: 0;\n    border-radius: 0;\n    width: 171px;\n    line-height: 30px;\n    padding-left: 8px;\n    padding-right: 35px;\n}\n.callControl input:focus\n{\n    outline: none;\n}\n\n.main {\n    position: relative;\n    top: 0px;\n    left: 0px;\n    width:100%;\n}\n.client {\n    position:relative;\n    top:0;\n    left:0;\n}\n.client.r1280x720 {\n    width:1280px;\n}\n.client.r960x720 {\n    width:960px;\n}\n.client.r640x360, .client.r640x480 {\n    width:640px;\n}\n.client.r320x180, .client.r320x240 {\n    width:320px;\n}\n.full-screen-expanded.client{\n    width:100% !important;\n    height:100% !important;\n}\n\n.main:-webkit-full-screen-ancestor:not(iframe) {\n    position:absolute !important;\n    top:0px;\n    left:0px;\n    right:0px;\n    bottom:0px;\n    width:100%;\n    height:100%;\n}\n\n.video {\n    position:relative;\n    top: 0px;\n    left: 0px;\n    width: 100%;\n    height: auto;\n}\n\n.widescreen .video {\n    padding-bottom:56.25%;\n}\n.standard .video {\n    padding-bottom:75%;\n}\n.full-screen-expanded .video {\n    padding-bottom:0;\n    bottom:40px;\n    position:absolute;\n    height: auto !important;\n}\n.full-screen-expanded .videoBar {\n    top:auto !important;\n    bottom:0px;\n    position:absolute;\n}\n.full-screen-expanded .main {\n    height:100%;\n}\n\n.video:-webkit-full-screen {\n    position: absolute;\n    height: 100%;\n    border: none;\n    z-index: 1;\n}\n\n.remoteVideo {\n    display: none;\n    position: absolute;\n    top: 0%;\n    left: 0%;\n    width: 100%;\n    height: 100%;\n    background-color: #191414;\n    border-radius: 4px;\n    border: 2px solid #DDDDDD;\n    box-shadow: 0px 0px 10px #000000;\n}\n\n.localVideo video {\n    border-radius: 0;\n    box-shadow: none;\n    background: #292929;\n    border: 1px solid #3c3c3c;\n    cursor: move;\n    width:100%;\n    height:100%;\n    position:absolute;\n}\n\n.localVideo .inner {\n    margin:5px;\n    position:absolute;\n    top:0;\n    bottom:0;\n    right:0;\n    left:0;\n}\n\n.localVideo {\n    display: none;\n    position: absolute;\n    top: auto;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    width: 25%;\n    height: 25%;\n    background-color: transparent;\n    z-index: 99;\n}\n\n:-webkit-full-screen .remoteVideo {\n    z-index: 1;\n}\n:-webkit-full-screen .localVideo {\n    z-index: 2;\n}\n:-webkit-full-screen .remoteVideo, :-webkit-full-screen .localVideo {\n    border: none;\n    border-radius: 0;\n}\n\n.videoBar {\n    display: none;\n    position: relative;\n    top: 0px;\n    left: 0px;\n    width: 100%;\n    height: 40px;\n    background: black;\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#404040', endColorstr='#000000',GradientType=0 );\n    background-image: -ms-linear-gradient(center top , #404040, #000000);\n    background-image: linear-gradient(to bottom, #404040, #000000);\n    background-image: -webkit-linear-gradient(#404040, #000000);\n    background-image: -moz-linear-gradient(top, #404040, #000000);\n    border-radius: 4px;\n    border: 2px solid #DDDDDD;\n    box-shadow: 0px 0px 10px #000000;\n    margin-top:5px;\n}\n\n/*:-webkit-full-screen .videoBar {\n    position: absolute;\n    z-index: 5;\n    top:auto;\n    bottom:0px;\n    width: auto;\n    height: 40px;\n    background-color: #474343;\n    border-radius: 4px;\n    border: 2px solid #DDDDDD;\n    box-shadow: 0px 0px 10px #999999;\n}*/\n\n/* Default size for all icons */\n\n.icon-call, .icon-hangup, .icon-fullScreenExpand, .icon-fullScreenContract, .icon-selfViewDisable, .icon-selfViewEnable, .icon-muteAudio, .icon-unmuteAudio, .icon-link.exario, .icon-dialpadShow, .icon-dialpadHide, .icon-quality1.exario, .icon-quality2.exario, .icon-quality3.exario, .icon-quality4.exario, .icon-settings, .icon-ok, .icon-history, .icon-trash, .icon-left, .icon-right, .icon-transfer, .icon-hold, .icon-resume, .icon-screen-sharing, .icon-screen-sharing-off {\n  font-family: 'Exario-Icon-Fonts';\n  speak: none;\n  text-decoration: none;\n  margin: 0 0.35em 0 0;\n  font-size: 25px;\n}\n.icon-link.exario, .icon-quality1.exario, .icon-quality2.exario, .icon-quality3.exario, .icon-quality4.exario {\n    font-family: 'Exario-Icon-Fonts' !important;\n    font-size: 20px !important;\n}\n\n/* Call Button */\n\n.call {\n    display: none;\n    position: absolute;\n    z-index: 10;\n    top: 25px;\n    left: 265px;\n}\n\n.icon-call:before {\n    content: \"\\e00e\";\n    color: #3B9E3B;\n}\n\n.icon-call:hover:before {\n    content: \"\\e00e\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Hangup Button */\n.icon-hangup:before {\n    content: \"\\e00f\";\n    color: #FF0000;\n}\n\n.icon-hangup:hover:before {\n    content: \"\\e00f\";\n    color: #FF0000;\n}\n\n.videoBar .icon {\n    display: none;\n    z-index: 10;\n    margin: 0px 2.5px;\n    position: absolute;\n}\n/* needed for wizard integration */\n.hangup, .fullScreen, .selfView, .muteAudioIcon, .dialpadIcon, .messages {\n  top: 0;\n  left: 0;\n}\n\n\n.videoBar .table {\n    height:100%;\n    margin: 6px;\n}\n.videoBar .cell {\n    position:relative;\n    top:0px;\n    left:0px;\n    width: 35px;\n}\n\n.icon-fullScreenExpand:before {\n    content: \"\\e002\";\n    color: #FFFFFF;\n}\n\n.icon-fullScreenExpand:hover:before {\n    content: \"\\e002\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* FullScreen Contract Button */\n.icon-fullScreenContract:before {\n    content: \"\\e003\";\n    color: #FFFFFF;\n}\n\n.icon-fullScreenContract:hover:before {\n    content: \"\\e003\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Self View Disable Button */\n.icon-selfViewDisable:before {\n    content: \"\\e00a\";\n    color: #FFFFFF;\n}\n\n.icon-selfViewDisable:hover:before {\n    content: \"\\e00a\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Self View Enable Button */\n.icon-selfViewEnable:before {\n    content: \"\\e00d\";\n    color: #FFFFFF;\n}\n\n.icon-selfViewEnable:hover:before {\n    content: \"\\e00d\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Mute Audio Button */\n.icon-muteAudio:before {\n    content: \"\\e008\";\n    color: #FFFFFF;\n}\n\n.icon-muteAudio:hover:before {\n    content: \"\\e008\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Unmute Audio Button */\n.icon-unmuteAudio:before {\n    content: \"\\e009\";\n    color: #FFFFFF;\n}\n\n.icon-unmuteAudio:hover:before {\n    content: \"\\e009\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Dialpad Show Button */\n.icon-dialpadShow:before {\n    content: \"\\e010\";\n    color: #FFFFFF;\n}\n\n.icon-dialpadShow:hover:before {\n    content: \"\\e010\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Dialpad Hide Button */\n.icon-dialpadHide:before {\n    content: \"\\e010\";\n    color: #FFFFFF;\n}\n\n.icon-dialpadHide:hover:before {\n    content: \"\\e010\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Dialpad Hide Button */\n.quality1 {\n    display: none;\n    position: absolute;\n    z-index: 10;\n    top: 13px;\n    left: 15px;\n}\n\n.icon-quality1.exario:before {\n    content: \"\\e007\";\n    color: #00FF00;\n    opacity: .4;\n}\n\n.quality2 {\n    display: none;\n    position: absolute;\n    z-index: 10;\n    top: 13px;\n    left: 15px;\n}\n\n.icon-quality2.exario:before {\n    content: \"\\e006\";\n    color: #FFFF00;\n    opacity: .4;\n}\n\n.quality3 {\n    display: none;\n    position: absolute;\n    z-index: 10;\n    top: 13px;\n    left: 15px;\n}\n\n.icon-quality3.exario:before {\n    content: \"\\e005\";\n    color: #FF9900;\n    opacity: .4;\n}\n\n.quality4 {\n    display: none;\n    position: absolute;\n    z-index: 10;\n    top: 13px;\n    left: 15px;\n}\n\n.icon-quality4.exario:before {\n    content: \"\\e004\";\n    color: #FF0000;\n    opacity: .4;\n}\n\n#videoBar #settings {\n    width: auto;\n    background-color: transparent;\n}\n\n/* Settings Button */\n.icon-settings:before {\n    content: \"\\e00c\";\n    color: #FFFFFF;\n    opacity: .4;\n}\n\n.icon-settings:hover:before {\n    content: \"\\e00c\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Ok Button */\n.icon-ok:before {\n    content: \"\\e011\";\n    color: #00FF00;\n}\n\n.icon-ok:hover:before {\n    content: \"\\e011\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* History Button */\n#history {\n    display: none;\n    position: absolute;\n    z-index: 10;\n    top: 6px;\n    right: 60px;\n}\n\n.icon-history:before {\n    content: \"\\e012\";\n    color: #FFFFFF;\n    opacity: .4;\n}\n\n.icon-history:hover:before {\n    content: \"\\e012\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Trash Button */\n.icon-trash:before {\n    content: \"\\e013\";\n    color: #FF0000;\n}\n\n.icon-trash:hover:before {\n    content: \"\\e013\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Left Button */\n.icon-left:before {\n    content: \"\\e000\";\n    color: #00FF00;\n}\n\n.icon-left:hover:before {\n    content: \"\\e000\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Right Button */\n.icon-right:before {\n    content: \"\\e001\";\n    color: #00FF00;\n}\n\n.icon-right:hover:before {\n    content: \"\\e001\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Transfer Button */\n.icon-transfer:before {\n    content: \"\\e014\";\n    color: #FFFFFF;\n}\n\n.icon-transfer:hover:before {\n    content: \"\\e014\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Hold Button */\n.icon-hold:before {\n    content: \"\\e015\";\n    color: #FFFFFF;\n}\n\n.icon-hold:hover:before {\n    content: \"\\e015\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Resume Button */\n.icon-resume:before {\n    content: \"\\e016\";\n    color: #FFFFFF;\n}\n\n.icon-resume:hover:before {\n    content: \"\\e016\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Screen Sharing Button */\n.icon-screen-sharing:before {\n    content: \"\\e604\";\n    color: #FFFFFF;\n}\n\n.icon-screen-sharing:hover:before {\n    content: \"\\e604\";\n    color: <%= iconHightlightColor %>;\n}\n\n/* Stop Screen Sharing Button */\n.icon-screen-sharing-off:before {\n    content: \"\\e605\";\n    color: #FFFFFF;\n}\n\n.icon-screen-sharing-off:hover:before {\n    content: \"\\e605\";\n    color: <%= iconHightlightColor %>;\n}\n\n.button:active {\n    color: #04AFF0;\n    background: -webkit-gradient(linear, left top, right bottom, from(#7CDD07), to(#FAA51A));\n    background: linear-gradient(to bottom left, #7CDD07, #FAA51A);\n}\n\n.button:hover {\n    box-shadow: 0px 0px 10px #999;\n}\n\n.icon-link.exario:before {\n    content: \"\\e00b\";\n}\n\n/* Incoming Call Pupup */\n.callPopup, .reInvitePopup, .transferPopup, .callHistoryDetails, .authPopup {\n    display: none;\n    background: #333333;\n    padding: 10px;\n    border: 2px solid #DDDDDD;\n    float: left;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: auto;\n    box-shadow: 0px 0px 10px #999999;\n    border-radius: 3px;\n    font-size: 14px;\n    line-height: 18px;\n    z-index: 100;\n}\n\n.callPopup, .reInvitePopup {\n    width:170px;\n    height:137px;\n}\n.transferPopup {\n    color: white;\n    width:280px;\n    height:60px;\n}\n\n.transferTarget {\n    width: 200px;\n}\n\n.popup .actions {\n    text-align:right;\n}\n.popup .title {\n    font-weight: bold;\n    font-size: 16px;\n    color: white;\n}\n.callPopup span {\n    color: #999999;\n    font-size: 22px;\n}\n\n.ui-widget-content.ui-dialog {\n    display: none;\n    color: #999999;\n    font-size: 22px;\n    background: #333333;\n    padding: 10px;\n    border: 2px solid #DDDDDD;\n    box-shadow: 0px 0px 10px #999999;\n    border-radius: 3px;\n    z-index: 99;\n}\n\n.no-close .ui-dialog-titlebar-close {\n    display: none;\n}\n\n.settingsPopup {\n    display: none;\n    background: #333333;\n    padding: 2px;\n    border: 2px solid #DDDDDD;\n    position: absolute;\n    top: 5px;\n    left: 5px;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    width: 435;\n    height: 180;\n    box-shadow: 0px 0px 10px #999999;\n    border-radius: 3px;\n    font-size: 20px;\n    line-height: 28px;\n    z-index: 99;\n}\n\n/* Settings Popup */\n.settingsPopup span {\n    color: #999999;\n    font-size: 20px;\n}\n\n.settingsPopup [type=\"checkbox\"] {\n    width: 18;\n    height: 18;\n    vertical-align: middle;\n}\n\n.settingsPopup .short {\n    width: 36px;\n}\n/* Auth Button */\n.authPopup {\n    width: 210px;\n    height: 200px;\n}\n\n.authPopup span {\n    color: #999999;\n    font-size: 14px;\n    line-height: 18px;\n}\n\n.authPopup input {\n    background: #666666;\n    border-bottom: 1px solid #333333;\n    border-left: 1px solid #000000;\n    border-right: 1px solid #333333;\n    border-top: 1px solid #000000;\n    color: #FFFFFF;\n    border-radius: 3px;\n    font-family: arial;\n    font-size: 16px;\n    padding: 6px 6px 4px;\n    width: 200px;\n}\n\n.authPopup button {\n    border-color: #999999;\n    border-width: 1px;\n    border-radius: 4px;\n    color: #333333;\n    cursor: pointer;\n    padding: 6px 6px 4px;\n    margin-top: 10px;\n    font-size: 12px;\n    width: 200px;\n}\n\n.authPopup #alert {\n    font-size: 20px;\n    text-align: center;\n    color: #FF0000;\n}\n\n.dialpad {\n    padding: 15px;\n    background: #292929;\n    border: 1px solid #3c3c3c;\n    display: none;\n    position: absolute;\n    bottom: 40px;\n    right: auto;\n    width:170px;\n    top: auto;\n    left: 0px;\n    letter-spacing: 5px;\n    z-index: 100;\n    box-sizing: content-box;\n    height: 228px;\n    padding-left: 14px;\n}\n\n.dialpad button {\n    color: #333333;\n    opacity: 0.8;\n    font-family:arial;\n    font-size: 20px;\n    width: 30px;\n    border-color: #000000;\n    border-width: 1px;\n    border-radius: 4px;\n    border-spacing: 5em;\n    font-weight: bold;\n    line-height: 33px;\n    margin: .1em;\n    border-top-style: outset;\n    cursor: pointer;\n}\n\n.dialpad button:active {\n    color: #04AFF0;\n    background: -webkit-gradient(linear, left top, left bottom, from(#F47A20), to(#FAA51A));\n    background: linear-gradient(to left bottom, #F47A20, #FAA51A);\n}\n\n.dialpad button:hover {\n    box-shadow: 1px 1px 20px #999999;\n}\n\n.connected-icon {\n    display: none;\n    position: absolute;\n    top: 13px;\n    right: 5px;\n}\n\n.registered-icon {\n    display: none;\n    position: absolute;\n    top: 13px;\n    right: 40px;\n}\n\n.timer {\n    display: none;\n    position:absolute;\n    top: 3px;\n    left: 0px;\n    width: 100%;\n    text-align: center;\n    font-family: arial;\n    font-size: 16px;\n    color: <%= timerColor %>;\n}\n\n.normal {\n    color: <%= infoMessageColor %>;\n}\n\n.success {\n    color: <%= successMessageColor %>;\n}\n\n.warning {\n    color: <%= successMessageColor %>;\n}\n\n.alert {\n    color: <%= alertMessageColor %>;\n}\n\n.callHistory {\n    display: none;\n    position: absolute;\n    top: 88px;\n    left: 378px;\n    width: 265px;\n    height: 420px;\n    background-color: #191414;\n    border-radius: 4px;\n    border: 2px solid #DDDDDD;\n    box-shadow: 0px 0px 10px #999999;\n}\n\n.callHistory .hist-date {\n    position: absolute;\n    color: #0082FF;\n    left: 20px;\n    font-family:arial;\n    font-size: 10px;\n}\n\n.callHistory .hist-length {\n    position: absolute;\n    color: #0082FF;\n    left: 205px;\n    font-family:arial;\n    font-size: 10px;\n}\n\n.callHistory .rowSpace {\n    padding: .5em;\n}\n\n.callStats {\n    display: none;\n    position: absolute;\n    top: 10px;\n    color: #666666;\n    left: 660px;\n    width: 400px;\n    padding: 2px;\n    border-radius: 4px;\n    border: 2px solid #DDDDDD;\n    box-shadow: 0px 0px 10px #999999;\n}\n\n.callStats .statsVideo {\n    position: absolute;\n    white-space: pre-wrap;\n    color: #0082FF;\n    left: 10px;\n    font-family:arial;\n    font-size: 18px;\n    text-decoration: none;\n}\n\n.callStats .statsAudio {\n    position: absolute;\n    white-space: pre-wrap;\n    color: #0082FF;\n    left: 260px;\n    float: left;\n    font-family:arial;\n    font-size: 18px;\n    text-decoration: none;\n}\n\n.unsupported {\n    position: absolute;\n    top: 240px;\n    left: 30px;\n    width: 600px;\n    background-color: #191414;\n    text-align: center;\n    display:none;\n    color: white;\n    z-index: 10;\n}\n#whiteboard_unsupported, #screen_sharing_unsupported {\n    position:relative;\n    top:0px;\n    left:0px;\n    margin: 10px;\n    background: red;\n}\n#screen_sharing_unsupported {\n    display:none;\n}\n\n.stats-table-container, .stats-graph-sub-container {\n    display: none;\n}\n\n.stats0-selected .kiloBitsSentPerSecond-video,\n.stats1-selected .kiloBitsSentPerSecond-audio,\n.stats2-selected .kiloBitsReceivedPerSecond-video,\n.stats3-selected .kiloBitsReceivedPerSecond-audio,\n.stats4-selected .packetsLost-video,\n.stats5-selected .packetsLostPer-video,\n.stats6-selected .packetsLost-audio,\n.stats7-selected .packetsLostPer-audio,\n.stats8-selected .googFrameRateSent-video,\n.stats9-selected .googFrameRateReceived-video,\n.stats10-selected .audioOutputLevel-audio,\n.stats11-selected .audioInputLevel-audio,\n.stats12-selected .googFrameWidthReceived-video,\n.stats13-selected .googFrameHeightReceived-video,\n.stats14-selected .googFrameWidthSent-video,\n.stats15-selected .googFrameHeightSent-video,\n.stats16-selected .googRtt-audio,\n.stats17-selected .googJitterReceived-audio {\n    display: block;\n}\n\n.client .table {\n    display: table;\n    width:100%;\n}\n.client .fixed {\n    table-layout: fixed;\n}\n.client .collapse {\n    border-collapse: collapse;\n}\n\n.client .cell {\n    display: table-cell;\n}\n\n.client .heading {\n    display: table-row;\n    font-weight: bold;\n}\n\n.client .row {\n    display: table-row;\n    margin: 0;\n}\n.client .row:before, .client .row:after {\n    display: none;\n}\n\n.client .group {\n    display: table-row-group;\n}\n\n.stats-graph-sub-container canvas {\n    width: 100%;\n}\n\n.resolutionSubType{\n    display:none;\n}\n\n.client .fadeable{\n    opacity: 0;\n    display: block;\n    z-index: -1;\n    backface-visibility: hidden;\n}\n.client .fileshare-container {\n    display:none;\n}\n.enable-file-share .fileshare-container {\n    display:table;\n}\n.holdAndAnswerButton, .dropAndAnswerButton, .acceptIncomingCall {\n    display:none;\n}\n\n.started .holdAndAnswerButton,\n.started .dropAndAnswerButton,\n.client:not(.started) .acceptIncomingCall {\n    display:inline-block;\n}\n\n.started .watermark-icon {\n    display:none;\n    transform:none;\n    box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);\n}\n.connected .watermark-icon {\n    box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);\n}\n\n.enable-mute.unmuted.started .muteAudioIcon,\n.enable-mute.muted.started .unmuteAudioIcon,\n.enable-full-screen.full-screen-contracted .fullScreenExpand,\n.enable-full-screen.full-screen-expanded .fullScreenContract,\n.enable-self-view.self-view-enabled .selfViewDisable,\n.enable-self-view.self-view-disabled .selfViewEnable,\n.enable-self-view.self-view-enabled .localVideo,\n.enable-settings .settings,\n.enable-dialpad.dialpad-shown .dialpadIconHide,\n.enable-dialpad.dialpad-hidden .dialpadIconShow,\n.started .hangup, .calling .hangup,\n.enable-call-control.connected .call,\n.enable-transfer.started .transfer,\n.enable-timer.started .timer,\n.client:not(.held).enable-hold.started .hold,\n.enable-hold.started.held .resume,\n.enable-screen-sharing.screen-sharing-off .shareScreen,\n.enable-screen-sharing.screen-sharing .stopShareScreen,\n.enable-file-share.started .file_share\n{\n    transition: all 1s linear;\n    opacity: 1;\n    z-index: 20;\n}\n.enable-transfer.started.transfer-visible .transferPopup,\n.client:not(.disconnected).auth-visible .authPopup,\n.reInvite .reInvitePopup,\n.enable-dialpad.dialpad-shown .dialpad,\n.enable-settings.settings-shown .settingsPopup,\n.incomingCall .callPopup{\n    transition: all 1s linear;\n    opacity: 1;\n    z-index: 100;\n}\n.enable-screen-sharing.screen-sharing .shareScreen, .enable-screen-sharing.screen-sharing-off .stopShareScreen,\n.enable-mute.connected .muteAudioIcon, .enable-mute.disconnected .muteAudioIcon,\n.enable-mute.connected .unmuteAudioIcon, .enable-mute.disconnected .unmuteAudioIcon,\n.enable-mute.muted .muteAudioIcon, .enable-mute.unmuted .unmuteAudioIcon,\n.enable-full-screen.full-screen-expanded .fullScreenExpand,\n.enable-full-screen.full-screen-contracted .fullScreenContract,\n.enable-self-view.self-view-disabled .selfViewDisable,\n.enable-self-view.self-view-enabled .selfViewEnable,\n.enable-self-view.self-view-disabled .localVideo,\n.enable-settings.settings-hidden .settingsPopup,\n.enable-dialpad.dialpad-hidden .dialpadIconHide,\n.enable-dialpad.dialpad-shown .dialpadIconShow,\n.enable-dialpad.dialpad-hidden .dialpad,\n.connected .hangup, .disconnected .hangup,\n.client:not(.connected) .call,\n.enable-transfer.connected .transfer, .enable-transfer.disconnected .transfer,\n.enable-transfer.transfer-hidden .transferPopup,\n.client.disconnected .authPopup, .client.auth-hidden .authPopup,\n.reInvite-done .reInvitePopup,\n.client.held .hold, .client:not(.started) .hold,\n.client:not(.held) .resume, .client:not(.started) .resume,\n.client:not(.started) .timer,\n.client:not(.started) .file_share\n{\n    transition: all 1s linear;\n    opacity: 0;\n    z-index: -1;\n}\n.sign-in, .sign-out {\n    display: none;\n}\n.client:not(.registered) .sign-in,\n.client.registered .sign-out\n{\n    display: block;\n}\n\n.client:not(.enable-mute) .cell-muteAudio,\n.client:not(.enable-transfer) .cell-transfer,\n.client:not(.enable-hold) .cell-hold,\n.client:not(.enable-timer) .cell-timer,\n.client:not(.enable-full-screen) .cell-fullScreen,\n.client:not(.enable-self-view) .cell-selfView,\n.client:not(.enable-settings) .cell-settings,\n.client:not(.enable-dialpad) .cell-dialpad,\n.client:not(.enable-shareScreen) .cell-shareScreen,\n.client:not(.enable-call-control) .callControl\n{\n    display:none !important;\n}\n.historyRowSample {\n    display: none;\n}\n.callHistoryDetails {\n    width: 150px;\n    height: 190px;\n    background: white;\n}\n.historyDetailsClose {\n    text-align: right;\n    margin-top: 10px;\n}\n.historyDetailsClose .icon-ok{\n    margin:0px;\n}\n.callHistory .actions {\n    margin-top:11px;\n}\n.history-row {\n    cursor: pointer;\n}\n.callLink {\n    text-align: left;\n}\n.view-audioOnly .video, .view-audioOnly .fullScreenExpand, .view-audioOnly .fullScreenContract,\n.view-audioOnly .selfViewDisable, .view-audioOnly .selfViewEnable, .view-audioOnly .quality1,\n.view-audioOnly .quality2, .view-audioOnly .quality3, .view-audioOnly .quality4,\n.view-audioOnly .cell-fullScreen, .view-audioOnly .cell-selfView{\n    display:none !important;\n}\n.client.view-audioOnly, .view-audioOnly .videoBar {\n    display: inline-block;\n    width: auto;\n}\n.view-audioOnly .videoBar .table{\n    table-layout: auto;\n    width: auto;\n}\n.view-audioOnly .cell-hangup {\n    width:35px !important;\n}\n.view-audioOnly .timer {\n    position: relative;\n    margin-right: 10px;\n}\n.view-audioOnly .messages\n{\n    left: 10px !important;\n    top: 48px !important;\n    font-weight: bold;\n    font-size: 14px;\n}\n.view-audioOnly .dialpad\n{\n    top: 45px;\n}\n.view-conference .selfViewDisable, .view-conference .selfViewEnable{\n    text-align: right !important;\n}\n.view-conference .fullScreenExpand, .view-conference .fullScreenContract{\n    text-align: left !important;\n}\n.view-conference .cell-hangup{\n    width: 30px !important;\n    top: 2px;\n}\n.view-conference .videoBar .cell .hangup{\n    margin-top: 0;\n    width: 140px;\n    background-color: red;\n    border-radius: 5px;\n    margin-left: 10px;\n    height: 36px;\n    line-height: 14px;\n}\n.view-conference .hangup .subtitle{\n    display: block !important;\n    font-size: 14px;\n    color: white;\n}\n.view-conference .icon-hangup:before, .view-conference .icon-hangup:hover:before{\n    color:white !important;\n}\n\n\n@font-face {\n    font-family: 'bsl_icons';\n    src: url('data:application/font-woff;charset=utf-8;<%= bsl_icons_woff %>') format('woff');\n    font-weight: normal;\n    font-style: normal;\n}\nbody\n{\n    font-family:'Open Sans', Arial, sans-serif;\n    -webkit-font-smoothing: antialiased !important;\n}\n\n.client [class^=\"icon-\"], .client [class*=\" icon-\"] {\n    font-family: 'bsl_icons';\n    speak: none;\n    font-style: normal;\n    font-weight: normal;\n    font-variant: normal;\n    text-transform: none;\n    line-height: 1;\n\n    /* Better Font Rendering =========== */\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-dialpad:before, .icon-dialpadShow:before, .icon-dialpadShow:hover:before, .icon-dialpadHide:before, .icon-dialpadHide:hover:before {\n    content: \"\\ed3b\";\n}\n.icon-grid3:before {\n    content: \"\\eeb3\";\n}\n.icon-phone:before {\n    content: \"\\e62c\";\n}\n.icon-phone-hang-up:before, .icon-hangup:before, .icon-hangup:hover:before {\n    content: \"\\e600\";\n}\n.icon-clock:before {\n    content: \"\\e634\";\n}\n.client .icon-cog:before, .icon-settings:before, .icon-settings:hover:before {\n    content: \"\\e601\";\n}\n.icon-pause2:before, .icon-resume:before, .icon-resume:hover:before, .icon-hold:before, .icon-hold:hover:before {\n    content: \"\\e6bb\";\n}\n.icon-volume-high:before {\n    content: \"\\e6c0\";\n}\n.icon-volume-medium:before, .icon-unmuteAudio:before, .icon-unmuteAudio:hover:before {\n    content: \"\\e6c1\";\n}\n.icon-volume-low:before {\n    content: \"\\e6c2\";\n}\n.icon-volume-mute:before, .icon-muteAudio:before, .icon-muteAudio:hover:before {\n    content: \"\\e6c3\";\n}\n.icon-checkbox-checked:before {\n    content: \"\\e6d8\";\n}\n.icon-checkbox-unchecked:before {\n    content: \"\\e6d9\";\n}\n.icon-checkbox-partial:before {\n    content: \"\\e6da\";\n}\n.icon-radio-checked:before {\n    content: \"\\e6db\";\n}\n.icon-radio-unchecked:before {\n    content: \"\\e6dc\";\n}\n.icon-arrow-up-thick:before {\n    content: \"\\f5a4\";\n}\n.icon-arrow-down-thick:before {\n    content: \"\\f5a5\";\n}\n.icon-delete:before {\n    content: \"\\f5ab\";\n}\n.icon-delete-outline:before {\n    content: \"\\f5ac\";\n}\n.icon-checkmark6:before {\n    content: \"\\f2c7\";\n}\n.icon-cancel3:before {\n    content: \"\\f2c9\";\n}\n.icon-notice:before {\n    content: \"\\f2cf\";\n}\n.icon-warning2:before {\n    content: \"\\f2d4\";\n}\n.icon-grid5:before {\n    content: \"\\f34b\";\n}\n.icon-resize4:before, .icon-fullScreenContract:before, .icon-fullScreenContract:hover:before, .icon-fullScreenExpand:before, .icon-fullScreenExpand:hover:before {\n    content: \"\\f371\";\n}\n.icon-info8:before {\n    content: \"\\f3a4\";\n}\n.icon-th:before {\n    content: \"\\e602\";\n}\n.icon-signal2:before {\n    content: \"\\f162\";\n}\n.client .icon-cog4:before {\n    content: \"\\f163\";\n}\n.icon-time:before {\n    content: \"\\f167\";\n}\n.icon-volume-off:before {\n    content: \"\\f170\";\n}\n.icon-volume-down:before {\n    content: \"\\f171\";\n}\n.icon-volume-up:before {\n    content: \"\\f172\";\n}\n.icon-facetime-video:before, .icon-selfViewEnable:before, .icon-selfViewEnable:hover:before, .icon-selfViewDisable:before, .icon-selfViewDisable:hover:before {\n    content: \"\\f17f\";\n}\n.icon-share5:before, .icon-transfer:before, .icon-transfer:hover:before {\n    content: \"\\f186\";\n}\n.icon-phone5:before {\n    content: \"\\f1b9\";\n}\n.icon-angle-right:before {\n    content: \"\\f1fe\";\n}\n.icon-logout:before {\n    content: \"\\f45c\";\n}\n.icon-cross4:before {\n    content: \"\\f465\";\n}\n.icon-history2:before {\n    content: \"\\f477\";\n}\n.icon-arrow-right10:before {\n    content: \"\\f4bb\";\n}\n\n\n.remoteVideo\n{\n    border-radius: 0px;\n    border: none;\n    box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);\n    background: #000000;\n    background: -moz-linear-gradient(top,  #181818 0%, #494949 100%);\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#181818), color-stop(100%,#494949));\n    background: -webkit-linear-gradient(top,  #181818 0%,#494949 100%);\n    background: -o-linear-gradient(top,  #181818 0%,#494949 100%);\n    background: -ms-linear-gradient(top,  #181818 0%,#494949 100%);\n    background: linear-gradient(to bottom,  #181818 0%,#494949 100%);\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#181818', endColorstr='#494949',GradientType=0 );\n\n\n    overflow: hidden;\n}\n.started .remoteVideo {\n    box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);\n}\n.videoBar\n{\n    background-image: none;\n    border-radius: 0px;\n    border: none;\n    box-shadow: none;\n    margin-top: 0px;\n    background: #292929;\n    border-top: 1px solid #3c3c3c;\n}\n.videoBar .table\n{\n    margin: 0;\n}\n.selfView-bl .localVideo {\n    top: auto;\n    bottom: 0;\n    left: 0;\n    right: auto;\n}\n.selfView-tl .localVideo {\n    top: 0;\n    bottom: auto;\n    left: 0;\n    right: auto;\n}\n.selfView-tr .localVideo {\n    top: 0;\n    bottom: auto;\n    left: auto !important;\n    right: 0;\n}\n.selfView-br .localVideo {\n    top: auto;\n    bottom: 0;\n    left: auto !important;\n    right: 0;\n}\n.selfView-1x .localVideo {\n    width: 25%;\n    height: 25%;\n}\n.selfView-2x .localVideo {\n    width: 50%;\n    height: 50%;\n}\n.videoBar .icon, .videoBar a\n{\n    font-size: 20px;\n    color: grey;\n    text-decoration: none;\n}\n.videoBar span\n{\n    color: grey;\n}\n.videoBar .cell\n{\n    width: 36px;\n    /*padding-top: 10px;*/\n}\n.videoBar .cell .icon\n{\n    width: 100%;\n    text-align: center;\n    margin-top: 10px;\n    margin-right: 0;\n    margin-left: 0;\n}\n.videoBar .cell .icon a\n{\n    margin: 0;\n}\n.icon\n{\n    cursor: pointer;\n}\n.icon a:hover, .icon span:hover, .videoBar a:hover\n{\n    color: <%= iconHightlightColor %>;\n}\n\n.settingsPopup\n{\n    border: 1px solid #3c3c3c;\n    background: #292929;\n    border-radius: 0px;\n    box-shadow: none;\n    bottom: 40px;\n    right: 0px;\n    top:auto;\n    left: auto;\n    width: 304px !important;\n    /*padding: 16px;*/\n    font-size: 14px;\n    height: 276px;\n    overflow: hidden;\n}\n.settingsPopup span\n{\n    font-size: 14px;\n}\n.settingsPopup input\n{\n    background: #333;\n    border: 1px solid #414141;\n    color: #EEE;\n    padding-left: 5px;\n    line-height: 22px;\n    font-size: 13px;\n}\n.settingsPopup input, .settingsPopup select {\n    margin-left: 14px;    \n}\n/*a, .icon span\n{\n  color:#B3B3B3;\n}\n\n#settingsPopup\n{\n  display: block;\n}\n.settings-popover\n{\n  overflow: auto;\n  width: 500px;\n  height: 200px;\n}*/\n.messages {\n    position:absolute;\n    font-family: arial;\n    text-align: left;\n    width: auto;\n    /*color: #B3B3B3;*/\n    font-size: 12px;\n    bottom:auto;\n    top:10px;\n    left: 10px;\n}\n.videoBar .unmuteAudio\n{\n    margin-top: -1px;\n}\n.videoBar .hold, .videoBar .resume\n{\n    margin-top: -1px;\n}\n.hangup a.icon-phone-hang-up\n{\n    color: #f90007;\n    font-size: 24px;\n}\n.callControl\n{\n    display: block;\n}\n.dialpad button\n{\n    color: #B3B3B3;\n    background: none;\n    border-radius: 0;\n    font-weight: normal;\n    padding: 0;\n    margin:0;\n    border: none;\n    width:50px;\n}\n.dialpad button:hover\n{\n    background: #3a3a3a;\n    box-shadow: none;\n}\n.dialpad button:focus\n{\n    outline: none;\n}\n.dialpad button span\n{\n    display: block;\n    font-size: 8px;\n    text-align: center;\n    font-weight: bold;\n    margin-top: -13px;\n    color: #2D7B99;\n}\n.watermark-icon\n{\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    backface-visibility: hidden;\n    transform: translate(-50%,-50%);\n    color: rgba(255, 255, 255, 0.08);\n    z-index: 1;\n    font-size: 265px;\n    text-align: center;\n    width: 100%;\n}\n.callHistory, .callStats\n{\n    background-color: #292929;\n    border-radius: 0;\n    border: 1px solid #3c3c3c;\n    box-shadow: none;\n    color: #999999;\n    z-index: 200;\n    padding: 10px;\n}\n.callStats {\n    color: <%= statsColor %>;\n}\n.callHistory\n{\n    width: 200px;\n    height: 258px;\n    right: auto;\n    left: 200px;\n    bottom: 40px;\n    top: auto;\n    background: #292929;\n    border: 1px solid #3c3c3c;\n    overflow: hidden;\n    padding: 0;\n}\n.callHistory .content\n{\n    padding: 16px 0 10px 0;\n    height:68%;\n    width: 200px;\n    margin-bottom: 10px;\n    overflow-x: hidden;\n}\n.callHistory .content, .callHistory .callHistoryDetails\n{\n    overflow: auto;\n}\n.callStats\n{\n    top: auto;\n    bottom: 40px;\n    right: 0;\n    left: auto;\n}\n.stats-container\n{\n    margin-bottom: 18px;\n}\n.callLink\n{\n    background: #6F6F6F;\n    float: left;\n    padding: 6px 10px 6px 10px;\n    text-decoration: none;\n    font-weight: bold;\n    color: #FFF !important;\n    border-radius: 50px;\n    font-size: 14px !important;\n}\n.historyDetailsClose\n{\n    text-align: right;\n    margin-top: 10px;\n    display: inline-block !important;\n    height: 26px;\n    margin-top: 0;\n}\n.historyDetailsClose a\n{\n    text-decoration: none;\n    outline-color: rgba(0, 0, 0, 0);\n    color: #aaa;\n    font-size: 18px;\n}\n.dialpad-control-bar\n{\n    margin-top: 6px;\n}\n.dialpad-control-bar .main-button\n{\n    background: #3DA005;\n    border-radius: 14px;\n    width: 70px;\n    padding: 5px;\n    margin: 0 auto;\n}\n.dialpad-control-bar a\n{\n    color: #fff;\n    text-decoration: none;\n    text-align: center;\n    width: 100%;\n    display: inline-block;\n    font-size: 14px;\n    font-weight: 700;\n    letter-spacing: 1;\n}\n.dialpad-control-bar a span\n{\n    margin-right: 5px;\n}\n.destination-container hr\n{\n    border: none;\n    border-bottom: 1px solid #3c3c3c;\n}\n.call {\n    display: block;\n    position: static;\n    top: auto;\n    left: auto;\n}\n.selfViewEnable a, .dialpadIconHide a,.unmuteAudio a,.fullScreenContract a\n{\n    color:#04AFF0 !important;\n}\n.destination\n{\n\n}\n.dialpad .history-button\n{\n    font-size: 16px !important;\n    padding-top: 5px;\n    padding-bottom: 5px;\n    outline: none;\n    position: absolute;\n    right: 4px;\n    top: 5px;\n    width: 25px;\n}\n.dialpad .history-button.active\n{\n    color: #04AFF0;\n}\n.destination::-webkit-input-placeholder {\n    color: #04AFF0;\n    font-style: italic;\n    padding-left: 5px;\n    font-weight: 400;\n}\n.callHistory .hist-direction {\n    position: absolute;\n    color: #3DA005;\n    left: 3px;\n    font-family: arial;\n    font-size: 18px;\n    top:6px;\n}\n.callHistory .actions\n{\n    margin-top: 12px;\n}\n.hist-direction .icon-arrow-down-thick\n{\n    color: #E9651D;\n}\n.callHistory .hist-destination {\n    position: absolute;\n    color: #B3B3B3;\n    left: 25px;\n    font-family: arial;\n    font-size: 18px;\n    text-decoration: none;\n    top: 6px;\n}\n.callHistory .hist-date {\n    position: absolute;\n    color: #B3B3B3;\n    left: 26px;\n    font-family: arial;\n    font-size: 10px;\n    top: 29px;\n}\n.callHistory .hist-length {\n    position: absolute;\n    color: #B3B3B3;\n    left: 104px;\n    font-family: arial;\n    font-size: 10px;\n    top: 29px;\n}\n.history-row\n{\n    position: relative;\n}\n.history-row:hover, .history-row.active\n{\n    background: #353535;\n}\n.history-row .row {\n    display: block;\n    margin: 0;\n    position: relative;\n    height: 46px;\n}\n.hist-details-arrow\n{\n    position: absolute;\n    right: 8px;\n    font-size: 16px;\n    top: 14px;\n}\n.callHistoryDetails\n{\n    width: 194px;\n    height: auto;\n    border: none;\n    clear:both;\n    top: 0;\n    bottom: -1;\n    left: 201px;\n    right: auto;\n    box-shadow: none;\n    border-radius: 0;\n    background: #292929;\n    border: 1px solid #3c3c3c;\n    border-top: none;\n\n}\n.callHistoryDetails .table\n{\n    font-size: 13px;\n    padding-left: 8px;\n}\n.callStats a\n{\n    color:#2BA6CB;\n}\n.default-color\n{\n    color:#2BA6CB;\n}\nul.tabs\n{\n    width: 250px;\n    padding-left: 0;\n}\n.tabs~div p, .tabs~div h3 {\n    margin-bottom:15px;\n    color:#999;\n    font-size: 14px;\n}\n.tabs ~ div {\n    padding:10px;\n    margin-bottom: 10px;\n}\n.tabs li {\n    list-style:none;\n    display:inline;\n}\n.tabs a {\n    padding:5px 10px;\n    display:inline-block;\n    background:#494949;\n    color:#fff;\n    text-decoration:none;\n}\n.tabs a.active {\n    background:#04AFF0;\n    color:#fff;\n}\n.settingsPopup .tabs span\n{\n    margin-right: 5px;\n    color:#fff;\n}\n.timer\n{\n    top: 11px;\n}\n#history-dt-close-container\n{\n    text-align: right;\n}\n.cell-selfView\n{\n    /*padding-left: 12px;*/\n}\n.settings\n{\n    margin-top: 12px !important;\n}\n.settings .icon-settings\n{\n    margin: 0;\n    font-size: 18px;\n    color: #FFF;\n}\n.settingsPopup .btn {\n    background: #04AFF0;\n    color: #FFF;\n    padding: 5px 10px;\n    text-decoration: none;\n    border-radius: 20px;\n    margin-left: 9px;\n    margin-top: 15px;\n    font-weight: 700;\n    text-align: center;\n}\n.settingsPopup .saveSettings, .settingsPopup .clear {\n    display: inline-block\n}\n.settingsPopup .btn:hover {\n    background: #017EAD;\n}\n.settingsPopup .clear\n{\n    color: #04AFF0;\n    margin-left: 10px;\n    text-decoration: none;\n    font-weight: 700;\n}\n.settingsPopup .clear:hover\n{\n    color: #017EAD;\n}\n.videoBar .cell:first-child\n{\n    padding: 0;\n}\n.icon-settings:before\n{\n    opacity: 1;\n}\n\n.client::-webkit-scrollbar {\n    width: 8px;\n}\n\n/* Track */\n.client::-webkit-scrollbar-track {\n\n}\n\n/* Handle */\n.client::-webkit-scrollbar-thumb {\n    background: rgba(39, 39, 39, 1);\n\n}\n.client::-webkit-scrollbar-thumb:window-inactive {\n    background: rgba(39, 39, 39, 1);\n}\n.whiteboard {\n    display: none;\n    position: absolute;\n    top: 40px;\n    left: 378px;\n}\n.whiteboard canvas {\n    border-radius: 4px;\n    border: 2px solid #DDDDDD;\n    box-shadow: 0px 0px 10px #999999;\n}\n.sms {\n    display: none;\n    position: absolute;\n    top: 10px;\n    right: 10px;\n}\n\n.sms .smsView {\n    padding: 10px;\n    border-radius: 4px;\n    border: 2px solid #DDDDDD;\n    box-shadow: 0px 0px 10px #999999;\n}\n.sms .smsLoginForm {\n    width: 250px;\n}\n.sms .smsSendForm {\n    width: 600px;\n    display:none;\n}\n.sms .smsSendBody {\n    width:339px\n}\n.sms .smsInbox {\n    width: 600px;\n    display:none;\n}\n.sms .smsInbox .inner{\n    max-height: 250px;\n    overflow: auto;\n}\n.sms .smsInbox .cell{\n    padding: 5px;\n}\n.sms .smsInbox .from{\n    width:100px\n}\n.sms .smsInbox .status{\n    width:50px\n}\n.sms .smsInbox .time{\n    width:135px\n}\n.sms .smsInbox .body{\n    word-wrap: break-word;\n}\n.sms .smsInbox .body > div{\n    display:none;\n}\n.sms .smsInbox .sms-inbox-item.image .body .image span{\n    margin-right: 5px;\n}\n.sms .smsInbox .sms-inbox-item.text .body .text, .sms .smsInbox .sms-inbox-item.image .body .image,\n.sms .smsInbox .sms-inbox-item.video .body .video, .sms .smsInbox .sms-inbox-item.audio .body .audio{\n    display:block;\n}\n.sms .smsInbox .sms-inbox-item.audio .body .audio audio,\n.sms .smsInbox .sms-inbox-item.video .body .video video{\n    width:100%;\n}\n.sms .smsInbox .actions{\n    width:15px;\n}\n.sms .smsInbox .icon-trash{\n    font-size:15px\n}\n.sms .smsStatus {\n    display:none;\n    text-align: right;\n}\n.sms .smsStatus .content{\n    text-align: right;\n    border: 1px solid #c3c3c3;\n    background-color: #e3e2e2;\n    font-size: 70%;\n    padding: 1px 3px;\n    border-top: 0px;\n    margin-right: 15px;\n    border-bottom-right-radius: 4px;\n    border-bottom-left-radius: 4px;\n}\n.sms .smsStatus.error{\n    color: red;\n}\n.simple_sketch {\n    background-color:white;\n}\n.tools {\n    padding-bottom: 10px;\n}\n.tools a {\n    border: 1px solid black;\n    height: 30px;\n    line-height: 30px;\n    padding: 0 10px;\n    vertical-align: middle;\n    text-align: center;\n    text-decoration: none;\n    display: inline-block;\n    color: black;\n    font-weight: bold;\n}\n.tools a.selected {\n    border-color: red;\n    border-width: 3px;\n}\n\n[id$=\"sample\"]{\n    display:none !important;\n}\n\n#screen_sharing_unsupported span\n{\n    text-decoration: underline;\n}\n#javascript_disabled\n{\n    display:block;\n    background-color:white;\n    color:black;\n}\n#rejectIncomingCallContainer\n{\n    text-align:right;\n}\n\n.videoBar .leftSpacer\n{\n    width:8px;\n}\n.videoBar .cell-hangup\n{\n    width:42px;\n}\n.videoBar .subtitle\n{\n    display:none;\n}\n.videoBar .cell-timer\n{\n    position:relative;\n    top:0;\n    left:0;\n    width:auto;\n}\n.videoBar .rightSpacer\n{\n    width:8px;\n}\n.smsInbox .content\n{\n    display:table-row-group;\n}\n.callStats .spacer\n{\n    height: 15px;\n}\n.callStats .statsDelay\n{\n    display:none;\n}\n.btn-star\n{\n    font-size: 30px;\n    vertical-align: middle;\n}\n.historyClear a\n{\n    text-decoration: none;\n    color: #FFF;\n    font-size: 14px;\n    font-weight: 700;\n    background: #6F6F6F;\n    border-radius: 20px;\n    padding: 5px 10px;\n    margin-left: 15px;\n}\n.historyClear a:hover\n{\n    background: #4E4E4E;\n}\n.classHistoryActions\n{\n    padding-top: 2px;\n}\n.historyClose a\n{\n    color: #04AFF0;\n    font-size: 14px;\n    font-weight: 700;\n    text-decoration: none;\n    margin-left: 8px;\n}\n.historyClose a:hover\n{\n    color: #017EAD;\n}\n.callPopup\n{\n    padding: 0;\n    background: #292929;\n    border: 1px solid #3c3c3c;\n    box-shadow: none;\n    width: 220px;\n    border-radius: 0;\n    height: 168px;\n}\n.callPopup .incomingCallTitle\n{\n    display: block;\n    padding: 8px;\n    font-size: 18px;\n    font-weight: bold;\n    background: #3c3c3c;\n    margin-bottom: 18px;\n    color: #E4E4E4;\n}\n.incomingCallName, .incomingCallUser\n{\n    display: block;\n    margin-left: 10px;\n    margin-bottom: 18px;\n}\n.callPopup .acceptIncomingCall\n{\n    background: #3DA005;\n    border: none;\n    border-radius: 20px;\n    padding: 5px 10px;\n    font-size: 14px;\n    color: #FFF;\n    margin-left: 12px;\n}\n.callPopup #rejectIncomingCallContainer button\n{\n    background: #FF0000;\n    border: none;\n    border-radius: 20px;\n    padding: 5px 10px;\n    font-size: 14px;\n    color: #FFF;\n    margin-right: 12px;\n}\n.client.view-centered\n{\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    backface-visibility: hidden;\n}\na.disabled {\n   pointer-events: none;\n   cursor: default;\n   background-color: #999;\n   opacity: 0.5;\n}";
var templates = require('../js/templates');
var ejs = require('ejs');
var events = require('./EventBus');
var debug = require('debug')('client');
var debugerror = require('debug')('client:ERROR');
debugerror.log = console.warn.bind(console);
var Configuration = require('./Configuration');
var SIPStack = require('./SIPStack');
var Video = require('./Video');
var Sound = require('./Sound');
var XMPP = require('./XMPP');
var SMS = require('./SMS');
var Settings = require('./Settings');
var Stats = require('./Stats');
var Timer = require('./Timer');
var History = require('./History');
var Transfer = require('./Transfer');
var Whiteboard = require('./Whiteboard');
var FileShare = require('./FileShare');
var Authentication = require('./Authentication');
var Icon = require('./Icon');
var WebRTC_C = require('./Constants');
var Utils = require('./Utils');

function Client(config, element) {
  this.config = config;
  if (element) {
    this.appendTo($(element));
  }
}

Client.prototype = {
  setup: function() {
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
    this.errorPopup = this.client.find(".errorPopup");
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
    this.shareScreen = this.client.find(".shareScreen");
    this.stopShareScreen = this.client.find(".stopShareScreen");
    this.screenSharingUnsupported = this.client.find(".screen_sharing_unsupported");


    if (!this.config && typeof(ClientConfig) === 'undefined') {
      $('#unsupported').text("Could not read ClientConfig - make sure it is included and properly formatted");
      $('#unsupported').show();
      return;
    }

    this.config = this.config || Utils.clone(window.ClientConfig);
    this.configuration = new Configuration(this.config);
    this.sipStack = new SIPStack(this.configuration);
    this.sound = new Sound(this.sipStack, this.configuration);
    this.video = new Video(this.client.find('.video'), this.sipStack, {
      onPlaying: function() {
        self.validateUserMediaResolution();
      }
    });
    this.xmpp = new XMPP(this);
    this.sms = new SMS(this, this.client.find(".sms"), this.sound);
    this.settings = new Settings(this, this.configuration, this.sound, this.sipStack);
    this.stats = new Stats(this, this.sipStack, this.configuration);
    this.timer = new Timer(this, this.stats, this.configuration);
    this.history = new History(this, this.sound, this.stats, this.sipStack, this.configuration);
    this.transfer = new Transfer(this, this.sound, this.sipStack, this.configuration);
    this.whiteboard = new Whiteboard(this, this.client.find(".whiteboard"), this.sipStack);
    this.fileShare = new FileShare(this, this.client.find(".file_share"), this.sipStack);
    this.authentication = new Authentication(this.client.find(".authPopup"), {
      onAuthenticate: function(data) {
        self.sipStack.init(data);
      },
      configurationRegister: self.configuration.register,
      settingsUserId: self.settings.userId,
      settingsAuthenticationUserId: self.settings.authenticationUserId,
      settingsPassword: self.settings.password
    });
    this.hold = new Icon(this.client.find(".hold"), this.sound);
    this.resume = new Icon(this.client.find(".resume"), this.sound);
    this.fullScreen = false;
    this.selfViewEnabled = true;
    this.dialpadShown = false;
    this.isScreenSharing = false;

    this.configuration.setSettings(this.settings);

    this.registerListeners();

    this.init();
  },
  appendTo: function(parent) {
    this.updateCss();

    this.wrapper = $('<div/>', {
      class: 'webrtc-wrapper'
    });
    parent.append(this.wrapper);

    var renderData = {};
    var html = ejs.render(templates.webrtc, renderData);
    this.wrapper.html(html);

    this.client = this.wrapper.find('.client');
    this.setup();
  },
  updateCss: function(styleData) {
    this.styleData = styleData || {};
    var cssData = $.extend({}, WebRTC_C.STYLES, WebRTC_C.FONTS, this.styleData);
    console.log(styles);
    var cssStr = ejs.render(styles, cssData);
    if ($("#webrtc_css").length === 0) {
      $("<style type='text/css' id='webrtc_css'>" + cssStr + "</style>").appendTo("head");
    } else {
      $("#webrtc_css").text(cssStr);
    }
  },
  init: function() {
    var self = this;
    var unsupported = Utils.compatibilityCheck(this);
    if (unsupported) {
      $('#unsupported').html(unsupported).show();
    }

    var whiteboardUnsupported = Utils.whiteboardCompabilityCheck();
    if (whiteboardUnsupported) {
      $('#whiteboard_unsupported').html(whiteboardUnsupported).show();
    }

    // Allow some windows to be draggable, required jQuery.UI
    if (this.configuration.enableWindowDrag) {
      $(function() {
        self.video.localHolder.draggable({
          snap: ".remoteVideo,.videoBar",
          containment: ".main",
          snapTolerance: 200,
          stop: function(event, ui) {
            self.settings.updateViewPositions();
          }
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
      self.endCall({
        rtcSession: 'all'
      });
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
    this.main.css("-moz-transform", "scale(" + this.configuration.size + ")");
    if (($.cookie("settingWindowPosition"))) {
      var windowPositions = $.cookie("settingWindowPosition").split('|');
      for (var i = 0; i < windowPositions.length; ++i) {
        var elementPosition = windowPositions[i].split('-');
        this.client.find(elementPosition[0]).css("top", elementPosition[1]);
        this.client.find(elementPosition[0]).css("left", elementPosition[2]);
      }
    }
    // Fade in UI elements
    this.client.find(".remoteVideo, .videoBar").fadeIn(1000);
    if (this.configuration.enableCallControl) {
      this.callControl.fadeIn(1000);
    } else {
      this.callControl.fadeOut(1000);
    }
  },

  find: function(selector) {
    return this.client.find(selector);
  },

  // Display status messages
  message: function(text, level) {
    if (!this.configuration.enableMessages) {
      return;
    }
    var messageEl = this.messages.find("." + level);
    messageEl.stop(true, true).fadeOut();
    messageEl.text(text).fadeIn(10).fadeOut(10000);
  },

  // Make sure destination allowed and in proper format
  validateDestination: function(destination) {
    if (destination.indexOf("sip:") === -1) {
      destination = ("sip:" + destination);
    }
    if (!this.configuration.allowOutside && !new RegExp("[.||@]" + this.configuration.domainTo).test(destination)) {
      this.message(this.configuration.messageOutsideDomain, "alert");
      return (false);
    }
    if ((destination.indexOf("@") === -1)) {
      destination = (destination + "@" + this.configuration.domainTo);
    }
    var domain = destination.substring(destination.indexOf("@"));
    if (domain.indexOf(".") === -1) {
      destination = destination + "." + this.configuration.domainTo;
    }

    // WEBRTC-35 : filter out dtmf tones from destination
    return destination.replace(/,[0-9A-D#*,]+/, '');
  },

  // URL call
  callUri: function(destinationToValidate) {
    if (this.sipStack.getCallState() !== SIPStack.C.STATE_CONNECTED) {
      debug('Already in call with state : ' + this.sipStack.getCallState());
      return;
    }
    if (destinationToValidate === "") {
      this.message(this.configuration.messageEmptyDestination, "alert");
      return;
    }

    var destination = this.validateDestination(destinationToValidate);
    if (destination === false) {
      debug("destination is not valid : " + destinationToValidate);
      return;
    }

    debug("calling destination : " + destination);

    this.message(this.configuration.messageCall, "success");

    // Start the Call
    this.sipStack.call(destination);
  },

  setClientConfig: function(clientConfig) {
    var connectionChanged = this.configuration.websocketsServers[0].ws_uri !== clientConfig.websocketsServers[0].ws_uri;
    jQuery.extend(this.config, clientConfig);
    jQuery.extend(this.configuration, this.config);
    this.guiStart();
    this.updateClientClass();
    if (connectionChanged) {
      this.sipStack.init();
    }
  },

  endCall: function(options) {
    options = options || {};
    var rtcSession = options.rtcSession;
    if (rtcSession === 'all') {
      this.sipStack.terminateSessions();
    } else if (rtcSession) {
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
    if (this.configuration.endCallURL && !this.configuration.disabled) {
      window.location = this.configuration.endCallURL;
    }
  },

  onLoad: function() {
    var self = this;
    debug("onLoad");

    this.sipStack.init();

    if (!this.configuration.enableConnectLocalMedia && this.configuration.destination) {
      events.once("connected", function(e) {
        self.callUri(self.configuration.destination);
      });
    }

    // Start the GUI
    this.guiStart();
  },

  // What we do when we get a digit during a call
  pressDTMF: function(digit) {
    if (digit.length !== 1) {
      return;
    }
    if (this.sipStack.isStarted()) {
      this.destination.val(this.destination.val() + digit);
      this.sound.playClick();
      this.sipStack.sendDTMF(digit);
    }
  },

  resumeCall: function() {
    var self = this;
    this.resume.disable();
    var enable = function() {
      self.resume.enable();
    };
    this.sipStack.unhold(enable, enable);
  },

  hideSelfView: function() {
    this.selfViewEnabled = false;
    this.updateClientClass();
  },

  stopFullScreen: function() {
    if (document.webkitCancelFullScreen) {
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
    if (this.client[0].webkitRequestFullScreen) {
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
    var enable = function() {
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
    if (enabled) {
      var onShareScreenSuccess = function(localMedia) {
        localMedia.onended = function() {
          self.enableScreenSharing(false);
        };
      };
      var onShareScreenFailure = function(e) {
        // no way to distinguish between flag not enabled or simply rejected enabling screen sharing
        if (e) {
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

    events.on("viewChanged", function(e) {
      self.updateClientClass();
    });
    events.on("ended", function(e) {
      self.message(self.configuration.messageEnded.replace('{0}', self.getRemoteUser(e.sender)), "normal");
      self.history.persistCall(e.sender);
      self.endCall({
        rtcSession: e.sender
      });
    });
    events.on("resumed", function(e) {
      self.onSessionStarted(e.sender);
      self.message(self.configuration.messageResume.replace('{0}', self.getRemoteUser(e.sender)), "success");
    });
    events.on("started", function(e) {
      self.onSessionStarted(e.sender);
      var dtmfTones = Utils.parseDTMFTones(self.configuration.destination);
      if (dtmfTones && e.data && !e.data.isReconnect) {
        debug("DTMF tones found in destination - sending DTMF tones : " + dtmfTones);
        self.sipStack.sendDTMF(dtmfTones);
      }
      //remove configuration.destination to avoid multiple calls
      delete self.configuration.destination;
      if (e.data && !e.data.isReconnect) {
        self.message(self.configuration.messageStarted.replace('{0}', self.getRemoteUser(e.sender)), "success");
        self.timer.start();
      }
    });
    events.on("held", function(e) {
      self.message(self.configuration.messageHold.replace('{0}', self.getRemoteUser(e.sender)), "success");
    });
    events.on("disconnected", function(e) {
      if (self.configuration.enableConnectionIcon) {
        self.connected.removeClass("success");
        self.connected.addClass("alert").fadeIn(100);
      }
      var msg = self.configuration.messageConnectionFailed;
      if (e.data && e.data.reason) {
        msg = e.data.reason;
      }
      if (e.data && e.data.retryAfter) {
        msg += " - Retrying in " + e.data.retryAfter + " seconds";
      }
      self.message(msg, "alert");
      self.endCall();
    });
    events.on("failed", function(e) {
      var error = e.data.cause;
      self.message(error, "alert");
      if (error === "User Denied Media Access") {
        self.showErrorPopup("WebRTC was not able to access your microphone/camera!");
      } else if (error === ExSIP.C.causes.CANCELED) {
        self.setEvent("incomingCall-done");
      }
      self.sound.pause();
      self.endCall({
        rtcSession: e.sender
      });
    });
    events.on("progress", function(e) {
      self.message(self.configuration.messageProgress, "normal");
      self.sound.playDtmfRingback();
    });
    events.on("message", function(e) {
      self.message(e.text, e.level);
    });
    events.on("registrationFailed", function(e) {
      self.updateClientClass();
      if (self.configuration.enableRegistrationIcon) {
        //$("#registered").removeClass("success");
        self.registered.addClass("alert").fadeIn(100);
      }
      var statusCode = e.data.response.status_code;
      var msg = statusCode;
      if (statusCode === 403) {
        msg = "403 Authentication Failure";
      }
      self.message(self.configuration.messageRegistrationFailed.replace('{0}', msg), "alert");
    });
    events.on("registered", function(e) {
      self.updateClientClass();
      if (self.configuration.enableRegistrationIcon) {
        self.registered.removeClass("alert");
        self.registered.addClass("success").fadeIn(10).fadeOut(3000);
      }
      self.message(self.configuration.messageRegistered, "success");
    });
    events.on("unregistered", function(e) {
      self.updateClientClass();
      self.message(self.configuration.messageUnregistered || 'Unregistered', "success");
    });
    events.on("connected", function(e) {
      if (self.configuration.enableConnectionIcon) {
        self.connected.removeClass("alert");
        self.connected.addClass("success").fadeIn(10).fadeOut(3000);
      }
      self.message(self.configuration.messageConnected, "success");

      self.sipStack.updateUserMedia(function() {
        if (self.configuration.destination) {
          self.callUri(self.configuration.destination);
        }
      });
    });
    events.on("incomingCall", function(evt) {
      var incomingCallName = evt.data.request.from.display_name;
      var incomingCallUser = evt.data.request.from.uri.user;
      self.message("Incoming Call", "success");
      self.setEvent("incomingCall");
      self.incomingCallName.text(incomingCallName);
      self.incomingCallUser.text(incomingCallUser);
      Utils.rebindListeners("click", [self.rejectIncomingCall, self.acceptIncomingCall, self.holdAndAnswerButton, self.dropAndAnswerButton],
        function(e) {
          e.preventDefault();
          self.incomingCallHandler($(this), evt.data.session);
        }
      );
      self.sound.playRingtone();
    });
    events.on("reInvite", function(e) {
      self.setEvent("reInvite");
      var incomingCallName = e.data.request.from.display_name;
      var incomingCallUser = e.data.request.from.uri.user;
      var title = e.data.audioAdd ? "Adding Audio" : "Adding Video";
      self.message(title, "success");
      self.reInvitePopup.find(".incomingCallName").text(incomingCallName);
      self.reInvitePopup.find(".incomingCallUser").text(incomingCallUser);
      self.reInvitePopup.find(".title").text(title);
      self.acceptReInviteCall.off("click");
      self.acceptReInviteCall.on("click", function() {
        self.setEvent("reInvite-done");
        e.data.session.acceptReInvite();
      });
      self.rejectReInviteCall.off("click");
      self.rejectReInviteCall.on("click", function() {
        self.setEvent("reInvite-done");
        e.data.session.rejectReInvite();
      });
    });
    events.on('newDTMF', function(e) {
      var digit = e.data.tone;
      debug('DTMF sent : ' + digit);
      if (!digit) {
        return;
      }
      var file = null;
      if (digit === "*") {
        file = "star";
      } else if (digit === "#") {
        file = "pound";
      } else {
        file = digit;
      }
      self.sound.playDtmfTone(file);
    });

    // Buttons
    this.shareScreen.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.enableScreenSharing(true);
    });
    this.stopShareScreen.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.enableScreenSharing(false);
    });

    this.callButton.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.callUri(self.destination.val());
    });

    this.hangup.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.endCall();
      if (self.fullScreen) {
        self.fullScreenContractIcon.click();
      }
    });

    this.fullScreenExpandIcon.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.showFullScreen();
    });

    this.fullScreenContractIcon.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.stopFullScreen();
    });
    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
      self.updateFullScreen();
    });

    this.selfViewDisableIcon.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.hideSelfView();
    });

    this.selfViewEnableIcon.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.showSelfView();
    });
    $(".history-button").bind('click', function(e) {
      e.preventDefault();
      self.history.toggle();
    });
    $(".button-row button").bind('click', function(e) {
      e.preventDefault();
      var destinationStr = $("#destination").val();
      $("#destination").val(destinationStr + this.firstChild.nodeValue);
    });

    this.hold.onClick(function(e) {
      self.holdCall();
    });

    this.resume.onClick(function(e) {
      self.resumeCall();
    });

    this.muteAudioIcon.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.muteAudio();
    });

    this.unmuteAudioIcon.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.unmuteAudio();
    });

    this.dialpadShowIcon.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.showDialpad();
      self.destination.focus();
      self.settings.toggleSettings(false);
    });

    this.dialpadHideIcon.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.hideDialpad();
      self.history.historyToggled = true;
      self.history.toggle();
    });

    this.historyClose.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.history.toggle();
    });

    // Dialpad digits
    this.dialpadButtons.bind('click', function(e) {
      self.processDigitInput(e.target.textContent);
    });

    this.destination.keypress(function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        self.callUri(self.destination.val());
      }
    });
    $(".video").bind("click", function(e) {
      var $target = $(e.target);
      var dialpad = $target.closest(".dialpad").length;
      var history = $target.closest(".callHistory").length;
      var details = $target.closest(".callHistoryDetails").length;
      if (dialpad === 0 || history === 0 || details === 0) {
        //$(".callHistory").fadeOut(100);
        self.history.historyToggled = true;
        self.history.toggle();
      }
    });

    // Digits from keyboard
    $(document).unbind('keypress').bind('keypress', function(e) {});

    // Prevent the backspace key from navigating back if dialpad is shown
    $(document).unbind('keydown').bind('keydown', function(event) {
      var isModifier = event.altKey;
      if (isModifier) {
        if (self.transfer.targetInput.is(event.target)) {
          return;
        }

        if (event.which === 83) {
          self.stats.toggle();
        } else if (event.which === 84) {
          self.sms.toggle();
        }
        // toggle whiteboard
        else if (event.which === 87) {
          self.whiteboard.toggle();
        } else if (event.which === 72) {
          self.history.toggle();
        }
        return;
      }

      if (self.dialpadShown) {
        var doPrevent = false;
        if (event.keyCode === 8) {
          var d = event.srcElement || event.target;
          if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' ||
              d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' ||
              d.type.toUpperCase() === 'EMAIL')) || d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
          } else {
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

  processDigitInput: function(digit, event) {
    if (!this.sipStack.isStarted() && this.dialpadShown) {
      // ignore if event happened on destination input itself
      if (event && this.destination.is(event.target)) {
        return;
      }
      this.destination.val(this.destination.val() + digit);
      this.destination.putCursorAtEnd();
    } else if (digit.match(/^[0-9A-D#*,]+$/i)) {
      this.pressDTMF(digit);
    }
  },

  onSessionStarted: function(sender) {
    debug("setting active session to " + sender.id);
    this.sipStack.activeSession = sender;
    this.video.updateSessionStreams(sender);
    this.client.find('.stats-container').attr('id', this.sipStack.getSessionId() + '-1');
    this.sound.pause();
  },

  incomingCallHandler: function(source, session) {
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

  setEvent: function(event) {
    this.event = event;
    this.updateClientClass();
  },

  validateUserMediaResolution: function() {
    var encodingWidth = this.settings.getResolutionEncodingWidth();
    var encodingHeight = this.settings.getResolutionEncodingHeight();
    var videoWidth = this.video.localWidth();
    var videoHeight = this.video.localHeight();
    debug("validating video resolution " + videoWidth + "," + videoHeight + " to match selected encoding " + encodingWidth + "," + encodingHeight);
    if (!videoWidth && !videoHeight) {
      return;
    }

    if (encodingWidth !== videoWidth || encodingHeight !== videoHeight) {
      var msg = "Video resolution " + videoWidth + "," + videoHeight + " does not match selected encoding " + encodingWidth + "," + encodingHeight;
      //        this.message(msg, "alert");
      debugerror(msg);
    }
  },

  setAudioOnlyOfferAndRec: function(audioOnly) {
    this.configuration.audioOnly = audioOnly;
    this.configuration.offerToReceiveVideo = !audioOnly;
    this.sipStack.updateUserMedia();
  },

  setAudioOnly: function(audioOnly) {
    this.configuration.audioOnly = audioOnly;
    this.configuration.offerToReceiveVideo = true;
    this.sipStack.updateUserMedia();
  },

  asScript: function() {
    var self = this;
    var script = '<script src="' + self.src + '" ';
    var dataStrs = Object.keys(self.styleData).filter(function(key) {
      var value = self.styleData[key];
      var defaultValue = WebRTC_C.STYLES[key];
      return !!value && value !== defaultValue;
    }).map(function(key) {
      var value = self.styleData[key];
      return "data-" + key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + "='" + value + "'";
    });
    script += dataStrs.join(' ');

    var config = $.extend({}, this.config);
    Object.keys(config).forEach(function(key) {
      var value = config[key];
      var defaultValue = ClientConfig[key];
      if (!value && !defaultValue) {
        delete config[key];
        return;
      }
      if (Array.isArray(value)) {
        value = JSON.stringify(value);
        defaultValue = JSON.stringify(defaultValue);
      } else {
        value = value + "";
        defaultValue = defaultValue + "";
      }
      if (value === defaultValue) {
        delete config[key];
      }
    });
    script += '>\n' + JSON.stringify(config, undefined, 2) + '\n</script>';
    return script;
  },

  updateClientClass: function() {
    var classes = ["client"];
    classes.push("r" + this.configuration.getResolutionDisplay());
    classes.push(this.configuration.isWidescreen() ? "widescreen" : "standard");
    var callState = this.sipStack.getCallState();
    if (callState) {
      classes.push(callState);
    }
    if (this.sipStack.isRegistered()) {
      classes.push('registered');
    }
    if (this.event) {
      classes.push(this.event);
    }
    if (this.configuration.enableMute) {
      classes.push("enable-mute");
    }
    if (this.configuration.enableShareScreen) {
      classes.push("enable-shareScreen");
    }
    if (this.configuration.enableCallControl) {
      classes.push("enable-call-control");
    }
    if (this.configuration.enableTransfer) {
      classes.push("enable-transfer");
    }
    if (this.configuration.enableHold) {
      classes.push("enable-hold");
    }
    if (this.configuration.enableCallTimer) {
      classes.push("enable-timer");
    }
    if (this.configuration.enableSettings) {
      classes.push("enable-settings");
    }
    if (this.configuration.enableFullScreen) {
      classes.push("enable-full-screen");
    }
    if (this.configuration.enableSelfView) {
      classes.push("enable-self-view");
    }
    if (this.configuration.enableDialpad) {
      classes.push("enable-dialpad");
    }
    var views = this.configuration.getViews();
    if (views && views.length > 0) {
      views.map(function(view) {
        classes.push("view-" + view);
      });
    }
    if (this.configuration.enableScreenSharing) {
      classes.push("enable-screen-sharing");
    }
    if (this.configuration.enableFileShare) {
      classes.push("enable-file-share");
    }
    if (this.configuration.selfViewSize) {
      classes.push("selfView-" + this.configuration.selfViewSize);
    }
    if (this.configuration.selfViewLocation) {
      classes.push("selfView-" + this.configuration.selfViewLocation);
    }
    if (this.sound.muted) {
      classes.push("muted");
    } else {
      classes.push("unmuted");
    }
    if (this.settings.toggled) {
      classes.push("settings-shown");
    } else {
      classes.push("settings-hidden");
    }
    if (this.selfViewEnabled) {
      classes.push("self-view-enabled");
    } else {
      classes.push("self-view-disabled");
    }
    if (this.dialpadShown) {
      classes.push("dialpad-shown");
    } else {
      classes.push("dialpad-hidden");
    }
    if (this.fullScreen) {
      classes.push("full-screen-expanded");
    } else {
      classes.push("full-screen-contracted");
    }
    if (this.isScreenSharing) {
      classes.push("screen-sharing");
    } else {
      classes.push("screen-sharing-off");
    }
    if (this.transfer.visible) {
      classes.push("transfer-visible");
    } else {
      classes.push("transfer-hidden");
    }
    if (this.authentication.visible) {
      classes.push("auth-visible");
    } else {
      classes.push("auth-hidden");
    }
    this.client.attr("class", classes.join(" "));
  }
};
},{"../js/templates":1,"./Authentication":15,"./Configuration":17,"./Constants":18,"./EventBus":20,"./FileShare":21,"./History":22,"./Icon":23,"./SIPStack":24,"./SMS":25,"./Settings":27,"./Sound":28,"./Stats":29,"./Timer":30,"./Transfer":31,"./Utils":32,"./Video":33,"./Whiteboard":35,"./XMPP":36,"debug":9,"ejs":12}],17:[function(require,module,exports){
module.exports = Configuration;

var Flags = {
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

Configuration.Flags = Flags;

var events = require('./EventBus');
var debug = require('debug')('configuration');
var Utils = require('./Utils');
var WebRTC_C = require('./Constants');

function Configuration(configObj) {
  debug('window.location.search : ' + window.location.search);
  debug('configuration options : ' + ExSIP.Utils.toString(configObj));
  jQuery.extend(this, configObj);

  // Default URL variables
  if (Utils.getSearchVariable("disableMessages")) {
    this.enableMessages = false;
  }
  this.destination = this.destination || Utils.getSearchVariable("destination");
  this.networkUserId = this.networkUserId || Utils.getSearchVariable("networkUserId");
  this.hd = (Utils.getSearchVariable("hd") === "true") || $.cookie('settingHD');
  this.audioOnly = (Utils.getSearchVariable("audioOnly") === "true");
  this.sipDisplayName = this.displayName || Utils.getSearchVariable("name") || $.cookie('settingDisplayName');
  if (this.sipDisplayName) {
    this.sipDisplayName = this.sipDisplayName.replace(/%20/g, " ");
  }
  this.maxCallLength = Utils.getSearchVariable("maxCallLength");
  this.size = Utils.getSearchVariable("size") || $.cookie('settingSize') || 1;
  this.color = Utils.colorNameToHex(Utils.getSearchVariable("color")) || $.cookie('settingColor');
  this.offerToReceiveVideo = true;
  var features = Utils.getSearchVariable("features");
  if (features) {
    this.setClientConfigFlags(parseInt(features, 10));
  }
  this.bodyBackgroundColor = $('body').css('backgroundColor');
}

Configuration.prototype = {
  getClientConfigFlags: function() {
    var flags = 0;
    for (var flag in Flags) {
      var value = Flags[flag];
      if (this[flag]) {
        flags |= value;
      }
    }
    return flags;
  },
  setClientConfigFlags: function(flags) {
    for (var flag in Flags) {
      var value = Flags[flag];
      if (flags & value) {
        this[flag] = true;
      } else {
        this[flag] = false;
      }
    }
  },
  isAudioOnlyView: function() {
    var views = this.getViews();
    return views.indexOf('audioOnly') !== -1;
  },
  getViews: function() {
    var view = Utils.getSearchVariable("view");
    var views = [];
    if (this.view) {
      $.merge(views, this.view.split(' '));
    }
    if (view) {
      $.merge(views, view.split(' '));
    }
    return $.unique(views);
  },
  getBackgroundColor: function() {
    return this.color || this.bodyBackgroundColor;
  },
  getPassword: function() {
    return $.cookie('settingPassword');
  },
  isAutoAnswer: function() {
    return this.settings.settingAutoAnswer.is(':checked');
  },
  getDTMFOptions: function() {
    return {
      duration: WebRTC_C.DEFAULT_DURATION,
      interToneGap: WebRTC_C.DEFAULT_INTER_TONE_GAP
    };
  },
  getExSIPOptions: function() {
    // Options Passed to ExSIP
    var options = {
      mediaConstraints: {
        audio: true,
        video: this.getVideoConstraints()
      },
      createOfferConstraints: {
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: !this.isAudioOnlyView() && this.offerToReceiveVideo
        }
      }
    };
    return options;
  },

  getMediaConstraints: function() {
    if (this.client.isScreenSharing) {
      return {
        video: {
          mandatory: {
            chromeMediaSource: 'screen'
          }
        }
      };
    } else {
      return {
        audio: true,
        video: this.getVideoConstraints()
      };
    }
  },

  getVideoConstraints: function() {
    if (this.isAudioOnlyView() || this.audioOnly) {
      return false;
    } else {
      var constraints = this.getResolutionConstraints();
      return constraints ? constraints : true;
    }
  },

  getResolutionConstraints: function() {
    if (this.hd === true) {
      return {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      };
    } else {
      var width = this.settings.getResolutionEncodingWidth();
      var height = this.settings.getResolutionEncodingHeight();
      if (width && height) {
        if (height <= 480) {
          return {
            mandatory: {
              maxWidth: width,
              maxHeight: height
            }
          };
        } else {
          return {
            mandatory: {
              minWidth: width,
              minHeight: height
            }
          };
        }
      } else {
        return false;
      }
    }
  },

  getExSIPConfig: function(data) {
    data = data || {};
    var userid = data.userId || $.cookie('settingUserId') || this.networkUserId || Utils.randomUserid();

    var sip_uri = encodeURI(userid);
    if ((sip_uri.indexOf("@") === -1)) {
      sip_uri = (sip_uri + "@" + this.domainFrom);
    }

    var config = {
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
    if (this.sipDisplayName) {
      config.display_name = this.sipDisplayName;
    }

    // do registration if setting User ID or configuration register is set
    if ($.cookie('settingUserId') || this.register) {
      config.register = true;
      config.password = data.password || $.cookie('settingPassword');
    } else {
      config.register = false;
    }
    return config;
  },

  getRtcMediaHandlerOptions: function() {
    var options = {
      reuseLocalMedia: this.enableConnectLocalMedia,
      videoBandwidth: this.settings.getBandwidth(),
      disableICE: this.disableICE,
      RTCConstraints: {
        'optional': [],
        'mandatory': {}
      }
    };
    return options;
  },

  setSettings: function(settings) {
    this.settings = settings;
  },

  isDebug: function() {
    return this.debug === true;
  },

  isHD: function() {
    return this.enableHD === true && this.hd === true;
  },

  isWidescreen: function() {
    return this.isHD() || this.settings.resolutionType.val() === WebRTC_C.WIDESCREEN;
  },

  setResolutionDisplay: function(resolutionDisplay) {
    this.hd = false;
    this.settings.setResolutionDisplay(resolutionDisplay);
    events.emit('viewChanged');
  },

  getResolutionDisplay: function() {
    return this.isHD() ? WebRTC_C.R_1280x720 : this.settings.getResolutionDisplay();
  }
};
},{"./Constants":18,"./EventBus":20,"./Utils":32,"debug":9}],18:[function(require,module,exports){
var C = {
  WIDESCREEN: 'widescreen',
  STANDARD: 'standard',
  R_1280x720: '1280x720',
  R_640x360: '640x360',
  R_320x180: '320x180',
  R_960x720: '960x720',
  R_640x480: '640x480',
  R_320x240: '320x240',
  DEFAULT_DURATION: 500,
  DEFAULT_INTER_TONE_GAP: 200,

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
C.RESOLUTION_TYPES = {
  'standard': C.STANDARD,
  'widescreen': C.WIDESCREEN
};
C.STANDARD_RESOLUTIONS = {
  '960 x 720': C.R_960x720,
  '640 x 480': C.R_640x480,
  '320 x 240': C.R_320x240
};
C.WIDESCREEN_RESOLUTIONS = {
  '1280 x 720': C.R_1280x720,
  '640 x 360': C.R_640x360,
  '320 x 180': C.R_320x180
};

module.exports = C;
},{}],19:[function(require,module,exports){
module.exports = DateFormat;
var C = {
  dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  mthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
};
C.zeroPad = function(number) {
  return ("0" + number).substr(-2, 2);
};
C.dateMarkers = {
  d: ['getDate', function(v) {
    return C.zeroPad(v);
  }],
  m: ['getMonth', function(v) {
    return C.zeroPad(v + 1);
  }],
  n: ['getMonth', function(v) {
    return C.mthNames[v];
  }],
  w: ['getDay', function(v) {
    return C.dayNames[v];
  }],
  y: ['getFullYear'],
  H: ['getHours', function(v) {
    return C.zeroPad(v);
  }],
  M: ['getMinutes', function(v) {
    return C.zeroPad(v);
  }],
  S: ['getSeconds', function(v) {
    return C.zeroPad(v);
  }],
  i: ['toISOString']
};

DateFormat.C = C;

function DateFormat(fstr) {
  this.formatString = fstr;
}

DateFormat.prototype = {
  format: function(date) {
    var dateTxt = this.formatString.replace(/%(.)/g, function(m, p) {
      var dateMarker = C.dateMarkers[p];
      var method = dateMarker[0];
      var rv = date[method]();

      if (dateMarker[1] !== null) {
        rv = dateMarker[1](rv);
      }

      return rv;

    });

    return dateTxt;
  }
};
},{}],20:[function(require,module,exports){
(function (global){
var util = require('util');
var events = require('events');

function EventBus(){
  events.EventEmitter.call(this);
}

util.inherits(EventBus, events.EventEmitter);

// Assure the configuration object is a singleton.
global.WEBRTC_EVENTBUS = global.WEBRTC_EVENTBUS || new EventBus();
//
// // The module exports a singleton instance of the Config class so the
// // instance is immediately available on require(), and the prototype methods
// // aren't a part of the object namespace when inspected.
module.exports = global.WEBRTC_EVENTBUS;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"events":3,"util":8}],21:[function(require,module,exports){
module.exports = FileShare;

var C = {
  ACTION_REQUEST: 'request',
  ACTION_REPLY: 'reply',
  ACTION_SEND: 'send',
  ACTION_RECEIVED: 'received'
};

FileShare.C = C;

var events = require('./EventBus');
var debug = require('debug')('fileshare');
var Utils = require('./Utils');

function FileShare(element, sipStack) {
  this.ui = element;
  this.fileInput = this.ui.find('input[type="file"]');
  this.status = this.ui.find('.status');

  this.requests = {};
  this.toggled = false;
  this.sipStack = sipStack;

  this.registerListeners();
}

FileShare.prototype = {
  registerListeners: function() {
    var self = this;
    this.fileInput.on('change', $.proxy(this.handleFileSelect, this));

    events.on("dataReceived", function(e) {
      var data = e.data,
        match;
      var regex = /^fileshare:([^:]*):([^:]*):?/;
      if (!!(match = data.match(regex)) ) {
        var fileName = match.pop();
        var action = match.pop();
        data = data.replace(regex, '');
        self.process(action, fileName, data);
      }
    });
  },
  process: function(action, fileName, data) {
    if (action === C.ACTION_REQUEST) {
      var accept = window.confirm("User wants to share the file " + fileName + " with you. Do you want to receive it?");
      this.replyRequest(accept, fileName);
    } else if (action === C.ACTION_REPLY) {
      if (data === 'true') {
        var fileData = this.requests[fileName];
        this.sendFile(fileData, fileName);
      } else {
        this.updateStatus("rejected request for " + fileName);
        delete this.requests[fileName];
      }
    } else if (action === C.ACTION_SEND) {
      this.receivedFile(data, fileName);
    } else if (action === C.ACTION_RECEIVED) {
      this.updateStatus(fileName + " transferred successfully");
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

    this.updateStatus("requesting sending file " + fileName + " ...");
    this.send(C.ACTION_REQUEST, fileName);
  },
  replyRequest: function(accept, fileName) {
    if (accept) {
      this.updateStatus("receiving file " + fileName + " ...");
    }
    this.send(C.ACTION_REPLY, fileName, accept);
  },
  receivedFile: function(data, fileName) {
    this.updateStatus("received file " + fileName);
    var blob = Utils.dataURItoBlob(data);
    window.saveAs(blob, fileName);
    this.send(C.ACTION_RECEIVED, fileName);
  },
  sendFile: function(data, fileName) {
    this.updateStatus("sending file " + fileName + " ...");
    this.send(C.ACTION_SEND, fileName, data);
  },
  send: function(action, fileName, data) {
    var dataString = "fileshare:" + action + ":" + fileName;
    if (data) {
      dataString += ":" + data;
    }
    this.sipStack.sendData(dataString);
  },
  updateStatus: function(status) {
    debug(status, this.client.configuration);
    this.status.text(status);
  },
  fileName: function(file) {
    return file.split('\\').pop();
  }
};
},{"./EventBus":20,"./Utils":32,"debug":9}],22:[function(require,module,exports){
module.exports = History;

var Utils = require('./Utils');
var SIPStack = require('./SIPStack');

function History(client, sound, stats, sipStack, configuration) {
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
}

History.Page = function(number, callsValue) {
  this.number = number;
  this.calls = this.parseCalls(callsValue);
};

History.Page.prototype = {
  callsAsString: function() {
    return this.calls.map(function(call) {
      return call.toString();
    }).join("~");
  },
  parseCalls: function(callsValue) {
    var calls = [];
    if (callsValue.trim().length > 0) {
      var callsArray = callsValue.split("~");
      for (var i = 0; i < callsArray.length; i++) {
        calls.push(new History.Call(callsArray[i]));
      }
    }
    return calls;
  }
};

History.Call = function(value) {
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
  startDate: function() {
    var date = new Date();
    date.setTime(this.startTime);
    return date.toLocaleString();
  },
  destinationWithoutSip: function() {
    return this.destination.replace(/sip:([^@]+)@.+/, "$1");
  },
  toString: function() {
    var values = [this.startTime, this.destination, this.direction, this.resolutionIn, this.resolutionOut, this.bitrateIn,
      this.bitrateOut, this.frameRateIn, this.frameRateOut, this.audioLostPer, this.videoLostPer, this.jitter, this.length
    ];
    return values.join("|");
  }
};

History.prototype = {
  pages: function() {
    var pages = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var regex = new RegExp(/page_(.*)/g);
      var match = regex.exec(key);
      if (match !== null && match.length > 1) {
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
    } else {
      this.historyForward.hide();
    }
    if (this.pageNumber > 0) {
      this.historyBack.show();
    } else {
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
      row.find(".hist-direction").append("<i class='icon-arrow-" + call.direction + "-thick'></i>");
      //row.find(".historyDate").text(call.startDate());
      row.find(".hist-date").text(Utils.formatDateTime(call.startDate()));
      row.find(".hist-length").text(call.length);
      this.rows.push(row);
      row.appendTo(this.content);
    }
  },
  getAllCalls: function() {
    var pages = this.pages();
    var calls = [];
    for (var i = 0; i < pages.length; i++) {
      calls = calls.concat(pages[i].calls);
    }
    return calls;
  },

  callDetailsHandler: function(call) {
    var self = this;
    return function(e) {
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
      self.historyCallLink.text("Call " + call.destinationWithoutSip());
      self.callHistoryDetails.fadeIn(100);
      self.callHistory.css({
        width: "416px"
      });
      $(".history-row").removeClass("active");
      $(this).addClass("active");
    };
  },

  setPageNumber: function(pageNumber) {
    this.pageNumber = pageNumber;
    this.updateContent();
  },

  registerListeners: function() {
    var self = this;

    this.historyForward.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.setPageNumber(self.pageNumber + 1);
    });

    this.historyBack.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.setPageNumber(self.pageNumber - 1);
    });

    this.historyDetailsClose.bind('click', function(e) {
      e.preventDefault();
      self.callHistoryDetails.fadeOut(100);
      self.callHistory.css({
        width: "200px"
      });
    });

    this.historyCallLink.bind('click', function(e) {
      e.preventDefault();
      if (self.sipStack.getCallState() === SIPStack.C.STATE_CONNECTED) {
        self.sound.playClick();
        var destination = self.historyCallLink.attr("data-destination");
        self.client.destination.val(destination);
        self.client.callUri(destination);
        self.callHistory.css({
          width: "200px"
        });
        self.callHistory.fadeOut(100);
      }
      self.callHistoryDetails.hide();
    });

    this.historyClear.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      var pages = self.pages();
      for (var i = 0; i < pages.length; i++) {
        localStorage.removeItem("page_" + (pages[i].number));
      }
      self.setPageNumber(0);
    });
  },

  persistPage: function(page) {
    var key = ("page_" + page.number);
    var value = page.callsAsString();
    localStorage[key] = value;
  },

  persistCall: function(rtcSession) {
    if (!this.configuration.enableCallHistory) {
      return;
    }
    // Get latest cookie
    var pages = this.pages();
    var page = null;
    if (pages.length > 0) {
      page = pages[0];
    } else {
      page = new History.Page(0, "");
    }

    if (page.calls.length >= this.callsPerPage) {
      if (page.number + 1 >= this.maxPages) {
        // remove oldest call and reorder calls to each page
        for (var i = 0; i < pages.length; i++) {
          var lastPageCall = pages[i].calls.pop();
          if (i + 1 < pages.length) {
            pages[i + 1].calls.unshift(lastPageCall);
          }
          this.persistPage(pages[i]);
        }
      } else {
        page = new History.Page(page.number + 1, "");
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
    } else {
      call.direction = "down";
    }
    call.resolutionIn = this.stats.getValue("video", "googFrameWidthReceived") + "x" + this.stats.getValue("video", "googFrameHeightReceived");
    call.resolutionOut = this.stats.getValue("video", "googFrameWidthSent") + "x" + this.stats.getValue("video", "googFrameHeightSent");
    call.bitrateIn = this.stats.getAvg("video", "kiloBitsReceivedPerSecond");
    call.bitrateOut = this.stats.getAvg("video", "kiloBitsSentPerSecond");
    call.frameRateIn = this.stats.getAvg("video", "googFrameRateReceived");
    call.frameRateOut = this.stats.getAvg("video", "googFrameRateSent");
    call.audioLostPer = this.stats.getAvg("audio", "packetsLostPer");
    call.videoLostPer = this.stats.getAvg("video", "packetsLostPer");
    call.jitter = this.stats.getAvg("audio", "googJitterReceived");
    call.length = Utils.format(Math.round(Math.abs((rtcSession.end_time - start) / 1000)));
    return call;
  },

  toggle: function() {
    if (this.configuration.enableCallHistory === true) {
      if (this.historyToggled === false) {
        this.callHistory.fadeIn(100);
        this.historyClear.fadeIn(100);
        this.historyButton.addClass("active");
      } else if (this.historyToggled === true) {
        this.callHistory.fadeOut(100);
        this.historyClear.fadeOut(100);
        this.historyButton.removeClass("active");
      }
    }
    this.historyToggled = !this.historyToggled;
  }
};
},{"./SIPStack":24,"./Utils":32}],23:[function(require,module,exports){
  module.exports = Icon;

  function Icon(element, sound) {
    this.element = element;
    this.sound = sound;
    this.disabled = false;
  }

  Icon.prototype = {
    css: function(name) {
      return this.element.css(name);
    },
    attr: function(name) {
      return this.element.attr(name);
    },
    disable: function() {
      this.disabled = true;
    },
    enable: function() {
      this.disabled = false;
    },
    onClick: function(handler) {
      var self = this;
      this.element.bind("click", function(e) {
        e.preventDefault();
        if (self.disabled) {
          return;
        }
        self.sound.playClick();
        handler(e);
      });
    }
  };
},{}],24:[function(require,module,exports){
module.exports = SIPStack;

var C = {
  // RTCSession states
  STATE_CONNECTED: "connected",
  STATE_DISCONNECTED: "disconnected",
  STATE_CALLING: "calling",
  STATE_STARTED: "started",
  STATE_HELD: "held"
};

SIPStack.C = C;

var events = require('./EventBus');
var debug = require('debug')('sipstack');
var debugerror = require('debug')('sipstack:ERROR');
debugerror.log = console.warn.bind(console);

function SIPStack(configuration) {
  this.configuration = configuration;
  this.ua = null;
  this.activeSession = null;
  this.sessions = [];
}

SIPStack.prototype = {
  getLocalStreams: function() {
    return this.activeSession ? this.activeSession.getLocalStreams() : null;
  },

  getRemoteStreams: function() {
    return this.activeSession ? this.activeSession.getRemoteStreams() : null;
  },

  getSessionId: function() {
    return this.activeSession.id.replace(/\./g, '');
  },

  terminateSession: function(session) {
    session = session || this.activeSession;
    if (!session) {
      return;
    }
    var index = this.sessions.indexOf(session);
    if (index !== -1) {
      this.sessions.splice(index, index + 1);
    }
    if (session.status !== ExSIP.RTCSession.C.STATUS_TERMINATED) {
      session.terminate();
    }
    if (session === this.activeSession) {
      debug("clearing active session");
      this.activeSession = null;
    }
    events.emit('viewChanged', this);
  },

  terminateSessions: function() {
    var allSessions = [];
    allSessions = allSessions.concat(this.sessions);
    for (var i = 0; i < allSessions.length; i++) {
      this.terminateSession(allSessions[i]);
    }
  },

  holdAndAnswer: function(session) {
    var self = this;
    var firstSession = this.activeSession;
    session.on('ended', function() {
      events.emit('message', {text: 'Resuming with ' + firstSession.remote_identity.uri.user, level: 'normal'});
      debug("incoming call ended - unholding first call");
      firstSession.unhold(function() {
        debug("unhold first call successful");
      });
    });
    this.activeSession.hold(function() {
      debug("hold successful - answering incoming call");
      self.answer(session);
    });
  },

  answer: function(session) {
    session.answer(this.configuration.getExSIPOptions());
  },

  hold: function(successCallback, failureCallback) {
    if (this.activeSession) {
      this.activeSession.hold(successCallback, failureCallback);
    }
  },

  unhold: function(successCallback, failureCallback) {
    if (this.activeSession) {
      this.activeSession.unhold(successCallback, failureCallback);
    }
  },

  reconnectUserMedia: function(successCallback, failureCallback) {
    var self = this;
    var onUserMediaUpdateSuccess = function(localMedia) {
      debug("reconnect user media successful");
      if (self.activeSession) {
        self.activeSession.changeSession({
          localMedia: localMedia
        }, function() {
          debug("session changed successfully");
          if (successCallback) {
            successCallback(localMedia);
          }
        }, failureCallback);
      } else if (successCallback) {
        successCallback(localMedia);
      }
    };
    this.updateUserMedia(onUserMediaUpdateSuccess, failureCallback);
  },

  call: function(destination) {
    var session = this.ua.call(destination, this.configuration.getExSIPOptions());
    session.on('failed', function(e) {
      events.emit('failed', e.data);
    });
    events.emit('calling', session);
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
    if (this.activeSession) {
      this.activeSession.sendData(data);
    }
  },

  transfer: function(transferTarget, isAttended) {
    if (isAttended) {
      this.ua.attendedTransfer(transferTarget, this.activeSession);
    } else {
      this.ua.transfer(transferTarget, this.activeSession);
    }
  },

  updateRtcMediaHandlerOptions: function() {
    if (typeof(this.ua) === 'undefined') {
      return;
    }

    this.ua.setRtcMediaHandlerOptions(this.configuration.getRtcMediaHandlerOptions());
  },

  getCallState: function() {
    if (this.sessions.length > 0) {
      if (this.sessions.length === 1 && !this.sessions[0].isStarted()) {
        return C.STATE_CALLING;
      } else {
        if (this.activeSession && this.activeSession.isHeld()) {
          return C.STATE_STARTED + " " + C.STATE_HELD;
        } else {
          return C.STATE_STARTED;
        }
      }
    } else {
      if (this.ua && this.ua.isConnected && this.ua.isConnected()) {
        return C.STATE_CONNECTED;
      } else {
        return C.STATE_DISCONNECTED;
      }
    }
  },

  updateUserMedia: function(userMediaCallback, failureCallback) {
    var self = this;
    if (!this.configuration.disabled && (this.configuration.enableConnectLocalMedia || this.activeSession)) {
      // Connect to local stream
      var options = this.configuration.getExSIPOptions();
      debug("updating user media ...");
      this.ua.getUserMedia(options, function(localStream) {
        events.emit('userMediaUpdated', localStream);
        if (self.activeSession) {
          debug("changing active session ...");
          self.activeSession.changeSession({
            localMedia: localStream,
            createOfferConstraints: options.createOfferConstraints
          }, function() {
            debug('change session succeeded');
          }, function() {
            debug('change session failed');
          });
        }

        if (userMediaCallback) {
          userMediaCallback(localStream);
        }
      }, function(e) {
        events.emit('message', {text: self.configuration.messageGetUserMedia || "Get User Media Failed", level: "alert"});
        if (failureCallback) {
          failureCallback(e);
        }
      }, true);
    }
  },

  // Incoming reinvite function
  incomingReInvite: function(e) {
    if (this.configuration.enableAutoAcceptReInvite) {
      debug("auto accepting reInvite");
      e.data.session.acceptReInvite();
    } else {
      events.emit('reInvite', e.data);
    }
  },

  incomingCall: function(evt) {
    var session = evt.data.session;
    if (!this.activeSession && this.configuration.isAutoAnswer()) {
      session.answer(this.configuration.getExSIPOptions());
    } else {
      events.emit('incomingCall', evt);
    }
  },

  init: function(data) {
    try {
      var self = this;

      if (this.ua) {
        debug('stopping existing UA');
        this.ua.stop();
      }

      if (this.configuration.disabled) {
        return;
      }
      this.ua = new ExSIP.UA(this.configuration.getExSIPConfig(data));

      this.updateRtcMediaHandlerOptions();

      // Start SIP Stack
      this.ua.start();

      // sipStack callbacks
      this.ua.on('connected', function(e) {
        events.emit('viewChanged');
        events.emit('connected', e);
      });
      this.ua.on('disconnected', function(e) {
        events.emit('viewChanged');
        events.emit('disconnected', e);
      });
      this.ua.on('onReInvite', function(e) {
        debug("incoming onReInvite event");
        self.incomingReInvite(e);
      });
      this.ua.on('newRTCSession', function(e) {
        var session = e.data.session;
        self.sessions.push(session);
        events.emit('viewChanged');

        // call event handlers
        session.on('progress', function(e) {
          events.emit('progress', e);
        });
        session.on('failed', function(e) {
          events.emit('failed', e);
        });
        session.on('started', function(e) {
          events.emit('viewChanged', self);
          events.emit('started', e);
        });
        session.on('resumed', function(e) {
          events.emit('viewChanged', self);
          events.emit('resumed', e);
        });
        session.on('held', function(e) {
          events.emit('viewChanged', self);
          events.emit('held', e);
        });
        session.on('ended', function(e) {
          events.emit('ended', e);
        });
        session.on('newDTMF', function(e) {
          events.emit('newDTMF', e);
        });
        session.on('dataSent', function(e) {
          events.emit('dataSent', e);
        });
        session.on('dataReceived', function(e) {
          events.emit('dataReceived', e);
        });
        // handle incoming call
        if (e.data.session.direction === "incoming") {
          self.incomingCall(e);
        } else {
          if (!self.activeSession) {
            debug('new active session : ' + session.id);
            self.activeSession = session;
          }
        }
      });

      this.ua.on('registered', function() {
        events.emit('registered');
      });
      this.ua.on('unregistered', function() {
        events.emit('unregistered');
      });
      this.ua.on('registrationFailed', function(e) {
        events.emit('registrationFailed', e);
      });
    } catch (e) {
      debugerror('could not init sip stack', e);
    }
  }
};
},{"./EventBus":20,"debug":9}],25:[function(require,module,exports){
module.exports = SMS;

var events = require('./EventBus');
var debug = require('debug')('sms');
var SMSProvider = require('./SMSProvider');
var DateFormat = require('./DateFormat');
var Utils = require('./Utils');

function SMS(element, sound) {
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

  this.smsProvider = new SMSProvider();
  this.toggled = false;

  this.registerListeners();
}

SMS.InboxItem = function(sms, message) {
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
  this.dateFormat = new DateFormat('%m/%d/%y %H:%M:%S');

  this.registerListeners();

  this.updateContent(message);

  return this;
};

SMS.InboxItem.prototype = {
  registerListeners: function() {
    var self = this;
    this.removeLink.bind('click', function() {
      self.sms.remove(self.message, self);
    });
  },
  enableActions: function(enable) {
    this.removeLink.attr('disabled', !enable);
  },
  updateContent: function(message) {
    var messageType = this.getMessageType(message);
    this.cloned.addClass(messageType);

    this.from.text(message.tn);
    this.status.text(SMS.getStatusAsString(message.status));
    this.time.text(this.dateFormat.format(new Date(message.time)));

    var body = message.body.trim();
    if (messageType === 'image') {
      this.bodyImageLink.attr('href', message.mmscontentlocation);
      this.bodyImageText.text(body);
      if (message.mmscontentthumbnail) {
        this.bodyImageThumbnail.attr('src', 'data:' + message.mmscontentsubtype + ';base64,' + message.mmscontentthumbnail);
      }
    } else if (messageType === 'video') {
      this.bodyVideo.attr('src', message.mmscontentlocation);
      this.bodyVideo.text(body);
    } else if (messageType === 'audio') {
      this.bodyAudio.attr('src', message.mmscontentlocation);
      this.bodyAudio.text(body);
    } else {
      this.bodyText.html(body);
    }
  },
  getMessageType: function(message) {
    if (message.mmscontentsubtype && message.mmscontentsubtype.indexOf('image/') !== -1) {
      return 'image';
    } else if (message.mmscontentsubtype && message.mmscontentsubtype.indexOf('video/') !== -1) {
      return 'video';
    } else if (message.mmscontentsubtype && message.mmscontentsubtype.indexOf('audio/') !== -1) {
      return 'audio';
    } else {
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

SMS.getStatusAsString = function(status) {
  if (status === 'N') {
    return "New";
  } else if (status === 'U') {
    return "Unread";
  } else if (status === 'R') {
    return "Read";
  } else if (status === 'L') {
    return "Locked";
  } else if (status === 'D') {
    return "Deleted";
  } else {
    throw new Error('Unsupported status : ' + status);
  }
};

SMS.prototype = {
  registerListeners: function() {
    var self = this;

    events.on('smsLoggedIn', function() {
      self.onLoggedIn();
    });
    events.on('smsSent', function() {
      self.status.hide();
      self.sendBody.val('');
      self.sendTo.val('');
      self.sendButton.attr('disabled', false);
    });
    events.on('smsReadAll', function(e) {
      self.status.hide();
      var messages = e.messages;

      messages = messages.sort(function(a, b) {
        return b.time - a.time;
      });

      var incomingMessages = $.grep(messages, function(n) {
        return (n.dir === 'I');
      });
      //        var outgoingMessages = $.grep(messages, function( n, i ) {
      //          return ( n.dir === 'O' );
      //        });
      self.updateInbox(incomingMessages);
    });

    this.loginLink.bind('click', function(e) {
      e.preventDefault();
      self.login(self.nameInput.val(), self.passwordInput.val());
    });
    this.passwordInput.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        self.login(self.nameInput.val(), self.passwordInput.val());
      }
    });
    this.sendButton.bind('click', function(e) {
      e.preventDefault();
      self.sendSMS();
    });
    this.sendBody.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        self.sendSMS();
      }
    });
  },

  remove: function(message, inboxItem) {
    var self = this;
    this.sound.playClick();
    if (!window.confirm("Do you really want to delete SMS from " + message.tn + "?")) {
      return;
    }
    this.info("Deleting SMS...");
    if (inboxItem) {
      inboxItem.enableActions(false);
    }
    this.smsProvider.remove([message.mid], function() {
      self.status.hide();
      inboxItem.remove();
    }, function(msg) {
      self.error("Deleting SMS failed : " + msg);
      inboxItem.enableActions(true);
    });
  },

  login: function(name, password) {
    var self = this;
    this.sound.playClick();
    this.info("Logging in...");
    this.smsProvider.login(name, password, function(msg) {
      self.error("Logging failed : " + msg);
    });
  },

  onNotification: function(notifications) {
    var needsRead = false,
      self = this;
    if (!notifications) {
      return;
    }

    for (var i = 0; i < notifications.length; i++) {
      if (notifications[i].action === 'new-rec' || notifications[i].action === 'update' || notifications[i].action === 'delete') {
        needsRead = true;
        break;
      }
    }
    if (needsRead) {
      this.smsProvider.readAll(function(msg) {
        self.error("Fetching SMS failed : " + msg);
      });
    }
  },

  enableUpdate: function(enable) {
    this.enableUpdate = enable;
    this.triggerUpdate();
  },

  triggerUpdate: function() {
    var self = this;
    if (this.enableUpdate && !this.pendingUpdate) {
      debug('triggering getUpdate');
      this.pendingUpdate = true;
      this.smsProvider.getUpdate(function(notifications) {
        self.pendingUpdate = false;
        self.onNotification(notifications);
        self.triggerUpdate();
      }, function() {
        self.pendingUpdate = false;
        self.error("Technical problems connecting to server - auto refresh disabled");
      });
    }
  },

  sendSMS: function() {
    var self = this;
    this.sound.playClick();
    var msg = this.validateSendForm();
    if (msg !== "") {
      this.error(msg);
      return;
    }
    this.info("Sending SMS...");
    this.sendButton.attr("disabled", true);
    this.smsProvider.sendSMS([this.sendTo.val()], this.sendBody.val(), function(msg) {
      self.sendButton.attr("disabled", false);
      self.error("Sending SMS failed : " + msg);
    });

  },

  validateSendForm: function() {
    var to = this.sendTo.val();
    var msgs = [];
    if (to === '') {
      msgs.push('Please enter a phone number to send to');
    } else if (!Utils.isValidUsPstn(to)) {
      msgs.push(to + ' not a valid US phone number');
    }

    var body = this.sendBody.val();
    if (body === '') {
      msgs.push('Please enter a text to send');
    }

    return msgs.join('\n');
  },

  onLoggedIn: function() {
    var self = this;
    this.loginForm.hide();
    this.inbox.show();
    this.sendForm.show();
    this.enableUpdate(true);
    this.smsProvider.readAll(function(msg) {
      self.error("Fetching SMS failed : " + msg);
    });
    this.info("Fetching SMS...");
  },

  updateInbox: function(messages) {
    this.inboxContent.html('');
    this.inboxItems = [];
    for (var i = 0; i < messages.length; i++) {
      var inboxItem = new SMS.InboxItem(this, messages[i]);
      inboxItem.appendTo(this.inboxContent);
      this.inboxItems.push(inboxItem);
    }
  },

  setStatus: function(msg, type) {
    this.status.show();
    this.status.attr("class", type);
    this.statusContent.text(msg);
  },

  error: function(msg) {
    this.setStatus(msg, "error");
  },

  info: function(msg) {
    this.setStatus(msg, "info");
  },

  toggle: function() {
    if (ClientConfig.enableSMS) {
      if (this.toggled) {
        this.view.fadeOut(100);
      } else {
        this.view.fadeIn(100);
      }
      this.toggled = !this.toggled;
    }
  }
};
},{"./DateFormat":19,"./EventBus":20,"./SMSProvider":26,"./Utils":32,"debug":9}],26:[function(require,module,exports){
module.exports = SMSProvider;

var events = require('./EventBus');
var debug = require('debug')('smsprovider');
var debugerror = require('debug')('client:ERROR');
debugerror.log = console.warn.bind(console);

function SMSProvider() {
  this.init();
}

SMSProvider.prototype = {
  send: function(type, restSuffix, jsonData, successCallback, failureCallback, isJsonp) {
    //      $.flXHRproxy.registerOptions("http://"+ClientConfig.smsHost+"/", {xmlResponseText:false});
    //      $.ajaxSetup({transport:'flXHRproxy'});

    var url = "http://" + ClientConfig.smsHost + "/" + ClientConfig.smsUser + "/" + restSuffix;
    if (this.sessionid) {
      url += ";jsessionid=" + this.sessionid;
    }
    debug("Request to " + url + " : " + ExSIP.Utils.toString(jsonData));
    $.ajax({
        crossDomain: true,
        contentType: type === "GET" ? "text/plain" : "text/plain",
        dataType: isJsonp ? "jsonp" : "json",
        type: type,
        url: url,
        data: type === "GET" ? jsonData : JSON.stringify(jsonData)
      })
      .done(function(msg) {
        if (msg.status === "empty" || msg.status === "success" || msg.status.code === "0000001") {
          debug("Response successful : " + ExSIP.Utils.toString(msg));
          if (successCallback) {
            successCallback(msg);
          }
        } else {
          debugerror("Response failed : " + ExSIP.Utils.toString(msg));
          if (failureCallback) {
            failureCallback(msg.status.message);
          }
        }
      })
      .fail(function(jqXHR, textStatus) {
        debugerror('Response error : ' + textStatus);
        if (failureCallback) {
          failureCallback(textStatus);
        }
      });
  },

  getUpdate: function(onNotification, onFailure) {
    var onSuccess = function(msg) {
      debug("received notification : " + ExSIP.Utils.toString(msg));
      onNotification(msg.notifications);
    };
    var data = {
      fid: this.name,
      platform: "fmc"
    };
    this.send("GET", "getUpdate", data, onSuccess, onFailure, false);
  },
  sendSMS: function(desttnarray, body, onFailure) {
    var onSuccess = function(msg) {
      debug("sent msg " + msg + " to " + desttnarray);
      events.emit('smsSent', {
        desttnarray: desttnarray,
        body: body
      });
    };
    var data = {
      desttnarray: desttnarray,
      body: body
    };
    this.send("POST", "ua/msg/sms/send", data, onSuccess, onFailure);
  },
  remove: function(mids, onSuccess, onFailure) {
    var data = {
      mids: mids
    };
    this.send("POST", "ua/msg/sms/delete", data, function() {
      debug("Deleted msgs : " + mids);
      if (onSuccess) {
        onSuccess();
      }
    }, onFailure);
  },
  readAll: function(onFailure) {
    var onSuccess = function(msg) {
      debug("Read all mgs : " + ExSIP.Utils.toString(msg.messages));
      events.emit('smsReadAll', {
        messages: msg.messages
      });
    };
    var data = null;
    this.send("GET", "ua/msg/sms/all", data, onSuccess, onFailure);
  },
  login: function(name, password, onFailure) {
    var self = this;
    var onSuccess = function(msg) {
      self.sessionid = msg.sessionid;
      self.name = name;
      debug("Logged in " + name + " : " + msg.sessionid);
      events.emit('smsLoggedIn');
    };
    var data = {
      spcode: ClientConfig.smsSpcode,
      password: password,
      name: name,
      platform: "fmc"
    };
    this.send("POST", "ua/login", data, onSuccess, onFailure);
  },

  init: function() {
    this.registerListeners();
  },
  registerListeners: function() {
    //      var self = this;
    //      this.eventBus.on("started", function(e){
    //        self.statusBeforeCall = converse.getStatus();
    //        debug('status before call : '+self.statusBeforeCall, self.client.configuration);
    //        converse.setStatus('dnd');
    //      });
    //      this.eventBus.on("ended", function(e){
    //        debug('reset status to : '+self.statusBeforeCall, self.client.configuration);
    //        converse.setStatus(self.statusBeforeCall);
    //      });
  }
};
},{"./EventBus":20,"debug":9}],27:[function(require,module,exports){
module.exports = Settings;

var events = require('./EventBus');
var debug = require('debug')('settings');
var debugerror = require('debug')('settings:ERROR');
debugerror.log = console.warn.bind(console);
var WebRTC_C = require('./Constants');
var Utils = require('./Utils');

function Settings(client, configuration, sound, sipStack) {
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
  this.sipStack = sipStack;
  this.toggled = false;
  this.settingsChanged = false;

  var self = this;
  this.cookiesMapper = {
    'settingDisplayName': {
      name: 'displayName',
      initValue: function() {
        return self.configuration.sipDisplayName || $.cookie('settingDisplayName');
      },
      inputSetter: function(val) {
        self.displayNameInput.val(val);
      },
      inputGetter: function() {
        return self.displayNameInput.val();
      }
    },
    'settingUserId': {
      name: 'userId',
      inputSetter: function(val) {
        self.userIdInput.val(val);
      },
      inputGetter: function() {
        return self.userIdInput.val();
      }
    },
    'settingPassword': {
      name: 'password',
      inputSetter: function(val) {
        self.passwordInput.val(val);
      },
      inputGetter: function() {
        return self.passwordInput.val();
      }
    },
    'settingAuthenticationUserId': {
      name: 'authenticationUserId',
      inputSetter: function(val) {
        self.authenticationUserIdInput.val(val);
      },
      inputGetter: function() {
        return self.authenticationUserIdInput.val();
      }
    },
    'settingSelfViewDisable': {
      name: 'selfViewDisable',
      initValue: function() {
        return $.cookie('settingSelfViewDisable') === "true";
      },
      inputSetter: function(val) {
        self.settingSelfViewDisable.prop('checked', val);
      },
      inputGetter: function() {
        return self.settingSelfViewDisable.prop('checked');
      }
    },
    'settingHD': {
      name: 'hd',
      initValue: function() {
        return $.cookie('settingHD') === "true";
      },
      inputSetter: function(val) {
        self.settingHD.prop('checked', val);
      },
      inputGetter: function() {
        return self.settingHD.prop('checked');
      }
    },
    'settingBandwidthLow': {
      name: 'bandwidthLow',
      initValue: function() {
        return self.configuration.bandwidthLow || $.cookie('settingBandwidthLow');
      },
      inputSetter: function(val) {
        self.bandwidthLowInput.val(val);
      },
      inputGetter: function() {
        return self.bandwidthLowInput.val();
      }
    },
    'settingBandwidthMed': {
      name: 'bandwidthMed',
      initValue: function() {
        return self.configuration.bandwidthMed || $.cookie('settingBandwidthMed');
      },
      inputSetter: function(val) {
        self.bandwidthMedInput.val(val);
      },
      inputGetter: function() {
        return self.bandwidthMedInput.val();
      }
    },
    'settingBandwidthHigh': {
      name: 'bandwidthHigh',
      initValue: function() {
        return self.configuration.bandwidthHigh || $.cookie('settingBandwidthHigh');
      },
      inputSetter: function(val) {
        self.bandwidthHighInput.val(val);
      },
      inputGetter: function() {
        return self.bandwidthHighInput.val();
      }
    },
    'settingColor': {
      name: 'color',
      initValue: function() {
        return self.configuration.getBackgroundColor();
      },
      inputSetter: function(val) {
        self.colorInput.val(val || '#ffffff');
      },
      inputGetter: function() {
        return self.colorInput.val();
      }
    },
    'settingResolutionDisplay': {
      name: 'resolutionDisplay',
      initValue: function() {
        return self.configuration.displayResolution || $.cookie('settingResolutionDisplay') || WebRTC_C.DEFAULT_RESOLUTION_DISPLAY;
      },
      inputSetter: function(val) {
        self.setResolutionDisplay(val);
      },
      inputGetter: function() {
        return self.getResolutionDisplay();
      }
    },
    'settingResolutionEncoding': {
      name: 'resolutionEncoding',
      initValue: function() {
        return self.configuration.encodingResolution || $.cookie('settingResolutionEncoding') || WebRTC_C.DEFAULT_RESOLUTION_ENCODING;
      },
      inputSetter: function(val) {
        self.setResolutionEncoding(val);
      },
      inputGetter: function() {
        return self.getResolutionEncoding();
      }
    },
    'settingSize': {
      name: 'size',
      initValue: function() {
        return self.configuration.size || $.cookie('settingSize');
      },
      inputSetter: function(val) {
        self.settingSize.val(val);
      },
      inputGetter: function() {
        return self.settingSize.val();
      }
    },
    'settingAutoAnswer': {
      name: 'autoAnswer',
      initValue: function() {
        return $.cookie('settingAutoAnswer') === "true";
      },
      inputSetter: function(val) {
        self.settingAutoAnswer.prop('checked', val);
      },
      inputGetter: function() {
        return self.settingAutoAnswer.prop('checked');
      }
    },
    'settingWindowPosition': {
      name: 'windowPosition',
      inputSetter: function() {},
      inputGetter: function() {
        return ".localVideo" + "-" + self.localVideoTop.val() + "-" + self.localVideoLeft.val() + "|" +
          ".callHistory" + "-" + self.settingCallHistoryTop.val() + "-" + self.settingCallHistoryLeft.val() + "|" +
          ".callStats" + "-" + self.settingCallStatsTop.val() + "-" + self.settingCallStatsLeft.val();
      }
    }
  };

  function makeAccessor(cookie) {
    var mapping = self.cookiesMapper[cookie];
    self[mapping.name] = function(value) {
      if (arguments.length === 1) {
        mapping.inputSetter(value);
        if (value) {
          $.cookie(cookie, value, {
            expires: self.configuration.expires
          });
        } else {
          $.removeCookie(cookie);
        }
      } else {
        return mapping.inputGetter();
      }
    };
  }
  for (var cookie in this.cookiesMapper) {
    makeAccessor(cookie);
  }

  this.registerListeners();
  this.initUi();
  this.updateRowVisibility();
  this.updatePageColor();
  this.initializeTabs();
}

Settings.prototype = {
  registerListeners: function() {
    var self = this;

    events.on("ended", function() {
      if (self.settingsChanged) {
        self.reload();
      }
    });
    events.on("registered", function() {
      self.enableRegistration(true);
    });
    events.on("unregistered", function() {
      self.enableRegistration(true);
    });
    events.on("registrationFailed", function() {
      self.enableRegistration(true);
    });
    this.resolutionTypeSelect.bind('change', function() {
      self.updateResolutionSelectVisibility();
    });
    this.settingsIcon.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.toggled = !self.toggled;
      self.client.updateClientClass();
      self.client.toggleDialpad(false);
      self.client.history.historyToggled = true;
      self.client.history.toggle();
    });

    this.colorInput.bind('change', function() {
      self.updatePageColor();
    });
    this.clearLink.on('click', function(e) {
      e.preventDefault();
      self.resetLayout();
      events.emit('message', {text: 'Settings reset'});
    });
    this.signOutBtn.on('click', function(e) {
      e.preventDefault();
      self.signOut();
    });
    this.saveBtn.bind('click', function(e) {
      e.preventDefault();
      self.save();
    });
    this.signInBtn.bind('click', function(e) {
      e.preventDefault();
      self.signIn();
    });
    this.bandwidthLowInput.bind('blur', function() {
      self.client.sipStack.updateRtcMediaHandlerOptions();
    });
    this.bandwidthMedInput.bind('blur', function() {
      self.client.sipStack.updateRtcMediaHandlerOptions();
    });
    this.bandwidthHighInput.bind('blur', function() {
      self.client.sipStack.updateRtcMediaHandlerOptions();
    });
    this.resolutionType.bind('change', function() {
      self.client.updateClientClass();
      self.client.sipStack.updateRtcMediaHandlerOptions();
      self.client.sipStack.updateUserMedia();
    });
    this.resolutionDisplayWidescreen.bind('change', function() {
      self.client.updateClientClass();
    });
    this.resolutionDisplayStandard.bind('change', function() {
      self.client.updateClientClass();
    });
    this.resolutionEncodingWidescreen.bind('change', function() {
      self.client.sipStack.updateRtcMediaHandlerOptions();
      self.client.sipStack.updateUserMedia();
    });
    this.resolutionEncodingStandard.bind('change', function() {
      self.client.sipStack.updateRtcMediaHandlerOptions();
      self.client.sipStack.updateUserMedia();
    });
  },
  updateRowVisibility: function() {
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
  getBandwidth: function() {
    var height = this.getResolutionEncodingHeight();
    if (height <= 240) {
      return this.bandwidthLowInput.val();
    } else if (height <= 480) {
      return this.bandwidthMedInput.val();
    } else if (height <= 720) {
      return this.bandwidthHighInput.val();
    }
  },
  reload: function() {
    location.reload(0);
  },
  updatePageColor: function() {
    var color = this.configuration.getBackgroundColor();
    debug('updating page color : ' + color);
    $('body').css('backgroundColor', color || '');
  },
  initUi: function() {
    Utils.addSelectOptions(WebRTC_C.RESOLUTION_TYPES, this.resolutionType);
    Utils.addSelectOptions(WebRTC_C.STANDARD_RESOLUTIONS, this.resolutionDisplayStandard);
    Utils.addSelectOptions(WebRTC_C.WIDESCREEN_RESOLUTIONS, this.resolutionDisplayWidescreen);
    Utils.addSelectOptions(WebRTC_C.STANDARD_RESOLUTIONS, this.resolutionEncodingStandard);
    Utils.addSelectOptions(WebRTC_C.WIDESCREEN_RESOLUTIONS, this.resolutionEncodingWidescreen);

    for (var cookie in this.cookiesMapper) {
      var mapping = this.cookiesMapper[cookie];
      var value = mapping.initValue ? mapping.initValue() : $.cookie(cookie);
      mapping.inputSetter(value);
    }
    // this.updateViewPositions();
  },
  updateViewPositions: function() {
    var localVideoPosition = this.client.video.local.position();
    if (localVideoPosition && localVideoPosition.top !== 0 && localVideoPosition.left !== 0) {
      this.localVideoTop.val(localVideoPosition.top);
      this.localVideoLeft.val(localVideoPosition.left);
    }
    var callHistoryPosition = this.client.callHistory.position();
    if (callHistoryPosition && callHistoryPosition.top !== 0 && callHistoryPosition.left !== 0) {
      this.settingCallHistoryTop.val(callHistoryPosition.top);
      this.settingCallHistoryLeft.val(callHistoryPosition.left);
    }
    var callStatsPosition = this.client.callStats.position();
    if (callStatsPosition && callStatsPosition.top !== 0 && callStatsPosition.left !== 0) {
      this.settingCallStatsTop.val(callStatsPosition.top);
      this.settingCallStatsLeft.val(callStatsPosition.left);
    }
  },
  updateResolutionSelectVisibility: function() {
    var resolutionType = this.resolutionType.val();
    this.resolutionDisplayStandard.toggle(resolutionType === WebRTC_C.STANDARD);
    this.resolutionEncodingStandard.toggle(resolutionType === WebRTC_C.STANDARD);
    this.resolutionDisplayWidescreen.toggle(resolutionType === WebRTC_C.WIDESCREEN);
    this.resolutionEncodingWidescreen.toggle(resolutionType === WebRTC_C.WIDESCREEN);
  },

  setResolutionDisplay: function(resolution) {
    this.setResolution(resolution, this.resolutionDisplayStandard, this.resolutionDisplayWidescreen);
  },
  setResolutionEncoding: function(resolution) {
    this.setResolution(resolution, this.resolutionEncodingStandard, this.resolutionEncodingWidescreen);
  },
  setResolution: function(resolution, resolutionStandard, resolutionWidescreen) {
    if (Utils.containsKey(WebRTC_C.STANDARD_RESOLUTIONS, resolution)) {
      this.resolutionType.val(WebRTC_C.STANDARD);
      resolutionStandard.val(resolution);
    } else if (Utils.containsKey(WebRTC_C.WIDESCREEN_RESOLUTIONS, resolution)) {
      this.resolutionType.val(WebRTC_C.WIDESCREEN);
      resolutionWidescreen.val(resolution);
    } else {
      debugerror('no resolution type for ' + resolution);
    }
    this.updateResolutionSelectVisibility();
  },
  getResolutionDisplay: function() {
    return this.getResolution(this.resolutionDisplayStandard, this.resolutionDisplayWidescreen);
  },
  getResolutionEncodingWidth: function() {
    var resolution = this.getResolutionEncoding();
    if (!$.isBlank(resolution)) {
      var resolutions = resolution.split('x');
      return parseInt(resolutions[0], 10);
    }
  },
  getResolutionEncodingHeight: function() {
    var resolution = this.getResolutionEncoding();
    if (!$.isBlank(resolution)) {
      var resolutions = resolution.split('x');
      return parseInt(resolutions[1], 10);
    }
  },
  getResolutionEncoding: function() {
    return this.getResolution(this.resolutionEncodingStandard, this.resolutionEncodingWidescreen);
  },
  getResolution: function(resolutionStandard, resolutionWidescreen) {
    var resolutionType = this.resolutionType.val();
    if (resolutionType === WebRTC_C.STANDARD) {
      return resolutionStandard.val();
    } else if (resolutionType === WebRTC_C.WIDESCREEN) {
      return resolutionWidescreen.val();
    } else {
      return false;
    }
  },
  changed: function() {
    if (!this.sipStack.activeSession) {
      this.reload();
    } else {
      this.settingsChanged = true;
    }
  },
  save: function() {
    this.sound.playClick();
    this.persist();
    this.toggled = false;
    this.client.updateClientClass();
    this.changed();
  },
  enableRegistration: function(enable) {
    this.signInBtn.removeClass("disabled");
    this.signOutBtn.removeClass("disabled");
    if (!enable) {
      this.signInBtn.addClass("disabled");
      this.signOutBtn.addClass("disabled");
    }
  },
  signIn: function() {
    this.sound.playClick();
    this.persist();
    this.sipStack.init();
    this.enableRegistration(false);
  },
  signOut: function() {
    this.sound.playClick();
    this.sipStack.unregister();
    this.clearConfigurationCookies();
    this.enableRegistration(false);
  },
  resetLayout: function() {
    this.resolutionEncoding(WebRTC_C.DEFAULT_RESOLUTION_ENCODING);
    this.resolutionDisplay(WebRTC_C.DEFAULT_RESOLUTION_DISPLAY);
    this.client.updateClientClass();
  },
  clearConfigurationCookies: function() {
    $.removeCookie('settingDisplayName');
    $.removeCookie('settingUserId');
    $.removeCookie('settingAuthenticationUserId');
    $.removeCookie('settingPassword');
  },
  clearConfiguration: function() {
    this.displayName(null);
    this.userId(null);
    this.authenticationUserId(null);
    this.password(null);
  },
  clear: function() {
    for (var cookie in this.cookiesMapper) {
      var mapping = this.cookiesMapper[cookie];
      this[mapping.name](null);
    }
  },
  persist: function() {
    for (var cookie in this.cookiesMapper) {
      var mapping = this.cookiesMapper[cookie];
      $.cookie(cookie, mapping.inputGetter(), {
        expires: this.configuration.expires
      });
    }
  },
  toggleSettings: function(flag) {
    this.toggled = flag;
    this.client.updateClientClass();
  },
  initializeTabs: function() {
    $('ul.tabs').each(function() {
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
        $content = $(this.hash);
        $active.addClass('active');
        $content.show();
        e.preventDefault();
      });
    });
  }
};
},{"./Constants":18,"./EventBus":20,"./Utils":32,"debug":9}],28:[function(require,module,exports){
module.exports = Sound;

var events = require('./EventBus');
var WebRTC_C = require('./Constants');

function Sound(sipStack, configuration) {
  this.sipStack = sipStack;
  this.soundOut = document.createElement("audio");
  this.soundOut.volume = configuration.volumeClick;
  this.soundOutDTMF = document.createElement("audio");
  this.soundOutDTMF.volume = configuration.volumeDTMF;
  this.muted = false;

  this.registerListeners();
}

Sound.prototype = {
  registerListeners: function() {
    var self = this;
    events.on("resumed", function() {
      self.updateLocalAudio();
    });
    events.on("started", function() {
      self.updateLocalAudio();
    });
    events.on("userMediaUpdated", function() {
      self.updateLocalAudio();
    });
  },

  setMuted: function(muted) {
    this.muted = muted;
    events.emit('viewChanged');
    this.updateLocalAudio();
  },

  updateLocalAudio: function() {
    this.enableLocalAudio(!this.muted);
  },

  enableLocalAudio: function(enabled) {
    var localStreams = this.sipStack.getLocalStreams();
    if (!localStreams || localStreams.length === 0) {
      return;
    }
    var localMedia = localStreams[0];
    var localAudio = localMedia.getAudioTracks()[0];
    localAudio.enabled = enabled;
  },

  pause: function() {
    this.soundOut.pause();
    this.soundOutDTMF.pause();
  },

  playDtmfRingback: function() {
    this.playDtmf("dtmf-ringback", {
      loop: true
    });
  },

  playRingtone: function() {
    this.play("ringtone", {
      loop: true
    });
  },

  playDtmfTone: function(tone) {
    this.playDtmf("dtmf-" + tone);
  },

  playClick: function() {
    this.play("click");
  },

  play: function(media, options) {
    this.playTone(this.soundOut, media, options);
  },

  playTone: function(audioSource, media, options) {
    // avoid restarting same playing audio
    if (audioSource.getAttribute("src") === media && !audioSource.paused) {
      return;
    }
    options = options || {};
    audioSource.setAttribute("src", WebRTC_C.MEDIA[media]);
    if (options.loop) {
      audioSource.setAttribute("loop", "true");
    } else {
      audioSource.removeAttribute("loop");
    }
    audioSource.play();
  },

  playDtmf: function(media, options) {
    this.playTone(this.soundOutDTMF, media, options);
  }
};
},{"./Constants":18,"./EventBus":20}],29:[function(require,module,exports){
module.exports = Stats;

function Stats(client, sipStack, configuration) {
  this.ui = client.find('.callStats');

  this.statsToggled = false;
  this.sipStack = sipStack;
  this.configuration = configuration;

  this.initialize();
}

Stats.prototype = {
  toggle: function() {
    if (this.configuration.enableCallStats) {
      if (this.statsToggled === false) {
        this.ui.fadeIn(100);
      } else if (this.statsToggled === true) {
        this.ui.fadeOut(100);
      }
    }
    this.statsToggled = !this.statsToggled;
  },

  getReportById: function(reports, id) {
    for (var i = 0; i < reports.length; i++) {
      if (reports[i].id === id) {
        return reports[i];
      }
    }
    return null;
  },

  processStats: function() {
    var self = this;

    var peerConnection = this.sipStack.activeSession.rtcMediaHandler.peerConnection;

    peerConnection.getStats(function(stats) {
      var results = stats.result();
      var reports = [];
      for (var i = 0; i < results.length; ++i) {
        var res = results[i];
        var report = self.getReportById(reports, res.id);
        if (!report) {
          report = {};
          report.type = res.type;
          report.id = res.id;
        }

        var names = res.names();
        var values = [];
        for (var j = 0; j < names.length; j++) {
          var name = names[j];
          if (!name) {
            continue;
          }
          var value = res.stat(name);
          values.push(name);
          values.push(value);
        }
        var valueObj = {};
        valueObj.timestamp = res.timestamp;
        valueObj.values = values;
        report.stats = valueObj;
        reports.push(report);
      }
      var data = {
        "lid": 1,
        "pid": self.sipStack.getSessionId(),
        "reports": reports
      };
      addStats(data);
    });
  },

  getDataSerie: function(type, label, sessionId) {
    var dataSeries = getDataSeriesByLabel(sessionId || this.sipStack.getSessionId(), type, label);
    var result;
    for (var i = 0; i < dataSeries.length; i++) {
      var dataSerie = dataSeries[i];
      if (!result || dataSerie.getAvg() > result.getAvg()) {
        result = dataSerie;
      }
    }
    return result;
  },

  getStatValues: function(type, label, sessionId) {
    var dataSerie = this.getDataSerie(type, label, sessionId);
    return dataSerie ? dataSerie.dataPoints_.map(function(e) {
      return e.value;
    }) : null;
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
    var classes = jQuery.grep($(parentSelector).attr('class').split(" "), function(n) {
      return n.indexOf(className) === -1;
    });
    if (selected) {
      classes.push(id + '-selected');
      if (id !== className) {
        classes.push(className + '-selected');
      }
    }
    var classNames = classes.join(" ");
    $(parentSelector).attr('class', classNames);

  },

  getValue: function(type, name) {
    return $('[data-type="' + type + '"][data-var="' + name + '"]').text();
  },

  getAvg: function(type, name) {
    return Math.round(($('[data-type="' + type + '"][data-var="' + name + '"]').attr("data-avg") * 100)) / 100.0;
  },

  initialize: function() {
    var self = this;
    $("a.stats-var").click(function() {
      var index = $(".stats-var").index($(this)[0]);
      self.setSelected("stats" + index, this.callStats);
    });
  }
};
},{}],30:[function(require,module,exports){
module.exports = Timer;

var debug = require('debug')('timer');
var Utils = require('./Utils');

function Timer(client, stats, configuration) {
  this.text = client.find(".timer");

  this.client = client;
  this.stats = stats;
  this.configuration = configuration;
  this.callTimer = null;
  this.startTime = null;

  this.updateText();
}

Timer.prototype = {
  start: function() {
    if (this.callTimer) {
      debug('timer ' + this.callTimer + ' already running');
      return;
    }

    var timer = this.runningTimer();
    this.callTimer = setInterval(timer, 1000);
    debug("started timer interval : " + this.callTimer);
  },

  stop: function() {
    this.startTime = null;
    clearInterval(this.callTimer);
    debug("cleared timer interval : " + this.callTimer);
    this.callTimer = null;
    this.updateText();
  },

  getSeconds: function() {
    return Math.round((new Date().getTime() - (this.startTime || new Date().getTime())) / 1000);
  },

  updateText: function() {
    var secs = this.getSeconds();
    this.text.text(Utils.format(secs));
  },

  // Display the timer on the screen
  runningTimer: function() {
    var self = this;
    this.startTime = new Date().getTime();
    return function() {
      var secs = self.getSeconds();
      if (self.configuration.maxCallLength && secs >= self.configuration.maxCallLength) {
        self.client.terminateSessions();
        self.client.endCall();
        return;
      }
      self.updateText();
      if (self.configuration.enableCallStats && Utils.isChrome()) {
        self.stats.processStats();
      }
    };
  }
};
},{"./Utils":32,"debug":9}],31:[function(require,module,exports){
module.exports = Transfer;

function Transfer(client, sound, sipStack, configuration) {
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
}

Transfer.prototype = {
  registerListeners: function() {
    var self = this;
    this.icon.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.setVisible(!self.visible);
      if (self.visible) {
        self.targetInput.focus();
      }
    });

    this.accept.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      var targetInput = self.targetInput.val();
      if ($.isBlank(targetInput)) {
        self.client.message(self.configuration.messageOutsideDomain, "alert");
        return;
      }
      targetInput = self.client.validateDestination(targetInput);
      self.setVisible(false);
      self.sipStack.transfer(targetInput, self.typeAttended.is(':checked'));
    });

    this.reject.bind('click', function(e) {
      e.preventDefault();
      self.sound.playClick();
      self.setVisible(false);
    });
  },

  setVisible: function(visible) {
    this.visible = visible;
    this.client.updateClientClass();
  }
};
},{}],32:[function(require,module,exports){
var Utils = {
  clone: function(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

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
    return $.inArray(value, $.map(object, function(key) { return key; })) !== -1;
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

module.exports = Utils;
},{}],33:[function(require,module,exports){
module.exports = Video;

var events = require('./EventBus');
var debug = require('debug')('video');

function Video(element, sipStack, options) {
  this.ui = element;
  this.local = this.ui.find('.localVideo video');
  this.localHolder = this.ui.find('.localVideo');
  this.remote = this.ui.find('.remoteVideo');

  this.options = options || {};
  this.sipStack = sipStack;

  this.registerListeners();
}

Video.prototype = {
  registerListeners: function() {
    var self = this;
    this.local.bind("playing", function() {
      self.options.onPlaying();
    });
    events.on("userMediaUpdated", function(e) {
      self.updateStreams([e && e.localStream], []);
    });
  },

  updateSessionStreams: function() {
    this.updateStreams(this.sipStack.getLocalStreams(), this.sipStack.getRemoteStreams());
  },

  updateStreams: function(localStreams, remoteStreams) {
    debug("updating video streams");
    this.setVideoStream(this.local[0], localStreams);
    this.setVideoStream(this.remote[0], remoteStreams);
  },

  localWidth: function() {
    return this.local[0].videoWidth;
  },

  localHeight: function() {
    return this.local[0].videoHeight;
  },

  setVideoStream: function(video, streams) {
    var hasStream = streams && streams.length > 0 && typeof(streams[0]) !== 'undefined' && !streams[0].ended;
    if (video && video.mozSrcObject !== undefined) {
      if (hasStream) {
        video.mozSrcObject = streams[0];
        video.play();
      } else {
        video.mozSrcObject = null;
      }
    } else if (video) {
      if (hasStream) {
        video.src = (window.URL && window.URL.createObjectURL(streams[0])) || streams[0];
      } else {
        video.src = "";
      }
    }
  }

};
},{"./EventBus":20,"debug":9}],34:[function(require,module,exports){
var Client = require('./Client');
var Utils = require('./Utils');
var WebRTC = {
  Client: Client,
  Utils: Utils,
  Sound: require('./Sound')
};

module.exports = WebRTC;

Object.defineProperties(WebRTC, {
  version: {
    get: function() {
      return '<%= pkg.version %>';
    }
  },
  name: {
    get: function() {
      return '<%= pkg.title %>';
    }
  }
});

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
      bg = elem.currentStyle.backgroundColor;
    } else if (window.getComputedStyle) {
      bg = document.defaultView.getComputedStyle(elem,
        null).getPropertyValue("background-color");
    }
    if (bg.search("rgb") === -1 || bg === 'transparent') {
      return bg;
    } else {
      bg = bg.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+).*\)$/);
      var hex = function(x) {
        return ("0" + parseInt(x, 10).toString(16)).slice(-2);
      };
      return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
    }
  }
};

$(document).ready(function() {
  var nodes = $("script[src*='webrtc-bundle']");
  if (nodes.length === 0) {
    console.error('no <script> with webrtc-bundle.js found');
    return;
  }

  window.BroadSoftWebRTC = window.BroadSoftWebRTC || {};
  window.BroadSoftWebRTC.clients = [];

  $.each(nodes, function(i, node) {
    node = $(node);
    if (!node.text()) {
      return;
    }
    var configData = JSON.parse(node.text());
    console.log("script config : ", configData);
    var clientConfig = Utils.clone(window.ClientConfig);
    var config = $.extend({}, clientConfig, configData);
    console.log("merged config : ", config);
    var client = new Client(config, node.parent());
    var styleData = node.data();
    if (styleData) {
      client.updateCss(styleData);
    }
    client.src = node[0].src;
    node.remove();
    window.BroadSoftWebRTC.clients.push(client);
  });
});

(function($) {
  $.isBlank = function(obj) {
    return (!obj || $.trim(obj) === "");
  };
})(jQuery);

if (typeof String.prototype.endsWith !== 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}
},{"./Client":16,"./Sound":28,"./Utils":32}],35:[function(require,module,exports){
module.exports = Whiteboard;

var events = require('./EventBus');

function Whiteboard(client, element, sipStack) {
  this.whiteboard = element;
  this.canvas = this.whiteboard.find('.simple_sketch');
  this.context = this.canvas[0].getContext('2d');

  this.toggled = false;
  this.client = client;
  this.sipStack = sipStack;

  this.color = '#000';
  this.size = 5;
  this.tool = 'marker';
  this.action = [];

  this.initCanvas();
  this.registerListeners();
  this.updateToolsSelection();
}

Whiteboard.prototype = {
  registerListeners: function() {
    var self = this;
    events.on("dataReceived", function(e) {
      var data = e.data;
      var regex = /^whiteboard:/;
      if (data.match(regex)) {
        data = data.replace(regex, '');
        var img = new Image();
        img.onload = function() {
          self.clear();
          self.context.drawImage(img, 0, 0); // Or at whatever offset you like
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

    this.canvas.bind('click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel', jQuery.proxy(this, "onEvent"));

    $('body').delegate("a[href=\"." + (this.canvas.attr('class')) + "\"]", 'click', function() {
      var $canvas, $this, key, sketch, _i, _len, _ref;
      $this = $(this);
      $canvas = $($this.attr('href'));
      sketch = $canvas.data('sketch');
      _ref = ['color', 'size', 'tool'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        var value = $this.attr("data-" + key);
        if (value) {
          if (key === "size") {
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
    $.each(this.whiteboard.find(".tools a"), function() {
      var selected = $(this).data('color') === self.color || $(this).data('tool') === self.tool || +$(this).data('size') === self.size;
      if (selected) {
        $(this).attr('class', 'selected');
      } else {
        $(this).attr('class', '');
      }
    });
  },
  sendData: function() {
    var data = this.canvas[0].toDataURL();
    this.sipStack.sendData("whiteboard:" + data);
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
    if (this.painting) {
      this.action.events.push({
        x: e.pageX - this.canvas.offset().left,
        y: e.pageY - this.canvas.offset().top,
        event: e.type
      });
      if (this.tool === 'marker') {
        this.draw(this.action);
      } else if (this.tool === 'eraser') {
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
    this.context.globalCompositeOperation = oldcomposite;
    return this.context.globalCompositeOperation;
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
    } else {
      this.whiteboard.fadeIn(100);
    }
    this.toggled = !this.toggled;
  }
};
},{"./EventBus":20}],36:[function(require,module,exports){
module.exports = XMPP;

var events = require('./EventBus');
var debug = require('debug')('xmpp');
var debugerror = require('debug')('xmpp:ERROR');
debugerror.log = console.warn.bind(console);

function XMPP(client) {
  this.client = client;

  this.init();
}

XMPP.prototype = {
  init: function() {
    if (ClientConfig.enableXMPP) {
      try {
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
      } catch (e) {
        debugerror("Could not init XMPP chat : " + e);
      }
    }
  },
  registerListeners: function() {
    var self = this;
    events.on("started", function() {
      self.statusBeforeCall = converse.getStatus();
      debug('status before call : ' + self.statusBeforeCall);
      converse.setStatus('dnd');
    });
    events.on("ended", function() {
      debug('reset status to : ' + self.statusBeforeCall);
      converse.setStatus(self.statusBeforeCall);
    });
  }
};
},{"./EventBus":20,"debug":9}]},{},[34]);
