---
title: Node.js threads
description: Node.js is often mistakenly thought of as a single-threaded JavaScript engine. However, this is not accurate. Experienced Node.js engineers are aware of the separate libuv thread pool used for delegating synchronous a file system and a DNS utility operations out of the main thread. But, in reality, the actual number of threads is much larger. If you start Node.js you will see 10 threads alongside with main thread.
date: 2024-06-30
tags:
  - javascript
  - nodejs
---
Node.js is often mistakenly thought of as a **single-threaded** JavaScript engine. However, this is not accurate. Experienced Node.js engineers are aware of the separate libuv thread pool used for delegating synchronous a file system and a DNS utility operations (like `getaddrinfo` and `getnameinfo`) out of the main thread. But, in reality, the actual number of threads is much larger. If you start Node.js you will see 10 threads alongside with main thread:
```sh
ps -m <PID>
USER       PID   TT   %CPU STAT PRI     STIME     UTIME COMMAND
underoot 14489 s006    3.1 S    31T   0:00.70   0:00.27 node index.mjs
         14489         0.0 S    31T   0:00.00   0:00.00 
         14489         0.0 S    31T   0:00.00   0:00.00 
         14489         0.0 S    31T   0:00.00   0:00.01 
         14489         0.0 S    31T   0:00.00   0:00.00 
         14489         0.0 S    31T   0:00.00   0:00.00 
         14489         0.0 S    31T   0:00.00   0:00.00 
         14489         0.0 S    31T   0:00.00   0:00.00 
         14489         0.0 S    31T   0:00.00   0:00.00 
         14489         0.0 S    31T   0:00.00   0:00.00 
         14489         0.0 S    31T   0:00.00   0:00.00 
```
Only [4 of them](https://docs.libuv.org/en/v1.x/threadpool.html) belong to the default libuv thread pool and rest of them responsible for other tasks.
## Libuv
The Libuv thread pool keeps synchronous operations outside of the main thread with a default event loop. You can control the size of the pool with the environment variable [`UV_THREADPOOL_SIZE`](https://docs.libuv.org/en/v1.x/threadpool.html). Before version 1.45.0 of Libuv, it was correct to say that all file system operations go to a thread pool. Nowadays on Linux systems, if the Linux kernel is compiled with [io_uring](https://en.wikipedia.org/wiki/Io_uring), which gives the ability to do I/O operations asynchronously, execution of such operations like `fs.readFile` will be done in the kernel and result eventually, not synchronously after getting data in the separate thread, as before, will be handled in default Libuv event loop. According to [the comment](https://github.com/libuv/libuv/pull/3952) from maintainer of Libuv enabling of `io_uring` "an 8x increase in throughput". But in Node.js by default, this API is disabled because of known vulnerability [CVE-2024-22017](https://nvd.nist.gov/vuln/detail/CVE-2024-22017): if you start some file system operations with privileges and downgrade them during file system call, results of operation will be available to unprivileged process anyway. Commits with disabled of `io_uring` can be found [here](https://github.com/nodejs/node/commit/42e659cb9d9425f76dbe9b57a437005508c0933d) and [here](https://github.com/nodejs/node/commit/6d14352c51974f0ba1a11e9e4889e61dae9da1f4#diff-f8507e4b4f0efe29edd191af090c7d1f57744511237a1972736536e9a594f5ff). But if you know what you do and you want to test performance of asynchronous file system operations you can enable `io_uring` with environment variable `UV_USE_IO_URING=1`.
## V8
V8 is the JavaScript engine [powering Node.js](https://nodejs.org/en/learn/getting-started/the-v8-javascript-engine#the-v8-javascript-engine). It is doing a lot of job, which is being moved to separate V8 thread pool. You can control the size of this pool with Node.js CLI flag `--v8-pool-size=...`. During Node.js initialization, it [will instantiate](https://github.com/nodejs/node/blob/77710251e10982f847d2d3dfcf5d920b0a03a539/src/node_platform.cc#L184-L195) number of threads for V8 based on passed mentioned CLI option:
```cpp
  for (int i = 0; i < thread_pool_size; i++) {
    PlatformWorkerData* worker_data = new PlatformWorkerData{
      &pending_worker_tasks_, &platform_workers_mutex,
      &platform_workers_ready, &pending_platform_workers, i
    };
    std::unique_ptr<uv_thread_t> t { new uv_thread_t() };
    if (uv_thread_create(t.get(), PlatformWorkerThread,
                         worker_data) != 0) {
      break;
    }
    threads_.push_back(std::move(t));
  }
```
Alongside with V8 thread pool, Node.js also [creates a thread for delayed tasks](https://github.com/nodejs/node/blob/77710251e10982f847d2d3dfcf5d920b0a03a539/src/node_platform.cc#L182). For example, when you [instantiate WebAssembly module](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiate_static), Node.js will collect performance metrics and will do it later and with this separate thread.
## Inspector agent
Node.js from the [version 6.3.0](https://github.com/nodejs/node/commit/50aede52999ecb34b38c30c53c5b3a1cb724b04f) has support of [Chrome DevTools protocol through inspector agent](https://github.com/nodejs/node/issues/2546) that runs in [a separate thread](https://github.com/nodejs/node/blob/77710251e10982f847d2d3dfcf5d920b0a03a539/src/inspector_agent.cc#L119) and communicates with the front end of debugger, which can be, for example, Chrome developer tools. So, every time when you put breakpoint in Chrome when you are debugging Node.js, your breakpoint is handled by this inspector agent.
## Worker threads
The 10th version of Node.js [introduced](https://github.com/nodejs/node/pull/20876) new API: [worker threads](https://nodejs.org/api/worker_threads.html). It's a user-land feature which gives ability to instantiate separate thread and communicate between them through [`MessageChannel`](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel) with transferrable [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) of shareable [`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer). Here is the example from Node.js documentation about worker threads.
```js
const {
  Worker, isMainThread, parentPort, workerData,
} = require('node:worker_threads');

if (isMainThread) {
  module.exports = function parseJSAsync(script) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: script,
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
} else {
  const { parse } = require('some-js-parsing-library');
  const script = workerData;
  parentPort.postMessage(parse(script));
}
```
Worth to mention if you will try to check that child threads actually do job separately from the main thread and will try to block the main thread, keep in mind that if you will try to print something in `stdio` you won't be able to do so, because threads reuse parent `stdio` and if you block the main thread, it won't be available for thread.
## Conclusion
By default, the Node.js main thread will instantiate additional 10 threads: 4 Libuv threads for handling synchronous operations such as file system operations and DNS utility operations, 4 V8 threads for handling a JavaScript engine related tasks like garbage collection, 1 thread for not critical delayed tasks and 1 thread for inspector agent, which is responsible for handling Chrome DevTools commands such as debugging and profiling. Users also free to use `worker_threads` module to instantiate new threads.
