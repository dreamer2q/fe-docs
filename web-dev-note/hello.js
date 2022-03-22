
var now = new Date();
console.log(now.toDateString());
var log = console.log;

// let s1 = "this is a text";

// s1.color = "red";

// log(s1.color);

// let b = Boolean(s1.color);

// log(b.toString());

// let falseObj = new Boolean(false);

// log(falseObj && true);

// log(falseObj instanceof Boolean);

// log(typeof falseObj);


let n1 = Number(0.1);
let n2 = Number(0.2);

let sum = n1 + n2;

log(sum);

let message = "ab☺de";

log(message.charAt(2));
log(message.charCodeAt(2));


for (const c of "123456") {
    log(c);
}

var global = () => this;
var color = "red";
// log(global.color);


let randomVar = [];
for (let i = 0; i < 10000; i++) {
    let tmp = Math.random();
    randomVar.push(tmp);
}

log(Math.max(...randomVar));


const arr = [1, 2, 3, 4, 5, 6, 7, 8, "1", "2", "3", "4"];

const arrKey = arr.keys();
const arrVal = arr.values();
const arrEntr = arr.entries();


let person = {
    name: "Jack",
    toString() {
        return "Jack";
    },
    toLocalString() {
        return toString();
    }
}


log(person);


let stack = [];

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(1);
stack.push(10);
stack.push(-10);


// log(stack.sort((v1, v2) => v1 - v2));
// log(stack.reverse());

// 缓存
// TODO 
const buf = new ArrayBuffer(1024);
log(buf.byteLength);
// 使用视图，DataView来进行读写操作
const view = new DataView(buf);

view.setUint8(0, 0x80);
view.setUint8(1, 0x01);

log(view.getUint16(0));
log(view.getUint16(0, true));


/// 迭代器

let str = 'abc';
//支持迭代器
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

    [Symbol.iterator]() {
        return {
            index: 0,
            limit: this.limit,
            next() {
                return {
                    value: 'foo',
                    done: this.index++ < this.limit ? false : true,
                }
            },
            //如果迭代器被提前终止，且`return()`被实现，就会调用这个函数
            return() {
                log('exit early');
                return {
                    done: true,
                }
            }
        }
    }
};


let f = new Counter(100);
let limit = 0;
for (let i of f) {
    limit++;
    if (limit > 10) break;
    log(i);
}


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


// let genEndless = function* () {
//     let i = 0;
//     while (true) {
//         yield i++;
//     }
// }

// for (let i of genEndless()) {
//     if (i > 10) break;
//     log(i);
// }


// let generatorIter = function* () {
//     //想不到吧，yeild语句加上*可以自动迭代一个可迭代的对象
//     //感觉有点套娃
//     yield* [1, 2, 3, 4];
//     yield* ['no', 'fuck', 'is', 'needed'];
//     //看我，自己迭代自己，所谓的递归迭代
//     yield* generatorIter();
// }

// for (let i of generatorIter()) {
//     log(i);
// }






