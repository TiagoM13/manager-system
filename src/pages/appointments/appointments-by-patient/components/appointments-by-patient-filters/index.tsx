import React from 'react';
import { useFormContext } from 'react-hook-form';

import { MagnifyingGlass } from '@phosphor-icons/react';

import { Button, FormContainer, Input, Select } from '@/components';
import { useQueryParams } from '@/hooks';
import { IAppointmentFilters } from '@/interfaces';
import { formatDateToISODate, selectOptions } from '@/utils';

type IAppointmentsByPatientFilters = Omit<IAppointmentFilters, 'name'> & {};

type AppointmentsByPatientFiltersProps = {
  loading?: boolean;
};

export const AppointmentsByPatientFilters: React.FC<
  AppointmentsByPatientFiltersProps
> = ({ loading }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IAppointmentFilters>();
  const [_, setQuery] = useQueryParams<IAppointmentsByPatientFilters>();

  const appointment_type = watch('appointment_type');

  const handleFilterAppointments = React.useCallback(
    (filters: IAppointmentsByPatientFilters) => {
      const { appointment_type, start_date, end_date } = filters;

      const startDate = formatDateToISODate(start_date as any);
      const endDate = formatDateToISODate(end_date as any);
      setQuery({
        appointment_type,
        start_date: startDate as any,
        end_date: endDate as any,
        page: 1,
      });
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
            max="9999-12-31"
          />

          <Input
            type="date"
            name="end_date"
            control={control}
            error={errors.end_date}
            disabled={loading}
            max="9999-12-31"
          />

          <Button
            type="button"
            label="buscar"
            icon={<MagnifyingGlass className="size-4" weight="bold" />}
            onClick={handleSubmit(handleFilterAppointments)}
            disabled={loading}
            loading={loading}
          />
        </div>
      </div>
    </FormContainer>
  );
};
