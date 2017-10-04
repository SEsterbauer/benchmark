'use strict';

const Promise = require('bluebird');
const logger = require('./logger');

module.exports = {
    /**
     * Benchmark a function
     * @param fn {function} Function to benchmark
     * @param args {any[]} Arguments to call fn with
     * @return {Promise.<any>}
     */
    bench: (fn, args) => {
        logger.time(fn.name);
        return Promise.resolve()
            .then(() => {
                return fn(...args);
            })
            .then(result => {
                logger.timeEnd(fn.name);
                logger.log('function result was', result);
                return result;
            })
            .catch(error => {
                logger.error('Error during benchmark:', error);
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
        logger.time('benchBatch');
        return Promise.map(fns, fn => {
            logger.time(fn.fn.name);
            return Promise.resolve()
                .then(() => fn.fn(...fn.args))
                .then(result => {
                    logger.timeEnd(fn.fn.name);
                    return result;
                });
        }, { concurrency: 1 })
            .then(results => {
                logger.timeEnd('benchBatch');
                logger.log('function results were', results.join(','));
                return results;
            })
            .catch(error => {
                logger.error('Error during benchmark batch', error);
            });
    },
};
