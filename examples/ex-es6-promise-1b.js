// create IIFE 'iffy' (Immediately Invoked Function Expression)
// so await will work
(async function() {

// ------------------------------------
console.log('before');
await myAsyncFunc();
console.log('async/await done');
console.log('after');

/* Output:
before
async done 2
after
*/

// end IIFE
})();

// ------------------------------------
function myAsyncFunc(timeoutSeconds=1) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, timeoutSeconds * 1000);
    });
}
