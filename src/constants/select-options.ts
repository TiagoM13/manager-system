import { AppointmentType } from '@/enums';
import { MaritalStatus } from '@/enums/marital-status';
import { Sex } from '@/enums/sex';

import {
  APPOINTMENT_TYPE_LABELS,
  MARITAL_STATUS_LABELS,
  SEX_LABELS,
} from './labels';

export const appointmentTypeOptions = [
  {
    value: AppointmentType.QUERY,
    label: APPOINTMENT_TYPE_LABELS.QUERY,
  },
  {
    value: AppointmentType.ACCIDENT,
    label: APPOINTMENT_TYPE_LABELS.ACCIDENT,
  },
  {
    value: AppointmentType.WHITE_WEAPON_INJURY,
    label: APPOINTMENT_TYPE_LABELS.WHITE_WEAPON_INJURY,
  },
  {
    value: AppointmentType.FIREARM_INJURY,
    label: APPOINTMENT_TYPE_LABELS.FIREARM_INJURY,
  },
  {
    value: AppointmentType.OTHER,
    label: APPOINTMENT_TYPE_LABELS.OTHER,
  },
];

export const genderOptions = [
  {
    value: Sex.MALE,
    label: SEX_LABELS.MALE,
  },
  {
    value: Sex.FEMALE,
    label: SEX_LABELS.FEMALE,
  },
];

export const maritalStatusOptions = [
  {
    value: MaritalStatus.SINGLE,
    label: MARITAL_STATUS_LABELS.SINGLE,
  },
  {
    value: MaritalStatus.MARRIED,
    label: MARITAL_STATUS_LABELS.MARRIED,
  },
  {
    value: MaritalStatus.DIVORCED,
    label: MARITAL_STATUS_LABELS.DIVORCED,
  },
  {
    value: MaritalStatus.WIDOWED,
    label: MARITAL_STATUS_LABELS.WIDOWED,
  },
  {
    value: MaritalStatus.SEPARATED,
    label: MARITAL_STATUS_LABELS.SEPARATED,
  },
];

export const medicalConditionsOptions = [
  {
    label: 'Hipertenso',
    value: 'hipertenso',
  },
  {
    label: 'Diabetico',
    value: 'diabetico',
  },
];

export const healthAgentOptions = [
  {
    label: 'Ana Maria (Area A)',
    value: 'Ana Maria (Area A)',
  },
  {
    label: 'Jose Brito (Area B)',
    value: 'Jose Brito (Area B)',
  },
];

export const pregnancyOptions = [
  {
    label: 'Sim',
    value: 'sim',
  },
  {
    label: 'Não',
    value: 'não',
  },
];
