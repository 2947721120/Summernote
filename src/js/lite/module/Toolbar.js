define(function () {
  var Toolbar = function (context) {
    var ui = $.summernote.ui;
    var $toolbar = context.layoutInfo.toolbar;

    this.initialize = function () {
      ui.buttonGroup([
        ui.button({
          tooltip: 'bold',
          contents: 'bold',
          click: context.createInvokeHandler('editor.bold')
        }),
        ui.button({
          tooltip: 'italic',
          contents: 'italic',
          click: context.createInvokeHandler('editor.italic'),
          callback : function ($button) {
            $button.addClass('active');
          }
        })
      ]).render().appendTo($toolbar);
    };

    this.destroy = function () {
      $toolbar.children().remove();
    };
  };

  return Toolbar;
});
