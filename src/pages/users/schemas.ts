import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z
    .string()
    .trim()
    .max(255, { message: 'O máximo de caracteres permitos é 255' })
    .optional(),
});

export const filterSchema = zodResolver(schema);
