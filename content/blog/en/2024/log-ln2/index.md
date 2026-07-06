---
date: 2024-03-06
tags:
  - shorts
---
What I like in the old codebase of web projects. it's chance to see history of real projects in old "dark" times of web. For example you take a look on [the line code](https://github.com/mapbox/mapbox-gl-js/blob/v3.2.0/src/geo/transform.js#L1327) of project with 10 years history:
```js
scaleZoom = Math.log(scale) / Math.LN2;
```
And you remember school course of algebra with properties of logarithms like $\log_a{b} = \frac{\log_c{b}}{\log_c{a}}$ and also remember that support of `Math.log2` in browsers was added [a little bit later](https://262.ecma-international.org/6.0/#sec-math.log2) than [`Math.log`](https://www.ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf) and developers with math in mind used to made this trick.

