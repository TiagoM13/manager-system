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
    isLoading,
    goBack,
    methods,
    patientResponse,
    appointmentsResponse,
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
          <PatientHeader
            patient={patientResponse}
            loading={isLoadingGetPatient}
          />
        </Card>

        <Card className="mt-4">
          <FormProvider {...methods}>
            <AppointmentsByPatientFilters loading={isLoading} />

            <AppointmentsByPatientTable
              data={appointmentsResponse}
              loading={isLoading}
              onEdit={handleEdiAppointment}
            />
          </FormProvider>
        </Card>
      </div>
    </>
  );
};
