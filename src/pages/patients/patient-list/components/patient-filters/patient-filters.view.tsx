import React from 'react';

import { MagnifyingGlass } from '@phosphor-icons/react';

import { Button, FormContainer, Input, InputMask } from '@/components/_ui';
import { formatCPF } from '@/shared/utils';

import { usePatientFiltersModel } from './patient-filters.model';

type PatientFiltersViewProps = ReturnType<typeof usePatientFiltersModel> & {
  loading?: boolean;
};

export const PatientFiltersView: React.FC<PatientFiltersViewProps> = ({
  control,
  loading,
  onSearch,
  errors,
}) => {
  return (
    <FormContainer>
      <div className="flex justify-between space-x-4">
        <div className="flex w-full items-baseline justify-between space-x-4">
          <Input
            name="name"
            label="Nome do paciente"
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

        <div className="flex items-end">
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
    </FormContainer>
  );
};
