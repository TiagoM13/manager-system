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
    data: allPatients,
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

  const loading = React.useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading],
  );

  return {
    allPatients,
    loading,
  };
};
