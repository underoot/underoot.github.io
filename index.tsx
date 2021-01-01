#!/usr/bin/env npx ts-node

import { readdir } from 'fs/promises';
import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import frontmatter from 'remark-frontmatter';
import parseFrontmatter from 'remark-parse-frontmatter';
import html from 'rehype-stringify';
import visit from 'unist-util-visit';
import vfile from 'to-vfile';
import { select } from 'unist-util-select';
import React, { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdirSync, writeFileSync } from 'fs';

import { Index } from './pages/index';
import { Post } from './pages/post';
import { format } from 'date-fns';

type FileData = {
  article: {
    image: string;
    title: string;
    url: string;
    createdAt: Date;
    description: string;
  }
}

function getCreatedAtFromBasename(basename: string) {
  const [dateString] = basename.split('.');
  const [, year, month, day, hour, minutes, seconds] = dateString.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);

  return new Date(
    Number.parseInt(year),
    Number.parseInt(month) - 1,
    Number.parseInt(day),
    Number.parseInt(hour),
    Number.parseInt(minutes),
    Number.parseInt(seconds)
  );
}

function ejectShortDescription() {
  return transformer;

  function transformer(tree, file) {
    visit(tree, { type: 'heading', depth: 1 }, (node) => {
      file.data.article = {
        title: select(':first-child', node).value,
        url: file.data.frontmatter.url,
        description: file.data.frontmatter.description,
        image: file.data.frontmatter.image,
        createdAt: getCreatedAtFromBasename(file.basename)
      };
    });
    return tree;
  }
}

const render = (element: ReactElement) => (
  `<!doctype html>${renderToStaticMarkup(element)}`
);

const processor = unified()
  .use(markdown)
  .use(frontmatter, ['yaml'])
  .use(parseFrontmatter)
  .use(ejectShortDescription)
  .use(remark2rehype)
  .use(html);

(async function make() {
  const files = await readdir('_posts');
  const posts = [];

  for (const file of files) {
    if (/.\.md$/.test(file)) {
      const { contents, data } = await processor.process(vfile.readSync(`_posts/${file}`));
      const { article: { url, createdAt } } = data as FileData;
      const article = {
        ...(data as FileData).article,
        contents: contents.toString()
      }

      posts.push((data as FileData).article);
      try { mkdirSync(`dist/${format(createdAt, 'yyyyLLdd')}`, { recursive: true }) } catch (e) {};
      writeFileSync(`dist/${format(createdAt, 'yyyyLLdd')}/${url}.html`, render(
        <Post {...article} />
      ));
    }
  }

  writeFileSync('dist/index.html', render(
    <Index posts={posts} />
  ));
})();
