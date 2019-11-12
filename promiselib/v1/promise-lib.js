
function MyPromise(asyncFuntion) {
    let resolveTrigger = null;
    let rejectTrigger = null;

    let resolve = function(result) {
        console.log('resolve');
        if(resolveTrigger) {
            resolveTrigger(result);
        }
    }
    let reject = function() {
        console.log('reject');
        if(rejectTrigger) {
            resolveTrigger(rejectTrigger);
        }
    }

    asyncFuntion(resolve, reject);

    let promise = {
        then: function(resolve) {
            resolveTrigger = resolve;
            return promise;
        },
        catch: function(reject) {
            rejectTrigger = reject;
            return promise;
        }
    }

    return promise
}

module.exports = MyPromise;
