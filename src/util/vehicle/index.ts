import type { registrations, imports } from '../../../prisma/client';
import type { Serialized } from '../data';
import registrationColumnMap from '../../registrationColumnMap';

export type SerializableRegistration = Serialized<registrations>;
export type SerializableImport = Serialized<imports>;
export type Props = {
  vehicle: SerializableRegistration;
  vehicleImport?: SerializableImport | null;
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
  const record =
    registrationColumnMap[key as keyof typeof registrationColumnMap];
  return {
    name: record.name || key,
    description: 'description' in record ? record.description : null
  };
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
    options: ['tovarni_znacka', 'typ', 'verze', 'varianta']
  },
  {
    label: 'Rozměry',
    key: 'rozmery',
    options: ['delka', 'sirka', 'vyska']
  },
  {
    label: 'Motor',
    key: 'motor',
    options: [
      'cislo_motoru',
      'typ_motoru',
      'vyrobce_motoru',
      'palivo',
      'max_vykon',
      'max_vykon_otacky'
    ]
  }
];
