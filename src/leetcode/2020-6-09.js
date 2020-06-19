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

const aPromise = new MyPromise1((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

aPromise.then((data) => {
  console.log('data: ', data);
  return 23;
});
// .then((value) => {
//   console.log('value', value);
// });
