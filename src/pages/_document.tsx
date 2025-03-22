import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any"></link>
        <meta
          lang="cs"
          name="Info o vozidlech"
          content="Portál pro vyhledávání v registru vozidel Ministerstva dopravy"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
