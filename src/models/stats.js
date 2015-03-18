module.exports = require('webrtc-core').bdsft.Model(Stats);

var Utils = require('webrtc-core').utils;

function Stats(eventbus, debug, configuration, sipstack) {
  var self = {};

  self.statsMod = require('../../js/stats')(self);

  self.props = {'peerConnectionElement': true,'statsContainerId': true, 'videoKiloBitsSentPerSecond': true, 'audioKiloBitsSentPerSecond': true, 
  'videoKiloBitsReceivedPerSecond': true, 'audioKiloBitsReceivedPerSecond': true, 'videoPacketsLost': true, 'videoPacketsLostPer': true,
  'audioPacketsLost': true, 'audioPacketsLostPer': true, 'videoGoogFrameRateSent': true, 'videoGoogFrameRateReceived': true, 'audioAudioInputLevel': true, 
  'audioAudioOutputLevel': true, 'videoGoogFrameWidthReceived': true, 'videoGoogFrameHeightReceived': true, 'videoGoogFrameWidthSent': true, 'videoGoogFrameHeightSent': true,
  'audioGoogRtt': true, 'audioGoogJitterReceived': true, 
  'videoKiloBitsSentPerSecondAvg': true, 'audioKiloBitsSentPerSecondAvg': true, 
  'videoKiloBitsReceivedPerSecondAvg': true, 'audioKiloBitsReceivedPerSecondAvg': true, 'videoPacketsLostAvg': true, 'videoPacketsLostPerAvg': true,
  'audioPacketsLostAvg': true, 'audioPacketsLostPerAvg': true, 'videoGoogFrameRateSentAvg': true, 'videoGoogFrameRateReceivedAvg': true, 'audioAudioInputLevelAvg': true, 
  'audioAudioOutputLevelAvg': true, 'videoGoogFrameWidthReceivedAvg': true, 'videoGoogFrameHeightReceivedAvg': true, 'videoGoogFrameWidthSentAvg': true, 
  'videoGoogFrameHeightSentAvg': true, 'audioGoogRttAvg': true, 'audioGoogJitterReceivedAvg': true};

  var intervalId = null;

  self.getPeerConnectionElement = function() {
    return self.peerConnectionElement;
  };

  var getElement = function(type, name, isAvg) {
    return self[Utils.camelize(type + ' ' + name + (isAvg ? 'Avg' : ''))];
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

  self.getValue = function(type, name) {
    return getElement(type, name);
  };

  self.getAvg = function(type, name) {
    return Math.round(getElement(type, name, true) * 100) / 100.0;
  };

  self.onAddStats = function(peerConnectionElement, reportType, reportId, statsData){
    Object.keys(self.props).forEach(function(prop) {
      var match = prop.match(/(audio|video)(.*)/);
      if(!match) {
        return;
      }
      var label = Utils.lowercaseFirstLetter(match[2]);
      var type = match[1];
      if (self.statsMod.matchesType(label, type, statsData)) {
        var value = self.statsMod.getLastValue(peerConnectionElement, reportType, reportId, label);
        if (value != null) {
          self[prop] = value;
          var avg = self.statsMod.getAvgValue(peerConnectionElement, reportType, reportId, label);
          self[prop+'Avg'] = avg;
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
    eventbus.on("ended", function(e) {
      stop();
    });
    eventbus.on("started", function(e) {
      self.statsContainerId = sipstack.getSessionId() + '-1';
      start();
    });
  };

  return self;
}