'use strict';

const benchmark = require('./benchmark');

// setup test
const testIterators = benchmark.getTestIterators(10000000);
const testArray = testIterators.testArray;
const testObject = testIterators.testObject;

const isInArrayForIn = (array, value) => {
    const result = [];
    for (let key in array) {
        if (array[key] === value) result.push(value);
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

const isInObjectForIn = (object, value) => {
    const result = [];
    for (let key in object) {
        if (object[key] === value) result.push(object[key]);
    }
    return result;
};

const isInObjectFilter = (object, value) => {
    return Object.keys(object).filter(key => {
        if (object[key] === value) {
            return true;
        }
    }).map(key => object[key]);
};

const isInObjectReduce = (object, value) => {
    return Object.keys(object).reduce((result, key) => {
        if (object[key] !== value) {
            return result;
        }
        result.push(object[key]);
        return result;
    }, []);
};

benchmark.benchBatch([
    {fn: isInArrayForIn, args: [testArray, 'findme']},
    {fn: isInArrayFilter, args: [testArray, 'findme']},
    {fn: isInArrayReduce, args: [testArray, 'findme']},
    {fn: isInObjectForIn, args: [testObject, 'findme']},
    {fn: isInObjectFilter, args: [testObject, 'findme']},
    {fn: isInObjectReduce, args: [testObject, 'findme']},
]);
