[TOC]

## DOM 和 BOM 有什么区别

- DOM

Document Object Model，文档对象模型

DOM 是为了操作文档出现的 API，document 是其的一个对象

DOM 和文档有关，这里的文档指的是网页，也就是 html 文档。DOM 和浏览器无关，他关注的是网页本身的内容。

- BOM

Browser Object Model，浏览器对象模型

BOM 是为了操作浏览器出现的 API，window 是其的一个对象

window 对象既为 javascript 访问浏览器提供 API，同时在 ECMAScript 中充当 Global 对象

## src 和 href 的区别是什么？

- 定义

  - href 是 Hypertext Reference 的简写，表示超文本引用，指向网络资源所在位置。

    常见场景:

    ```html
    <a href="http://www.baidu.com"></a> <link type="text/css" rel="stylesheet" href="common.css" />
    ```

  - src 是 source 的简写，目的是要把文件下载到 html 页面中去。常见场景:

    ```html
    <img src="img/girl.jpg"></img>
    <iframe src="top.html"/>
    <script src="show.js"/>
    ```

- 结果

  - href 用于在当前文档和引用资源之间确立联系
  - src 用于替换当前内容

- 浏览器解析方式
  - 当浏览器遇到 href 会并行下载资源并且不会停止对当前文档的处理。(同时也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式)
  - 当浏览器解析到 src ，会暂停其他资源的下载和处理，直到将该资源加载或执行完毕。(这也是 script 标签为什么放在底部而不是头部的原因)

## script 标签中 defer 和 async 的区别是什么？

默认情况下，脚本的下载和执行将会按照文档的先后顺序同步进行。当脚本下载和执行的时候，文档解析就会被阻塞，在脚本下载和执行完成之后文档才能往下继续进行解析。

下面是 async 和 defer 两者区别：

- 当 script 中有 defer 属性时，脚本的加载过程和文档加载是异步发生的，等到文档解析完(DOMContentLoaded 事件发生)脚本才开始执行。
- 当 script 有 async 属性时，脚本的加载过程和文档加载也是异步发生的。但脚本下载完成后会停止 HTML 解析，执行脚本，脚本解析完继续 HTML 解析。
- 当 script 同时有 async 和 defer 属性时，执行效果和 async 一致。

## docoment,window,html,body 的层级关系

```
window > document > html > body
```

- `window`是`BOM`的核心对象，它一方面用来获取或设置浏览器的属性和行为，另一方面作为一个全局对象。
- `document`对象是一个跟文档相关的对象，拥有一些操作文档内容的功能。但是地位没有`window`高。
- `html`元素对象和`document`元素对象是属于`html`文档的`DOM`对象，可以认为就是`html`源代码中那些标签所化成的对象。他们跟`div、select`什么对象没有根本区别。

## 移动端中不同手机 html 默认的字体大小都是一样的吗

如果没有人为取改变根元素字体大小的话，默认是`1rem = 16px`；根元素默认的字体大小是`16px`。

## 说说 HTML5 在标签、属性、存储、API 上的新特性

- 标签：新增语义化标签（`aside / figure / section / header / footer / nav`等），增加多媒体标签`video`和`audio`，使得样式和结构更加分离
- 属性：增强表单，主要是增强了`input`的 type 属性；`meta`增加 charset 以设置字符集；`script`增加 async 以异步加载脚本
- 存储：增加`localStorage`、`sessionStorage`和`indexedDB`，引入了`application cache`对 web 和应用进行缓存
- API：增加`拖放API`、`地理定位`、`SVG绘图`、`canvas绘图`、`Web Worker`、`WebSocket`

## JS 如何设置盒模型的宽和高

假设已经获取的节点为 `dom`

```js
//只能获取内联样式设置的宽高
dom.style.width / height;

//获取渲染后即时运行的宽高，值是准确的。但只支持 IE
dom.currentStyle.width / height;

//获取渲染后即时运行的宽高，值是准确的。兼容性更好
window.getComputedStyle(dom).width / height;

//获取渲染后即时运行的宽高，值是准确的。兼容性也很好，一般用来获取元素的绝对位置，getBoundingClientRect()会得到4个值：left, top, width, height
dom.getBoundingClientRect().width / height;
```

## DOCTYPE 及其作用

DTD (Document type definition，文档类型定义) 是一系列的语法规则，用来定义 XML 或 HTML 的文件类型。浏览器会使用它来判断文档类型，决定使用何种协议来解析，以及切换浏览器模式。 **DOCTYPE 是用来声明文档类型和 DTD 规范的**，一个主要的用途便是文件的合法性验证。如果文件代码不合法，那么浏览器解析时便会出一些差错。注意：<!DOCTYPE> 声明不区分大小写。HTML5 的文档解析不再基于 SGML(Standard Generalized Markup Language)标准，而是形成了自己的一套标准。

1. HTML5

```html
<!DOCTYPE html>
```

2. HTML 4.01 Strict

这个 DTD 包含所有 HTML 元素和属性，但不包括表象或过时的元素（如 font ）。框架集是不允许的。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

3. HTML 4.01 Frameset

这个 DTD 与 HTML 4.01 Transitional 相同，但是允许使用框架集内容。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/h>
```

## meta 标签属性有哪些？

> 简介: 常用于定义页面的说明，关键 字，最后修改日期，和其它的元数据。这些元数据将服务于浏览器（如何布局或重载页面），搜索引擎和其它网络服务。

- charset 属性

```html
<!-- 定义网页文档的字符集 -->
<meta charset="utf-8" />
```

- name + content 属性

```html
<!-- 网页作者 -->
<meta name="author" content="开源技术团队" />
<!-- 网页地址 -->
<meta name="website" content="https://sanyuan0704.github.io/frontend_daily_question/" />
<!-- 网页版权信息 -->
<meta name="copyright" content="2018-2019 demo.com" />
<!-- 网页关键字, 用于SEO -->
<meta name="keywords" content="meta,html" />
<!-- 网页描述 -->
<meta name="description" content="网页描述" />
<!-- 搜索引擎索引方式，一般为all，不用深究 -->
<meta name="robots" content="all" />
<!-- 移动端常用视口设置 -->
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=no"
/>
<!-- 
  viewport参数详解：
  width：宽度（数值 / device-width）（默认为980 像素）
  height：高度（数值 / device-height）
  initial-scale：初始的缩放比例 （范围从>0 到10）
  minimum-scale：允许用户缩放到的最小比例
  maximum-scale：允许用户缩放到的最大比例
  user-scalable：用户是否可以手动缩 (no,yes)
 -->
```

- http-equiv 属性

```html
<!-- expires指定网页的过期时间。一旦网页过期，必须从服务器上下载。 -->
<meta http-equiv="expires" content="Fri, 12 Jan 2020 18:18:18 GMT"/>
<!-- 等待一定的时间刷新或跳转到其他url。下面1表示1秒 -->
<meta http-equiv="refresh" content="1; url=https://www.baidu.com"/>
<!-- 禁止浏览器从本地缓存中读取网页，即浏览器一旦离开网页在无法连接网络的情况下就无法访问到页面。 -->
<meta http-equiv="pragma" content="no-cache"/>
<!-- 也是设置cookie的一种方式，并且可以指定过期时间 -->
<meta http-equiv="set-cookie" content="name=value expires=Fri, 12 Jan 2001 18:18:18 GMT,path=/"/>
<!-- 使用浏览器版本 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- 针对WebApp全屏模式，隐藏状态栏/设置状态栏颜色，content的值为default | black | black-translucent -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-transl
```

## HTML5 语义化有什么作用

什么是语义化？就是用合理、正确的标签来展示内容，比如 h1~h6 定义标题。

- 易于用户阅读，样式丢失的时候能让页面呈现清晰的结构。
- 有利于 SEO，搜索引擎根据标签来确定上下文和各个关键字的权重。
- 有利于开发和维护，语义化更具可读性，代码更好维护。

## 什么是渐进式渲染（progressive rendering）？

渐进式渲染是用于提高网页性能（尤其是提高用户感知的加载速度），以尽快呈现页面的技术。

在以前互联网带宽较小的时期，这种技术更为普遍。如今，移动终端的盛行，而移动网络往往不稳定，渐进式渲染在现代前端开发中仍然有用武之地。

一些举例：

- 图片懒加载——页面上的图片不会一次性全部加载。当用户滚动页面到图片部分时，JavaScript 将加载并显示图像。
- 确定显示内容的优先级（分层次渲染）——为了尽快将页面呈现给用户，页面只包含基本的最少量的 CSS、脚本和内容，然后可以使用延迟加载脚本或监听`DOMContentLoaded`/`load`事件加载其他资源和内容。
- 异步加载 HTML 片段——当页面通过后台渲染时，把 HTML 拆分，通过异步请求，分块发送给浏览器。更多相关细节可以在[这里](https://link.zhihu.com/?target=http%3A//www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/)找到。

## viewport

Viewport ：字面意思为视图窗口，在移动 web 开发中使用。表示将设备浏览器宽度虚拟成一个特定的值（或计算得出），这样利于移动 web 站点跨设备显示效果基本一致。移动版的 Safari 浏览器最新引进了 viewport 这个 meta tag，让网页开发者来控制 viewport 的大小和缩放，其他手机浏览器也基本支持。

在移动端浏览器当中，存在着两种视口，一种是可见视口（也就是我们说的设备大小），另一种是视窗视口（网页的宽度是多少）。 举个例子：如果我们的屏幕是 320 像素 \* 480 像素的大小（iPhone4），假设在浏览器中，320 像素的屏幕宽度能够展示 980 像素宽度的内容。那么 320 像素的宽度就是可见视口的宽度，而能够显示的 980 像素的宽度就是视窗视口的宽度。

为了显示更多的内容，大多数的浏览器会把自己的视窗视口扩大，简易的理解，就是让原本 320 像素的屏幕宽度能够容下 980 像素甚至更宽的内容（将网页等比例缩小）。

- width 设置 layout viewport 的宽度，为一个正整数，或字符串"width-device"
- initial-scale 设置页面的初始缩放值，为一个数字，可以带小数
- minimum-scale 允许用户的最小缩放值，为一个数字，可以带小数
- maximum-scale 允许用户的最大缩放值，为一个数字，可以带小数
- height 设置 layout viewport 的高度，这个属性对我们并不重要，很少使用
- user-scalable 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes 代表允许这些属性可以同时使用，也可以单独使用或混合使用，多个属性同时使用时用逗号隔开就行了。

## img 中的 alt 和元素的 title 属性作用

- img 的 alt 属性如果无法显示图像，浏览器将显示 alt 指定的内容
- 元素 title 属性在鼠标移到元素上时显示 title 的内容

## 行内元素和块级元素有哪些

- 行内元素

一个行内元素只占据它对应标签的边框所包含的空间一般情况下，行内元素只能包含数据和其他行内元素

```html
b, big, i, small, tt abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var a, bdo, br, img,
map, object, q, script, span, sub, sup button, input, label, select, textarea
```

- 块级元素

占据一整行，高度、行高、内边距和外边距都可以改变，可以容纳块级标签和其他行内标签

```html
header,form,ul,ol,table,article,div,hr,aside,figure,canvas,video,audio,footer
```

## iframe 有那些优缺点

- 优点：

  1. iframe 能够原封不动的把嵌入的网页展现出来。

  2. 如果有多个网页引用 iframe，那么你只需要修改 iframe 的内容，就可以实现调用的每一个页面内容的更改，方便快捷。
  3. 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用 iframe 来嵌套，可以增加代码的可重用。

  4. 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由 iframe 来解决。

* 缺点：

  1. 搜索引擎的爬虫程序无法解读这种页面

  2. 框架结构中出现各种滚动条

  3. 使用框架结构时，保证设置正确的导航链接。

  4. iframe 页面会增加服务器的 http 请求
  5. 创建比一般的 DOM 元素慢了 1-2 个数量级
  6. iframe 标签会阻塞页面的的加载

## label 标签有什么作用

`label` 标签通常是写在表单内，它关联一个控件，使用 `label` 可以实现点击文字选取对应的控件。

```html
<input type="checkbox" id="test" /> <label for="test">test</label>
```

## HTML5 的 form 如何关闭自动完成功能

将不想要自动完成的 `form` 或 `input` 设置为 `autocomplete=off`
