module.exports = Stats;

function Stats(client, sipStack, configuration) {
  this.ui = client.find('.callStats');

  this.statsToggled = false;
  this.sipStack = sipStack;
  this.configuration = configuration;

  this.initialize();
}

Stats.prototype = {
  toggle: function() {
    if (this.configuration.enableCallStats) {
      if (this.statsToggled === false) {
        this.ui.fadeIn(100);
      } else if (this.statsToggled === true) {
        this.ui.fadeOut(100);
      }
    }
    this.statsToggled = !this.statsToggled;
  },

  getReportById: function(reports, id) {
    for (var i = 0; i < reports.length; i++) {
      if (reports[i].id === id) {
        return reports[i];
      }
    }
    return null;
  },

  processStats: function() {
    var self = this;

    var peerConnection = this.sipStack.activeSession.rtcMediaHandler.peerConnection;

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
        "pid": self.sipStack.getSessionId(),
        "reports": reports
      };
      addStats(data);
    });
  },

  getDataSerie: function(type, label, sessionId) {
    var dataSeries = getDataSeriesByLabel(sessionId || this.sipStack.getSessionId(), type, label);
    var result;
    for (var i = 0; i < dataSeries.length; i++) {
      var dataSerie = dataSeries[i];
      if (!result || dataSerie.getAvg() > result.getAvg()) {
        result = dataSerie;
      }
    }
    return result;
  },

  getStatValues: function(type, label, sessionId) {
    var dataSerie = this.getDataSerie(type, label, sessionId);
    return dataSerie ? dataSerie.dataPoints_.map(function(e) {
      return e.value;
    }) : null;
  },

  getStatAvg: function(type, label, sessionId) {
    var dataSerie = this.getDataSerie(type, label, sessionId);
    return dataSerie ? dataSerie.getAvg() : null;
  },

  setSelected: function(id, parentSelector, selected) {
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

  },

  getValue: function(type, name) {
    return $('[data-type="' + type + '"][data-var="' + name + '"]').text();
  },

  getAvg: function(type, name) {
    return Math.round(($('[data-type="' + type + '"][data-var="' + name + '"]').attr("data-avg") * 100)) / 100.0;
  },

  initialize: function() {
    var self = this;
    $("a.stats-var").click(function() {
      var index = $(".stats-var").index($(this)[0]);
      self.setSelected("stats" + index, this.callStats);
    });
  }
};