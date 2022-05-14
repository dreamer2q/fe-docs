class ListNode {
  prev = null;
  next = null;
  val = null;

  constructor(prev, next, val) {
    this.prev = prev;
    this.next = next;
    this.val = val;
  }
}

class LinkedList {
  head = new ListNode();
  tail = null;
  length = 0;

  constructor() {
    this.tail = this.head;
  }

  append(node) {
    if (!node) return;
    this.tail.next = node;
    node.prev = this.tail;
    node.next = null;
    this.tail = node;
    this.length++;
  }

  remove(node) {
    if (!node) return;
    node.prev.next = node.next;

    if (node.next != null) {
      node.next.prev = node.prev;
    } else {
      // 说明删除的是 tail 节点
      this.tail = node.prev;
    }
    this.length--;
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.kv = new Map();
  this.list = new LinkedList();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  let node = this.kv.get(key);
  if (node) {
    // 更新顺序
    this.list.remove(node);
    this.list.append(node);
    return node.val[1];
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = this.kv.get(key);
  if (node) {
    // 之前已经存在的值
    node.val = [key, value]; // 更新值
    // 更新 node 的顺序(更新访问时间)
    this.list.remove(node);
    this.list.append(node);
  } else {
    // 没有存在创建新值
    node = new ListNode(null, null, [key, value]);
    this.kv.set(key, node);
    this.list.append(node);
    // 判断是否溢出了
    if (this.list.length > this.capacity) {
      let rm = this.list.head.next;
      this.kv.delete(rm.val[0]);
      this.list.remove(rm);
    }
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

let obj = new LRUCache(2);
// ["LRUCache","put","put","put","put","get","get"]
// [[2],[2,1],[1,1],[2,3],[4,1],[1],[2]]
obj.put(2, 1);
obj.put(1, 1);
obj.put(2, 3);
obj.put(4, 1);
obj.get(1);
obj.get(2);
