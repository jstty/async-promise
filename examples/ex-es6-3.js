console.log('before');
myAsyncFunc().then(function (){
    console.log('async done 1');
});
console.log('after');
/*
before
after
async done 1
*/

// ------------------------------------
console.log('before');
async myAsyncFunc();
console.log('async done 2');
console.log('after');
/*
before
async done 2
after
*/


// ------------------------------------
await function myAsyncFunc(timeoutSeconds=1) {
    return async (new Promise(function(resolve, reject) {
        setTimeout(resolve, timeoutSeconds * 1000);
    }));
}
