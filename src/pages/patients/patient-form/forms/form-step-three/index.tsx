import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input, Select } from '@/components';
import { IPatient } from '@/interfaces';

import { conditionsOptions, optionsHealthAgent } from '../../utils/options';

export const FormStepThree: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPatient>();

  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold">
        Preencha as informações de saúde
      </h2>
      <div className="w-full grid grid-cols-2 gap-6 mt-3">
        <Select
          name="health_agent"
          label="Agente de sáude"
          placeholder="Selecione o agent de sáude"
          labelAs="label"
          valueAs="value"
          options={optionsHealthAgent}
          control={control}
          error={errors.health_agent}
          disabled={loading}
        />

        <Input
          name="height"
          label="Altura"
          placeholder="Digite a alura do paciente"
          disabled={loading}
        />

        <Select
          name="conditions"
          label="Condições"
          placeholder="Selecione as condições"
          labelAs="label"
          valueAs="value"
          options={conditionsOptions}
          disabled={loading}
        />

        <Input
          name="weight"
          label="Peso"
          placeholder="Digite o peso do paciente"
          disabled={loading}
        />
      </div>
    </div>
  );
};
