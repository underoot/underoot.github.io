---
title: Node.js for utility scripts
description: "From time to time I need to write at work or for my pet-project different automation scripts and every time I face a grand dilemma: what language I should use. One option is an entangled bash with dozens of constructions, which are impossible to remember. Another one is Python: quite lightweight, but some things take getting used to."
date: 2023-06-19
tags:
  - nodejs
  - javascript
---

From time to time I need to write at work or for my pet-project different automation scripts and every time I face a grand dilemma: what language I should use. One option is an entangled bash with dozens of constructions, which are impossible to remember. Another one is Python: quite lightweight, but some things take getting used to.

But what about Node.js? Well, I tried so hard and got so far^W^W^W^W, but some parts of Node.js API were so ugly and too clumsy for efficiently implemented and simple tools.

But today I gave another chance to Node.js. And it was surprisingly productive: for Promise-based API you finally can use module-level await. Oh my God, you have a great opportunity, without the NPM library or another utility function, recursively remove the directory with `fs.rmSync('/path/to/dir', { recursive: true, force: true })`

And last, but not least fantastic thing: every time, absolutely every time for some utility script I used to install some new library for parsing of CLI arguments: optimist, yargs, commander... But finally, with the 18th version, you can do it with a built-in utility in Node.js, which I honestly like:

```javascript
import { parseArgs } from "node:util";

const {
  values: { solution, tests },
} = parseArgs({
  options: {
    solution: {
      type: "string",
      short: "s",
    },
    tests: {
      type: "string",
      short: "t",
    },
  },
});
```

Looks like a competition with other instruments like Deno helped Node.js a lot with improving usability and developer experience
