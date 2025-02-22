import React from 'react';

import { Badge } from '@/components/_ui';
import { APPOINTMENT_TYPE_LABELS } from '@/shared/constants/labels';
import { IAppointment } from '@/shared/interfaces';
import { formatAppointmentDate } from '@/shared/utils';

interface AppointmentInfoCardProps {
  appointment: IAppointment;
}

export const AppointmentInfoCard: React.FC<AppointmentInfoCardProps> = ({
  appointment,
}) => {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-slate-200 px-4 py-2.5">
      <div className="space-y-1">
        <span className="text-sm font-medium text-slate-600">
          {APPOINTMENT_TYPE_LABELS[appointment.appointment_type]}
        </span>
        <h4 className="text-sm font-semibold">{appointment.doctor?.name}</h4>
        <span className="text-sm leading-3">
          {formatAppointmentDate(appointment.scheduled_date)}
        </span>
      </div>

      <Badge type={appointment.status} />
    </div>
  );
};
