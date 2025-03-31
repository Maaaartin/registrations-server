export default {
  datum_od: { name: 'Datum vyřazení z provozu' },
  datum_do: { name: 'Datum ukončení vyřazení z provozu' },
  duvod: { name: 'Důvod vyřazení', description: 'např. Na žádost vlastníka' },
  rm_kod: {
    name: 'Kód registračního místa',
    description: 'Kód registračního místa, kde bylo vozidlo vyřazeno z provozu'
  },
  rm_nazev: {
    name: '	Název registračního místa',
    description:
      'Název registračního místa, kde bylo vozidlo vyřazeno z provozu'
  }
} as const;
