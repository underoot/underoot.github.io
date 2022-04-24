---
tags: post

layout: post
title: Class prototype
description: You might be think that there is no difference between classic prototype inheritance and inheritance based on classes. But that's not true actually.
---
# {{ title }}
ES6 brings us an easy way to project abstractions with a paradigm known for people with C++/Java experience — classes:
```js
class Shape {}
class Circle extends Shape {}
```
Classes were introduced to specification years ago and an old, more "native" way to inherit one object from another by using a prototype chain becomes something similar to ancient Egypt hieroglyphs, especially for developers who started to learn language recently:
```js
function Shape() {}
function Circle() {}

Circle.prototype = Object.create(Shape.prototype);
```
I would like to refer the curious reader to MDN for further information about this way of inheritance. I want to mention only one thing: an inheritance with classes also based on a prototype chain. So we can say that both code examples are similar. But there are nuances.
<a name="prototype-property"></a>
## [Prototype property](#prototype-property)
Suppose that you have created two classes and want to try to extend one from another with the last one way:
```js
class Shape {}
class Circle extends Shape {}

Circle.prototype = Object.create(Shape.prototype);
```
The class actually is `function` with the constructor body and this way should work, right? But nope: when you will add some properties to `Shape` prototype, it won't be exposed to instances of `Circle` for some reason:
```js
Shape.prototype.calcArea = function calcArea() {}

new Circle().calcArea(); // <...>.getArea is not a function
```
<a name="why"></a>
## [Why it's happening?](#why)
The reason for this behaviour is hidden behind the property descriptor associated with `prototype` . If you will take a look at it for a class you will notice that this property is not writable. That means that you cannot change the value of the prototype of the class by default. Opposite that, a prototype of the function is writable.
```js
Object.getOwnPropertyDescriptor(class {}, 'prototype')
/*
 * { 
 *   value: {}, 
 *   writable: false, 
 *   enumerable: false, 
 *   configurable: false 
 * }
 */

Object.getOwnPropertyDescriptor(function() {}, 'prototype')
/*
 * { 
 *   value: {}, 
 *   writable: true, 
 *   enumerable: false, 
 *   configurable: false 
 * }
 */
```
This behaviour is described in the algorithm of evaluation of a class definition in the specification. According to [the 12th step of the algorithm](https://262.ecma-international.org/12.0/#sec-runtime-semantics-classdefinitionevaluation), an abstract operation [`MakeConstructor`](https://262.ecma-international.org/12.0/#sec-makeconstructor)  is executed which receives `writablePrototype` property with a false value. 

And, as you can already guess, for all ways to instantiate a new function — [declaration](https://262.ecma-international.org/12.0/#sec-runtime-semantics-instantiateordinaryfunctionobject), [expression](https://262.ecma-international.org/12.0/#sec-runtime-semantics-instantiateordinaryfunctionexpression) or [function constructor](https://262.ecma-international.org/12.0/#sec-function-p1-p2-pn-body) — operation `MakeConstructor` is called without passing to it `writableProperty`, which, by default, receives a true value.
