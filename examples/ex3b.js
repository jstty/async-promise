
console.log('before');
myAsyncFunc(function() {
    console.log('async done 1');
}, 2 /* delay 2 seconds */);
myAsyncFunc(function() {
    console.log('async done 2');
}, 1 /* delay 1 seconds */);
console.log('after');

/* Output:
before
after
async done 1
async done 2
*/

// ------------------------------------
function myAsyncFunc(callback, timeoutSeconds=1) {
    setTimeout(callback, timeoutSeconds * 1000);
}
