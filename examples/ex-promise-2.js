console.log('before');
myAsyncFunc(1).then(function (value){
   console.log('async', value, 'done');
});
console.log('after');

/* Output:
before
after
async done 1
*/

// ------------------------------------
function myAsyncFunc(timeoutSec=1) {
   return new Promise(function(resolve, reject) {
      setTimeout(function() {
         resolve(timeoutSec);
      }, timeoutSec * 1000);
   });
}
