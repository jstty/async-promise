
myAsyncFunc(1)
.then(function (){
   console.log('async 1 done');
   return myAsyncFunc(2);
})
.then(function (){
   console.log('async 2 done');
   return myAsyncFunc(3);
})
.then(function (){
   console.log('async 3 done');
   return myAsyncFunc(4);
});
// ...

/* Output:
async done 1
async done 2
async done 3
*/

// ------------------------------------
function myAsyncFunc(timeoutSec=1) {
   return new Promise(function(resolve, reject) {
       setTimeout(resolve, timeoutSec * 1000);
   });
}
