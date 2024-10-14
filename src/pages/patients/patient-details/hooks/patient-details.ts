import React from 'react';
import { useParams } from 'react-router-dom';

import { getPatientService } from '@/services';
import { usePatientFormDialog } from '@/store';
import { useQuery } from '@tanstack/react-query';

export const usePatientDetails = () => {
  // hooks
  const { id } = useParams<{ id: string }>();
  const { activeModal, openModal, closeModal } = usePatientFormDialog();

  // queries
  const {
    data: patient,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['patient'],
    queryFn: async () => await getPatientService(String(id)),
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
