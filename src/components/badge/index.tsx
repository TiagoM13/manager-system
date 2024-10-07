import React from 'react';

import { Role, Status } from '@/enums';

export type BadgeProps = {
  type: Status | Role | undefined;
};

export const Badge: React.FC<BadgeProps> = ({ type }) => {
  const bg_admin = type === Role.ADMIN ? 'bg-purple-500' : null;
  const bg_editor = type === Role.EDITOR ? 'bg-blue-500' : null;
  const bg_clinical = type === Role.CLINICAL ? 'bg-cyan-500' : null;
  const bg_status = type === Status.ACTIVE ? 'bg-emerald-400' : 'bg-slate-300';

  const bg_color = bg_admin || bg_editor || bg_clinical || bg_status;
  const is_status = type === Status.ACTIVE || type === Status.INACTIVE;

  const admin = type === Role.ADMIN ? 'administrador' : '';
  const editor = type === Role.EDITOR ? 'editor' : '';
  const clinical = type === Role.CLINICAL ? 'clínico' : '';

  const typeLabel = admin || editor || clinical || type;

  return (
    <div
      data-testid="badge-container"
      className={`${bg_color} ${is_status ? 'text-black' : 'text-white'} font-medium rounded-xl text-center text-xs px-3 py-1.5 w-fit`}
    >
      <span className="capitalize">{typeLabel}</span>
    </div>
  );
};
