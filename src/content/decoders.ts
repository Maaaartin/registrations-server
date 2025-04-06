import { z } from 'zod';
import { stringToPohon } from './discover';
export const DStringArray = z.string().array();
export const DStringDefault = z.string().default('');
export const DNumber = z.number();
export const DValueCountPairs = z
  .object({
    value: z.string(),
    count: z.number()
  })
  .array();

export const DBrand = z.object({
  tovarni_znacka: DStringDefault
});

export const DBrandModel = DBrand.extend({
  tovarni_znacka: DStringDefault,
  typ: DStringDefault
});

export const DDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .transform((val) => (val ? new Date(val) : null));

export const DPage = z.object({
  page: z
    .string()
    .default('0')
    .transform((val) => Number(val) || 0)
});

export const DDiscover = z
  .object({
    datum_prvni_registrace_od: DDate,
    datum_prvni_registrace_do: DDate,
    pohon: z.string().default('').transform(stringToPohon),
    imported: z
      .string()
      .default('')
      .transform((val) => (val === 'true' ? true : false))
  })
  .merge(DBrandModel);
