// 栈实现队列效果
class MyQueue1 {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  push = (x) => {
    this.stack1.push(x);
  };

  transform = () => {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop());
    }
  };

  pop = () => {
    if (!this.stack2.length) this.transform();
    return this.stack2.pop();
  };

  peek = () => {
    if (!this.stack2.length) this.transform();
    return this.stack2[this.stack2.length - 1];
  };

  empty = () => {
    return !this.stack1.length && !this.stack2.length;
  };
}

const queue = new MyQueue1();

console.log('queue: ', queue);

queue.push(1);
console.log('queue: ', queue);

queue.push(2);
console.log('queue: ', queue);

queue.peek(); // 返回 1
console.log('queue: ', queue);

queue.pop(); // 返回 1
console.log('queue: ', queue);

queue.empty();
console.log('queue: ', queue);
