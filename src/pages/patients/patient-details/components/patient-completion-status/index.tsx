import React from 'react';

import { CustomLoadingSkeleton } from '@/components';
import { IPatient } from '@/interfaces';
import { formatDateTime } from '@/utils';

import { calculateCompletionPercentage } from '../../utils/percentage';

import { EditButton } from '..';

interface PatientCompletionStatusProps {
  patient?: IPatient;
  loading?: boolean;
}

export const PatientCompletionStatus: React.FC<
  PatientCompletionStatusProps
> = ({ patient, loading }) => {
  const completionPercentage = React.useMemo(
    () => (patient ? calculateCompletionPercentage(patient) : '0'),
    [patient],
  );

  const isMinimumCompleted = Number(completionPercentage) < 50;

  return (
    <div className="flex flex-col items-end gap-[20px]">
      <div className="flex items-center gap-2">
        {loading ? (
          <CustomLoadingSkeleton className="h-2 w-64" />
        ) : (
          <span className="block text-xs text-slate-600">
            última atualização em{' '}
            <strong>{formatDateTime(patient?.updated_at as Date)}</strong>
          </span>
        )}

        {!loading && <EditButton />}
      </div>

      <span className="block text-xs">
        Informações preenchidas:{' '}
        <strong
          className={`${isMinimumCompleted ? 'text-red-600' : 'text-sky-600'}`}
        >
          {loading ? '0%' : `${completionPercentage}%`}
        </strong>
      </span>
    </div>
  );
};
