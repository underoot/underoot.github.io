import React, { PropsWithChildren, ReactNode } from 'react';

type PageProps = {
  header?: ReactNode;
}

export function Page({
  header,
  children
}: PropsWithChildren<PageProps>) {
  return (
    <html lang="ru">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-57288431-1"></script>
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-57288431-1');
        `}}></script>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/index.css" />
        {header}
      </head>
      <body className="antialiased">
        <div className="main">
          <header className="text-center px-4 py-4 pb-8">
            <a href="/" className="inline-block">
              <div className="logo" />
            </a>
          </header>
          {children}
        </div>
        <footer className="max-w-prose mx-auto text-center px-4 md:text-right">
          build with ❤️️ by&nbsp;
          <a href="https://github.com/underoot" className="font-bold">underoot</a>
        </footer>
      </body>
    </html>
  );
}