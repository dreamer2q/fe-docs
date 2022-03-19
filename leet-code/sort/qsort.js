/**
 * 快速排序
 * @param {Array} num
 * @returns {Array}
 */
function qsort(num) {
  let list = [...num];
  quicksort(list, 0, list.length - 1);
  return list;
}

function quicksort(num, lo, hi) {
  if (lo >= hi) {
    return;
  }
  let mid = partition(num, lo, hi);
  quicksort(num, lo, mid - 1);
  quicksort(num, mid + 1, hi);
}

/**
 * 交换 a 和 b 的位置
 * @param {Array} num
 * @param {number} a
 * @param {number} b
 */
function swap(num, a, b) {
  let t = num[a];
  num[a] = num[b];
  num[b] = t;
}

/**
 * 交换元素构建分界点,
 * 左边的都小于分界点,
 * 右边的都大雨分界点
 * @param {Array} num
 * @param {number} lo
 * @param {number} hi
 * @returns {number} 分界点位置
 */
function partition(num, lo, hi) {
  //   let mid = Math.floor((lo + hi) / 2);
  let b = num[lo];
  while (lo < hi) {
    while (lo < hi && num[hi] >= b) {
      hi--;
    }
    swap(num, lo, hi);
    while (lo < hi && num[lo] <= b) {
      lo++;
    }
    swap(num, lo, hi);
  }
  return lo;
}

const tests = [
  {
    num: [9, 0, 2, 6, 1, 8, 3, 2, 7, 1, 0, 2, 1],
    expect: [0, 0, 1, 1, 1, 2, 2, 2, 3, 6, 7, 8, 9],
  },
  {
    num: [1, 2],
    expect: [1, 2],
  },
  {
    num: [2, 1],
    expect: [1, 2],
  },
  {
    num: [2],
    expect: [2],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = qsort(test.num);

  if (JSON.stringify(res) == JSON.stringify(test.expect)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: got: ${res}, expect ${test.expect}`);
  }
}
