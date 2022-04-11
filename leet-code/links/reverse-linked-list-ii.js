import {
  arrayToListNode,
  ListNode,
  listNodeToArray,
} from "../links/list-node.js";
import { equals } from "../base/equals.js";

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  offLast = null;
  if (left === 1) {
    return reverseN(head, right);
  }
  head.next = reverseBetween(head.next, left - 1, right - 1);
  return head;
};

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
let offLast = null;
function reverseN(head, n) {
  if (head == null || head.next == null) {
    return head;
  }

  if (n === 1) {
    offLast = head.next;
    return head;
  }

  let last = reverseN(head.next, n - 1);
  head.next.next = head;
  head.next = offLast;
  return last;
}

const tests = [
  {
    head: [1, 2, 3],
    left: 1,
    right: 2,
    expect: [2, 1, 3],
  },
  {
    head: [3, 5],
    left: 1,
    right: 2,
    expect: [5, 3],
  },
  {
    head: [1, 2, 3, 4, 5],
    left: 2,
    right: 4,
    expect: [1, 4, 3, 2, 5],
  },
];

for (let i = 0; i < tests.length; i++) {
  const { head, left, right, expect } = tests[i];
  let node = arrayToListNode(head);
  let ans = reverseBetween(node, left, right);

  let ansArr = listNodeToArray(ans);
  if (equals(expect, ansArr)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect: ${head}, got; ${ansArr}`);
  }
}
