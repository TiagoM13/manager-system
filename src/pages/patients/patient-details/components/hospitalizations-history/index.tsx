import React from 'react';

import { CircleNotch, Plus } from '@phosphor-icons/react';

import { Button, Card } from '@/components';

interface HospitalizationsHistoryProps {
  loading?: boolean;
}

export const HospitalizationsHistory: React.FC<
  HospitalizationsHistoryProps
> = ({ loading }) => {
  return (
    <Card title="Histórico de internações" className="px-6 space-y-2 h-full">
      <div className="space-y-2">
        {loading ? (
          <div className="flex items-center justify-center min-h-[100px]">
            <CircleNotch
              weight="bold"
              className="text-sky-600 size-8 animate-spin"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col justify-center items-center space-y-2">
              <span className="text-sm">Nenhuma consulta encontrada</span>
            </div>

            <Button
              label="adicionar internação"
              icon={<Plus className="size-4" weight="bold" />}
            />
          </div>
        )}
      </div>
    </Card>
  );
};
