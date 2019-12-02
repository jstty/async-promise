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
    return myAsyncFunc(2);
})
.then(function (value) {
    console.log(`then B ${value} done`);
    return myAsyncFunc(3);
})
.then(function (value) {
    console.log(`then C ${value} done`);
},
function (value) {
    console.log(`then C ${value} error`);
});

/* Output:
then C 1 done
*/
// What is going on?!
