const MyPromise = require('./promise-lib.js');

// ------------------------------------
function myAsyncFunc(timeoutSeconds=1) {
    return MyPromise(function (resolve, reject) {
        setTimeout(() => {
            if(timeoutSeconds === 3) {
                reject(timeoutSeconds);
            }
            else {
                resolve(timeoutSeconds);    
            }
        }, timeoutSeconds * 1000);
    });
}
// ------------------------------------

myAsyncFunc(1)
.then(function (value) {
    console.log(`then A ${value} done`);
});

myAsyncFunc(3)
.then(function (value) {
    console.log(`then C ${value} done`);
},
function (value) {
    console.log(`then C ${value} error`);
});
