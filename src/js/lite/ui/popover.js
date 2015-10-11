define(function () {
  var Popover = function () {
    this.show = function ($node) {
      var $popover = $node.data('summernote-popover');
      var options = $node.data('summernote-popover-options');

      var offset = $node.offset();
      var content = options.content || $node.data('content');
      var placement = $node.data('placement') || options.placement;
      var dist = 6;

      $popover.addClass(placement);
      $popover.addClass('in');
      $popover.find('.note-popover-content').html(content);
      $popover.appendTo(options.target);

      var nodeWidth = $node.outerWidth();
      var nodeHeight = $node.outerHeight();
      var popoverWidth = $popover.outerWidth();
      var popoverHeight = $popover.outerHeight();

      if (placement === 'bottom') {
        $popover.css({
          top : offset.top + nodeHeight + dist,
          left : offset.left + (nodeWidth / 2 - popoverWidth / 2)
        });
      } else if (placement === 'top') {
        $popover.css({
          top : offset.top - popoverHeight - dist,
          left : offset.left + (nodeWidth / 2 - popoverWidth / 2)
        });
      } else if (placement === 'left') {
        $popover.css({
          top : offset.top + (nodeHeight / 2 - popoverHeight / 2),
          left : offset.left - popoverWidth - dist
        });
      } else if (placement === 'right') {
        $popover.css({
          top : offset.top + (nodeHeight / 2 - popoverHeight / 2),
          left : offset.left + nodeWidth + dist
        });
      }
    };

    this.hide = function ($node) {
      var $popover = $node.data('summernote-popover');

      $popover.removeClass('in');
      $popover.remove();
    };

    this.toggle = function ($node) {
      var $popover = $node.data('summernote-popover');

      if ($popover.hasClass('in')) {
        this.hide($node);
      } else {
        this.show($node);
      }
    };

    this.init = function ($node, options) {
      var self = this;
      options = options || {
        title : '',
        content : '',
        target : 'body',
        trigger : 'hover focus',
        placement : 'bottom'
      };

      // create popover node
      var $popover = $('<div class="note-popover in">' +
          '<div class="note-popover-arrow"></div>' +
          '<div class="note-popover-content"></div>' +
          '</div>');

      $node.data('summernote-popover', $popover);
      $node.data('summernote-popover-options', options);

      // define event
      if (options.trigger !== 'manual') {
        var triggers = options.trigger.split(' ');
        triggers.forEach(function (it) {
          if (it === 'hover') {
            $node.off('mouseenter').on('mouseenter', function () {
              self.show($node);
            });

            $node.off('mouseleave').on('mouseleave', function () {
              self.hide($node);
            });
          } else if (it === 'click')  {
            $node.on('click', function () {
              self.toggle($node);
            });
          } else if (it === 'focus') {
            $node.on('focus', function () {
              self.show($node);
            });
            $node.on('blur', function () {
              self.hide($node);
            });
          }
        });
      }
    };
  };

  return Popover;
});
