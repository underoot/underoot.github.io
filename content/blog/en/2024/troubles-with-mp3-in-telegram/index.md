---
title: Troubles with MP3 in Telegram
description: How Telegram handles MP3 files with meta information and how finally I've managed to upload it with all required data, with my art album, title and everything in 2024 using legendary TdLib from Durov's team.
date: 2024-04-29
tags:
  - javascript
---
Recently I decided again to record podcasts. One of the platforms to start with is my Telegram channel. As a person with previous podcasting experience, I seriously prepared an MP3 file with all the required meta information in it: title, episode name, and album art. Maybe one thing that I skipped, because of the size of one episode was the marking of chapters. All of that is in MP3 file format packed in [ID3](https://en.wikipedia.org/wiki/ID3) format, which has several versions, but by its nature is quite simple: list of tags with header and content, which is preceded by ID3 header with the size of its content, version etc.

Well, I've prepared everything with [Forecast](https://overcast.fm/forecast), as I usually do and already started uploading of marked audio file. And what I see: the official Mac client of Telegram consumed everything from meta information except for the art album.

![](content/desktop.png)

Okay, maybe a web client of Telegram will support what I want? I've tried A client (don't mix up with [Z client](https://web.archive.org/web/20220224044948/https://telegram.org/apps), why they decided to change the name, by the way, 🤔) first of all, and what I see:

![](content/web_a.png)

Already better, but where is my meta information? Let's maybe try K client, which is a web client of Telegram as well: what are the cool and stylish names, aren't?. One, two, three, four 🪄:

![](content/web_k.png)

## TdLib and rolled up sleeves to the rescue

Who cares about these meta tags in MP3 files, right? Time to give up? No! Let's do the dirty work of Telegram clients by ourselves. In far 2018 Pavel Durov's team released [TdLib](https://core.telegram.org/tdlib) and traditionally even started some competition with prizes for the best client, who will better use it. API is a little bit cryptic, but, if you believe Durov's team it's the best and safest API on the Wild West of the Internet. I've even caught in commit messages that [they support](https://github.com/tdlib/td/commit/23c7a6caee1f9ec4c137048359bbd415927f1e22) [visionOS](https://en.wikipedia.org/wiki/VisionOS), wow!

Okay, after reading of documentation I finally found [API](https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1input_message_audio.html#af859c8e113f23f3da7783dac2be4258d) for handling messages with audio files, which supports everything you just need to carry by yourself art album, and MP3 tags will be handled by Telegram. To be honest, to read the API of TdLib it's not the easy part. Let's give it a try. I found [the binding library for Node.js](https://github.com/Bannerets/tdl) as well. According to the documentation we need to build [td](https://github.com/tdlib/td#building) library by ourselves. Easy peasy:

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

`apiId` and `apiHash` you can get from [Telegram](https://my.telegram.org/apps). After running the script I got my user information. Worth mentioning, that this library handles everything that you need to build a Telegram client: doing some synchronization, polling updates, etc and storing everything in `_td_database` and `_td_files` folder. Enough to observe, let's try to send an audio file with meta information:

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

![](content/result.png)

By the way, subscribe to my [Telegram channel](https://t.me/underoot) to listen to my daily podcast about technical news and other fun stuff. I'm also publishing my podcasts on the rest of platforms like [Apple Podcasts](https://podcasts.apple.com/fi/podcast/in-commute/id1743474765), [Spotify](https://open.spotify.com/show/3zXxPMUdC8KnhZserRT8oC?si=2a8252ccb4db402e), [YouTube Music](https://www.youtube.com/playlist?list=PL-lkc8Fj6Q8-pKzYo8YzHOAPoqZYImbUy), etc. So, you can listen to it wherever you want. Stay tuned! 🎧
```
