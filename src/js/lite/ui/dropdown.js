define(function () {
  var Dropdown = function () {
    this.clear = function () {
      var $parent = $('.note-btn-group.open');
      $parent.find('.note-btn.active').removeClass('active');
      $parent.removeClass('open');
    };

    this.show = function ($button) {
      var $parent = $button.parent();
      $button.addClass('active');
      $parent.addClass('open');
    };

    this.hide = function ($button) {
      var $parent = $button.parent();
      $button.removeClass('active');
      $parent.removeClass('open');
    };

    this.toggle = function ($button) {
      var $parent = $button.parent();
      var isOpened = $parent.hasClass('open');
      this.clear();
      if (isOpened) {
        this.hide($button);
      } else {
        this.show($button);
      }
    };
  };

  return Dropdown;
});
