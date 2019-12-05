
console.log('before');
setTimeout(function() {
    console.log('async done');
}, 0);
console.log('after');

/* Output:
before
after
async done
*/
