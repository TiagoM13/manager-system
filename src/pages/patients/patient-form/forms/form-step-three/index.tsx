import React from 'react';

import { Input, Select } from '@/components';

import { conditionsOptions, pregnantOptions } from '../../utils/options';

export const FormStepThree: React.FC = () => {
  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold">
        Preencha as informações de saúde
      </h2>
      <div className="w-full grid grid-cols-2 gap-6 mt-3">
        <Input
          name="health_agent"
          label="Agente de sáude"
          placeholder="Digite o nome do agente de saúde"
        />

        <Input
          name="weight"
          label="Peso"
          placeholder="Digite o peso do paciente"
        />

        <Select
          name="conditions"
          label="Condições"
          placeholder="Selecione as condições"
          options={conditionsOptions}
        />

        <Input
          name="height"
          label="Altura"
          placeholder="Digite a altura do paciente"
        />

        <Select
          name="pregnant"
          label="Gestante"
          placeholder="Selecione uma opção"
          options={pregnantOptions}
        />
      </div>
    </div>
  );
};
