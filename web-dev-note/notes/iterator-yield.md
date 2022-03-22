# 迭代器

```js
/// 迭代器
let str = "abc";
//支持迭代器，返回不为null/undefined
log(str[Symbol.iterator]);
//调用这个工厂函数，生成一个迭代器
log(str[Symbol.iterator]());

let arrIter = [...str];

for (let a in arrIter) {
  log(a);
}

// 自定义迭代器
class Counter {
  constructor(limit) {
    this.limit = limit;
  }

  //实现iterator接口
  [Symbol.iterator]() {
    return {
      index: 0,
      limit: this.limit,
      next() {
        return {
          // 每次迭代返回的数值
          value: "foo",
          // done:false 表示还有数据
          done: this.index++ < this.limit ? false : true,
        };
      },
      //如果迭代器被提前终止，且`return()`被实现，就会调用这个函数
      return() {
        log("exit early");
        return {
          done: true,
        };
      },
    };
  }
}

let f = new Counter(100);
let limit = 0;
for (let i of f) {
  limit++;
  if (limit > 10) break;
  log(i);
}
```

# 生成器

拥有在一个函数快内暂停和恢复执行代码的能力。

```js
// 生成器
function* generatorFn() {
  yield 1;
  yield 2;
}

//第一次调用，获得一个生成器对象，生成器函数不会得到执行
//生成器对象实现了iterator的接口，因此可以像使用迭代器那样使用生成器
let generatorObj = generatorFn();
//调用生成器对象的next方法，生成器函数得到执行，并在第一个yield语句中断，返回yield语句提供的值
log(generatorObj.next());
log(generatorObj.next());
//当生成器函数执行完毕后，等价于迭代器没有数据了。
log(generatorObj.next());

//看我，我能生成到你产生溢出，不要小瞧我哦~
let genEndless = function* () {
  let i = 0;
  while (true) {
    yield i++;
  }
};

for (let i of genEndless()) {
  if (i > 10) break;
  log(i);
}

let generatorIter = function* () {
  //想不到吧，yeild语句加上*可以自动迭代一个可迭代的对象
  //感觉有点套娃
  yield* [1, 2, 3, 4];
  yield* ["no", "fuck", "is", "needed"];
  //看我，自己迭代自己，所谓的递归迭代
  //子子孙孙无穷尽也
  yield* generatorIter();
};

for (let i of generatorIter()) {
  log(i);
}
```

生成器也支持提前返回，也就是说，所有的生成器都实现了`return()`。
被提前结束的生成器就不会被执行了。

此外，还可以通过生成器对象的`throw()`方法向其生成器函数内部注入一个错误，如果内部没有处理这个错误，这就生成器就宣告结束了。(不知道用在何处)

