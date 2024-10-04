import React from 'react';

import { getPatientService } from '@/services';
import { useQuery } from '@tanstack/react-query';

import { ModalSection } from '../types/modal';

export const usePatientDetails = (id: string) => {
  // states
  const [openModal, setOpenModal] = React.useState<ModalSection | null>(null);

  const handleOpenModal = (activeSection: ModalSection) => {
    setOpenModal(activeSection);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

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
    openModal,
    handleOpenModal,
    handleCloseModal,
  };
};
