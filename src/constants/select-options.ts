import { AppointmentType } from '@/enums';

export const appointmentTypeOptions = [
  {
    label: 'Consulta',
    value: AppointmentType.QUERY,
  },
  {
    label: 'Acidente de trânsito',
    value: AppointmentType.ACCIDENT,
  },
  {
    label: 'Ferimento por arma branca',
    value: AppointmentType.WHITE_WEAPON_INJURY,
  },
  {
    label: 'Ferimento por arma de fogo',
    value: AppointmentType.FIREARM_INJURY,
  },
  {
    label: 'Outros',
    value: AppointmentType.OTHER,
  },
];

export const genderOptions = [
  {
    label: 'Masculino',
    value: 'masculino',
  },
  {
    label: 'Feminino',
    value: 'feminino',
  },
];

export const maritalStatusOptions = [
  {
    label: 'Solteiro(a)',
    value: 'solteiro(a)',
  },
  {
    label: 'Casado(a)',
    value: 'casado(a)',
  },
  {
    label: 'Divorciado(a)',
    value: 'divorciado(a)',
  },
  {
    label: 'Viúvo(a)',
    value: 'viuvo(a)',
  },
  {
    label: 'Separado(a)',
    value: 'separado(a)',
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
