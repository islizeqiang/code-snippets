const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(source);

console.log(target === returnedTarget);

// const x = { ...target, ...source };
// console.log('source: ', source);
// console.log('target: ', target);

// console.log(x);
