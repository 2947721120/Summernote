# Summernote

超级简单的WYSIWYG编辑器。

[![Build Status](https://secure.travis-ci.org/summernote/summernote.svg)](http://travis-ci.org/summernote/summernote)
[![npm version](https://badge.fury.io/js/summernote.svg)](http://badge.fury.io/js/summernote)
[![Dependency Status](https://gemnasium.com/summernote/summernote.svg)](https://gemnasium.com/summernote/summernote)
[![Coverage Status](https://coveralls.io/repos/summernote/summernote/badge.svg?branch=develop&service=github)](https://coveralls.io/github/summernote/summernote?branch=develop)
[![Gratipay](https://img.shields.io/gratipay/HackerWins.svg)](https://gratipay.com/~HackerWins/)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/summernoteis.svg)](https://saucelabs.com/u/summernoteis)

### Summernote
summernote是一个JavaScript库，可以帮助你创建的所见即所得编辑在线。

首页: <http://summernote.org>

### Why Summernote?

summernote具有一些特殊的功能:

* 从剪贴板粘贴图像
* 保存的图像直接使用Base64编码字段的内容，所以你不需要实现所有图像处理
* 简单的用户界面
* 所见即所得的交互式编辑
* 方便与服务器集成

### 安装和依赖

Summernote uses opensource libraries: [jQuery](http://jquery.com/), [Bootstrap](http://getbootstrap.com), [Font Awesome](https://github.com/FortAwesome/Font-Awesome).

For [Meteor](http://github.com/meteor/meteor), just run `meteor add summernote:summernote`. More info in the [Meteor README](meteor/README.md).

For other/no frameworks:

#### 1. include JS/CSS

包括下面的代码 `<head>` 你的HTML包含标签:

```html
<!-- include libraries(jQuery, bootstrap, fontawesome) -->
<script type="text/javascript" src="//cdnjs.c2cbc.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script> 
<link rel="stylesheet" href="//cdnjs.c2cbc.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" />
<script type="text/javascript" src="//cdnjs.c2cbc.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="//cdnjs.c2cbc.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css" />

<!-- include summernote css/js-->
<link href="summernote.css" rel="stylesheet">
<script src="summernote.js"></script>
```

#### 2. target elements

Then place a `div` tag somewhere in the `body` tag. This element will be replaced with the summernote editor.

```html
<div id="summernote">Hello Summernote</div>
```

#### 3. summernote

Finally, run this script after the DOM is ready:

```javascript
$(document).ready(function() {
  $('#summernote').summernote();
});
```

### API

`code` - get the HTML source code underlying the text in the editor:

```javascript
var html = $('#summernote').summernote('code');
```

`Destroy` summernote:

```javascript
$('#summernote').summernote('destroy');
```

#### Warning - code injection

The code view allows the user to enter script contents. Make sure to filter/[sanitize the HTML on the server](https://github.com/search?l=JavaScript&q=sanitize+html). Otherwise, an attacker can inject arbitrary JavaScript code into clients.

### Supported platforms

Any modern browser: Safari, Chrome, Firefox, Opera, Internet Explorer 9+.

### Upcoming Features
* Responsive toolbar
* Table: Handles (sizing, selection) and popover
* IE8 Support
* Clipboard (you can paste images already)
* Media object selection

### Developer information

#### document structure

```
 - body container: <div class="note-editable">, <td>, <blockquote>, <ul>
 - block node: <div>, <p>, <li>, <h1>, <table>
 - void block node: <hr>
 - inline node: <span>, <b>, <font>, <a>, ...
 - void inline node: <img>
 - text node: #text
```

1. A body container has block node, but `<ul>` has only `<li>` nodes.
2. A body container also has inline nodes sometimes. This inline nodes will be wraped with `<p>` when enter key pressed.
4. A block node only has inline nodes.
5. A inline nodes has another inline nodes
6. `#text` and void inline node doesn't have children.

#### build summernote
```bash
# grunt-cli is need by grunt; you might have this installed already
npm install -g grunt-cli
npm install

# build full version of summernote: dist/summernote.js
grunt build

# generate minified copy: dist/summernote.min.js, dist/summernote.css
grunt dist
```
At this point, you should now have a `build/` directory populated with everything you need to use summernote.

#### test summernote
run tests with Karma and PhantomJS
```bash
grunt test
```
If you want run tests on other browser,
change the values for `broswers` properties in `Gruntfile.js`.

```
karma: {
  all: {
    browsers: ['PhantomJS'],
    reporters: ['progress']
  }
}

```
You can use `Chrome`, `ChromeCanary`, `Firefox`, `Opera`, `Safari`, `PhantomJS` and `IE` beside `PhantomJS`.
Once you run `grunt test`, it will watch all javascript file. Therefore karma run tests every time you chage code.

#### start local server for developing summernote.
run local server with connect and watch.
```bash
grunt server
# Open a browser on http://localhost:3000.
# If you change source code, automatically reload your page.
```

#### Coding convention
* JSHint: http://www.jshint.com/about/
* JSHint rule: https://github.com/summernote/summernote/blob/master/.jshintrc

#### Contribution guide
* Please read [CONTRIBUTING.md](https://github.com/summernote/summernote/blob/develop/CONTRIBUTING.md) before sending pull requests.

### Contacts
* Email: susukang98@gmail.com
* Twitter: http://twitter.com/hackerwins
* Chat with us:
[![Join the chat at https://gitter.im/summernote/summernote](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/summernote/summernote?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### License
summernote may be freely distributed under the MIT license.
