import { z } from 'zod';

import { AppointmentType } from '@/enums';
import {
  validateCNS,
  OptionalStringField,
  INVALID_DATE_FIELD,
  REQUIRED_FIELD,
  SELECT_REQUIRED,
  INVALID_SCHEDULED_DATE,
} from '@/utils';

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

export const patientSearchSchema = z.object({
  name: z.string().optional(),
  cpf: OptionalStringField,
  cns: OptionalStringField.superRefine(validateCNS),
});

export type AppointmentFormType = z.infer<typeof appointmentFormSchema>;
export type PatientSearchType = z.infer<typeof patientSearchSchema>;
