import { equals } from "../base/equals.js";

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  qb = new Array();
  for (let i = 0; i < n; i++) {
    qb.push(new Array(n).fill(0));
  }

  ans = [];
  path = [];
  traverse(n, 0);
  return ans;
};

let qb = [];
let ans = [];
let path = [];

function traverse(n, row) {
  if (row === n) {
    //找到解了, 输出一个解法
    ans.push([...path]);
    return;
  }

  for (let i = 0; i < n; i++) {
    if (canIput(row, i)) {
      let line = putQ(row, i);
      path.push(line);
      traverse(n, row + 1);
      unputQ(row, i);
      path.pop();
    }
  }
}

function canIput(row, x) {
  return qb[row][x] === 0;
}

function putQ(row, x) {
  updateQueue(row, x, (v) => v + 1);
  let line = new Array(qb.length).fill(".");
  line[x] = "Q";
  return line.join("");
}

function unputQ(row, x) {
  return updateQueue(row, x, (v) => v - 1);
}

function updateQueue(row, x, update) {
  let n = qb.length;
  for (let i = 0; i < n; i++) {
    qb[row][i] = update(qb[row][i]);
    qb[i][x] = update(qb[i][x]);
    let r = row - x + i;
    if (r >= 0 && r < n) {
      qb[r][i] = update(qb[r][i]);
    }
    let r2 = row + x - i;
    if (r2 >= 0 && r2 < n) {
      qb[r2][i] = update(qb[r2][i]);
    }
  }
}

const tests = [
  {
    n: 4,
    expect: [
      [".Q..", "...Q", "Q...", "..Q."],
      ["..Q.", "Q...", "...Q", ".Q.."],
    ],
  },
];

for (let i = 0; i < tests.length; i++) {
  const { n, expect } = tests[i];
  let ans = solveNQueens(n);
  if (equals(ans, expect)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: got ${ans}, expect: ${expect}`);
  }
}
