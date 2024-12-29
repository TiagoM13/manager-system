import React from 'react';

import { MagnifyingGlass } from '@phosphor-icons/react';

import { Button, FormContainer, Input, InputMask } from '@/components/_ui';
import { formatCPF } from '@/utils';

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
      <div className="flex items-end justify-between space-x-4">
        <div className="flex w-full items-baseline justify-between space-x-4">
          <Input
            name="name"
            placeholder="Buscar pelo nome do paciente"
            control={control}
            error={errors.name}
            disabled={loading}
          />

          <InputMask
            name="cpf"
            placeholder="Buscar pelo CPF"
            mask={formatCPF}
            maxLength={14}
            control={control}
            error={errors.cpf}
            disabled={loading}
          />

          <Input
            name="cns"
            placeholder="Buscar pelo CNS (cartão do sus)"
            maxLength={15}
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
    </FormContainer>
  );
};
