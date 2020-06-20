[TOC]

## DOM 和 BOM 有什么区别

- DOM （Document Object Model，文档对象模型）

  它是将html文档抽象成一个对象，作用是为了将web页面与JS连接起来，可以让JS去操作和修改。document是它的根本对象，它表示文档本身。

- BOM （Browser Object Model，浏览器对象模型）

  它是将浏览器窗口抽象成一个对象，作用是为了将浏览器窗口与JS连接起来，可以通过JS去操作。window是他的核心对象，它表示一个包含DOM文档的窗口。也就说window对象里面包含了DOM对象。在浏览器环境下，JS运行时默认的全局对象就是window对象。

## docoment,window,html,body 的层级关系

```reStructuredText
window > document > html > body
```

- `window`是`BOM`的核心对象，它一方面用来获取或设置浏览器的属性和行为，另一方面作为一个全局对象。
- `document`对象是一个跟文档相关的对象，拥有一些操作文档内容的功能。但是地位没有`window`高。
- `html`元素对象和`document`元素对象是属于`html`文档的`DOM`对象，可以认为就是`html`源代码中那些标签所化成的对象。他们跟`div、select`什么对象没有根本区别。

## DOCTYPE 及其作用

声明文档的类型，不再采用HTML4的标准，采用自己的一套新的HTML5标准

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

- 

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

## 输入一个 URL 到浏览器显示发生了什么

必考！

#### 网络

1. 构建请求

   构建请求行 请求方法 请求路径 协议版本 `GET / HTTP/1.1`

2. 查找强缓存

   如果强缓存直接命中则直接使用

3. DNS 解析（基于 UDP）

   由于数据包是通过 IP 地址传给对方的，所以将域名解析成 IP 地址的过程就叫 DNS 解析。域名系统 Domain Name System（DNS）

4. 建立 TCP 连接

   Chrome 在同一个域名下要求同时最多只能有 6 个 TCP 连接，超过 6 个的话剩下的请求就得等待。

   TCP 先通过三次握手确认连接，然后传输数据包，这个时候会通过数据包校验包保证到达接收方（就是接收方接收到数据包后必须要向发送方确认, 如果发送方没有接到这个确认的消息，就判定为数据包丢失，并重新发送该数据包）,然后传输完成后根据 http 请求头的 Connection: Keep-Alive 字段判断是否断开连接。

5. 发送 HTTP 请求

   浏览器发送 HTTP 请求会携带三样东西，分别是

   - 请求行 同第一步构建请求
   - 请求头
   - 请求体 在 POST 请求下存在

6. 网络响应

   响应具有三个部分，分别是

   - 响应行 HTTP 协议 状态码 状态描述 `HTTP/1.1 200 OK`
   - 响应头
   - 响应体

流程图如下

[![project](http://47.98.159.95/my_blog/week10/2.jpg)](http://47.98.159.95/my_blog/week10/2.jpg)

#### 解析算法

1. 构建 DOM 树

   DOM 树本质是一个以 document 为根节点的多叉树，此树的解析算法是需要对照上下文的，其解析分为两个阶段，分别为

   - 标记化

     输入为 HTML 文本，输出为 HTML 标记

   - 建树算法

     首先创建 document 对象，将上一步生成的标记信息创建成 DOM 对象，将其加入树中

2. 样式计算

   关于 CSS 样式来源，一般通过 link 标签引入，style 标签中的样式，元素的内嵌样式。其解析分为三个阶段，分别为

   - 格式化

     输入为 CSS 文本，输出为一个结构化的对象，即 styleSheets

   - 标准化样式

     一些 CSS 样式的数值在这个阶段被标准化，比如 red->#ff0000, bold->700

   - 计算每个节点的具体样式

     应用继承和层叠两个规则来计算每个节点的样式

     继承是每个子节点都会继承父节点的样式属性，如果父节点没找到，就会采用浏览器默认样式，即（UserAgent）样式。

     层叠性会导致最终样式取决于各个属性作用

3. 生成布局树

   通过浏览器的布局系统确定元素的位置，生成一颗布局树。具体工作流程如下：遍历生成的 DOM 树节点，并把他们添加到布局树中，计算布局树节点的坐标位置。而且这个布局树中仅包含可见元素。

[![project](http://47.98.159.95/my_blog/week10/3.jpg)](http://47.98.159.95/my_blog/week10/3.jpg)

#### 渲染过程

1. 建立图层树（Layer Tree）

   图层树会根据每个图层的层级进行创建。是有两种情况可以生成带有层级的单独图层的，分别为

   - 显式合成

     1. 拥有层叠上下文属性的元素会被提升为单独的一层。

        - HTML 根元素本身就具有层叠上下文。
        - 普通元素设置**position 不为 static**并且**设置了 z-index 属性**，会产生层叠上下文。
        - 元素的 **opacity** 值不是 1
        - 元素的 **transform** 值不是 none
        - 元素的 **filter** 值不是 none
        - 元素的 **isolation** 值是 isolate
        - **will-change**指定的属性值为上面任意一个。

     2. 需要剪裁的地方

        给裁剪文字部分单独创建一个层，而且滚动条也会单独提升为一个图层

   - 隐式合成

     就是层叠等级低的节点被提升为单独图层后，所有层叠等级比他高的节点都会成为一个单独的图层。

     合成层优化建议

     1. 动画使用 transform 实现（允许旋转，缩放，倾斜，平移）
     2. 减少隐式合成
     3. 减少合成层尺寸

2. 生成绘制列表

   将图层的绘制分成一个个绘制指令，生成待绘制列表等待绘制

3. 进行绘制 生成图块和位图

   绘制操作是有专门的线程完成的，等绘制列表完成之后，渲染进程会给合成线程发送消息，把绘制列表提交给合成线程。合成线程生成图块，并绘制视口附近图块，然后采用低分辨率首次合成优化，然后将图块交给内部的栅格化线程池，将图块转换为位图数据。

4. 显示器显示内容

   合成线程将位图数据发送给浏览器进程，浏览器将位图数据绘制到内存，然后将内存发送给显卡，由显卡提供给显示器进行显示。

[![project](http://47.98.159.95/my_blog/week10/4.jpg)](http://47.98.159.95/my_blog/week10/4.jpg)
