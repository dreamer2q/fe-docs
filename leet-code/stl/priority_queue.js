export class MaxPriorityQueue {
  constructor(cmp) {
    this.pq = [];
    this.len = 0;
    this._cmp = cmp == undefined ? null : cmp;
  }

  get max() {
    return this.pq[1];
  }

  #swap(i, j) {
    let tmp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = tmp;
  }

  less(i, j) {
    let a = this.pq[i];
    let b = this.pq[j];
    if (this._cmp) {
      return this._cmp(a, b);
    }
    return a < b;
  }

  left(i) {
    return Math.floor(2 * i);
  }

  right(i) {
    return Math.floor(2 * i + 1);
  }

  parent(i) {
    return Math.floor(i / 2);
  }

  swim(k) {
    // 上浮
    // k > 1 堆顶不能再上浮了
    // k 比 父节点小，就不能上浮了
    while (k > 1 && this.less(this.parent(k), k)) {
      this.#swap(this.parent(k), k);
      k = this.parent(k);
    }
  }

  sink(k) {
    // 下沉到堆底就无法继续了
    while (this.left(k) <= this.len) {
      let b = this.left(k); // 假设左边节点比较大
      if (this.right(k) <= this.len && this.less(b, this.right(k))) {
        // 错了，右边比较大
        b = this.right(k);
      }
      if (this.less(b, k)) {
        // 并没有, 不需要下沉
        break;
      }
      this.#swap(b, k);
      k = b; // 下沉 k 节点
    }
  }

  insert(e) {
    this.len++;
    this.pq[this.len] = e; // 添加元素到树底部
    this.swim(this.len); // 让它上浮到合适的位置
  }

  delMax() {
    let n = this.len;
    let max = this.pq[1]; // 堆顶就是最大值
    // 最大值放到之后然后删除
    this.#swap(1, n);
    this.pq[n] = null;
    this.len--;
    this.sink(1); // 让新值下沉到合适位置
    return max;
  }
}

function check(assert, expect, desc) {
  if (assert != expect) {
    console.error(`${desc}: expect: ${expect}, got ${assert}`);
  } else {
    console.log(`${desc}: passed`);
  }
}

function test() {
  let pq = new MaxPriorityQueue();
  pq.insert(3);
  pq.insert(2);
  pq.insert(1);

  check(pq.max, 3, "get maxVal");
  pq.delMax();
  check(pq.max, 2, "after del");

  pq.insert(0);
  pq.insert(20);
  check(pq.max, 20, "insert 20");
}
