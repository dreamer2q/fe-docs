import { arrayToListNode, ListNode } from "./list-node.js";

/**
 * @type {ListNode}
 */
let left;
/**
 *
 * @param {ListNode} right
 */
function traverse(right) {
  if (right == null) {
    return true;
  }
  // 前
  let res = traverse(right.next);
  // 后
  res = res && (right.val === left.val);
  left = left.next;
  return res;
}

/**
 * 判断链表是否回文
 * @param {ListNode} head
 * @returns {boolean}
 */
function isPalindrome(head) {
  left = head;
  return traverse(head);
}

/**
 * 判断链表是否回文 (迭代) 
 * @param {ListNode} head 
 * @returns {boolean}
 */
function isPalindrome2(head){}

const tests = [
  {
    head: [1, 2, 3, 2, 1],
    expect: true,
  },
  {
    head: [1, 2, 3, 4, 5],
    expect: false,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let head = arrayToListNode(test.head);
  let res = isPalindrome(head);
  if (res == test.expect) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  }
}
