[TOC]

## map 方法

第一个参数是回调函数，第二个参数是回调函数指向的 this

## 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

```js
[102, 15, 22, 29, 3, 8];
```

解析：默认的排序方法会将数组元素转换为字符串，然后比较字符串中字符的 UTF-16 编码顺序来进行排序。所以`'102'` 会排在 `'15'` 前面。

## JS 判断数组中是否包含某个值

1. array.indexOf()
2. array.findIndex()
3. array.find()
4. array.includes()

## 数组扁平化

**1.ES6 的 flat()**

```js
const arr = [1, [1, 2], [1, 2, 3]];
arr.flat(Infinity); // [1, 1, 2, 1, 2, 3]
```

**2.序列化后正则**

```js
const arr = [1, [1, 2], [1, 2, 3]];
const str = `[${JSON.stringify(arr).replace(/(\[|\])/g, '')}]`;
JSON.parse(str); // [1, 1, 2, 1, 2, 3]
```

**3.递归** 对于树状结构的数据，最直接的处理方式就是递归

```js
const arr = [1, [1, 2], [1, 2, 3]];
function flat(arr) {
  let result = [];
  for (const item of arr) {
    item instanceof Array ? (result = result.concat(flat(item))) : result.push(item);
  }
  return result;
}

flat(arr); // [1, 1, 2, 1, 2, 3]
```

**4.reduce()递归**

```js
const arr = [1, [1, 2], [1, 2, 3]];
function flat(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(cur instanceof Array ? flat(cur) : cur);
  }, []);
}

flat(arr); // [1, 1, 2, 1, 2, 3]
```

**5.迭代+展开运算符**

```js
// 每次while都会合并一层的元素，这里第一次合并结果为[1, 1, 2, 1, 2, 3, [4,4,4]]
// 然后arr.some判定数组中是否存在数组，因为存在[4,4,4]，继续进入第二次循环进行合并
let arr = [1, [1, 2], [1, 2, 3, [4, 4, 4]]];
while (arr.some(Array.isArray)) {
  arr = [].concat(...arr);
}

console.log(arr); // [1, 1, 2, 1, 2, 3, 4, 4, 4]
```

## 数组去重

ES5

```js
function unique(arry) {
  const temp = [];
  arry.forEach(function (item) {
    if (temp.indexOf(item) == -1) {
      temp.push(item);
    }
  });

  return temp;
}
```

ES6

```js
function unique(arry) {
  return Array.from(new Set(arry));
}
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

## 字符串和数组的关系

在很大程度上，可以将字符串看成字符串数组，

都有 length 属性

都有 concat() / indexOf() / includes() / slice() 方法

不过值得注意的是， string 上没有方法可以原地修改它自身的内容，都是返回新的 string

string 还有个 repeat() 方法，创建指定数量的字符串副本

## forEach 中 return 有效果吗？如何中断 forEach 循环？

在 forEach 中用 return 不会返回，函数会继续执行。

中断方法：

1. 使用 try 监视代码块，在需要中断的地方抛出异常。
2. 官方推荐方法（替换方法）：用 every 和 some 替代 forEach 函数。every 在碰到 return false 的时候，中止循环。some 在碰到 return ture 的时候，中止循环

## arguments 是什么？如何转化成数组？

arguments 是一个对象，是 Iterator 对象

类数组对象，就是含 length 的对象

- ES6 展开运算符

  仅可将可迭代对象转成数组，必须具有[Symbol.Iterator]

  ```js
  [...arguments];
  ```

  一切以数组为输入，以数组为输出的 API 都可以做数组转换。但是一切以类数组作为 this 的方法都会返回稀疏数组，而将类数组作为 arguments 的方法都会返回正常的数据，所以靠谱方式有

- Array.from()

  可以将类数组对象（可特殊仅包含一个 length）和可迭代对象转成数组

  ```js
  Array.from(arguments);
  ```

- ```js
  Array.apply(null, arguments);
  ```

- ```js
  Array.prototype.concat.apply([], arguments);
  ```

  生成指定长度数组的几种方法，一切以数组为输入，以数组为输出的 API 都可以

```js
[...new Array(12)]

[...Array(12)]

Array.from({ length : 12 })

Array.apply(null, arrayLike)
Array.prototype.concat.apply([], arrayLike)
Array.prototype.slice.call(arrayLike)
Array.prototype.map.call(arrayLike, x => x)
Array.prototype.filter.call(arrayLike, x => 1)
```

## 都有哪些是 iterator 对象

这些对象都有默认的迭代器，即具有 Symbol.iterator 属性，

判断对象是否是 iterator 对象

> ```js
> typeof obj[Symbol.iterator] === 'function';
> ```

- Array
- Map (WeakMap 不是 iterator 对象)
- Set (WeakSet 不是 iterator 对象)
- String
- 函数的 arguments 对象
- `document.getElementsByTagName("div")` 返回的是可迭代对象但不是一个数组
  - `Array.isArray(document.getElementsByTagName('div'))` 返回 false
- 所有通过 Generator（生成器）创建的迭代器都是可迭代对象

## for...in 和 for...of 的区别

对于普通的对象，`for...in`循环可以遍历对象键名，`for...of`循环会报错，必须对其部署 Iterator 接口。对于普通的数组对象，for...in 遍历键名，for...of 遍历键值。

**`for...in`语句**以任意顺序遍历一个对象的除 Symbol 以外的可枚举属性，包括原型上的属性。

`for...in`循环有几个缺点。

- 数组的键名是数字，但是`for...in`循环是以字符串作为键名“0”、“1”、“2”等等。
- `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，`for...in`循环会以任意顺序遍历键名

`for...of`循环相比上面几种做法，其内部调用的是数据结构的`Symbol.iterator`方法。

- 有着同`for...in`一样的简洁语法，但是没有`for...in`那些缺点。
- 不同于`forEach`方法，它可以与`break`、`continue`和`return`配合使用。
- 提供了遍历所有数据结构的统一操作接口。

遍历器是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。

Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

原生具备 Iterator 接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

## Generator 函数

执行 Generator 函数会返回一个遍历器对象，也就说，Generator 函数除了状态机，还是一个遍历器对象生成函数，返回的遍历器对象（也可叫内部指针）。

换言之，`next`方法的作用是分阶段执行`Generator`函数。每次调用`next`方法，会返回一个对象，表示当前阶段的信息（`value`属性和`done`属性）。`value`属性是`yield`语句后面表达式的值，表示当前阶段的值；`done`属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。

由于 Generator 函数就是遍历器生成函数

```js
const generator = function* () {
  yield 1;
  yield 2;
  yield 3;
  return 4;
  // const x = yield 3 + 1;
  // return x;
  // 此时只会返回 3 + 1； 再next()时value为undefined
};

const a = generator();

console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());

// 在for...of循环中，一旦返回值中的done为true，则会停止，且不包含此对象
for (const v of a) {
  console.log(v);
}

const myIterable = {
  [Symbol.iterator]: generator,
};

console.log([...myIterable]); // [1, 2, 3]

// 遍历器对象在一次事件循环中只能遍历一次
console.log([...a]); // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  *[Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  },
};

for (let x of obj) {
  console.log(x);
}
// "hello"
// "world"
```

```js
function* gen(x) {
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next(); // { value: 3, done: false }
// 可作为参数传递给y进行返回
g.next(2); // { value: 2, done: true }
```

## in 操作符

```js
o = new Object();
o.prop = 'exists';

Object.prototype.name = 233;

console.log(o.hasOwnProperty('name'));

console.log('name' in o);
```

## 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组

已知如下数组：

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```js
Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);
```

## 数组里面有 10 万个数据，取第一个元素和第 10 万个元素的时间相差多少

数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)

JavaScript 没有真正意义上的数组，所有的数组其实是对象，其“索引”看起来是数字，其实会被转换成字符串，作为属性名（对象的 key）来使用。所以无论是取第 1 个还是取第 10 万个元素，都是用 key 精确查找哈希表的过程，其消耗时间大致相同。

得出结论：**消耗时间几乎一致，差异可以忽略不计**。
