/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var History,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'History');

  History = function (client, sound, stats) {
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

    this.page = null;
    this.historyToggled = false;
    this.client = client;
    this.sound = sound;
    this.stats = stats;
    this.callsPerPage = 10;
    this.maxPages = 25;
    this.rows = [];

    this.registerListeners();
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
      var allCookies = document.cookie;
      var match = null;
      var pages = [];
      var regex = new RegExp(/page_(.*)\=(.*)\|end\1/g);
      while (match = regex.exec(allCookies)) {
        pages.push(match[2]);
      }
      return pages;
    },

    updateButtonsVisibility: function() {
      var pagesArray = this.pages();
      var pagesCount = pagesArray ? pagesArray.length - 1 : 0;
      if (this.page < pagesCount) {
        this.historyForward.show();
      }
      else {
        this.historyForward.hide();
      }
      if (this.page > 0) {
        this.historyBack.show();
      }
      else {
        this.historyBack.hide();
      }
    },

    updateContent: function() {
      this.content.html("");
      this.rows = [];
      var pagesArray = this.pages();
      logger.log("updateContent for pageNumber : "+this.page+" with pages : "+pagesArray.length);
      this.updateButtonsVisibility();
      if(this.page < pagesArray.length) {
        var calls = this.getCalls(pagesArray[this.page]);
        logger.log("page with calls : "+calls.length);
        for (var i = 0; i < calls.length; i++) {
          var row = $('#historyRowSample').clone();
          row.attr('id', '');
          row.attr('class', 'history-row');
          var call = new History.Call(calls[i]);
          row.bind("click", this.callDetailsHandler(call));
          row.find(".historyCall").text((this.page * 10) + i + 1);
          row.find(".historyDestination").text(call.destinationWithoutSip());
          row.find(".historyDirection").text(call.direction);
          row.find(".historyDate").text(call.startDate());
          row.find(".historyLength").text(call.length);
          this.rows.push(row);
          row.appendTo(this.content);
        }
      }
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

    setPage: function(page) {
      this.page = page;
      this.updateContent();
    },

    registerListeners:function () {
      var self = this;

      this.historyForward.bind('click', function (e) {
        e.preventDefault();
        self.sound.playClick();
        self.setPage(self.page + 1);
      });

      this.historyBack.bind('click', function (e) {
        e.preventDefault();
        self.sound.playClick();
        self.setPage(self.page - 1);
      });

      this.historyDetailsClose.bind('click', function (e) {
        e.preventDefault();
        self.callHistoryDetails.fadeOut(100);
      });

      this.historyCallLink.bind('click', function (e) {
        e.preventDefault();
        self.sound.playClick();
        var destination = self.historyCallLink.attr("data-destination");
        self.client.destination.val(destination);
        self.client.call();
        self.callHistoryDetails.hide();
      });

      this.historyClear.bind('click', function (e) {
        e.preventDefault();
        self.sound.playClick();
        var pagesArray = self.pages();
        for (var i = 0; i < pagesArray.length; i++) {
          $.removeCookie("page_" + (i));
        }
        self.setPage(0);
      });
    },

    persistPage:function (pageNumber, calls) {
      var cookieKey = ("page_" + pageNumber);
      var cookieValue = calls.join("~") + "|end"+pageNumber;
      logger.log("persistCall : cookieValue : "+cookieValue);
      $.cookie(cookieKey, cookieValue, { expires:ClientConfig.expires});
    },

    persistCall:function (rtcSession) {
      if (!ClientConfig.enableCallHistory) {
        return;
      }
      // Get latest cookie
      var pagesArray = this.pages();
      var pageNumber = null;
      if (pagesArray.length > 0) {
        pageNumber = pagesArray.length - 1;
      }
      else {
        pageNumber = 0;
      }

      var calls = [];
      if(pagesArray.length > 0) {
        calls = this.getCalls(pagesArray[pagesArray.length-1]);
      }

      if(calls.length >= this.callsPerPage) {
        calls = [];
        pageNumber++;
        if(pageNumber >= this.maxPages) {
          // remove first call and reorder calls to each page
          var allCalls = [];
          for(var i=0; i<pagesArray.length; i++) {
            allCalls = allCalls.concat(this.getCalls(pagesArray[i]));
          }
          pageNumber = -1;
          for(var j=1; j<allCalls.length; j+=this.callsPerPage) {
            calls = allCalls.slice(j, this.callsPerPage);
            pageNumber++;
            this.persistPage(pageNumber, calls);
          }
        }
      }

      // cookie vars
      var call = new History.Call();
      var start = rtcSession.start_time;
      call.startTime = new Date(start).getTime();
      call.destination = rtcSession.remote_identity.uri;
      if (rtcSession.direction === "outgoing") {
        call.direction = "------>";
      }
      else {
        call.direction = "<------";
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
      calls.push(call.toString());
      this.persistPage(pageNumber, calls);
      this.updateContent();
    },

    getCalls: function (page) {
      return page ? page.split("~") : [];
    },

    toggle:function () {
      if (ClientConfig.enableCallHistory === true) {
        if (this.historyToggled === false) {
          if(!this.page) {
            this.setPage(Math.max(0, this.pages().length - 1));
          }
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
