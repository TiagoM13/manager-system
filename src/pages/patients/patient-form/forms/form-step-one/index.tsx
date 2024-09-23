import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input, Select } from '@/components';
import { IPatient } from '@/interfaces';
import { formatCPF } from '@/utils';

import { maritalStatusOptions, sexOptions } from '../../utils/options';

export const FormStepOne: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<IPatient>();

  const handleCPFChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedCPF = formatCPF(e.target.value);
      setValue('cpf', formattedCPF);
    },
    [setValue],
  );

  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold">
        Preencha as informações do paciente
      </h2>
      <div className="w-full grid grid-cols-2 gap-6 mt-3">
        <Input
          name="name"
          control={control}
          label="Nome do Paciente"
          placeholder="Digite o nome completo do paciente"
          error={errors.name}
          disabled={loading}
          required
        />

        <Input
          name="cpf"
          label="CPF"
          placeholder="Digite o CPF do paciente"
          control={control}
          maxLength={14}
          onChange={handleCPFChange}
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

        <Input
          name="cns"
          label="CNS (cartão do sus)"
          placeholder="Digite o CNS do paciente"
          control={control}
          error={errors.cns}
          disabled={loading}
        />

        <Select
          name="sex"
          label="Sexo"
          placeholder="Selecione o sexo"
          control={control}
          options={sexOptions}
          error={errors.sex}
          disabled={loading}
          required
        />

        <Select
          name="material_status"
          label="Estado cívil"
          placeholder="Selecione o sexo"
          control={control}
          options={maritalStatusOptions}
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
