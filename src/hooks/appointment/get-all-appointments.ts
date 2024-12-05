import React from 'react';

import { IAppointmentFilters, IMSResponse, IAppointment } from '@/interfaces';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

type AllAppointmentsResponse =
  | IMSResponse<IAppointment[], 'get-all-appointments'>
  | undefined;

interface UseGetAllAppointmentsProps {
  getAllAppointments: (
    params: IAppointmentFilters,
  ) => Promise<AllAppointmentsResponse>;
  query: IAppointmentFilters;
}

export const useGetAllAppointments = ({
  getAllAppointments,
  query,
}: UseGetAllAppointmentsProps) => {
  const { data: allAppointmentsResponse, isLoading } = useQuery({
    queryKey: ['appointments', query],
    queryFn: async () => await getAllAppointments(query),
    placeholderData: keepPreviousData,
  });

  return {
    allAppointmentsResponse,
    isLoading,
  };
};
