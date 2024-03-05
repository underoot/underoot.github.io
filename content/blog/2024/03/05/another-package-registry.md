---
title: Another package registry
description: JSR, a new package registry for JavaScript. Is it really needed? Or it's just a new hype?
---
When I was on FOSDEM this year in <a href="https://fosdem.org/2024/schedule/event/fosdem-2024-3665-building-your-own-javascript-runtime-with-rust/" target="_blank">the talk of Leo Kettmeir</a> from Deno, he talked about closed beta access to their new package registry — <a href="https://jsr.io/" target="_blank">JSR</a> . I kept not so much attention to it. Recently, with announcement of public beta access, discussions around the Internet started to appear.

First of all, JSR is drived by <a href="https://deno.com/blog/jsr_open_beta" target="_blank">deno community</a>. So I think it's obvious motivation to create package manager and registry for Deno. Yes, JSR is positioned as a package registry not only for Deno, but for usage with Node.js, browsers, etc through `npm` and `yarn`. But I think it's not the main goal anyway. At least reply of JSR developer <a href="https://twitter.com/lcasdev" target="_blank">Luca Casonato</a> doesn'n give me any confidence in it:

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">JSR?<br>What&#39;s wrong with NPM?<br>Why do we need a new package registry?? <a href="https://t.co/qVyPDneCqj">pic.twitter.com/qVyPDneCqj</a></p>&mdash; Syntax (@syntaxfm) <a href="https://twitter.com/syntaxfm/status/1763609325447381234?ref_src=twsrc%5Etfw">March 1, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Well, yes, for ten recent years of `npm`, their pages of packages got just only TS icon and files tab. But what else we actually need from package registry web interface? Usually I take a look on README, versions, dependencies, statistics of downloads and link to source code.

JSR supports automatic building of your `.d.ts` files, but usually my CD pipeline doing it and I can control it. Moreover, not every package actually needs it, and I won't be happy when package registry will spend time and resources to do things nobody needs.

JSR will automatically generate docs from your typings. This feature seems good to me. At least from what I see from Rust ecosystem, for example: developers there use to use by default good _de facto_ default documentation system, and it's good to have it in JS/TS world too.

> JSR modules can be used in Node, Deno, Bun, Cloudflare Workers, and more.

Okay, but I can use `npm` and `yarn` (maybe shouldn't the last one) packages in all these environments too.

I don't want to be too conservative and I'm open to new things. **But** I super tired of marketing bullshit and hypnotic unclear messages from every new framework, tool, registry who want  __really__ change the world and replace everything around you.

<a href="https://xkcd.com/927" target="_blank">
	<img src="https://imgs.xkcd.com/comics/standards.png" width="100%" />
</a>
