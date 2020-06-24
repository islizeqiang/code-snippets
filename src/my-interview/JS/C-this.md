[TOC]

## 请简述`JavaScript`中的`this`。

是什么：是函数运行时内部自动生成的一个内部对象，只能在函数内部使用

粗略地讲，函数的调用方式决定了`this`的值。

1. 在调用函数时使用`new`关键字，函数内的`this`是一个全新的对象，会绑定到新生成的实例对象上。

2. 如果`apply`、`call`或`bind`方法用于调用、创建一个函数，函数内的 this 就是作为参数传入这些方法的对象。

3. 当函数作为对象里的方法被调用时，函数内的`this`是调用该函数的对象。比如当`obj.method()`被调用时，函数内的 this 将绑定到`obj`对象。

4. 如果调用函数不符合上述规则，那么`this`的值指向全局对象（global object）。浏览器环境下`this`的值指向`window`对象，但是在严格模式下(`'use strict'`)，`this`的值为`undefined`。

5. 如果符合上述多个规则，则较高的规则（1 号最高，4 号最低）将决定`this`的值。

   > 优先级: new > call、apply、bind > 对象.方法 > 直接调用。

6. 如果该函数是 ES2015 中的箭头函数，将忽略上面的所有规则，`this`被设置为它被创建时的上下文。

如何确定：如果要判断一个运行中函数的 this 绑定，就需要找到这个函数的直接调用位置。找到之后就可以顺序应用下面这四条规则来判断 this 的绑定对象。 1. 由 new 调用？绑定到新创建的对象。 2. 由 call 或者 apply （或者 bind ）调用？ 绑定到指定的对象。3. 由上下文对象调用？绑定到那个上下文对象。 4. 默认：在严格模式下绑定到 undefined ，否则绑定到全局对象。

箭头函数的 this:

箭头函数是普通函数的简写，可以更优雅的定义一个函数，和普通函数相比，有以下几点差异：

1、函数体内的 this 对象，里面的 this 会指向当前最近的非箭头函数的 this，就是定义时所在的对象，而不是使用时所在的对象，用 call，apply，bind 也不能改变`this`指向

2、不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

3、不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

4、不可以使用 new 命令，因为：

- 没有自己的 this，无法调用 call，apply，bind。
- 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 **proto**



## call 和 apply 的区别

共同点：

- 都能够改变函数执行时的上下文，将一个对象的方法交给另一个对象来执行，并且是立即执行的。
- 调用 call 和 apply 的对象，必须是一个函数 Function

区别主要体现在参数上。 在`参数少`的情况下，call 的性能优于 apply，反之 apply 的性能更好。

调用 call 的对象，必须是个函数 Function。 call 的第一个参数，是一个对象。 Function 的调用者，将会指向这个对象。如果不传，则默认为全局对象 window。第二个参数开始，可以接收任意个参数。每个参数会映射到相应位置的 Function 的参数上。但是如果将所有的参数作为数组传入，它们会作为一个整体映射到 Function 对应的第一个参数上，之后参数都为空。

```js
function func(a, b, c) {}
func.call(obj, 1, 2, 3);
// func 接收到的参数实际上是 1,2,3
func.call(obj, [1, 2, 3]);
// func 接收到的参数实际上是 [1,2,3],undefined,undefined
```

apply 的写法 Function.apply(obj[,argArray]) 复制代码

- 它的调用者必须是函数 Function，并且只接收两个参数，第一个参数的规则与 call 一致。
- 第二个参数，必须是数组或者类数组，它们会被转换成类数组，传入 Function 中，并且会被映射到 Function 对应的参数上。这也是 call 和 apply 之间，很重要的一个区别。

```js
func.apply(obj, [1, 2, 3]);
// func 接收到的参数实际上是 1,2,3
func.apply(obj, {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
});
// func 接收到的参数实际上是 1,2,3
```



## call 和 apply 的用途

下面会分别列举 call 和 apply 的一些使用场景。声明：例子中没有哪个场景是必须用 call 或者必须用 apply 的，只是个人习惯这么用而已。

- call 的使用场景

**1、对象的继承**。如下面这个例子：

```js
function superClass() {
  this.a = 1;
  this.print = function () {
    console.log(this.a);
  };
}
function subClass() {
  superClass.call(this);
  this.print();
}
subClass();
// 1
```

- apply 的使用场景

**1、Math.max**。用它来获取数组中最大的一项。

```js
let max = Math.max.apply(null, array);
```

同理，要获取数组中最小的一项，可以这样：

```js
let min = Math.min.apply(null, array);
```

**2、实现两个数组合并**。在 ES6 的扩展运算符出现之前，我们可以用 Array.prototype.push 来实现。

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]
```



## bind 的使用

在 MDN 上的解释是：bind() 方法创建一个新的函数，在调用时设置 this 关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。它的语法如下：

```js
Function.bind(thisArg[, arg1[, arg2[, ...]]])
```

bind 方法 与 apply 和 call 比较类似，也能改变函数体内的 this 指向。不同的是，**bind 方法的返回值是函数，并且需要稍后调用，才会执行**。而 apply 和 call 则是立即调用。

来看下面这个例子：

```js
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}

add.bind(sub, 5, 3); // 这时，并不会返回 8
add.bind(sub, 5, 3)(); // 调用后，返回 8
```

如果 bind 的第一个参数是 null 或者 undefined，this 就指向全局对象 window。总结 call 和 apply 的主要作用，是改变对象的执行上下文，并且是立即执行的。它们在参数上的写法略有区别。 bind 也能改变对象的执行上下文，它与 call 和 apply 不同的是，返回值是一个函数，并且需要稍后再调用一下，才会执行。
