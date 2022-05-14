/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let dp = new Array(amount + 1);
  dp.fill(amount + 1, 1, amount + 1); // dp[1...amout] = MAX_VALUE
  /**
   * dp[i] 代表换置 i 金额至少需要 dp 个硬币
   */
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        // 确保金额合法
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] == amount + 1 ? -1 : dp[amount];
};

const tests = [
  {
    coins: [1, 2, 5],
    amount: 11,
    expect: 3,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let result = coinChange(test.coins, test.amount);
  if (result != test.expect) {
    console.log(`${i}: expect ${test.expect}, got ${result}`);
  } else {
    console.log(`${i}: passed`);
  }
}
