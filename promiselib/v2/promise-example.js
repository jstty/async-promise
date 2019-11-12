const MyPromise = require('./promise-lib.js');

let promise1 = MyPromise(function (resolve, reject) {
    setTimeout(function() {
        resolve('done 1');
    }, 1000);
});

let promise2 = MyPromise(function (resolve, reject) {
    setTimeout(function() {
        resolve('done 2');
    }, 1000);
});

promise1.then(function (result) {
    console.log('result 1:', result);
    return promise2;
})
.then(function (result) {
    console.log('result 2:', result);
});