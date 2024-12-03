import React from 'react';

import { Eye, Eyes, PencilSimple } from '@phosphor-icons/react';

import { Badge, Button, Table } from '@/components';
import { AppointmentStatus } from '@/enums';
import { IAppointment } from '@/interfaces';
import { formatDate, formattedTime } from '@/utils';

interface IAppointmentItem {
  appointment: IAppointment;
  onEdit: (data: IAppointment) => void;
}

export const AppointmentsByPatientRow: React.FC<IAppointmentItem> = ({
  appointment,
  onEdit,
}) => {
  const renderIcon = React.useMemo(
    () => (
      <>
        {appointment.status === AppointmentStatus.PENDING ? (
          <PencilSimple className="size-4 text-sky-600" weight="bold" />
        ) : (
          <Eye className="size-4 text-sky-600" weight="bold" />
        )}
      </>
    ),
    [appointment.status],
  );

  return (
    <Table.Row hoverable>
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
          icon={renderIcon}
          className="p-1.5"
          onClick={() => onEdit(appointment)}
        />
      </Table.Cell>
    </Table.Row>
  );
};
