// 编写一个函数计算多个数组的交集;
const a = (...args) => {
  if (!args.length) {
    return [];
  }
  const value = args.reduce((acc, cur) => acc.filter((item) => cur.includes(item)));

  return [...new Set(value)];
};

const x = a([3, 2, 5], [3, 6, 8]);
const y = a([3, 3, 5]);

console.log('x: ', x);
console.log('y: ', y);
