let ID = 0;
let debug = false;

function MyPromise(executor) {
    let $ID = ++ID;
    if(debug) console.info('--- ID:', $ID);

    let $onFulfilled = null;
    let $onRejected = null;

    let resolve = function(res) {
        if($onFulfilled) {
            if(debug) console.info('--- $onFulfilled ID:', $ID);
            $onFulfilled(res);
        }
    };
    
    let reject = function(res) {
        if($onRejected) {
            if(debug) console.info('--- $onRejected ID:', $ID);
            $onRejected(res);
        }
    }

    executor(resolve, reject);

    // ----------------------------------------
    function _then(onFulfilled, onRejected) {
        if(debug) console.info('--- then ID:', $ID);

        return MyPromise(function (_resolve, _reject) {
            if(onFulfilled) {
                $onFulfilled = function (res) {
                    if(debug) console.info('--- onFulfilled ID:', $ID);
                    let _res = onFulfilled(res);
    
                    // if promise
                    if ( (_res != null) &&
                        (typeof _res.then === 'function') ) {
                        _res.then(_resolve, _reject);
                    }
                };
            }

            if(onRejected) {
                $onRejected = function (res) {
                    if(debug) console.info('--- onRejected ID:', $ID);
                    let _res = onRejected(res);
    
                    // if promise
                    if ( (_res != null) &&
                        (typeof _res.then === 'function') ) {
                        _res.then(_resolve, _reject);
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
