import React from 'react';

import { IMSResponse, IPatient } from '@/interfaces';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

type PatientSearchType = {
  name?: string | undefined;
  cpf?: string | null | undefined;
  cns?: string | null | undefined;
};

interface UseGetAllPatientsProps {
  getAllPatients: (
    values: PatientSearchType,
  ) => Promise<IMSResponse<IPatient[], 'patients'> | undefined>;
  query: PatientSearchType;
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
      if (!query) return null;
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
