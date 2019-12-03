// create IIFE 'iffy' (Immediately Invoked Function Expression)
(async function() {

console.log('before');
myAsyncFunc(1).then(function (){
    console.log('promise done');
});
await myAsyncFunc(2);
console.log('await done');
console.log('after');

/* Output:
before
promise done
await done
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
