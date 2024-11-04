import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormContainer, Input, InputSearch, Select } from '@/components';
import { useQueryParams } from '@/hooks';
import { IAppointmentFilters } from '@/interfaces';
import { selectOptions } from '@/utils';

import { AppointmentFiltersSchemaType } from '../../appointments-list.schema';

type AppointmentFiltersProps = {
  loading?: boolean;
};

export const AppointmentFilters: React.FC<AppointmentFiltersProps> = ({
  loading,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IAppointmentFilters>();
  const [_, setQuery] = useQueryParams<AppointmentFiltersSchemaType>();

  const appointment_type = watch('appointment_type');

  const handleFilterAppointments = React.useCallback(
    ({ name, appointment_type }: AppointmentFiltersSchemaType) => {
      const cleanedFilters = { name, appointment_type, page: 1 };
      setQuery(cleanedFilters);
    },
    [setQuery],
  );

  React.useEffect(() => {
    if (appointment_type === null) {
      setValue('appointment_type', '');
    }
  }, [appointment_type, setValue]);

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

          <Select
            name="appointment_type"
            options={selectOptions}
            control={control}
            disabled={loading}
            isSearchable
            clearable
          />

          <Input
            type="date"
            name="start_date"
            control={control}
            error={errors.start_date}
            disabled={loading}
          />

          <Input
            type="date"
            name="end_date"
            control={control}
            error={errors.end_date}
            disabled={loading}
          />
        </div>
      </div>
    </FormContainer>
  );
};
