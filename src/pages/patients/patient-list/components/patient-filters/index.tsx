import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormContainer, InputSearch } from '@/components';
import { useQueryParams } from '@/hooks';
import { IPatientFilters } from '@/interfaces';

type PatientFiltersProps = {
  loading?: boolean;
};

export const PatientFilters: React.FC<PatientFiltersProps> = ({ loading }) => {
  const { control, handleSubmit } = useFormContext<IPatientFilters>();
  const [_, setQuery] = useQueryParams<IPatientFilters>();

  const handleFilterPatients = React.useCallback(
    ({ name }: IPatientFilters) => {
      if (name !== undefined) {
        setQuery({ name, page: 1 });
      }
      return;
    },
    [setQuery],
  );

  return (
    <FormContainer onSubmit={handleSubmit(handleFilterPatients)}>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5">
          <InputSearch
            name="name"
            control={control}
            placeholder="Pesquisar paciente"
            disabled={loading}
          />
        </div>
      </div>
    </FormContainer>
  );
};
