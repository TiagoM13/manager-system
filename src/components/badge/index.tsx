import React from 'react';

import { Status, UserTypes } from '@/enums';

type BadgeProps = {
  type: Status | UserTypes
}

export const Badge: React.FC<BadgeProps> = ({ type }) => {
  const bg_admin = type === UserTypes.ADMIN ? 'bg-purple-500' : null
  const bg_editor = type === UserTypes.EDITOR ? 'bg-blue-500' : null
  const bg_clinical = type === UserTypes.CLINICAL ? 'bg-cyan-500' : null
  const bg_no_type = type === UserTypes.NO_TYPE ? 'bg-slate-600' : null
  const bg_status = type === Status.ACTIVE ? 'bg-emerald-400' : 'bg-slate-300'

  const bg_color = bg_admin || bg_editor || bg_clinical || bg_no_type || bg_status
  const is_status = type === Status.ACTIVE || type === Status.INACTIVE

  return (
    <div className={`${bg_color} ${is_status ? 'font-normal' : 'text-white font-medium'} rounded-xl text-center text-xs px-3 py-1.5 w-fit`}>
      <span className="capitalize">{type}</span>
    </div>
  );
}

