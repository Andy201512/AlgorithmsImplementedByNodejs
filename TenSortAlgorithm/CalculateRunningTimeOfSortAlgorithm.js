const {
    performance,
    PerformanceObserver
} = require('perf_hooks');

const SortAlgorithmName = ['SelectionSort'];

const unshortArray = Array.from({length: 10}, () => Math.floor(Math.random() * (9 - 0 + 1)) + 0);
console.log(`unshortArray is`, unshortArray);

SortAlgorithmName.forEach(
    (name) => {
        const SortAlgorithmFunction = require(`.\//` + `${name}`);
        let start = performance.now();

        let sortedArray = SortAlgorithmFunction(unshortArray);
        
        let end = performance.now();
        console.log(`${name}Array is`, sortedArray);
        console.log(`${name} cost is`, `${end - start}ms`)
    }
);

