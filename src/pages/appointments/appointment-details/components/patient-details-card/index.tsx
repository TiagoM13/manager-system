import React from 'react';

import { InfoItem } from '@/components';
import { Card } from '@/components/_ui';
import { IPatient } from '@/interfaces';
import { formatDate, formatPhone } from '@/utils';

interface PatientDetailsCardProps {
  patient: IPatient | undefined;
  loading?: boolean;
}

export const PatientDetailsCard: React.FC<PatientDetailsCardProps> = ({
  patient,
  loading,
}) => {
  return (
    <Card bordered>
      <div className="p-2">
        <h2 className="text-xl font-semibold">Informações do paciente</h2>

        <div className="mt-3 grid w-full grid-cols-2 gap-6">
          <InfoItem
            loading={loading}
            label="Data de Nascimento"
            value={formatDate(patient?.birth_date as Date)}
          />
          <InfoItem loading={loading} label="Sexo" value={patient?.sex} />
          <InfoItem
            loading={loading}
            label="Nome da Mãe"
            value={patient?.mother_name}
          />
          <InfoItem
            loading={loading}
            label="Nome do Pai"
            value={patient?.father_name}
          />
          <InfoItem
            loading={loading}
            label="Endereço"
            value={patient?.address}
          />
          <InfoItem
            loading={loading}
            label="Telefone"
            value={patient?.phone && formatPhone(patient?.phone as string)}
          />
          <InfoItem
            loading={loading}
            label="Ocupação"
            value={patient?.occupation}
          />
          <InfoItem
            loading={loading}
            label="Estado Civil"
            value={patient?.material_status}
          />
        </div>
      </div>
    </Card>
  );
};
