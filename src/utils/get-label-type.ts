import { STATUS_LABELS } from '@/constants/labels';
import { Status, Role, AppointmentStatus } from '@/enums';
import { ROLE_LABELS } from '@/pages/users/user-form/utils/options';

export const getLabelForType = (type: Status | Role | AppointmentStatus) => {
  const labelMappings: Record<string, Record<string, string>> = {
    [Status.ACTIVE]: STATUS_LABELS,
    [Status.INACTIVE]: STATUS_LABELS,
    [Role.ADMIN]: ROLE_LABELS,
    [Role.EDITOR]: ROLE_LABELS,
    [Role.CLINICAL]: ROLE_LABELS,
  };

  return labelMappings[type]?.[type];
};
