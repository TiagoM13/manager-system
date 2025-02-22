import React from 'react';

import { InfoItem } from '@/components';
import { Card } from '@/components/_ui';
import { IPatient } from '@/shared/interfaces';

interface HealthInformationDetailsCardProps {
  patient?: IPatient;
  loading?: boolean;
}

export const HealthInformationDetailsCard: React.FC<
  HealthInformationDetailsCardProps
> = ({ patient, loading }) => {
  return (
    <Card bordered>
      <div className="p-2">
        <h2 className="text-xl font-semibold">Informações médicas</h2>

        <div className="mt-3 grid w-full grid-cols-2 gap-6">
          <InfoItem
            label="Altura"
            value={patient?.height ? `${patient.height} cm` : '-'}
            loading={loading}
          />
          <InfoItem
            label="Peso"
            value={patient?.weight ? `${patient.weight} Kg` : '-'}
            loading={loading}
          />
          {/* TO-DO */}
          <InfoItem label="Pressão Arterial" value="80/120" loading={loading} />
          {/* TO-DO */}
          <InfoItem label="Temperatura" value="29º" loading={loading} />
          <InfoItem
            label="Agente de Saúde"
            value={patient?.health_agent}
            loading={loading}
          />
          {/* TO-DO */}
          <InfoItem label="Condições" value="-" />
        </div>
      </div>
    </Card>
  );
};
