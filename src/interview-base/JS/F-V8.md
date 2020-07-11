[TOC]

## 进程和线程和协程的区别

进程：进程是系统资源分配的最小单位，系统由一个个进程组成，进程是抢夺 CPU 运行自身，在 CPU 单核的情况下同一时间执行一个进程的代码，所以多进程的实现是通过 CPU 飞快的切换。

线程：线程是 CPU 调度的最小单位，线程属于进程，其共享进程的内存空间。

协程：协程在线程里运行，协程的调度切换是由程序手动切换的。Generator 函数是协程在 ES6 的实现，最大的特点就是可以交出函数的执行权。协程是一种比线程更加轻量级的存在，其不受操作系统管理，被具体应用程序代码控制。而 JS 是单线程，一个线程一次只能执行一个协程，所以 JS 是利用执行权转移来实现的。最大的特点就是可以交出函数的执行权，遇到 yield 就暂停，等到执行权返回，再从暂停的地方继续往后执行。

## 并发与并行的区别

并发是宏观概念，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。

并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。

## JS 是单线程怎么理解？

Node 是单线程只代表 js 的执行是单线程的，事件循环是单线程的，即开发者编写的代码运行在单线程环境中，但 js 的宿主环境，不管是 Node 还是浏览器都是多线程的，因为它在其运行时中具有 libuv 线程池，该线程池提供多线程功能来执行长时间运行的线程。

- 好处

  上文说到了 JS 引擎线程和渲染线程，大家应该都知道，在 JS 运行的时候可能会阻止 UI 渲染，这说明了两个线程是**互斥**的。这其中的原因是因为 JS 可以修改 DOM，如果在 JS 执行的时候 UI 线程还在工作，就可能导致不能安全的渲染 UI。这其实也是一个单线程的好处，得益于 JS 是单线程运行的，可以达到节省内存，节约上下文切换时间，没有锁的问题的好处。当然前面两点在服务端中更容易体现，对于锁的问题，形象的来说就是当我读取一个数字 15 的时候，同时有两个操作对数字进行了加减，这时候结果就出现了错误。解决这个问题也不难，只需要在读取的时候加锁，直到读取完毕之前都不能进行写入操作。

- 特点：同一时间只能做一件事。假如不是单线程，在浏览器内操作 DOM 是会带来复杂的同步问题，例如一个线程在一个 DOM 节点上添加，一个线程在上面删除，此时应该以哪个为准？

## Nodejs 的非阻塞 I/O 是如何实现的？

1. `阻塞`和`非阻塞` I/O 其实是针对操作系统内核而言的。阻塞 I/O 的特点就是一定要**等到操作系统完成所有操作后才表示调用结束**，而非阻塞 I/O 是调用后立马返回，不用等操作系统内核完成操作。
2. nodejs 中的异步 I/O 采用多线程的方式，由 `EventLoop`、`I/O 观察者`，`请求对象`、`线程池`四大要素相互配合，共同实现。

## Nodejs 中的 child_process 模块实现多进程

nodejs 通过 child_process 模块，可以实现一个主进程，多个子进程的模式，主进程称为 master 进程，子进程又称为工作进程。在子进程中不仅可以调用其他 node 程序，可以执行非 node 的程序和 shell 命令。

我之前做过 spawn 创建子进程的方式，spawn 执行应用后的结果并不是执行完成后，一次性的输出的，而是以流的形式输出。

## 0.1+0.2 为什么不等于 0.3？

首先 JS 是采用 IEEE754 双精度 64 位浮点数来表示的，在进行计算之前，会将 0.1 和 0.2 转成二进制，会造成无限循环，而 y 由于 IEEE754 尾数位数有限制，则会截取，就会丢失精度。然后运算时进行对阶运算，由于指数位数不同，也丢失了部分精度，然后再转成十进制就不等于 0.3 了。

```js
parseFloat((0.1 + 0.2).toFixed(10)) === 0.3; // true
```

## V8 如何执行一段 JS 代码

1. **预解析**：检查语法错误但不生成 AST

2. **生成 AST**：经过词法分析和语法分析，生成抽象语法树（AST）

3. **生成字节码**：基线编译器(Ignition)将 AST 转换成字节码

4. **生成机器码**：由解释器逐行执行字节码，遇到热点代码启动编译器进行编译，生成对应的机器码, 以优化执行效率

   - 什么叫热点代码？如果一个函数多次调用并且参数一直传入 Number 类型，那么 V8 会认为当前代码可以编译成机器码。因为固定了类型，不需要执行很多判断逻辑。

     为了让 V8 优化代码，我们应该尽可能保证传入参数的**类型一致**。但 TS 仅在开发阶段保持类型，编译后还是 JS，V8 执行的也是 JS，V8 并不能确定函数的参数类型，只能通过每次调用前检查保证参数类型。

> 由此可知，JS 不完全是一门解释性语言，因为字节码不仅配合了解释器，还配合了编译器（编译生成机器码），这种字节码跟解释器和编译器结合的技术，我们称之为即时编译（JIT）

> 编译器会编译成二进制文件（机器码），解释器不会（逐行执行字节码）

## JS 内存机制之问，数据是如何存储的？

基本数据类型用`栈`存储，引用数据类型用`堆`存储。

> 闭包变量是存在堆内存中的

为什么不全用栈来保存？对于系统栈来说，它的功能除了保存变量之外，还有创建并切换函数执行上下文的功能。

## V8 如何进行垃圾回收

V8 整体内存分配

    - 64位 1.4G
    - 32位 0.7G

为什么这么做？首先 js 是单线程的，一旦进入到垃圾回收，则其他逻辑都要暂停。并且垃圾回收很消耗时间，以 1.5G 垃圾回收堆内存为例，每做一次需要消耗 50ms 以上，做一次非增量标记的垃圾回收需要大概 1S 以上。也可通过 shell 执行时进行控制

JS 引擎中对变量的存储主要有两种位置，栈内存和堆内存。

栈内存存储基本类型数据 以及 引用类型数据的内存地址。 堆内存储存引用类型的数据

![img](https://user-gold-cdn.xitu.io/2020/4/5/17149730709e41a4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 栈内存的回收：栈内存调用栈上下文切换后就被回收，比较简单。具体来说就是当 ESP 指针下移，也就是上下文切换之后，栈顶的空间会自动被回收。
- 堆内存的回收：V8 的堆内存分为新生代内存和老生代内存，新生代内存是临时分配的内存，存在时间短，老生代内存存在时间长

![img](https://user-gold-cdn.xitu.io/2020/4/5/1714980cac75fc32?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 新生代内存回收机制：

  - 新生代内存容量小，64 位系统下仅有 32M。新生代内存分为**From、To**两部分。这两个空间必定有一个是空闲的，一个是使用的。等 From 中占满之后，先扫描 From，将非存活对象回收，将存活对象顺序复制到 To 中，采用 Scavenge 算法将内存碎片整理，之后调换 From/To，等待下一次回收

    新生态内存分配

    - 64 位下为 32MB
    - 32 位下位 16MB

- 老生代内存回收机制

  - **晋升**
    - 已经经历过一次 Scavenge 回收。
    - To（闲置）空间的内存占用超过 25%。
  - **标记清除**：老生代内存会先遍历所有对象并打上标记，然后对正在使用或被强引用的对象取消标记，回收被标记的对象
  - **整理内存碎片**：简单粗暴把对象全部挪到内存的一端进行靠拢

- 增量标记

  由于 JS 的单线程机制，V8 在进行垃圾回收的时候，不可避免地会阻塞业务逻辑的执行，倘若老生代的垃圾回收任务很重，那么耗时会非常可怕，严重影响应用的性能。那这个时候为了避免这样问题，V8 采取了增量标记的方案，即将一口气完成的标记任务分为很多小的部分完成，每做完一个小的部分就"歇"一下，就 js 应用逻辑执行一会儿，然后再执行下面的部分，如此循环，直到标记阶段完成才进入内存碎片的整理上面来。

## 介绍一下引用计数和标记清除

- **引用计数**：给一个变量赋值引用类型，则该对象的引用次数+1，如果这个变量变成了其他值，那么该对象的引用次数-1，垃圾回收器会回收引用次数为 0 的对象。
- **标记清除**：垃圾收集器先给内存中所有对象加上标记，然后从根节点开始遍历，去掉被引用的对象和运行环境中对象的标记，剩下的被标记的对象就是需要清除的对象。

## JS 相较于 C++等语言为什么慢，V8 做了哪些优化

1. JS 的问题：
   - **动态类型**：导致每次存取属性/寻求方法时候，都需要先检查类型；此外动态类型也很难在编译阶段进行优化
   - **属性存取**：C++/Java 等语言中方法、属性是存储在数组中的，仅需数组位移就可以获取，而 JS 存储在对象中，每次获取都要进行哈希查询
2. V8 的优化：
   - **优化 JIT(即时编译)**：相较于 C++/Java 这类编译型语言，JS 一边解释一边执行，效率低。V8 对这个过程进行了优化：如果一段代码被执行多次，那么 V8 会把这段代码转化为机器码缓存下来，下次运行时直接使用机器码。
   - **隐藏类**：对于 C++这类语言来说，仅需几个指令就能通过偏移量获取变量信息，而 JS 需要进行字符串匹配，效率低，V8 借用了类和偏移位置的思想，将对象划分成不同的组，即隐藏类
   - **内嵌缓存**：即缓存对象查询的结果。常规查询过程是：获取隐藏类地址 -> 根据属性名查找偏移值 -> 计算该属性地址，内嵌缓存就是对这一过程结果的缓存
   - **垃圾回收管理**：上文已介绍

![img](https://user-gold-cdn.xitu.io/2020/4/5/1714a1f7c054c657?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## setTimeout 的执行原理

执行该语句是立即将当前定时器代码推入事件队列，等到时间到了之后将代码加入任务队列，之后的执行交给任务队列负责，如果此时的任务队列不为空，则需要等待，所以可能执行代码的时间会大于设置的时间。

## 事件循环

- 什么是：JS 是单线程，在单线程中拥有唯一的事件循环。事件循环决定了 JS 代码的执行顺序。
- 和函数调用栈的不同：函数调用栈是决定函数的执行顺序，事件循环是依靠任务队列的方式，来决定整体代码的执行顺序的。
- 特点：
  - 事件循环是唯一的，但任务队列可以有多个
  - setTimeout/Promise 等我们称之为任务源。而进入任务队列的是他们指定的具体执行任务。（例：setTimeout 中的回调函数才是进入任务队列的任务，setTimeout 会立即执行）
  - 来自不同任务源的任务会进入到不同的任务队列。其中 setTimeout 与 setInterval 是同源的。
  - 事件循环的顺序，决定了 JavaScript 代码的执行顺序。它从 script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的 micro-task。当所有可执行的 micro-task 执行完毕之后。循环再次从 macro-task 开始，找到其中一个任务队列执行完毕，然后再执行所有的 micro-task，这样一直循环下去。
  - 其中每一个任务的执行，无论是 macro-task 还是 micro-task，都是借助函数调用栈来完成。
- 执行过程：

  1. 一开始整段脚本作为第一个**宏任务**执行
  2. 执行过程中同步代码直接执行，**宏任务**进入宏任务队列，**微任务**进入微任务队列
  3. 当前宏任务执行完出队，检查微任务队列，如果有则依次执行，直到微任务队列为空
  4. 执行浏览器 UI 线程的渲染工作
     1. 当 Eventloop 执行完 Microtasks 后，会判断 `document` 是否需要更新，因为浏览器是 60Hz 的刷新率，每 16.6ms 才会更新一次。
     2. 然后判断是否有 `resize` 或者 `scroll` 事件，有的话会去触发事件，所以 `resize` 和 `scroll` 事件也是至少 16ms 才会触发一次，并且自带节流功能。
     3. 判断是否触发了 media query
     4. 更新动画并且发送事件
     5. 判断是否有全屏操作事件
     6. 执行 `requestAnimationFrame` 回调
     7. 执行 `IntersectionObserver` 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
     8. 更新界面
     9. 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 `requestIdleCallback` 回调。
  5. 检查是否有 Web worker 任务，有则执行
  6. 执行队首新的宏任务，回到 2，依此循环，直到宏任务和微任务队列都为空

#### 执行上下文

- 什么是：执行上下文可以理解为函数执行的环境，每一个函数执行时，都会给对应的函数创建这样一个执行环境。

- 特点：

  1. 单线程
  2. v8 以栈的方式处理他们

  3. 同步执行，只有栈顶的上下文处于执行中，其他上下文需要等待

  4. 全局上下文只有唯一的一个，它在浏览器关闭时出栈

  5. 函数的执行上下文的个数没有限制

  6. 每次某个函数被调用，就会有个新的执行上下文为其创建，即使是调用的自身函数，也是如此。

#### 任务队列

- 什么是：具体执行任务组成的队列叫任务队列

- 在每一个宏任务中定义一个**微任务队列**，当该宏任务执行完成，会检查其中的微任务队列，如果为空则直接执行下一个宏任务，如果不为空，则`依次执行微任务`，执行完成才去执行下一个宏任务。

- 分类

  - 宏任务(macro-task / task)：script(整体代码), setTimeout, setInterval, **setImmediate**, I/O 操作，UI 渲染等。

  - 微任务(micro-task / jobs)：promise.then 还包括 V8 的垃圾回收过程。

    > 引入微任务的作用在于解决异步回调的问题

![img](https://pic4.zhimg.com/80/v2-aac30c2c5277e89df6738fa961c9348f_720w.jpg)

## NodeJS 的事件循环和浏览器的事件循环

#### nodejs 和 浏览器关于 eventLoop 的主要区别

两者最主要的区别在于浏览器中的微任务是在`每个相应的宏任务`中执行的，而 nodejs 中的微任务是在`不同阶段之间`执行的。

具体输出的区别

- 在 node10 之前：将同源宏任务队列执行完毕后再清空微任务队列(同源宏任务就是来自相同任务源，其中 setTimeout 和 setInterval 是同源的)
- 之后：和浏览器一样 每执行一个宏任务就执行完微任务队列。

#### 三大关键阶段

1. 执行 `定时器回调` 的阶段。检查定时器，如果到了时间，就执行回调。这些定时器就是 setTimeout、setInterval。这个阶段暂且叫它`timer`。
2. 轮询(英文叫`poll`)阶段。因为在 node 代码中难免会有异步操作，比如文件 I/O，网络 I/O 等等，那么当这些异步操作做完了，就会来通知 JS 主线程，怎么通知呢？就是通过'data'、 'connect'等事件使得事件循环到达 `poll` 阶段。到达了这个阶段后: 如果当前已经存在定时器，而且有定时器到时间了，拿出来执行，eventLoop 将回到 timer 阶段。如果没有定时器, 会去看 IO 回调函数队列。

- 如果队列`不为空`，拿出队列中的方法依次执行

- 如果队列为空，检查是否有 setImmdiate 的回调

  - 有则前往`check阶段`

  - 没有则继续等待，相当于阻塞了一段时间(阻塞时间是有上限的), 等待 callback 函数加入队列，加入后会立刻执行。一段时间后自动进入 check 阶段。

3. check 阶段。这是一个比较简单的阶段，直接`执行 setImmdiate` 的回调。

[![project](http://47.98.159.95/my_blog/week07/10.jpg)](http://47.98.159.95/my_blog/week07/10.jpg)

1. timer 阶段
2. I/O 异常回调阶段
3. 空闲、预备状态(第 2 阶段结束，poll 未触发之前)
4. poll 阶段
5. check 阶段
6. 关闭事件的回调阶段

#### 关于 process.nextTick 的一点说明

process.nextTick 是一个独立于 eventLoop 的任务队列。

在每一个 eventLoop 阶段完成后会去检查这个队列，如果里面有任务，会让这部分任务`优先于微任务`执行。

```js
A();
B();
C();
```

![img](https://pic4.zhimg.com/50/ba47432176970aeb9e9df4c3cbb3a623_hd.jpg)![img](https://pic4.zhimg.com/80/ba47432176970aeb9e9df4c3cbb3a623_720w.jpg)

\------------------------------------------------------------------------

```text
A();
process.nextTick(B);
C();
```

![img](https://pic3.zhimg.com/50/3a591f00cfe6b3c3b51137c2a8bda382_hd.jpg)![img](https://pic3.zhimg.com/80/3a591f00cfe6b3c3b51137c2a8bda382_720w.jpg)

\------------------------------------------------------------------------

```js
A();
setImmediate(B);
C();
```

![img](https://pic4.zhimg.com/50/2d5e6e9335f8972b0d5a6e010871d828_hd.jpg)![img](https://pic4.zhimg.com/80/2d5e6e9335f8972b0d5a6e010871d828_720w.jpg)

首先在有些情况下，定时器的执行顺序其实是**随机**的

```js
setTimeout(() => {
  console.log('setTimeout');
}, 0);
setImmediate(() => {
  console.log('setImmediate');
});
```

对于以上代码来说，`setTimeout` 可能执行在前，也可能执行在后

- 首先 `setTimeout(fn, 0) === setTimeout(fn, 1)`，这是由源码决定的
- 进入事件循环也是需要成本的，如果在准备时候花费了大于 1ms 的时间，那么在 timer 阶段就会直接执行 `setTimeout` 回调
- 那么如果准备时间花费小于 1ms，那么就是 `setImmediate` 回调先执行了

当然在某些情况下，他们的执行顺序一定是固定的，比如以下代码：

```js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

在上述代码中，`setImmediate` 永远**先执行**。因为两个代码写在 IO 回调中，IO 回调是在 poll 阶段执行，当回调执行完毕后队列为空，发现存在 `setImmediate` 回调，所以就直接跳转到 check 阶段去执行回调了。

```js
setTimeout(() => {
  console.log('timer21');
}, 0);

Promise.resolve().then(function () {
  console.log('promise1');
});
```

对于以上代码来说，其实和浏览器中的输出是一样的，microtask 永远执行在 macrotask 前面。

最后我们来讲讲 Node 中的 `process.nextTick`，这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会**清空队列中的所有回调函数**，并且优先于其他 microtask 执行。

```js
setTimeout(() => {
  console.log('timer1');

  Promise.resolve().then(function () {
    console.log('promise1');
  });
}, 0);

process.nextTick(() => {
  console.log('nextTick');
  process.nextTick(() => {
    console.log('nextTick');
    process.nextTick(() => {
      console.log('nextTick');
      process.nextTick(() => {
        console.log('nextTick');
      });
    });
  });
});
```

对于以上代码，大家可以发现无论如何，永远都是先把 nextTick 全部打印出来。

```js
// 可做区别的代码参考
console.log(1);

setTimeout(() => {
  console.log(2);
  new Promise((resolve) => {
    console.log(6);
    resolve(7);
  }).then((num) => {
    console.log(num);
  });
});

setTimeout(() => {
  console.log(3);
  new Promise((resolve) => {
    console.log(9);
    resolve(10);
  }).then((num) => {
    console.log(num);
  });
  setTimeout(() => {
    console.log(8);
  });
});

new Promise((resolve) => {
  console.log(4);
  resolve(5);
}).then((num) => {
  console.log(num);
  new Promise((resolve) => {
    console.log(11);
    resolve(12);
  }).then((num) => {
    console.log(num);
  });
});
```

```js
//请写出输出内容
console.log('golb1');

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

setTimeout(function () {
  console.log('timeout1');
  process.nextTick(function () {
    console.log('timeout1_nextTick');
  });
  new Promise(function (resolve) {
    console.log('timeout1_promise');
    resolve();
  }).then(function () {
    console.log('timeout1_then');
  });
});

setImmediate(function () {
  console.log('immediate1');
  process.nextTick(function () {
    console.log('immediate1_nextTick');
  });
  new Promise(function (resolve) {
    console.log('immediate1_promise');
    resolve();
  }).then(function () {
    console.log('immediate1_then');
  });
});

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

process.nextTick(function () {
  console.log('glob1_nextTick');
});

new Promise(function (resolve) {
  console.log('glob1_promise');
  resolve();
}).then(function () {
  console.log('glob1_then');
});

setTimeout(function () {
  console.log('timeout2');
  process.nextTick(function () {
    console.log('timeout2_nextTick');
  });
  new Promise(function (resolve) {
    console.log('timeout2_promise');
    resolve();
  }).then(function () {
    console.log('timeout2_then');
  });
});

process.nextTick(function () {
  console.log('glob2_nextTick');
});

new Promise(function (resolve) {
  console.log('glob2_promise');
  resolve();
}).then(function () {
  console.log('glob2_then');
});

setImmediate(function () {
  console.log('immediate2');
  process.nextTick(function () {
    console.log('immediate2_nextTick');
  });
  new Promise(function (resolve) {
    console.log('immediate2_promise');
    resolve();
  }).then(function () {
    console.log('immediate2_then');
  });
});

console.log('script end');

async1();

/*
golb1
script start
promise1
glob1_promise
glob2_promise
script end
async1 start
async2
glob1_nextTick
glob2_nextTick
promise2
glob1_then
glob2_then
async1 end
timeout1
timeout1_promise
timeout1_nextTick
timeout1_then
setTimeout
timeout2
timeout2_promise
timeout2_nextTick
timeout2_then
immediate1
immediate1_promise
immediate1_nextTick
immediate1_then
immediate2
immediate2_promise
immediate2_nextTick
immediate2_then
*/
```

```js
// 练习题
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
});

promise.then(() => {
  console.log(3);
});

console.log(4);

// 1243

const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve(5);
  console.log(2);
}).then((val) => {
  console.log(val);
});

promise.then(() => {
  console.log(3);
});

console.log(4);

setTimeout(function () {
  console.log(6);
});

// 124536
```
