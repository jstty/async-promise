
console.log('before');

for(let i = 0; i < 100; i++) {
    myAsyncFunc(function() {
        console.log(`async done ${i}`);
    }, 1 /* delay 1 second */);    
}

console.log('after');




// ------------------------------------
function myAsyncFunc(callback, timeoutSeconds=1) {
    setTimeout(callback, timeoutSeconds * 1000);
}
