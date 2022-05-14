import { equals } from "../base/equals.js";

/**
给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
*/

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  let w = matrix.length - 1;
  if (w === 0) return;
  let mm = Math.floor(w / 2);
  for (let y = 0; y <= mm; y++) {
    for (let x = y; x < w - y; x++) {
      let tmp = matrix[y][x];
      matrix[y][x] = matrix[w - x][y];
      matrix[w - x][y] = matrix[w - y][w - x];
      matrix[w - y][w - x] = matrix[x][w - y];
      matrix[x][w - y] = tmp;
    }
  }
};

const tests = [
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    expect: [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ],
  },
  {
    matrix: [
      [5, 1, 9, 11],
      [2, 4, 8, 10],
      [13, 3, 6, 7],
      [15, 14, 12, 16],
    ],
    expect: [
      [15, 13, 2, 5],
      [14, 3, 4, 1],
      [12, 6, 8, 9],
      [16, 7, 10, 11],
    ],
  },
];

for (let i = 0; i < tests.length; i++) {
  const test = tests[i];
  rotate(test.matrix);
  if (equals(test.matrix, test.expect)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: expect: ${test.expect}, got ${test.matrix}`);
  }
}
