import React from 'react';

import { PencilSimple, Eye } from '@phosphor-icons/react';

import { AppointmentStatus } from '@/enums';

export interface StatusActionIconProps {
  status?: AppointmentStatus;
}

export const StatusActionIcon: React.FC<StatusActionIconProps> = ({
  status,
}) => {
  return status === AppointmentStatus.PENDING ? (
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
