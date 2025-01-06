import { z } from 'zod';

import { MaritalStatus } from '@/enums/marital-status';
import { Sex } from '@/enums/sex';
import {
  validateCNS,
  NameFieldRequired,
  INVALID_SELECT,
  MAX_DATE_FIELD,
  MIN_DATE_FIELD,
  MIN_LENGTH_CPF,
  REQUIRED_FIELD,
  INVALID_DATE_FIELD,
  POSITIVE_NUMBER,
  MAX_LENGTH_FIELD_PHONE,
} from '@/utils';

const OptionalStringField = z
  .string()
  .nullable()
  .optional()
  .transform((val) => (val === '' ? null : val));

const calculateAge = (birthDate: Date) => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
};

const stringToNumber = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === '') return null;
  const parsed = parseFloat(value as string);
  return isNaN(parsed) ? null : parsed;
};

const removeNonNumeric = (value: string) => value.replace(/\D/g, '');

export const schemaPatient = z.object({
  name: NameFieldRequired,
  birth_date: z
    .preprocess(
      (arg) => {
        if (typeof arg === 'string') {
          const parsedDate = new Date(arg);
          return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
        }
        return arg;
      },
      z.date({
        invalid_type_error: INVALID_DATE_FIELD,
        required_error: REQUIRED_FIELD,
      }),
    )
    .refine((data) => data <= new Date(), {
      message: MIN_DATE_FIELD,
    })
    .refine((data) => calculateAge(data) <= 105, {
      message: MAX_DATE_FIELD,
    }),
  sex: z.nativeEnum(Sex, { message: INVALID_SELECT }),
  cpf: OptionalStringField,
  cns: OptionalStringField.superRefine(validateCNS),
  address: OptionalStringField,
  mother_name: OptionalStringField,
  father_name: OptionalStringField,
  marital_status: z.nativeEnum(MaritalStatus).nullable().optional(),
  occupation: OptionalStringField,
  email: OptionalStringField,
  phone: OptionalStringField.refine(
    (value) => {
      if (!value) return true;
      const numericValue = removeNonNumeric(value);
      return numericValue.length === 11;
    },
    {
      message: MAX_LENGTH_FIELD_PHONE,
    },
  ),
  contact_emergency: OptionalStringField.refine(
    (value) => {
      if (!value) return true;
      const numericValue = removeNonNumeric(value);

      console.log(numericValue.length);
      return numericValue.length === 11;
    },
    {
      message: MAX_LENGTH_FIELD_PHONE,
    },
  ),
  name_contact_emergency: OptionalStringField,
  health_agent: OptionalStringField,
  height: z
    .union([z.string(), z.number(), z.null()])
    .transform((value) => stringToNumber(value))
    .refine((val) => val === null || (typeof val === 'number' && val > 0), {
      message: POSITIVE_NUMBER,
    })
    .refine(
      (val) =>
        val === null || (typeof val === 'number' && val >= 50 && val <= 300),
      {
        message: 'A altura deve ser entre 50 cm e 300 cm',
      },
    )
    .optional(),
  weight: z
    .union([z.string(), z.number(), z.null()])
    .transform((value) => stringToNumber(value))
    .refine((val) => val === null || (typeof val === 'number' && val > 0), {
      message: POSITIVE_NUMBER,
    })
    .refine(
      (val) =>
        val === null || (typeof val === 'number' && val >= 0.5 && val <= 500),
      {
        message: 'O peso deve ser entre 0.5 kg e 500 kg',
      },
    )
    .optional(),
});

export type SchemaPatientType = z.infer<typeof schemaPatient>;
