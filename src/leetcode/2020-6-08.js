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
