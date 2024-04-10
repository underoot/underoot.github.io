---
title: Annoyed by cookie banners? Firefox to the rescue!
splash: https://unsplash.com/photos/xUUZcpQlqpM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8Zm94fGVufDB8fHx8MTcwMDc0MjIyM3ww&force=true&w=2400
date: 2023-11-23
description: |
  Recently released Firefox 120 is introducing a new feature, which will allow you to get rid of cookie banners on websites by automatically rejecting them.
---

<a href="https://www.mozilla.org/en-US/firefox/120.0/releasenotes/" target="_blank">Recent release</a> of Firefox is introducing a new feature, which will allow you to get rid of cookie banners on websites by automatically rejecting them. Currently, it has been rolled out only to Germany users in private windows. But this feature also can be enabled in other countries and in normal windows: in `about:config` set `cookiebanners.service.mode` to

- `1` to reject all cookie banners and ignore ones that allow only confirming cookies
- `2` to reject all cookie banners and conirm ones that allow only confirming cookies
- `0` to disable this feature.

Personally, I like this feature and I've tested it for a couple of sites. For example for <a href="https://bbc.com">bbc.com</a> it didn't work, but for <a href="https://google.com">google.com</a> it worked perfectly.

<img src="{% imageUrl 'content/banner_bbc.jpg' %}" width="100%" />

Available two modes of banner processing - mouse click simulation (`cookiebanners.bannerClicking.enabled`) and cookie injection with selected mode flag (`cookiebanners.cookieInjector.enabled`)

Alongside with that, Firefox also inroduced a new “Copy Link Without Site Tracking” feature in the context menu which ensures that copied links no longer contain tracking information.
