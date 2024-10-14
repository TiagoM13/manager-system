import React from 'react';

import { Pagination, Table } from '@/components';
import { IPatient, IResponseMeta } from '@/interfaces';

import { PatientRow } from '../patient-item';
import { SkeletonTablePatients } from '../skeletons';

type IPatientData = {
  patients: IPatient[];
  meta?: IResponseMeta;
};

type PatientTableProps = {
  data?: IPatientData;
  loading?: boolean;
};

export const PatientsTable: React.FC<PatientTableProps> = ({
  data,
  loading,
}) => {
  return (
    <Table.Container>
      <thead>
        <Table.Row>
          <Table.Header>Nome</Table.Header>
          <Table.Header>Data de Nasc.</Table.Header>
          <Table.Header>Idade</Table.Header>
          <Table.Header>Sexo</Table.Header>
          <Table.Header>CPF</Table.Header>
          <Table.Header>CNS</Table.Header>
          <Table.Header>Status</Table.Header>
        </Table.Row>
      </thead>
      <tbody>
        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonTablePatients key={index} />
            ))}
          </>
        ) : (
          <>
            {data?.patients.map((patient, index) => (
              <PatientRow key={index} patient={patient} />
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
              paginationLabel={{ single: 'paciente', several: 'pacientes' }}
            />
          </Table.Cell>
          <Table.Cell className="text-right" colSpan={4}>
            <Pagination.Actions totalPages={data?.meta?.total_pages || 1} />
          </Table.Cell>
        </Table.Row>
      </tfoot>
    </Table.Container>
  );
};
