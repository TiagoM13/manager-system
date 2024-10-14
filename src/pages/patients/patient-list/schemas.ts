import { z } from 'zod';

import { MaxLengthText } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const SchemaFilterPatient = z.object({
  name: z.string().trim().max(255, { message: MaxLengthText }).optional(),
  page: z.string().optional(),
});

export type SchemaFilterPatientType = z.infer<typeof SchemaFilterPatient>;

export const schemaFilterPatient = zodResolver(SchemaFilterPatient);
