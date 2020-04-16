/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  const stack = [];
  const mapper = {
    '{': '}',
    '[': ']',
    '(': ')',
  };

  for (const i in s) {
    const v = s[i];
    if (['(', '[', '{'].indexOf(v) > -1) {
      stack.push(v);
    } else {
      const peak = stack.pop();
      if (v !== mapper[peak]) {
        return false;
      }
    }
  }

  if (stack.length > 0) return false;

  return true;
};

console.log(isValid('([])'));

console.log('([])'.split(''));
