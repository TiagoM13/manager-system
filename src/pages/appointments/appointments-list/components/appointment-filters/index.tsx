import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormContainer, Input, InputSearch, Select } from '@/components';
import { appointmentTypeOptions } from '@/constants/select-options';
import { useQueryParams } from '@/hooks';
import { IAppointmentFilters } from '@/interfaces';
import { formatDateToISODate } from '@/utils';

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
  const [_, setQuery] = useQueryParams<IAppointmentFilters>();

  const appointment_type = watch('appointment_type');

  const handleFilterAppointments = React.useCallback(
    (filters: IAppointmentFilters) => {
      const { name, appointment_type, start_date, end_date } = filters;

      const startDate = formatDateToISODate(start_date as any);
      const endDate = formatDateToISODate(end_date as any);
      setQuery({
        name,
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
          <InputSearch
            name="name"
            control={control}
            placeholder="Pesquisar consulta"
            disabled={loading}
          />

          <Select
            name="appointment_type"
            options={appointmentTypeOptions}
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
        </div>
      </div>
    </FormContainer>
  );
};
