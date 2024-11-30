import React from 'react';

import { Plus } from '@phosphor-icons/react';

import { Button } from '@/components';

export const NotFoundPatient: React.FC<{ onNavigate: () => void }> = ({
  onNavigate,
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <span className="text-sm">
          Nenhum paciente corresponde à sua pesquisa.
        </span>
        <span className="text-sm">
          Verifique as informações e tente novamente, ou adicione um novo
          paciente.
        </span>
        <Button
          type="button"
          label="adicionar novo paciente"
          icon={<Plus className="size-4" weight="bold" />}
          onClick={onNavigate}
        />
      </div>
    </>
  );
};
