import { z } from 'zod';

import { NAME_FIELD_REQUIRED } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  CONFIRM_PASSWORD,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED,
  PASSWORDS_DO_NOT_MATCH,
} from './profile.messages';

const schema = z
  .object({
    name: NAME_FIELD_REQUIRED,
    password: z
      .string({
        required_error: PASSWORD_REQUIRED,
      })
      .trim()
      .min(6, PASSWORD_MIN_LENGTH)
      .optional(),
    confirm_password: z
      .string({
        required_error: PASSWORD_REQUIRED,
      })
      .trim()
      .min(6, PASSWORD_MIN_LENGTH)
      .refine((data) => data.trim() !== '', CONFIRM_PASSWORD)
      .optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: PASSWORDS_DO_NOT_MATCH,
    path: ['confirm_password'],
  });

export const profileSchema = zodResolver(schema);
