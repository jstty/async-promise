
console.log('before');
myAsyncFunc(function() {
    console.log('async done');
});
console.log('after');

/* Output:
before
after
async done
*/

// ------------------------------------
function myAsyncFunc(callback, timeoutSeconds=1) {
    setTimeout(callback, timeoutSeconds * 1000);
}
