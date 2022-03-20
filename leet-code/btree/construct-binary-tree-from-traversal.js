import { TreeNode, visitPostorder } from "./tree-node.js";
import { equals } from "../base/equals.js";

/**
 * 从 先序 和 中序 构建二叉树
 * @param {Array} preorder
 * @param {Array} inorder
 */
function buildTreeFromPreInOrder(preorder, inorder) {
  return buildFromPreInorder(
    preorder,
    0,
    preorder.length - 1,
    inorder,
    0,
    inorder.length - 1
  );
}

/**
 *
 * @param {Array} preorder
 * @param {Number} preleft
 * @param {Number} preright
 * @param {Array} inorder
 * @param {Number} inleft
 * @param {Number} inright
 */
function buildFromPreInorder(
  preorder,
  preleft,
  preright,
  inorder,
  inleft,
  inright
) {
  if (preleft > preright || inleft > inright) {
    return null;
  }
  let root = preorder[preleft];
  let node = new TreeNode(root);
  if (preleft == preright) {
    return node;
  }

  let index = inorder.indexOf(root, inleft);
  let leftSize = index - inleft;

  node.left = buildFromPreInorder(
    preorder,
    preleft + 1,
    preleft + leftSize,
    inorder,
    inleft,
    index - 1
  );
  node.right = buildFromPreInorder(
    preorder,
    preleft + leftSize + 1,
    preright,
    inorder,
    index + 1,
    inright
  );

  return node;
}

const tests = [
  {
    preorder: [3, 9, 20, 15, 7],
    inorder: [9, 3, 15, 20, 7],
    postorder: [9, 15, 7, 20, 3],
  },

  {
    preorder: [1, 2],
    inorder: [2, 1],
    postorder: [2, 1],
  },

  {
    preorder: [3],
    inorder: [3],
    postorder: [3],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let btree = buildTreeFromPreInOrder(test.preorder, test.inorder);
  let postorder = [];
  visitPostorder(btree, (node) => {
    postorder.push(node.val);
  });

  if (equals(postorder, test.postorder)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect ${test.postorder}, got ${postorder}`);
  }
}
