import { ListNode } from "list-node.js";

/**
 * 寻找两条链表的交点，如果没有返回空
 * 题目难点在于，list1 和 list2 的长度不一样，如果能让 list1 和 list2 一样长
 * 就比较容易判断了，然后通过让 p1, p2 同时到达这个交点，就可以了。
 * @param {ListNode} list1
 * @param {ListNode} list2
 */
function getIntersectionNode(list1, list2) {
  let p1 = list1;
  let p2 = list2;
  while (p1 != p2) {
    if (p1 == null) {
      p1 = list2; // 衔接 list2
    } else {
      p1 = p1.next;
    }
    if (p2 == null) {
      p2 = list1; // 衔接 list1
    } else {
      p2 = p2.next;
    }
  }
  return p1;
}
