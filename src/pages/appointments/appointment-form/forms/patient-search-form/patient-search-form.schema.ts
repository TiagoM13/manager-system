import { z } from 'zod';

import { validateCNS } from '@/utils';

export const patientSearchFormSchema = z.object({
  name: z.string().optional(),
  cpf: z.string().optional(),
  cns: z.string().optional().superRefine(validateCNS),
  page: z.number().optional(),
  page_size: z.number().optional(),
});

export type PatientSearchFormType = z.infer<typeof patientSearchFormSchema>;
