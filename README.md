### Benchmark
##### an out-of-the-box Javascript function benchmark library.

#### Setup
`npm install`

#### Usage
```
bench(fn, args)
    fn {function} Function to benchmark
    args {any[]} Arguments to call fn with
```
##### Example
```javascript
benchmark.bench(isInArrayForIn, [testArray, 'findme']);
```
##### Output:
```text
testing on testArray and testObject with length 10000000
isInArrayForIn: 2532.736ms
function result was [ 'findme' ]
```
Alternatively, if you want to benchmark multiple functions next-to each other:
#### Usage
```
benchBatch(fns)
    fns {object[]}
    fns[].fn {function} Function to benchmark
    fns[].args {any[]} Arguments to call fn with
```
##### Example
```javascript
benchmark.benchBatch([
    {fn: isInArrayForIn, args: [testArray, 'findme']},
    {fn: isInArrayFilter, args: [testArray, 'findme']},
    {fn: isInArrayReduce, args: [testArray, 'findme']},
    {fn: isInObjectForIn, args: [testObject, 'findme']},
    {fn: isInObjectFilter, args: [testObject, 'findme']},
    {fn: isInObjectReduce, args: [testObject, 'findme']},
]);
```
##### Output:
```text
testing on testArray and testObject with length 10000000
isInArrayForIn: 2518.409ms
isInObjectReduce: 2440.366ms
isInObjectFilter: 3003.176ms
isInObjectForIn: 2302.009ms
isInArrayReduce: 323.999ms
isInArrayFilter: 315.491ms
benchBatch: 10908.597ms
results were findme,findme,findme,findme,findme,findme

```
