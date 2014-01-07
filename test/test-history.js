module( "History", {
  setup: function() {
    localStorage.clear();
    TestWebrtc.Helpers.mockWebRTC();
    TestWebrtc.Helpers.deleteAllCookies();
    ClientConfig.enableCallHistory = true;
    ClientConfig.register = false;
    rtcSession = createRtcSession();
    session1 = createRtcSession("remote1")
    session2 = createRtcSession("remote2")
    session3 = createRtcSession("remote3")
    session4 = createRtcSession("remote4")
    session5 = createRtcSession("remote5")
    WebRTC.Stats.prototype.getValue = function(type, name){
      return "test-"+type+"-"+name;
    }
    WebRTC.Stats.prototype.getAvg = function(type, name){
      return "avg-"+type+"-"+name;
    }
  }, teardown: function() {
  }
});
test('persistCall', function() {
  client = new WebRTC.Client();
  client.history.persistCall(rtcSession);
  strictEqual(localStorage.length, 1);
  deepEqual(localStorage["page_0"], getCallCookieValue());
  deepEqual(client.history.pages(), [new WebRTC.History.Page(0, getCallCookieValue())]);
});
test('persistCall and toggle', function() {
  client = new WebRTC.Client();
  client.history.persistCall(rtcSession);
  client.history.toggle();
  strictEqual(client.history.pageNumber, 0);
  strictEqual(client.history.historyForward.is(":visible"), false);
  strictEqual(client.history.historyBack.is(":visible"), false);
  strictEqual(client.history.content.text().indexOf("remote") !== -1, true, "Should contain content");
});

test('persistCall and toggle and show details', function() {
  client = new WebRTC.Client();
  client.history.persistCall(rtcSession);
  client.history.toggle();
  client.history.rows[0].trigger("click");
  strictEqual(client.history.callHistoryDetails.is(":visible"), true, "Should show details");
  strictEqual(client.history.resolutionIn.text(), "test-video-googFrameWidthReceivedxtest-video-googFrameHeightReceived");
  strictEqual(client.history.resolutionOut.text(), "test-video-googFrameWidthSentxtest-video-googFrameHeightSent");
  strictEqual(client.history.bitrateIn.text(), "avg-video-kiloBitsReceivedPerSecond");
  strictEqual(client.history.bitrateOut.text(), "avg-video-kiloBitsSentPerSecond");
  strictEqual(client.history.frameRateIn.text(), "avg-video-googFrameRateReceived");
  strictEqual(client.history.frameRateOut.text(), "avg-video-googFrameRateSent");
  strictEqual(client.history.audioLostPer.text(), "avg-audio-packetsLostPer");
  strictEqual(client.history.videoLostPer.text(), "avg-video-packetsLostPer");
  strictEqual(client.history.jitter.text(), "avg-audio-googJitterReceived");
});
test('persistCall and toggle and show details and call', function() {
  ClientConfig.allowOutside = true;
  client = new WebRTC.Client();
  var destination = "";
  client.sipStack.call = function(dest) {
    destination = dest;
  };
  client.history.persistCall(createRtcSession("sip:remote1@webrtc.broadsoft.com"));
  client.history.toggle();
  client.history.rows[0].trigger("click");
  client.history.historyCallLink.trigger("click");
  strictEqual(destination, "sip:remote1@webrtc.broadsoft.com", "Should trigger call on sipStack with correct destination");
  strictEqual(client.history.callHistoryDetails.is(":visible"), false, "Should hide details popup");
});
test('persistCall for multiple calls', function() {
  client = new WebRTC.Client();
  client.history.persistCall(session1);
  client.history.persistCall(session2);
  strictEqual(localStorage.length, 1);
  deepEqual(localStorage["page_0"], getCallCookieValue(session2) + "~" + getCallCookieValue(session1));
  deepEqual(client.history.pages(), [new WebRTC.History.Page(0, getCallCookieValue(session2)+"~"+getCallCookieValue(session1))]);
});
test('persistCall for multiple calls and higher than callsPerPage', function() {
  client = new WebRTC.Client();
  client.history.callsPerPage = 2;
  client.history.persistCall(session1);
  client.history.persistCall(session2);
  client.history.persistCall(session3);
  strictEqual(localStorage.length, 2);
  deepEqual(localStorage["page_0"], getCallCookieValue(session2) + "~" + getCallCookieValue(session1));
  deepEqual(localStorage["page_1"], getCallCookieValue(session3));
  deepEqual(client.history.pages(), [new WebRTC.History.Page(1, getCallCookieValue(session3)), new WebRTC.History.Page(0, getCallCookieValue(session2)+"~"+getCallCookieValue(session1))]);
});
test('multiple pages and toggle', function() {
  client = new WebRTC.Client();
  client.history.callsPerPage = 2;
  client.history.persistCall(session1);
  client.history.persistCall(session2);
  client.history.persistCall(session3);
  client.history.toggle();
  strictEqual(client.history.pageNumber, 0);
  strictEqual(client.history.content.text().indexOf("remote1") === -1, true, "Should not contain session1 destination");
  strictEqual(client.history.content.text().indexOf("remote2") !== -1, true, "Should contain session2 destination");
  strictEqual(client.history.content.text().indexOf("remote3") !== -1, true, "Should contain session3 destination");
  strictEqual(client.history.historyForward.is(":visible"), true);
  strictEqual(client.history.historyBack.is(":visible"), false);
});

test('multiple pages, toggle, clear and toggle again', function() {
  client = new WebRTC.Client();
  client.history.callsPerPage = 2;
  client.history.persistCall(session1);
  client.history.persistCall(session2);
  client.history.persistCall(session3);
  client.history.toggle();
  strictEqual(client.history.pageNumber, 0);
  client.history.historyClear.trigger("click");
  strictEqual(client.history.pageNumber, 0);
  strictEqual(client.history.content.text(), "", "Should not contain content");
  strictEqual(client.history.historyForward.is(":visible"), false);
  strictEqual(client.history.historyBack.is(":visible"), false);
});

test('multiple pages and toggle and click forward', function() {
  client = new WebRTC.Client();
  client.history.callsPerPage = 2;
  client.history.persistCall(session1);
  client.history.persistCall(session2);
  client.history.persistCall(session3);
  client.history.toggle();
  client.history.historyForward.trigger("click");
  strictEqual(client.history.pageNumber, 1);
  strictEqual(client.history.content.text().indexOf("remote1") !== -1, true, "Should contain session1 destination");
  strictEqual(client.history.content.text().indexOf("remote2") === -1, true, "Should not contain session2 destination");
  strictEqual(client.history.content.text().indexOf("remote3") === -1, true, "Should not contain session3 destination");
  strictEqual(client.history.historyForward.is(":visible"), false, "Should show forward button");
  strictEqual(client.history.historyBack.is(":visible"), true, "Should hide back button");
});

test('persistCall for multiple calls and higher than callsPerPage and pages above maxPages', function() {
  client = new WebRTC.Client();
  client.history.callsPerPage = 2;
  client.history.maxPages = 2;
  client.history.persistCall(session1);
  client.history.persistCall(session2);
  client.history.persistCall(session3);
  client.history.persistCall(session4);
  client.history.persistCall(session5);
  strictEqual(localStorage.length, 2);
  deepEqual(localStorage["page_0"], getCallCookieValue(session3) + "~" + getCallCookieValue(session2));
  deepEqual(localStorage["page_1"], getCallCookieValue(session5) + "~" + getCallCookieValue(session4));
  deepEqual(client.history.pages(), [
    new WebRTC.History.Page(1, getCallCookieValue(session5)+"~"+getCallCookieValue(session4)),
    new WebRTC.History.Page(0, getCallCookieValue(session3)+"~"+getCallCookieValue(session2))]);
});

function getCall(session) {
  return new WebRTC.History.Call(getCallCookieValue(session));
}
function getCallCookieValue(session) {
  session = session || rtcSession;
  return session.start_time.getTime()+"|"+session.remote_identity.uri+"|------>|" + getStatsCookieValue()+ "|00:00:00"
}
function getStatsCookieValue() {
  return "test-video-googFrameWidthReceivedxtest-video-googFrameHeightReceived|" +
  "test-video-googFrameWidthSentxtest-video-googFrameHeightSent|" +
    "avg-video-kiloBitsReceivedPerSecond|" +
    "avg-video-kiloBitsSentPerSecond|" +
    "avg-video-googFrameRateReceived|" +
    "avg-video-googFrameRateSent|" +
    "avg-audio-packetsLostPer|" +
    "avg-video-packetsLostPer|" +
  "avg-audio-googJitterReceived";
}
function createRtcSession(uri) {
  return {start_time: new Date(), end_time: new Date(), remote_identity: {uri: (uri || "remote")}, direction: "outgoing"}
}