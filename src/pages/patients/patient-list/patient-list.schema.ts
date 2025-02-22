import { z } from 'zod';

import { validateCNS } from '@/shared/utils';

export const schemaFilterPatient = z.object({
  name: z.string().optional(),
  cpf: z.string().optional(),
  cns: z.string().optional().superRefine(validateCNS),
  page: z.number().optional(),
  page_size: z.number().optional(),
});

export type SchemaFilterPatientType = z.infer<typeof schemaFilterPatient>;
