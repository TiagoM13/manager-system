import React from 'react';

import { IMSResponse, IPatient, IPatientFilters } from '@/interfaces';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

interface UseGetAllPatientsProps {
  getAllPatients: (
    params: IPatientFilters,
  ) => Promise<IMSResponse<IPatient[], 'patients'> | undefined>;
  query: IPatientFilters;
  isEnabled?: boolean;
}

export const useGetAllPatients = ({
  getAllPatients,
  query,
  isEnabled,
}: UseGetAllPatientsProps) => {
  const {
    data: allPatientsResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['patients', query],
    queryFn: async () => {
      if (!query) return;
      return await getAllPatients(query);
    },
    placeholderData: keepPreviousData,
    enabled: isEnabled,
  });

  return {
    allPatientsResponse,
    isLoading,
    isFetching,
  };
};
