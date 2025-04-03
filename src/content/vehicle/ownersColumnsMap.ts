export default {
  typ_subjektu: {
    name: 'Typ subjektu',
    map: (value: number) => {
      switch (value) {
        case 1:
          return 'ROB';
        case 2:
          return 'ROS';
        case 3:
          return 'ISZR';
        default:
          return String(value);
      }
    }
  },
  vztah_k_vozidlu: {
    name: 'Vztah k vozidlu',
    map: (value: number) => {
      switch (value) {
        case 1:
          return 'vlastník';
        case 2:
          return 'provozovatel';
        default:
          return String(value);
      }
    }
  },
  // aktualni: {
  //   name: 'Aktuální',
  //   description: 'Informace, zda je daný subjekt veden na vozidle jako aktuální'
  // },
  ico: { name: 'IČO', description: 'IČ subjektu, jen pro právnické osoby' },
  nazev: {
    name: 'Název',
    description: 'Název subjektu, jen pro právnické osoby'
  },
  adresa: {
    name: 'Adresa',
    description: 'Adresa subjektu, jen pro právnické osoby'
  },
  datum_od: {
    name: 'Datum od',
    description: 'Datum od kdy je subjekt veden na vozidle'
  },
  datum_do: {
    name: 'Datum do',
    description: 'Datum do kdy je subjekt veden na vozidle'
  }
} as const;
