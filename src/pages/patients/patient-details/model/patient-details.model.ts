import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppNavigation } from '@/hooks';
import { IPatient } from '@/interfaces';
import { usePatientFormDialog } from '@/store';
import { useQuery } from '@tanstack/react-query';

interface PatientDetailsModelProps {
  getPatient: (id: string) => Promise<IPatient | undefined>;
}

export const usePatientDetailsModel = ({
  getPatient,
}: PatientDetailsModelProps) => {
  const { goBack } = useAppNavigation();
  const { id } = useParams<{ id: string }>();
  const { activeModal, openModal, closeModal } = usePatientFormDialog();

  const {
    data: patient,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['patient'],
    queryFn: async () => await getPatient(String(id)),
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
    goBack,
  };
};
