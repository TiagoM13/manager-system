import { z } from 'zod';

import { AppointmentType } from '@/shared/enums';
import {
  INVALID_DATE_FIELD,
  INVALID_SCHEDULED_DATE,
  MAX_LENGTH_TEXT,
  MIN_LENGTH_TEXT,
  REQUIRED_FIELD,
  SELECT_REQUIRED,
} from '@/shared/utils';

export const appointmentDetailsSchema = z.object({
  appointment_type: z.nativeEnum(AppointmentType, { message: SELECT_REQUIRED }),
  scheduled_date: z.preprocess(
    (arg) => {
      if (typeof arg === 'string') {
        const parsedDate = new Date(arg);
        return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
      }
      return arg;
    },
    z
      .date({
        invalid_type_error: INVALID_DATE_FIELD,
        required_error: REQUIRED_FIELD,
      })
      .max(new Date(), {
        message: INVALID_SCHEDULED_DATE,
      }),
  ),
  doctor_id: z.string({
    required_error: SELECT_REQUIRED,
    invalid_type_error: SELECT_REQUIRED,
  }),
  diagnosis_summary: z
    .string({
      required_error: REQUIRED_FIELD,
      invalid_type_error: REQUIRED_FIELD,
    })
    .min(3, MIN_LENGTH_TEXT)
    .max(255, MAX_LENGTH_TEXT)
    .nullable(),
});

export type AppointmentDetailsType = z.infer<typeof appointmentDetailsSchema>;
