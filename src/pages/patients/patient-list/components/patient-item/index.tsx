import React from 'react';
import { Link } from 'react-router-dom';

import { Eye } from '@phosphor-icons/react';

import { Badge, Button, Table } from '@/components';
import { IPatient } from '@/interfaces';
import { calculateAge, formatCPF, formatDate } from '@/utils';

import { Card, Text } from './styles';

interface PatientItemProps {
  patient: IPatient;
  onEdit?: (data: IPatient) => void;
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

export const PatientCard: React.FC<PatientItemProps> = ({
  patient,
  onEdit,
}) => {
  const handleEditPatient = (patient: IPatient) => {
    if (onEdit) {
      onEdit(patient);
    }

    return;
  };

  return (
    <Card>
      <div>
        <Text>
          <strong>Nome:</strong>
          <span>{patient.name}</span>
        </Text>
        <Text>
          <strong>Idade:</strong>
          <span>{calculateAge(patient.birth_date)} anos</span>
        </Text>
        <Text>
          <strong>Sexo:</strong>
          <span>{patient.sex}</span>
        </Text>
        <Text>
          <strong>Data de Nasc.:</strong>
          <span>{formatDate(patient.birth_date)}</span>
        </Text>
        <Text>
          <strong>CPF:</strong>
          <span>{patient.cpf ? formatCPF(String(patient.cpf)) : '-'}</span>
        </Text>
        <Text>
          <strong>CNS:</strong>
          <span>{patient.cns ? patient.cns : '-'}</span>
        </Text>
        <Text>
          <strong>Status:</strong>
          <Badge type={patient.status} />
        </Text>
      </div>

      <div>
        <Button
          label="visualizar"
          icon={<Eye className="size-4" weight="bold" />}
          onClick={() => handleEditPatient(patient)}
        />
      </div>
    </Card>
  );
};
