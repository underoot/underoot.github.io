---
title: Troubles with MP3 in Telegram
description: How Telegram handles MP3 files with meta information and how finally I've managed to upload it with all required data, with my art album, title and everything in 2024 using legendary TdLib from Durov's team.
date: 2024-04-29
tags:
  - javascript
---
Recently I decided again to record podcasts. One of the platforms to start with is my Telegram channel. As a person with previous podcasting experience, I seriously prepared an MP3 file with all the required meta information in it: title, episode name, and album art. Maybe one thing that I skipped, because of the size of one episode was the marking of chapters. All of that is in MP3 file format packed in <a href="https://en.wikipedia.org/wiki/ID3" target="_blank">ID3</a> format, which has several versions, but by its nature is quite simple: list of tags with header and content, which is preceded by ID3 header with the size of its content, version etc.

Well, I've prepared everything with <a href="https://overcast.fm/forecast" target="_blank">Forecast</a>, as I usually do and already started uploading of marked audio file. And what I see: the official Mac client of Telegram consumed everything from meta information except for the art album.

<img src="{% imageUrl 'content/desktop.png' %}">

Okay, maybe a web client of Telegram will support what I want? I've tried A client (don't mix up with <a href="https://web.archive.org/web/20220224044948/https://telegram.org/apps" target="_blank">Z client</a>, why they decided to change the name, by the way, 🤔) first of all, and what I see:

<img src="{% imageUrl 'content/web_a.png' %}">

Already better, but where is my meta information? Let's maybe try K client, which is a web client of Telegram as well: what are the cool and stylish names, aren't?. One, two, three, four 🪄:

<img src="{% imageUrl 'content/web_k.png' %}">

## TdLib and rolled up sleeves to the rescue

Who cares about these meta tags in MP3 files, right? Time to give up? No! Let's do the dirty work of Telegram clients by ourselves. In far 2018 Pavel Durov's team released <a href="https://core.telegram.org/tdlib" target="_blank">TdLib</a> and traditionally even started some competition with prizes for the best client, who will better use it. API is a little bit cryptic, but, if you believe Durov's team it's the best and safest API on the Wild West of the Internet. I've even caught in commit messages that <a href="https://github.com/tdlib/td/commit/23c7a6caee1f9ec4c137048359bbd415927f1e22" target="_blank">they support</a> <a href="https://en.wikipedia.org/wiki/VisionOS" target="_blank">visionOS</a>, wow!

Okay, after reading of documentation I finally found <a href="https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1input_message_audio.html#af859c8e113f23f3da7783dac2be4258d" target="_blank">API</a> for handling messages with audio files, which supports everything you just need to carry by yourself art album, and MP3 tags will be handled by Telegram. To be honest, to read the API of TdLib it's not the easy part. Let's give it a try. I found <a href="https://github.com/Bannerets/tdl" target="_blank">the binding library for Node.js</a> as well. According to the documentation we need to build <a href="https://github.com/tdlib/td#building" target="_blank">td</a> library by ourselves. Easy peasy:

```bash
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build .
```

And wait a little bit: around 5 minutes on my M3 Max. So, after copying `libtdjson.dylib` to the root of the project, I've installed `tdl` and copied the example from the documentation:

```javascript
const tdl = require("tdl");

const client = tdl.createClient({
  apiId: process.env.API_ID,
  apiHash: process.env.API_HASH, 
});

client.on("error", console.error);

async function main() {
  await client.login()

  const me = await client.invoke({ _: 'getMe' })
  console.log('My user:', me)
}

main().catch(console.error);

```

`apiId` and `apiHash` you can get from <a href="https://my.telegram.org/apps" target="_blank">Telegram</a>. After running the script I got my user information. Worth mentioning, that this library handles everything that you need to build a Telegram client: doing some synchronization, polling updates, etc and storing everything in `_td_database` and `_td_files` folder. Enough to observe, let's try to send an audio file with meta information:

```javascript
await client.invoke({
  _: "sendMessage",
  chat_id: process.env.CHAT_ID,
  input_message_content: {
    _: "inputMessageAudio",
    audio: {
      _: "inputFileLocal",
      path: "in_commute_e2.mp3",
    },
    caption: {
      _: "formattedText",
      text: 'Software Mansion introduced their own IDE for React Native, Ghost goes to fediverse and much more in new episode "In commute"',
    },
    album_cover_thumbnail: {
      _: "inputThumbnail",
      thumbnail: {
        _: "inputFileLocal",
        path: "in_commute_e2.jpg",
      },
    },
  }
});
```

And voilà, I've got my audio file with meta information in my Telegram channel and everything from art to meta right in place:

<img src="{% imageUrl 'content/result.png' %}">

By the way, subscribe to my <a href="https://t.me/underoot" target="_blank">Telegram channel</a> to listen to my daily podcast about technical news and other fun stuff. I'm also publishing my podcasts on the rest of platforms like <a href="https://podcasts.apple.com/fi/podcast/in-commute/id1743474765" target="_blank">Apple Podcasts</a>, <a href="https://open.spotify.com/show/3zXxPMUdC8KnhZserRT8oC?si=2a8252ccb4db402e" target="_blank">Spotify</a>, <a href="https://www.youtube.com/playlist?list=PL-lkc8Fj6Q8-pKzYo8YzHOAPoqZYImbUy" target="_blank">YouTube Music</a>, etc. So, you can listen to it wherever you want. Stay tuned! 🎧
```
