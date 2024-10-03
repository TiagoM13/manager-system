import React, { ReactNode } from 'react';

interface InfoItemProps {
  label: string;
  value?: string | number | null;
  children?: ReactNode;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  children,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold text-sm text-slate-400">{label}</span>

      <span className="text-sm">{value !== null ? value : '-'}</span>

      {children}
    </div>
  );
};
