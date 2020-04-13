// 找出字符串中连续出现最多的字符和个数
// 'abcaakjbb' => {'a':2,'b':2}
// 'abbkejsbcccwqaa' => {'c':3}

const str = 'abcaakjbb';

const arr = str.match(/(\w)\1*/g);
const maxLen = Math.max(...arr.map((s) => s.length));
const result = arr.reduce((acc, curr) => {
  if (curr.length === maxLen) {
    acc[curr[0]] = curr.length;
  }
  return acc;
}, {});

console.log(result);

'aaasdofjaopfjopaiiisjssfopiasdfffff'.match(/(.)\1+/g);
