import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input, Select } from '@/components';
import {
  healthAgentOptions,
  medicalConditionsOptions,
} from '@/constants/select-options';
import { IPatient } from '@/interfaces';

interface MedicalInfoFormProps {
  loading?: boolean;
}

export const MedicalInfoForm: React.FC<MedicalInfoFormProps> = ({
  loading,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPatient>();

  return (
    <>
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

      <Select
        name="conditions"
        label="Condições"
        placeholder="Selecione as condições"
        labelAs="label"
        valueAs="value"
        options={medicalConditionsOptions}
        disabled={loading}
      />
    </>
  );
};
