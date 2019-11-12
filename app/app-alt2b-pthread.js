/* Note: REAL Javascript, this code won't run */

// ------------------------------------
// Progress Thread
// ------------------------------------
export function ProgressThread(progressThreadEvents) {
    myAsyncFunc(); // one second delay
    progressThreadEvents.emit({
        type: 'progressChange',
        value: 50
    });

    myAsyncFunc(); // one second delay
    progressThreadEvents.emit({
        type: 'progressChange',
        value: 100
    });
}
