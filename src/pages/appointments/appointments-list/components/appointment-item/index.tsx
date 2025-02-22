import React from 'react';

import { Badge, Button, Table, StatusActionIcon } from '@/components/_ui';
import { APPOINTMENT_TYPE_LABELS } from '@/shared/constants/labels';
import { IAppointment } from '@/shared/interfaces';
import { formatDate, formattedTime } from '@/shared/utils';

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
        <span className="block text-sm font-semibold">
          {appointment.patient?.name}
        </span>
      </Table.Cell>
      <Table.Cell>{formatDate(appointment.scheduled_date)}</Table.Cell>
      <Table.Cell>{formattedTime(appointment.scheduled_date)}</Table.Cell>
      <Table.Cell>{appointment.doctor?.name}</Table.Cell>
      <Table.Cell>
        {APPOINTMENT_TYPE_LABELS[appointment.appointment_type]}
      </Table.Cell>
      <Table.Cell>
        <Badge type={appointment.status} />
      </Table.Cell>
      <Table.Cell style={{ width: 50 }}>
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
