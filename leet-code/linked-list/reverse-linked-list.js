import {
  ListNode,
  arrayToListNode,
  identicalListNode,
  listNodeToArray,
} from "./list-node.js";

/**
 * 反转一个单链表 (递归)
 * @param {ListNode} head
 * @returns {ListNode}
 */
function reverseList(head) {
  if (head == null || head.next == null) {
    return head;
  }
  let last = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return last;
}

// 用来标记后驱节点
let _successor = null;
/**
 * 翻转前 N 个节点
 * @param {ListNode} head
 * @param {number} n
 * @returns {ListNode}
 */
function reverseN(head, n) {
  if (n == 1) {
    _successor = head.next;
    return head;
  }
  let last = reverseN(head.next, n - 1);
  head.next.next = head;
  head.next = _successor;
  return last;
}

/**
 * 反转 [m,n] 之间的节点
 * @param {ListNode} head
 * @param {number} m 开始节点编号
 * @param {number} n 结束节点编号
 */
function reverseBetween(head, m, n) {
  if (m == 1) {
    // 等效与翻转前 n 个节点
    return reverseN(head, n);
  }
  head.next = reverseBetween(head.next, m - 1, n - 1);
  return head;
}

// const tests = [
//   {
//     list: [1, 2, 3, 4, 5, 6],
//     expect: [6, 5, 4, 3, 2, 1],
//   },
// ];

// for (let i = 0; i < tests.length; i++) {
//   let test = tests[i];
//   let list = arrayToListNode(test.list);
//   let expect = arrayToListNode(test.expect);
//   let result = reverseList(list);
//   if (identicalListNode(result, expect)) {
//     console.log(`${i}: passed`);
//   } else {
//     console.log(
//       `${i}: got ${listNodeToArray(result)}, expect ${listNodeToArray(expect)}`
//     );
//   }
// }

// const tests = [
//   {
//     n: 3,
//     list: [1, 2, 3, 4, 5, 6],
//     expect: [3, 2, 1, 4, 5, 6],
//   },

//   {
//     n: 1,
//     list: [1, 2, 3, 4, 5, 6],
//     expect: [1, 2, 3, 4, 5, 6],
//   },

//   {
//     n: 2,
//     list: [2, 1, 3, 4, 5, 6],
//     expect: [1, 2, 3, 4, 5, 6],
//   },

//   {
//     n: 6,
//     list: [1, 2, 3, 4, 5, 6],
//     expect: [6, 5, 4, 3, 2, 1],
//   },
// ];

// for (let i = 0; i < tests.length; i++) {
//   let test = tests[i];
//   let list = arrayToListNode(test.list);
//   let expect = arrayToListNode(test.expect);
//   let result = reverseN(list, test.n);
//   if (identicalListNode(result, expect)) {
//     console.log(`${i}: passed`);
//   } else {
//     console.log(
//       `${i}: got ${listNodeToArray(result)}, expect ${listNodeToArray(expect)}`
//     );
//   }
// }

const tests = [
  {
    m: 1,
    n: 3,
    list: [1, 2, 3, 4, 5, 6],
    expect: [3, 2, 1, 4, 5, 6],
  },
  {
    m: 2,
    n: 4,
    list: [1, 2, 3, 4, 5, 6],
    expect: [1, 4, 3, 2, 5, 6],
  },

  {
    m: 2,
    n: 6,
    list: [2, 1, 3, 4, 5, 6],
    expect: [2, 6, 5, 4, 3, 1],
  },

  {
    n: 6,
    m: 6,
    list: [1, 2, 3, 4, 5, 6],
    expect: [1, 2, 3, 4, 5, 6],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let list = arrayToListNode(test.list);
  let expect = arrayToListNode(test.expect);
  let result = reverseBetween(list, test.m, test.n);
  if (identicalListNode(result, expect)) {
    console.log(`${i}: passed`);
  } else {
    console.log(
      `${i}: got ${listNodeToArray(result)}, expect ${listNodeToArray(expect)}`
    );
  }
}
