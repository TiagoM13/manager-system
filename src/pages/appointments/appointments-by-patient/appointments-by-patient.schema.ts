import { z } from 'zod';

import { AppointmentStatus, AppointmentType } from '@/shared/enums';
import { INVALID_DATE_FIELD } from '@/shared/utils';

const isValidDate = (val: unknown) => {
  if (typeof val === 'string') {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }
  return val instanceof Date;
};

export const appointmentsByPatientFiltersSchema = z.object({
  page: z.number().int().positive().default(1).optional(),
  page_size: z.coerce.number().int().positive().max(500).default(10).optional(),
  appointment_type: z
    .union([z.nativeEnum(AppointmentType), z.undefined(), z.null(), z.string()])
    .optional(),
  scheduled_date: z.preprocess(
    (val) => (isValidDate(val) ? new Date(val as string) : undefined),
    z
      .date({
        invalid_type_error: INVALID_DATE_FIELD,
      })
      .optional(),
  ),
  status: z
    .union([
      z.nativeEnum(AppointmentStatus),
      z.undefined(),
      z.null(),
      z.string(),
    ])
    .optional(),
});

export type AppointmentsByPatientFiltersSchemaType = z.infer<
  typeof appointmentsByPatientFiltersSchema
>;
