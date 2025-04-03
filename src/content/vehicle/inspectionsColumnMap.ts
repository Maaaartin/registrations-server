export default {
  // aktualni: {
  //   name: 'Aktuální',
  //   description:
  //     'Informace, zda je prohlídka uvedeného typu je na vozidle vedena jako aktuální'
  // },
  cislo_protokolu: {
    name: 'Čislo protokolu',
    description: 'Číslo protokolu p technické prohlídce'
  },
  kod_stk: { name: 'Kód STK', description: 'Kód stanice technické kontroly' },
  nazev_stk: { name: 'Název STK', description: 'Adresa STK, příp. název' },
  platnost_do: {
    name: 'Platnost do',
    description: '	Koncové datum platnosti prohlídky'
  },
  platnost_od: {
    name: 'Platnost od',
    description: 'Počáteční datum platnosti prohlídky'
  },
  stav: { name: 'Stav', description: 'Stav vozidla (A, B, C, Nezjištěno)' },
  typ: { name: 'Typ', description: 'Typ prohlídky, např. P - Pravidelná' }
} as const;
