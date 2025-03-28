import React from 'react';

import { MagnifyingGlass } from '@phosphor-icons/react';

import { Button, Card, Input, InputMask } from '@/components/_ui';

import { usePatientSearchFormModel } from './patient-search-form.model';

type PatientSearchFormViewProps = ReturnType<
  typeof usePatientSearchFormModel
> & {
  loading?: boolean;
};

export const PatientSearchFormView: React.FC<PatientSearchFormViewProps> = ({
  onSearch,
  control,
  errors,
  loading,
}) => {
  return (
    <Card bordered>
      <div className="px-2">
        <h2 className="text-xl font-semibold">
          Buscar paciente para adicionar uma nova consulta
        </h2>
        <div className="mt-3 flex items-end justify-between space-x-4">
          <div className="flex w-full items-baseline justify-between space-x-4">
            <Input
              name="name"
              label="Nome do Paciente"
              placeholder="Buscar pelo nome do paciente"
              control={control}
              error={errors.name}
              disabled={loading}
            />

            <InputMask
              name="cpf"
              label="CPF"
              placeholder="Buscar pelo CPF"
              mask="cpf"
              control={control}
              error={errors.cpf}
              disabled={loading}
            />

            <InputMask
              name="cns"
              label="CNS (cartão do sus)"
              placeholder="Buscar pelo CNS (cartão do sus)"
              mask="cns"
              control={control}
              error={errors.cns}
              disabled={loading}
            />
          </div>

          <Button
            type="button"
            label="buscar"
            onClick={onSearch}
            icon={<MagnifyingGlass className="size-4" weight="bold" />}
            loading={loading}
            disabled={loading}
          />
        </div>
      </div>
    </Card>
  );
};
