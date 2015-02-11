module.exports = Whiteboard;

var events = require('./eventbus');

function Whiteboard(client, element, sipStack) {
  this.whiteboard = element;
  this.canvas = this.whiteboard.find('.simple_sketch');
  if(this.canvas[0] && this.canvas[0].getContext) {
    this.context = this.canvas[0].getContext('2d');    
  }

  this.toggled = false;
  this.client = client;
  this.sipStack = sipStack;

  this.color = '#000';
  this.size = 5;
  this.tool = 'marker';
  this.action = [];

  this.initCanvas();
  this.registerListeners();
  this.updateToolsSelection();
}

Whiteboard.prototype = {
  registerListeners: function() {
    var self = this;
    events.on("dataReceived", function(e) {
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
  },
  initCanvas: function() {
    var self = this;
    $.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
      self.whiteboard.find('.tools').append("<a href='.simple_sketch' onclick='javascript:;' data-color='" + this + "' style='width: 10px; background: " + this + ";'></a> ");
    });
    $.each([3, 5, 10, 15], function() {
      self.whiteboard.find('.tools').append("<a href='.simple_sketch' onclick='javascript:;' data-size='" + this + "' style='background: #ccc'>" + this + "</a> ");
    });

    this.canvas.bind('click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel', jQuery.proxy(this, "onEvent"));

    $('body').delegate("a[href=\"." + (this.canvas.attr('class')) + "\"]", 'click', function() {
      var $canvas, $this, key, sketch, _i, _len, _ref;
      $this = $(this);
      $canvas = $($this.attr('href'));
      sketch = $canvas.data('sketch');
      _ref = ['color', 'size', 'tool'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        var value = $this.attr("data-" + key);
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
  },
  updateToolsSelection: function() {
    var self = this;
    $.each(this.whiteboard.find(".tools a"), function() {
      var selected = $(this).data('color') === self.color || $(this).data('tool') === self.tool || +$(this).data('size') === self.size;
      if (selected) {
        $(this).attr('class', 'selected');
      } else {
        $(this).attr('class', '');
      }
    });
  },
  sendData: function() {
    var data = this.canvas[0].toDataURL();
    this.sipStack.sendData("whiteboard:" + data);
  },
  clear: function() {
    // Store the current transformation matrix
    this.context.save();

    // Use the identity matrix while clearing the canvas
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);

    // Restore the transform
    this.context.restore();
  },
  onEvent: function(e) {
    if (e.originalEvent && e.originalEvent.targetTouches) {
      e.pageX = e.originalEvent.targetTouches[0].pageX;
      e.pageY = e.originalEvent.targetTouches[0].pageY;
    }
    switch (e.type) {
      case 'mousedown':
      case 'touchstart':
        this.painting = true;
        this.action = {
          tool: this.tool,
          color: this.color,
          size: parseFloat(this.size),
          events: []
        };
        break;
    }
    if (this.painting) {
      this.action.events.push({
        x: e.pageX - this.canvas.offset().left,
        y: e.pageY - this.canvas.offset().top,
        event: e.type
      });
      if (this.tool === 'marker') {
        this.draw(this.action);
      } else if (this.tool === 'eraser') {
        this.erase(this.action);
      }
    }
    switch (e.type) {
      case 'mouseup':
      case 'mouseout':
      case 'mouseleave':
      case 'touchend':
      case 'touchcancel':
        this.painting = false;
        this.action = null;
        this.sendData();
    }
    e.preventDefault();
    return false;
  },
  erase: function(action) {
    var oldcomposite;
    oldcomposite = this.context.globalCompositeOperation;
    this.context.globalCompositeOperation = "copy";
    action.color = "rgba(0,0,0,0)";
    this.draw(action);
    this.context.globalCompositeOperation = oldcomposite;
    return this.context.globalCompositeOperation;
  },
  draw: function(action) {
    var event, previous, _i, _len, _ref;
    this.context.lineJoin = "round";
    this.context.lineCap = "round";
    this.context.beginPath();
    this.context.moveTo(action.events[0].x, action.events[0].y);
    _ref = action.events;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      event = _ref[_i];
      this.context.lineTo(event.x, event.y);
      previous = event;
    }
    this.context.strokeStyle = action.color;
    this.context.lineWidth = action.size;
    return this.context.stroke();
  },
  toggle: function() {
    if (this.toggled) {
      this.whiteboard.fadeOut(100);
    } else {
      this.whiteboard.fadeIn(100);
    }
    this.toggled = !this.toggled;
  }
};