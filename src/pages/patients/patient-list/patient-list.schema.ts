import { z } from 'zod';

import { MAX_LENGTH_TEXT } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const SchemaFilterPatient = z.object({
  name: z.string().trim().max(255, MAX_LENGTH_TEXT).optional(),
  page: z.string().optional(),
});

export type SchemaFilterPatientType = z.infer<typeof SchemaFilterPatient>;

export const schemaFilterPatient = zodResolver(SchemaFilterPatient);
