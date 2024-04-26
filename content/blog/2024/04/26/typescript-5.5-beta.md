---
title: My favourite part of TS 5.5 beta
date: 2024-04-26
description: TypeScript 5.5 beta and it finally can do inference on predicates. It's a small change which makes the typing of code more consistent with its logic.
tags: typescript
---
One of the most painful things in TypeScript was the inability to infer types in predicates. For example, you have a collection with possibly `null` or `undefined` values and you want to filter them out. Before, even with filtering such values out, TypeScript was unable to infer the type of item of the collection:
```typescript
const collection = [1.1, 2.3, null, 3.5, undefined, 4.5];
const filtered = collection.filter(v => {
    return v !== null && v !== undefined;
});

/**
 * @note Error: 'value' is possibly 'null' or 'undefined'
 */
filtered.forEach(value => value.toFixed());
```
<a href="https://www.typescriptlang.org/play/?ts=5.4.5#code/MYewdgzgLgBKA28CmwoEtwwLwwNoEYAaGAJmLAFdFiBmYisAEyQDM0wlHiAWAXQG4AUKEiw28KEgBOnbHBCIU6cADpxkqQAoAbtgB8MAN6CYpmDKgUpYGLoCEWHJUQwAZK9swHOBszYdGIQBfAEohQQB6ACookyiYAAEwEEkYAFEpKRApAC4YAHJtAEN4CiR8mDQIGAAHEAgINAAjeABPAud4CuyC31Z2Tny4iMF1aU41bLSi4AALHRKy-VtFpBUoEAAxNAAPTk0QsKA" target="_blank">Link to playground</a>

But with TypeScript 5.5 beta, you can finally do this and TypeScript will infer the type of the collection correctly, so it will know that `filtered` is an array of numbers without `null` or `undefined` values. But the trick, that I use sometimes to simplify the code, unfortunately, doesn't work:
```typescript
const collection = [1.1, 2.3, null, 3.5, undefined, 4.5];
const filtered = collection.filter(Boolean);

filtered.forEach(value => value.toFixed());
```
<a href="https://www.typescriptlang.org/play/?ts=5.5.0-dev.20240426#code/MYewdgzgLgBKA28CmwoEtwwLwwNoEYAaGAJmLAFdFiBmYisAEyQDM0wlHiAWAXQG4AUKEiw28KEgBOnbHBCIU6cADpxkqQAoAQiAVIAhmACUQwQHoAVJcExLMAAJgQkmAFEpUkFIBcMAOQAbgbwFEj+MGgQMAAOIBAQaABG8ACeAZSIEd4BDMxsHIz+tpbmgurSnGrebgbAABaawaFI2AB8MM1hKlAgAGJoAB6cmsamQA" target="_blank">Link to playground</a>

But anyway, I'm happy that it's minus one thing that make logic of the code and type system of TypeScript inconsistent.

The rest of the features of TypeScript 5.5 beta can be found in the <a href="https://devblogs.microsoft.com/typescript/announcing-typescript-5-5-beta/" target="_blank">official announcement</a>.
```
