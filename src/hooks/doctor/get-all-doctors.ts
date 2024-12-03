import React from 'react';

import { Status } from '@/enums';
import { IDoctor } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';

interface UseAllDoctorsProps {
  getAllDoctors: () => Promise<IDoctor[] | undefined>;
  isEnabled?: boolean;
}

interface UseAllDoctorsReturn {
  doctors: IDoctor[] | undefined;
  loading: boolean;
  doctorOptions?: {
    label: string;
    value: number;
  }[];
}

export const useGetAllDoctors = ({
  getAllDoctors,
  isEnabled,
}: UseAllDoctorsProps): UseAllDoctorsReturn => {
  const {
    data: doctors,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => await getAllDoctors(),
    enabled: isEnabled,
  });

  const loading = React.useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading],
  );

  const doctorOptions = React.useMemo(
    () =>
      doctors
        ?.filter((doctor) => doctor.status !== Status.INACTIVE)
        .map((doctor) => ({
          label: doctor.name,
          value: Number(doctor.id),
        })),
    [doctors],
  );

  return {
    doctors,
    loading,
    doctorOptions,
  };
};
