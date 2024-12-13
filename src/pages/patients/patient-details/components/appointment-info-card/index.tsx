import React from 'react';

import { Badge } from '@/components/_ui';
import { IAppointment } from '@/interfaces';
import { formatAppointmentDate } from '@/utils';

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
          {appointment.appointment_type}
        </span>
        <h4 className="text-sm font-semibold">Sheron Sttephany</h4>
        <span className="text-sm leading-3">
          {formatAppointmentDate(appointment.scheduled_date)}
        </span>
      </div>

      <Badge type={appointment.status} />
    </div>
  );
};
