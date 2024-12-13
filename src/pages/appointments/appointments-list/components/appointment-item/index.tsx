import React from 'react';

import { Badge, Button, Table, StatusActionIcon } from '@/components/_ui';
import { IAppointment } from '@/interfaces';
import { formatDate, formattedTime } from '@/utils';

interface IAppointmentItem {
  appointment: IAppointment;
  onEdit: (data: IAppointment) => void;
}

export const AppointmentRow: React.FC<IAppointmentItem> = ({
  appointment,
  onEdit,
}) => {
  return (
    <Table.Row hoverable>
      <Table.Cell>
        <span className="text-sm font-semibold">
          {appointment.patient?.name}
        </span>
      </Table.Cell>
      <Table.Cell>{formatDate(appointment.scheduled_date)}</Table.Cell>
      <Table.Cell>{formattedTime(appointment.scheduled_date)}</Table.Cell>
      <Table.Cell>{appointment.doctor?.name}</Table.Cell>
      <Table.Cell>{appointment.appointment_type}</Table.Cell>
      <Table.Cell>
        <Badge type={appointment.status} />
      </Table.Cell>
      <Table.Cell>
        <Button
          clear
          icon={<StatusActionIcon status={appointment.status} />}
          className="p-1.5"
          onClick={() => onEdit(appointment)}
        />
      </Table.Cell>
    </Table.Row>
  );
};
