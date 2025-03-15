import zod from 'zod';

export const DStringArray = zod.string().array();
export const DString = zod.string();
export const DNumber = zod.number();
export const DValueCountPairs = zod
  .object({
    value: zod.string(),
    count: zod.number()
  })
  .array();

export const DBrand = zod.object({
  tovarni_znacka: zod.string().default('')
});

export const DBrandModel = DBrand.extend({
  tovarni_znacka: zod.string().default(''),
  typ: zod.string().default('')
});

export const DDate = zod
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .transform((val) => (val ? new Date(val) : null));
