import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'O email é invalido' })
    .refine((data) => data.trim() !== '', {
      message: 'O email é obrigatório',
    }),
  password: z
    .string()
    .trim()
    .refine((data) => data.trim() !== '', {
      message: 'A senha é obrigatória',
    }),
});

export const forgotSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export const loginSchema = zodResolver(schema);
export const forgotPasswordSchema = zodResolver(forgotSchema);
