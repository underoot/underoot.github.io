---
title: The model element proposal
description: The upcoming W3C TPAC event will discuss the `<model>` element proposal, which aims to bring 3D content to the web in a more native way, allowing developers to use 3D models in the same way they use images today.
splash: content/splash.png
date: 2024-09-19
tags: web, 3d, w3c

---
We used to think about content of web pages as 2D surface, because we are used to see them on 2D screens. Yes, there is things like [z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index), [CSS transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) and [WebGL context](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) that can make web pages 3D, but all that things only simulate 3D in some different ways.

In the upcoming [W3C TPAC](https://www.w3.org/2024/09/TPAC/), event where members of different working groups of W3C meet to discuss the future of the web, will be held discussion of Immersive Web Working Group around the [`<model>` element proposal](https://github.com/immersive-web/model-element/tree/explainer_demo). This proposal aims to bring 3D content to the web in a more native way, allowing developers to use 3D models in the same way they use images today. And it means that 3D models will be part of the page content, so if you are looking on the page with VR headset, for example, you will be able to see 3D models in the portal and interact with them. You can see the demo of the proposal [here](https://zachernuk.neocities.org/2024/model_explainer/), even without headset. You can also take a look on something similar on the homepage of [MRjs](https://mrjs.io/) framework, which specializes in spatial web development. There is bunch of elements on the page, which can be seen in 3D space on the webpage. But the page in this example presented in XR session, so you leave the browser page and enter the XR session, which is not the same as the proposal, though you see the same page.

I looking forward to see how this proposal will evolve and how it will be implemented in the browsers, because it seems like this small change might be a significant modification of the page rendering process. At least surface of the page will be not flat anymore, which means that page should be rendered in two rendering buffers, one for each eye, and then combined into one image. Another interesting challenge will be making `<model>` element usable in the same time for different devices, not only for VR headsets and keeping in mind limitation of classic 2D screens.
