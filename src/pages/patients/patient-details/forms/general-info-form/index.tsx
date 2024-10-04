import React from 'react';

import { Input, Select } from '@/components';
import {
  maritalStatusOptions,
  sexOptions,
} from '@/pages/patients/patient-form/utils/options';

interface GeneralInfoFormProps {
  loading?: boolean;
}

export const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({
  loading,
}) => {
  return (
    <>
      <Select
        name="sex"
        label="Sexo"
        placeholder="Selecione o sexo"
        options={sexOptions}
        disabled={loading}
        required
      />

      <Input
        type="date"
        name="birth_date"
        label="Data de Nascimento"
        disabled={loading}
        required
      />

      <Input
        name="occupation"
        label="Ocupação"
        placeholder="Digite a profissão"
        disabled={loading}
      />

      <Select
        name="material_status"
        label="Estado cívil"
        placeholder="Selecione o sexo"
        options={maritalStatusOptions}
        disabled={loading}
      />

      <Input
        name="mother_name"
        label="Nome da Mãe"
        placeholder="Digite o nome da mãe"
        disabled={loading}
      />

      <Input
        name="father_name"
        label="Nome do Pai"
        placeholder="Digite o nome do pai"
        disabled={loading}
      />
    </>
  );
};
