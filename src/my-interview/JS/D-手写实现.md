[TOC]

## 手写一个 const

```js
function _const(key, value) {
  const desc = {
    value,
    writable: false,
  };
  Object.defineProperty(window, key, desc);
}

_const('obj', { a: 1 }); //定义obj
obj.b = 2; //可以正常给obj的属性赋值
obj = {}; //无法赋值新对象
```

## 手写一个 let

```js
(function () {
  for (var i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4
  }
})();

console.log(i); // Uncaught ReferenceError: i is not defined
```

## 手写一个 new

1. 新生成了一个对象
2. 链接到原型
3. 绑定 this
4. 返回新对象

```js
// 箭头函数
const _new = (fn, ...rest) => {
  if (typeof fn !== 'function') {
    throw 'newOperator function the first param must be a function';
  }
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, rest);
  return result instanceof Object ? result : obj;
};

// arguments实现
const _new1 = function () {
  const constructor = Array.prototype.shift.call(arguments);
  if (typeof constructor !== 'function') {
    throw 'newOperator function the first param must be a function';
  }
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, [...arguments]);
  return result instanceof Object ? result : obj;
};

function a(name) {
  this.xx = name;
}

const xxx = _new(a, 23);
console.log('xxx: ', xxx);
```

## 手写一个 bind

```js
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }

  const self = this;

  const Fnop = function () {};

  const fBound = function (...args1) {
    return self.apply(this instanceof Fnop ? this : context, [...args, ...args1]);
  };

  Fnop.prototype = this.prototype;
  fBound.prototype = new Fnop();
  return fBound;
};
```

## 手写一个 call

```js
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('error');
  }

  const globalObj = typeof window === 'undefined' ? global : window;

  const obj = context || globalObj;
  obj.fn = this;
  const result = obj.fn(...args);
  delete obj.fn;
  return result;
};
```

## 手写一个 apply

```js
Function.prototype.myApply = function (context, args) {
  if (typeof this !== 'function') {
    throw new Error('error');
  }

  const globalObj = typeof window === 'undefined' ? global : window;
  const obj = context || globalObj;

  obj.fn = this;
  let result;
  if (args) {
    result = obj.fn(...args);
  } else {
    result = obj.fn();
  }
  delete obj.fn;

  return result;
};
```

## 手写一个 instanceof

![img](https://pic1.zhimg.com/80/v2-330ec703451af6c71b641b8ba16741c8_720w.jpg)

```js
const myInstanceof = (value, constructor) => {
  if (typeof value !== 'object' || value === null) return false;
  const lastPrototype = constructor.prototype;

  let nowPrototype = Object.getPrototypeOf(value);
  // let nowPrototype = value.__proto__;

  while (true) {
    if (nowPrototype === null || nowPrototype === undefined) return false;
    if (nowPrototype === lastPrototype) return true;
    nowPrototype = Object.getPrototypeOf(nowPrototype);
    // nowPrototype = nowPrototype.__proto__;
  }
};

console.log(myInstanceof('111', String)); // false
console.log(myInstanceof(new String('111'), String)); // true

const Person = function () {};
const p1 = new Person();
console.log('p233 : ', myInstanceof(p1, Person));
console.log('p23113 : ', myInstanceof(p1, Object));
```



## 手写一个 Object.is

Object 在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0 和-0，NaN 和 NaN。

```js
function is(x, y) {
  if (x === y) {
    //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
    //两个都是NaN的时候返回true
    return x !== x && y !== y;
  }
}
```



## 手写一个节流

```js
const throttle = (fn, interval) => {
  let last = 0;
  return (...args) => {
    const now = +new Date();
    // 还没到时间
    if (now - last < interval) return;
    last = now;
    fn.apply(this, args);
  };
};
```



## 手写一个防抖

```js
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
```



## 手写一个 Promise

```js
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class MyPromise1 {
  constructor(fn) {
    this.state = PENDING;
    this.value = null;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    try {
      fn(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  resolve = (value) => {
    if (this.state === PENDING) {
      this.state = RESOLVED;
      this.value = value;
      this.resolvedCallbacks.map((cb) => cb(this.value));
    }
  };

  reject = (value) => {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.value = value;
      this.rejectedCallbacks.map((cb) => cb(this.value));
    }
  };

  then = (onFulfilled, onRejected) => {
    const onFulfilledFunc = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    const onRejectedFunc =
      typeof onRejected === 'function'
        ? onRejected
        : (r) => {
            throw r;
          };

    if (this.state === PENDING) {
      this.resolvedCallbacks.push(onFulfilledFunc);
      this.rejectedCallbacks.push(onRejectedFunc);
    }

    if (this.state === RESOLVED) {
      onFulfilled(this.value);
    }

    if (this.state === REJECTED) {
      onRejectedFunc(this.value);
    }
  };
}

new MyPromise1((resolve) => {
  resolve(1);
  // setTimeout(() => {
  //   resolve(1);
  // }, 1000);
}).then((value) => {
  console.log(value);
});
```



## 手写一个 Promise.resolve

实现要点

- 传参为一个 Promise, 则直接返回它。
- 传参为一个 thenable 对象，返回的 Promise 会跟随这个对象，`采用它的最终状态`作为`自己的状态`。
- 其他情况，直接返回以该值为成功状态的 promise 对象。

```js
Promise.resolve = (params) => {
  if (params instanceof Promise) return params;
  return new Promise((reslove, reject) => {
    if (params && params.then && typeof params.then === 'function') {
      params.then(reslove, reject);
    } else {
      reslove(params);
    }
  });
};
```



## 手写一个 Promise.reject

返回一个带有拒绝原因的 Promise 对象

```js
Promise.reject = (reason) => {
  return new Promise((reslove, reject) => {
    reject(reason);
  });
};
```



## 手写一个 Promise.finally

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason;
      }),
  );
};
```



## 手写一个 Promise.all

```js
Promise._all = (list) => {
  return new Promise((resolve, reject) => {
    let resValues = [];
    let counts = 0;
    for (let [i, p] of list) {
      resolve(p).then(
        (res) => {
          counts++;
          resValues[i] = res;
          if (counts === list.length) {
            resolve(resValues);
          }
        },
        (err) => {
          reject(err);
        },
      );
    }
  });
};
```

## 手写一个 Promise.race

```js
Promise._race = (promises) =>
  new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, reject);
    });
  });
```

## 手写一个 async await

```js
const asyncToGen = (genFunction) => {
  return (...args) => {
    const gen = genFunction.apply(this, args);
    return new Promise((resolve, reject) => {
      const step = (key, arg) => {
        let genResult;
        try {
          genResult = gen[key](arg);
        } catch (err) {
          return reject(err);
        }

        const { value, done } = genResult;

        if (done) {
          return resolve(value);
        }

        return Promise.resolve(value).then(
          (val) => {
            step('next', val);
          },
          (err) => {
            step('throw', err);
          },
        );
      };

      step('next');
    });
  };
};

const getData = (n) => new Promise((resolve) => setTimeout(() => resolve(`data${n}`), 1000));

function* testG() {
  const data = yield getData(1);
  console.log('data1: ', data);
  const data2 = yield getData(2);
  console.log('data2: ', data2);
  return 'success';
}

async function test() {
  const data = await getData();
  console.log('data3: ', data);
  const data2 = await getData();
  console.log('data4: ', data2);
  return 'success';
}

asyncToGen(testG)().then(console.log);

test().then(console.log);

function* foo(x) {
  const y = 2 * (yield x + 1);
  const z = yield y / 3;
  return x + y + z;
}

asyncToGen(foo)(5).then(console.log);

const a = foo(5);

console.log('a.next(): ', a.next());
console.log('a.next(): ', a.next());
console.log('a.next(): ', a.next());
```

## 手写一个数组 map 方法

```js
Array.prototype.map = function (callbackFn, thisArg) {
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) != '[object Function]') {
    throw new TypeError(callbackfn + ' is not a function');
  }
  // 草案中提到要先转换为对象
  let O = Object(this);
  let T = thisArg;

  let len = O.length >>> 0;
  let A = new Array(len);
  for (let k = 0; k < len; k++) {
    // 还记得原型链那一节提到的 in 吗？in 表示在原型链查找
    // 如果用 hasOwnProperty 是有问题的，它只能找私有属性
    if (k in O) {
      let kValue = O[k];
      // 依次传入this, 当前项，当前索引，整个数组
      let mappedValue = callbackfn.call(T, KValue, k, O);
      A[k] = mappedValue;
    }
  }
  return A;
};
```

## 手写一个数组 reduce 方法

```js
Array.prototype.reduce = function (callbackfn, initialValue) {
  // 异常处理，和 map 一样
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'reduce' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) != '[object Function]') {
    throw new TypeError(callbackfn + ' is not a function');
  }
  let O = Object(this);
  let len = O.length >>> 0;
  let k = 0;
  let accumulator = initialValue;
  if (accumulator === undefined) {
    for (; k < len; k++) {
      // 查找原型链
      if (k in O) {
        accumulator = O[k];
        k++;
        break;
      }
    }
    // 循环结束还没退出，就表示数组全为空
    throw new Error('Each element of the array is empty');
  }
  for (; k < len; k++) {
    if (k in O) {
      // 注意，核心！
      accumulator = callbackfn.call(undefined, accumulator, O[k], O);
    }
  }
  return accumulator;
};
```

## 手写一个数组 filter 方法

```js
Array.prototype.filter = function (callbackfn, thisArg) {
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'filter' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) != '[object Function]') {
    throw new TypeError(callbackfn + ' is not a function');
  }
  let O = Object(this);
  let len = O.length >>> 0;
  let resLen = 0;
  let res = [];
  for (let i = 0; i < len; i++) {
    if (i in O) {
      let element = O[i];
      if (callbackfn.call(thisArg, O[i], i, O)) {
        res[resLen++] = element;
      }
    }
  }
  return res;
};
```

## 手写一个数组的 push、pop 方法

```js
Array.prototype.push = function (...items) {
  let O = Object(this);
  let len = this.length >>> 0;
  let argCount = items.length >>> 0;
  // 2 ** 53 - 1 为JS能表示的最大正整数
  if (len + argCount > 2 ** 53 - 1) {
    throw new TypeError('The number of array is over the max value restricted!');
  }
  for (let i = 0; i < argCount; i++) {
    O[len + i] = items[i];
  }
  let newLength = len + argCount;
  O.length = newLength;
  return newLength;
};
```

```js
Array.prototype.pop = function () {
  let O = Object(this);
  let len = this.length >>> 0;
  if (len === 0) {
    O.length = 0;
    return undefined;
  }
  len--;
  let value = O[len];
  delete O[len];
  O.length = len;
  return value;
};
```
