[TOC]

## 创建对象的几种方法

```js
//创建对象的几种方式
//1.字面量
var obj1 = { name: 'solo obj1' };
//2.new Object
var obj2 = new Object({ name: 'solo obj2' });
//3.构造函数创建
var M = function (name) {
  this.name = name;
};
var obj3 = new M('solo obj3');
//4.Object.create
var p = { name: 'p' };

var obj4 = Object.create(p);
```

## `a.b.c.d` 和 `a['b']['c']['d']` ，哪个性能更高？

应该是 `a.b.c.d` 比 `a['b']['c']['d']` 性能高点，后者还要考虑 `[ ]` 中是变量的情况，再者，从两种形式的结构来看，显然编译器解析前者要比后者容易些，自然也就快一点。

## 对象引用相关代码题

```js
// 这里把o改成a
// webSite引用地址的值copy给a了
function changeObjProperty(a) {
  // 改变对应地址内的对象属性值
  a.siteUrl = 'http://www.baidu.com';
  // 变量a指向新的地址 以后的变动和旧地址无关
  a = new Object();
  a.siteUrl = 'http://www.google.com';
  a.name = 456;
}
var webSite = new Object();
webSite.name = '123';
changeObjProperty(webSite);
console.log(webSite); // {name: 123, siteUrl: 'http://www.baidu.com'}
```

parseInt() 函数解析一个字符串参数，并返回一个指定基数的整数 (数学系统的基础)。

## 对象浅拷贝和深拷贝有什么区别

区别在于对引用数据数据类型是否仅仅拷贝了引用的地址，如果仅仅拷贝了引用地址，则是浅拷贝，如果是重新创建了一个新的对象，则是深拷贝。

## 浅拷贝的方式有几种

专属数组的浅拷贝

- slice

  ```js
  const arr = [1, 2, 3];
  const newArr = arr.slice();
  newArr[1] = 100;
  console.log(arr); //[ 1, 2, 3 ]
  ```

- concat

  ```js
  const arr = [1, 2, 3];
  const newArr = arr.concat();
  newArr[1] = 100;
  console.log(arr); //[ 1, 2, 3 ]
  ```

都可用的浅拷贝

- Object.assign（只会拷贝源对象自身的并且可枚举的属性到目标对象）

  ```js
  const obj = { name: 'sy', age: 18 };
  const obj2 = Object.assign({}, obj, { name: 'sss' });
  console.log(obj2); //{ name: 'sss', age: 18 }
  ```

- ...展开符

  ```js
  let arr = [1, 2, 3];
  let newArr = [...arr]; //跟arr.slice()是一样的效果
  ```

## 实现一个深拷贝

```js
JSON.parse(JSON.stringify());
```

这种方式会造成

- 无法解决循环引用的问题，拷贝时会报错
- 会忽略掉函数
- 会忽略掉 undefined
- 会忽略掉 Symbol
- 会将 RegExp, Set, Map 拷贝成空对象

推荐使用 lodash 的深拷贝函数

## Object 上的一些值得注意的方法

- **Object.prototype.hasOwnProperty(prop)**

  所有继承了 Object 的对象，用来监测一个对象是否含有特定的自身属性，会忽略原型链上继承的属性。

  ```js
  o = new Object();

  o.prop = 'exists';

  o.hasOwnProperty('prop'); *// 返回 true*

  o.hasOwnProperty('toString'); *// 返回 false*

  o.hasOwnProperty('hasOwnProperty'); *// 返回 false*

  ```

- **Object.create(proto[, propertiesObject])**

  第一个参数为新创建对象的原型对象，第二个参数可选，选定添加到新创建对象的不可枚举属性中（自身）。

  ```js
  var my_obj = Object.create(
    {},
    {
      getFoo: {
        value: function () {
          return this.foo;
        },
        // 可选择控制此属性是否可枚举 默认为 false
        // enumerable: false
      },
      // getFoo: function() { return this.foo; },
    },
  );
  ```

* **Object.defineProperties(obj, props)**

  直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

  ```js
  var obj = {};
  Object.defineProperties(obj, {
    property1: {
      value: true,
      writable: true,
    },
    property2: {
      value: 'Hello',
      writable: false,
    },
    // etc. etc.
  });
  ```

* **Object.defineProperty(obj, prop, descriptor)**

  Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

* **Object.getOwnPropertyNames()**

  返回一个给定元素自身属性对应的字符串数组，包括可枚举和不可枚举属性，但不包括 Symbol 值作为名称的属性

  ```js
  //不可枚举属性
  var my_obj = Object.create(
    {},
    {
      getFoo: {
        value: function () {
          return this.foo;
        },
        enumerable: false,
      },
    },
  );

  my_obj.foo = 1;

  console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]
  ```

- **Object.assign(target, ...sources)**

  Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

  与解构运算符...的区别在于，他会改变目标值，也就是 target，并且返回他。

- **Object.getPrototypeOf(object)**

  特别注意：Object.getPrototypeOf(Object) 不是 Object.prototype

  ```js
  // Object 是构造函数
  Object.getPrototypeOf(Object) === Function.prototype;
  ```

- **Object.prototype.toString.call()**

  每一个继承 Object 的对象都有 `toString` 方法，如果 `toString` 方法没有重写的话，会返回 `[Object type]`，其中 type 为对象的类型。

## Proxy 和 Object.defineProperty(obj, prop, descriptor)

> 涉及面试题：Proxy 可以实现什么功能？

如果你平时有关注 Vue 的进展的话，可能已经知道了在 Vue3.0 中将会通过 `Proxy` 来替换原本的 `Object.defineProperty` 来实现数据响应式。 Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。

```
let p = new Proxy(target, handler)
```

`target` 代表需要添加代理的对象，`handler` 用来自定义对象中的操作，比如可以用来自定义 `set` 或者 `get` 函数。

接下来我们通过 `Proxy` 来实现一个数据响应式

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value, property);
      return Reflect.set(target, property, value);
    },
  };
  return new Proxy(obj, handler);
};

let obj = { a: 1 };
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`);
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`);
  },
);
p.a = 2; // 监听到属性a改变
p.a; // 'a' = 2
```

在上述代码中，我们通过自定义 `set` 和 `get` 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知。

当然这是简单版的响应式实现，如果需要实现一个 Vue 中的响应式，需要我们在 `get` 中收集依赖，在 `set` 派发更新，之所以 Vue3.0 要使用 `Proxy` 替换原本的 API 原因在于 `Proxy` 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 `Proxy` 可以完美监听到任何方式的数据改变，唯一缺陷可能就是浏览器的兼容性不好了。
