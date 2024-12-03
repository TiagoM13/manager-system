import React from 'react';

import { IPatient } from '@/interfaces';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface UseGetPatientProps {
  getPatient: (id: string) => Promise<IPatient | undefined>;
  isEnabled?: boolean;
}

interface UseGetPatientReturn {
  patient: IPatient | undefined;
  loading: boolean;
}

export const useGetPatient = ({
  getPatient,
  isEnabled,
}: UseGetPatientProps): UseGetPatientReturn => {
  const {
    data: patient,
    isLoading,
    isFetching,
  }: UseQueryResult<IPatient | undefined> = useQuery({
    queryKey: ['patient'],
    queryFn: async (id) => await getPatient(String(id)),
    enabled: isEnabled,
  });

  const loading = React.useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading],
  );

  return {
    patient,
    loading,
  };
};
