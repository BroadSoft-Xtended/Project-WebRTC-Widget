require('./includes/common');
describe('history', function() {

  beforeEach(function() {
    setUp();
    localStorage.clear();
    testUA.mockWebRTC();
    testUA.deleteAllCookies();
    config = {
      enableCallHistory: true
    };
    rtcSession = createRtcSession();
    session1 = createRtcSession("remote1")
    session2 = createRtcSession("remote2")
    session3 = createRtcSession("remote3")
    session4 = createRtcSession("remote4")
    session5 = createRtcSession("remote5")
  });

  it('persistCall:', function() {
    client = create(config)
    mockStats();
    history.persistCall(rtcSession);
    expect(localStorage.length).toEqual(1);
    expect(localStorage["page_0"]).toEqual(getCallCookieValue());
    expect(history.pagesAsString(), [getCallCookieValue()]);
  });
  it('persistCall and toggle', function() {
    client = create(config)
    history.persistCall(rtcSession);
    history.toggle();
    expect(history.pageNumber).toEqual(0);
    expect(history.historyForward.is(":visible")).toEqual(false);
    expect(history.historyBack.is(":visible")).toEqual(false);
    expect(history.content.text().indexOf("remote") !== -1).toEqual(true, "Should contain content");
  });

  it('persistCall and toggle and show details', function() {
    client = create(config)
    mockStats();
    history.persistCall(rtcSession);
    history.toggle();
    history.rows[0].trigger("click");
    expect(history.callHistoryDetails.is(":visible")).toEqual(true, "Should show details");
    expect(history.resolutionIn.text()).toEqual("test-video-googFrameWidthReceivedxtest-video-googFrameHeightReceived");
    expect(history.resolutionOut.text()).toEqual("test-video-googFrameWidthSentxtest-video-googFrameHeightSent");
    expect(history.bitrateIn.text()).toEqual("avg-video-kiloBitsReceivedPerSecond");
    expect(history.bitrateOut.text()).toEqual("avg-video-kiloBitsSentPerSecond");
    expect(history.frameRateIn.text()).toEqual("avg-video-googFrameRateReceived");
    expect(history.frameRateOut.text()).toEqual("avg-video-googFrameRateSent");
    expect(history.audioLostPer.text()).toEqual("avg-audio-packetsLostPer");
    expect(history.videoLostPer.text()).toEqual("avg-video-packetsLostPer");
    expect(history.jitter.text()).toEqual("avg-audio-googJitterReceived");
  });
  it('persistCall and toggle and show details and call', function() {
    config.allowOutside = true;
    config.domainTo = 'to.domain';
    config.domainFrom = 'from.domain';
    client = create(config)
    testUA.connect();
    sipstack.ua.isConnected = function() {
      return true;
    };
    var destination = "";
    sipstack.call = function(dest) {
      destination = dest;
    };
    var callHistoryHidden = false;
    history.callHistoryDetails.hide = function(){
      callHistoryHidden = true;
    }
    history.persistCall(createRtcSession("sip:remote1@webrtc.broadsoft.com"));
    history.toggle();
    history.rows[0].trigger("click");
    history.callLink.trigger("click");
    expect(destination).toEqual("sip:remote1@to.domain", "Should trigger call on sipstack with correct destination");
    expect(callHistoryHidden).toEqual(true);
  });
  it('WEBRTC-34 : persistCall and toggle and show details and call with existing call', function() {
    config.allowOutside = true;
    client = create(config)
    var called = false;
    sipstack.call = function(dest) {
      called = true;
    };
    var callHistoryHidden = false;
    history.callHistoryDetails.hide = function(){
      callHistoryHidden = true;
    }
    history.persistCall(createRtcSession("sip:remote1@webrtc.broadsoft.com"));
    testUA.startCall();
    history.toggle();
    history.rows[0].trigger("click");
    history.callLink.trigger("click");
    expect(called).toEqual(false);
    expect(callHistoryHidden).toEqual(true);
  });

  it('persistCall for multiple calls', function() {
    client = create(config)
    mockStats();
    history.persistCall(session1);
    history.persistCall(session2);
    expect(localStorage.length).toEqual(1);
    expect(localStorage["page_0"]).toEqual(getCallCookieValue(session2) + "~" + getCallCookieValue(session1));
    expect(history.pages(), [getCallCookieValue(session2) + "~" + getCallCookieValue(session1)]);
  });
  it('persistCall for multiple calls and higher than callsPerPage', function() {
    client = create(config)
    mockStats();
    history.callsPerPage = 2;
    history.persistCall(session1);
    history.persistCall(session2);
    history.persistCall(session3);
    expect(localStorage.length).toEqual(2);
    expect(localStorage["page_0"]).toEqual(getCallCookieValue(session2) + "~" + getCallCookieValue(session1));
    expect(localStorage["page_1"]).toEqual(getCallCookieValue(session3));
    expect(history.pagesAsString(), [getCallCookieValue(session3), getCallCookieValue(session2) + "~" + getCallCookieValue(session1)]);
  });
  it('multiple pages and toggle', function() {
    client = create(config)
    history.callsPerPage = 2;
    history.persistCall(session1);
    history.persistCall(session2);
    history.persistCall(session3);
    history.toggle();
    expect(history.pageNumber).toEqual(0);
    expect(history.content.text().indexOf("remote1") === -1).toEqual(true, "Should not contain session1 destination");
    expect(history.content.text().indexOf("remote2") !== -1).toEqual(true, "Should contain session2 destination");
    expect(history.content.text().indexOf("remote3") !== -1).toEqual(true, "Should contain session3 destination");
    // TODO - add back after checking on forward / backward buttons?
    // expect(history.historyForward.is(":visible")).toEqual( true);
    // expect(history.historyBack.is(":visible")).toEqual( false);
  });

  it('multiple pages, toggle, clear and toggle again', function() {
    client = create(config)
    history.callsPerPage = 2;
    history.persistCall(session1);
    history.persistCall(session2);
    history.persistCall(session3);
    history.toggle();
    expect(history.pageNumber).toEqual(0);
    history.historyClear.trigger("click");
    expect(history.pageNumber).toEqual(0);
    expect(history.content.text()).toEqual("", "Should not contain content");
    expect(history.historyForward.is(":visible")).toEqual(false);
    expect(history.historyBack.is(":visible")).toEqual(false);
  });

  // TODO - add back after checking on forward / backward buttons?
  // it('multiple pages and toggle and click forward', function() {
  //   client = create(config)
  //   history.callsPerPage = 2;
  //   history.persistCall(session1);
  //   history.persistCall(session2);
  //   history.persistCall(session3);
  //   history.toggle();
  //   history.historyForward.trigger("click");
  //   expect(history.pageNumber).toEqual( 1);
  //   expect(history.content.text().indexOf("remote1") !== -1, true).toEqual( "Should contain session1 destination");
  //   expect(history.content.text().indexOf("remote2") === -1, true).toEqual( "Should not contain session2 destination");
  //   expect(history.content.text().indexOf("remote3") === -1, true).toEqual( "Should not contain session3 destination");
  //   expect(history.historyForward.is(":visible"), false).toEqual( "Should show forward button");
  //   expect(history.historyBack.is(":visible"), true).toEqual( "Should hide back button");
  // });

  it('persistCall for multiple calls and higher than callsPerPage and pages above maxPages', function() {
    client = create(config)
    mockStats();
    history.callsPerPage = 2;
    history.maxPages = 2;
    history.persistCall(session1);
    history.persistCall(session2);
    history.persistCall(session3);
    history.persistCall(session4);
    history.persistCall(session5);
    expect(localStorage.length).toEqual(2);
    expect(localStorage["page_0"]).toEqual(getCallCookieValue(session3) + "~" + getCallCookieValue(session2));
    expect(localStorage["page_1"]).toEqual(getCallCookieValue(session5) + "~" + getCallCookieValue(session4));
    expect(history.pagesAsString()).toEqual([
      getCallCookieValue(session5) + "~" + getCallCookieValue(session4), 
      getCallCookieValue(session3) + "~" + getCallCookieValue(session2)
      ]);
  });

  function getCall(session) {
    return new WebRTC.History.Call(getCallCookieValue(session));
  }

  function getCallCookieValue(session) {
    session = session || rtcSession;
    return session.start_time.getTime() + "|" + session.remote_identity.uri + "|up|" + getStatsCookieValue() + "|00:00:00"
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
    return {
      start_time: new Date(),
      end_time: new Date(),
      remote_identity: {
        uri: (uri || "remote")
      },
      direction: "outgoing"
    }
  }

  function mockStats() {
    stats.getValue = function(type, name) {
      return "test-" + type + "-" + name;
    }
    stats.getAvg = function(type, name) {
      return "avg-" + type + "-" + name;
    }
  }
});