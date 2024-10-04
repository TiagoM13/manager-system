import React from 'react';

import { Input } from '@/components';

interface PatientInfoFormProps {
  loading?: boolean;
}

export const PatientInfoForm: React.FC<PatientInfoFormProps> = ({
  loading,
}) => {
  return (
    <>
      <Input
        name="name"
        label="Nome do paciente"
        placeholder="Digite o nome do paciente"
        disabled={loading}
        required
      />

      <Input
        name="cpf"
        label="CPF"
        placeholder="Digite o CPF do paciente"
        disabled={loading}
      />

      <Input
        name="cns"
        label="CNS (cartão do sus)"
        placeholder="Digite o CNS do paciente"
        disabled={loading}
      />
    </>
  );
};
