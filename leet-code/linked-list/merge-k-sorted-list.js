import { MaxPriorityQueue } from "../stl/priority_queue.js";
import {
  ListNode,
  arrayToListNode,
  listNodeToArray,
  identicalListNode,
} from "./list-node.js";

/**
 * 递归合并
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @returns {ListNode}
 */
function mergeTwoList(list1, list2) {
  if (list1 == null) {
    return list2;
  }
  if (list2 == null) {
    return list1;
  }
  if (list1.val < list2.val) {
    list1.next = mergeTwoList(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoList(list1, list2.next);
    return list2;
  }
}

function merge(lists, left, right) {
  if (left == right) return lists[left];
  let mid = Math.floor((left + right) / 2);
  let list1 = merge(lists, left, mid);
  let list2 = merge(lists, mid + 1, right);
  return mergeTwoList(list1, list2);
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
  if (lists == null || lists.length == 0) {
    return null;
  }
  return merge(lists, 0, lists.length - 1);
}

/**
 * 使用 PriorityQueue 实现合并
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists2(lists) {
  if (lists == null || lists.length == 0) {
    return null;
  }
  let dummy = new ListNode();
  let p = dummy;
  let pq = new MaxPriorityQueue((a, b) => a.val > b.val);
  for (let node of lists) {
    if (node) {
      pq.insert(node);
    }
  }

  while (pq.len > 0) {
    let min = pq.delMax();
    p.next = min;
    if (min.next) {
      pq.insert(min.next);
    }
    p = p.next;
  }

  return dummy.next;
}

const tests = [
  {
    list: [
      [4, 5, 6],
      [1, 2, 3],
    ],
    expect: [1, 2, 3, 4, 5, 6],
  },
  {
    list: [
      [1, 2, 3],
      [4, 5, 6],
    ],
    expect: [1, 2, 3, 4, 5, 6],
  },
  {
    list: [
      [0, 2, 4],
      [-1, 3, 3],
    ],
    expect: [-1, 0, 2, 3, 3, 4],
  },
  {
    list: [
      [-2, -1, 0],
      [-3, -1, 5],
    ],
    expect: [-3, -2, -1, -1, 0, 5],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let input = [];
  for (const list of test.list) {
    let node = arrayToListNode(list);
    input.push(node);
  }
  let expect = arrayToListNode(test.expect);
  let result = mergeKLists2(input);
  if (identicalListNode(result, expect)) {
    console.log(`${i}: pass`);
  } else {
    console.error(
      `${i}: got: ${listNodeToArray(result)}, expect: ${test.expect}`
    );
  }
}
