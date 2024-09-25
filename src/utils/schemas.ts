import { z } from 'zod';

export const NameFieldRequired = z
  .string({
    required_error: 'O campo é obrigatório',
  })
  .trim()
  .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  .max(255, { message: 'O nome deve ter no máximo 255 caracteres' });

export const OptionalStringField = z.string().nullable().optional();

export const InvalidSelect = 'Selecione uma opção válida';
export const RequiredField = 'O campo é obrigatório';
export const MaxLengthText = 'O máximo de caracteres permitidos é 255';
export const MaxLengthFieldPhone =
  'O número de telefone deve ter no máximo 11 dígitos.';
export const MinLengthCPF = 'O CPF deve ter no máximo 11 dígitos.';
export const MinLengthCNS = 'O CNS deve ter no máximo 15 dígitos.';
export const MaxDateField = 'A idade não pode ser maior que 105 anos';
export const MinDateField =
  'A data de nascimento não pode ser maior que a data atual';
export const InvalidDateField =
  'Data inválida, por favor insira uma data válida';
