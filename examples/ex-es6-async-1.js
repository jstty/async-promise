// create IIFE 'iffy' (Immediately Invoked Function Expression)
// so await will work
(async function() {

let list = ['await done 1', 'await done 2'];
console.log('before');
list.forEach(async (item) => {
   await myAsyncFunc(1);
   console.log(item);
});
console.log('after');

/* Output:
before
after
await done 1
await done 2
*/


// end IIFE
})();


// ------------------------------------
function myAsyncFunc(timeoutSeconds=1) {
   return new Promise(function(resolve, reject) {
       setTimeout(resolve, timeoutSeconds * 1000);
   });
}
