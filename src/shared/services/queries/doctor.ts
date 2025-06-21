import React from 'react';

import { Status } from '@/shared/enums';
import { IDoctor } from '@/shared/interfaces';
import { useQuery } from '@tanstack/react-query';

import { CacheKeys } from '../cache-keys';

interface UseAllDoctorsProps {
  getAllDoctors: () => Promise<IDoctor[] | undefined>;
  isEnabled?: boolean;
}

export const useGetAllDoctors = ({
  getAllDoctors,
  isEnabled,
}: UseAllDoctorsProps) => {
  const { data: doctorsResponse, ...rest } = useQuery({
    queryKey: [CacheKeys.USERS],
    queryFn: getAllDoctors,
    enabled: isEnabled,
  });

  const DOCTORS_SELECT_OPTIONS = React.useMemo(
    () =>
      doctorsResponse
        ?.filter((doctor) => doctor.status !== Status.INACTIVE)
        .map((doctor) => ({
          label: doctor.name,
          value: String(doctor.id),
        })),
    [doctorsResponse],
  );

  return {
    doctorsResponse,
    DOCTORS_SELECT_OPTIONS,
    ...rest,
  };
};
