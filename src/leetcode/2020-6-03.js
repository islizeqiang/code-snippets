// 队列实现栈效果

const MyStack = function () {
  this.queue1 = [];
  this.queue2 = [];
};

MyStack.prototype.push = function (x) {
  if (!this.queue2.length) this.queue1.push(x);
  else {
    // queue2 已经有值
    this.queue2.push(x);
    // 旧的栈顶移到 queue1 中
    this.queue1.push(this.queue2.shift());
  }
};

MyStack.prototype.transform = function () {
  while (this.queue1.length !== 1) {
    this.queue2.push(this.queue1.shift());
  }
  // queue2 保存了前面的元素
  // 让 queue1 和 queue2 交换
  // 现在queue1 包含前面的元素，queue2 里面就只包含队尾的元素
  const tmp = this.queue1;
  this.queue1 = this.queue2;
  this.queue2 = tmp;
};

MyStack.prototype.pop = function () {
  if (!this.queue2.length) this.transform();
  return this.queue2.shift();
};

MyStack.prototype.top = function () {
  if (!this.queue2.length) this.transform();
  return this.queue2[0];
};

MyStack.prototype.empty = function () {
  return !this.queue1.length && !this.queue2.length;
};

const stack = new MyStack();

console.log('stack: ', stack);

stack.push(1);
console.log('stack: ', stack);

stack.push(2);
console.log('stack: ', stack);

// stack.peek(); // 返回 1
// console.log('stack: ', stack);

const x = stack.pop(); // 返回 1
console.log('x: ', x);
console.log('stack: ', stack);

stack.empty();
console.log('stack: ', stack);
