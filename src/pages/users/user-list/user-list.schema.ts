import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().trim().optional(),
  page: z.string().optional(),
});

export const filterSchema = zodResolver(schema);
