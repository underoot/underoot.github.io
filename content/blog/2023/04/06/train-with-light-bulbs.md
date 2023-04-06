---
title: Train with light bulbs
---
Once upon a time, with my colleagues I discussed one funny old logical problem, that I had heard from my former technical lead:

> Imagine that you are located in a fully isolated wagon on the train. You cannot open windows, all of them are closed. You don't have any way to determine your location. The only thing that you can do is move between wagons and all of them are connected by a circle. Every wagon has a light bulb with a switcher. Every light bulb is randomly switched on or off. You could switch off or on every light bulb with a switcher in the corresponding vagon. Describe the algorithm which helps you to discover a count of wagons in the train.

We were joking that it sounds like a good atmospheric 3D game. Many years later while trying <a href="https://threejs.org" target="_blank">Three.js</a> I implemented such a game and I'm introducing to you it, so you can solve the described problem and even prove it in the virtual reality of the game.

Enjoy! 🕹️

<is-land on:visible>
	<style>
		#game {
			height: 600px;
		}
	</style>
	<div id="game"></div>
	<template data-island>
		<script type="module" src="/game-train-with-light-bulbs/index.js"></script>
  </template>
</is-land>
