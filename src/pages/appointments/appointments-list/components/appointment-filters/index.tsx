import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormContainer, InputSearch } from '@/components';
import { useQueryParams } from '@/hooks';
import { IAppointmentFilters } from '@/interfaces';

type AppointmentFiltersProps = {
  loading?: boolean;
};

export const AppointmentFilters: React.FC<AppointmentFiltersProps> = ({
  loading,
}) => {
  const { control, handleSubmit } = useFormContext<IAppointmentFilters>();
  const [_, setQuery] = useQueryParams<IAppointmentFilters>();

  const handleFilterAppointments = React.useCallback(
    ({ name }: IAppointmentFilters) => {
      if (name !== undefined) {
        setQuery({ name, page: 1 });
      }
      return;
    },
    [setQuery],
  );

  return (
    <FormContainer onSubmit={handleSubmit(handleFilterAppointments)}>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5">
          <InputSearch
            name="name"
            control={control}
            placeholder="Pesquisar consulta"
            disabled={loading}
          />
        </div>
      </div>
    </FormContainer>
  );
};
