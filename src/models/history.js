module.exports = require('webrtc-core').bdsft.Model(History)

var Utils = require('webrtc-core').utils;
var Constants = require('webrtc-core').constants;

function Page(number, callsValue) {
  var self = {};

  self.callsAsString = function() {
    return self.calls.map(function(call) {
      return call.toString();
    }).join("~");
  };
  self.parseCalls = function(callsValue) {
    var calls = [];
    if (callsValue.trim().length > 0) {
      var callsArray = callsValue.split("~");
      for (var i = 0; i < callsArray.length; i++) {
        calls.push(new Call(callsArray[i]));
      }
    }
    return calls;
  };

  self.calls = self.parseCalls(callsValue);
  self.number = number;

  return self;
}

function Call(value) {
  var self = {};

  var values = value ? value.split("|") : [];
  self.startTime = values[0];
  self.destination = values[1];
  self.direction = values[2];
  self.resolutionIn = values[3];
  self.resolutionOut = values[4];
  self.bitrateIn = values[5];
  self.bitrateOut = values[6];
  self.frameRateIn = values[7];
  self.frameRateOut = values[8];
  self.audioLostPer = values[9];
  self.videoLostPer = values[10];
  self.jitter = values[11];
  self.length = values[12];

  self.startDate = function() {
    var date = new Date();
    date.setTime(self.startTime);
    return date.toLocaleString();
  };
  self.destinationWithoutSip = function() {
    return self.destination.replace(/sip:([^@]+)@.+/, "$1");
  };
  self.toString = function() {
    var values = [self.startTime, self.destination, self.direction, self.resolutionIn, self.resolutionOut, self.bitrateIn,
      self.bitrateOut, self.frameRateIn, self.frameRateOut, self.audioLostPer, self.videoLostPer, self.jitter, self.length
    ];
    return values.join("|");
  };

  return self;
}

function History(stats, configuration, eventbus) {
  var self = {};

  var _pageNumber = 0;
  Object.defineProperty(self, 'pageNumber', 
    {
      get: function() {
        return _pageNumber;
      },
      set: function(value) {
        _pageNumber = value;
        updateContent();
      }
    }
  );
  self.callsPerPage = 10;
  self.maxPages = 25;

  var createCall = function(rtcSession) {
    var call = new Call();
    var start = rtcSession.start_time;
    call.startTime = new Date(start).getTime();
    call.destination = rtcSession.remote_identity.uri;
    if (rtcSession.direction === "outgoing") {
      call.direction = "up";
    } else {
      call.direction = "down";
    }
    call.resolutionIn = stats.getValue("video", "googFrameWidthReceived") + "x" + stats.getValue("video", "googFrameHeightReceived");
    call.resolutionOut = stats.getValue("video", "googFrameWidthSent") + "x" + stats.getValue("video", "googFrameHeightSent");
    call.bitrateIn = stats.getAvg("video", "kiloBitsReceivedPerSecond");
    call.bitrateOut = stats.getAvg("video", "kiloBitsSentPerSecond");
    call.frameRateIn = stats.getAvg("video", "googFrameRateReceived");
    call.frameRateOut = stats.getAvg("video", "googFrameRateSent");
    call.audioLostPer = stats.getAvg("audio", "packetsLostPer");
    call.videoLostPer = stats.getAvg("video", "packetsLostPer");
    call.jitter = stats.getAvg("audio", "googJitterReceived");
    call.length = Utils.format(Math.round(Math.abs((rtcSession.end_time - start) / 1000)));
    return call;
  };

  var updateNavigation = function() {
    var pages = self.pages();
    var pagesCount = pages ? pages.length - 1 : 0;
    self.isForwardEnabled = self.pageNumber < pagesCount;
    self.isBackEnabled = self.pageNumber > 0;
  };

  var updateContent = function() {
    updateNavigation();
    var allCalls = self.getAllCalls();
    var startPos = self.callsPerPage * self.pageNumber;
    var endPos = Math.min(startPos + self.callsPerPage, allCalls.length);
    self.calls = allCalls.slice(startPos, endPos);
  };

  self.props = {'isForwardEnabled': true, 'isBackEnabled': true, 'calls': true};

  self.pagesAsString = function() {
    return self.pages().map(function(page){
      return page.callsAsString();
    });
  };

  self.pages = function() {
    var pages = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var regex = new RegExp(Constants.HISTORY_PAGE_PREFIX + '(.*)', 'g');
      var match = regex.exec(key);
      if (match !== null && match.length > 1) {
        var value = localStorage.getItem(key);
        var page = new Page(parseInt(match[1], 10), value);
        pages.push(page);
      }
    }
    // sort pages descendingly
    pages.sort(function(page1, page2) {
      return page2.number - page1.number;
    });
    return pages;
  };

  self.getAllCalls = function() {
    var pages = self.pages();
    var calls = [];
    for (var i = 0; i < pages.length; i++) {
      calls = calls.concat(pages[i].calls);
    }
    return calls;
  };

  self.forward = function(){
    self.pageNumber = self.pageNumber + 1;
  };
  
  self.back = function(){
    self.pageNumber = self.pageNumber - 1;
  };

  self.clear = function(){
    var pages = self.pages();
    for (var i = 0; i < pages.length; i++) {
      localStorage.removeItem(Constants.HISTORY_PAGE_PREFIX + (pages[i].number));
    }
    self.pageNumber = 0;
  };

  self.listeners = function() {
    eventbus.on("ended", function(e) {
      self.persistCall(e.sender);
    });
    eventbus.on('viewChanged', function(e) {
      if (e.view === 'history' && e.visible) {
        updateContent();
      }
    });
  };

  self.persistPage = function(page) {
    var key = (Constants.HISTORY_PAGE_PREFIX + page.number);
    var value = page.callsAsString();
    localStorage[key] = value;
  };

  self.persistCall = function(rtcSession) {
    if (!configuration.enableCallHistory) {
      return;
    }
    // Get latest cookie
    var pages = self.pages();
    var page = null;
    if (pages.length > 0) {
      page = pages[0];
    } else {
      page = new Page(0, "");
    }

    if (page.calls.length >= self.callsPerPage) {
      if (page.number + 1 >= self.maxPages) {
        // remove oldest call and reorder calls to each page
        for (var i = 0; i < pages.length; i++) {
          var lastPageCall = pages[i].calls.pop();
          if (i + 1 < pages.length) {
            pages[i + 1].calls.unshift(lastPageCall);
          }
          self.persistPage(pages[i]);
        }
      } else {
        page = new Page(page.number + 1, "");
      }
    }

    // cookie vars
    var call = createCall(rtcSession);
    page.calls.unshift(call);
    self.persistPage(page);
    updateContent();
  };

  return self;

}