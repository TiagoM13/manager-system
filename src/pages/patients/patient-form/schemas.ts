import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

const FieldTextRequired = z
  .string({
    required_error: 'O campo é obrigatório',
  })
  .trim()
  .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  .max(255, { message: 'O nome deve ter no máximo 255 caracteres' });

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

const schema = z.object({
  name: FieldTextRequired,
  birth_date: z
    .preprocess(
      (arg) => {
        if (typeof arg === 'string') {
          // Tenta transformar a string de entrada em data
          const parsedDate = new Date(arg);
          return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
        }
        return arg;
      },
      z.date({
        invalid_type_error: 'Data inválida, por favor insira uma data válida',
        required_error: 'O campo é obrigatório',
      }),
    )
    .refine((data) => data <= new Date(), {
      message: 'A data de nascimento não pode ser futura',
    })
    .refine((data) => calculateAge(data) <= 105, {
      message: 'A idade não pode ser maior que 105 anos',
    }),
  sex: z
    .string({ required_error: 'O campo é obrigatório.' })
    .refine((data) => data.trim() !== '', {
      message: 'Selecione uma opção válida',
    }),
  cpf: OptionalStringField.refine((value) => !value || value.length === 14, {
    message: 'O CPF deve ter no máximo 11 dígitos.',
  }),
  cns: OptionalStringField.refine((value) => !value || value.length === 15, {
    message: 'O CNS deve ter no máximo 15 dígitos.',
  }),
  address: OptionalStringField,
  mother_name: OptionalStringField,
  father_name: OptionalStringField,
  material_status: OptionalStringField,
  occupation: OptionalStringField,
  email: OptionalStringField,
  phone: OptionalStringField,
  health_agent: OptionalStringField,
});

export const formSchema = zodResolver(schema);
