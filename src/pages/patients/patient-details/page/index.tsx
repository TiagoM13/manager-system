import React from 'react';

import { House, User, UsersFour } from '@phosphor-icons/react';

import { Card, CustomLoadingSkeleton, Header } from '@/components';
import { useAppNavigation } from '@/hooks';

import {
  PatientHeader,
  PatientCompletionStatus,
  PatientInfoSections,
  PatientEditSectionDialog,
} from '../components';
import { usePatientDetails } from '../hooks/patient-details';

const PatientDetails: React.FC = () => {
  const { goBack } = useAppNavigation();

  const { patient, loading, activeModal, openModal, closeModal } =
    usePatientDetails();

  const breadcrumbsPathItems = [
    {
      label: 'Início',
      path: '/',
      icon: <House className="size-4" />,
    },
    {
      label: 'Pacientes',
      path: '/patients',
      icon: <UsersFour className="size-4" />,
    },
    {
      label: loading ? (
        <CustomLoadingSkeleton className="h-5 w-40 rounded-lg" />
      ) : (
        patient?.name
      ),
      icon: <User className="size-4" />,
    },
  ];

  return (
    <>
      <Header
        subtitle="voltar a lista de pacientes"
        title="Detalhes do Paciente"
        goBack={goBack}
        breadcrumbItems={breadcrumbsPathItems}
      />

      <div className="max-w-[1440px] space-y-6 mt-6">
        <Card>
          <div className="flex items-center justify-between">
            <PatientHeader patient={patient} loading={loading} />

            <PatientCompletionStatus
              patient={patient}
              loading={loading}
              onEdit={openModal}
            />
          </div>
        </Card>

        <PatientInfoSections
          patient={patient}
          loading={loading}
          onEdit={openModal}
        />
      </div>

      <PatientEditSectionDialog
        patient={patient}
        activeSection={activeModal}
        onClose={closeModal}
      />
    </>
  );
};

export default PatientDetails;
