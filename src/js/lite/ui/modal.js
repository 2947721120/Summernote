define(function () {
  var Modal = function () {
    var self = this;

    this.show = function ($modal, options) {
      options = options || { target : 'body' };

      if (!$modal.data('backdrop')) {
        $modal.data('backdrop', $('<div class="note-modal-backdrop" />'));
      }

      if (options.target === 'body') {
        $modal.data('backdrop').css('position', 'fixed');
        $modal.css('position', 'fixed');
      } else {
        $modal.data('backdrop').css('position', 'absolute');
        $modal.css('position', 'absolute');
      }

      $modal.data('backdrop').appendTo(options.target).show();
      $modal.appendTo(options.target).addClass('open').show();

      $modal.trigger('note.modal.show');

      $modal.off('click').on('click', '.close', function () {
        self.hide($modal);
      });
    };

    this.hide = function ($modal) {
      $modal.removeClass('open').hide();
      $modal.data('backdrop').hide();
      $modal.trigger('note.modal.hide');
    };
  };

  return Modal;
});
