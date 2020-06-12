/* eslint-disable */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  let arr = [];
  let traverse = (root) => {
    if (root == null) return;
    arr.push(root.val);
    traverse(root.left);
    traverse(root.right);
  };
  traverse(root);
  return arr;
};

console.log(preorderTraversal([[1, null, 2, 3]]));
