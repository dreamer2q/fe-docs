/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
  const h = dungeon.length;
  const w = dungeon[0].length;
  let dp = new Array(w + 1).fill(Infinity);

  for (let i = h - 1; i >= 0; --i) {
    for (let j = w - 1; j >= 0; --j) {
      if (i === h - 1 && j === w - 1) dp[j] = 0; // base case
      dp[j] = Math.max(0, -dungeon[i][j] + Math.min(dp[j + 1], dp[j]));
    }
  }

  return dp[0] + 1;
};

const tests = [
  {
    dungeon: [
      [-2, -3, 3],
      [-5, -10, 1],
      [10, 30, -5],
    ],
    expect: 7,
  },
  {
    dungeon: [
      [0, 5],
      [-2, -3],
    ],
    expect: 1,
  },
];

for (let i = 0; i < tests.length; i++) {
  const { dungeon, expect } = tests[i];
  const ans = calculateMinimumHP(dungeon);
  if (ans != expect) {
    console.log(`${i}: expect ${expect}, got ${ans}`);
  } else {
    console.log(`${i}: passed`);
  }
}
