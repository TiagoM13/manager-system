import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input, Select } from '@/components';
import { IPatient } from '@/interfaces';
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
  const {
    control,
    formState: { errors },
  } = useFormContext<IPatient>();

  return (
    <>
      <Select
        name="sex"
        label="Sexo"
        placeholder="Selecione o sexo"
        options={sexOptions}
        control={control}
        error={errors.sex}
        disabled={loading}
        required
      />

      <Input
        type="date"
        name="birth_date"
        label="Data de Nascimento"
        control={control}
        error={errors.birth_date}
        disabled={loading}
        required
      />

      <Input
        name="occupation"
        label="Ocupação"
        placeholder="Digite a profissão"
        control={control}
        error={errors.occupation}
        disabled={loading}
      />

      <Select
        name="material_status"
        label="Estado cívil"
        placeholder="Selecione o sexo"
        options={maritalStatusOptions}
        valueAs="value"
        labelAs="label"
        control={control}
        error={errors.material_status}
        disabled={loading}
      />

      <Input
        name="mother_name"
        label="Nome da Mãe"
        placeholder="Digite o nome da mãe"
        control={control}
        error={errors.mother_name}
        disabled={loading}
      />

      <Input
        name="father_name"
        label="Nome do Pai"
        placeholder="Digite o nome do pai"
        control={control}
        error={errors.father_name}
        disabled={loading}
      />
    </>
  );
};
