[TOC]

## 闭包

定义： 有权访问另外一个函数作用域中的变量的函数，存在意义在于间接访问函数内部的变量。但也因为闭包引用着另一个函数的变量，导致另一个函数已经不使用了也无法销毁，所以闭包使用过多，会占用较多的内存，这也是一个副作用。

常见的场景

1. 返回一个函数，可读取内部函数的变量
2. 定时器，事件监听回调函数，保存了 window 和当前作用域
3. 立即执行函数，保存了 window 和当前作用域

闭包存在的意义就是让我们可以间接访问函数内部的变量。

```js
var f3;
function f1() {
  var a = 2;
  f3 = function () {
    console.log(a);
  };
}
f1();
f3();
```

闭包经典面试题

原因： 由于 setTimeout 是宏任务，所以每次循环时会新起一个任务队列，等外面的 for 循环完成后，再依次执行，此时，i 已经成为了 6

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, 0);
}
```

1. 采用立即执行函数

   ```js
   for (var i = 1; i <= 5; i++) {
     (function (j) {
       setTimeout(function timer() {
         console.log(j);
       }, 0);
     })(i);
   }
   ```

2. 给定时器传入第三个参数, 作为 timer 函数的第一个函数参数

   ```js
   for (var i = 1; i <= 5; i++) {
     setTimeout(
       function timer(j) {
         console.log(j);
       },
       0,
       i,
     );
   }
   ```

3. 使用 ES6 中的 let（产生块级作用域）

   ```js
   for (let i = 1; i <= 5; i++) {
     setTimeout(function timer() {
       console.log(i);
     }, 0);
   }
   ```

## 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？

在 ES5 中，顶层对象的属性和全局变量是等价的，var 命令和 function 命令声明的全局变量，自然也是顶层对象。

但 ES6 规定，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性，但 let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性。

在全局作用域中，用 let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中

在定义变量的块级作用域中就能获取

const 和 let 会生成块级作用域，可以理解为

```js
let a = 10;
const b = 20;
相当于：
(function(){
    var  a = 10;
    var b = 20;
})()
```

ES5 没有块级作用域的概念，只有函数作用域，可以近似理解成这样。 所以外层 window 必然无法访问。

## 使用 let、var 和 const 创建变量有什么区别

- 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部

- `var` 存在提升，我们能在声明之前使用。`let`、`const` 因为暂时性死区的原因，不能在声明前使用

- `var` 在全局作用域下声明变量会导致变量挂载在 `window` 上，其他两者不会

- `let` 和 `const` 作用基本一致，但是后者声明的变量不能再次赋值

用 var 声明的变量的作用域是它当前的执行上下文，它可以是嵌套的函数，也可以是声明在任何函数外的变量。let 和 const 是块级作用域，意味着它们只能在最近的一组花括号（function、if-else 代码块或 for 循环中）中访问。

```js
function foo() {
  // 所有变量在函数中都可访问
  var bar = 'bar';
  let baz = 'baz';
  const qux = 'qux';

  console.log(bar); // bar
  console.log(baz); // baz
  console.log(qux); // qux
}

console.log(bar); // ReferenceError: bar is not defined
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
if (true) {
  var bar = 'bar';
  let baz = 'baz';
  const qux = 'qux';
}

// 用 var 声明的变量在函数作用域上都可访问
console.log(bar); // bar
// let 和 const 定义的变量在它们被定义的语句块之外不可访问
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

var 会使变量提升，这意味着变量可以在声明之前使用。let 和 const 不会使变量提升，提前使用会报错。

```js
console.log(foo); // undefined

var foo = 'foo';

console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization

let baz = 'baz';

console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization

const bar = 'bar';
```

用 var 重复声明不会报错，但 let 和 const 会。

```js
var foo = 'foo';
var foo = 'bar';
console.log(foo); // "bar"

let baz = 'baz';
let baz = 'qux'; // Uncaught SyntaxError: Identifier 'baz' has already been declared
```

let 和 const 的区别在于：let 允许多次赋值，而 const 只允许一次。

```js
// 这样不会报错。
let foo = 'foo';
foo = 'bar';

// 这样会报错。
const baz = 'baz';
baz = 'qux';
```

## 自执行函数?用于什么场景？好处?

自执行函数:1、声明一个匿名函数 2、马上调用这个匿名函数。作用：创建一个独立的作用域。

好处：防止变量弥散到全局，以免各种 js 库冲突。隔离作用域避免污染，或者截断作用域链，避免闭包造成引用变量无法释放。利用立即执行特性，返回需要的业务函数或对象，避免每次通过条件判断来处理

场景：一般用于框架、插件等场景

## 变量提升，作用域相关代码题

```js
var name = 'Tom';
(function () {
  if (typeof name == 'undefined') {
    var name = 'Jack';
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();
// Hello Tom
```

```js
var name = 'Tom';
(function () {
  if (typeof name == 'undefined') {
    let name = 'Jack';
    // 或者 name = 'Jack'
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();
// Hello Tom
```

```js
var a = 10;
(function () {
  console.log(a);
  a = 5;
  console.log(window.a);
  var a = 20;
  console.log(a);
})();
// undefined 10 20
```

```js
var a = 10;
(function () {
  console.log(a);
  a = 5;
  console.log(window.a);
  // var a = 20;
  console.log(a);
})();
// 10 5 5
```

```js
var b = 10;
(function b() {
  window.b = 20;
  console.log(b); // [Function b]
  console.log(window.b); // 20是必然的
})();
```

```js
var b = 10;
(function b() {
  b = 20;
  console.log(b);
})();
// 打印 Function b
```

```js
var b = 10;
(function b() {
  var b = 20; // IIFE内部变量
  console.log(b); // 20
  console.log(window.b); // 10
})();
```

```js
var b = 10;
(function b() {
  // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了呀。发现了具名函数 function b(){}，拿此b做赋值；
  // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
  // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
  b = 20;
  console.log(b); // [Function b]
  console.log(window.b); // 10，不是20
})();
```

```js
var b = 10;
(function b() {
  'use strict';
  b = 20;
  console.log(b);
})(); // "Uncaught TypeError: Assignment to constant variable."
```

1. 函数表达式与函数声明不同，函数名只在该函数内部有效，并且此绑定是常量绑定。

2. 对于一个常量进行赋值，在 strict 模式下会报错，非 strict 模式下静默失败。

3. IIFE 中的函数是函数表达式，而不是函数声明。

   b 函数是一个相当于用 const 定义的常量，内部无法进行重新赋值，如果在严格模式下，会报错"Uncaught TypeError: Assignment to constant variable."

```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.x);
console.log(b.x);
```

结果: undefined {n:2}

首先，a 和 b 同时引用了{n:2}对象，接着执行到 a.x = a = {n：2}语句，尽管赋值是从右到左的没错，但是.的优先级比=要高，所以这里首先执行 a.x，相当于为 a（或者 b）所指向的{n:1}对象新增了一个属性 x，即此时对象将变为{n:1;x:undefined}。之后按正常情况，从右到左进行赋值，此时执行 a ={n:2}的时候，a 的引用改变，指向了新对象{n：2},而 b 依然指向的是旧对象。之后执行 a.x = {n：2}的时候，并不会重新解析一遍 a，而是沿用最初解析 a.x 时候的 a，也即旧对象，故此时旧对象的 x 的值为{n：2}，旧对象为 {n:1;x:{n：2}}，它被 b 引用着。后面输出 a.x 的时候，又要解析 a 了，此时的 a 是指向新对象的 a，而这个新对象是没有 x 属性的，故访问时输出 undefined；而访问 b.x 的时候，将输出旧对象的 x 的值，即{n:2}。
