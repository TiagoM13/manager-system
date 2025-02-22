import { z } from 'zod';

import {
  INVALID_EMAIL,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED,
  REQUIRED_FIELD,
} from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const loginValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, REQUIRED_FIELD)
    .email(INVALID_EMAIL)
    .refine((data) => data.trim() !== '', REQUIRED_FIELD),
  password: z
    .string({
      required_error: PASSWORD_REQUIRED,
    })
    .trim()
    .min(6, PASSWORD_MIN_LENGTH),
});

export const forgotPasswordValidationSchema = z.object({
  email: z
    .string({ required_error: REQUIRED_FIELD })
    .min(1, REQUIRED_FIELD)
    .email(INVALID_EMAIL),
});

export const loginSchema = zodResolver(loginValidationSchema);
export const forgotPasswordSchema = zodResolver(forgotPasswordValidationSchema);

export type SchemaLoginType = z.infer<typeof loginValidationSchema>;
export type SchemaForgotPasswordType = z.infer<
  typeof forgotPasswordValidationSchema
>;
