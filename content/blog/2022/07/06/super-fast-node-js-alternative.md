---
title: Super-fast Node.js alternative
date: 2022-07-06
---
Recently found an attractive server platform <a href="https://bun.sh" target="_blank">bun</a>. It's a platform written on the base of <a href="https://developer.apple.com/documentation/javascriptcore" target="_blank">JavaScriptCore</a> and supports many valuable things from the box like Node.js modules resolving algorithm, part of Node.js built-in APIs and web APIs. It even supports out-of-box transpilation of TypeScript code and JSX. The author says that it’s a very fast instrument and provides benchmarks for it which looks astonishing. Also, he emphasises that bun’s start time is very short, probably if compared with Node.js.

Some things I found very catchy: i.e. without any third-party modules bun reads `.env` file to load variables to the environment. Take a look also at the example of the "Hello world" HTTP server:

```js
export default {
  port: 3000,
  fetch(request: Request) {
    return new Response("Hello World");
  },
};
```
<caption>Very simple approach without any odd actions</caption>

But for me also the most interesting part is that it's written with <a href="https://ziglang.org" target="_blank">Zig</a> — a low-level programming language with manual memory management. Recently I have been finding more and more instruments that use this language. 🤔
