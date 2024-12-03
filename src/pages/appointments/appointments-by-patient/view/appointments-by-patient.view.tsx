import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Header, Card } from '@/components';
import { BreadcrumbItem } from '@/components/header/interfaces';
import { PatientHeader } from '@/pages/patients/patient-details/components';

import {
  AppointmentsByPatientFilters,
  AppointmentsByPatientTable,
} from '../components';
import { useAppointmentsByPatientModel } from '../model/appointments-by-patient.model';

type AppointmentsByPatientViewProps = ReturnType<
  typeof useAppointmentsByPatientModel
> & {
  breadcrumbsPathItems: BreadcrumbItem[];
};

export const AppointmentsByPatientView: React.FC<
  AppointmentsByPatientViewProps
> = (props) => {
  const {
    breadcrumbsPathItems,
    loading,
    goBack,
    methods,
    patient,
    appointments,
    handleEdiAppointment,
    isLoadingGetPatient,
    isMobile,
  } = props;

  return (
    <>
      <Header
        title="Consultas do Paciente"
        breadcrumbItems={breadcrumbsPathItems}
        goBack={() => goBack('/appointments')}
      />

      <div className="max-w-[1440px] mt-6 space-y-6">
        <Card>
          <PatientHeader patient={patient} loading={isLoadingGetPatient} />
        </Card>

        <Card className="mt-4">
          <FormProvider {...methods}>
            <AppointmentsByPatientFilters loading={loading} />

            <AppointmentsByPatientTable
              data={appointments}
              loading={loading}
              onEdit={handleEdiAppointment}
            />
          </FormProvider>
        </Card>
      </div>
    </>
  );
};
