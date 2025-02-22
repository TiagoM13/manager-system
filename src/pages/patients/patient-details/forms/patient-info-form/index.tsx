import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input, InputMask } from '@/components/_ui';
import { IPatient } from '@/shared/interfaces';

interface PatientInfoFormProps {
  loading?: boolean;
}

export const PatientInfoForm: React.FC<PatientInfoFormProps> = ({
  loading,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPatient>();

  return (
    <>
      <Input
        name="name"
        label="Nome do paciente"
        placeholder="Digite o nome do paciente"
        control={control}
        error={errors.name}
        disabled={loading}
        required
      />

      <InputMask
        name="cpf"
        label="CPF"
        mask="cpf"
        placeholder="Digite o CPF do paciente"
        control={control}
        error={errors.cpf}
        disabled={loading}
      />

      <InputMask
        name="cns"
        mask="cns"
        label="CNS (cartão do sus)"
        placeholder="Digite o CNS do paciente"
        control={control}
        error={errors.cns}
        disabled={loading}
      />
    </>
  );
};
