import { TreeNode, visitPostorder, visitPreorder } from "./tree-node.js";
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

/**
 * 从中序后后序构建二叉树
 * @param {Array} midorder
 * @param {Array} postorder
 */
function buildFromInPostOrder(inorder, postorder) {
  return buildFromInPost(
    inorder,
    0,
    inorder.length - 1,
    postorder,
    0,
    postorder.length - 1
  );
}

/**
 *
 * @param {Array} inorder
 * @param {number} inleft
 * @param {number} inright
 * @param {Array} postorder
 * @param {number*} postleft
 * @param {number*} postright
 */
function buildFromInPost(
  inorder,
  inleft,
  inright,
  postorder,
  postleft,
  postright
) {
  if (inleft > inright || postleft > postright) {
    return null;
  }
  let root = postorder[postright];
  let node = new TreeNode(root);
  if (inleft === inright) {
    return node;
  }
  let index = inorder.lastIndexOf(root, inright);
  let leftSize = index - inleft;

  node.left = buildFromInPost(
    inorder,
    inleft,
    index - 1,
    postorder,
    postleft,
    postleft + leftSize - 1
  );
  node.right = buildFromInPost(
    inorder,
    index + 1,
    inright,
    postorder,
    postleft + leftSize,
    postright - 1
  );

  return node;
}

const tests = [
  {
    preorder: [1, 2, 3],
    inorder: [1, 3, 2],
    postorder: [3, 2, 1],
  },
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

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let btree = buildFromInPostOrder(test.inorder, test.postorder);
  let preorder = [];
  visitPreorder(btree, (node) => {
    preorder.push(node.val);
  });

  if (equals(preorder, test.preorder)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect ${test.preorder}, got ${preorder}`);
  }
}
