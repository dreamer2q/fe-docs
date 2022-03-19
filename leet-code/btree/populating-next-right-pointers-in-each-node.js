class TreeNode {
  constructor(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}

/**
 * 串联节点, 层次遍历
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function connect(root) {
  if (root == null) {
    return null;
  }
  /**
   * @type {Array<TreeNode>}
   */
  let q = [];
  q.push(root);
  while (q.length > 0) {
    let size = q.length;
    for (let i = 0; i < size; i++) {
      let node = q.shift();
      if (i < size - 1) {
        node.next = q[0];
      }
      if (node.left) {
        q.push(node.left);
      }
      if (node.right) {
        q.push(node.right);
      }
    }
  }
  return root;
}

/**
 * 串联节点, 递归
 * @param {TreeNode} root
 * @returns {TreeNode}
 */
function connect2(root) {
  if (root == null || root.left == null) {
    return root;
  }

  root.left.next = root.right;
  if (root.next) {
    root.right.next = root.next.left;
  }
  connect2(root.left);
  connect2(root.right);

  return root;
}

const tests = [
  {
    tree: new TreeNode(
      0,
      new TreeNode(1, new TreeNode(3), new TreeNode(4)),
      new TreeNode(2, new TreeNode(5), new TreeNode(6))
    ),
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = connect2(test.tree);
  console.log(JSON.stringify(res, null, 2));
}
