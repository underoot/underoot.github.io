---
title: Data views in Obsidian
date: 2022-06-29
description: How to use the Obsidian Data View plugin to extract and display data from the frontmatter section of files in the table format
---
Plain text is an excellent and underrated thing. I'm using Obsidian to organize my thoughts and knowledge. And recently I've found an amazing <a href="https://github.com/blacksmithgu/obsidian-dataview" target="_blank">community plugin</a> that helps you to extract and display data from the frontmatter section of files in the table format.

For example, you have the folder "Companies" with files. Every file there has a frontmatter part with fields like salary, and region. On some other page inside your vault, you can create a file with the following content:

<pre>
```dataview
table salary, perks
from "Companies"
where country = "Estonia"
```
</pre>

And this block in the preview will be replaced with inlined data from the files which you choose in the query.
