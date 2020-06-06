// const x = [1, 2, 2, 3, 4, 9];
// const y = [2, 2, 3, 5, 8, 9];

// const intersection = (arr1, arr2) => [...new Set(arr1.filter((item) => arr2.includes(item)))];

// const result = intersection(x, y);

// console.log(result);

// const LRUCache = function (capacity) {
//   this.cache = new Map();
//   this.capacity = capacity;
// };

// LRUCache.prototype.get = function (key) {
//   if (this.cache.has(key)) {
//     // 存在即更新
//     const temp = this.cache.get(key);
//     this.cache.delete(key);
//     this.cache.set(key, temp);
//     return temp;
//   }
//   return -1;
// };

// LRUCache.prototype.put = function (key, value) {
//   if (this.cache.has(key)) {
//     // 存在即更新（删除后加入）
//     this.cache.delete(key);
//   } else if (this.cache.size >= this.capacity) {
//     // 不存在即加入
//     // 缓存超过最大值，则移除最近没有使用的
//     this.cache.delete(this.cache.keys().next().value);
//   }
//   this.cache.set(key, value);
// };

// /* 缓存容量 */
// const cache = new LRUCache(2);

// cache.put(1, 1);
// cache.put(2, 2);
// console.log('cache.get(1): ', cache.get(1)); // 返回  1
// cache.put(3, 3); // 该操作会使得密钥 2 作废
// console.log('cache.get(2): ', cache.get(2)); // 返回 -1 (未找到)
// cache.put(4, 4); // 该操作会使得密钥 1 作废
// console.log('cache.get(1): ', cache.get(1)); // 返回 -1 (未找到)
// console.log('cache.get(3): ', cache.get(3)); // 返回  3
// console.log('cache.get(4): ', cache.get(4)); // 返回  4

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get = (key) => {
    if (!this.cache.has(key)) {
      return -1;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  };

  put = (key, value) => {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size === this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  };
}

/* 缓存容量 */
const cache = new LRUCache(3);

cache.put(1, 1);
cache.put(2, 2);
console.log('cache.get(1): ', cache.get(1)); // 返回  1
cache.put(2, 88);
cache.put(3, 3); // 该操作会使得密钥 2 作废
console.log('cache.get(2): ', cache.get(2)); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
console.log('cache.get(2): ', cache.get(2)); // 返回 -1 (未找到)
console.log('cache.get(3): ', cache.get(3)); // 返回  3
console.log('cache.get(4): ', cache.get(4)); // 返回  4
