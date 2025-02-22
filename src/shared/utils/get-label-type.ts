import { APPOINTMENT_STATUS_LABELS, STATUS_LABELS } from '@/shared/constants/labels';
import { Status, Role, AppointmentStatus } from '@/shared/enums';
import { ROLE_LABELS } from '@/pages/users/user-form/utils/options';

export const getLabelForType = (type: Status | Role | AppointmentStatus) => {
  const labelMappings: Record<string, Record<string, string>> = {
    [Status.ACTIVE]: STATUS_LABELS,
    [Status.INACTIVE]: STATUS_LABELS,
    [Role.ADMIN]: ROLE_LABELS,
    [Role.EDITOR]: ROLE_LABELS,
    [Role.CLINICAL]: ROLE_LABELS,
    [AppointmentStatus.COMPLETED]: APPOINTMENT_STATUS_LABELS,
    [AppointmentStatus.CANCELLED]: APPOINTMENT_STATUS_LABELS,
    [AppointmentStatus.PENDING]: APPOINTMENT_STATUS_LABELS,
  };

  return labelMappings[type]?.[type];
};
