module.exports = HistoryView

var Utils = require('../Utils');
var Constants = require('../Constants');
var PopupView = require('./popup');

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

function HistoryView(options, sound, statsView, sipstack, configuration, eventbus, callcontrol) {
  var self = {};

  Utils.extend(self, PopupView(options, eventbus));

  var pagePrefix = 'page_';

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
  self.rows = [];

  var callDetailsHandler = function(call) {
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
      self.callLink.attr("data-destination", call.destinationWithoutSip());
      self.callLink.text("Call " + call.destinationWithoutSip());
      self.callHistoryDetails.show();
      self.view.css({
        width: "416px"
      });
      $(".history-row").removeClass("active");
      // TODO - missing property to activate
      $(self).addClass("active");
    };
  };

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
    call.resolutionIn = statsView.getValue("video", "googFrameWidthReceived") + "x" + statsView.getValue("video", "googFrameHeightReceived");
    call.resolutionOut = statsView.getValue("video", "googFrameWidthSent") + "x" + statsView.getValue("video", "googFrameHeightSent");
    call.bitrateIn = statsView.getAvg("video", "kiloBitsReceivedPerSecond");
    call.bitrateOut = statsView.getAvg("video", "kiloBitsSentPerSecond");
    call.frameRateIn = statsView.getAvg("video", "googFrameRateReceived");
    call.frameRateOut = statsView.getAvg("video", "googFrameRateSent");
    call.audioLostPer = statsView.getAvg("audio", "packetsLostPer");
    call.videoLostPer = statsView.getAvg("video", "packetsLostPer");
    call.jitter = statsView.getAvg("audio", "googJitterReceived");
    call.length = Utils.format(Math.round(Math.abs((rtcSession.end_time - start) / 1000)));
    return call;
  };

  var updateButtonsVisibility = function() {
    var pages = self.pages();
    var pagesCount = pages ? pages.length - 1 : 0;
    if (self.pageNumber < pagesCount) {
      self.historyForward.show();
    } else {
      self.historyForward.hide();
    }
    if (self.pageNumber > 0) {
      self.historyBack.show();
    } else {
      self.historyBack.hide();
    }
  };

  var updateContent = function() {
    self.content.html("");
    self.rows = [];
    updateButtonsVisibility();
    var calls = self.getAllCalls();
    var startPos = self.callsPerPage * self.pageNumber;
    for (var i = startPos; i < startPos + self.callsPerPage && i < calls.length; i++) {
      var row = self.historyRowSample.clone();
      row.attr('id', '');
      row.attr('class', 'history-row');
      var call = calls[i];
      row.bind("click", callDetailsHandler(call));
      row.find(".historyCall").text((self.pageNumber * 10) + i + 1);
      row.find(".hist-destination").text(call.destinationWithoutSip());
      //row.find(".historyDirection").text(call.direction);
      row.find(".hist-direction").append("<i class='icon-arrow-" + call.direction + "-thick'></i>");
      //row.find(".historyDate").text(call.startDate());
      row.find(".hist-date").text(Utils.formatDateTime(call.startDate()));
      row.find(".hist-length").text(call.length);
      self.rows.push(row);
      row.appendTo(self.content);
    }
  };

  self.elements = ['content', 'historyForward', 'historyBack', 'callHistoryDetails', 'historyDetailsClose', 'resolutionIn',
    'resolutionOut', 'bitrateIn', 'bitrateOut', 'frameRateIn', 'frameRateOut', 'audioLostPer', 'videoLostPer', 'jitter',
    'historyClear', 'callLink', 'historyRowSample', 'historyClose'
  ];

  self.pagesAsString = function() {
    return self.pages().map(function(page){
      return page.callsAsString();
    });
  };

  self.pages = function() {
    var pages = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var regex = new RegExp(pagePrefix + '(.*)', 'g');
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

  self.listeners = function() {
    eventbus.on("ended", function(e) {
      self.persistCall(e.sender);
    });
    eventbus.on('modifier', function(e) {
      if (e.which === 72) {
        self.show();
      }
    });
    eventbus.on('viewChanged', function(e) {
      if (e.view === 'history' && e.visible) {
        updateContent();
      } else if (e.view === 'settings' && e.visible) {
        self.hide();
      } else if (e.view === 'dialpad' && !e.visible) {
        self.hide();
      }
    });
    self.historyForward.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.pageNumber = self.pageNumber + 1;
    });

    self.historyBack.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.pageNumber = self.pageNumber - 1;
    });

    self.historyClose.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      self.hide();
    });

    self.historyDetailsClose.bind('click', function(e) {
      e.preventDefault();
      self.callHistoryDetails.hide();
      self.view.css({
        width: "200px"
      });
    });

    self.callLink.bind('click', function(e) {
      e.preventDefault();
      if (sipstack.getCallState() === Constants.STATE_CONNECTED) {
        sound.playClick();
        var destination = self.callLink.attr("data-destination");
        callcontrol.callUri(destination);
        self.view.css({
          width: "200px"
        });
        self.view.hide();
      }
      self.callHistoryDetails.hide();
    });

    self.historyClear.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      var pages = self.pages();
      for (var i = 0; i < pages.length; i++) {
        localStorage.removeItem(pagePrefix + (pages[i].number));
      }
      self.pageNumber = 0;
    });
  };

  self.persistPage = function(page) {
    var key = (pagePrefix + page.number);
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