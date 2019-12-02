const MyPromise = require('./promise-lib.js');

// ------------------------------------
function myAsyncFunc(timeoutSeconds=1) {
    return new MyPromise((resolve, reject) => {
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
.then((value) => {
    console.log(`then A ${value} done`);
    return myAsyncFunc(2);
})
.then((value) => {
    console.log(`then B ${value} done`);
    return myAsyncFunc(3);
})
.then((value) => {
    console.log(`then C ${value} done`);
})
.catch((error) => {
    console.log(`catch ${error} error`);
});

/* Output:
then A 1 done
then B 2 done
catch 3 error
*/