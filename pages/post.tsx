import React from 'react';

import { Page } from './page';

type PostProps = {
  lang: string;
  description: string;
  image: string;
  title: string;
  createdAt: Date;
  contents: string;
}

export function Post({
  title,
  lang,
  description,
  image,
  contents
}: PostProps) {
  return (
    <Page lang={lang} header={
      <>
        <meta name="description" content={description} />
        <meta name="author" content="Aleksandr Shoronov" />
        <meta name="og:author" content="Aleksandr Shoronov" />
        <meta name="og:image" content={`https://underoot.dev${image}`} />
        <meta name="og:image:width" content="1200" />
        <meta name="og:image:height" content="800" />
        <meta name="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://underoot.dev${image}`} />
        <meta name="twitter:title" content={title} />
        <title>{title}</title>
      </>
    }>
      <article className="prose mx-auto px-4 pb-8 prose-sm sm:prose lg:prose-lg" dangerouslySetInnerHTML={{__html: contents}} />
    </Page>
  );
}
