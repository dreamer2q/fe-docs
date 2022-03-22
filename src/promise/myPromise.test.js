import MyPromise from "./myPromise.js";

const promise = new MyPromise((resolve, reject) => {
  resolve("success");
  reject("err");
});

promise.then(
  (val) => {
    console.log("resolve", val);
  },
  (err) => {
    console.log("reject", err);
  }
);

const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("timeout");
  }, 2000);
}).then((val) => {
  console.log("resolved", val);
});
