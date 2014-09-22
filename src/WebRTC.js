/**
 * @name WebRTC
 * @namespace
 */
(function(window) {

var WebRTC = (function() {
  "use strict";

  var WebRTC = {};

  Object.defineProperties(WebRTC, {
    version: {
      get: function(){ return '<%= pkg.version %>'; }
    },
    name: {
      get: function(){ return '<%= pkg.title %>'; }
    }
  });

  // IIFE to ensure safe use of $
  (function( $ ) {
    // Create plugin
    $.fn.tooltips = function(el) {

      var $el;

      // Ensure chaining works
      return this.each(function(i, el) {

        $el = $(el).attr("data-tooltip", i);
        var tooltipEl = $el.attr('data-tooltip-element');
        var content = tooltipEl ? $(tooltipEl)[0].outerHTML : $el.attr('title');
        // Make DIV and append to page
        var $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + content + '<div class="arrow"></div></div>').appendTo("body");

        // Position right away, so first appearance is smooth
        $tooltip.position({
          at: "center top",
          my: "center bottom",
          of: $el,
          collision: 'none'
        });

        $el
          // Get rid of yellow box popup
          .removeAttr("title")

          // Mouseenter
          .hover(function() {

            $el = $(this);

            $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']');

            // Reposition tooltip, in case of page movement e.g. screen resize
            $tooltip.position({
              at: "center top",
              my: "center bottom",
              of: $el,
              collision: 'none'
            });

            // Adding class handles animation through CSS
            $tooltip.addClass("active");

            // Mouseleave
          }, function() {

            $el = $(this);

            // Temporary class for same-direction fadeout
            $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");

            // Remove all classes
            setTimeout(function() {
              $tooltip.removeClass("active").removeClass("out");
            }, 300);

          });
      });
    };
  })(jQuery);

  jQuery.fn.putCursorAtEnd = function() {

    return this.each(function() {

      $(this).focus();

      // If this function exists...
      if (this.setSelectionRange) {
        // ... then use it (Doesn't work in IE)

        // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
        var len = $(this).val().length * 2;

        this.setSelectionRange(len, len);

      } else {
        // ... otherwise replace the contents with itself
        // (Doesn't work in Google Chrome)

        $(this).val($(this).val());

      }

      // Scroll to the bottom, in case we're in a tall textarea
      // (Necessary for Firefox and Google Chrome)
      this.scrollTop = 999999;

    });

  };

  $.cssHooks.backgroundColor = {
    get: function(elem) {
      var bg = null;
      if (elem.currentStyle) {
        bg = elem.currentStyle["backgroundColor"];
      }
      else if (window.getComputedStyle) {
        bg = document.defaultView.getComputedStyle(elem,
          null).getPropertyValue("background-color");
      }
      if (bg.search("rgb") === -1 || bg === 'transparent') {
        return bg;
      }
      else {
        bg = bg.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+).*\)$/);
        var hex = function(x) {
          return ("0" + parseInt(x, 10).toString(16)).slice(-2);
        };
        return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
      }
    }
  };

  $(document).ready(function(){
    var nodes = $("script[src*='webrtc-bundle']");
    if(nodes.length === 0) {
      console.error('no <script> with webrtc-bundle.js found');
      return;
    }

    window.BroadSoftWebRTC = window.BroadSoftWebRTC || {};
    window.BroadSoftWebRTC.clients = [];

    $.each(nodes, function(i, node){
      node = $(node);
      var config = $.extend({}, window.ClientConfig, node.data());
      var client = new WebRTC.Client(config);
      client.appendTo(node.parent());
      node.remove();
      window.BroadSoftWebRTC.clients.push(client);
    });
  });

  (function($){
    $.isBlank = function(obj){
      return(!obj || $.trim(obj) === "");
    };
  })(jQuery);

  if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }

  return WebRTC;
}());
