import { Html, Head, Main, NextScript } from 'next/document';
import Footer from '../components/Footer';

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
        <meta httpEquiv="Cache-control" content="public"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <footer>
        <Footer />
      </footer>
    </Html>
  );
}
