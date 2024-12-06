import { z } from 'zod';

import {
  INVALID_END_DATE_FIELD,
  INVALID_START_DATE_FIELD,
  START_DATE_CANNOT_BE_GREATER_THAN_END_DATE,
} from '@/utils';

const isValidDate = (val: unknown) => {
  if (typeof val === 'string') {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }
  return val instanceof Date;
};

export const appointmentFiltersSchema = z
  .object({
    name: z.string().optional(),
    page: z.number().int().positive().default(1).optional(),
    page_size: z.coerce
      .number()
      .int()
      .positive()
      .max(500)
      .default(10)
      .optional(),
    appointment_type: z.string().nullable().optional(),
    start_date: z.preprocess(
      (val) => (isValidDate(val) ? new Date(val as string) : undefined),
      z
        .date({
          invalid_type_error: INVALID_START_DATE_FIELD,
        })
        .optional(),
    ),
    end_date: z.preprocess(
      (val) => (isValidDate(val) ? new Date(val as string) : undefined),
      z
        .date({
          invalid_type_error: INVALID_END_DATE_FIELD,
        })
        .optional(),
    ),
  })
  .refine(
    (data) => {
      if (data.start_date && data.end_date) {
        return data.start_date <= data.end_date;
      }
      return true;
    },
    {
      message: START_DATE_CANNOT_BE_GREATER_THAN_END_DATE,
      path: ['start_date'],
    },
  );

export type AppointmentFiltersSchemaType = z.infer<
  typeof appointmentFiltersSchema
>;
