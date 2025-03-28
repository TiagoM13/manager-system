import React from 'react';

import { Eye, PencilSimple } from '@phosphor-icons/react';

import { AppointmentStatus } from '@/shared/enums';
import { usePermissions } from '@/shared/hooks';

export interface StatusActionIconProps {
  status?: AppointmentStatus;
}

export const StatusActionIcon: React.FC<StatusActionIconProps> = ({
  status,
}) => {
  const { isEdit } = usePermissions();

  return status === AppointmentStatus.PENDING && !isEdit ? (
    <PencilSimple
      data-testid="icon-edit"
      className="size-4 text-sky-600"
      weight="bold"
    />
  ) : (
    <Eye
      data-testid="icon-view"
      className="size-4 text-sky-600"
      weight="bold"
    />
  );
};
