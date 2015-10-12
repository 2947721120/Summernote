define([
  'summernote/base/renderer',
  'summernote/lite/ui/tooltip',
  'summernote/lite/ui/dropdown'
], function (renderer, tooltip, dropdownMenu) {
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
  var button = renderer.create('<button class="note-btn">', function ($node, options) {

    if (options) {
      if (options.tooltip) {
        tooltip.create($node, {
          title: options.tooltip
        });
      }

      if (options.data && options.data.toggle === 'dropdown') {
        dropdownMenu.create($node);
      }
    }

  });

  var dropdown = renderer.create('<div class="note-dropdown-menu" />', function ($node, options) {
    var markup = $.isArray(options.items) ? options.items.map(function (item) {
      return '<div class="note-dropdown-item"><a href="#" data-value="' + item + '">' + item + '</a></div>';
    }).join('') : options.items;

    $node.html(markup);
  });


  var dropdownCheck = renderer.create('<div class="note-dropdown-menu note-check" />', function ($node, options) {
    var markup = $.isArray(options.items) ? options.items.map(function (item) {
      return '<div class="note-dropdown-item"><a href="#" data-value="' + item + '"><i class="fa fa-check" /> ' + item + '</a></div>';
    }).join('') : options.items;

    $node.html(markup);
  });

  var palette = renderer.create('<div class="note-color-palette"/>', function ($node, options) {
    var contents = [];
    for (var row = 0, rowSize = options.colors.length; row < rowSize; row++) {
      var eventName = options.eventName;
      var colors = options.colors[row];
      var buttons = [];
      for (var col = 0, colSize = colors.length; col < colSize; col++) {
        var color = colors[col];
        buttons.push([
          '<button type="button" class="note-btn note-color-btn"',
          'style="background-color:', color, '" ',
          'data-event="', eventName, '" ',
          'data-value="', color, '" ',
          'title="', color, '" ',
          'data-toggle="button" tabindex="-1"></button>'
        ].join(''));
      }
      contents.push('<div class="note-color-row">' + buttons.join('') + '</div>');
    }
    $node.html(contents.join(''));

    $node.find('.note-color-btn').each(function () {
      tooltip.create($(this));
    });
  });
  var dialog = renderer.create('<div class="modal" aria-hidden="false"/>', function ($node, options) {
    $node.html([
      '<div class="note-modal">',
      ' <div class="note-modal-content">',
      (options.title ?
        '<div class="note-modal-header">' +
        ' <button type="button" class="close" ><span >&times;</span></button>' +
        ' <h4 class="note-modal-title">' + options.title + '</h4>' +
        '</div>' : ''
      ),
      '<div class="note-modal-body">' + options.body + '</div>',
      (options.footer ?
        '<div class="note-modal-footer">' + options.footer + '</div>' : ''
      ),
      ' </div>',
      '</div>'
    ].join(''));
  });

  var popover = renderer.create([
    '<div class="note-popover bottom">',
    '  <div class="note-popover-arrow"/>',
    '  <div class="note-popover-content"/>',
    '</div>'
  ].join(''));

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
    dropdown: dropdown,
    dropdownCheck: dropdownCheck,
    palette: palette,
    dialog: dialog,
    popover: popover,

    toggleBtn: function ($btn, isEnable) {
      $btn.toggleClass('disabled', !isEnable);
      $btn.attr('disabled', !isEnable);
    },

    toggleBtnActive: function ($btn, isActive) {
      $btn.toggleClass('active', isActive);
    },

    onDialogShown: function ($dialog, handler) {
      $dialog.one('node.show.modal', handler);
    },

    onDialogHidden: function ($dialog, handler) {
      $dialog.one('node.hide.modal', handler);
    },

    showDialog: function ($dialog) {
      $dialog.data('modal').show();
    },

    hideDialog: function ($dialog) {
      $dialog.data('modal').hide();
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
