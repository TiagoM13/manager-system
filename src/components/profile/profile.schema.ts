import { z } from 'zod';

import {
  CONFIRM_PASSWORD,
  PASSWORDS_DO_NOT_MATCH,
} from '@/shared/constants/messages';
import {
  NameFieldRequired,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED,
} from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z
  .object({
    name: NameFieldRequired,
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
