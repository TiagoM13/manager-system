import { z } from 'zod';

import { MAX_LENGTH_TEXT } from '@/utils';

export const schemaFilterPatient = z.object({
  name: z.string().trim().max(255, MAX_LENGTH_TEXT).optional(),
  page: z.string().optional(),
});

export type SchemaFilterPatientType = z.infer<typeof schemaFilterPatient>;
