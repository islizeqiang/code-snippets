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

### CSS 盒模型

CSS 盒模型是前端的基石，这个问题由浅入深，由易到难，可以依次问出下面几个问题

- 基本概念：标准模型 + IE 模型
- 标准模型 和 IE 模型的区别
- CSS 如何设置这两种模型
- JS 如何设置和获取盒模型对应的宽和高
- 实例题（根据盒模型解释边距重叠）
- BFC（边距重叠解决方案）

1、基本概念所有 HTML 元素可以看作盒子，在 CSS 中，"box model"这一术语是用来设计和布局时使用。 CSS 盒模型本质上是一个盒子，封装周围的 HTML 元素，它包括：边距，边框，填充，和实际内容。盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。下面的图片说明了盒子模型(Box Model)：

2、标准模型与 IE 模型的区别标准模型与 IE 模型的区别在于宽高的计算方式不同。标准模型计算元素的宽高只算 content 的宽高，IE 模型是 content + padding + border 的总尺寸。假如 content 宽高是 100*100px，padding 为 10px，border 为 10px，margin 为 10px，那么在标准模型下，这个元素的宽为 100px，高为 100px。* *IE 模型下，宽为 100px + 2*10px(左右 padding) + 2*10px(左右 border) = 140px;* *高为 100px + 2*10px(上下 padding) + 2\*10px(上下 border) = 140px;

3、如何设置这两种模型

```css
/* 设置标准模型 */
box-sizing: content-box;

/* 设置IE模型 */
box-sizing: border-box;
```

box-sizing 的默认值是 content-box，即默认标准模型

### 重置（resetting）CSS 和 标准化（normalizing）CSS 的区别是什么？你会选择哪种方式，为什么？

- **重置（Resetting）**： 重置意味着除去所有的浏览器默认样式。对于页面所有的元素，像`margin`、`padding`、`font-size`这些样式全部置成一样。你将必须重新定义各种元素的样式。
- **标准化（Normalizing）**： 标准化没有去掉所有的默认样式，而是保留了有用的一部分，同时还纠正了一些常见错误。

当需要实现非常个性化的网页设计时，我会选择重置的方式，因为我要写很多自定义的样式以满足设计需求，这时候就不再需要标准化的默认样式了。

### 请阐述`Float`定位的工作原理。需要重点看下

浮动（float）是 CSS 定位属性。浮动元素从网页的正常流动中移出，但是保持了部分的流动性，会影响其他元素的定位（比如文字会围绕着浮动元素）。这一点与绝对定位不同，绝对定位的元素完全从文档流中脱离。

CSS 的`clear`属性通过使用`left`、`right`、`both`，让该元素向下移动（清除浮动）到浮动元素下面。

如果父元素只包含浮动元素，那么该父元素的高度将塌缩为 0。我们可以通过清除（clear）从浮动元素后到父元素关闭前之间的浮动来修复这个问题。

有一种 hack 的方法，是自定义一个`.clearfix`类，利用伪元素选择器`::after`清除浮动。[另外还有一些方法](https://link.zhihu.com/?target=https%3A//css-tricks.com/all-about-floats/%23article-header-id-4)，比如添加空的``和设置浮动元素父元素的`overflow`属性。与这些方法不同的是，`clearfix`方法，只需要给父元素添加一个类，定义如下：

```css
.clearfix::after {
  display: block;
  clear: both;
  content: '';
}
```

值得一提的是，把父元素属性设置为`overflow: auto`或`overflow: hidden`，会使其内部的子元素形成块格式化上下文（Block Formatting Context），并且父元素会扩张自己，使其能够包围它的子元素。

### 请阐述`z-index`属性，并说明如何形成层叠上下文（stacking context）。

CSS 中的`z-index`属性控制重叠元素的垂直叠加顺序。`z-index`只能影响`position`值不是`static`的元素。

没有定义`z-index`的值时，元素按照它们出现在 DOM 中的顺序堆叠（层级越低，出现位置越靠上）。非静态定位的元素（及其子元素）将始终覆盖静态定位（static）的元素，而不管 HTML 层次结构如何。

层叠上下文是包含一组图层的元素。 在一组层叠上下文中，其子元素的`z-index`值是相对于该父元素而不是 document root 设置的。每个层叠上下文完全独立于它的兄弟元素。如果元素 B 位于元素 A 之上，则即使元素 A 的子元素 C 具有比元素 B 更高的`z-index`值，元素 C 也永远不会在元素 B 之上.

每个层叠上下文是自包含的：当元素的内容发生层叠后，整个该元素将会在父层叠上下文中按顺序进行层叠。少数 CSS 属性会触发一个新的层叠上下文，例如`opacity`小于 1，`filter`不是`none`，`transform`不是`none`。

### 请阐述块格式化上下文（Block Formatting Context）及其工作原理。

块格式上下文（BFC）是 Web 页面的可视化 CSS 渲染的部分，是块级盒布局发生的区域，也是浮动元素与其他元素交互的区域。

一个 HTML 盒（Box）满足以下任意一条，会创建块格式化上下文：

- `float`的值不是`none`.
- `position`的值不是`static`或`relative`.
- `display`的值是`table-cell`、`table-caption`、`inline-block`、`flex`、或`inline-flex`。
- `overflow`的值不是`visible`。

在 BFC 中，每个盒的左外边缘都与其包含的块的左边缘相接。

两个相邻的块级盒在垂直方向上的边距会发生合并（collapse）。更多内容请参考[边距合并（margin collapsing）](https://link.zhihu.com/?target=https%3A//www.sitepoint.com/web-foundations/collapsing-margins/)。

### 参考

- [https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)

### 有哪些清除浮动的技术，都适用哪些情况？

- 空`div`方法：``。
- Clearfix 方法：上文使用`.clearfix`类已经提到。
- `overflow: auto`或`overflow: hidden`方法：上文已经提到。

在大型项目中，我会使用 Clearfix 方法，在需要的地方使用`.clearfix`。设置`overflow: hidden`的方法可能使其子元素显示不完整，当子元素的高度大于父元素时。

### 请解释什么是雪碧图（css sprites），以及如何实现？

雪碧图是把多张图片整合到一张上的图片。它被运用在众多使用了很多小图标的网站上（Gmail 在使用）。实现方法：

1. 使用生成器将多张图片打包成一张雪碧图，并为其生成合适的 CSS。
2. 每张图片都有相应的 CSS 类，该类定义了`background-image`、`background-position`和`background-size`属性。
3. 使用图片时，将相应的类添加到你的元素中。

好处：

- 减少加载多张图片的 HTTP 请求数（一张雪碧图只需要一个请求）。但是对于 HTTP2 而言，加载多张图片不再是问题。
- 提前加载资源，防止在需要时才在开始下载引发的问题，比如只出现在`:hover`伪类中的图片，不会出现闪烁。

### 参考

- [https://css-tricks.com/css-sprites/](https://link.zhihu.com/?target=https%3A//css-tricks.com/css-sprites/)

### 如何解决不同浏览器的样式兼容性问题？

- 在确定问题原因和有问题的浏览器后，使用单独的样式表，仅供出现问题的浏览器加载。这种方法需要使用服务器端渲染。
- 使用已经处理好此类问题的库，比如 Bootstrap。
- 使用 `autoprefixer` 自动生成 CSS 属性前缀。
- 使用 Reset CSS 或 Normalize.css。

### 如何为功能受限的浏览器提供页面？ 使用什么样的技术和流程？

- 优雅的降级：为现代浏览器构建应用，同时确保它在旧版浏览器中正常运行。
- Progressive enhancement - The practice of building an application for a base level of user experience, but adding functional enhancements when a browser supports it.
- 渐进式增强：构建基于用户体验的应用，但在浏览器支持时添加新增功能。
- 利用 [caniuse.com](https://link.zhihu.com/?target=https%3A//caniuse.com/) 检查特性支持。
- 使用 `autoprefixer` 自动生成 CSS 属性前缀。
- 使用 [Modernizr](https://link.zhihu.com/?target=https%3A//modernizr.com/)进行特性检测

### 有什么不同的方式可以隐藏内容（使其仅适用于屏幕阅读器）？

这些方法与可访问性（a11y）有关。

- `visibility: hidden`：元素仍然在页面流中，并占用空间。
- `width: 0; height: 0`：使元素不占用屏幕上的任何空间，导致不显示它。
- `position: absolute; left: -99999px`： 将它置于屏幕之外。
- `text-indent: -9999px`：这只适用于`block`元素中的文本。
- Metadata： 例如通过使用 [http://Schema.org](https://link.zhihu.com/?target=http%3A//Schema.org)，RDF 和 JSON-LD。
- WAI-ARIA：如何增加网页可访问性的 W3C 技术规范。

即使 WAI-ARIA 是理想的解决方案，我也会采用绝对定位方法，因为它具有最少的注意事项，适用于大多数元素，而且使用起来非常简单。

### 参考

- [https://www.w3.org/TR/wai-aria-1.1/](https://link.zhihu.com/?target=https%3A//www.w3.org/TR/wai-aria-1.1/)
- [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [http://a11yproject.com/](https://link.zhihu.com/?target=http%3A//a11yproject.com/)

### 除了`screen`，你还能说出一个 @media 属性的例子吗？

- all 适用于所有设备。
- print 为了加载合适的文档到当前使用的可视窗口. 需要提前咨询 paged media（媒体屏幕尺寸）, 以满足个别设备网页尺寸不匹配等问题。
- screen 主要适用于彩色的电脑屏幕
- speech 解析 speech 这个合成器. 注意: CSS2 已经有一个相似的媒体类型叫 aural

[https://developer.mozilla.org/z](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/CSS/%40media)

### 编写高效的 CSS 应该注意什么？

首先，浏览器从最右边的选择器，即关键选择器（key selector），向左依次匹配。根据关键选择器，浏览器从 DOM 中筛选出元素，然后向上遍历被选元素的父元素，判断是否匹配。选择器匹配语句链越短，浏览器的匹配速度越快。避免使用标签和通用选择器作为关键选择器，因为它们会匹配大量的元素，浏览器必须要进行大量的工作，去判断这些元素的父元素们是否匹配。

### 使用 CSS 预处理的优缺点分别是什么？

优点：

- 提高 CSS 可维护性。
- 易于编写嵌套选择器。
- 引入变量，增添主题功能。可以在不同的项目中共享主题文件。
- 通过混合（Mixins）生成重复的 CSS。
- 将代码分割成多个文件。不进行预处理的 CSS，虽然也可以分割成多个文件，但需要建立多个 HTTP 请求加载这些文件。

缺点：

- 需要预处理工具。
- 重新编译的时间可能会很慢。

### 对于你使用过的 CSS 预处理，说说喜欢和不喜欢的地方？

喜欢：

- 绝大部分优点上题以及提过。
- Less 用 JavaScript 实现，与 NodeJS 高度结合。

**Dislikes:**

- 我通过`node-sass`使用 Sass，它用 C ++ 编写的 LibSass 绑定。在 Node 版本切换时，我必须经常重新编译。
- Less 中，变量名称以`@`作为前缀，容易与 CSS 关键字混淆，如`@media`、`@import`和`@font-face`。

### 如何实现一个使用非标准字体的网页设计？

使用`@font-face`并为不同的`font-weight`定义`font-family`。

### 解释浏览器如何确定哪些元素与 CSS 选择器匹配。

这部分与上面关于编写高效的 CSS 有关。浏览器从最右边的选择器（关键选择器）根据关键选择器，浏览器从 DOM 中筛选出元素，然后向上遍历被选元素的父元素，判断是否匹配。选择器匹配语句链越短，浏览器的匹配速度越快。

例如，对于形如`p span`的选择器，浏览器首先找到所有`元素，并遍历它的父元素直到根元素以找到`元素。对于特定的`，只要找到一个`，就知道'`已经匹配并停止继续匹配。

### 描述伪元素及其用途。

CSS 伪元素是添加到选择器的关键字，去选择元素的特定部分。它们可以用于装饰（`:first-line`，`:first-letter`）或将元素添加到标记中（与 content:...组合），而不必修改标记（`:before`，`:after`）。

- `:first-line`和`:first-letter`可以用来修饰文字。
- 上面提到的`.clearfix`方法中，使用`clear: both`来添加不占空间的元素。
- 使用`:before`和`after`展示提示中的三角箭头。鼓励关注点分离，因为三角被视为样式的一部分，而不是真正的 DOM。如果不使用额外的 HTML 元素，只用 CSS 样式绘制三角形是不太可能的。

### `display`的属性值都有哪些？

- `none`, `block`, `inline`, `inline-block`, `table`, `table-row`, `table-cell`, `list-item`.

### `relative`、`fixed`、`absolute`和`static`四种定位有什么区别？

经过定位的元素，其`position`属性值必然是`relative`、`absolute`、`fixed`或`sticky`。

- `static`：默认定位属性值。该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。
- `relative`：该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。
- `absolute`：不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。
- `fixed`：不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform 属性非 none 时，容器由视口改为该祖先。
- `sticky`：盒位置根据正常流计算(这称为正常流动中的位置)，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的块级祖先元素）定位。在所有情况下（即便被定位元素为 `table` 时），该元素定位均不对后续元素造成影响。当元素 B 被粘性定位时，后续元素的位置仍按照 B 未定位时的位置来确定。`position: sticky` 对 `table` 元素的效果与 `position: relative` 相同。

### 参考

- [https://developer.mozilla.org/en/docs/Web/CSS/position](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en/docs/Web/CSS/position)

### 你使用过哪些现有的 CSS 框架？你是如何改进它们的？

- **Bootstrap**： 更新周期缓慢。Bootstrap 4 已经处于 alpha 版本将近两年了。添加了在页面中广泛使用的微调按钮组件。
- **Semantic UI**：源代码结构使得自定义主题很难理解。非常规主题系统的使用体验很差。外部库的路径需要硬编码（hard code）配置。变量重新赋值没有 Bootstrap 设计得好。
- **Bulma**： 需要很多非语义的类和标记，显得很多余。不向后兼容，以至于升级版本后，会破坏应用的正常运行。

### 你了解 CSS Flex 和 Grid 吗？

Flex 主要用于一维布局，而 Grid 则用于二维布局。

### Flex

flex 容器中存在两条轴， 横轴和纵轴， 容器中的每个单元称为 flex item。

在容器上可以设置 6 个属性： _flex-direction_ flex-wrap _flex-flow_ justify-content _align-items_ align-content

注意：当设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。

### Flex 项目属性

有六种属性可运用在 item 项目上: 1. order 2. flex-basis 3. flex-grow 4. flex-shrink 5. flex 6. align-self

### Grid

CSS 网格布局用于将页面分割成数个主要区域，或者用来定义组件内部元素间大小、位置和图层之间的关系。

像表格一样，网格布局让我们能够按行或列来对齐元素。 但是，使用 CSS 网格可能还是比 CSS 表格更容易布局。 例如，网格容器的子元素可以自己定位，以便它们像 CSS 定位的元素一样，真正的有重叠和层次。

### 响应式设计与自适应设计有何不同？

响应式设计和自适应设计都以提高不同设备间的用户体验为目标，根据视窗大小、分辨率、使用环境和控制方式等参数进行优化调整。

响应式设计的适应性原则：网站应该凭借一份代码，在各种设备上都有良好的显示和使用效果。响应式网站通过使用媒体查询，自适应栅格和响应式图片，基于多种因素进行变化，创造出优良的用户体验。就像一个球通过膨胀和收缩，来适应不同大小的篮圈。

自适应设计更像是渐进式增强的现代解释。与响应式设计单一地去适配不同，自适应设计通过检测设备和其他特征，从早已定义好的一系列视窗大小和其他特性中，选出最恰当的功能和布局。与使用一个球去穿过各种的篮筐不同，自适应设计允许使用多个球，然后根据不同的篮筐大小，去选择最合适的一个。

### 参考

- [https://developer.mozilla.org/en-

### 你有没有使用过视网膜分辨率的图形？当中使用什么技术？

我倾向于使用更高分辨率的图形（显示尺寸的两倍）来处理视网膜显示。更好的方法是使用媒体查询，像`@media only screen and (min-device-pixel-ratio: 2) { ... }`，然后改变`background-image`。

对于图标类的图形，我会尽可能使用 svg 和图标字体，因为它们在任何分辨率下，都能被渲染得十分清晰。

还有一种方法是，在检查了`window.devicePixelRatio`的值后，利用 JavaScript 将``的`src`属性修改，用更高分辨率的版本进行替换。

### 什么情况下，用`translate()`而不用绝对定位？什么时候，情况相反。

`translate()`是`transform`的一个值。改变`transform`或`opacity`不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。而改变绝对定位会触发重新布局，进而触发重绘和复合。`transform`使浏览器为元素创建一个 GPU 图层，但改变绝对定位会使用到 CPU。 因此`translate()`更高效，可以缩短平滑动画的绘制时间。

当使用`translate()`时，元素仍然占据其原始空间（有点像`position：relative`），这与改变绝对定位不同。

### 参考

- [https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/](https://link.zhihu.com/?target=https%3A//www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/)

### 其他答案

- [https://neal.codes/blog/front-end-interview-css-questions](https://link.zhihu.com/?target=https%3A//neal.codes/blog/front-end-interview-css-questions)
- [https://quizlet.com/28293152/front-end-interview-questions-css-flash-cards/](https://link.zhihu.com/?target=https%3A//quizlet.com/28293152/front-end-interview-questions-css-flash-cards/)
- [http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/](https://link.zhihu.com/?target=http%3A//peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/)

### 行内元素、块级元素区别

行内元素：和其他元素都在一行上，高度、行高及外边距和内边距都不可改变，文字图片的宽度不可改变，只能容纳文本或者其他行内元素；其中 img 是行元素

块级元素：总是在新行上开始，高度、行高及外边距和内边距都可控制，可以容纳内敛元素和其他元素；行元素转换为块级元素方式：display：block；

### CSS 中 link 和@import 的区别

- link 属于 HTML 标签，而@import 是 CSS 提供的
- 页面被加载的时，link 会同时被加载，而@import 引用的 CSS 会等到页面被加载完再加载
- import 只在 IE5 以上才能识别，而 link 是 HTML 标签，无兼容问题
- link 方式的样式的权重 高于@import 的权重

### 如何用 css 实现瀑布流布局

利用 column-count 和 break-inside 这两个 CSS3 属性即可，复制如下代码即可察看效果

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        margin: 0;
      }
      .waterfall-container {
        width: 100%;

        /* 分几列 */
        column-count: 2;

        /* 列间距 */
        column-gap: 10px;
      }

      .waterfall-item {
        width: 100%;
        height: 100px;
        margin-bottom: 10px;
        color: #fff;
        font-size: 40px;
        text-align: center;
        column-gap: 0;
        background: #ddd;
        break-inside: avoid;
      }
    </style>
  </head>
  <body>
    <div class="waterfall-container">
      <div class="waterfall-item" style="height: 100px">1</div>
      <div class="waterfall-item" style="height: 300px">2</div>
      <div class="waterfall-item" style="height: 400px">3</div>
      <div class="waterfall-item" style="height: 100px">4</div>
      <div class="waterfall-item" style="height: 300px">5</div>
      <div class="waterfall-item" style="height: 600px">6</div>
      <div class="waterfall-item" style="height: 400px">7</div>
      <div class="waterfall-item" style="height: 300px">8</div>
      <div class="waterfall-item" style="height: 700px">9</div>
      <div class="waterfall-item" style="height: 100px">10</div>
    </div>
  </body>
</html>
```

## 文本超出部分显示省略号

### 单行

```text
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

### 多行

```text
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

## 利用伪元素画三角

```css
.info-tab {
  position: relative;
}
.info-tab::after {
  position: absolute;
  top: 0;
  border: 4px solid transparent;
  border-top-color: #2c8ac2;
  content: '';
}
```

## 已知父级盒子的宽高，子级 img 宽高未知，想让 img 铺满父级盒子且图片不能变形

需要用到`css`的`object-fit`属性

```css
div {
  width: 200px;
  height: 200px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

[MDN](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

## css hack 是什么

由于不同的浏览器，比如 Internet Explorer 6,Internet Explorer 7,Mozilla Firefox 等，对 CSS 的解析认识不一样，因此会导致生成的页面效果不一样，得不到我们所需要的页面效果。

这个时候我们就需要针对不同的浏览器去写不同的 CSS，让它能够同时兼容不同的浏览器，能在不同的浏览器中也能得到我们想要的页面效果。

这个针对不同的浏览器写不同的 CSS code 的过程，就叫 CSS hack,也叫写 CSS hack。

具体请看： [http://www.cnblogs.com/Renyi-Fan/p](https://link.zhihu.com/?target=http%3A//www.cnblogs.com/Renyi-Fan/p/9006084.html)

## 过渡与动画的区别是什么

- transition 可以在一定的时间内实现元素的状态过渡为最终状态，用于模拟以一种过渡动画效果，但是功能有限，只能用于制作简单的动画效果而动画属性
- animation 可以制作类似 Flash 动画，通过关键帧控制动画的每一步，控制更为精确，从而可以制作更为复杂的动画。

## 什么是外边距合并

外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。

合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

## 去除 inline-block 元素间间距的方法

- 移除空格
- 使用 margin 负值
- 使用 font-size:0
- letter-spacing
- word-spacing

更详细的介绍请看:[去除 inline-block 元素间间距的 N 种方法](https://link.zhihu.com/?target=https%3A//www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/)
