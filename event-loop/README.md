## Event Loop

### Phases Overview

1. Timers (setTimeout, setInterval)
2. Pending Callbacks (I/O callbacks)
3. Idle, Prepare
4. Poll (retrieving new I/O events)
5. Check (setImmediate)
6. Close Callbacks (e.g., socket.on('close', ...))

### Microtasks

- Microtasks (e.g., Promises, process.nextTick) are executed at the start and immediately after each callback.
- The microtask queue is processed until empty. (i.e., if a microtask enqueues another microtask, it will be executed in the same cycle.)

### Curiosities

- The behaviour of microtasks and nextTick varies between CommonJS and ES Modules.
  - In CommonJS, process.nextTick callbacks are executed before Promise microtasks.
  - In ES Modules, it's in the same order, but the module starts at the microtask checkpoint.
  - That means in ES Modules, process.nextTick callbacks are executed after Promise microtasks, but only at the start of the event loop cycle.
