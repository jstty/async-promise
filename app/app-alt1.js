/* Note: REAL Javascript, this code won't run */

var listener = document.getElementById("start").getEventListener();

while(true) {
    var event = listener.popEvent();
    if(event.type == 'click') {
        var prog = document.getElementById("prog");

        /* !!! problem? !!! */
        myAsyncFunc(); // one second delay
        prog.value = 50;

        /* !!! problem? !!! */
        myAsyncFunc(); // one second delay
        prog.value = 100;
    }

    updateGui();
}
