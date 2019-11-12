const MyPromise = require('./promise-lib.js');

let promise = MyPromise(function (resolve, reject) {
    setTimeout(function() {
        resolve('done');
    }, 2000);
});

promise.then(function (result) {
    console.log('result:', result);
})
.catch(function(error) {
    console.log('error:', error);
});
