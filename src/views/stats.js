module.exports = StatsView;

var PopupView = require('./popup');
var Utils = require('../Utils');

function StatsView(options, eventbus, configuration, sipstack, debug) {
  var self = {};

  self.statsMod = require('../../js/stats')(self);

  Utils.extend(self, PopupView(options, eventbus));

  self.elements = ['statsVar', 'statsContainer', 'videoKiloBitsSentPerSecond', 'audioKiloBitsSentPerSecond', 
  'videoKiloBitsReceivedPerSecond', 'audioKiloBitsReceivedPerSecond', 'videoPacketsLost', 'videoPacketsLostPer',
  'audioPacketsLost', 'audioPacketsLostPer', 'videoGoogFrameRateSent', 'videoGoogFrameRateReceived', 'audioAudioInputLevel', 
  'audioAudioOutputLevel', 'videoGoogFrameWidthReceived', 'videoGoogFrameHeightReceived', 'videoGoogFrameWidthSent', 'videoGoogFrameHeightSent',
  'audioGoogRtt', 'audioGoogJitterReceived'];

  var intervalId = null;

  var getElement = function(type, name) {
    return self[Utils.camelize(type + ' ' + name)];
  };

  self.getReportById = function(reports, id) {
    for (var i = 0; i < reports.length; i++) {
      if (reports[i].id === id) {
        return reports[i];
      }
    }
    return null;
  };

  self.processStats = function() {
    var peerConnection = sipstack.activeSession.rtcMediaHandler.peerConnection;

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
        "pid": sipstack.getSessionId(),
        "reports": reports
      };
      self.statsMod.addStats(data);
    });
  };

  self.getPeerConnectionElement = function(data) {
    return self.statsContainer[0];
  };

  self.getDataSerie = function(type, label, sessionId) {
    var dataSeries = getDataSeriesByLabel(sessionId || sipstack.getSessionId(), type, label);
    var result;
    for (var i = 0; i < dataSeries.length; i++) {
      var dataSerie = dataSeries[i];
      if (!result || dataSerie.getAvg() > result.getAvg()) {
        result = dataSerie;
      }
    }
    return result;
  };

  self.getStatValues = function(type, label, sessionId) {
    var dataSerie = this.getDataSerie(type, label, sessionId);
    return dataSerie ? dataSerie.dataPoints_.map(function(e) {
      return e.value;
    }) : null;
  };

  self.getStatAvg = function(type, label, sessionId) {
    var dataSerie = this.getDataSerie(type, label, sessionId);
    return dataSerie ? dataSerie.getAvg() : null;
  };

  self.setSelected = function(id, parentSelector, selected) {
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
  };

  self.getValue = function(type, name) {
    return getElement(type, name).text();
  };

  self.getAvg = function(type, name) {
    return Math.round(getElement(type, name).attr("data-avg") * 100) / 100.0;
  };

  self.onAddStats = function(peerConnectionElement, reportType, reportId, statsData){
    self.elements.forEach(function(element) {
      var label = self[element].data('var');
      var type = self[element].data('type');
      if (self.statsMod.matchesType(label, type, statsData)) {
        var value = self.statsMod.getLastValue(peerConnectionElement, reportType, reportId, label);
        if (value != null) {
          self[element].html(value);
          self[element].attr("data-avg", self.statsMod.getAvgValue(peerConnectionElement, reportType, reportId, label))
        } else {}
      }
    });
  };

  var start = function(){
    if (!intervalId && configuration.enableCallStats && Utils.isChrome()) {
      intervalId = setInterval(function(){
        self.processStats();
      }, 1000);
    }
  };

  var stop = function() {
    if(intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  self.listeners = function() {
    self.statsVar.click(function() {
      var index = self.statsVar.index($(this)[0]);
      self.setSelected("stats" + index, this.callStats);
    });
    eventbus.on('modifier', function(e){
      if(e.which === 83) {
        self.toggle();
      }
    });
    eventbus.on("ended", function(e) {
      stop();
    });
    eventbus.on("started", function(e) {
      self.statsContainer.attr('id', sipstack.getSessionId() + '-1');
      start();
    });
  };

  return self;
}