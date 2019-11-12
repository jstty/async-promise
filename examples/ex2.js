
console.log('before');
myAsyncFunc(function() {
    console.log('async done 1');
}, 1 /* delay 1 seconds */);

myAsyncFunc(function() {
    console.log('async done 2');
}, 2 /* delay 2 seconds */);
console.log('after');




// ------------------------------------
function myAsyncFunc(callback, timeoutSeconds=1) {
    setTimeout(callback, timeoutSeconds * 1000);
}
