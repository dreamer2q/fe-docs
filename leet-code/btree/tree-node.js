export class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * 后序遍历
 * @param {TreeNode} tree
 * @param {function(TreeNode)} cb
 * @returns {void}
 */
export function visitPostorder(tree, cb) {
  if (tree == null) {
    return;
  }

  visitPostorder(tree.left, cb);
  visitPostorder(tree.right, cb);

  if (typeof cb === "function") {
    cb(tree);
  }
}
