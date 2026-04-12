---
title: "Web Audio API: Enjoy the Silence"
date: 2025-01-19
description: How I've added Media Session API support to the Moodist project and what is the future of the Web Audio API in the Media Session API.
tags:
  - web
  - audio
  - js
  - oss
---
For a long time, I've been a fan of ambient sound for work concentration. In the summer I started use for that amazing project [Moodist](https://moodist.mvze.net/). There you can select and mix various sounds from sounds of nature like rain, forest, wind, waves, and cracks of bonfire to sounds of a city like trains, cafes, airports, and so on.

Also, I am a big fan of working with headphones with enabled noise cancelation. To my surprise, I found that my usual workflow with clicking the play button on my headphones to turn on and off the sound from Moodist doesn't work as it does on other sites like YouTube. I also noticed that media controls on Mac don't work with Moodist. It was the reason why my headphones didn't work with it.

Thank God, it's an open-source project, and I stumbled upon [the open issue](https://github.com/remvze/moodist/issues/19) about it in the GitHub repository of the project. According to the short discussion on the issue, the author of the project uses Web Audio API instead of [HTML5 audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) because of the issue with short breaks between loops. But switching to Web Audio API caused the issue with media controls. It doesn't work, and the Media Session API specification does not mention Web Audio API.

In short, Media Session API gives websites a way to control what user sees in the media controls of their operating system. Every single OS nowadays has some sort of place where it displays UI with play/pause, next/previous track, and stop buttons alongside the artwork of the current playing media. Media Session API gives you the ability to control what is displayed there and control what to do on the webpage when an user interacts with UI of Media Controls, but only if you play something on your webpage.
<figure>
	<img src="{% imageUrl 'content/media_controls_macos.png' %}" style="width: 100%" alt="The Media Controls on MacOS with playing The Kiffness - Eating the Cats ft. Donald Trump (Debate Remix)" />
	<figcaption>Example of the Media Controls on MacOS</figcaption>
</figure>

I come up with a brilliant idea: why not add a silent audio track to the project and sync its playback state with the state of the application? Well, it's only a couple of hours of work I thought. I was wrong.

After quick prototyping of the idea, thanks to the repository "[Blank Audio - Hours of Silence](https://github.com/anars/blank-audio/tree/master)" I started the testing session. On Chrome, it works like a charm. Opening Firefox — booms, it doesn't. A couple of additional hours of reading documentation, and playing with the order of calling API methods:

```javascript
navigator.mediaSession.playbackState = "playing"; // Maybe after handlers?
navigator.mediaSession.setActionHandler('play', () => {
  play();
}); // Maybe before handlers?
```

I accidentally decided to choose another track with sound, and voila, it worked I realized that Firefox requires having at least some sort of sound from your media to dispatch it to OS. Done? Nope, then we should fight already with Safari. It works as expected. I see everything in Media Controls, but when I click on the pause, everything also seems okay. Until you decide to click on the play button again. It doesn't work. After another round of hopeless typing and reading, I found that reloading of media after pause helps to overcome the issue.

I like it when everything is perfect, so I decided that it would be lame to download empty sound through the network. Why not generate it [on the fly](https://github.com/remvze/moodist/blob/18ed2e6f055d7e32b4a9df33cdb724eaf1f930aa/src/helpers/sound.ts#L64) and paste it as a data URL to our media track? Also, I did support the dark mode and [I am sending](https://github.com/remvze/moodist/blob/18ed2e6f055d7e32b4a9df33cdb724eaf1f930aa/src/components/media-controls/media-session-track.tsx#L24) suitable artwork for the media controls based on it.

What about the future of the Web Audio support in the Media Session API? Seems like, after some rounds of standardization discussion and changing everything, the Media Working Group came up with [Audio Session API](https://github.com/w3c/audio-session) (previously known as [Audio Focus API](https://github.com/w3c/audio-session-fork)). And it even works in Safari [right now](https://caniuse.com/mdn-api_audiosession). You can play around with the [demo](https://jsfiddle.net/pxma30fg/). There are some problems with that: at least naming seems to me a little bit [confusing](https://github.com/w3c/audio-session/issues/17). And I tried to integrate it in Moodist as well, but even in the demo, you can see, that it doesn't work well with metadata for some reason (at least on MacOS 15.1.1 and Safari 18.1.1 correspondingly). But in the bright future of the specification, Audio Session API gives you more control over the specification of the behavior of the sound from your tab in the browser: stop it if something plays on other pages, or even make other sounds quieter like you might hear in the car navigation system during navigation announcement.

I've created [PR](https://github.com/remvze/moodist/pull/54) for Moodist let's see how it goes and if it will be merged. Currently, it works in all browsers and different operating systems and I can enjoy the silence by controlling it even through the button on my headphones.
