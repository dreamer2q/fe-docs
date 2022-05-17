import { equals } from "../base/equals.js";

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let ans = [];
  /** @type {number[][]} */
  let bd = [];
  for (let i = 0; i < n; i++) {
    bd.push(new Array(n).fill(0));
  }

  const traverse = (i) => {
    if (i === n) {
      // bingo
      let solution = bd.map((ln) => ln.map((e) => (e ? "Q" : ".")).join(""));
      ans.push(solution);
      return;
    }

    for (let k = 0; k < n; k++) {
      const canIput = () => {
        // bd[i][k] must be 0
        for (let j = 0; j < n; j++) {
          if (bd[i][j]) return false;
          if (bd[j][k]) return false;
          let cc = k - i + j;
          if (cc >= 0 && cc < n) {
            if (bd[j][cc]) return false;
          }
          let rr = k + i - j;
          if (rr >= 0 && rr < n) {
            if (bd[j][rr]) return false;
          }
        }
        return true;
      };

      if (canIput()) {
        bd[i][k] = 1;
        traverse(i + 1);
        bd[i][k] = 0;
      }
    }
  };

  traverse(0);
  return ans;
};

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
