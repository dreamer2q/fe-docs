import { ListNode, listNodeToArray, arrayToListNode } from "./list-node.js";
import { equals } from "../base/equals.js";

/**
给定一个头结点为 head 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  /**
   * 快慢指针, 快指针一次两步, 满指针一次一步
   * 当快指针走到终点(null), 满指针的位置正好是中间节点
   */
  let slow = head;
  let fast = head;
  while (fast) {
    slow = slow.next;
    fast = fast.next;
    if (fast) {
      fast = fast.next;
    } else break;
  }
  return slow;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode2 = function (head) {
  _middle = null;
  dfs(head, 0);
  return _middle;
};

let _middle = null;
/**
 * 使用递归求解中间节点
 * @param {ListNode} node
 */
function dfs(node, depth) {
  if (node == null) {
    return 0;
  }
  let len = dfs(node.next, depth + 1) + 1;
  if ((depth + len) % 2 === 1) {
    if (len - depth === 1) {
      _middle = node;
    }
  } else if (len == depth) {
    _middle = node;
  }
  return len;
}

const tests = [
  {
    head: [1, 2, 3, 4, 5],
    expect: [3, 4, 5],
  },
  {
    head: [1],
    expect: [1],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let head = arrayToListNode(test.head);
  head = middleNode2(head);
  let res = listNodeToArray(head);
  if (equals(res, test.expect)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  }
}
