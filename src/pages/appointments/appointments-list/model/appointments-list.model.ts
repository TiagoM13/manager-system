import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useAppNavigation, useQueryParams, useWindowSize } from '@/hooks';
import { IAppointment, IAppointmentFilters, IMSResponse } from '@/interfaces';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  appointmentFiltersSchemaResolver,
  AppointmentFiltersSchemaType,
} from '../appointments-list.schema';

interface AppointmentsListModelProps {
  listAllAppointments: (
    params: IAppointmentFilters,
  ) => Promise<
    IMSResponse<IAppointment[], 'list-all-appointments'> | undefined
  >;
}

export const useAppointmentsListModel = ({
  listAllAppointments,
}: AppointmentsListModelProps) => {
  const location = useLocation();
  const [, isMobile] = useWindowSize();
  const { navigateTo } = useAppNavigation();
  const [query] = useQueryParams<IAppointmentFilters>();

  const methods = useForm<AppointmentFiltersSchemaType>({
    defaultValues: {
      name: query.name || '',
      appointment_type: query.appointment_type || '',
    },
    mode: 'onChange',
    resolver: appointmentFiltersSchemaResolver,
    shouldUnregister: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['appointments', query],
    queryFn: async () => await listAllAppointments(query),
    placeholderData: keepPreviousData,
  });

  const handleNewRegister = React.useCallback(() => {
    navigateTo({ route: '/appointments/new', state: location.state });
  }, [location.state, navigateTo]);

  return {
    data,
    isMobile,
    handleNewRegister,
    isLoading,
    methods,
  };
};
