---
title: Data views in Obsidian
date: 2022-06-29
---
Plain text is an excellent and underrated thing. I'm using <a href="https://obsidian.md" target="_blank">Obsidian</a> to organise my personal thoughts and knowledge. And recently I've found out the amazing <a href="https://github.com/blacksmithgu/obsidian-dataview" target="_blank">community plugin</a> that helps you to extract and display data from the frontmatter section of files in the table format.

For example, you have the folder "Companies" with files. Every file there has a frontmatter part with fields like salary, and region. In some other page inside your vault you can create a file with the following content:

<pre>
```dataview
table salary, perks
from "Companies"
where country = "Estonia"
```
</pre>

And this block in preview will be replaced with inlined data from the files which you choose in the query.
