import React from 'react';

import { Input } from '@/components';

export const FormStepTwo: React.FC = () => {
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
        />

        <Input name="email" label="E-mail" placeholder="Digite um email" />

        <Input
          name="phone"
          label="Telefone"
          placeholder="Digite um número de telefone"
        />

        <Input
          name="phone_contact_emergency"
          label="Telefone de emergência"
          placeholder="Digite um número de telefone"
        />

        <Input
          name="name_contact_emergency"
          label="Nome do contato de emergência"
          placeholder="Digite o nome do contato de emergência"
        />
      </div>
    </div>
  );
};
