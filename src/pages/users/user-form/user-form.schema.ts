import { z } from 'zod';

import {
  INVALID_EMAIL,
  INVALID_SELECT,
  NameFieldRequired,
  REQUIRED_FIELD,
  SELECT_REQUIRED,
} from '@/utils';

export const userSchema = z.object({
  name: NameFieldRequired,
  email: z
    .string()
    .trim()
    .email(INVALID_EMAIL)
    .refine((data) => data.trim() !== '', REQUIRED_FIELD),
  image_url: z.string().nullable().optional(),
  role: z.string().refine((data) => data.trim() !== '', INVALID_SELECT),
  status: z
    .string()
    .trim()
    .refine((data) => data.trim() !== '', SELECT_REQUIRED)
    .optional(),
});

export type UserSchemaType = z.infer<typeof userSchema>;
