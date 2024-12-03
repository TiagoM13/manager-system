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

interface UseAppointmentsByPatientReturn {
  appointments: AppointmentsResponse;
  loading: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

export const useAppointmentsByPatient = ({
  getAppointmentsByPatient,
  patientId,
  filters,
}: UseAppointmentsByPatientProps): UseAppointmentsByPatientReturn => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['appointments', patientId, filters],
    queryFn: async () =>
      await getAppointmentsByPatient(String(patientId), filters),
    placeholderData: keepPreviousData,
  });

  const loading = React.useMemo(
    () => isLoading || isFetching,
    [isLoading, isFetching],
  );

  return {
    appointments: data,
    isLoading,
    isFetching,
    loading,
  };
};
