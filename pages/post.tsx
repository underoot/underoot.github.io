import React from 'react';

import { Page } from './page';

type PostProps = {
  description: string;
  image: string;
  title: string;
  createdAt: Date;
  contents: string;
}

export function Post({
  title,
  description,
  image,
  contents
}: PostProps) {
  return (
    <Page header={
      <>
        <meta name="description" content={description} />
        <meta name="author" content="Aleksandr Shoronov" />
        <meta name="og:image" content={image} />
        <title>{title}</title>
      </>
    }>
      <article className="prose mx-auto px-4 pb-8 prose-sm sm:prose lg:prose-lg" dangerouslySetInnerHTML={{__html: contents}} />
    </Page>
  );
}
