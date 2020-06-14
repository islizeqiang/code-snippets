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
