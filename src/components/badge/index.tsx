import React from 'react';

import { AppointmentStatus, Role, Status } from '@/enums';

export type BadgeProps = {
  type: Status | Role | AppointmentStatus | undefined;
};

export const Badge: React.FC<BadgeProps> = ({ type }) => {
  const bg_admin = type === Role.ADMIN ? 'bg-purple-500 text-white' : null;
  const bg_editor = type === Role.EDITOR ? 'bg-blue-500 text-white' : null;
  const bg_clinical = type === Role.CLINICAL ? 'bg-cyan-500 text-white' : null;
  const bg_status = type === Status.ACTIVE ? 'bg-emerald-400' : 'bg-slate-300';
  const bg_appointment_canceled =
    type === AppointmentStatus.CANCELLED ? 'bg-red-400' : null;
  const bg_appointment_completed =
    type === AppointmentStatus.CONPLETED ? 'bg-emerald-400' : null;
  const bg_appointment_pending =
    type === AppointmentStatus.PENDING ? 'bg-orange-300' : null;

  const bg_color =
    bg_admin ||
    bg_editor ||
    bg_clinical ||
    bg_appointment_canceled ||
    bg_appointment_completed ||
    bg_appointment_pending ||
    bg_status;

  return (
    <div
      data-testid="badge-container"
      className={`${bg_color} font-medium rounded-xl text-center text-xs px-3 py-1.5 w-fit`}
    >
      <span className="capitalize">{type}</span>
    </div>
  );
};
