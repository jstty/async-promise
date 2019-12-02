const MyPromise = require('./promise-lib.js');

// ------------------------------------
function myAsyncFunc(timeoutSeconds=1) {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            if(timeoutSeconds === 1) {
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
.catch((error) => {
    console.log(`catch ${error} error`);
})
.then((value) => {
    console.log(`then B ${value} done`);
    return myAsyncFunc(3);
})
.then((value) => {
    console.log(`then C ${value} done`);
});

/* Output:
catch 1 error
then B undefined done
then C 3 done
*/
