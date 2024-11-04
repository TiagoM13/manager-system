import { z } from 'zod';

import { AppointmentType } from '@/enums';
import { zodResolver } from '@hookform/resolvers/zod';

const isValidDate = (val: unknown) => {
  if (typeof val === 'string') {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }
  return val instanceof Date;
};

export const appointmentFiltersSchema = z.object({
  name: z.string().optional(),
  page: z.number().int().positive().default(1).optional(),
  page_size: z.coerce.number().int().positive().max(500).default(10).optional(),
  appointment_type: z.string().nullable().optional(),
});

export const appointmentFiltersSchemaResolver = zodResolver(
  appointmentFiltersSchema,
);

export type AppointmentFiltersSchemaType = z.infer<
  typeof appointmentFiltersSchema
>;
