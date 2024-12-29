import React from 'react';
import { useParams } from 'react-router-dom';

import { useAppNavigation, useGetPatient } from '@/hooks';
import { IPatient } from '@/interfaces';
import { usePatientFormDialog } from '@/store';

interface PatientDetailsModelProps {
  getPatient: (id: string) => Promise<IPatient | undefined>;
}

export const usePatientDetailsModel = ({
  getPatient,
}: PatientDetailsModelProps) => {
  const { goBack } = useAppNavigation();
  const { patientId } = useParams<{ patientId: string }>();
  const { activeModal, openModal, closeModal } = usePatientFormDialog();

  const { patientResponse, isLoading, isFetching } = useGetPatient({
    getPatient,
    patientId: String(patientId),
  });

  const loading = React.useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading],
  );

  return {
    patient: patientResponse,
    loading,
    activeModal,
    openModal,
    closeModal,
    goBack,
  };
};
