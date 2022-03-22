/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let ans = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let c = grid[i][j];
      if (c == "1") {
        ans++;
        dfs(grid, i, j);
      }
    }
  }

  return ans;
};

function dfs(grid, x, y) {
  if (grid[x][y] != "1") {
    return;
  }
  grid[x][y] = "0";
  if (x - 1 >= 0) {
    dfs(grid, x - 1, y);
  }
  if (x + 1 < grid.length) {
    dfs(grid, x + 1, y);
  }
  if (y - 1 >= 0) {
    dfs(grid, x, y - 1);
  }
  if (y + 1 < grid[x].length) {
    dfs(grid, x, y + 1);
  }
}

const tests = [
  {
    grid: [
      ["1", "1", "1"],
      ["0", "1", "0"],
      ["1", "1", "1"],
    ],
    expect: 1,
  },
  {
    grid: [
      ["1", "1", "1", "1", "0"],
      ["1", "1", "0", "1", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
    ],
    expect: 1,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let { grid, expect } = test;
  let res = numIslands(grid);
  if (res != expect) {
    console.log(`${i}: expect ${expect}, got ${res}`);
  } else {
    console.log(`${i}: passed`);
  }
}
