import React from 'react';

import { Badge } from '@/components';
import { AppointmentStatus } from '@/enums';
import { IAppointment } from '@/interfaces';
import { formatAppointmentDate } from '@/utils';

interface AppointmentInfoCardProps {
  appointment: IAppointment;
}

export const AppointmentInfoCard: React.FC<AppointmentInfoCardProps> = ({
  appointment,
}) => {
  return (
    <div className="w-full bg-slate-200 flex justify-between items-center rounded-xl py-2.5 px-4">
      <div className="space-y-1">
        <span className="text-sm text-slate-600 font-medium">
          {appointment.appointment_type}
        </span>
        <h4 className="text-sm font-semibold">Sheron Sttephany</h4>
        <span className="text-sm leading-3">
          {formatAppointmentDate(
            appointment.scheduled_date,
            appointment.created_at as Date,
          )}
        </span>
      </div>

      <Badge type={AppointmentStatus.CONPLETED} />
    </div>
  );
};
