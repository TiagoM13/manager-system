import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useQueryParams } from '@/hooks';
import { IAppointmentFilters } from '@/interfaces';
import { formatDateToISODate } from '@/utils';

import { AppointmentsByPatientFiltersSchemaType } from '../../appointments-by-patient.schema';

type IAppointmentsByPatientFilters = Omit<IAppointmentFilters, 'name'> & {};

export const useAppointmentsByPatientFiltersModel = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<IAppointmentFilters>();
  const [_, setQuery] = useQueryParams<IAppointmentsByPatientFilters>();

  const handleFilterAppointments = React.useCallback(
    (filters: AppointmentsByPatientFiltersSchemaType) => {
      const { appointment_type, scheduled_date, status } = filters;

      const normalizedFilters = {
        appointment_type: appointment_type || '',
        scheduled_date: formatDateToISODate(scheduled_date as Date) as any,
        status: status || '',
        page: 1,
      };

      setQuery(normalizedFilters);
    },
    [setQuery],
  );

  const onSearch = handleSubmit(handleFilterAppointments);

  return {
    control,
    errors,
    onSearch,
  };
};
