import { TextField } from '@mui/material';
import Head from 'next/head';
import { z } from 'zod';
import useFetch from '../hooks/useFetch';

export default function HomePage() {
  useFetch({
    url: '/api/register-load',
    decoder: z.void(),
    init: { method: 'POST' }
  });
  return (
    <>
      <Head>
        <title>Info o vozidlech – Vyhledávání v registru vozidel ČR</title>
        <meta
          name="description"
          content="Zjistěte informace o vozech podle SPZ nebo VIN."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Info o vozidlech',
              url: 'https://info-o-vozidlech.cz/',
              potentialAction: {
                '@type': 'SearchAction',
                target:
                  'https://info-o-vozidlech.cz/search?vin={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </Head>
      <h1>Info o vozidlech</h1>
      <p>
        Tento portál unožňuje vyhledávat v databázi vozidel, která je dostupná
        jako csv soubor v{' '}
        <a href="https://download.dataovozidlech.cz/" target="_blank">
          Datové kostce Misiterstva dopravy
        </a>
        .
      </p>
      <p>
        Data nejsou nijak filtrovaná, to znamená, že pokud se v údajích
        nacházejí chyby, jsou tyto chyby zobrazeny i zde.
      </p>
      <p>Rychlé vyhledávání VIN </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const vin = formData.get('vin') as string;
          window.location.assign(`/search?vin=${vin}`);
        }}
      >
        <TextField name="vin" label="VIN" autoFocus />
      </form>
    </>
  );
}
