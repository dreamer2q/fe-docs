/**
 * 数列的定义如下： 数列的第一项为n，以后各项为前一项的平方根，求数列的前m项的和。
 * 输入数据有多组，每组占一行，由两个整数n（n<10000）和m(m<1000)组成，n和m的含义如前所述。
 */

/**
 *
 * @param {number} n
 * @param {number} m
 */
function nSum(n, m) {
  let ans = n;
  for (let i = 1; i < m; i++) {
    n = Math.sqrt(n);
    ans += n;
  }
  return ans.toFixed(2);
}

const tests = [
  {
    n: 81,
    m: 4,
    expect: 94.73,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let ans = nSum(test.n, test.m);
  if (Math.abs(ans - test.expect) < 1e-6) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect ${test.expect}, got ${ans}`);
  }
}
