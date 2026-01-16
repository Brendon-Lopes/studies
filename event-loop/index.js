import fs from 'node:fs';

console.log('1. Start');

setTimeout(() => {
  // non-deterministic order with immediate
  console.log('5.? Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('3.1 Promise 1');

  Promise.resolve().then(() => {
    console.log('3.3 Promise 3');
  });
});

process.nextTick(() => {
  console.log('4. Next Tick');
});

fs.readFile('./file.txt', 'utf-8', (err, data) => {
  setImmediate(() => {
    console.log('6. Immediate from I/O');
  });
});

setImmediate(() => {
  // non-deterministic order with timeout
  console.log('5.? Immediate');
});

Promise.resolve().then(() => {
  console.log('3.2 Promise 2');
});

console.log('2. End');

/**
 * Curiosities:
 * - The behaviour of microtasks and nextTick varies between CommonJS and ES Modules.
 *  - In CommonJS, process.nextTick callbacks are executed before Promise microtasks.
 *  - In ES Modules, Promise microtasks are executed before process.nextTick callbacks.
 *  - This code is written as an ES Module, so Promise microtasks run before nextTick.
 */
