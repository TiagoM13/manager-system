import React from 'react';

import { Input, Select } from '@/components';

import { maritalStatusOptions, sexOptions } from '../../utils/options';

export const FormStepOne: React.FC = () => {
  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold">
        Preencha as informações do paciente
      </h2>
      <div className="w-full grid grid-cols-2 gap-6 mt-3">
        <Input
          name="name"
          label="Nome do Paciente"
          placeholder="Digite o nome completo do paciente"
          required
        />

        <Input name="cpf" label="CPF" placeholder="Digite o CPF do paciente" />

        <Input
          name="birth_date"
          type="date"
          label="Data de Nascimento"
          required
        />

        <Input
          name="cns"
          label="CNS (cartão do sus)"
          placeholder="Digite o CNS do paciente"
        />

        <Select
          name="sex"
          label="Sexo"
          placeholder="Selecione o sexo"
          options={sexOptions}
          required
        />

        <Select
          name="material_status"
          label="Estado cívil"
          placeholder="Selecione o sexo"
          options={maritalStatusOptions}
        />
        <Input
          name="mother_name"
          label="Nome da Mãe"
          placeholder="Digite o nome da mãe"
        />
        <Input
          name="father_name"
          label="Nome do Pai"
          placeholder="Digite o nome do pai"
        />
        <Input
          name="occupation"
          label="Ocupação"
          placeholder="Digite a profissão"
        />
      </div>
    </div>
  );
};
