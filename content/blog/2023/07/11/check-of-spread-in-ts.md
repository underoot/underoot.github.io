---
title: Check of spread in TS
description: Recently, my colleagues found an interesting case of checking the conforming shape of an object to type in TS if it was extended with another object by spread operator. And yes, TS in that case just ignore validation of unknown fields for type. It's a good reminder that usage of spread operator should be minimized as much as possible. Better to think twice about structures in your project and do not use it for business model entities at all
date: 2023-07-11
tags: typescript
---

Recently, my colleagues found an interesting case of checking the conforming shape of an object to type in TS if it was extended with another object by spread operator. And yes, TS in that case just ignore validation of unknown fields for type. It's a good reminder that usage of spread operator should be minimized as much as possible. Better to think twice about structures in your project and do not use it for business model entities at all

<a href="https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4BQyxycA5hAFzIgCuAtgEbQDcRJIc9VyGYUoMmxLJGcKAH5qdJtAIBfAgQQ4+yAA6YcARmroo2XAF587YuR7aATABozNLjwBEAZitXrTuyIB0fwiIikHyC1NYu3oHmjAhhkcSKisqqYBpaIFZ66cgmASQWYbb2nNzUru6e8cjBYKHI4VVwMXEKQA" target="_blank">Link to playground</a>
