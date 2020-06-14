# src 和 href 的区别是什么？

定义

href 是 Hypertext Reference 的简写，表示超文本引用，指向网络资源所在位置。

常见场景:

```html
<a href="http://www.baidu.com"></a> <link type="text/css" rel="stylesheet" href="common.css" />
```

src 是 source 的简写，目的是要把文件下载到 html 页面中去。

常见场景:

```html
<img src="img/girl.jpg"></img>
<iframe src="top.html">
<script src="show.js">
```

作用结果

1. href 用于在当前文档和引用资源之间确立联系
2. src 用于替换当前内容

浏览器解析方式

1. 当浏览器遇到 href 会并行下载资源并且不会停止对当前文档的处理。(同时也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式)
2. 当浏览器解析到 src ，会暂停其他资源的下载和处理，直到将该资源加载或执行完毕。(这也是 script 标签为什么放在底部而不是头部的原因)

# script 标签中 defer 和 async 的区别是什么？

默认情况下，脚本的下载和执行将会按照文档的先后顺序同步进行。当脚本下载和执行的时候，文档解析就会被阻塞，在脚本下载和执行完成之后文档才能往下继续进行解析。

下面是 async 和 defer 两者区别：

- 当 script 中有 defer 属性时，脚本的加载过程和文档加载是异步发生的，等到文档解析完(DOMContentLoaded 事件发生)脚本才开始执行。
- 当 script 有 async 属性时，脚本的加载过程和文档加载也是异步发生的。但脚本下载完成后会停止 HTML 解析，执行脚本，脚本解析完继续 HTML 解析。
- 当 script 同时有 async 和 defer 属性时，执行效果和 async 一致。

### docoment,window,html,body 的层级关系

**层级关系**：

```
window > document > html > body
复制代码
```

- `window`是`BOM`的核心对象，它一方面用来获取或设置浏览器的属性和行为，另一方面作为一个全局对象。
- `document`对象是一个跟文档相关的对象，拥有一些操作文档内容的功能。但是地位没有`window`高。
- `html`元素对象和`document`元素对象是属于`html`文档的`DOM`对象，可以认为就是`html`源代码中那些标签所化成的对象。他们跟`div、select`什么对象没有根本区别。

（我是这样记的，整个浏览器中最大的肯定就是窗口`window`了，那么进来的我不管你是啥，就算你是`document`也得给我盘着）

### 移动端中不同手机 html 默认的字体大小都是一样的吗

如果没有人为取改变根元素字体大小的话，默认是`1rem = 16px`；根元素默认的字体大小是`16px`。

## 说说 HTML5 在标签、属性、存储、API 上的新特性

- 标签：新增语义化标签（`aside / figure / section / header / footer / nav`等），增加多媒体标签`video`和`audio`，使得样式和结构更加分离
- 属性：增强表单，主要是增强了`input`的 type 属性；`meta`增加 charset 以设置字符集；`script`增加 async 以异步加载脚本
- 存储：增加`localStorage`、`sessionStorage`和`indexedDB`，引入了`application cache`对 web 和应用进行缓存
- API：增加`拖放API`、`地理定位`、`SVG绘图`、`canvas绘图`、`Web Worker`、`WebSocket`
