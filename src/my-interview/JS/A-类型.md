[TOC]

## JS 原始数据类型有哪些？引用数据类型有哪些？

在 JS 中，存在着 6 种原始值，分别是：

- boolean
- null
- undefined
- number
- string
- symbol

引用数据类型:

- 普通对象-Object
- 数组对象-Array
- 函数对象-Function
- 正则对象-RegExp
- 日期对象-Date
- 数学函数-Math

## '1'.toString()为什么可以调用？

`boolean`、`string`和`number`类型作为基本类型，在使用 Object.prototype 上的方法时，会把这三种基本类型解析为包装对象，使其具有对应的方法。

```js
true.toString() // 'true'
`asdf`.toString(); // 'asdf'
NaN.toString(); // 'NaN'
// 注意：数字后面的第一个点会被解释为小数点，而不是点调用
(1).toString();
(1).toString()(1).toString();
```

## 判断是否是数组 Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()

结论：toString.call 和 isArray 的性能一样差，instanceof 稍好，constructor 性能最好

- Object.prototype.toString.call()

```js
Object.prototype.toString.call('An'); // "[object String]"
Object.prototype.toString.call(1); // "[object Number]"
Object.prototype.toString.call(Symbol(1)); // "[object Symbol]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(function () {}); // "[object Function]"
Object.prototype.toString.call({ name: 'An' }); // "[object Object]"
```

- instanceof

`instanceof` 的内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype`。

使用 `instanceof`判断一个对象是否为数组，`instanceof` 会判断这个对象的原型链上是否会找到对应的 `Array` 的原型，找到返回 `true`，否则返回 `false`。

```js
[] instanceof Array; // true
```

但 `instanceof` 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。

```javascript
[] instanceof Object; // true
```

- Array.isArray()

- arr.constructor === Array

```js
console.log(Object.prototype.toString.call([{ a: 23 }]));
console.log([{ a: 23 }].constructor === Array);
console.log({ a: 23 }.constructor === Array);
```

## type of 为什么对 null 错误的显示

这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。

## instanceof 和 type of 的区别

typeof 对于基本数据类型（null, undefined, string, number, boolean, symbol），除了 null 都会返回正确的类型。null 会返回 object。 typeof 对于对象类型，除了函数会返回 function，其他的都返回 object。如果我们想获得一个变量的正确类型，可以通过 `Object.prototype.toString.call(xx)`。这样我们就可以获得类似 `[object Type]` 的字符串。

判断是否等于 undefined 的方法：

```js
let a;
// 我们也可以这样判断 undefined
a === undefined;
// 所以可以用下面的方式来判断，并且代码量更少
// 因为 void 后面随便跟上一个组成表达式
// 返回就是 undefined  或者void(0)
a === void 0;
```

## instanceof 的原理

instanceof 用于判断一个引用类型是否属于某构造函数；还可以在继承关系中用来判断一个实例是否属于它的父类型。 instanceof 的原理是判断实例对象的 `__proto__` 是否与构造函数的 `prototype` 指向同一个引用（即同一个原型）

![img](https://pic1.zhimg.com/80/v2-330ec703451af6c71b641b8ba16741c8_720w.jpg)

只要在实例对象的原型链上的构造函数，instaceof 都会返回 true。看下图： obj3 是 M 的实例，所以 `obj3 instanceof M = true` ; 同时 `obj3 instanceof Object` 的结果也是 true

## 使用 instanceof 判断基础数据类型

```js
class myStr {
  static [Symbol.hasInstance](ins) {
    return typeof ins === 'string';
  }
}

console.log('23' instanceof myStr);
```

## == 和 ===有什么区别以及==的转换规则

- ===叫做严格相等，是指：左右两边不仅值要相等，类型也要相等，例如'1'===1 的结果是 false，因为一边是 string，另一边是 number。

- ==会涉及一些类型转换，它的转换规则有 5 条
  1. 两边的类型是否相同，相同的话就比较值的大小，例如 1==2，返回 false
  2. 判断的是否是 null 和 undefined，是的话就返回 true
  3. 判断的类型是否是 String 和 Number，是的话，把 String 类型转换成 Number，再进行比较
  4. 判断其中一方是否是 Boolean，是的话就把 Boolean 转换成 Number，再进行比较
  5. 如果其中一方为 Object，且另一方为 String、Number 或者 Symbol，会将 Object 转换成字符串，再进行比较，如果两个都是对象，则判断引用的指向

```js
console.log({ a: 1 } == true); //false
console.log({ a: 1 } == '[object Object]'); //true
```

## 如何判断数组与对象

```js
Array.isArray([]); // true

Array.isArray({}); // false

typeof []; // "object"

typeof {}; // "object"

Object.prototype == [].__proto__; // false

Object.prototype == {}.__proto__; // true

Array.prototype == [].__proto__; // true

Array.prototype == {}.__proto__; // false
```

## JS 中类型转换有哪几种？

类型转换只有三种：

- 转换成数字
- 转换成布尔值
- 转换成字符串

1. **转 Boolean**

在条件判断时，除了 `undefined`， `null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 `true`，包括所有对象。

2. **对象转原始类型**

对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下：

- 如果已经是原始类型了，那就不需要转换了
- 调用 `x.valueOf()`，如果转换为基础类型，就返回转换的值
- 调用 `x.toString()`，如果转换为基础类型，就返回转换的值
- 如果都没有返回原始类型，就会报错

当然你也可以重写 `Symbol.toPrimitive` ，该方法在转原始类型时调用优先级最高。

3. **四则运算符**

加法运算符不同于其他几个运算符，它有以下几个特点：

- 运算中其中一方为字符串，那么就会把另一方也转换为字符串
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

```js
1 + '1'; // '11'
true + true; // 2
4 + [1, 2, 3]; // "41,2,3"
```

如果你对于答案有疑问的话，请看解析：

- 对于第一行代码来说，触发特点一，所以将数字 `1` 转换为字符串，得到结果 `'11'`
- 对于第二行代码来说，触发特点二，所以将 `true` 转为数字 `1`
- 对于第三行代码来说，触发特点二，所以将数组通过 `toString` 转为字符串 `1,2,3`，得到结果 `41,2,3`

另外对于加法还需要注意这个表达式 `'a' + + 'b'`

```js
'a' + +'b'; // -> "aNaN"
```

因为 `+ 'b'` 等于 `NaN`，所以结果为 `"aNaN"`，你可能也会在一些代码中看到过 `+ '1'` 的形式来快速获取 `number` 类型。

那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字

```js
4 * '3'; // 12
4 * []; // 0
4 * [1, 2]; // NaN
```

4. **比较运算符**

- 如果是对象，就通过 `toPrimitive` 转换对象

- 如果是字符串，就通过 `unicode` 字符索引来比较

```js
let a = {
  valueOf() {
    return 0;
  },
  toString() {
    return '1';
  },
};

a > -1; // true
```

在以上代码中，因为 `a` 是对象，所以会通过 `valueOf` 转换为原始类型再比较值。

## 对象转原始类型是根据什么流程运行的？

对象转原始类型，会调用内置的[ToPrimitive]函数，对于该函数而言，其逻辑如下：

1. 如果 Symbol.toPrimitive()方法，优先调用再返回
2. 调用 valueOf()，如果转换为原始类型，则返回
3. 调用 toString()，如果转换为原始类型，则返回
4. 如果都没有返回原始类型，会报错

```js
var obj = {
  value: 3,
  [Symbol.toPrimitive]() {
    return 2;
  },
  valueOf: () => 4,
  toString: () => 5,
};
console.log(obj + 1); // 输出3
```

```js
let a = {
  valueOf() {
    return 0;
  },
  toString() {
    return '1';
  },
  [Symbol.toPrimitive]() {
    return 2;
  },
};
1 + a; // => 3
```

## 类型转换问题

1. [] == ![]

   == 中，左右两边都需要转换为数字然后进行比较。

   []转换为数字为 0。

   ![] 首先是转换为布尔值，由于[]作为一个引用类型转换为布尔值为 true, 因此![]为 false，进而在转换成数字，变为 0。

   0 == 0 ， 结果为 true

2.

```js
String('11') == new String('11');
String('11') === new String('11');
```

分析： new String() 返回的是对象

```js
// ==` 的时候，实际运行的是
String('11') == new String('11').toString();
```

## 如何让 if(a == 1 && a == 2)条件成立？

其实就是上一个问题的应用。

```js
var a = {
  value: 0,
  valueOf: function () {
    this.value++;
    return this.value;
  },
};
console.log(a == 1 && a == 2); //true
```

## 下面代码中 a 在什么情况下会打印 1？

> 题目如下

```js
var a = ?;
if (a == 1 && a == 2 && a == 3) {
 	console.log(1);
}
```

这个题目考察==的隐式转换吧

> 利用 toString

```js
let a = {
  i: 1,
  toString() {
    a.i += 1;
    return a.i - 1;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log('1');
}
```

> 利用 valueOf

```js
let a = {
  i: 1,
  valueOf() {
    a.i += 1;
    return a.i - 1;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log('1');
}
```

> ES6 的 symbol

```js
let a = { [Symbol.toPrimitive]: ((i) => () => ++i)(0) };
if (a == 1 && a == 2 && a == 3) {
  console.log('1');
}
```
