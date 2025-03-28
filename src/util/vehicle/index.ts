import {
  registrations,
  imports,
  inspections,
  Prisma
} from '../../../prisma/client';
import type { Serialized } from '../data';
import registrationColumnMap from '../../registrationColumnMap';

export type SerializableRegistration = Serialized<registrations>;
export type SerializableImport = Serialized<imports>;
export type SerializableInspection = Serialized<inspections>;

export type Props = {
  vehicle: SerializableRegistration;
  vehicleImport?: SerializableImport | null;
  vehicleInspections: SerializableInspection[];
};

export const valueToString = (
  value: SerializableRegistration[keyof SerializableRegistration]
) => {
  if (typeof value === 'object' && value?.value) {
    return new Date(value.value).toLocaleDateString();
  }
  if (typeof value === 'boolean') {
    return value ? 'Ano' : 'Ne';
  }
  return String(value);
};

export function getColumnName(key: keyof SerializableRegistration) {
  if (key in registrationColumnMap) {
    const record =
      registrationColumnMap[key as keyof typeof registrationColumnMap];

    return {
      name: record.name,
      description: 'description' in record ? record.description : null
    };
  }
  return { name: key };
}

type SectionType = {
  label: string;
  key: string;
  options: (keyof SerializableRegistration)[];
};

const baseSections: SectionType[] = [
  {
    label: 'Obecné',
    key: 'obecne',
    options: [
      'vyrobce_vozidla',
      'tovarni_znacka',
      'typ',
      'verze',
      'varianta',
      'druh_karoserie',
      'druh_vozidla',
      'druh_vozidla_2_radek',
      'obchodni_oznaceni',
      'rok_vyroby',
      'nejvyssi_rychlost'
    ]
  },
  {
    label: 'Rozměry',
    key: 'rozmery',
    options: [
      'delka',
      'sirka',
      'vyska',
      'rozchod',
      'rozvor',
      'lozna_delka',
      'lozna_sirka'
    ]
  },
  {
    label: 'Hmotnosti',
    key: 'hmotnost',
    options: [
      'provozni_hmotnost',
      'nejvetsi_povolena_hmotnost',
      'nejvetsi_povolena_hmotnost_jizdni_soupravy'
    ]
  },
  {
    label: 'Motor',
    key: 'motor',
    options: [
      'zdvihovy_objem',
      'typ_motoru',
      'vyrobce_motoru',
      'palivo',
      'max_vykon',
      'max_vykon_otacky'
    ]
  },
  {
    label: 'Brzdy',
    key: 'brzdy',
    options: [
      'brzdy_nouzova',
      'brzdy_odlehcovaci',
      'brzdy_parkovaci',
      'brzdy_provozni'
    ]
  },
  {
    label: 'Výbava',
    key: 'vybava',
    options: ['abs', 'airbag', 'asr', 'retarder']
  },
  {
    label: 'Formální údaje',
    key: 'formalni_udaje',
    options: [
      'datum_1_registrace',
      'datum_1_registrace_v_cr',
      'vyrobni_cislo_karoserie',
      'cislo_motoru',
      'vin',
      'cislo_orv',
      'cislo_tp',
      'doplnkovy_text_na_tp'
    ]
  }
];

const allKeys = Object.keys(
  Prisma.RegistrationsScalarFieldEnum
) as (keyof SerializableRegistration)[];

const remainingSection: SectionType = {
  label: 'Ostatní Údaje',
  key: 'ostatni_udaje',
  options: allKeys.filter(
    (key) =>
      key !== 'id' && !baseSections.some((sec) => sec.options.includes(key))
  )
};

export const sections = baseSections.concat(remainingSection);

export const inspectionHeaderMap: Record<
  Exclude<keyof SerializableInspection, 'pcv' | 'id'>,
  string
> = {
  aktualni: 'Aktuální',
  cislo_protokolu: 'Čislo protokolu',
  kod_stk: 'Kód STK',
  nazev_stk: 'Název STK',
  platnost_do: 'Platnost do',
  platnost_od: 'Platnost od',
  stav: 'Stav',
  typ: 'Typ'
};
