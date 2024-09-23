import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

const SchemaFilterPatient = z.object({
  name: z
    .string()
    .trim()
    .max(255, { message: 'O máximo de caracteres permitos é 255' })
    .optional(),
  page: z.string().optional(),
});

export type SchemaFilterPatientType = z.infer<typeof SchemaFilterPatient>;

export const schemaFilterPatient = zodResolver(SchemaFilterPatient);
