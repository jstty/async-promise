let ID = 0;

function MyPromise(executor) {
    let $onFulfilled = null;
    let $onRejected = null;

    let resolve = function(res) {
        if($onFulfilled) {
            let _res = $onFulfilled(res);
            if ( (_res != null) &&
                 (typeof _res.then === 'function') ) {
                return _res.then(resolve, reject);
            }
        }
    };
    
    let reject = function(res) {
        if($onRejected) {
            let _res = $onRejected(res);
            if ( (_res != null) &&
                 (typeof _res.then === 'function') ) {
                return _res.then(resolve, reject);
            }
        }
    }

    executor(resolve, reject);

    // ----------------------------------------
    function _then(onFulfilled, onRejected) {
        // console.info('ID:', this.$ID);

        return MyPromise(function (_resolve, _reject) {
            if(onFulfilled) {
                $onFulfilled = function (res) {
                    let _res = onFulfilled(res);
                    // next
                    // _resolve(_res);
    
                    if ( (_res != null) &&
                        (typeof _res.then === 'function') ) {
                        return _res.then(_resolve, _reject);
                    }
                };
            }

            if(onRejected) {
                $onRejected = function (res) {
                    // onRejected(res);
                    let _res = onRejected(res);
                    // // next
                    // _resolve(_res);
    
                    if ( (_res != null) &&
                        (typeof _res.then === 'function') ) {
                        return _res.then(_resolve, _reject);
                    }
                };
            }
        });
    }

    function _catch(onRejected) {
        return _then(undefined, onRejected);
    }

    let promise = {
        then: _then,
        catch: _catch
    };

    return promise;
}

module.exports = MyPromise;
