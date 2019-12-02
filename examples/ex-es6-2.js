
var list = ['async done 1', 'async done 2'];
console.log('before');
list.forEach(list, await function(item) {
   async myAsyncFunc(1);
   console.log(item);
});
console.log('after');

// ------------------------------------
await function myAsyncFunc(timeoutSeconds=1) {
   return async (new Promise(function(resolve, reject) {
       setTimeout(resolve, timeoutSeconds * 1000);
   }));
}
