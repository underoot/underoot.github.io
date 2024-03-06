---
tags:
	- shorts
---
What I like in the old codebase of web projects. it's chance to see history of real projects in old "dark" times of web. For example you take a look on <a href="https://github.com/mapbox/mapbox-gl-js/blob/v3.2.0/src/geo/transform.js#L1327" taget="_blank">the line code</a> of project with 10 years history:
```js
scaleZoom = Math.log(scale) / Math.LN2;
```
And you remember school course of algebra with properties of logarithms like $\log_a{b} = \frac{\log_c{b}}{\log_c{a}}$ and also remember that support of `Math.log2` in browsers was added <a href="https://262.ecma-international.org/6.0/#sec-math.log2" target="_blank">a little bit later</a> than <a href="https://www.ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf" target="_blank"><code>Math.log</code></a> and developers with math in mind used to made this trick.

