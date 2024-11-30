import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Card, Input, InputMask, Select } from '@/components';
import { IPatient } from '@/interfaces';
import { maritalStatusOptions } from '@/pages/patients/utils/options';
import { formatCPF } from '@/utils';

export const PatientForm: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPatient>();

  return (
    <Card bordered>
      <div className="p-2">
        <h2 className="text-xl font-semibold">
          Preencha as informações do paciente
        </h2>
        <div className="w-full grid grid-cols-2 gap-6 mt-3">
          <InputMask
            name="cpf"
            label="CPF"
            placeholder="Digite o CPF do paciente"
            mask={formatCPF}
            control={control}
            maxLength={14}
            error={errors.cpf}
            disabled={loading}
          />

          <Input
            name="cns"
            label="CNS (cartão do sus)"
            placeholder="Digite o CNS do paciente"
            maxLength={15}
            control={control}
            error={errors.cns}
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
            name="occupation"
            label="Ocupação"
            placeholder="Digite a profissão"
            control={control}
            error={errors.occupation}
            disabled={loading}
          />
        </div>
      </div>
    </Card>
  );
};
