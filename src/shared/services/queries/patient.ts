import { IMSResponse, IPatient, IPatientFilters } from '@/shared/interfaces';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

import { CacheKeys } from '../cache-keys';

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
  const { data: allPatientsResponse, ...rest } = useQuery({
    queryKey: [CacheKeys.PATIENTS, query],
    queryFn: () => {
      if (!query) return;
      return getAllPatients(query);
    },
    placeholderData: keepPreviousData,
    enabled: isEnabled,
  });

  return { allPatientsResponse, ...rest };
};

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
    ...rest
  }: UseQueryResult<IPatient | undefined> = useQuery({
    queryKey: [CacheKeys.PATIENT, patientId],
    queryFn: () => getPatient(patientId),
    enabled: isEnabled,
  });

  return { patientResponse, ...rest };
};
