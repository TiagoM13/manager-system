import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

export const appointmentFiltersSchema = z.object({
  name: z.string().optional(),
  page: z.number().int().positive().optional(),
  page_size: z.number().int().positive().optional(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  appointment_type: z.string().optional(),
});

export const appointmentFiltersSchemaResolver = zodResolver(
  appointmentFiltersSchema,
);

export type AppointmentFiltersSchemaType = z.infer<
  typeof appointmentFiltersSchema
>;
