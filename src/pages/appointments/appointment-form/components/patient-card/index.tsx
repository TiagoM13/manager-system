import React from 'react';

import { Button } from '@/components/_ui';
import { useAppNavigation } from '@/shared/hooks';
import { IPatient } from '@/shared/interfaces';
import { formatCPF, formatDate } from '@/shared/utils';

interface PatientCardProps {
  patient: IPatient;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const { navigateTo } = useAppNavigation();

  return (
    <div className="flex items-center justify-between rounded-lg bg-zinc-200 px-4 py-3">
      <div className="flex flex-col space-y-1 text-sm text-zinc-900">
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
