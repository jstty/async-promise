var ProgressThread = require('app-alt2b-pthread.js');
/* Note: REAL Javascript, this code won't run */

// ------------------------------------
// Main Thread
// ------------------------------------
while(true) {
    var startButton = document.getElementById("start");
    var prog = document.getElementById("prog");

    if(startButton.getCurrentState() == 'click') {
        var progressThreadEvents = new EventEmitter();
        new Thread( ProgressThread, progressThreadEvents );
        // the Thread lib basiclly does:  ProgressThread(progressThreadEvents)

        while(true) {
            let event = progressThreadEvents.popEvent();

            if( event != NULL &&
                event.type == 'progressChange') {
                prog.value = event.value;
            }

            updateGui();
        }
    }

    updateGui();
}
