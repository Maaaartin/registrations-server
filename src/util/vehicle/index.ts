import type {
  registrations,
  imports,
  inspections,
  removed_vehicles
} from '../../../prisma/client';
import type { Serialized } from '../data';
import registrationColumnMap from './registrationColumnMap';

export type SerializableRegistration = Serialized<registrations>;
export type SerializableImport = Serialized<imports>;
export type SerializableInspection = Serialized<inspections>;
export type SerializableRemoval = Serialized<removed_vehicles>;

export type Props = {
  vehicle: SerializableRegistration;
  vehicleImport: SerializableImport | null;
  vehicleInspections: SerializableInspection[];
  vehicleRemoval: SerializableRemoval | null;
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
  if (value === null || value === undefined) {
    return '';
  }
  return String(value);
};

export function getColumnName(key: keyof SerializableRegistration) {
  if (key in registrationColumnMap) {
    const record =
      registrationColumnMap[key as keyof typeof registrationColumnMap];

    return {
      name: record.name,
      description: 'description' in record ? record.description : null,
      dependsOn: 'dependsOn' in record ? record.dependsOn : null,
      bindWith: 'bindWith' in record ? record.bindWith : null
    };
  }
  return { name: key };
}

export function shouldIncludeRegistrationField(
  key: keyof SerializableRegistration
) {
  const record = getColumnName(key);
  return !Boolean(record.dependsOn);
}

type SectionType = {
  label: string;
  key: string;
  options: (keyof SerializableRegistration)[];
};

export const sections: SectionType[] = [
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

export function includeValue<T extends Record<string, unknown>>(
  value: Serialized<T>[keyof Serialized<T>]
) {
  if (typeof value === 'object' && value && 'value' in value) {
    return Boolean(value.value);
  }
  if (typeof value === 'boolean') {
    return true;
  }
  if (value === '/') {
    return false;
  }
  return Boolean(value);
}
