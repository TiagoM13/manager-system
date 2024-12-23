import React from 'react';
import { useFormContext } from 'react-hook-form';

import { MagnifyingGlass } from '@phosphor-icons/react';

import { Button, FormContainer, Input, Select } from '@/components/_ui';
import { appointmentTypeOptions } from '@/constants/select-options';
import { useQueryParams } from '@/hooks';
import { IAppointmentFilters } from '@/interfaces';
import { formatDateToISODate } from '@/utils';

import { AppointmentsByPatientFiltersSchemaType } from '../../appointments-by-patient.schema';

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
    formState: { errors },
  } = useFormContext<IAppointmentFilters>();
  const [_, setQuery] = useQueryParams<IAppointmentsByPatientFilters>();

  const handleFilterAppointments = React.useCallback(
    (filters: AppointmentsByPatientFiltersSchemaType) => {
      const { appointment_type, start_date, end_date } = filters;

      const normalizedFilters = {
        appointment_type: appointment_type || '',
        start_date: formatDateToISODate(start_date as Date) as any,
        end_date: formatDateToISODate(end_date as Date) as any,
        page: 1,
      };

      setQuery(normalizedFilters);
    },
    [setQuery],
  );

  return (
    <FormContainer onSubmit={handleSubmit(handleFilterAppointments)}>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5">
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
