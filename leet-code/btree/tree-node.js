export class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * 前序遍历
 * @param {TreeNode} tree
 * @param {function(TreeNode)} cb
 * @returns {void}
 */
export function visitPreorder(tree, cb) {
  if (tree == null) {
    return;
  }

  if (typeof cb === "function") {
    cb(tree);
  }
  visitPreorder(tree.left, cb);
  visitPreorder(tree.right, cb);
}

/**
 * 中序遍历
 * @param {TreeNode} tree
 * @param {function(TreeNode)} cb
 * @returns {void}
 */
export function visitInorder(tree, cb) {
  if (tree == null) {
    return;
  }
  visitInorder(tree.left, cb);
  if (typeof cb === "function") {
    cb(tree);
  }
  visitInorder(tree.right, cb);
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
