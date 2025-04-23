import { Html, Head, Main, NextScript } from 'next/document';
import Footer from '../components/Footer';

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Portál pro vyhledávání v registru vozidel Ministerstva dopravy ČR. Zjistěte informace o registrovaných automobilech."
        />
        <meta
          name="keywords"
          content="info o vozidlech, registr vozidel, VIN, Ministerstvo dopravy, kontrola vozu, registrace vozidel"
        />
        <meta name="author" content="info-o-vozidlech.cz" />
        <meta httpEquiv="Cache-Control" content="public, max-age=3600" />
        <link rel="canonical" href="https://info-o-vozidlech.cz/" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <footer>
          <Footer />
        </footer>
      </body>
    </Html>
  );
}
