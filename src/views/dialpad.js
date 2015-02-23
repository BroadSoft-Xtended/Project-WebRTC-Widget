module.exports = DialpadView

var Utils = require('../Utils');
var PopupView = require('./popup');

function DialpadView(options, eventbus, callcontrol, historyView, videobarView, sipstack, sound) {
  var self = {};

  Utils.extend(self, PopupView(options, eventbus));

  self.elements = ['historyButton', 'destination', 'call', 'keys'];

  self.listeners = function() {
    window.onbeforeunload = function(e) {
      self.endCall({
        rtcSession: 'all'
      });
      return null;
    };
    eventbus.on("disconnected", function(e) {
      videobarView.endCall();
    });
    eventbus.on("failed", function(e) {
      videobarView.endCall({
        rtcSession: e.sender
      });
    });
    self.keys.bind('click', function(e) {
      e.preventDefault();
      self.destination.val(self.destination.val() + e.firstChild.nodeValue);
      self.processDigitInput(e.target.textContent);
    });
    eventbus.on("ended", function(e) {
      videobarView.endCall({
        rtcSession: e.sender
      });
    });
    self.destination.keypress(function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        callcontrol.callUri(self.destination.val());
      }
    });
    self.historyButton.bind('click', function(e) {
      e.preventDefault();
      historyView.toggle();
    });
    self.call.bind('click', function(e) {
      e.preventDefault();
      sound.playClick();
      callcontrol.callUri(self.destination.val());
    });
    eventbus.on('calling', function(e) {
      self.destination.val(e.destination);
    });
    eventbus.on('viewChanged', function(e) {
      if (e.view === 'dialpad' && e.visible) {
        self.destination.focus();
      } else if (e.view === 'history') {
        if (e.visible) {
          self.historyButton.removeClass("active");
        } else {
          self.historyButton.addClass("active");
        }
      } else if (e.view === 'settings' && e.visible) {
        self.hide();
      }
    });
    // Prevent the backspace key from navigating back if dialpad is shown
    $(document).bind('keydown', function(event) {
      if (self.visible) {
        var doPrevent = false;
        if (event.keyCode === 8) {
          var d = event.srcElement || event.target;
          if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' ||
              d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' ||
              d.type.toUpperCase() === 'EMAIL')) || d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
          } else {
            doPrevent = true;
            self.destination.trigger('keydown', event);
            self.destination.putCursorAtEnd();
          }
        }

        if (doPrevent) {
          event.preventDefault();
          return;
        }
      }

      var digit = String.fromCharCode(event.which);
      self.processDigitInput(digit, event);
    });

  };

  self.pressDTMF = function(digit) {
    if (digit.length !== 1) {
      return;
    }
    if (sipstack.isStarted()) {
      self.destination.val(self.destination.val() + digit);
      sound.playClick();
      sipstack.sendDTMF(digit);
    }
  };

  self.processDigitInput = function(digit, event) {
    if (!sipstack.isStarted() && self.visible) {
      // ignore if event happened on destination input itself
      if (event && self.destination.is(event.target)) {
        return;
      }
      self.destination.val(self.destination.val() + digit);
      self.destination.putCursorAtEnd();
    } else if (digit.match(/^[0-9A-D#*,]+$/i)) {
      self.pressDTMF(digit);
    }
  };

  return self;
}