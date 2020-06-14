# 第 52 题：怎么让一个 div 水平垂直居中

```
<div class="parent">
  <div class="child"></div>
</div>
```

1. flex 布局

```css
div.parent {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

2. grid 布局

```css
div.parent {
  display: grid;
}
div.child {
  align-self: center;
  justify-self: center;
}
```

3. absolute 布局

```css
div.parent {
  position: relative;
}
div.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

```css
/* 或者 */
div.child {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 10px;
  margin-top: -5px;
  margin-left: -25px;
}
```

```css
/* 或 */
div.child {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 10px;
  margin: auto;
}
```

```css
div.parent {
  font-size: 0;
  text-align: center;
  &::before {
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
    content: '';
  }
}
div.child {
  display: inline-block;
  vertical-align: middle;
}
```

# 第 57 题：分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

结构： display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击， visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击 opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

继承： display: none 和 opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。 visibility: hidden：是继承属性，子孙节点消失由于继承了 hidden，通过设置 visibility: visible;可以让子孙节点显式。

性能： displaynone : 修改元素会造成文档回流,读屏器不会读取 display: none 元素内容，性能消耗较大 visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取 visibility: hidden 元素内容 opacity: 0 ： 修改元素会造成重绘，性能消耗较少

联系：它们都能让元素不可见

# 第 39 题：介绍下 BFC 及其应用

BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。创建 BFC 的方式有：

1. html 根元素
2. float 浮动
3. 绝对定位
4. overflow 不为 visiable
5. display 为表格布局或者弹性布局

BFC 主要的作用是：

1. 清除浮动
2. 防止同一 BFC 容器中的相邻元素间的外边距重叠问题

BFC 特性：

1. 内部 box 会在垂直方向，一个接一个地放置。
2. Box 垂直方向的距离由 margin 决定，在一个 BFC 中，两个相邻的块级盒子的垂直外边距会产生折叠。
3. 在 BFC 中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘）
4. 形成了 BFC 的区域不会与 float box 重叠
5. 计算 BFC 高度时，浮动元素也参与计算

生成 BFC 除了 [@webproblem](https://github.com/webproblem) 童鞋所说的还有：行内块元素、网格布局、contain 值为 layout、content 或 strict 的元素等。更多生成 BFC 的方法：[传送门](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

BFC 作用：

1. 利用特性 4 可实现左图右文之类的效果：

```html
<img src="image.png" />
<p>我是超长的文字</p>
<p>
  img { float:left } p { overflow:hidden }
</p>
```

1. 利用特性 5 可以解决浮动元素造成的父元素高度塌陷问题：

```html
<div class="parent">
  <div class="float">浮动元素</div>
</div>
.parent { overflow:hidden; } .float { float:left; }
```

# CSS 相关

### 三栏布局

题目：假设高度已知，请写出三栏布局，其中左栏、右栏宽度各为 300px，中间自适应。解答：可以有很多种布局方式，这里列出五种：float 布局，absolute 布局，flex 布局，table 布局，grid 布局，代码如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>三栏布局</title>
    <link rel="stylesheet" href="" />
    <style type="text/css" media="screen">
      html * {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <section class="layout float">
      <style type="text/css">
        .layout.float .wrapper > div {
          min-height: 100px;
        }
        .layout.float .left {
          float: left;
          width: 300px;
          background: red;
        }
        .layout.float .center {
          background: yellow;
        }
        .layout.float .right {
          float: right;
          width: 300px;
          background: blue;
        }
      </style>
      <article class="wrapper">
        <div class="left"></div>
        <div class="right"></div>
        <div class="center">
          <h1>float布局</h1>
          1.我是float布局的中间部分 2.我是float布局的中间部分
        </div>
      </article>
    </section>

    <section class="layout absolute">
      <style type="text/css">
        .layout.absolute .wrapper {
          width: 100%;
          margin-top: 20px;
        }
        .layout.absolute .wrapper > div {
          min-height: 100px;
        }
        .layout.absolute .left {
          position: absolute;
          left: 0;
          width: 300px;
          background: red;
        }
        .layout.absolute .center {
          position: absolute;
          right: 300px;
          left: 300px;
          background: yellow;
        }
        .layout.absolute .right {
          position: absolute;
          right: 0;
          width: 300px;
          background: blue;
        }
      </style>
      <article class="wrapper">
        <div class="left"></div>
        <div class="center">
          <h1>absolute布局</h1>
          1.我是absolute布局的中间部分 2.我是absolute布局的中间部分
        </div>
        <div class="right"></div>
      </article>
    </section>

    <section class="layout flex">
      <style type="text/css" media="screen">
        .layout.flex .wrapper {
          display: flex;
          width: 100%;
          min-height: 100px;
          margin-top: 140px;
        }
        .layout.flex .left {
          width: 300px;
          background: red;
        }
        .layout.flex .center {
          flex: 1;
          background: yellow;
        }
        .layout.flex .right {
          width: 300px;
          background: blue;
        }
      </style>
      <article class="wrapper">
        <div class="left"></div>
        <div class="center">
          <h1>flex布局</h1>
          1.我是flex布局的中间部分 2.我是flex布局的中间部分
        </div>
        <div class="right"></div>
      </article>
    </section>

    <section class="layout table">
      <style type="text/css" media="screen">
        .layout.table .wrapper {
          display: table;
          width: 100%;
          min-height: 100px;
          margin-top: 20px;
        }
        .layout.table .left {
          display: table-cell;
          width: 300px;
          background: red;
        }
        .layout.table .center {
          display: table-cell;
          background: yellow;
        }
        .layout.table .right {
          display: table-cell;
          width: 300px;
          background: blue;
        }
      </style>
      <article class="wrapper">
        <div class="left"></div>
        <div class="center">
          <h1>table布局</h1>
          1.我是table布局的中间部分 2.我是table布局的中间部分
        </div>
        <div class="right"></div>
      </article>
    </section>

    <section class="layout grid">
      <style type="text/css" media="screen">
        .layout.grid .wrapper {
          display: grid;
          grid-template-rows: 100px;
          grid-template-columns: 300px auto 300px;
          width: 100%;
          margin-top: 20px;
        }
        .layout.grid .left {
          background: red;
        }
        .layout.grid .center {
          background: yellow;
        }
        .layout.grid .right {
          background: blue;
        }
      </style>
      <article class="wrapper">
        <div class="left"></div>
        <div class="center">
          <h1>grid布局</h1>
          1.我是grid布局的中间部分 2.我是grid布局的中间部分
        </div>
        <div class="right"></div>
      </article>
    </section>
  </body>
</html>
```

# 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。

- display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击。是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。修改元素会造成文档回流，性能消耗较大。
- visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击。是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。修改元素只会造成本元素的重绘,性能消耗较少。
- opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击。是继承属性，子孙节点消失由于继承了 hidden，通过设置 visibility: visible;可以让子孙节点显式。修改元素会造成重绘，性能消耗较少

# 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。

> <img src="1.jpg" style="width:480px !important;">

1. `<img src="1.jpg" style="width:480px !important; max-width: 300px">`
2. `<img src="1.jpg" style="width:480px !important; transform: scale(0.625, 1);" >`
3. `<img src="1.jpg" style="width:480px !important; width:300px !important;">`

# 如何用 css 或 js 实现多行文本溢出省略效果，考虑兼容性

```css
/* 单行： */
.single-line {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 多行： */

.multi-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

/* 兼容： */
p {
  position: relative;
  max-height: 40px;
  overflow: hidden;
  line-height: 20px;
}

p::after {
  position: absolute;
  right: 0;
  bottom: 0;
  padding-left: 40px;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
  content: '...';
}
```

# 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化

#### 1. 浏览器渲染机制

- 浏览器采用流式布局模型（`Flow Based Layout`）
- 浏览器会把`HTML`解析成`DOM`，把`CSS`解析成`CSSOM`，`DOM`和`CSSOM`合并就产生了渲染树（`Render Tree`）。
- 有了`RenderTree`，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。
- 由于浏览器使用流式布局，对`Render Tree`的计算通常只需要遍历一次就可以完成，**但`table`及其内部元素除外，他们可能需要多次计算，通常要花 3 倍于同等元素的时间，这也是为什么要避免使用`table`布局的原因之一**。

#### 2. 重绘

由于节点的几何属性发生改变或者由于样式发生改变而不会影响布局的，称为重绘，例如`outline`, `visibility`, `color`、`background-color`等，重绘的代价是高昂的，因为浏览器必须验证 DOM 树上其他节点元素的可见性。

#### 3. 回流

回流是布局或者几何属性需要改变就称为回流。回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的回流可能会导致了其所有子元素以及 DOM 中紧随其后的节点、祖先节点元素的随后的回流。

```
<body>
<div class="error">
    <h4>我的组件</h4>
    <p><strong>错误：</strong>错误的描述…</p>
    <h5>错误纠正</h5>
    <ol>
        <li>第一步</li>
        <li>第二步</li>
    </ol>
</div>
</body>
```

在上面的 HTML 片段中，对该段落(`<p>`标签)回流将会引发强烈的回流，因为它是一个子节点。这也导致了祖先的回流（`div.error`和`body` – 视浏览器而定）。此外，`<h5>`和`<ol>`也会有简单的回流，因为其在 DOM 中在回流元素之后。**大部分的回流将导致页面的重新渲染。**

**回流必定会发生重绘，重绘不一定会引发回流。**

#### 4. 浏览器优化

现代浏览器大多都是通过队列机制来批量更新布局，浏览器会把修改操作放在队列中，至少一个浏览器刷新（即 16.6ms）才会清空队列，但当你**获取布局信息的时候，队列中可能有会影响这些属性或方法返回值的操作，即使没有，浏览器也会强制清空队列，触发回流与重绘来确保返回正确的值**。

主要包括以下属性或方法：

- `offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`
- `scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`
- `clientTop`、`clientLeft`、`clientWidth`、`clientHeight`
- `width`、`height`
- `getComputedStyle()`
- `getBoundingClientRect()`

所以，我们应该避免频繁的使用上述的属性，他们都会强制渲染刷新队列。

#### 5. 减少重绘与回流

1. CSS

   - **使用 `transform` 替代 `top`**

   - **使用 `visibility` 替换 `display: none`** ，因为前者只会引起重绘，后者会引发回流（改变了布局

   - **避免使用`table`布局**，可能很小的一个小改动会造成整个 `table` 的重新布局。

   - **尽可能在`DOM`树的最末端改变`class`**，回流是不可避免的，但可以减少其影响。尽可能在 DOM 树的最末端改变 class，可以限制了回流的范围，使其影响尽可能少的节点。

   - **避免设置多层内联样式**，CSS 选择符**从右往左**匹配查找，避免节点层级过多。

     ```
     <div>
       <a> <span></span> </a>
     </div>
     <style>
       span {
         color: red;
       }
       div > a > span {
         color: red;
       }
     </style>
     ```

     对于第一种设置样式的方式来说，浏览器只需要找到页面中所有的 `span` 标签然后设置颜色，但是对于第二种设置样式的方式来说，浏览器首先需要找到所有的 `span` 标签，然后找到 `span` 标签上的 `a` 标签，最后再去找到 `div` 标签，然后给符合这种条件的 `span` 标签设置颜色，这样的递归过程就很复杂。所以我们应该尽可能的避免写**过于具体**的 CSS 选择器，然后对于 HTML 来说也尽量少的添加无意义标签，保证**层级扁平**。

   - **将动画效果应用到`position`属性为`absolute`或`fixed`的元素上**，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 `requestAnimationFrame`，详见[探讨 requestAnimationFrame](https://github.com/LuNaHaiJiao/blog/issues/30)。

   - **避免使用`CSS`表达式**，可能会引发回流。

   - **将频繁重绘或者回流的节点设置为图层**，图层能够阻止该节点的渲染行为影响别的节点，例如`will-change`、`video`、`iframe`等标签，浏览器会自动将该节点变为图层。

   - **CSS3 硬件加速（GPU 加速）**，使用 css3 硬件加速，可以让`transform`、`opacity`、`filters`这些动画不会引起回流重绘 。但是对于动画的其它属性，比如`background-color`这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

2. JavaScript

   - **避免频繁操作样式**，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性更改`class`属性。
   - **避免频繁操作`DOM`**，创建一个`documentFragment`，在它上面应用所有`DOM操作`，最后再把它添加到文档中。
   - **避免频繁读取会引发回流/重绘的属性**，如果确实需要多次使用，就用一个变量缓存起来。
   - **对具有复杂动画的元素使用绝对定位**，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

## css 选择器优先级

**!important > 行内样式>ID 选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性**

### 伪类和伪元素的区别

伪类和伪元素是用来修饰不在文档树中的部分，比如，一句话中的第一个字母，或者是列表中的第一个元素。下面分别对伪类和伪元素进行解释：

伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover 来描述这个元素的状态。虽然它和普通的 css 类相似，可以为已有的元素添加样式，但是它只有处于 dom 树无法描述的状态下才能为元素添加样式，所以将其称为伪类。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过:before 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

#### 区别

伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档树外的元素。因此，伪类与伪元素的区别在于：**有没有创建一个文档树之外的元素。**

CSS3 规范中的要求使用双冒号(::)表示伪元素，以此来区分伪元素和伪类，比如::before 和::after 等伪元素使用双冒号(::)，:hover 和:active 等伪类使用单冒号(:)。除了一些低于 IE8 版本的浏览器外，大部分浏览器都支持伪元素的双冒号(::)表示方法。

### 说说 z-index 有什么需要注意的地方

可能面试官最想知道的是下面这张图：

![enter image description here](https://user-gold-cdn.xitu.io/2019/8/30/16ce245b90085292?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

这里附上张鑫旭的文章[深入理解 CSS 中的层叠上下文和层叠顺序](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)。

面试官追问固定定位的元素是相对于什么进行定位？相对定位会脱离正常文档流么？绝对定位是相对于什么元素进行定位？

### relative 的定位规则

- 相对于该元素在文档中的初始位置进行定位。通过 “left”、”top”、”right” 以及 “bottom” 属性来设置此元素相对于自身位置的偏移。
- 如果他原来在常规流的默认位置改变了，那他也会跟着变位置，永远围着整个 body 自己原来的那一小块老地方转。所以说相对定位没有脱离文档流。

### 脱离文档流是会呈现什么样的效果呢？

脱离文档流，也就是**将元素从普通的布局排版中拿走**，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位。

而在`CSS`中，使用`float`和设置`position:absolute`都会使得元素脱离文档流。只不过它两的区别是：

使用`float`脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。而对于使用`position:absolute`脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。

### 常规流(文档流)是个怎样的排列关系

将窗体自上而下分成一行一行,并在每行中按从左至右的挨次排放元素。

### inline-block 的使用场景

1. 要设置某些子元素在一行或者多行内显示，尤其是排列方向一致的情况下，应尽量用`inline-block`。
2. 希望若干个元素平行排列，且在父元素中居中排列，此时可以用`inline-block`，且给父元素设`text-align: center`。
3. `inline-block`可以用一排`a {display: inline-block}`实现横向导航栏，无论是居左的导航栏还是居右的都适用。

对于第一种和第三种情况虽然都可以使用`float`来实现，不过`inline-block`会比它好一些，原因如下：

- 浮动导致父元素高度塌陷的问题

### DIV+CSS 布局的好处

1. 代码精简，且结构与样式分离，易于维护
2. 代码量减少了，减少了大量的带宽，页面加载的也更快，提升了用户的体验
3. 对 SEO 搜索引擎更加友好，且 H5 又新增了许多语义化标签更是如此
4. 允许更多炫酷的页面效果，丰富了页面
5. 符合 W3C 标准，保证网站不会因为网络应用的升级而被淘汰

缺点: 不同浏览器对 web 标准默认值不同，所以更容易出现对浏览器的兼容性问题。

### 如何解决 a 标点击后 hover 事件失效的问题?

改变 a 标签 css 属性的排列顺序

只需要记住`LoVe HAte`原则就可以了：

```
link→visited→hover→active
```

比如下面错误的代码顺序：

```
a:hover{
  color: green;
  text-decoration: none;
}
a:visited{ /* visited在hover后面，这样的话hover事件就失效了 */
  color: red;
  text-decoration: none;
}
```

正确的做法是将两个事件的位置调整一下。

注意 ⚠️ 各个阶段的含义：

`a:link`：未访问时的样式，一般省略成 a `a:visited`：已经访问后的样式 `a:hover`：鼠标移上去时的样式 `a:active`：鼠标按下时的样式

### rem 和 em 的区别

**em:**

定义字体大小时以父级的字体大小为基准；定义长度单位时以当前字体大小为基准。例父级`font-size: 14px`，则子级`font-size: 1em;`为`font-size: 14px;`；若定义长度时，子级的字体大小如果为`14px`，则子级`width: 2em;`为`width: 24px`。

**rem:**

以根元素的字体大小为基准。例如`html`的`font-size: 14px`，则子级`1rem = 14px`。

### animation 介绍一下

语法：

```text
animation: name duration timing-function delay iteration-count direction;
```

| 值 | 描述 |
| :-- | :-- |
| _[animation-name](https://www.w3school.com.cn/cssref/pr_animation-name.asp)_ | 规定需要绑定到选择器的 keyframe 名称。(mymove) |
| _[animation-duration](https://www.w3school.com.cn/cssref/pr_animation-duration.asp)_ | 规定完成动画所花费的时间，以秒或毫秒计。(2s) |
| _[animation-timing-function](https://www.w3school.com.cn/cssref/pr_animation-timing-function.asp)_ | 规定动画的速度曲线。(ease\|linear\|ease-in\|cubic-bezier(n,n,n,n)) |
| _[animation-delay](https://www.w3school.com.cn/cssref/pr_animation-delay.asp)_ | 规定在动画开始之前的延迟。(2s) |
| _[animation-iteration-count](https://www.w3school.com.cn/cssref/pr_animation-iteration-count.asp)_ | 规定动画应该播放的次数。(n \| infinite) n 次/无限 |
| _[animation-direction](https://www.w3school.com.cn/cssref/pr_animation-direction.asp)_ | 规定是否应该轮流反向播放动画。(normal \| alternate) 正常/反向 |

### animation 有一个 steps()功能符知道吗？

一句话介绍：`steps()`功能符可以让动画不连续。

地位和作用：和贝塞尔曲线(`cubic-bezier()`修饰符)一样，都可以作为`animation`的第三个属性值。

和贝塞尔曲线的区别：贝塞尔曲线像是滑梯且有 4 个关键字(参数)，而`steps`像是楼梯坡道且只有`number`和`position`两个关键字。

语法：

```
steps(number, position)
复制代码
```

- number: 数值，表示把动画分成了多少段

- position: 表示动画是从时间段的开头连续还是末尾连续。支持

  ```
  start
  ```

  和

  ```
  end
  ```

  两个关键字，含义分别如下：

  - `start`：表示直接开始。
  - `end`：表示戛然而止。是默认值。

具体可以看这里：[www.zhangxinxu.com/wordpress/2…](https://www.zhangxinxu.com/wordpress/2018/06/css3-animation-steps-step-start-end/)

## 什么是 GPU 加速，如何使用 GPU 加速，GPU 加速的缺点

- **优点**：使用 transform、opacity、filters 等属性时，会直接在 GPU 中完成处理，这些属性的变化不会引起回流重绘
- **缺点**：GPU 渲染字体会导致字体模糊，过多的 GPU 处理会导致内存问题

## 介绍一下 flex 布局

其实我本来还写了一节水平/垂直居中相关的，不过感觉内容过于基础还占长篇幅，所以删去了，作为一篇总结性的文章，这一小节也不应该从“flex 是什么”开始讲，主轴、侧轴这些概念相信用过 flex 布局都知道，所以我们直接 flex 的几个属性讲起：

> 容器属性（使用在 flex 布局容器上的属性）

- justify-content **定义了子元素在主轴(横轴)上的对齐方式**

```css
.container {
  justify-content: center | flex-start | flex-end | space-between | space-around;

  /* 主轴对齐方式：居中 | 左对齐(默认值) | 右对齐 | 两端对齐(子元素间边距相等) | 周围对齐(每个子元素两侧margin相等） */
}
```

- align-items **定义了定义项目在交叉轴(竖轴)上对齐方式**

```css
.container {
  align-items: center | flex-start | flex-end | baseline | stretch;

  /* 侧轴对齐方式：居中 | 上对齐 | 下对齐 | 项目的第一行文字的基线对齐 | 如果子元素未设置高度，将占满整个容器的高度（默认值） */
}
```

- flex-directionc **主轴(横轴)方向**

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;

  /* 主轴方向：水平由左至右排列（默认值） | 水平由右向左 | 垂直由上至下 | 垂直由下至上 */
}
```

- flex-wrap **换行方式**

```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;

  /* 换行方式：不换行（默认值） | 换行 | 反向换行 */
}
```

- flex-flow **flex-flow 属性是 flex-direction 属性和 flex-wrap 的简写**

```css
.container {
  flex-flow: <flex-direction> || <flex-wrap>;

  /* 默认值：row nowrap */
}
```

- align-content **定义多根轴线的对齐方式**

```css
.container {
  align-content: center | flex-start | flex-end | space-between | space-around | stretch;

  /* 默认值：与交叉轴的中点对齐 | 与交叉轴的起点对齐 | 与交叉轴的终点对齐 | 与交叉轴两端对齐 | 每根轴线两侧的间隔都相等 | （默认值）：轴线占满整个交叉轴 */
}
```

> 项目属性（使用在容器内子元素上的属性）

- flex-grow **定义项目的放大比例，默认为 0，即使有剩余空间也不放大**。如果所有子元素 flex-grow 为 1，那么将等分剩余空间，如果某个子元素 flex-grow 为 2，那么这个子元素将占据 2 倍的剩余空间

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

- flex-shrink **定义项目的缩小比例，默认为 1，即如果空间不足，子元素将缩小**。如果所有子元素`flex-shrink`都为 1，某个子元素`flex-shrink`为 0，那么该子元素将不缩小

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

- flex-basis **定义在分配多余空间之前，项目占据的主轴空间**，默认 auto，即子元素本来的大小，如果设定为一个固定的值，那么子元素将占据固定空间

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

- flex **flex 属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为 0 1 auto，即有剩余空间不放大，剩余空间不够将缩小，子元素占据自身大小**

```css
.item {
  flex: none | [ < 'flex-grow' > < 'flex-shrink' >? || < 'flex-basis' > ];
}
```

flex 有两个快捷值：`auto`和`none`，分别代表`1 1 auto`（有剩余空间则平均分配，空间不够将等比缩小，子元素占据空间等于自身大小）和`0 0 auto`（有剩余空间也不分配，空间不够也不缩小，子元素占据空间等于自身大小）

- order **定义项目的排列顺序。数值越小，排列越靠前，默认为 0**

```css
.item {
  order: <integer>;
}
```

- align-self **定义单个子元素的排列方式**，例如 align-items 设置了 center，使得所有子元素居中对齐，那么可以通过给某个子元素设置 align-self 来单独设置子元素的排序方式

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
