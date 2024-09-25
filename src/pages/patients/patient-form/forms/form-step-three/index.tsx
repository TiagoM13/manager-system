import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input, Select } from '@/components';
import { IPatient } from '@/interfaces';

import { conditionsOptions, optionsHealthAgent } from '../../utils/options';

export const FormStepThree: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const {
    control,
    setValue,
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
          type="number"
          name="height"
          label="Altura"
          placeholder="Digite a alura do paciente"
          onChange={(e) => {
            const value = e.target.value ? parseFloat(e.target.value) : null;
            setValue('height', value);
          }}
          control={control}
          error={errors.height}
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
          type="number"
          name="weight"
          label="Peso"
          onChange={(e) => {
            const value = e.target.value ? parseFloat(e.target.value) : null;
            setValue('weight', value);
          }}
          placeholder="Digite o peso do paciente"
          control={control}
          error={errors.weight}
          disabled={loading}
        />
      </div>
    </div>
  );
};
