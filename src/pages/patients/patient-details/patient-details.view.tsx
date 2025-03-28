import React from 'react';

import { Header, PatientHeader } from '@/components';
import { Card } from '@/components/_ui';
import { BreadcrumbItem } from '@/shared/interfaces';

import {
  AppointmentsHistory,
  HospitalizationsHistory,
  PatientCompletionStatus,
  PatientEditSectionDialog,
  PatientInfoSections,
} from './components';
import { usePatientDetailsModel } from './patient-details.model';

type PatientDetailsViewProps = ReturnType<typeof usePatientDetailsModel> & {
  breadcrumbsPathItems: BreadcrumbItem[];
};

export const PatientDetailsView: React.FC<PatientDetailsViewProps> = (
  props,
) => {
  const {
    activeModal,
    patient,
    loading,
    openModal,
    closeModal,
    goBack,
    breadcrumbsPathItems,
  } = props;

  return (
    <>
      <Header
        title="Detalhes do Paciente"
        goBack={() => goBack('/patients')}
        breadcrumbItems={breadcrumbsPathItems}
      />

      <div className="mt-6 max-w-[1440px] space-y-6">
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

        <div className="flex space-x-6">
          <AppointmentsHistory
            appointments={patient?.appointments}
            loading={loading}
          />

          <HospitalizationsHistory loading={loading} />
        </div>
      </div>

      <PatientEditSectionDialog
        patient={patient}
        activeSection={activeModal}
        onClose={closeModal}
      />
    </>
  );
};
