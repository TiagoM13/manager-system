import { z } from 'zod';

import {
  INVALID_EMAIL,
  INVALID_SELECT,
  NAME_FIELD_REQUIRED,
  REQUIRED_FIELD,
  SELECT_REQUIRED,
} from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const userSchema = z.object({
  name: NAME_FIELD_REQUIRED,
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

export type UserDataSchemaType = z.infer<typeof userSchema>;
export const userDataSchema = zodResolver(userSchema);
