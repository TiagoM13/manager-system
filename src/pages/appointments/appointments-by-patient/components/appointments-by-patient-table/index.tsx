import React from 'react';

import { Pagination, Table } from '@/components/_ui';
import { IAppointment, IResponseMeta } from '@/interfaces';

import { AppointmentsByPatientRow } from '../appointments-by-patient-item';
import { SkeletonTableAppintmentsByPatient } from '../skeletons';

type IAppointmentData = {
  appointments: IAppointment[];
  meta?: IResponseMeta;
};

type AppointmentTableProps = {
  data?: IAppointmentData;
  loading?: boolean;
  onEdit: (data: IAppointment) => void;
};

export const AppointmentsByPatientTable: React.FC<AppointmentTableProps> = ({
  data,
  loading,
  onEdit,
}) => {
  return (
    <Table.Container>
      <thead>
        <Table.Row>
          <Table.Header>Data da consulta</Table.Header>
          <Table.Header>Hora</Table.Header>
          <Table.Header>Médico</Table.Header>
          <Table.Header>Tipo de atendimento</Table.Header>
          <Table.Header>Status</Table.Header>
        </Table.Row>
      </thead>
      <tbody>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonTableAppintmentsByPatient key={index} />
          ))
        ) : (
          <>
            {data?.appointments?.map((appointment) => (
              <AppointmentsByPatientRow
                key={appointment.id}
                appointment={appointment}
                onEdit={onEdit}
              />
            ))}
          </>
        )}
      </tbody>
      <tfoot>
        <Table.Row border={false}>
          <Table.Cell colSpan={3}>
            <Pagination.Label
              currentPageData={data?.meta?.total_current_records || 0}
              totalItems={data?.meta?.total_records || 0}
              paginationLabel={{ single: 'consulta', several: 'consultas' }}
            />
          </Table.Cell>
          <Table.Cell className="text-right" colSpan={3}>
            <Pagination.Actions totalPages={data?.meta?.total_pages || 1} />
          </Table.Cell>
        </Table.Row>
      </tfoot>
    </Table.Container>
  );
};
