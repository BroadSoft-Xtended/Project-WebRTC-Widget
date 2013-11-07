(function(WebRTC) {
  var Stats;
//    LOG_PREFIX = WebRTC.name +' | '+ 'Configuration' +' | ';

  Stats = function(client) {
    this.statsToggled = false;
    this.client = client;

    this.initialize();
  };

  Stats.prototype = {
    toggle: function()
    {
      if (ClientConfig.enableCallStats)
      {
        if (this.statsToggled === false)
        {
          $("#callStats").fadeIn(100);
        }
        else if (this.statsToggled === true)
        {
          $("#callStats").fadeOut(100);
        }
      }
      this.statsToggled = !this.statsToggled;
    },

    getReportById: function(reports, id)
    {
      for(var i = 0; i < reports.length; i++)
      {
        if(reports[i].id === id)
        {
          return reports[i];
        }
      }
      return null;
    },

    processStats: function() {
      var self = this;
      var peerConnection = this.client.activeSession.rtcMediaHandler.peerConnection;

      peerConnection.getStats(function (stats)
      {
        var results = stats.result();
        var reports = [];
        for (var i = 0; i < results.length; ++i)
        {
          var res = results[i];
          var report = self.getReportById(reports, res.id);
          if(!report)
          {
            report = {};
            report["type"] = res.type;
            report["id"] = res.id;
          }

          var names = res.names();
          var values = [];
          for(var j = 0; j < names.length; j++)
          {
            var name = names[j];
            if(!name)
            {
              continue;
            }
            var value = res.stat(name);
            values.push(name);
            values.push(value);
          }
          var valueObj = {};
          valueObj["timestamp"] = res.timestamp;
          valueObj["values"] = values;
          report["stats"] = valueObj;
          reports.push(report);
        }
        var data = {"lid":1,"pid":self.client.getSessionId(),"reports":reports};
        addStats(data);
      });
    },

    setSelected: function(id, parentSelector, selected) {
      if (arguments.length === 2) {
        selected = true;
      }
      var className = id.replace(/\d+/g, '');
      var classes = jQuery.grep($(parentSelector).attr('class').split(" "), function(n, i){
        return n.indexOf(className) === -1;
      });
      if(selected) {
        classes.push(id+'-selected');
        if(id !== className) {
          classes.push(className+'-selected');
        }
      }
      var classNames = classes.join(" ");
      $(parentSelector).attr('class', classNames);

    },

    getValue: function(type, name) {
      return $('[data-type="'+type+'"][data-var="'+name+'"]').text();
    },

    getAvg: function(type, name) {
      return Math.round(($('[data-type="'+type+'"][data-var="'+name+'"]').attr("data-avg") * 100)) / 100.0;
    },

    initialize: function() {
      var self = this;
      $("a.stats-var").click(function(){
        var index = $(".stats-var").index($(this)[0]);
        self.setSelected("stats"+index, "#callStats");
      });
    }
  };

  WebRTC.Stats = Stats;
}(WebRTC));
