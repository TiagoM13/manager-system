import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import {
  useAppNavigation,
  useGetPatient,
  useAppointmentsByPatient,
  useQueryParams,
  useWindowSize,
} from '@/hooks';
import {
  IAppointment,
  IAppointmentFilters,
  IMSResponse,
  IPatient,
} from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  appointmentsByPatientFiltersSchema,
  AppointmentsByPatientFiltersSchemaType,
} from './appointments-by-patient.schema';

type IAppointmentsByPatientFilters = Omit<IAppointmentFilters, 'name'> & {};

interface AppointmentsByPatientModelProps {
  getAppointmentsByPatient: (
    patientid: string,
    params: IAppointmentFilters,
  ) => Promise<IMSResponse<IAppointment[], 'appointments'> | undefined>;
  getPatient: (id: string) => Promise<IPatient | undefined>;
}

export const useAppointmentsByPatientModel = ({
  getAppointmentsByPatient,
  getPatient,
}: AppointmentsByPatientModelProps) => {
  const location = useLocation();
  const [, isMobile] = useWindowSize();
  const { goBack, navigateTo } = useAppNavigation();
  const [query] = useQueryParams<IAppointmentsByPatientFilters>();
  const { patientId } = useParams<{ patientId: string }>();

  const {
    patientResponse,
    isLoading: isLoadingGetPatient,
    isFetching: isFetchingGetPatient,
  } = useGetPatient({
    getPatient,
    patientId: String(patientId),
  });
  const {
    appointmentsResponse,
    isLoading: isLoadingAppointments,
    isFetching: isFetchingAppointments,
  } = useAppointmentsByPatient({
    getAppointmentsByPatient,
    patientId: String(patientId),
    filters: query,
  });

  const methods = useForm<AppointmentsByPatientFiltersSchemaType>({
    defaultValues: {
      appointment_type: query.appointment_type || '',
      scheduled_date: query.scheduled_date,
      status: query.status,
    },
    mode: 'all',
    resolver: zodResolver(appointmentsByPatientFiltersSchema),
  });

  const handleEdiAppointment = React.useCallback(
    (appointment: IAppointment) => {
      navigateTo({
        route: `/appointments/${patientId}/appointment/${appointment.id}`,
        state: location.state,
      });
    },
    [location.state, navigateTo, patientId],
  );

  const isLoading = React.useMemo(
    () =>
      isLoadingGetPatient ||
      isFetchingGetPatient ||
      isLoadingAppointments ||
      isFetchingAppointments,
    [
      isLoadingGetPatient,
      isFetchingGetPatient,
      isLoadingAppointments,
      isFetchingAppointments,
    ],
  );

  return {
    patientResponse,
    appointmentsResponse,
    isLoading,
    isMobile,
    methods,
    goBack,
    isLoadingGetPatient,
    isLoadingAppointments,
    handleEdiAppointment,
  };
};
