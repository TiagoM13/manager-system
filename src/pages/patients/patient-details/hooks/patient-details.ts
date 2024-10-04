import React from 'react';

import { getPatientService } from '@/services';
import { usePatientFormDialog } from '@/store';
import { useQuery } from '@tanstack/react-query';

export const usePatientDetails = (id: string) => {
  // hooks
  const { activeModal, openModal, closeModal } = usePatientFormDialog();

  // queries
  const {
    data: patient,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['patient'],
    queryFn: async () => await getPatientService(id),
  });

  const loading = React.useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading],
  );

  return {
    patient,
    loading,
    activeModal,
    openModal,
    closeModal,
  };
};
