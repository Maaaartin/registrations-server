import zod from 'zod';

export const DStringArray = zod.string().array();
export const DStringDefault = zod.string().default('');
export const DNumber = zod.number();
export const DValueCountPairs = zod
  .object({
    value: zod.string(),
    count: zod.number()
  })
  .array();

export const DBrand = zod.object({
  tovarni_znacka: DStringDefault
});

export const DBrandModel = DBrand.extend({
  tovarni_znacka: DStringDefault,
  typ: DStringDefault
});

export const DDate = zod
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .transform((val) => (val ? new Date(val) : null));

export const DPage = zod.object({
  page: zod
    .string()
    .default('0')
    .transform((val) => Number(val) || 0)
});

export const DDiscover = zod
  .object({
    datum_prvni_registrace_od: DDate,
    datum_prvni_registrace_do: DDate
  })
  .merge(DBrandModel);
