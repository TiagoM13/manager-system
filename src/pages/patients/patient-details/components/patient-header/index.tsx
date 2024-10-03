import React from 'react';

import { Avatar, Badge, CustomLoadingSkeleton } from '@/components';
import { IPatient } from '@/interfaces';
import { formatCPF } from '@/utils';

interface PatientHeaderProps {
  patient?: IPatient;
  loading?: boolean;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({
  patient,
  loading,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        name={patient?.name || ''}
        imageUrl={null}
        color="dark"
        loading={loading}
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {loading ? (
            <CustomLoadingSkeleton className="h-4 w-80" />
          ) : (
            <>
              <h3 className="text-xl font-semibold capitalize">
                {patient?.name}
              </h3>
              <Badge type={patient?.status} />
            </>
          )}
        </div>

        <div className="flex gap-8">
          {loading ? (
            <CustomLoadingSkeleton className="h-3" />
          ) : (
            <span className="text-sm leading-tight">
              CPF: {patient?.cpf ? formatCPF(patient.cpf) : '-'}
            </span>
          )}
          {loading ? (
            <CustomLoadingSkeleton className="h-3" />
          ) : (
            <span className="text-sm leading-tight">
              CNS: {patient?.cns ? patient.cns : '-'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
