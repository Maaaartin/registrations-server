import zod from 'zod';

export const DStringArray = zod.string().array();
export const DString = zod.string();
export const DNumber = zod.number();
export const DTopColors = zod
  .object({
    value: zod.string(),
    count: zod.number()
  })
  .array();
export const DRegistrationStats = zod
  .object({
    year: DNumber,
    count: DNumber
  })
  .array();
