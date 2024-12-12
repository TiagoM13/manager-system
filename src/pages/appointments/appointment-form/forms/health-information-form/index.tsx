import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Card, Input, Select } from '@/components';
import {
  healthAgentOptions,
  medicalConditionsOptions,
} from '@/constants/select-options';
import { IPatient } from '@/interfaces';

export const HealthInformationForm: React.FC<{ loading?: boolean }> = ({
  loading,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPatient>();

  return (
    <Card bordered>
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
            options={healthAgentOptions}
            control={control}
            error={errors.health_agent}
            disabled={loading}
          />

          <Input
            type="number"
            name="height"
            label="Altura"
            inputMode="numeric"
            placeholder="Digite a alura do paciente"
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
            options={medicalConditionsOptions}
            disabled={loading}
          />

          <Input
            type="number"
            name="weight"
            label="Peso"
            inputMode="numeric"
            placeholder="Digite o peso do paciente"
            control={control}
            error={errors.weight}
            disabled={loading}
          />
        </div>
      </div>
    </Card>
  );
};
