import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

const schema = z
  .object({
    name: z
      .string({
        required_error: 'O nome é obrigatório',
      })
      .trim()
      .min(3, { message: 'O nome dever ter no mínimo 3 caracteres' })
      .max(255, { message: 'O número máximo de caracteres é 255' }),
    password: z
      .string({
        required_error: 'A senha é obrigatória',
      })
      .trim()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
      .optional(),
    confirm_password: z
      .string({
        required_error: 'A senha é obrigatória',
      })
      .trim()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
      .refine((data) => data.trim() !== '', {
        message: 'Confirme sua senha',
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não coincidem',
    path: ['confirm_password'],
  });

export const profileSchema = zodResolver(schema);
