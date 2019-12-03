// create IIFE 'iffy' (Immediately Invoked Function Expression)
// so await will work
(async function() {

let list = ['await done 1', 'await done 2'];
console.log('before');
for(let idx in list) {
   await myAsyncFunc(1);
   console.log(list[idx]);
}
console.log('after');

/* Output:
before
await done 1
await done 2
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