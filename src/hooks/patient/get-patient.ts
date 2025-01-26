import React from 'react';

import { IPatient } from '@/interfaces';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface UseGetPatientProps {
  getPatient: (id: string) => Promise<IPatient | undefined>;
  patientId: string;
  isEnabled?: boolean;
}

export const useGetPatient = ({
  getPatient,
  patientId,
  isEnabled,
}: UseGetPatientProps) => {
  const {
    data: patientResponse,
    isLoading,
    isFetching,
  }: UseQueryResult<IPatient | undefined> = useQuery({
    queryKey: ['patient', patientId],
    queryFn: async () => await getPatient(patientId),
    enabled: isEnabled,
  });

  return {
    patientResponse,
    isLoading,
    isFetching,
  };
};
