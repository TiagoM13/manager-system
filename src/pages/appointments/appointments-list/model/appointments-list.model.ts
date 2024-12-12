import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import {
  useAppNavigation,
  useGetAllAppointments,
  useQueryParams,
  useWindowSize,
} from '@/hooks';
import { IAppointment, IAppointmentFilters, IMSResponse } from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  appointmentFiltersSchema,
  AppointmentFiltersSchemaType,
} from '../appointments-list.schema';

interface AppointmentsListModelProps {
  getAllAppointments: (
    params: IAppointmentFilters,
  ) => Promise<IMSResponse<IAppointment[], 'get-all-appointments'> | undefined>;
}

export const useAppointmentsListModel = ({
  getAllAppointments: listAllAppointments,
}: AppointmentsListModelProps) => {
  const location = useLocation();
  const [, isMobile] = useWindowSize();
  const { navigateTo } = useAppNavigation();
  const [query] = useQueryParams<IAppointmentFilters>();

  const { allAppointmentsResponse, isLoading } = useGetAllAppointments({
    getAllAppointments: listAllAppointments,
    query,
  });

  const defaultValues: AppointmentFiltersSchemaType = {
    name: query.name || '',
    appointment_type: query.appointment_type || '',
    start_date: query.start_date,
    end_date: query.end_date,
  };

  const methods = useForm<AppointmentFiltersSchemaType>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(appointmentFiltersSchema),
    shouldUnregister: false,
  });

  const handleNewRegister = React.useCallback(() => {
    navigateTo({ route: '/appointments/new', state: location.state });
  }, [location.state, navigateTo]);

  const handleEdiAppointment = React.useCallback(
    (appointment: IAppointment) => {
      navigateTo({
        route: `/appointments/${appointment.patient_id}/appointment/${appointment.id}`,
        state: location.state,
      });
    },
    [location.state, navigateTo],
  );

  return {
    methods,
    allAppointmentsResponse,
    handleNewRegister,
    handleEdiAppointment,
    isLoading,
    isMobile,
  };
};
