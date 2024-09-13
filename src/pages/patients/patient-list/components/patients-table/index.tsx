import React from 'react';

import { patient } from '@/__mocks__/patient';
import { Table } from '@/components';
import { IPatient, IResponseMeta } from '@/interfaces';

import { PatientRow } from '../patient-item';

type IPatientsData = {
  users: IPatient[];
  meta?: IResponseMeta;
};

type PatientTableProps = {
  data?: IPatientsData;
  loading?: boolean;
};

export const PatientsTable: React.FC<PatientTableProps> = () => {
  const patients = Array.from({ length: 10 }).map(() => patient);

  return (
    <Table.Container>
      <thead>
        <Table.Row>
          <Table.Header>Nome/ID</Table.Header>
          <Table.Header>Idade</Table.Header>
          <Table.Header>Sexo</Table.Header>
          <Table.Header>Data de Nasc.</Table.Header>
          <Table.Header>CPF</Table.Header>
          <Table.Header>CNS</Table.Header>
          <Table.Header>Status</Table.Header>
        </Table.Row>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <PatientRow key={index} patient={patient} />
        ))}
      </tbody>
    </Table.Container>
  );
};
