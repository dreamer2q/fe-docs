import { TreeNode } from "./tree-node.js";

/**
 * 翻转二叉树
 * @param {TreeNode} tree
 */
function invertBinaryTree(tree) {
  if (tree == null) {
    return;
  }
  let node = tree.left;
  tree.left =  tree.right;
  tree.right = node;
  invertBinaryTree(tree.left);
  invertBinaryTree(tree.right);
}


