import { z } from 'zod';

import {
  NameFieldRequired,
  InvalidSelect,
  MaxDateField,
  MinDateField,
  MinLengthCNS,
  MinLengthCPF,
  RequiredField,
  InvalidDateField,
  PositiveNumber,
} from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';

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

const SchemaPatient = z.object({
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
        invalid_type_error: InvalidDateField,
        required_error: RequiredField,
      }),
    )
    .refine((data) => data <= new Date(), {
      message: MinDateField,
    })
    .refine((data) => calculateAge(data) <= 105, {
      message: MaxDateField,
    }),
  sex: z
    .string({ required_error: RequiredField })
    .refine((data) => data.trim() !== '', {
      message: InvalidSelect,
    }),
  cpf: OptionalStringField.refine((value) => !value || value.length === 14, {
    message: MinLengthCPF,
  }),
  cns: OptionalStringField.refine((value) => !value || value.length === 15, {
    message: MinLengthCNS,
  }),
  address: OptionalStringField,
  mother_name: OptionalStringField,
  father_name: OptionalStringField,
  material_status: OptionalStringField,
  occupation: OptionalStringField,
  email: OptionalStringField,
  phone: OptionalStringField,
  contact_emergency: OptionalStringField,
  name_contact_emergency: OptionalStringField,
  health_agent: OptionalStringField,
  height: z
    .number()
    .positive({ message: PositiveNumber })
    .min(50, { message: 'Altura mínima permitida é 50 cm' })
    .max(300, { message: 'Altura máxima permitida é 300 cm' })
    .optional(),
  weight: z
    .number()
    .positive({ message: PositiveNumber })
    .min(50, { message: 'Altura mínima permitida é 50 cm' })
    .max(300, { message: 'Altura máxima permitida é 300 cm' })
    .optional(),
});

export type SchemaPatientType = z.infer<typeof SchemaPatient>;

export const schemaPatient = zodResolver(SchemaPatient);
