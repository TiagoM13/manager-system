import React from 'react';

import { Input, Select } from '@/components';
import {
  optionsHealthAgent,
  conditionsOptions,
} from '@/pages/patients/patient-form/utils/options';

interface MedicalInfoFormProps {
  loading?: boolean;
}

export const MedicalInfoForm: React.FC<MedicalInfoFormProps> = ({
  loading,
}) => {
  return (
    <>
      <Input
        type="number"
        name="height"
        label="Altura"
        inputMode="numeric"
        placeholder="Digite a alura do paciente"
        disabled={loading}
      />

      <Input
        type="number"
        name="weight"
        label="Peso"
        inputMode="numeric"
        placeholder="Digite o peso do paciente"
        disabled={loading}
      />

      <Select
        name="health_agent"
        label="Agente de sáude"
        placeholder="Selecione o agent de sáude"
        labelAs="label"
        valueAs="value"
        options={optionsHealthAgent}
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
    </>
  );
};
