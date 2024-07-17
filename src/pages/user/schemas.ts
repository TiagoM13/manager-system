import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    .max(255, { message: 'O nome deve ter no máximo 255 caracteres' })
    .refine((data) => data.trim() !== '', {
      message: 'O nome é obrigatório',
    }),
  email: z
    .string()
    .trim()
    .email({ message: 'O email é invalido' })
    .refine((data) => data.trim() !== '', {
      message: 'O nome é obrigatório',
    }),
  image_url: z.string().optional(),
  user_type: z
    .string()
    .trim()
    .refine((data) => data.trim() !== '', {
      message: 'O nome é obrigatório',
    }),
  status: z
    .string()
    .trim()
    .refine((data) => data.trim() !== '', {
      message: 'O nome é obrigatório',
    })
    .optional(),
});

export const formSchema = zodResolver(schema);
