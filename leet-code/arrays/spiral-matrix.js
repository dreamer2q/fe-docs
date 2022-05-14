import { equals } from "../base/equals.js";

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let left = 0;
  let right = matrix[0].length - 1;
  let top = 0;
  let bottom = matrix.length - 1;

  let current_dir = 0; // right, down, left, up
  let x = 0;
  let y = 0;
  let ans = [];
  while (x >= left && x <= right && y >= top && y <= bottom) {
    ans.push(matrix[y][x]);
    switch (current_dir) {
      case 0:
        if (x === right) {
          current_dir = 1;
          top++;
          y++;
        } else {
          x++;
        }
        break;
      case 1:
        if (y === bottom) {
          current_dir = 2;
          right--;
          x--;
        } else {
          y++;
        }
        break;
      case 2:
        if (x === left) {
          current_dir = 3;
          bottom--;
          y--;
        } else {
          x--;
        }
        break;
      case 3:
        if (y === top) {
          current_dir = 0;
          left++;
          x++;
        } else {
          y--;
        }
        break;
    }
  }
  return ans;
};

const tests = [
  {
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    expect: [1, 2, 3, 6, 9, 8, 7, 4, 5],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let ans = spiralOrder(test.matrix);
  if (equals(ans, test.expect)) {
    console.log(`${i}: passed`);
  } else {
    console.log(`${i}: got ${ans}, expect ${test.expect}`);
  }
}
