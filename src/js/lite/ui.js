define([
  'summernote/base/renderer'
], function (renderer) {
  var editor = renderer.create('<div class="note-editor note-frame"/>');
  var toolbar = renderer.create('<div class="note-toolbar"/>');
  var editingArea = renderer.create('<div class="note-editing-area"/>');
  var codable = renderer.create('<textarea class="note-codable"/>');
  var editable = renderer.create('<div class="note-editable " contentEditable="true"/>');
  var statusbar = renderer.create([
    '<div class="note-statusbar">',
    '  <div class="note-resizebar">',
    '    <div class="note-icon-bar"/>',
    '    <div class="note-icon-bar"/>',
    '    <div class="note-icon-bar"/>',
    '  </div>',
    '</div>'
  ].join(''));

  var airEditor = renderer.create('<div class="note-editor"/>');
  var airEditable = renderer.create('<div class="note-editable" contentEditable="true"/>');

  var buttonGroup = renderer.create('<div class="note-btn-group">');
  var button = renderer.create('<button class="note-btn">');

  var ui = {
    editor: editor,
    toolbar: toolbar,
    editingArea: editingArea,
    codable: codable,
    editable: editable,
    statusbar: statusbar,
    airEditor: airEditor,
    airEditable: airEditable,
    buttonGroup: buttonGroup,
    button: button,
    //dropdown: dropdown,
    //dropdownCheck: dropdownCheck,
    //palette: palette,
    //dialog: dialog,
    //popover: popover,

    toggleBtn: function ($btn, isEnable) {
      //$btn.toggleClass('disabled', !isEnable);
      //$btn.attr('disabled', !isEnable);
    },

    toggleBtnActive: function ($btn, isActive) {
      //$btn.toggleClass('active', isActive);
    },

    onDialogShown: function ($dialog, handler) {
      //$dialog.one('shown.bs.modal', handler);
    },

    onDialogHidden: function ($dialog, handler) {
      //$dialog.one('hidden.bs.modal', handler);
    },

    showDialog: function ($dialog) {
      //$dialog.modal('show');
    },

    hideDialog: function ($dialog) {
      //$dialog.modal('hide');
    },

    createLayout: function ($note, options) {
      var $editor = (options.airMode ? ui.airEditor([
        ui.editingArea([
          ui.airEditable()
        ])
      ]) : ui.editor([
        ui.toolbar(),
        ui.editingArea([
          ui.codable(),
          ui.editable()
        ]),
        ui.statusbar()
      ])).render();

      $editor.insertAfter($note);

      return {
        note: $note,
        editor: $editor,
        toolbar: $editor.find('.note-toolbar'),
        editingArea: $editor.find('.note-editing-area'),
        editable: $editor.find('.note-editable'),
        codable: $editor.find('.note-codable'),
        statusbar: $editor.find('.note-statusbar')
      };
    },

    removeLayout: function ($note, layoutInfo) {
      $note.html(layoutInfo.editable.html());
      layoutInfo.editor.remove();
      $note.show();
    }
  };

  return ui;
});
