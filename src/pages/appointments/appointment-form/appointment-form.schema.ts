import { z } from 'zod';

import { AppointmentType } from '@/shared/enums';
import {
  INVALID_DATE_FIELD,
  REQUIRED_FIELD,
  SELECT_REQUIRED,
  INVALID_SCHEDULED_DATE,
} from '@/shared/utils';

export const appointmentFormSchema = z.object({
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
  doctor_id: z
    .number({
      required_error: SELECT_REQUIRED,
      invalid_type_error: SELECT_REQUIRED,
    })
    .int(),
});

export type AppointmentFormType = z.infer<typeof appointmentFormSchema>;
