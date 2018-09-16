'use strict';

const Promise = require('bluebird');
const logger = require('./tools/Logger')(module);

module.exports = {
  /**
   * Log the returned value of each tested function. Turn on for debugging purposes
   */
  logOutput: false,
  /**
   * Persist generated logs in a logfile if true
   */
  persistLogs: false,
  /**
   * Get pre-defined objects to iterate over in functions
   * @param size {number} Size of iterator objects
   * @returns {{testArray: [null], testObject: *}}
   */
  getTestIterators: size => {
    console.info('\nCreated test assets of size', size, '\n');
    if (module.exports.persistLogs) {
      logger.persistSync(`\nCreated test assets of size ${size}\n`);
    }
    const testArray = [...new Array(size - 1).keys()];
    testArray[size] = 'findme';

    const testObject = testArray.reduce((result, item, index) => {
      result[index] = item;
      return result;
    }, {});
    testObject[size - 1] = 'findme';

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
    const functionTimer = new Date().getTime();
    return Promise.resolve()
      .then(() => {
        console.time(fn.name);
        return fn(...args);
      })
      .then(result => {
        console.timeEnd(fn.name);
        if (module.exports.persistLogs) {
          logger.persistSync(`a- ${fn.fn.name}: ${new Date().getTime() - functionTimer}ms`);
        }
        if (module.exports.logOutput) {
          console.info('Function result was', result);
        }
        return result;
      })
      .catch(error => {
        console.error(`Error while benchmarking function after ${new Date().getTime() - functionTimer}}ms: ${error.stack}`); // eslint-disable-line max-len
        if (module.exports.persistLogs) {
          logger.persistSync(`Error while benchmarking function after ${new Date().getTime() - functionTimer}}ms: ${error.stack}`); // eslint-disable-line max-len
        }
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
    if (module.exports.persistLogs) {
      logger.persistSync(`Benchmarking batch with Node version ${process.version}:`);
    }
    console.info(`Benchmarking batch with Node version ${process.version}:`)
    const batchTimer = new Date().getTime();
    console.time('Total');
    return Promise.each(fns, fn => {
      const functionTimer = new Date().getTime();
      console.time(fn.fn.name);
      return Promise.resolve()
        .then(() => fn.fn(...fn.args))
        .then(result => {
          console.timeEnd(fn.fn.name);
          if (module.exports.persistLogs) {
            logger.persistSync(`\t${fn.fn.name}: ${new Date().getTime() - functionTimer}ms`);
          }
          return module.exports.logOutput ? result : null;
        });
    })
      .then(results => {
        console.timeEnd('Total');
        if (module.exports.persistLogs) {
          logger.persistSync(`Whole function batch took: ${new Date().getTime() - batchTimer}ms\n\n____________________________________________________\n\n`); // eslint-disable-line max-len
        }
        if (module.exports.logOutput) {
          console.info(`Function results were; ${results.join(',')}`);
        }
        console.info();
      })
      .catch(error => {
        console.error(`Error while benchmarking batch after ${new Date().getTime() - batchTimer}}ms: ${error.stack}`);
        if (module.exports.persistLogs) {
          logger.persistSync(`Error while benchmarking batch after ${new Date().getTime() - batchTimer}}ms: ${error.stack}\n\n____________________________________________________\n\n`); // eslint-disable-line max-len
        }
        console.info();
      });
  },
  logger,
};
