import { z } from 'zod';

export const NAME_FIELD_REQUIRED = z
  .string({
    required_error: 'O campo é obrigatório',
  })
  .trim()
  .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  .max(255, { message: 'O nome deve ter no máximo 255 caracteres' });

export const OPTIONAL_STRING_FIELD = z.string().nullable().optional();

export const INVALID_EMAIL = 'O email é inválido';
export const SELECT_REQUIRED = 'Selecione uma opção';
export const INVALID_SELECT = 'Selecione uma opção válida';
export const REQUIRED_FIELD = 'O campo é obrigatório';
export const MAX_LENGTH_TEXT = 'O máximo de caracteres permitidos é 255';
export const MAX_LENGTH_FIELD_PHONE =
  'O número de telefone deve ter no máximo 11 dígitos.';
export const MIN_LENGTH_CPF = 'O CPF deve ter no máximo 11 dígitos.';
export const MIN_LENGTH_CNS = 'O CNS deve ter no máximo 15 dígitos.';
export const MAX_DATE_FIELD = 'A idade não pode ser maior que 105 anos';
export const MIN_DATE_FIELD =
  'A data de nascimento não pode ser maior que a data atual';
export const INVALID_DATE_FIELD =
  'Data inválida, por favor insira uma data válida';
export const POSITIVE_NUMBER = 'O número deve ser um número positivo';
