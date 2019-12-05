console.log('before');
var promise1 = new Promise(function (resolve, reject){
   setTimeout(function() {
       resolve('async done 1');
   }, 1);
});
promise1.then(function (value){
   console.log(value);
});
console.log('after');

/* Output:
before
after
async done 1
*/
