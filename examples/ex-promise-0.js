
setTimeout(function(){
   console.log('async 1 done');
   setTimeout(function(){
      console.log('async 2 done');
      setTimeout(function(){
         console.log('async 3 done');
         setTimeout(function(){
            console.log('async 4 done');
         }, 4);
      }, 3);
   }, 2);
}, 1);

// ------------------------------------
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
})
.then(function (){
   console.log('async 4 done');
});


document.getElementById("orderBtn")
.onclick = function() {
   sendOrder(product)
   .then(function(result) {
      gotoConfirmPage(result);
   })
   .catch(function(err) {
      gotoErrorPage(err);
   })
};

// ------------------------------------
function myAsyncFunc(timeout) {
   return new Promise(function(resolve, reject) {
       setTimeout(resolve, timeout);
   });
}
