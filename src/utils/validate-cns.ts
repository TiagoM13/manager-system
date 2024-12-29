import { type RefinementCtx, z } from 'zod';

import { ONLY_NUMBERS_CNS, MIN_LENGTH_CNS } from './schemas';

export const validateCNS = (
  value: string | null | undefined,
  ctx: RefinementCtx,
) => {
  if (value) {
    if (!/^\d+$/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ONLY_NUMBERS_CNS,
      });
    }
    if (value.length !== 15) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: MIN_LENGTH_CNS,
      });
    }
  }
};
