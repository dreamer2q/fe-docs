import {
  ListNode,
  listNodeToArray,
  arrayToListNode,
  identicalListNode,
} from "./list-node.js";

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
export function mergeTwoLists(list1, list2) {
  if (list2 == null) {
    return list1;
  }
  if (list1 == null) {
    return list2;
  }
  let n1 = list1;
  let n2 = list2;
  let prev = null;
  while (n1 != null) {
    let next = n1.next;
    while (n2 != null && n1.val > n2.val) {
      prev = n2;
      n2 = n2.next;
    }
    if (n2 == null) {
      // n2 reach the end
      // append then
      prev.next = n1;
      return list2;
    } else {
      // insert n1 between prev and n2
      n1.next = n2;
      if (prev != null) {
        prev.next = n1;
      } else {
        // list2 is the head
        list2 = n1;
      }
      prev = n1;
    }
    n1 = next;
  }

  return list2;
}

/**
 * 使用递归合并两个有序列表
 * @param {ListNode} list1
 * @param {ListNode} list2
 */
export function mergeTwoLists2(list1, list2) {
  if (list1 === null) {
    return list2;
  }
  if (list2 === null) {
    return list1;
  }

  if (list1.val < list2.val) {
    list1.next = mergeTwoLists2(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists2(list1, list2.next);
    return list2;
  }
}

/**
 * 合并两个有序列表(dummy节点)
 * @param {ListNode} list1
 * @param {ListNode} list2
 */
export function mergeTwoLists3(list1, list2) {
  let dummy = new ListNode();
  let curr = dummy;
  while (list1 && list2) {
    if (list1.val < list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }
  if (list1 == null) {
    curr.next = list2;
  }
  if (list2 == null) {
    curr.next = list1;
  }
  return dummy.next;
}

const tests = [
  {
    list1: [4, 5, 6],
    list2: [1, 2, 3],
    expect: [1, 2, 3, 4, 5, 6],
  },
  {
    list1: [1, 2, 3],
    list2: [4, 5, 6],
    expect: [1, 2, 3, 4, 5, 6],
  },
  {
    list1: [0, 2, 4],
    list2: [-1, 3, 3],
    expect: [-1, 0, 2, 3, 3, 4],
  },
  {
    list1: [-2, -1, 0],
    list2: [-3, -1, 5],
    expect: [-3, -2, -1, -1, 0, 5],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let list1 = arrayToListNode(test.list1);
  let list2 = arrayToListNode(test.list2);
  let expect = arrayToListNode(test.expect);
  let list = mergeTwoLists3(list1, list2);
  if (identicalListNode(list, expect)) {
    console.log(`${i}: pass`);
  } else {
    console.error(
      `${i}: got: ${listNodeToArray(list)}, expect: ${test.expect}`
    );
  }
}
