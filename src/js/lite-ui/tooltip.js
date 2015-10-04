;(function($) {
  /**
   * Tooltip for Summernote Lite UI
   *
   */

  $.summernote = $.summernote || {};

  $.summernote.tooltip = $.summernote.tooltip || {};

  $.summernote.tooltip = {

    show : function ($node) {
      var $tooltip = $node.data('summernote-tooltip');
      var options = $node.data('summernote-tooltip-options');

      var offset = $node.offset();

      var title = options.title || $node.attr('title') || $node.data('title');
      var placement = $node.data('placement') || options.placement;

      $tooltip.addClass(placement);
      $tooltip.addClass('in');
      $tooltip.find(".note-tooltip-content").text(title);
      $tooltip.appendTo(options.target);

      var nodeWidth = $node.outerWidth();
      var nodeHeight = $node.outerHeight();
      var tooltipWidth = $tooltip.outerWidth();
      var tooltipHeight = $tooltip.outerHeight();

      if (placement == 'bottom') {
        $tooltip.css({
          top : offset.top + nodeHeight,
          left : offset.left + (nodeWidth/2 - tooltipWidth/2)
        });
      } else if (placement == 'top') {
        $tooltip.css({
          top : offset.top - tooltipHeight,
          left : offset.left + (nodeWidth/2 - tooltipWidth/2)
        });
      } else if (placement == 'left') {
        $tooltip.css({
          top : offset.top + (nodeHeight/2 - tooltipHeight/2),
          left : offset.left - tooltipWidth
        });
      } else if (placement == 'right') {
        $tooltip.css({
          top : offset.top + (nodeHeight/2 - tooltipHeight/2),
          left : offset.left + nodeWidth
        });
      }

    },

    hide : function ($node) {
      var $tooltip = $node.data('summernote-tooltip');

      $tooltip.removeClass('in');
      $tooltip.remove();
    },

    create : function ($node, options) {
      var self = this;
      options = options || {
        title : "",
        target : 'body',
        trigger : 'hover focus',
        placement : 'bottom'
      }

      // create tooltip node
      var $tooltip = $('<div class="note-tooltip in">' +
        '<div class="note-tooltip-arrow"></div>' +
        '<div class="note-tooltip-content"></div>' +
        '</div>');

      $node.data('summernote-tooltip', $tooltip);
      $node.data('summernote-tooltip-options', options);

      // define event
      if (options.trigger !== 'manual') {
        var triggers = options.trigger.split(' ');
        triggers.forEach(function(it) {
          if (it == 'hover') {
            $node.off('mouseenter').on('mouseenter', function() {
              self.show($node);
            });

            $node.off('mouseleave').on('mouseleave', function() {
              self.hide($node);
            });
          } else if (it == 'click' )  {
            $node.on('click', function() {
              self.toggle($node);
            });
          } else if (it == 'focus') {
            $node.on('focus', function() {
              self.show($node);
            });
            $node.on('blur', function() {
              self.hide($node);
            });
          }
        });
      }

    }
  }
})(jQuery);