// 取字符串最后一个/后面字符
// 参考 https://stackoverflow.com/questions/8376525/get-value-of-a-string-after-a-slash-in-javascript

const result = /[^/]*$/.exec('foo/bar/test.html')[0];

console.log(result);
