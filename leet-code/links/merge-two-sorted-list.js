function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
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
};

/**
 * 使用递归合并两个有序列表
 * @param {ListNode} list1
 * @param {ListNode} list2
 */
function mergeTwoLists2(list1, list2) {
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
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
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

/**
 * 生成 ListNode 链表
 * @param {array} arr
 * @returns {ListNode}
 */
function arrayToListNode(arr) {
  let list = new ListNode();
  let node = list;
  for (const a of arr) {
    node.next = new ListNode(a);
    node = node.next;
  }
  return list.next;
}

/**
 * 生成 Array 数组
 * @param {ListNode} node
 * @returns {Array}
 */
function listNodeToArray(node) {
  let result = [];
  while (node != null) {
    result.push(node.val);
    node = node.next;
  }
  return result;
}

/**
 * 比较两个链表是否一致
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @returns {boolean}
 */
function identicalListNode(list1, list2) {
  while (list1 != null) {
    if (list1.val != list2.val) {
      return false;
    }
    list1 = list1.next;
    list2 = list2.next;
  }
  return null == list2;
}

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let list1 = arrayToListNode(test.list1);
  let list2 = arrayToListNode(test.list2);
  let expect = arrayToListNode(test.expect);
  let list = mergeTwoLists2(list1, list2);
  if (identicalListNode(list, expect)) {
    console.log(`${i}: pass`);
  } else {
    console.error(
      `${i}: got: ${listNodeToArray(list)}, expect: ${test.expect}`
    );
  }
}
