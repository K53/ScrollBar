(function() {
  $(function() {
    var instance;
    return instance = new ScrollBar(".content", ".scroll", ".bar", ".bar-rail", "bar-rail-active");
  });

  window.ScrollBar = (function() {
    function ScrollBar(content, scroll, bar, barRail, barRailActive) {
      this.content = content;
      this.scroll = scroll;
      this.bar = bar;
      this.barRail = barRail;
      this.barRailActive = barRailActive;
      this.delay = 1500;
      this.timer = 0;
      $(this.scroll).on("scroll", this.scrollStopEventTrigger.bind(this));
      $(this.scroll).on("scroll", this.barSize.bind(this));
      $(window).on("resize load", this.barSize.bind(this));
      $(this.barRail).on("mouseenter", this.showBar.bind(this));
      $(window).on("scrollstop mouseleave", (function(_this) {
        return function() {
          return $(_this.barRail).removeClass(_this.barRailActive);
        };
      })(this));
    }

    ScrollBar.prototype.barSize = function() {
      var barHeight, top, totalHeight, visibleHeight;
      totalHeight = $(this.content).outerHeight();
      visibleHeight = $(window).height();
      barHeight = visibleHeight / totalHeight * visibleHeight;
      top = $(this.scroll).scrollTop() * visibleHeight / totalHeight;
      $(this.bar).css("height", barHeight);
      $(this.bar).css("top", top);
      this.showBar();
      return void 0;
    };

    ScrollBar.prototype.showBar = function() {
      $(this.barRail).addClass(this.barRailActive);
      return void 0;
    };

    ScrollBar.prototype.scrollStopEventTrigger = function() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout((function(_this) {
        return function() {
          $(window).trigger("scrollstop");
          return void 0;
        };
      })(this), this.delay);
      return void 0;
    };

    return ScrollBar;

  })();

}).call(this);

//# sourceMappingURL=index.js.map
