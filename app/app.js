
function onStartClick() {
    var prog = document.getElementById("prog");

    myAsyncFunc(function() {
        prog.value = 50;

        myAsyncFunc(function() {
            prog.value = 100;
        });
    });
}

document.getElementById("start").addEventListener("click", onStartClick);

// ------------------------------------
function myAsyncFunc(callback, timeoutSeconds=1) {
    setTimeout(callback, timeoutSeconds * 1000);
}
