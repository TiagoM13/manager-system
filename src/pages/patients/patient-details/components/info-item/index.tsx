import React, { ReactNode } from 'react';

import { CustomLoadingSkeleton } from '@/components';

interface InfoItemProps {
  label: string;
  value?: ReactNode;
  loading?: boolean;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  loading,
}) => {
  const hasValue = value !== undefined && value !== null && value !== '';

  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold text-sm text-slate-400">{label}</span>

      {loading ? (
        <CustomLoadingSkeleton className="h-3 w-full max-w-44" />
      ) : (
        <span className="text-sm">{hasValue ? value : '-'}</span>
      )}
    </div>
  );
};
