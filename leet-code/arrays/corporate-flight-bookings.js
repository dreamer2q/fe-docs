/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
  let nums = new Array(n).fill(0);

  // 1. 构建差分数组
  let diff = [nums[0]];
  for (let i = 1; i < n; i++) {
    diff[i] = nums[i] - nums[i - 1];
  }

  for (let book of bookings) {
    // 2. 根据输入调整动态调整
    let [i, j, k] = book;
    diff[i - 1] += k;
    if (j < n) {
      diff[j] -= k;
    }
  }

  // 3. 由差分数组重构答案(原始数组)
  let ans = [diff[0]];
  for (let i = 1; i < diff.length; i++) {
    ans[i] = ans[i - 1] + diff[i];
  }
  return ans;
};
