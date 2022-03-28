/**
 * 
 * 
数轴上有n个点，从左到右编号分别为1,2,…,n。

小美在1号点，小团在n号点，现在要选择一个点作为他们会合的地点，他们期望选择的点能让小美和小团到达会合点的距离差值尽量小。

你的任务是输出最小的距离差。

输入描述
第1行是一个正整数n，表示数轴上有n个点。

第2行是n个空格隔开的正整数a1,a2,…,an，第 i 个数表示第 i 个点的坐标。 

2<=n<=100000，1<=ai<=200，保证a1<=a2<=…<=an

输出描述
输出一个整数，表示最小距离差值。

样例输入
2
5 7

样例输出

2

输入样例2

3

5 8 9

输出样例2

2
 */

/**
 *
 * @param {number[]} points
 */
function minMeetDistance(points) {
  let first = points[0];
  let last = points[points.length - 1];
  let ans = last - first;
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let d1 = p - first;
    let d2 = last - p;
    let m = Math.abs(d2 - d1);
    if (ans > m) {
      ans = m;
    }
  }
  return ans;
}

const tests = [
  {
    points: [5, 7],
    expect: 2,
  },
  {
    points: [5, 8, 9],
    expect: 2,
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];
  let res = minMeetDistance(test.points);
  if (res != test.expect) {
    console.log(`${i}: expect ${test.expect}, got ${res}`);
  } else {
    console.log(`${i}: passed`);
  }
}
