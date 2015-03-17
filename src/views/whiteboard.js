module.exports = require('webrtc-core').bdsft.View(WhiteboardView);

var PopupView = require('./popup');
var Utils = require('webrtc-core').utils;
var Constants = require('webrtc-core').constants;

function WhiteboardView(eventbus, sipstack) {
  var self = {};

  self.elements = ['canvas', 'tools'];

  self.color = '#000';
  self.size = 5;
  self.tool = 'marker';
  self.action = [];

  self.listeners = function() {
    eventbus.on('modifier', function(e){
      if(e.which === 87) {
        self.toggle();
      }
    });
    eventbus.on("dataReceived", function(e) {
      var data = e.data;
      var regex = /^whiteboard:/;
      if (data.match(regex)) {
        data = data.replace(regex, '');
        var img = new Image();
        img.onload = function() {
          self.clear();
          self.context.drawImage(img, 0, 0); // Or at whatever offset you like
        };
        img.src = data;
      }
    });
    self.updateToolsSelection();
  };
  self.init = function() {
    PopupView(self, eventbus);
    if(self.canvas[0] && self.canvas[0].getContext) {
      self.context = self.canvas[0].getContext('2d');    
      // self.sketch = require('../../js/sketch')(self.canvas[0]);
    }

    $.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
      self.tools.append("<a href='.canvas' onclick='javascript:;' data-color='" + this + "' style='width: 10px; background: " + this + ";'></a> ");
    });
    $.each([3, 5, 10, 15], function() {
      self.tools.append("<a href='.canvas' onclick='javascript:;' data-size='" + this + "' style='background: #ccc'>" + this + "</a> ");
    });

    self.canvas.bind('click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel', function(e){
      self.onEvent(e);
    });

    Utils.getElement('body').delegate("a[href=\"." + (self.canvas.attr('class')) + "\"]", 'click', function() {
      var $canvas, $this, key, sketch, _i, _len, _ref;
      $this = Utils.getElement(this);
      $canvas = Utils.getElement($self.attr('href'));
      sketch = $canvas.data('sketch');
      _ref = ['color', 'size', 'tool'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        var value = $self.attr("data-" + key);
        if (value) {
          if (key === "size") {
            value = +value;
          }
          self[key] = value;
        }
      }
      self.updateToolsSelection();
      return false;
    });
  };
  self.updateToolsSelection = function() {
    $.each(self.tools.find('a'), function() {
      var selected = Utils.getElement(this).data('color') === self.color || Utils.getElement(this).data('tool') === self.tool || +Utils.getElement(this).data('size') === self.size;
      if (selected) {
        Utils.getElement(this).attr('class', 'selected');
      } else {
        Utils.getElement(this).attr('class', '');
      }
    });
  };
  self.sendData = function() {
    var data = self.canvas[0].toDataURL();
    sipstack.sendData("whiteboard:" + data);
  };
  self.clear = function() {
    // Store the current transformation matrix
    self.context.save();

    // Use the identity matrix while clearing the canvas
    self.context.setTransform(1, 0, 0, 1, 0, 0);
    self.context.clearRect(0, 0, self.canvas[0].width, self.canvas[0].height);

    // Restore the transform
    self.context.restore();
  };
  self.onEvent = function(e) {
    if (e.originalEvent && e.originalEvent.targetTouches) {
      e.pageX = e.originalEvent.targetTouches[0].pageX;
      e.pageY = e.originalEvent.targetTouches[0].pageY;
    }
    switch (e.type) {
      case 'mousedown':
      case 'touchstart':
        self.painting = true;
        self.action = {
          tool: self.tool,
          color: self.color,
          size: parseFloat(self.size),
          eventbus: []
        };
        break;
    }
    if (self.painting) {
      self.action.eventbus.push({
        x: e.pageX - self.canvas.offset().left,
        y: e.pageY - self.canvas.offset().top,
        event: e.type
      });
      if (self.tool === 'marker') {
        self.draw(self.action);
      } else if (self.tool === 'eraser') {
        self.erase(self.action);
      }
    }
    switch (e.type) {
      case 'mouseup':
      case 'mouseout':
      case 'mouseleave':
      case 'touchend':
      case 'touchcancel':
        self.painting = false;
        self.action = null;
        self.sendData();
    }
    e.preventDefault();
    return false;
  };
  self.erase = function(action) {
    var oldcomposite;
    oldcomposite = self.context.globalCompositeOperation;
    self.context.globalCompositeOperation = "copy";
    action.color = "rgba(0,0,0,0)";
    self.draw(action);
    self.context.globalCompositeOperation = oldcomposite;
    return self.context.globalCompositeOperation;
  };
  self.draw = function(action) {
    var event, previous, _i, _len, _ref;
    self.context.lineJoin = "round";
    self.context.lineCap = "round";
    self.context.beginPath();
    self.context.moveTo(action.eventbus[0].x, action.eventbus[0].y);
    _ref = action.eventbus;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      event = _ref[_i];
      self.context.lineTo(event.x, event.y);
      previous = event;
    }
    self.context.strokeStyle = action.color;
    self.context.lineWidth = action.size;
    return self.context.stroke();
  };

  return self;
}