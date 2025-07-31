---
title: CSS scroll-driven animations
description: How I relized that I haven't played with CSS scroll-driven animations yet and finally found a good use case for them. It's good instrument which you can use to build really simple and cool animations on your web pages.
splash: content/splash.png
date: 2025-07-31
tags:
  - css
  - web
  - animation
---

Let's talk about [scroll-driven ~~development~~ animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations). While looking into [the next Safari Technology Preview changelog](https://webkit.org/blog/17210/release-notes-for-safari-technology-preview-224/) I found the mention of `animation-range-*` properties and realized that I haven't played with CSS scroll-driven animations yet.

If you haven't heard about them, it's a suite of CSS functions to build animations based on the position of the scroll of different elements on the page. For example, this 3D CSS cube rotates based on the scroll position of the current page from which you read this text: as far you scroll this page, the cube will rotate further from the original position:

> This will work for all the latest Chrome or Chromium-based browsers. Safari and Firefox support CSS scroll-driven animations only in [Technology Preview and Nightly correspondingly](https://caniuse.com/mdn-css_properties_animation-timeline) at the moment of writing this post.

<style>
  .cube {
    margin: 100px auto;
    width: 200px;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;
    animation-timeline: scroll();
    animation-name: cube-rotate;
  }
  @keyframes cube-rotate {
    0% {
      transform: rotate3d(1, 0.75, -0.5, 0deg);
    }
    100% {
      transform: rotate3d(1, 0.75, -0.5, 60deg);
    }
  }
  .side {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    border: 4px solid var(--color-gray-90);
    opacity: 0.5;
  }
  .side_left {
    background-color: red;
    transform: rotateY(90deg) translateZ(-100px);
  }
  .side_right {
    background-color: green;
    transform: rotateY(90deg) translateZ(100px);
  }
  .side_top {
    background-color: magenta;
    transform: rotateX(90deg) translateZ(100px);
  }
  .side_bottom {
    background-color: blue;
    transform: rotateX(90deg) translateZ(-100px);
  }
  .side_back {
    background-color: yellow;
    transform: rotateZ(90deg) translateZ(-100px);
  }
  .side_front {
    background-color: orange;
    transform: rotateZ(90deg) translateZ(100px);
  }
</style>
<div class="cube">
  <div class="side side_left"></div>
  <div class="side side_right"></div>
  <div class="side side_front"></div>
  <div class="side side_back"></div>
  <div class="side side_top"></div>
  <div class="side side_bottom"></div>
</div>

Here is the code of the cube rotation:

```html
<style>
  .cube {
    margin: 100px auto;
    width: 200px;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;
    animation-timeline: scroll();
    animation-name: cube-rotate;
  }
  @keyframes cube-rotate {
    0% {
      transform: rotate3d(1, 0.75, -0.5, 0deg);
    }
    100% {
      transform: rotate3d(1, 0.75, -0.5, 60deg);
    }
  }
  .side {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    border: 4px solid var(--color-gray-90);
    opacity: 0.5;
  }
  .side_left {
    background-color: red;
    transform: rotateY(90deg) translateZ(-100px);
  }
  .side_right {
    background-color: green;
    transform: rotateY(90deg) translateZ(100px);
  }
  .side_top {
    background-color: magenta;
    transform: rotateX(90deg) translateZ(100px);
  }
  .side_bottom {
    background-color: blue;
    transform: rotateX(90deg) translateZ(-100px);
  }
  .side_back {
    background-color: yellow;
    transform: rotateZ(90deg) translateZ(-100px);
  }
  .side_front {
    background-color: orange;
    transform: rotateZ(90deg) translateZ(100px);
  }
</style>
<div class="cube">
  <div class="side side_left"></div>
  <div class="side side_right"></div>
  <div class="side side_front"></div>
  <div class="side side_back"></div>
  <div class="side side_top"></div>
  <div class="side side_bottom"></div>
</div>
```

I think if you already used CSS animations, you should be familiar with properties like [`animation-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name) and block [`@keyframes`](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes). The most interesting line here is:
```css
.cube {
  /* ... */
  animation-timeline: scroll();
}
```
which is equivalent to:
```css
.cube {
  /* ... */
  animation-timeline: scroll(nearest);
}
```
which does only one thing: link animation playback to the scroll position of the nearest parent of the current element (in our case it is the cube element).

I was reasoning a bit about what I should use as an experimental toy in my HTML playground and realized that I had for the long time wanted to implement some sort of progress bar for posts in my blog. And you already guessed based on the progress line on the top of the page that I had already implemented it. And of course I did it only with CSS with the help of brand new CSS style-driven animations. 

Here is the codebase, which is elegant and short if compared with what web developers used to use for the same tasks before:

```html
<style>
.progress {
	position: fixed;
	top: 0;
	left: 0;
	height: 4px;
	background-color: white;
	animation-timeline: scroll();
	animation-name: post-progress;
}

@keyframes post-progress {
	0% { width: 0; }
	100% { width: 100%; }
}
</style>
<div class="progress"></div>
```
