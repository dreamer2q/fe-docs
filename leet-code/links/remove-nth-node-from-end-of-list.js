import { ListNode, listNodeToArray, arrayToListNode } from "./list-node.js";

import { equals } from "../base/equals.js";

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode(null /* dummy value */, head);
  traverse(dummy, n);
  return dummy.next;
};

function traverse(head, n) {
  if (head == null) {
    return 0;
  }
  let len = traverse(head.next, n);
  if (len == n) {
    head.next = head.next.next;
  }
  return len + 1;
}

const tests = [
  {
    head: [1],
    n: 1,
    expect: [],
  },
  {
    head: [1, 2, 3, 4, 5],
    n: 2,
    expect: [1, 2, 3, 5],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let head = arrayToListNode(test.head);
  head = removeNthFromEnd(head, test.n);
  let res = listNodeToArray(head);
  if (equals(res, test.expect)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  }
}
