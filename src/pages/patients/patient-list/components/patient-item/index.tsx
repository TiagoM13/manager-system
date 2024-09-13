import React from 'react';
import { Link } from 'react-router-dom';

import { Badge, Table } from '@/components';
import { IPatient } from '@/interfaces';
import { calculateAge, formatCPF, formatDate } from '@/utils';

interface PatientItemProps {
  patient: IPatient;
}

export const PatientRow: React.FC<PatientItemProps> = ({ patient }) => {
  return (
    <Table.Row hoverable>
      <Table.Cell>
        <Link
          to={`/patients/${patient.id}`}
          className="flex flex-col justify-center gap-1 hover:text-sky-500 transition-all"
        >
          <strong>{patient.name}</strong>
          <span className="text-xs text-slate-400 font-medium">
            #{patient.id}
          </span>
        </Link>
      </Table.Cell>
      <Table.Cell>{calculateAge(patient.birth_date)} anos</Table.Cell>
      <Table.Cell>{patient.sex}</Table.Cell>
      <Table.Cell>{formatDate(patient.birth_date)}</Table.Cell>
      <Table.Cell>
        {patient.cpf ? formatCPF(String(patient.cpf)) : '-'}
      </Table.Cell>
      <Table.Cell>{patient.cns ? patient.cns : '-'}</Table.Cell>
      <Table.Cell>
        <Badge type={patient.status} />
      </Table.Cell>
    </Table.Row>
  );
};
