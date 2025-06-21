import React from 'react';
import { FormProvider } from 'react-hook-form';

import { Header, PatientHeader } from '@/components';
import { Card } from '@/components/_ui';
import { BreadcrumbItem } from '@/shared/interfaces';

import { useAppointmentsByPatientModel } from './appointments-by-patient.model';
import {
  AppointmentsByPatientFilters,
  AppointmentsByPatientTable,
} from './components';

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
  } = props;

  return (
    <>
      <Header
        title="Consultas do Paciente"
        breadcrumbItems={breadcrumbsPathItems}
        goBack={() => goBack('/appointments')}
      />

      <div className="mt-6 max-w-[1440px] space-y-6">
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
