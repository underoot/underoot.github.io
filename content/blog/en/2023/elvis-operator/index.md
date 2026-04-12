---
title: "Elvis Operator"
splash: content/splash.jpg
date: 2023-06-22
description: |
  Elvis operator in many computer languages is a super powerful thing.
  But what is the origin of this operator and is it exists in JavaScript?

---
Elvis operator exists in many computer languages. It allows you to specify a fallback value in case a variable is empty. For example in Kotlin you can do the following:
```kotlin
fun getNameLength(name: String?) {
	return name?.length ?: 0
}
```

## The origin one
What language did the operator get first? According to the <a href="https://en.wikipedia.org/wiki/Elvis_operator#Languages_supporting_the_Elvis_operator" target="_blank">Wikipedia page</a>, it was GNU C/C++. You maybe know about the ternary operator. For example in the following code fragment on C++ you can choose `b` if `a` does have some empty value like `0` or `''` or `c` otherwise:
```c
auto d = a ? b : c;
```

And the first operand is optional and can be easily <a href="https://gcc.gnu.org/onlinedocs/gcc-2.95.3/gcc_4.html#SEC70" target="_blank">omitted</a>:
```c
auto d = a ? : c; // or even
auto d = a ?: c;
```

It will be equivalent to the next one:
```c
auto d = a ? a : c;
```

But why the Elvis operator is called so? Answer that ligature of the operator is like the very famous <a href="https://en.wikipedia.org/wiki/Quiff" target="_blank">quiff</a> of Rock'n'Roll star — Elvis Presley:

<img src="{% imageUrl 'content/elvis_quiff.jpg' %}" width="100%" />

There is the same <a href="https://emoticon.fandom.com/wiki/Elvis_Presley" target="_blank">emoticon</a>, which was an inspiration for the authors of this name.

## Does the Elvis operator exist in JavaScript?

When with colleagues we discussed <a href="https://github.com/tc39/proposal-nullish-coalescing" target="_blank">the proposal</a> of this operator when it was only in the 3rd stage we often referred to it as Elvis operator. But syntactically it's wrong because the ligature of nullish coalescing in JavaScript is `??` — double quiff without eyes. Someone also referring to another proposal, <a href="https://github.com/tc39/proposal-optional-chaining" target="_blank">optional chaining</a>, as the Elvis operator, which is also incorrect. The last one is compound for the former one in situations like this:
```js
let length = name?.length ?? 0;
```

So, basically, nope. JavaScript doesn't have a true Elvis operator but has a coalescing version of it.
