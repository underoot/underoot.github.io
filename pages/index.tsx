import React from 'react';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru'

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
          const dateFolder = format(post.createdAt, 'yyyyLLdd');

          return (
            <li key={`${dateFolder}/${post.url}`}>
              <a href={`${dateFolder}/${post.url}`} className="no-underline">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </a>
              <div className="flex justify-between">
                <a href={post.url} className="text-blue-400">Открыть</a>
                <time dateTime={post.createdAt.toISOString()} className="text-gray-400">
                  {format(post.createdAt, 'PPpp', { locale: ru })}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}