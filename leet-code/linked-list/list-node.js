function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

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

export { listNodeToArray, arrayToListNode, identicalListNode, ListNode };
