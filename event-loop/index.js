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

  Promise.resolve().then(() => {
    console.log('4.1 Promise from Next Tick');
  });
});

fs.readFile('./file.txt', 'utf-8', (err, data) => {
  console.log('6.1 I/O Callback');

  setTimeout(() => {
    console.log('6.5 Timeout from I/O');
  }, 0);

  setImmediate(() => {
    console.log('6.5 Immediate from I/O');
  });

  Promise.resolve().then(() => {
    console.log('6.3 Promise from I/O');
  });

  process.nextTick(() => {
    console.log('6.2 Next Tick from I/O');
  });

  Promise.resolve().then(() => {
    console.log('6.4 Promise 2 from I/O');
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
