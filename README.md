## FnBenchmark
##### an out-of-the-box Javascript function benchmark library.


#### Setup

- ##### Create functions to benchmark

  See `example.js`

#### Benchmark a single function with fnbenchmark.bench() 
  ```
  bench(fn, args)
    fn {function} Function to benchmark
    args {any[]} Arguments to call fn with
  ```
##### Example
```javascript
fnbenchmark.bench(isInArrayForIn, [testArray, 'findme']);
```
##### Output:
```text
testing on testArray and testObject with length 10000000
isInArrayForIn: 2532.736ms
function result was [ 'findme' ]
```
#### Benchmark multiple functions in parallel with fnbenchmark.benchBatch()
```
benchBatch(fns)
    fns {object[]}
    fns[].fn {function} Function to benchmark
    fns[].args {any[]} Arguments to call fn with
```
##### Example
```javascript
fnbenchmark.benchBatch([
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
function results were findme,findme,findme,findme,findme,findme

```

#### Options

- `fnbenchmark.logOutput [false]` - Log returned values of benchmarked functions

#### Running benchmarks in multiple Node versions

Since fnbenchmark v1.1, it's possible to automatically run benchmarks in different Node versions!

- Add a file called `node_versions` to your local tests repository's root directory and list the Node versions to be run

    ```bash
    6.10.2
    8.10.0
    9.9.0
    ```

- Add this npm script to your local tests repository

    ```
    "scripts": {
      "multi": "npm explore fnbenchmark -- npm run multi_versions"
    }
    ```

- Run the added npm script and specify the test to run in the first parameter
 
    ```bash
    npm run multi loops
    ```
