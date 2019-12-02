function MyPromise(executor) {
    let $onFulfilled = null;
    let $onRejected = null;

    let resolve = function(res) {
        if($onFulfilled) {
            $onFulfilled(res);
        }
    }
    let reject = function(res) {
        if($onRejected) {
            $onRejected(res);
        }
    }

    executor(resolve, reject);

    let promise = {
        then: function(onFulfilled, onRejected) {
            $onFulfilled = onFulfilled;
            $onRejected = onRejected;
            return this;
        }
    }

    return promise;
}

module.exports = MyPromise;