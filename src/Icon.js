  module.exports = Icon;

  function Icon(element, sound) {
    this.element = element;
    this.sound = sound;
    this.disabled = false;
  }

  Icon.prototype = {
    css: function(name) {
      return this.element.css(name);
    },
    attr: function(name) {
      return this.element.attr(name);
    },
    disable: function() {
      this.disabled = true;
    },
    enable: function() {
      this.disabled = false;
    },
    onClick: function(handler) {
      var self = this;
      this.element.bind("click", function(e) {
        e.preventDefault();
        if (self.disabled) {
          return;
        }
        self.sound.playClick();
        handler(e);
      });
    }
  };