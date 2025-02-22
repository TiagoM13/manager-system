import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input, InputMask, Select } from '@/components/_ui';
import {
  maritalStatusOptions,
  genderOptions,
} from '@/shared/constants/select-options';
import { IPatient } from '@/shared/interfaces';

export const FormStepOne: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPatient>();

  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold">
        Preencha as informações do paciente
      </h2>
      <div className="mt-3 grid w-full grid-cols-2 gap-6">
        <Input
          name="name"
          control={control}
          label="Nome do Paciente"
          placeholder="Digite o nome completo do paciente"
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

        <Input
          type="date"
          name="birth_date"
          label="Data de Nascimento"
          control={control}
          error={errors.birth_date}
          disabled={loading}
          required
        />

        <InputMask
          name="cns"
          label="CNS (cartão do sus)"
          placeholder="Digite o CNS do paciente"
          mask="cns"
          control={control}
          error={errors.cns}
          disabled={loading}
        />

        <Select
          name="sex"
          label="Sexo"
          placeholder="Selecione o sexo"
          control={control}
          options={genderOptions}
          error={errors.sex}
          disabled={loading}
          required
        />

        <Select
          name="marital_status"
          label="Estado cívil"
          placeholder="Selecione o estado civil"
          control={control}
          options={maritalStatusOptions}
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
        <Input
          name="occupation"
          label="Ocupação"
          placeholder="Digite a profissão"
          control={control}
          error={errors.occupation}
          disabled={loading}
        />
      </div>
    </div>
  );
};
