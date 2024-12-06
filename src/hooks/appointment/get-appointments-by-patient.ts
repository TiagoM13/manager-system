import React from 'react';

import { IAppointment, IAppointmentFilters, IMSResponse } from '@/interfaces';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type AppointmentsResponse =
  | IMSResponse<IAppointment[], 'appointments'>
  | undefined;

interface UseAppointmentsByPatientProps {
  getAppointmentsByPatient: (
    patientId: string,
    params: IAppointmentFilters,
  ) => Promise<AppointmentsResponse>;
  patientId: string;
  filters: IAppointmentFilters;
}

export const useAppointmentsByPatient = ({
  getAppointmentsByPatient,
  patientId,
  filters,
}: UseAppointmentsByPatientProps) => {
  const {
    data: appointmentsResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['appointments', patientId, filters],
    queryFn: async () =>
      await getAppointmentsByPatient(String(patientId), filters),
    placeholderData: keepPreviousData,
  });

  return {
    appointmentsResponse,
    isLoading,
    isFetching,
  };
};
