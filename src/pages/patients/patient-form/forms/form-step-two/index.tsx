import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components';
import { IPatient } from '@/interfaces';

export const FormStepTwo: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPatient>();

  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold">
        Preencha as informações de contato
      </h2>
      <div className="w-full grid grid-cols-2 gap-6 mt-3">
        <Input
          name="address"
          label="Endereço"
          placeholder="Digite o endereço completo"
          control={control}
          error={errors.address}
          disabled={loading}
        />

        <Input
          name="email"
          type="email"
          label="E-mail"
          placeholder="Digite um email"
          control={control}
          error={errors.email}
          disabled={loading}
        />

        <Input
          name="phone"
          label="Telefone"
          placeholder="Digite um número de telefone"
          control={control}
          error={errors.phone}
          disabled={loading}
        />

        <Input
          name="phone_contact_emergency"
          label="Telefone de emergência"
          placeholder="Digite um número de telefone"
          disabled={loading}
        />

        <Input
          name="name_contact_emergency"
          label="Nome do contato de emergência"
          placeholder="Digite o nome do contato de emergência"
          disabled={loading}
        />
      </div>
    </div>
  );
};
