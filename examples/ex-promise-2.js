console.log('before');
myAsyncFunc(1).then(function (value){
   console.log(value);
});
console.log('after');

// ------------------------------------
function myAsyncFunc(timeoutSeconds=1) {
   return new Promise(function(resolve, reject) {
       setTimeout(resolve, timeoutSeconds * 1000);
   });
}
