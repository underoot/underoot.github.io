---
title: "Analogue of 2048 with Emoji"
splash: content/splash.jpg
date: 2023-11-21
description: |
  I've built game with Emoji, which is, basically, analogue of 2048, but built on concept of Zero-Width-Joiner. It's called Emerji.
telegramPostId: 119
---

## TL;DR

I've built game with Emoji, which is, basically, analogue of 2048, but built on concept of Zero-Width-Joiner. It's called Emerji.

## What is Zero-Width-Joiner?

Zero-Width-Joiner is a special character, which is used to join two other characters into one. For example, if you want to write a handshake emoji, you can write it like this:

```html
&#x1F91D;&#x200D;&#x1F91D;
```

which will be rendered as:

<div>
	<span style="font-size: 3rem;">&#x1FAF1;&#x200D;&#x1FAF2;</span>
</div>

Symbol `&#x200D;` is Zero-Width-Joiner. It is used to join two other symbols into one. In this case, two hands (`&#x1FAF1` or 🫱 and `&#x1FAF2` or 🫲) into one handshake. The full list of possible emoji with ZWJ can be seen <a href="https://unicode.org/emoji/charts/emoji-zwj-sequences.html" target="_blank">here</a>

## About game

The game is built on the same concept. You need to join two same emojis into one. For example, if you have two hands, you can join them into one handshake. If you have two handshakes, you can join them into one hug, but with darker color skin. And so on.

Try it out here: <a href="https://underoot.dev/emerji/" target="_blank">https://underoot.dev/emerji/</a>
