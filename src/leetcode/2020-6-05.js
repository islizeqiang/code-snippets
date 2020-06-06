// 合并两个有序数组

/**
 * 输入:
    nums1 = [1,2,3,0,0,0], m = 3
    nums2 = [2,5,6],       n = 3

    输出: [1,2,2,3,5,6]
 */

const merge = (nums1, m, nums2, n) => {
  const num = [...nums1];
  let len1 = m - 1;
  let len2 = n - 1;
  let len = m + n - 1;

  while (len2 >= 0) {
    if (len1 >= 0) {
      if (num[len1] >= nums2[len2]) {
        num[len] = num[len1];
        len1 -= 1;
        len -= 1;
      } else {
        num[len] = nums2[len2];
        len2 -= 1;
        len -= 1;
      }
    } else {
      num[len] = nums2[len2];
      len -= 1;
      len2 -= 1;
    }
  }

  return num;
};

console.log(merge);

const merge1 = (arr1, m, arr2, n) => {
  const arr = [...arr1];

  let index1 = m - 1;
  let index2 = n - 1;
  let index = m + n - 1;

  while (index2 >= 0) {
    if (index1 >= 0 && arr1[index1] >= arr2[index2]) {
      arr[index] = arr1[index1];
      index1 -= 1;
      index -= 1;
    } else {
      arr[index] = arr2[index2];
      index2 -= 1;
      index -= 1;
    }
    // if (index1 >= 0) {
    //   if (arr1[index1] >= arr2[index2]) {
    //     arr[index] = arr1[index1];
    //     index1 -= 1;
    //     index -= 1;
    //   } else {
    //     arr[index] = arr2[index2];
    //     index2 -= 1;
    //     index -= 1;
    //   }
    // } else {
    //   arr[index] = arr2[index2];
    //   index2 -= 1;
    //   index -= 1;
    // }
  }

  return arr;
};

const nums1 = [2, 3, 0, 0, 0];
const m = 2;

const nums2 = [2, 5, 6];
const n = 3;

const newValue = merge1(nums1, m, nums2, n);

console.log('newValue: ', newValue);
