import React from 'react';

import { CircleNotch, Plus } from '@phosphor-icons/react';

import { Button, Card } from '@/components/_ui';

interface HospitalizationsHistoryProps {
  loading?: boolean;
}

export const HospitalizationsHistory: React.FC<
  HospitalizationsHistoryProps
> = ({ loading }) => {
  return (
    <Card title="Histórico de internações" className="h-full space-y-2 px-6">
      <div className="space-y-2">
        {loading ? (
          <div className="flex min-h-[100px] items-center justify-center">
            <CircleNotch
              weight="bold"
              className="size-8 animate-spin text-sky-600"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center justify-center space-y-2">
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
