[TOC]

## 原型、构造函数、实例、原型链

![img](https://pic3.zhimg.com/80/v2-a6b2ab6b93f5b72cee707e2d3ea327e2_720w.jpg)

[![project](http://47.98.159.95/my_blog/017/2.jpg)](http://47.98.159.95/my_blog/017/2.jpg)

特点：

- 构造函数.prototype.constructor === 构造函数
- 构造函数.prototype === 实例对象.`__proto__`

小提示：

- Object.getPrototypeOf(对象)可以取到此对象的原型

- 使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true

## 类的声明和实例化

声明类有两种方法：

```js
function Animal(name) {
  this.name = name;
}

class Animal2 {
  constructor(name) {
    this.name = name;
  }
}
```

类的实例化只有一种方式

```js
var a1 = new Animal('shape');
var a2 = new Animal2('cat');
```

## ES5 如何实现继承

说到继承，最容易想到的是 ES6 的`extends`，当然如果只回答这个肯定不合格，我们要从函数和原型链的角度上实现继承，下面我们一步步地、递进地实现一个合格的继承

- 原型链继承

原型链继承的原理很简单，直接让子类的原型对象指向父类实例，当子类实例找不到对应的属性和方法时，就会往它的原型对象，也就是父类实例上找，从而实现对父类的属性和方法的继承

```js
// 父类
function Parent() {
  this.name = '写代码像蔡徐抻';
}
// 父类的原型方法
Parent.prototype.getName = function () {
  return this.name;
};
// 子类
function Child() {}

// 让子类的原型对象指向父类实例, 这样一来在Child实例中找不到的属性和方法就会到原型对象(父类实例)上寻找
Child.prototype = new Parent();
Child.prototype.constructor = Child; // 根据原型链的规则,顺便绑定一下constructor, 这一步不影响继承, 只是在用到constructor时会需要

// 然后Child实例就能访问到父类及其原型上的name属性和getName()方法
const child = new Child();
child.name; // '写代码像蔡徐抻'
child.getName(); // '写代码像蔡徐抻'
```

缺点:

1. 由于所有 Child 实例原型都指向同一个 Parent 实例, 因此对某个 Child 实例的父类引用类型变量修改会影响所有的 Child 实例
2. 在创建子类实例时无法向父类构造传参, 即没有实现`super()`的功能构造函数继承

- 构造函数继承

即在子类的构造函数中执行父类的构造函数，并为其绑定子类的`this`，让父类的构造函数把成员属性和方法都挂到`子类的this`上去，这样既能避免实例之间共享一个原型实例，又能向父类构造方法传参

```js
function Parent(name) {
  this.name = [name];
}
Parent.prototype.getName = function () {
  return this.name;
};
function Child() {
  Parent.call(this, 'zhangsan'); // 执行父类构造方法并绑定子类的this, 使得父类中的属性能够赋到子类的this上
}

//测试
const child1 = new Child();
const child2 = new Child();
child1.name[0] = 'foo';
console.log(child1.name); // ['foo']
console.log(child2.name); // ['zhangsan']
child2.getName(); // 报错,找不到getName(), 构造函数继承的方式继承不到父类原型上的属性和方法
```

缺点: 继承不到父类原型上的属性和方法

- 组合式继承

既然原型链继承和构造函数继承各有互补的优缺点, 那么我们为什么不组合起来使用呢, 所以就有了综合二者的组合式继承

```js
function Parent(name) {
  this.name = [name];
}
Parent.prototype.getName = function () {
  return this.name;
};
function Child() {
  // 构造函数继承
  Parent.call(this, 'zhangsan');
}
//原型链继承
Child.prototype = new Parent();
Child.prototype.constructor = Child;

//测试
const child1 = new Child();
const child2 = new Child();
child1.name[0] = 'foo';
console.log(child1.name); // ['foo']
console.log(child2.name); // ['zhangsan']
child2.getName(); // ['zhangsan']
```

缺点:

1. 每次创建子类实例都执行了两次构造函数(`Parent.call()`和`new Parent()`)，虽然这并不影响对父类的继承，但子类创建实例时，原型中会存在两份相同的属性和方法，这并不优雅

- 寄生式组合继承

为了解决构造函数被执行两次的问题, 我们将`指向父类实例`改为`指向父类原型`, 减去一次构造函数的执行

```js
function Parent(name) {
  this.name = [name];
}
Parent.prototype.getName = function () {
  return this.name;
};
function Child() {
  // 构造函数继承
  Parent.call(this, 'zhangsan');
}
//原型链继承
// Child.prototype = new Parent()
Child.prototype = Parent.prototype; //将`指向父类实例`改为`指向父类原型`
Child.prototype.constructor = Child;

//测试
const child1 = new Child();
const child2 = new Child();
child1.name[0] = 'foo';
console.log(child1.name); // ['foo']
console.log(child2.name); // ['zhangsan']
child2.getName(); // ['zhangsan']
```

但这种方式存在一个问题，由于子类原型和父类原型指向同一个对象，我们对子类原型的操作会影响到父类原型，例如给`Child.prototype`增加一个 getName()方法，那么会导致`Parent.prototype`也增加或被覆盖一个 getName()方法，为了解决这个问题，我们给`Parent.prototype`做一个浅拷贝

```js
function Parent(name) {
  this.name = [name];
}
Parent.prototype.getName = function () {
  return this.name;
};
function Child() {
  // 构造函数继承
  Parent.call(this, 'zhangsan');
}
//原型链继承
// Child.prototype = new Parent()
Child.prototype = Object.create(Parent.prototype); //将`指向父类实例`改为`指向父类原型`
Child.prototype.constructor = Child;

//测试
const child = new Child();
const parent = new Parent();
child.getName(); // ['zhangsan']
parent.getName(); // 报错, 找不到getName()
```

到这里我们就完成了 ES5 环境下的继承的实现，这种继承方式称为`寄生组合式继承`，是目前最成熟的继承方式，babel 对 ES6 继承的转化也是使用了寄生组合式继承

我们回顾一下实现过程： 一开始最容易想到的是`原型链继承`，通过把子类实例的原型指向父类实例来继承父类的属性和方法，但原型链继承的缺陷在于`对子类实例继承的引用类型的修改会影响到所有的实例对象`以及`无法向父类的构造方法传参`。 因此我们引入了`构造函数继承`, 通过在子类构造函数中调用父类构造函数并传入子类 this 来获取父类的属性和方法，但构造函数继承也存在缺陷，构造函数继承`不能继承到父类原型链上的属性和方法`。 所以我们综合了两种继承的优点，提出了`组合式继承`，但组合式继承也引入了新的问题，它`每次创建子类实例都执行了两次父类构造方法`，我们通过将`子类原型指向父类实例`改为`子类原型指向父类原型的浅拷贝`来解决这一问题，也就是最终实现 —— `寄生组合式继承
