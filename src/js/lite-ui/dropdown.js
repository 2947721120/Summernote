;(function($) {
  /**
   * Dropdown for Summernote Lite UI
   *
   */

  $.summernote = $.summernote || {};

  $.summernote.dropdown = $.summernote.dropdown || {};

  $.summernote.dropdown = {

    clear : function () {
      var $parent = $('.note-btn-group.open');

      $parent.find('.note-btn.active').removeClass('active');
      $parent.removeClass('open');
    },

    show : function ($button) {
      var $parent = $button.parent();

      $button.addClass('active');
      $parent.addClass('open');
    },

    hide : function ($button) {
      var $parent = $button.parent();

      $button.removeClass('active');
      $parent.removeClass('open');
    },

    toggle : function ($button) {

      var $parent = $button.parent();
      var isOpened = $parent.hasClass('open');

      this.clear();

      if (isOpened) {
        this.hide($button);
      } else {
        this.show($button);
      }

    }
  };
})(jQuery);