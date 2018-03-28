'use strict';

const Promise = require('bluebird');

module.exports = {
  /**
   * Log the returned value of each tested function. Turn on for debugging purposes
   */
  logOutput: false,
  /**
   * Get pre-defined objects to iterate over in functions
   * @param size {number} Size of iterator objects
   * @returns {{testArray: [null], testObject: *}}
   */
  getTestIterators: size => {
    console.log('testing on testArray and testObject with length', size);

    const testArray = [...new Array(size).keys()];
    testArray[size] = 'findme';

    const testObject = testArray.reduce((result, item, index) => {
      result[index] = item;
      return result;
    }, {});
    testObject[size] = 'findme';

    return {
      testArray,
      testObject,
    };
  },
  /**
   * Benchmark a function
   * @param fn {function} Function to benchmark
   * @param args {any[]} Arguments to call fn with
   * @return {Promise.<any>}
   */
  bench: (fn, args) => {
    console.time(fn.name);
    return Promise.resolve()
      .then(() => {
        return fn(...args);
      })
      .then(result => {
        console.timeEnd(fn.name);
        console.log('function result was', result);
        return result;
      })
      .catch(error => {
        console.error('Error during benchmark:', error);
      });
  },
  /**
   * Benchmark a batch of functions synchronously
   * @param fns {object[]}
   * @param fns[].fn {function} Function to benchmark
   * @param fns[].args {any[]} Arguments to call fn with
   * @return {Promise.<any>}
   */
  benchBatch: (fns) => {
    console.time('benchBatch');
    return Promise.map(fns, fn => {
      console.time(fn.fn.name);
      return Promise.resolve()
        .then(() => fn.fn(...fn.args))
        .then(result => {
          console.timeEnd(fn.fn.name);
          return result;
        });
    }, { concurrency: 1 })
      .then(results => {
        console.timeEnd('benchBatch');
        if (module.exports.logOutput) {
          console.log('function results were', results.join(','));
        }
        return results;
      })
      .catch(error => {
        console.error('Error during benchmark batch', error);
      });
  },
};
