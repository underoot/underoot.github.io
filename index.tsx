#!/usr/bin/env npx ts-node

import { dirname } from 'path';
import { lstatSync } from 'fs';
import { execSync } from 'child_process';
import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import frontmatter from 'remark-frontmatter';
import parseFrontmatter from 'remark-parse-frontmatter';
import gfm from 'remark-gfm';
import html from 'rehype-stringify';
import visit from 'unist-util-visit';
import vfile from 'to-vfile';
import { select } from 'unist-util-select';
import React, { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdirSync, writeFileSync } from 'fs';

import { Index } from './pages/index';
import { Post } from './pages/post';

type FileData = {
  article: {
    url: string;
    image: string;
    title: string;
    lang: string;
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
    const stat = lstatSync(file.path);

    visit(tree, { type: 'heading', depth: 1 }, (node) => {
      file.data.article = {
        title: select(':first-child', node).value,
        lang: file.data.frontmatter.lang,
        url: file.data.frontmatter.url,
        description: file.data.frontmatter.description,
        image: file.data.frontmatter.image,
        createdAt: new Date(stat.ctimeMs)
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
  .use(gfm)
  .use(ejectShortDescription)
  .use(remark2rehype)
  .use(html);

async function make(lang: string) {
  const files = await execSync('find . -type f', { cwd: '_posts'}).toString().split('\n');
  const posts = [];

  try { mkdirSync(`dist/`, { recursive: true }) } catch (e) {};

  for (const file of files) {
    if (/.\.md$/.test(file)) {
      const { contents, data } = await processor.process(vfile.readSync(`_posts/${file}`));
      const { article: { lang: postLang, createdAt } } = data as FileData;
      const url = file.replace('.md', '.html');
      const article = {
        ...(data as FileData).article,
        url,
        contents: contents.toString()
      }

      if (postLang !== lang) {
        continue;
      }

      posts.push(article);
      try { mkdirSync(`dist/${dirname(file)}`, { recursive: true }) } catch (e) {};
      writeFileSync(`dist/${url}`, render(
        <Post {...article} />
      ));
    }
  }

  writeFileSync(`dist/${lang === 'en' ? 'index' : lang}.html`, render(
    <Index posts={posts} />
  ));
};

make('ru');
make('en');
