import React from 'react';

import { Input, InputMask } from '@/components';
import { formatPhone } from '@/utils';

interface ContactInfoFormProps {
  loading?: boolean;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  loading,
}) => {
  return (
    <>
      <InputMask
        name="phone"
        label="Telefone"
        mask={formatPhone}
        placeholder="Digite um número de telefone"
        disabled={loading}
      />

      <Input
        name="email"
        type="email"
        label="E-mail"
        placeholder="Digite um email"
        disabled={loading}
      />

      <Input
        name="address"
        label="Endereço"
        placeholder="Digite o endereço completo"
        disabled={loading}
      />

      <InputMask
        name="contact_emergency"
        label="Telefone de emergência"
        placeholder="Digite um número de telefone"
        mask={formatPhone}
        disabled={loading}
      />

      <Input
        name="name_contact_emergency"
        label="Nome do contato de emergência"
        placeholder="Digite o nome do contato de emergência"
        disabled={loading}
      />
    </>
  );
};
