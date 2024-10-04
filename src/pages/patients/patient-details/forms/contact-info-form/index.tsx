import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input, InputMask } from '@/components';
import { IPatient } from '@/interfaces';
import { formatPhone } from '@/utils';

interface ContactInfoFormProps {
  loading?: boolean;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  loading,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPatient>();

  return (
    <>
      <InputMask
        name="phone"
        label="Telefone"
        mask={formatPhone}
        placeholder="Digite um número de telefone"
        control={control}
        error={errors.phone}
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
        name="address"
        label="Endereço"
        placeholder="Digite o endereço completo"
        control={control}
        error={errors.address}
        disabled={loading}
      />

      <InputMask
        name="contact_emergency"
        label="Telefone de emergência"
        placeholder="Digite um número de telefone"
        mask={formatPhone}
        control={control}
        error={errors.contact_emergency}
        disabled={loading}
      />

      <Input
        name="name_contact_emergency"
        label="Nome do contato de emergência"
        placeholder="Digite o nome do contato de emergência"
        control={control}
        error={errors.name_contact_emergency}
        disabled={loading}
      />
    </>
  );
};
