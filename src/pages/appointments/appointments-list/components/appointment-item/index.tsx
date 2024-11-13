import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Badge, Table } from '@/components';
import { IAppointment } from '@/interfaces';
import { formatDate, formattedTime } from '@/utils';

interface IAppointmentItem {
  appointment: IAppointment;
}

export const AppointmentRow: React.FC<IAppointmentItem> = ({ appointment }) => {
  const location = useLocation();

  return (
    <Table.Row hoverable>
      <Table.Cell>
        <Link
          to={`/appointments/${appointment.patient_id}/appointment/${appointment.id}`}
          state={{ from: location.state }}
          preventScrollReset
          className="flex items-center gap-3 hover:text-sky-500 transition-all"
        >
          <span className="text-sm font-semibold">
            {appointment.patient?.name}
          </span>
        </Link>
      </Table.Cell>
      <Table.Cell>{formatDate(appointment.scheduled_date)}</Table.Cell>
      <Table.Cell>{formattedTime(appointment.scheduled_date)}</Table.Cell>
      <Table.Cell>{appointment.doctor?.name}</Table.Cell>
      <Table.Cell>{appointment.appointment_type}</Table.Cell>
      <Table.Cell>
        <Badge type={appointment.status} />
      </Table.Cell>
    </Table.Row>
  );
};
