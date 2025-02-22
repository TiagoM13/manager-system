import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input, Select } from '@/components/_ui';
import {
  genderOptions,
  maritalStatusOptions,
} from '@/shared/constants/select-options';
import { IPatient } from '@/shared/interfaces';

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
        options={genderOptions}
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
        name="marital_status"
        label="Estado cívil"
        placeholder="Selecione o estado civil"
        options={maritalStatusOptions}
        valueAs="value"
        labelAs="label"
        control={control}
        error={errors.marital_status}
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
