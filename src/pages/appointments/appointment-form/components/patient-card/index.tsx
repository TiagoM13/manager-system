import React from 'react';

import { Button } from '@/components';
import { useAppNavigation } from '@/hooks';
import { IPatient } from '@/interfaces';
import { formatCPF, formatDate } from '@/utils';

interface PatientCardProps {
  patient: IPatient;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const { navigateTo } = useAppNavigation();

  return (
    <div className="flex items-center justify-between bg-zinc-200 rounded-lg py-3 px-4">
      <div className="flex flex-col text-sm text-zinc-900 font-medium space-y-1">
        <span>
          <strong>Nome: </strong>
          {patient.name}
        </span>
        <span>
          <strong>Data de Nasc: </strong>
          {formatDate(patient.birth_date)}
        </span>
        <span>
          <strong>CPF: </strong>
          {formatCPF(patient.cpf ?? '-')}
        </span>
        <span>
          <strong>CNS: </strong>
          {patient.cns ?? '-'}
        </span>
      </div>

      <Button
        type="button"
        label="adicionar consulta"
        className="text-xs"
        onClick={() => navigateTo({ route: `/appointments/${patient.id}` })}
      />
    </div>
  );
};
