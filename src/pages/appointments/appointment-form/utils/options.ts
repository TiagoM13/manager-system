import { AppointmentType } from '@/enums';

export const optionsAppointmentType = [
  {
    label: 'Consulta',
    value: AppointmentType.QUERY,
  },
  {
    label: 'Acidente de trânsito',
    value: AppointmentType.ACCIDENT,
  },
  {
    label: 'Ferimento Por Arma Branca',
    value: AppointmentType.WHITE_WEAPON_INJURY,
  },
  {
    label: 'Ferimento Por Arma de Fogo',
    value: AppointmentType.FIREARM_INJURY,
  },
  {
    label: 'Outros',
    value: AppointmentType.OTHER,
  },
];
