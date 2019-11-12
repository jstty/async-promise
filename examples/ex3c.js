
console.log('before');

myAsyncFunc(function() {
    console.log('async done 1');

    myAsyncFunc(function() {
        console.log('async done 2');

        myAsyncFunc(function() {
            console.log('async done 3');
        }, 1 /* delay 1 seconds */);
    }, 2 /* delay 2 seconds */);
}, 3 /* delay 3 seconds */);

console.log('after');


// ------------------------------------
function myAsyncFunc(callback, timeoutSeconds=1) {
    setTimeout(callback, timeoutSeconds * 1000);
}
