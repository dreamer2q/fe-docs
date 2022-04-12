var RandomizedSet = function () {
  this.valKey = new Map(); // 哈希表用来 val 到索引的映射关系, 解决查找、删除操作 O(1)
  this.arr = []; // 底层存储数组，需要联系存储，为了实现随机取 O(1) 时间
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  let k = this.valKey.get(val);
  if (k != null) {
    return false;
  }
  // 没有存在, 插入到数组最后一个位置, 实现 O(1) 插入
  k = this.arr.length;
  this.valKey.set(val, k);
  this.arr[k] = val;
  return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  let k = this.valKey.get(val);
  if (k != null) {
    // 为了实现 O(1) 删除, 将需要删除的元素交换到数组的最后一个, 然后删除数组的最后一个元素
    this.valKey.set(this.arr[k], k); // 更新交换后的索引值
    this.valKey.delete(val); // 删除索引值
    this.arr[k] = this.arr[this.arr.length - 1];
    this.arr.pop();
    return true;
  }
  return false;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  let len = this.arr.length - 1;
  let rand = Math.floor(len * Math.random());
  return this.arr[rand];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

let ob = new RandomizedSet();

ob.remove(0);
ob.remove(0);
ob.insert(0);
let r = ob.getRandom();
console.log(r);
ob.remove(0);
ob.insert(0);

console.log(ob.getRandom());
