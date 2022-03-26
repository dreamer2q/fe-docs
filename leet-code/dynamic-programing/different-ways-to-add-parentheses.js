import { equals } from "../base/equals.js";

/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function (expression) {
  /**
   * @type {number[]}
   */
  let res = [];
  for (let i = 0; i < expression.length; i++) {
    let char = expression[i];
    if (char == "+" || char == "-" || char == "*") {
      /**
       * 分：将大问题拆分成子问题
       */
      let left = diffWaysToCompute(expression.substring(0, i));
      let right = diffWaysToCompute(expression.substring(i + 1));
      /**
       * 治：将子问题的解组合成大问题的解
       */
      for (const a of left) {
        for (const b of right) {
          if (char == "+") {
            res.push(a + b);
          } else if (char == "-") {
            res.push(a - b);
          } else if (char == "*") {
            res.push(a * b);
          }
        }
      }
    }
  }

  /**
   * 分到什么时候结束呢
   * 这里是我们的 base case
   * 分到没有运算符只剩下常数本身的时候
   * 
   * 当然由于存在重复子问题，
   * 可以使用备忘录避免重复子问题的计算
   */
  if (res.length === 0) {
    let val = parseInt(expression);
    res.push(val);
  }
  return res;
};

/**

1,2,3
1,3,2
2,1,3
2,3,1
3,1,2
3,2,1

 */

const tests = [
  {
    expression: "2-1-1",
    expect: [0, 2],
  },
];

for (let i = 0; i < tests.length; i++) {
  const test = tests[i];
  let res = diffWaysToCompute(test.expression);
  res.sort();
  if (equals(res, test.expect)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: got ${res}, expect ${test.expect}`);
  }
}
