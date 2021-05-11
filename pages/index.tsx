import React from 'react';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru'
import en from 'date-fns/locale/en-US';

const locales: { [locale: string]: any } = {en, ru};

import { Post } from '../types/post';
import { Page } from './page';

type IndexProps = {
  posts: Post[];
};

export function Index({ posts }: IndexProps) {
  return (
    <Page header={
      <title>@underoot</title>
    }>
      <ul className="prose-sm max-w-prose mx-auto px-4">
        {posts.map(post => {
          return (
            <li key={post.url}>
              <a href={post.url} className="no-underline">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </a>
              <div className="flex justify-between">
                <a href={post.url} className="text-blue-400">Открыть</a>
                <time dateTime={post.createdAt.toISOString()} className="text-gray-400">
                  {format(post.createdAt, 'PPpp', { locale: locales[post.lang] })}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
