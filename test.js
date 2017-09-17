'use strict';

const benchmark = require('./benchmark');
const logger = require('./logger');

// setup test
const loops = 10000000;



const testArray = [...new Array(loops).keys()];
testArray[loops - 1] = 'findme';

logger.log('testing on testArray with length', testArray.length);

const isInArrayForIn = (array, value) => {
    const result = [];
    for (let item in array) {
        if (array[item] === value) result.push(value);
    }
    return result;
};

const isInArrayFilter = (array, value) => {
    return array.filter(item => item === value);
};

const isInArrayReduce = (array, value) => {
    return array.reduce((result, item) => {
        if (item !== value) {
            return result;
        }
        result.push(item);
        return result;
    }, []);
};

benchmark.benchBatch([
    {fn: isInArrayForIn, args: [testArray, 'findme']},
    {fn: isInArrayFilter, args: [testArray, 'findme']},
    {fn: isInArrayReduce, args: [testArray, 'findme']},
]);
