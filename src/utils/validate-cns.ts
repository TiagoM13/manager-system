import { type RefinementCtx, z } from 'zod';

import { MIN_LENGTH_CNS } from './schemas';

export const validateCNS = (
  value: string | null | undefined,
  ctx: RefinementCtx,
) => {
  if (value) {
    if (!/^\d+$/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: MIN_LENGTH_CNS,
      });
    }
  }
};
