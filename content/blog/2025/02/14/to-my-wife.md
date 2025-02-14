---
title: To my wife
description: "Hyvää ystävänpäivää!"
date: 2025-02-14
---
I love you, Sveta! Thank you for your support in all my endeavours and for you laugh to all my jokes!


<style>
  #heart {
    width: 0; 
    height: 0; 
    border-left: 75px solid transparent;
    border-right: 75px solid transparent;
    border-top: 75px solid #f00;
    position: relative;
    margin: 100px 0 0 0;
    animation: beat 1s infinite;
  }

  #heart::before {
    content: '';
    display: block;
    width: 100px;
    height: 100px;
    background-color: #f00;
    border-radius: 50%;
    position: absolute;
    top: -156px;
    left: -14px;
  }

  #heart::after {
    content: '';
    display: block;
    width: 100px;
    height: 100px;
    background-color: #f00;
    border-radius: 50%;
    position: absolute;
    top: -156px;
    left: -86px;
  }

  @keyframes beat {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
</style>
<div style="display: flex; flex-direction: column; align-items: center;">
  <div style="font-size: 1.5rem;line-height: 1.5;">
    Your name is breeze in mid July<br/>
    Your smile is only my desire,<br/>
    Your silhouette, I cannot lie —<br/>
    Breathtaking fight of heart and fire.<br/>
  </div>
  <div id="heart"></div>
</div>
