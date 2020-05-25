/* eslint-disable */

// 两数之和实现 哈希表实现方案
const two = () => {
  const num = [2, 2, 3, 8, 9, 7, 11, 15];
  const target = 9;

  // 最好的哈希表实现方式 时间复杂度O(n)
  const test = (list, sum) => {
    const map = {};
    for (let i = 0, len = list.length; i < len; i += 1) {
      const value = list[i];
      if (map[value] === undefined) {
        const pairedValue = sum - value;
        map[pairedValue] = i;
      } else {
        return [map[value], i];
      }
    }
    return new Error('该数组未含有符合条件的两项');
  };

  // es6 方式 循环多次
  const test1 = (list, sum) => {
    const map = list.reduce((acc, cur, index) => {
      acc[sum - cur] = index;
      return acc;
    }, {});
    const selectedItem = list.find((item) => map[item]);
    return [list.findIndex((item) => item === selectedItem), map[selectedItem]];
  };

  // forEach 方式 会做无用的循环次数
  const test2 = (list, sum) => {
    const map = {};
    let a = [];
    list.forEach((item, index) => {
      if (map[item] !== undefined) {
        a = [map[item], index];
      }
      const pairedValue = sum - item;
      map[pairedValue] = index;
      return new Error('该数组未含有符合条件的两项');
    });
    return a;
  };

  const result = test(num, target);

  console.log('result: ', result);
};

// two();

// 三数之和
const three = () => {
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  const threeSum = (nums) => {
    // 首先要排序
    nums.sort((a, b) => a - b);
    const res = [];
    // 优化1: 数组全正或全负，直接返回[]
    if (nums[0] > 0 || nums[nums.length - 1] < 0) return [];

    for (let i = 0, len = nums.length; i < len; i += 1) {
      // 优化2: 遇到正数，后面不用看了，不会有等于0的情况了
      if (nums[i] > 0) break;

      if (i >= 1 && nums[i] === nums[i - 1]) {
        continue;
      }
      const target = 0 - nums[i];

      let start = i + 1;
      let end = nums.length - 1;

      // 开始双指针处理
      while (start < end) {
        const cur = nums[start] + nums[end];
        if (cur < target) start += 1;
        else if (cur > target) end -= 1;
        else {
          res.push([nums[i], nums[start], nums[end]]);
          // 去重，非常重要
          while (start < end && nums[start + 1] === nums[start]) start += 1;
          while (start < end && nums[end - 1] === nums[end]) end -= 1;
          start += 1;
          end -= 1;
        }
      }
    }

    return res;
  };

  const x = [-1, 0, 1, 2, -1, -1, 2, 2, -4];

  const a = threeSum(x);

  console.log('a: ', a);

  // const ax = x.sort((a, b) => a - b);
  // console.log('x: ', x);
  // console.log('ax: ', ax);
  // console.log(ax === x);
};

three();
