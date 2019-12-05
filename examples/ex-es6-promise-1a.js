console.log('before');
myAsyncFunc().then(function (){
    console.log('promise done');
});
console.log('after');

/* Output:
before
after
promise done
*/

// ------------------------------------
function myAsyncFunc(timeoutSeconds=1) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, timeoutSeconds * 1000);
    });
}
