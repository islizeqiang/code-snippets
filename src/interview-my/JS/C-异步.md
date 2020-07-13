[TOC]

## JS 异步编程方案

#### 回调函数

- 内部利用发布-订阅模式，一个 EventEmitter 需要实现`addListener`, `removeListener`, `once`, `removeAllListener`, `emit`

#### Promise

##### 1. 凭借什么消灭了回调地狱？

什么是回调地狱？

- 多层嵌套问题
- 每种任务的处理结果存在两种可能性，成功或失败，那么需要在每种任务执行结束后分别处理这两种可能性

怎么解决的？

- 实现链式调用，解决多层嵌套问题
- 实现错误冒泡后一站式处理，解决每次任务中判断错误、增加代码混乱度的问题

##### 2.为什么要引入微任务

1. 采用**异步回调**替代同步回调解决了浪费 CPU 性能的问题
2. 放到**当前宏任务最后**执行，解决了回调执行的实时性问题。

宏任务和微任务

- 宏任务(macro-task / task)：script(整体代码), setTimeout, setInterval, **setImmediate**, I/O 操作，UI 渲染等。

- 微任务(micro-task / jobs)：promise.then、**process.nextTick**还包括 V8 的垃圾回收过程。

#### Generator

当一个生成器要调用另一个生成器

```js
function* gen1() {
  yield 1;
  yield 4;
}
function* gen2() {
  yield 2;
  yield 3;
}

function* gen12() {
  yield 1;
  yield* gen2();
  yield 4;
}
```

执行机制：协程

#### async await

## Promise.all(iterable)

Promise.all(iterable) 方法返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 实例，此实例在 `iterable` 参数内所有的 `promise` 都完成（resolved）或参数中不包含 `promise` 时回调完成如果参数中 `promise` 有一个失败（rejected），此实例回调失败（reject），失败的原因是第一个失败 `promise` 的结果。

## Promise.race(iterable)

Promise.race(iterable)方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。

## Promise.prototype.finally()

`finally()` 方法返回一个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。在 promise 结束时，无论结果是 fulfilled 或者是 rejected，都会执行指定的回调函数。这为在`Promise`是否成功完成后都需要执行的代码提供了一种方式。

这避免了同样的语句需要在[`then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)和[`catch()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)中各写一次的情况。

```js
let isLoading = true;

fetch(myRequest)
  .then(function (response) {
    var contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    throw new TypeError("Oops, we haven't got JSON!");
  })
  .then(function (json) {
    /* process your JSON further */
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    isLoading = false;
  });
```

## forEach 中用 await 会产生什么问题？怎么解决？

forEach 不能保证执行顺序，callback 会一起执行，不能保证异步执行顺序，但可以采用 for...of 解决，通过迭代器去遍历。

```js
async function test() {
  let arr = [4, 2, 1];
  arr.forEach(async (item) => {
    const res = await handle(item);
    console.log(res);
  });
  console.log('结束');
}

function handle(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x);
    }, 1000 * x);
  });
}

test();
```

```js
async function test() {
  let arr = [4, 2, 1];
  for (const item of arr) {
    const res = await handle(item);
    console.log(res);
  }
  console.log('结束');
}
```

```js
async function test() {
  let arr = [4, 2, 1];
  let iterator = arr[Symbol.iterator]();
  let res = iterator.next();
  while (!res.done) {
    let value = res.value;
    console.log(value);
    await handle(value);
    res = iterater.next();
  }
  console.log('结束');
}
```
