module.exports = StatsView;

var PopupView = require('./popup');
var Utils = require('../Utils');

function StatsView(options, eventbus, configuration, sipstack) {
  var self = {};

  Utils.extend(self, PopupView(options, eventbus));

  self.elements = ['statsVar', 'statsContainer'];

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
        "pid": self.sipstack.getSessionId(),
        "reports": reports
      };
      addStats(data);
    });
  };

  self.getDataSerie = function(type, label, sessionId) {
    var dataSeries = getDataSeriesByLabel(sessionId || this.sipstack.getSessionId(), type, label);
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
    return $('[data-type="' + type + '"][data-var="' + name + '"]').text();
  };

  self.getAvg = function(type, name) {
    return Math.round(($('[data-type="' + type + '"][data-var="' + name + '"]').attr("data-avg") * 100)) / 100.0;
  };

  self.listeners = function() {
    self.statsVar.click(function() {
      var index = self.statsVar.index($(this)[0]);
      self.setSelected("stats" + index, this.callStats);
    });
    eventbus.on('modifier', function(e){
      if(e.which === 83) {
        self.show();
      }
    });
    eventbus.on("started", function(e) {
      self.statsContainer.attr('id', sipstack.getSessionId() + '-1');
    });
  };

  return self;
}