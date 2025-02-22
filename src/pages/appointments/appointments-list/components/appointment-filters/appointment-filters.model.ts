import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useQueryParams } from '@/shared/hooks';
import { IAppointmentFilters } from '@/shared/interfaces';
import { formatDateToISODate } from '@/shared/utils';

export const useAppointmentFiltersModel = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext<IAppointmentFilters>();
  const [_, setQuery] = useQueryParams<IAppointmentFilters>();

  const handleFilterAppointments = React.useCallback(
    (filters: IAppointmentFilters) => {
      const { name, appointment_type, scheduled_date, status } = filters;

      const formattedDate = formatDateToISODate(scheduled_date as Date);

      const normalizedFilters = {
        name,
        status: status || '',
        appointment_type: appointment_type || '',
        scheduled_date: formattedDate as any,
        page: 1,
      };

      setQuery(normalizedFilters);
    },
    [setQuery],
  );

  return {
    control,
    errors,
    setValue,
    handleFilterAppointments,
    handleSubmit,
  };
};
