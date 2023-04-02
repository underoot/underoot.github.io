---
title: Emoji in JS strings
date: 2022-04-02
---
Let's consider JavaScript string, which consist only one emoji and we want to take length from it:

```js
console.log("😅".length);
```

What do you think, what is the value of this property? It's displayed as the one symbol, but you will be surprised by the actual result. It's 2.

Emoji from a platform to a platform, from an app to an app can has different representation: like a text or like an image. Image is obvious format.

But what about text? So, emoji, which represented as a text is unicode symbol. Unicode is a standard which defines a lot of symbols from different languages. All of this symbols have their order numbers in defined range: from `0x0000` to `0x10FFFF`. This order numbers called code points. So, in JavaScript strings represent as sequence of 16 bit code units. So, it's looks like UCS-2, but in the text of specifications only UTF-8 is mentioned. The main difference between them that UCS-2 cannot represent symbols outside of BMP range (`0x0000-0xFFFF`). It's happens because UCS-2 defines one symbol as 2 byte charachter, thus maximum value that this character might represent is 65535 (`0xFFFF`). UTF-16 is variable-length encoding, which means that symbols in this encoding might be as one 2 byte block or two of them. For the BMP range it represents symbols the same as UCS-2: we just take codepoint from Unicode standard and put this number as is.

For example, cyrillic capital short i letter (й) with codepoint 1049 will be presented in the memory as binary representation of this number:

```js
0b00000100_00011001
```

Okay, but what about symbols that lay outside of BMP? The most of Emoji, i.e., exists in the range `0x1F000-0x1FAFF`. Obviously, all symbols from this range cannot be represented as one 2 byte character: the lower one `0x1F000` in binary representation will has the following form:

```js
0b11111000000000000
```

It's number with length of 17 bits. How to deal with that additional bit? You cannot just take it and pad from start with leading zeros, at very least how you differ code point 1 from this part of code point with leading zeros and with 1 in the end? And here surrogaite pairs concept comes to help us with that problem.

## Surrogate pairs

There are two special code points ranges, which reserved and cannot be used to represent any symbol in Unicode — high surrogates `0xD800-0xDBFF` and low surrogates `0xDC00-0xDFFF`. So, consider that we want to encode in UTF-16 emoji symbol "Smiling face with open mouth and cold sweat" or, shortly 😅. This symbol has code point, according to Unicode standard 128517, or `0x01F605` in hexademical. As other code points from supplementary planes UTF-16 encode this symbol in special way with two 2 bytes units which called surrogate pair and formed by the following scheme:

1. Substruct from code point `0x10000`. The result number should be represented in 20 bit value. So, for our emoji: `0x01F605 - 0x010000 = 0x00F605`. 20 bit representation of the result is following: `00001111011000000101`;
1. Delimet result to two 10 bit numbers: `0000111101` and `1000000101`;
1. Add high 10 bits `0xD800`. Result number always will be lay in the range of high surrogates. So, for our example:
<br />
`0000111101 = 0x003D`
<br />
`0x003D + 0xD800 = 0xD83D`

1. Add low 10 bits to `0xDC00`. Result number always will be lay in the range of low suggorages. So, again, for our low ten bits of smile with cold sweat:
<br />
`0000111101 = 0x0205`
<br />
`0x0205 + 0xDC00 = 0xDE05`

Numbers from points 3. and 4. will form the first and the second code units, which will represent our emoji in UTF-16.

Thus, if we come back to JavaScript representation:

```js
console.log("😅".length);
```

we has in this UTF-16 string two code units, that is why length value equals 2. If you will call method charCodeAt for the zero index you will receive already learnt by you surrogate code points:

```js
"😅".charCodeAt(0).toString(16) // 'd83d'
"😅".charCodeAt(1).toString(16) // 'de05'
```

To get code point of character you should call method of string codePointAt. This method will return code point value according to standard with keeping in mind surrogate pairs. It's important also to use correct index, because, as you already know that characters from supplementary planes will occupy more than one 16 bit values:

```js
"😅".codePointAt(0) // 128517
```
