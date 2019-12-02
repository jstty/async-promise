let ID = 0;

// Based on the article:
// https://thecodebarbarian.com/write-your-own-node-js-promise-library-from-scratch.html

class MyPromise {
    // `executor` takes 2 parameters, `resolve()` and `reject()`. The executor
    // function is responsible for calling `resolve()` or `reject()` to say that
    // the async operation succeeded (resolved) or failed (rejected).
    constructor(executor) {
        this.$ID = ++ID; // for debugging

        if (typeof executor !== 'function') {
            throw new Error('Executor must be a function');
        }
        
        // Internal state.
        // `$state` is the state of the promise
        // `$actions` is the `onFulfilled` and/or `onRejected` functions we need to call once this promise is settled
        // `$next` in chain, for triggering rejected calls
        this.$state = 'PENDING';
        this.$actions = {};
        this.$next = null;
    
        // `resolve()` for the executor function to use
        const resolve = (res) => {
            // A promise is considered "settled" when it is no longer
            // pending, that is, when either `resolve()` or `reject()`
            // was called once. Calling `resolve()` or `reject()` twice
            // or calling `reject()` after `resolve()` was already called
            // are no-ops.
            if (this.$state !== 'PENDING') {
                return;
            }

            // If `res` is a "thenable", lock in this promise to match the
            // resolved or rejected state of the thenable.
            if ( (res != null) &&
                 (typeof res.then === 'function') ) {
                // In this case, the promise is "resolved", but still in the 'PENDING'
                // state. This is what the ES6 spec means when it says "A resolved promise
                // may be pending, fulfilled or rejected" in
                // http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects
                return res.then(resolve, reject);
            }

            // There's a subtle difference between 'fulfilled' and 'resolved'
            // "Resolved" is not an actual promise state, but it is a term defined in the ES6 spec.
            this.$state = 'FULFILLED';
            this.$internalValue = res;

            // If `.then(onFulfilled, onRejected)` or `.catch(onRejected)` called while this promise was pending, 
            // need to call their `onFulfilled()` function if exist
            // need to call their `onRejected()` function if exist
            if(this.$actions.onFulfilled) {
                this.$actions.onFulfilled(res);
            }
        };
        
        // `reject()` for the executor function to use
        const reject = (res) => {
            if (this.$state !== 'PENDING') {
                return;
            }

            // If `res` is a "thenable", lock in this promise to match the
            // resolved or rejected state of the thenable.
            if ( (res != null) &&
                 (typeof res.then === 'function') ) {
                // In this case, the promise is "resolved", but still in the 'PENDING'
                // state. This is what the ES6 spec means when it says "A resolved promise
                // may be pending, fulfilled or rejected" in
                // http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects
                return res.then(resolve, reject);
            }

            this.$state = 'REJECTED';
            this.$internalValue = res;

            // If `.then(onFulfilled, onRejected)` or `.catch(onRejected)` called while this promise was pending, 
            // need to call their `onRejected()` function if exist
            if(this.$actions.onRejected) {
                this.$actions.onRejected(res);
            } else {
                // Check next promise in chain, until a `onRejected` function is found then stop
                let next = this.$next;
                while (next) {
                    if(next.$actions.onRejected) {
                        next.$actions.onRejected(res);
                        // stop at first rejected handler
                        break;
                    }
                    next = next.$next;
                }
            }
        };
    
        // Call the executor function with `resolve()` and `reject()` as in the spec.
        try {
            // If the executor function throws a sync exception, we consider that
            // a rejection. Keep in mind that, since `resolve()` or `reject()` can
            // only be called once, a function that synchronously calls `resolve()`
            // and then throws will lead to a fulfilled promise and a swallowed error
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    // `onFulfilled` is called if the promise is fulfilled, and `onRejected`
    // if the promise is rejected.
    then(onFulfilled, onRejected) {
        // Create new Promise instance
        // Ensure that errors in `onFulfilled()` and `onRejected()` reject the
        // returned promise, otherwise they'll crash the process.
        let thenPromise = new MyPromise((resolve, reject) => {
            let resolveWrapper = null;
            let rejectWrapper = null;

            // Encapsulate new promise with then `onFulfilled` and `onRejected`
            if(onFulfilled) {
                resolveWrapper = (res) => {
                    try {
                        // If `onFulfilled()` returns a promise, trust `resolve()` to handle
                        // it correctly.
                        let _res = onFulfilled(res);
                        resolve(_res);
                    } catch (err) {
                        reject(err);
                    }
                };
            }

            if(onRejected) {
                rejectWrapper = (res) => {
                    try {
                        let _res = onRejected(res);
                        resolve(_res);
                    } catch (err) {
                        reject(err);
                    }
                };
            }

            if (this.$state === 'FULFILLED') {
                resolveWrapper(this.$internalValue);
            } else if (this.$state === 'REJECTED') {
                rejectWrapper(this.$internalValue);
            } else {
                this.$actions = { onFulfilled: resolveWrapper, onRejected: rejectWrapper };
            }
        });

        // Set new promise to `$next` in promise chain, for use with reject
        this.$next = thenPromise;

        return thenPromise;
    }

    catch(onRejected) {
        // same as then with no `onFulfilled`
        return this.then(undefined, onRejected);
    }
}

module.exports = MyPromise;
