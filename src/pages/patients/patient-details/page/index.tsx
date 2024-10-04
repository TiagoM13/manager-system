import React from 'react';
import { useParams } from 'react-router-dom';

import { Card } from '@/components';
import { useAppNavigation } from '@/hooks';

import { Header } from '../../patient-form/components/header';
import {
  PatientHeader,
  PatientCompletionStatus,
  PatientInfoSections,
  PatientEditSectionDialog,
} from '../components';
import { usePatientDetails } from '../hooks/patient-details';

const PatientDetails: React.FC = () => {
  const { goBack } = useAppNavigation();
  const { id } = useParams<{ id: string }>();

  const { patient, loading, openModal, handleOpenModal, handleCloseModal } =
    usePatientDetails(String(id));

  return (
    <>
      <Header
        subtitle="voltar a lista de pacientes"
        title="Detalhes do Paciente"
        goBack={goBack}
      />

      <div className="max-w-[1440px] space-y-6">
        <Card>
          <div className="flex items-center justify-between">
            <PatientHeader patient={patient} loading={loading} />

            <PatientCompletionStatus
              patient={patient}
              loading={loading}
              onEdit={handleOpenModal}
            />
          </div>
        </Card>

        <PatientInfoSections
          patient={patient}
          loading={loading}
          onEdit={handleOpenModal}
        />
      </div>

      <PatientEditSectionDialog
        patient={patient}
        activeSection={openModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default PatientDetails;
