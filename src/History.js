/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var History;

  History = function (client, sound, stats, sipStack) {
    this.callHistory = $('#callHistory');
    this.content = $('#callHistory .content');
    this.historyForward = $('#historyForward');
    this.historyBack = $('#historyBack');
    this.callHistoryDetails = $('#callHistoryDetails');
    this.historyDetailsClose = $('#historyDetailsClose');
    this.resolutionIn = $('#resolutionIn');
    this.resolutionOut = $('#resolutionOut');
    this.bitrateIn = $('#bitrateIn');
    this.bitrateOut = $('#bitrateOut');
    this.frameRateIn = $('#frameRateIn');
    this.frameRateOut = $('#frameRateOut');
    this.audioLostPer = $('#audioLostPer');
    this.videoLostPer = $('#videoLostPer');
    this.jitter = $('#jitter');
    this.historyClear = $("#historyClear");
    this.historyCallLink = $("#historyCallLink");

    this.pageNumber = 0;
    this.historyToggled = false;
    this.client = client;
    this.sound = sound;
    this.stats = stats;
    this.sipStack = sipStack;
    this.callsPerPage = 10;
    this.maxPages = 25;
    this.rows = [];

    this.registerListeners();

    this.updateContent();
  };

  History.Page = function (number, callsValue) {
    this.number = number;
    this.calls = this.parseCalls(callsValue);
  };

  History.Page.prototype = {
    callsAsString: function () {
      return this.calls.map(function(call){return call.toString();}).join("~");
    },
    parseCalls: function (callsValue) {
      var calls = [];
      if(callsValue.trim().length > 0) {
        var callsArray = callsValue.split("~");
        for(var i=0; i<callsArray.length; i++){
          calls.push(new History.Call(callsArray[i]));
        }
      }
      return calls;
    }
  };

  History.Call = function (value) {
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
    startDate: function(){
      var date = new Date();
      date.setTime(this.startTime);
      return date.toLocaleString();
    },
    destinationWithoutSip: function(){
      return this.destination.replace(/sip:([^@]+)@.+/, "$1");
    },
    toString: function(){
      var values = [this.startTime, this.destination, this.direction, this.resolutionIn, this.resolutionOut, this.bitrateIn,
        this.bitrateOut, this.frameRateIn, this.frameRateOut, this.audioLostPer, this.videoLostPer, this.jitter, this.length];
      return values.join("|");
    }
  };

  History.prototype = {
    pages: function(){
      var pages = [];
      for(var i=0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var regex = new RegExp(/page_(.*)/g);
        var match = regex.exec(key);
        if(match != null && match.length > 1) {
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
      }
      else {
        this.historyForward.hide();
      }
      if (this.pageNumber > 0) {
        this.historyBack.show();
      }
      else {
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
        var row = $('#historyRowSample').clone();
        row.attr('id', '');
        row.attr('class', 'history-row');
        var call = calls[i];
        row.bind("click", this.callDetailsHandler(call));
        row.find(".historyCall").text((this.pageNumber * 10) + i + 1);
        row.find(".historyDestination").text(call.destinationWithoutSip());
        //row.find(".historyDirection").text(call.direction);
        row.find(".historyDirection").append("<i class='icon-arrow-"+call.direction+"-thick'></i>");
        //row.find(".historyDate").text(call.startDate());
        row.find(".historyDate").text(WebRTC.Utils.formatDateTime(call.startDate()));
        row.find(".historyLength").text(call.length);
        this.rows.push(row);
        row.appendTo(this.content);
      }
    },
    getAllCalls:function () {
      var pages = this.pages();
      var calls = [];
      for(var i=0; i<pages.length; i++) {
        calls = calls.concat(pages[i].calls);
      }
      return calls;
    },

    callDetailsHandler:function (call) {
      var self = this;
      return function (e) {
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
        self.historyCallLink.attr("data-destination", call.destination);
        self.historyCallLink.text("Call "+call.destinationWithoutSip());
        self.callHistoryDetails.fadeIn(100);
      };
    },

    setPageNumber: function(pageNumber) {
      this.pageNumber = pageNumber;
      this.updateContent();
    },

    registerListeners:function () {
      var self = this;

      this.historyForward.bind('click', function (e) {
        e.preventDefault();
        self.sound.playClick();
        self.setPageNumber(self.pageNumber + 1);
      });

      this.historyBack.bind('click', function (e) {
        e.preventDefault();
        self.sound.playClick();
        self.setPageNumber(self.pageNumber - 1);
      });

      this.historyDetailsClose.bind('click', function (e) {
        e.preventDefault();
        self.callHistoryDetails.fadeOut(100);
      });

      this.historyCallLink.bind('click', function (e) {
        e.preventDefault();
        if(self.sipStack.getCallState() === WebRTC.SIPStack.C.STATE_CONNECTED) {
          self.sound.playClick();
          var destination = self.historyCallLink.attr("data-destination");
          self.client.destination.val(destination);
          self.client.callUri(destination);
        }
        self.callHistoryDetails.hide();
      });

      this.historyClear.bind('click', function (e) {
        e.preventDefault();
        self.sound.playClick();
        var pages = self.pages();
        for (var i = 0; i < pages.length; i++) {
          localStorage.removeItem("page_" + (pages[i].number));
        }
        self.setPageNumber(0);
      });
    },

    persistPage:function (page) {
      var key = ("page_" + page.number);
      var value = page.callsAsString();
      localStorage[key] = value;
    },

    persistCall:function (rtcSession) {
      if (!ClientConfig.enableCallHistory) {
        return;
      }
      // Get latest cookie
      var pages = this.pages();
      var page = null;
      if (pages.length > 0) {
        page = pages[0];
      }
      else {
        page = new History.Page(0, "");
      }

      if(page.calls.length >= this.callsPerPage) {
        if(page.number+1 >= this.maxPages) {
          // remove oldest call and reorder calls to each page
          for(var i=0; i<pages.length; i++) {
            var lastPageCall = pages[i].calls.pop();
            if(i+1 < pages.length) {
              pages[i+1].calls.unshift(lastPageCall);
            }
            this.persistPage(pages[i]);
          }
        } else {
          page = new History.Page(page.number+1, "");
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
      }
      else {
         call.direction = "down";
      }
      call.resolutionIn = this.stats.getValue("video", "googFrameWidthReceived")+"x"+this.stats.getValue("video", "googFrameHeightReceived");
      call.resolutionOut = this.stats.getValue("video", "googFrameWidthSent")+"x"+this.stats.getValue("video", "googFrameHeightSent");
      call.bitrateIn = this.stats.getAvg("video", "kiloBitsReceivedPerSecond");
      call.bitrateOut = this.stats.getAvg("video", "kiloBitsSentPerSecond");
      call.frameRateIn = this.stats.getAvg("video", "googFrameRateReceived");
      call.frameRateOut = this.stats.getAvg("video", "googFrameRateSent");
      call.audioLostPer = this.stats.getAvg("audio", "packetsLostPer");
      call.videoLostPer = this.stats.getAvg("video", "packetsLostPer");
      call.jitter = this.stats.getAvg("audio", "googJitterReceived");
      call.length = WebRTC.Utils.format(Math.round(Math.abs((rtcSession.end_time - start) / 1000)));
      return call;
    },

    toggle:function () {
      if (ClientConfig.enableCallHistory === true) {
        if (this.historyToggled === false) {
          $("#callHistory, #historyClear").fadeIn(100);
        }
        else if (this.historyToggled === true) {
          $("#callHistory, #historyClear").fadeOut(100);
        }
      }
      this.historyToggled = !this.historyToggled;
    }
  };

  WebRTC.History = History;
}(WebRTC));
