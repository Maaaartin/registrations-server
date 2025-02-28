export default function HomePage() {
  return (
    <>
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
        nacházejí chyby, jsou tyto chyby zobrazeny i zde. Cílem tohoto portálu
        je pouze umožnit vyhledávání v otevřených datech.
      </p>
    </>
  );
}
