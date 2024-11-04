import { AppointmentType } from '@/enums';

export const selectOptions = [
  {
    label: AppointmentType.ACCIDENT,
    value: AppointmentType.ACCIDENT,
  },
  {
    label: AppointmentType.QUERY,
    value: AppointmentType.QUERY,
  },
  {
    label: AppointmentType.FIREARM_INJURY,
    value: AppointmentType.FIREARM_INJURY,
  },
  {
    label: AppointmentType.WHITE_WEAPON_INJURY,
    value: AppointmentType.WHITE_WEAPON_INJURY,
  },
  {
    label: AppointmentType.OTHER,
    value: AppointmentType.OTHER,
  },
];
