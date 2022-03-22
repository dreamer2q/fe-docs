const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  status = PENDING;

  /**
   * resolved
   */
  value = null;
  /**
   * rejected
   */
  reason = null;

  /**
   * callback
   */
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  /**
   * 箭头函数
   * @param {any} value
   */
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;

      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };

  /**
   * 箭头函数
   * @param {any} reason
   */
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;

      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };

  then(onFulfilled, onRejected) {
    const promiseThen = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const value = onFulfilled(this.value);
        resolve(value, resolve, reject);
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    });

    return promiseThen;
  }
}

function resolvePromise(value, resolve, reject) {
  if (value instanceof MyPromise) {
    value.then(resolve, reject);
  } else {
    resolve(value);
  }
}

export default MyPromise;
