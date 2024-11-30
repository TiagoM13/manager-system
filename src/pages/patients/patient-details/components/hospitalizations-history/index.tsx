import React from 'react';

import { Plus } from '@phosphor-icons/react';

import { Button, Card } from '@/components';

export const HospitalizationsHistory: React.FC = () => {
  return (
    <Card title="Histórico de internações" className="px-6 space-y-4 h-full">
      <div className="flex flex-col justify-center items-center space-y-2">
        <span className="text-sm">Nenhuma internação encontrada</span>

        <Button
          label="adicionar internação"
          icon={<Plus className="size-4" weight="bold" />}
        />
      </div>
    </Card>
  );
};
