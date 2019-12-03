// create IIFE 'iffy' (Immediately Invoked Function Expression)
// so await will work
(async function() {

console.log('promise before');
myAsyncFunc().then(function (){
    console.log('promise done 1');
});
console.log('promise after');

/* Output:
before
after
async done 1
*/

// ------------------------------------
console.log('await before');
await myAsyncFunc();
console.log('await done 2');
console.log('await after');

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
