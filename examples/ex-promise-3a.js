
myAsyncFunc(function(){
   console.log('async 1 done');
   myAsyncFunc(function(){
      console.log('async 2 done');
      myAsyncFunc(function(){
         console.log('async 3 done');
         // ...
      }, 3);
   }, 2);
}, 1);

/* Output:
async 1 done
async 2 done
async 3 done
async 4 done
*/

// ------------------------------------
function myAsyncFunc(callback, timeoutSec=1) {
   setTimeout(callback, timeoutSec * 1000);
}
