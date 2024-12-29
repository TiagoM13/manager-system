import React from 'react';

import { Status } from '@/enums';
import { IDoctor } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';

interface UseAllDoctorsProps {
  getAllDoctors: () => Promise<IDoctor[] | undefined>;
  isEnabled?: boolean;
}

export const useGetAllDoctors = ({
  getAllDoctors,
  isEnabled,
}: UseAllDoctorsProps) => {
  const {
    data: doctorsResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => await getAllDoctors(),
    enabled: isEnabled,
  });

  const doctorOptions = React.useMemo(
    () =>
      doctorsResponse
        ?.filter((doctor) => doctor.status !== Status.INACTIVE)
        .map((doctor) => ({
          label: doctor.name,
          value: Number(doctor.id),
        })),
    [doctorsResponse],
  );

  return {
    doctorsResponse,
    isLoading,
    isFetching,
    doctorOptions,
  };
};
