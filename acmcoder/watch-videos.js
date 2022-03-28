class Video {
  /**
   *
   * @param {number} time
   * @param {number[]} prefix
   */
  constructor(time, prefix) {
    this.time = time;
    this.prefix = prefix;

    this.pending = false;
    if (this.prefix) {
      this.pending = true;
    }

    this.done = false;
    this.finish = 0;
  }

  /**
   *
   * @param {number} span
   */
  update(span) {
    if (this.pending) {
      let flag = true;
      for (let i = 0; i < this.prefix.length; i++) {
        let index = this.prefix[i];
        let video = videos[index - 1];
        if (!video.done || video.finish === time) {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.pending = false;
      }
    }

    if (!this.pending) {
      if (!this.done) {
        this.time -= span;
        if (this.time <= 0) {
          this.done = true;
          this.finish = time;
        }
      }
    }
  }
}

/**
 * @type {Video[]}
 */
let videos = [];
let time = 0;

/**
 * @param {number[][]} nums
 */
function watchVideos(nums) {
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    if (num.length == 1) {
      let v = new Video(num[0]);
      videos.push(v);
    } else {
      let prefix = [...num];
      prefix.shift();
      let v = new Video(num[0], prefix);
      videos.push(v);
    }
  }

  let flag = false;
  while (!flag) {
    flag = true;
    time += 1;
    for (let i = 0; i < videos.length; i++) {
      let video = videos[i];
      video.update(1);
      if (!video.done) {
        flag = false;
      }
    }
  }

  let results = [];
  for (let i = 0; i < videos.length; i++) {
    let video = videos[i];
    results.push(video.finish);
  }

  console.log(results.join(" "));
  return results;
}

const tests = [
  {
    videos: [[4], [2, 1, 3], [3]],
  },
];

for (let i = 0; i < tests.length; i++) {
  let test = tests[i];

  videos = [];
  time = 0;

  watchVideos(test.videos);
}
