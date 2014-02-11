/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var Whiteboard;

  Whiteboard = function (client, eventBus, sipStack) {
    this.whiteboard = $('#whiteboard');
    this.canvas = $('#simple_sketch');

    this.toggled = false;
    this.client = client;
    this.sipStack = sipStack;
    this.eventBus = eventBus;

    this.canvas.sketch();

    var self = this;
    this.canvas.mouseup(function() {
      var data = self.canvas[0].toDataURL();
      self.sipStack.sendData(data);
    });

    this.eventBus.on("dataReceived", function(e){
      var data = e.data.data;
      var ctx = self.canvas.getContext('2d');
      var img = new Image();
      img.onload = function(){
        ctx.drawImage(img,0,0); // Or at whatever offset you like
      };
      img.src = data;
    });
  };

  Whiteboard.prototype = {
    toggle:function () {
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
