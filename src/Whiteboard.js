/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var Whiteboard;

  Whiteboard = function (client, eventBus, sipStack) {
    this.whiteboard = $('#whiteboard');
    this.canvas = $('#simple_sketch');
    this.context = this.canvas[0].getContext('2d');

    this.toggled = false;
    this.client = client;
    this.sipStack = sipStack;
    this.eventBus = eventBus;

    this.color = '#000000';
    this.size = 5;
    this.tool = 'marker';
    this.action = [];

//    this.canvas.sketch();

    var self = this;

    this.canvas.bind('click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel', jQuery.proxy( this, "onEvent" ));

    this.eventBus.on("dataReceived", function(e){
      var data = e.data.data;
      var img = new Image();
      img.onload = function(){
        self.clear();
        self.context.drawImage(img,0,0); // Or at whatever offset you like
      };
      img.src = data;
    });
  };

  Whiteboard.prototype = {
    sendData: function() {
      var data = this.canvas[0].toDataURL();
      this.sipStack.sendData(data);
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
      if(this.painting) {
        this.action.events.push({
          x: e.pageX - this.canvas.offset().left,
          y: e.pageY - this.canvas.offset().top,
          event: e.type
        });
        this.draw(this.action);
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
      }
      else {
        this.whiteboard.fadeIn(100);
      }
      this.toggled = !this.toggled;
    }
  };

  WebRTC.Whiteboard = Whiteboard;
}(WebRTC));
