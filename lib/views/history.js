module.exports = require('webrtc-core').bdsft.View(HistoryView)

var Utils = require('webrtc-core').utils;
var Constants = require('webrtc-core').constants;
var PopupView = require('webrtc-core').popup;

function HistoryView(eventbus, sound, callcontrol, history) {
  var self = {};

  self.model = history;

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
      Utils.getElement(".history-row").removeClass("active");
      // TODO - missing property to activate
      Utils.getElement(self).addClass("active");
    };
  };

  var updateContent = function(calls) {
    self.content.html("");
    self.rows = [];
    calls.forEach(function(call, i){
      var row = self.historyRowSample.clone();
      row.attr('id', '');
      row.attr('class', 'history-row');
      row.bind("click", callDetailsHandler(call));
      row.find(".historyCall").text((history.pageNumber * 10) + i + 1);
      row.find(".hist-destination").text(call.destinationWithoutSip());
      //row.find(".historyDirection").text(call.direction);
      row.find(".hist-direction").append("<i class='icon-arrow-" + call.direction + "-thick'></i>");
      //row.find(".historyDate").text(call.startDate());
      row.find(".hist-date").text(Utils.formatDateTime(call.startDate()));
      row.find(".hist-length").text(call.length);
      self.rows.push(row);
      row.appendTo(self.content);
    });
  };

  self.elements = ['content', 'historyForward', 'historyBack', 'callHistoryDetails', 'historyDetailsClose', 'resolutionIn',
    'resolutionOut', 'bitrateIn', 'bitrateOut', 'frameRateIn', 'frameRateOut', 'audioLostPer', 'videoLostPer', 'jitter',
    'historyClear', 'callLink', 'historyRowSample', 'historyClose'
  ];

  self.init = function() {
    PopupView(self, eventbus);
  };

  self.listeners = function(databinder) {
    databinder.onModelPropChange('isForwardEnabled', function(value){
      self.historyForward.toggle(value);
    });
    databinder.onModelPropChange('isForwardEnabled', function(value){
      self.historyBack.toggle(value);
    });
    databinder.onModelPropChange('calls', function(calls){
      updateContent(calls);
    });
    eventbus.on('modifier', function(e) {
      if (e.which === 72) {
        self.toggle();
      }
    });
    eventbus.on('viewChanged', function(e) {
      if (e.view === 'settings' && e.visible) {
        self.hide();
      } else if (e.view === 'callcontrol' && !e.visible) {
        self.hide();
      }
    });
    self.historyForward.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      history.forward();
    });

    self.historyBack.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      history.back();
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
      sound.playClick();
      var destination = self.callLink.attr("data-destination");
      callcontrol.callUri(destination);
      self.view.css({
        width: "200px"
      });
      self.view.hide();
      self.callHistoryDetails.hide();
    });

    self.historyClear.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      history.clear();
    });
  };

  return self;

}