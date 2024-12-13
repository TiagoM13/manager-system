import React from 'react';
import { useFormContext } from 'react-hook-form';

import { CircleNotch, MagnifyingGlass } from '@phosphor-icons/react';

import { Card, Input, InputMask, Button } from '@/components/_ui';
import { useQueryParams } from '@/hooks';
import { formatCPF } from '@/utils';

import { PatientSearchType } from '../../appointment-form.schema';

interface PatientSearchFormProps {
  loading?: boolean;
}

export const PatientSearchForm: React.FC<PatientSearchFormProps> = ({
  loading,
}) => {
  const [_, setQuery] = useQueryParams<PatientSearchType>();

  const handlePatientSearch = React.useCallback(
    ({ name }: PatientSearchType) => {
      if (name !== undefined) {
        setQuery({ name });
      }
      return;
    },
    [setQuery],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<PatientSearchType>();

  const renderIcon = React.useMemo(
    () => (
      <>
        {loading ? (
          <CircleNotch
            data-testid="icon-loading"
            weight="bold"
            color="white"
            className="size-5 animate-spin"
          />
        ) : (
          <MagnifyingGlass className="size-4" weight="bold" />
        )}
      </>
    ),
    [loading],
  );

  return (
    <Card bordered>
      <div className="px-2">
        <h2 className="text-xl font-semibold">
          Buscar paciente para adicionar uma nova consulta
        </h2>
        <div className="mt-3 flex items-end justify-between space-x-4">
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
            mask={formatCPF}
            maxLength={14}
            control={control}
            error={errors.cpf}
            disabled={loading}
          />

          <Input
            name="cns"
            label="CNS (cartão do sus)"
            placeholder="Buscar pelo CNS (cartão do sus)"
            control={control}
            error={errors.cns}
            disabled={loading}
          />

          <Button
            type="button"
            label="buscar"
            icon={renderIcon}
            disabled={loading}
            onClick={handleSubmit(handlePatientSearch)}
          />
        </div>
      </div>
    </Card>
  );
};
