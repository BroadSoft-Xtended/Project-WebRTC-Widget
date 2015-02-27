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


    // authentication.jade compiled template
    templatizer["authentication"] = function tmpl_authentication() {
        return '<div class="authPopup fadeable popup"><span>User ID</span><br/><input type="text" value="" class="userid"/><br/><span>Auth User ID</span><br/><input type="text" value="" class="authUserid"/><br/><span>Password</span><br/><input type="password" value="" class="password"/><br/><br/><div class="alert"></div><button type="button" class="ok button">Sign in</button></div>';
    };

    // client.jade compiled template
    templatizer["client"] = function tmpl_client() {
        return '<div class="wrapper bdsft-reset bdsft-client"><div id="unsupported" class="unsupported"></div><div id="whiteboard_unsupported" class="unsupported"></div><div id="screen_sharing_unsupported" class="unsupported">Could not retrieve screen capture. Do you have it enabled?<br/>Open link to check : <span>chrome://flags/#enable-usermedia-screen-capture</span></div><noscript><div id="javascript_disabled" class="unsupported">JavaScript must be enabled to load the WebRTC client</div></noscript><div id="conversejs"></div><div id="client" class="client"><div class="main"><div class="errorPopup"></div></div></div></div>';
    };

    // connectionstatus.jade compiled template
    templatizer["connectionstatus"] = function tmpl_connectionstatus() {
        return '<div class="connection-status"><div class="icon connectedIcon fadeable"><span title="Websockets Status" class="icon-link exario"></span></div><div class="icon registeredIcon fadeable"><span title="Registered" class="icon-link exario"></span></div></div>';
    };

    // dialpad.jade compiled template
    templatizer["dialpad"] = function tmpl_dialpad() {
        return '<div class="dialpad fadeable popup"><div class="callControl destination-container"><input type="text" onclick="this.focus();this.select()" class="destination"/><button title="Call History" class="historyButton"><i class="icon-clock"></i></button><hr/></div><div class="button-row"><button class="keys">1</button><button class="keys">2</button><button class="keys">3</button></div><div class="button-row"><button class="keys">4</button><button class="keys">5</button><button class="keys">6</button></div><div class="button-row"><button class="keys">7</button><button class="keys">8</button><button class="keys">9</button></div><div class="button-row"><button class="keys btn-star">*</button><button class="keys">0</button><button class="keys">#</button></div><div class="dialpad-control-bar"><div class="call main-button"><a href="">Call</a></div></div></div>';
    };

    // fileshare.jade compiled template
    templatizer["fileshare"] = function tmpl_fileshare() {
        return '<div class="fileshare-container table"><div class="cell"><div class="file_share fadeable"><span>Share File:</span><br/><input type="file" class="file"/><div class="status"></div></div></div></div>';
    };

    // history.jade compiled template
    templatizer["history"] = function tmpl_history() {
        return '<div class="callHistory popup fadeable"><div class="content"></div><div class="classHistoryActions"><!--<span class="historyBack">\n<a href="" title="Previous" class="icon-arrow-up-thick"></a>\n</span>--><span class="historyClear"><a href="" title="Clear History">Clear</a></span><span class="historyClose"><a href="" title="Close History">Close</a></span><!--<span class="historyForward">\n<a href="" title="Next" class="icon-arrow-down-thick"></a>\n</span>--></div><div class="callHistoryDetails popup"><div id="history-dt-close-container"><span class="historyDetailsClose cell"><a href="" title="Close" class="icon-cancel3"></a></span></div><div class="table"><div class="row"><div class="cell">Resolution In : </div><div class="resolutionIn cell default-color"></div></div><div class="row"><div class="cell">Resolution Out : </div><div class="resolutionOut cell default-color"></div></div><div class="row"><div class="cell">Bitrate In : </div><div class="bitrateIn cell default-color"></div></div><div class="row"><div class="cell">Bitrate Out : </div><div class="bitrateOut cell default-color"></div></div><div class="row"><div class="cell">Frame Rate In : </div><div class="frameRateIn cell default-color"></div></div><div class="row"><div class="cell">Frame Rate Out : </div><div class="frameRateOut cell default-color"></div></div><div class="row"><div class="cell">Audio Lost : </div><div class="audioLostPer cell default-color">%</div></div><div class="row"><div class="cell">Video Out : </div><div class="videoLostPer cell default-color">%</div></div><div class="row"><div class="cell">Jitter : </div><div class="jitter cell default-color"></div></div></div><div class="actions table"><a href="" title="Call" class="callLink cell"></a></div></div><div class="historyRowSample"><div class="row"><a href="" title="Number" class="hist-destination"></a><span class="hist-direction"></span><span class="hist-date"></span><span class="hist-length"></span><span class="hist-details-arrow icon-angle-right"></span></div></div></div>';
    };

    // incomingcall.jade compiled template
    templatizer["incomingcall"] = function tmpl_incomingcall() {
        return '<div class="callPopup fadeable popup"><span class="incomingCallTitle">Incoming Call</span><span class="incomingCallName"></span><span class="incomingCallUser"></span><div class="table"><div class="cell"><button type="button" class="fadeable acceptIncomingCall button">Accept</button><button type="button" class="fadeable holdAndAnswerButton button">Hold And Answer</button><button type="button" class="fadeable dropAndAnswerButton button">Drop And Answer</button></div><div id="rejectIncomingCallContainer" class="cell"><button type="button" class="rejectIncomingCall button">Reject</button></div></div></div>';
    };

    // messages.jade compiled template
    templatizer["messages"] = function tmpl_messages() {
        return '<div class="messages"><div class="alert"></div><div class="success"></div><div class="warning"></div><div class="normal"></div></div>';
    };

    // quality.jade compiled template
    templatizer["quality"] = function tmpl_quality() {
        return '<div class="quality quality1"><span title="Call Quality" class="icon-quality icon-quality1"></span></div><div class="quality quality2"><span title="Call Quality" class="icon-quality icon-quality2"></span></div><div class="quality quality3"><span title="Call Quality" class="icon-quality icon-quality3"></span></div><div class="quality quality4"><span title="Call Quality" class="icon-quality icon-quality4"></span></div>';
    };

    // reinvite.jade compiled template
    templatizer["reinvite"] = function tmpl_reinvite() {
        return '<div class="reInvitePopup fadeable popup"><span class="title">ReInvite</span><br/><br/><span class="incomingCallName"></span><br/><span class="incomingCallUser"></span><br/><br/><button type="button" class="acceptReInviteCall button">Accept</button><button type="button" class="rejectReInviteCall button">Reject</button></div>';
    };

    // settings.jade compiled template
    templatizer["settings"] = function tmpl_settings() {
        return '<div class="settingsPopup table collapse fixed fadeable popup"><div class="row"><ul class="tabs"><li><a href="#tab1" class="configure"><span class="icon-cog"></span>Configure</a></li><li><a href="#tab2" class="layout"><span class="icon-th"></span>Layout</a></li></ul><div id="tab1"><div class="displayNameRow row"><span class="cell">Display Name</span><input type="text" value="" class="displayName cell"/></div><div class="authenticationUseridRow row"><span class="cell">Auth User ID</span><input type="text" value="" class="authenticationUserid cell"/></div><div class="useridRow row"><span class="cell">User ID</span><input type="text" value="" class="userid cell"/></div><div class="passwordRow row"><span class="cell">Password</span><input type="password" value="" class="password cell"/></div><div class="hdRow row"><span class="cell">Start in HD</span><input type="checkbox" class="hd cell"/><br/></div><div class="autoAnswerRow row"><span class="cell">Auto Answer</span><input type="checkbox" class="autoAnswer cell"/></div><div class="bandwidthRow row"><span class="cell">Bandwidth</span><span class="cell"><input type="text" maxlength="4" value="" placeholder="low" class="bandwidthLow short"/><input type="text" maxlength="4" value="" placeholder="medium" class="bandwidthMed short"/><input type="text" maxlength="4" value="" placeholder="high" class="bandwidthHigh short"/></span></div><div class="row"><span class="cell"><a href="" title="Sign In" class="btn signIn">Sign In</a><a href="" title="Sign Out" class="btn signOut">Sign Out</a></span></div></div><div id="tab2"><div class="selfViewDisableRow row"><span class="cell">Disable Self View</span><input type="checkbox" class="selfViewDisable cell"/></div><div class="resolutionRow"><div class="row"><span class="resolutionTypeRow cell">Mode</span><select class="resolutionType cell"></select></div><div class="row"><span class="resolutionDisplayRow cell">Resolution</span><span class="cell"><select class="resolutionDisplayStandard resolutionSubType"></select><select class="resolutionDisplayWidescreen resolutionSubType"></select></span></div><div class="row"><span class="resolutionEncodingRow cell">Encoding</span><span class="cell"><select class="resolutionEncodingStandard resolutionSubType"></select><select class="resolutionEncodingWidescreen resolutionSubType"></select></span></div></div><div class="row"><span class="cell"><a href="" title="Save Settings" class="btn save">Save Settings</a><a href="" title="Reset Settings" class="clear">Reset Settings</a></span></div></div></div></div>';
    };

    // sms.jade compiled template
    templatizer["sms"] = function tmpl_sms() {
        return '<div class="sms fadeable popup"><div class="view"><div class="table fixed loginForm"><div class="row"><label class="cell">Name:</label><input type="text" name="name" placeholder="Email or TN" class="cell name"/></div><div class="row"><label class="cell">Password:</label><input type="password" name="password" class="cell password"/></div><div class="row"><div class="cell"></div><input type="button" value="Log In" class="cell loginLink"/></div></div><div class="inbox hidden"><fieldset><legend>Inbox</legend><div class="inner"><div class="table fixed"><div class="row"><div class="cell title statusCol">Status</div><div class="cell title time">Received</div><div class="cell title from">From</div><div class="cell title body">Message</div><div class="cell title actions"></div></div><div class="inboxContent"></div></div></div></fieldset></div><div class="sendForm"><div><div><span>To</span><input type="text" placeholder="US Phone Number" class="sendTo"/><span>Text</span><input type="text" placeholder="Message to Send" class="sendBody"/><input type="button" value="Send SMS" class="sendButton"/></div></div></div><div id="sample" class="inboxItem inboxItemSample row"><div class="statusCol cell"></div><div class="time cell"></div><div class="from cell"></div><div class="body cell"><div class="image"><a href="" target="_blank"><span></span><img src=""/></a></div><div class="video"><video controls=""></video></div><div class="audio"><audio controls=""></audio></div><div class="text"></div></div><div class="actions cell"><a href="javascript:;" title="Delete SMS" class="icon-trash icon-highlightable"></a></div></div></div><div class="status"><span class="statusContent"></span></div></div>';
    };

    // stats.jade compiled template
    templatizer["stats"] = function tmpl_stats() {
        return '<div class="stats fadeable popup"><div class="statsContainer"></div><div class="table fixed collapse"><div class="heading"><div class="cell">Video Stats</div><div class="cell">Audio Stats</div></div><div class="row"><div class="cell">Bitrate out: <a href="javascript:;" data-type="video" data-var="kiloBitsSentPerSecond" class="statsVar"></a> kb/s</div><div class="cell">Bitrate out: <a href="javascript:;" data-type="audio" data-var="kiloBitsSentPerSecond" class="statsVar"></a> kb/s</div></div><div class="row"><div class="cell">Bitrate in: <a href="javascript:;" data-type="video" data-var="kiloBitsReceivedPerSecond" class="statsVar"></a> kb/s</div><div class="cell">Bitrate in: <a href="javascript:;" data-type="audio" data-var="kiloBitsReceivedPerSecond" class="statsVar"></a> kb/s</div></div><div class="row"><div class="cell">Lost: <a href="javascript:;" data-type="video" data-var="packetsLost" class="statsVar"></a> packets (<a href="javascript:;" data-type="video" data-var="packetsLostPer" class="statsVar"></a> %)</div><div class="cell">Lost: <a href="javascript:;" data-type="audio" data-var="packetsLost" class="statsVar"></a> packets (<a href="javascript:;" data-type="audio" data-var="packetsLostPer" class="statsVar"></a> %)</div></div><div class="row"><div class="cell">Frame rate out: <a href="javascript:;" data-type="video" data-var="googFrameRateSent" class="statsVar"></a> in: <a href="javascript:;" data-type="video" data-var="googFrameRateReceived" class="statsVar"></a></div><div class="cell">Audio Level out: <a href="javascript:;" data-type="audio" data-var="audioInputLevel" class="statsVar"></a> in: <a href="javascript:;" data-type="audio" data-var="audioOutputLevel" class="statsVar"></a></div></div><div class="row spacer"></div><div class="heading"><div class="cell">Resolution</div><div class="cell">Link</div></div><div class="row"><div class="cell">In: <span data-type="video" data-var="googFrameWidthReceived" class="statsVar"></span> x <span data-type="video" data-var="googFrameHeightReceived" class="statsVar"></span> Out: <span data-type="video" data-var="googFrameWidthSent" class="statsVar"></span> x <span data-type="video" data-var="googFrameHeightSent" class="statsVar"></span></div><div class="cell"><span class="statsDelay">Delay: <a href="javascript:;" data-type="audio" data-var="googRtt" class="statsVar"></a></span> Jitter: <a href="javascript:;" data-type="audio" data-var="googJitterReceived" class="statsVar"></a></div></div><div class="row spacer"></div></div></div>';
    };

    // timer.jade compiled template
    templatizer["timer"] = function tmpl_timer() {
        return '<div class="timer fadeable"><div class="text"></div></div>';
    };

    // transfer.jade compiled template
    templatizer["transfer"] = function tmpl_transfer() {
        return '<div class="transferPopup fadeable popup"><div class="title">Transfer</div><div><input type="text" placeholder="To Target" class="target"/><input type="checkbox" class="typeAttended"/>Attended</div><div class="actions"><button type="button" class="accept button">Transfer</button><button type="button" class="reject button">Cancel</button></div></div>';
    };

    // video.jade compiled template
    templatizer["video"] = function tmpl_video() {
        return '<div class="video"><span class="icon-facetime-video watermark-icon"></span><video autoplay="autoplay" class="remote"></video><div class="localVideo fadeable"><div class="inner"><video autoplay="autoplay" muted="true" class="local"></video></div></div></div>';
    };

    // videobar.jade compiled template
    templatizer["videobar"] = function tmpl_videobar() {
        return '<div class="videoBar"><div class="table fixed collapse"><div class="cell leftSpacer"></div><div class="cell cell-selfView"><div class="selfViewDisable icon fadeable"><a href="" title="Disable Self View" class="icon-selfViewDisable"></a></div><div class="selfViewEnable icon fadeable"><a href="" title="Enable Self View" class="icon-selfViewEnable"></a></div></div><div class="cell cell-dialpad"><div class="dialpadIconShow icon fadeable"><a href="" title="Show Dialpad" class="icon-dialpadShow"></a></div><div class="dialpadIconHide icon fadeable"><a href="" title="Hide Dialpad" class="icon-dialpadHide"></a></div></div><div class="cell cell-muteAudio"><div class="icon fadeable muteAudioIcon"><a href="" title="Mute Audio" class="icon-muteAudio"></a></div><div class="icon fadeable unmuteAudioIcon"><a href="" title="Unmute Audio" class="icon-unmuteAudio"></a></div></div><div class="cell cell-hold"><div class="hold icon fadeable"><a href="" title="Hold Call" class="icon-hold"></a></div><div class="resume icon fadeable"><a href="" title="Resume Call" class="icon-resume"></a></div></div><div class="cell cell-hangup"><div class="hangup icon fadeable"><a href="" title="Hangup" class="icon-hangup"></a><div class="subtitle">End Conference</div></div></div><div class="cell cell-transfer"><div class="transfer icon fadeable"><a href="" title="Transfer" class="icon-transfer"></a></div></div><div class="cell cell-shareScreen"><div class="icon fadeable shareScreen"><a href="" title="Share Screen" class="icon-screen-sharing"></a></div><div class="icon fadeable stopShareScreen"><a href="" title="Stop Share Screen" class="icon-screen-sharing-off"></a></div></div><div class="cell cellTimer"></div><div class="cell cell-settings"><div class="settings icon fadeable"><a href="" title="Settings" class="icon-settings"></a></div></div><div class="cell cell-fullScreen"><div class="fullScreenExpand icon fadeable"><a href="" title="Expand Full Screen" class="icon-fullScreenExpand"></a></div><div class="fullScreenContract icon fadeable"><a href="" title="Contract Full Screen" class="icon-fullScreenContract"></a></div></div><div class="cell rightSpacer"></div></div></div>';
    };

    // whiteboard.jade compiled template
    templatizer["whiteboard"] = function tmpl_whiteboard() {
        return '<div class="whiteboard fadeable popup"><div class="tools"><a href=".canvas" data-tool="marker" class="tooltype">Marker</a><a href=".canvas" data-tool="eraser" class="tooltype">Eraser</a></div><canvas width="600" height="400" class="canvas"></canvas></div>';
    };

    // xmpp.jade compiled template
    templatizer["xmpp"] = function tmpl_xmpp() {
        return '<div class="xmpp fadeable popup"><div class="table fixed loginForm"><div class="row"><label class="cell">Name:</label><input type="text" name="name" placeholder="Email" class="cell name"/></div><div class="row"><label class="cell">Password:</label><input type="password" name="password" class="cell password"/></div><div class="row"><div class="cell"></div><input type="button" value="Log In" class="cell login"/></div></div><div class="content"></div><div class="messages"></div></div>';
    };

    return templatizer;
}));