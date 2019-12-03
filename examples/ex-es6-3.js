// create IIFE 'iffy' (Immediately Invoked Function Expression)
// so await will work
(async function() {

   // ------------------------------------
myAsyncFunc()
.then(() => {
   console.log('promise done');
},
(err) => {
   console.log('promise error:', err);
})
.catch((err) => {
   console.log('catch error:', err);
});
   
/* Output:
promise error: something bad happened
*/

// ------------------------------------
try {
   await myAsyncFunc();
}
catch(err) {
   console.log('catch error:', err);
}

/* Output:
catch error: something bad happened
*/


// end IIFE
})();

// ------------------------------------
// set to always reject
function myAsyncFunc(timeoutSeconds=1) {
   return new Promise(function(resolve, reject) {
       setTimeout(() => {
         reject('something bad happened');
       }, timeoutSeconds * 1000);
   });
}