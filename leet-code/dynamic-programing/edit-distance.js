/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  let memo = new Map();
  /**
   * 递归解法，自顶向下求解
   * 会遇到重叠子问题，属于暴力求解
   * 可以使用 mome 来存储中间结果
   * @param {number} i
   * @param {number} j
   */
  function dp(i, j) {
    // base case
    // 基准情况, 当某一方处理完成时候
    if (i == -1) {
      return j + 1;
    }
    if (j == -1) {
      return i + 1;
    }
    let key = `(${i},${j})`;
    if (memo.get(key)) {
      return memo.get(key);
    }
    if (word1[i] == word2[j]) {
      // skip 啥也不用做
      let res = dp(i - 1, j - 1);
      memo.set(key, res);
      return res;
    }
    let res = Math.min(
      dp(i - 1, j) + 1 /* 插入 */,
      dp(i, j - 1) + 1 /* 删除 */,
      dp(i - 1, j - 1) + 1 /* 替换 */
    );
    memo.set(key, res);
    return res;
  }

  return dp(word1.length - 1, word2.length - 1);
};

/**
 * 使用 dp 数组
 * 自底向上求解
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance2 = function (word1, word2) {
  let dp = new Array(word1.length + 1);
  for (let i = 0; i < word1.length + 1; i++) {
    dp[i] = new Array(word2.length + 1);
  }

  for (let i = 0; i <= word1.length; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= word2.length; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] == word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i - 1][j - 1] + 1,
          dp[i][j - 1] + 1
        );
      }
    }
  }

  return dp[word1.length][word2.length];
};

const tests = [
  {
    word1: "dinitrophenylhydrazine",
    word2: "benzalphenylhydrazone",
    expect: 7,
  },
  {
    word1: "horse",
    word2: "ros",
    expect: 3,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = minDistance2(test.word1, test.word2);
  if (res != test.expect) {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  } else {
    console.log(`${i}: passed`);
  }
}
